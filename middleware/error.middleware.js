const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate field: ${Object.keys(err.keyValue).join(', ')}`;
    }

    // Handle JWT-related errors
    const jwtErrors = {
        JsonWebTokenError: 'Invalid token',
        TokenExpiredError: 'Token has expired'
    };

    if (jwtErrors[err.name]) {
        statusCode = 401;
        message = jwtErrors[err.name];
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

export default errorMiddleware;
