import { verifyToken } from "../utils/jwt.js";
import User from "../modules/user/user.model.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new ApiError(401, "Not authorized, token missing");
        }

        const decoded = verifyToken(token);

        const user = await User.findOne({ _id: decoded.id, is_deleted: false}).select("-password");

        if (!user) {
            throw new ApiError(401, "User not found");
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};