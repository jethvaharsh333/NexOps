import { HTTPSTATUS } from "../config/http.config.js";

class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

class HttpException extends ApiError {
  constructor(message, statusCode) {
    super({ message, statusCode });
  }
}

class BadRequestException extends ApiError {
  constructor(message = "Bad Request") {
    super({
      message,
      statusCode: HTTPSTATUS.BAD_REQUEST,

    });
  }
}

class UnauthorizedException extends ApiError {
  constructor(message = "Unauthorized") {
    super({
      message,
      statusCode: HTTPSTATUS.UNAUTHORIZED,
      errorCode
    });
  }
}

class ForbiddenException extends ApiError {
  constructor(message = "Forbidden") {
    super({
      message,
      statusCode: HTTPSTATUS.FORBIDDEN,
      errorCode
    });
  }
}

class NotFoundException extends ApiError {
  constructor(message = "Not Found") {
    super({
      message,
      statusCode: HTTPSTATUS.NOT_FOUND,
      errorCode
    });
  }
}

class InternalServerException extends ApiError {
  constructor(message = "Internal Server Error") {
    super({
      message,
      statusCode: HTTPSTATUS.INTERNAL_SERVER_ERROR,
      operational: false
    });
  }
}


export {ApiError, HttpException, BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException, InternalServerException};