import * as authService from "./auth.service.js";

export const signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const result = await authService.resetPassword(token, password);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// admin login
export const adminLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await authService.adminLoginService(email, password);

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      data: result
    });

  } catch (error) {
    next(error);
  }
};