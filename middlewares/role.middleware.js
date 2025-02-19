// middlewares/roleMiddleware.js
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};

export default roleMiddleware;
