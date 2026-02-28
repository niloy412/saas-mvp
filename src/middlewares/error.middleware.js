import ApiError from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Custom API Errors
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Mongo duplicate key error (fallback safety)
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate email detected',
    });
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};