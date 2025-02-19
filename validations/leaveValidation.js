// validations/leaveValidation.js

export const validateLeaveRequest = (req, res, next) => {
    const { reason, startDate, endDate } = req.body;

    // Check if essential fields are provided
    if (!reason || !startDate || !endDate) {
        return res.status(400).json({ success: false, message: 'Reason, start date, and end date are required' });
    }

    // Check if dates are valid
    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ success: false, message: 'End date must be after the start date' });
    }

    next();
};
