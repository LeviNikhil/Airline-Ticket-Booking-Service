const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating city';
        ErrorResponse.error = new AppError(['City Name not found in the incoming request'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next) {
    if (Object.keys(req.body).length === 0) {
      ErrorResponse.message = "Failed to update an City";
      ErrorResponse.error = new AppError(
        ["The Data was not found in the incoming request"],
        StatusCodes.BAD_REQUEST
      );
  
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next(); // If users send the Data properly without any fail then u will call the next middleware (i.e. the controller) using the next() function
  }

module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}