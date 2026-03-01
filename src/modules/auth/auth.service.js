import bcrypt from "bcryptjs";
import User from "../user/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { generateToken } from "../../utils/jwt.js";

export const signup = async (data) => {
    const existingUser = await User.findOne({ email: data.email, is_deleted: false });

    if (existingUser) {
        throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
        ...data,
        password: hashedPassword,
    });

    const token = generateToken({ id: user._id });

    return { user, token };
};

export const login = async (email, password) => {
    const user = await User.findOne({ email, is_deleted: false }).select("+password");

    if (!user) {
        throw new ApiError(401, "no user found");
    }

    if (!user.is_active) {
        throw new ApiError(403, "Account is inactive");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    const token = generateToken({ id: user._id });

    // remove password from response
    user.password = undefined;

    return { user, token };
};