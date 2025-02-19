// validations/teacherValidation.js

export const validateTeacherProfileUpdate = (req, res, next) => {
    const { name, subjects, qualification, contactNumber } = req.body;

    // Check if essential fields are provided
    if (!name || !subjects || !qualification || !contactNumber) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate contact number format (example, you can modify as per your requirements)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contactNumber)) {
        return res.status(400).json({ success: false, message: 'Invalid contact number format' });
    }

    next();
};
