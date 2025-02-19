// controllers/teacherController.js
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

// Create Teacher Profile
export const createTeacherProfile = async (req, res) => {
    const { userId, subjects, qualifications, awards, schoolId } = req.body;

    try {
        const teacherProfile = new Teacher({
            user: userId,
            subjects,
            qualifications,
            awards,
            school: schoolId
        });

        await teacherProfile.save();
        res.status(201).json({ message: 'Teacher profile created successfully', teacherProfile });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Teacher Profile
export const getTeacherProfile = async (req, res) => {
    const { teacherId } = req.params;

    try {
        const teacher = await Teacher.findById(teacherId).populate('user');
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
