// utils/errorHandler.js

export const handleError = (error, res) => {
    // Log the error for server-side debugging
    console.error(error);

    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong. Please try again later.";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }), // Send stack trace in dev mode
    });
};
