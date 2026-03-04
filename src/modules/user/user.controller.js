import * as userService from './user.service.js';

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const result = await userService.getAllUsers(req.query);

        res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfileController = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateProfile(
            req.user._id,
            req.body
        );

        res.json({
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const updateUserByIdController = async (req, res, next) => {
    try {
        const updatedUser = await userService.updateUserById(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            data: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteUserByIdController = async (req, res, next) => {
    try {
        const result = await userService.deleteUserById(req.params.id);

        res.json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};