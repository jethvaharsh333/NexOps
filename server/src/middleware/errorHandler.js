import { HTTPSTATUS } from '../config/http.config.js';
import { ApiError } from '../utils/ApiError.js';

const errorHandler = (error, req, res, next) => {
    console.error(`Error on ${req.method} ${req.originalUrl}`, error);

    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Invalid JSON format in request body.",
        });
    }

    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            success: error.success,
            status: error.statusCode,
            message: error.message,
            error: error.error || [],
        });
    }

    const statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR;
    const response = {
        success: false,
        message: "An unexpected error occurred.",
        errorCode: "INTERNAL_ERROR"
    };

    // Provide error details only in development
    if (isDev) {
        response.devDetails = {
        name: error.name,
        message: error.message,
        stack: error.stack
        };
    }

    return res.status(statusCode).json(response);
};

export { errorHandler };
