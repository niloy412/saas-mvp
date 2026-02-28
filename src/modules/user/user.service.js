import User from './user.model.js';
import bcrypt from 'bcryptjs';
import ApiError from '../../utils/ApiError.js';

export const createUser = async (payload) => {
    const { name, email, password, role } = payload;

    // 1️ Validate required fields
    if (!email || !password || !name) {
        throw new ApiError(400, 'Name, email and password are required');
    }

    // 2️ Check duplicate email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, 'Email already registered');
    }

    // 3️ Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4️ Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
    });

    // 5️ Remove sensitive fields
    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};

export const getAllUsers = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search,
    sortBy = 'createdAt',
    order = 'desc',
    role,
  } = queryParams;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  //filter
  const filter = {};

  // Role filter
  if (role) {
    filter.role = role;
  }

  // Search (name or email)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  // Sorting
  const sortOrder = order === 'asc' ? 1 : -1;
  const sort = { [sortBy]: sortOrder };

  // Query execution
  const usersPromise = User.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limitNumber)
    .select('-password');

  const totalPromise = User.countDocuments(filter);

  const [users, total] = await Promise.all([
    usersPromise,
    totalPromise,
  ]);

  return {
    data: users,
    meta: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};