// middlewares/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server error';

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;
