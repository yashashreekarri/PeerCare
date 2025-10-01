// Success response
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  };
  
  // Error response
  const errorResponse = (res, message = 'Error occurred', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  };
  
  module.exports = { successResponse, errorResponse };