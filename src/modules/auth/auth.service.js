import crypto from "crypto";
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

export const forgotPassword = async (email) => {
    const user = await User.findOne({
        email,
        is_deleted: false,
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving
    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // TODO: Send email with resetToken

    return {
        success: true,
        message: "Reset token generated",
        resetToken
    };
};

export const resetPassword = async (token, newPassword) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() },
        is_deleted: false,
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired token");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return {
        success: true,
        message: "Password reset successful",
    };
};