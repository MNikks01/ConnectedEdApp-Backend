// validations/schoolValidation.js

export const validateSchoolProfileUpdate = (req, res, next) => {
    const { name, vision, mission, contactNumber, address } = req.body;

    // Check if essential fields are provided
    if (!name || !vision || !mission || !contactNumber || !address) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Validate phone number format (example, you can modify as per your requirements)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contactNumber)) {
        return res.status(400).json({ success: false, message: 'Invalid contact number format' });
    }

    next();
};
