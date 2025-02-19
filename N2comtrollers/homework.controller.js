// controllers/homeworkController.js
import Homework from '../models/Homework.js';

// Assign Homework
export const assignHomework = async (req, res) => {
    const { title, description, deadline, assignedBy, subject, class: className, students } = req.body;

    try {
        const newHomework = new Homework({
            title,
            description,
            deadline,
            assignedBy,
            subject,
            class: className,
            students
        });

        await newHomework.save();
        res.status(201).json({ message: 'Homework assigned successfully', newHomework });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Homework by Student
export const getHomeworkByStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const homework = await Homework.find({ students: studentId });
        if (!homework) {
            return res.status(404).json({ message: 'No homework found for this student' });
        }
        res.status(200).json(homework);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Homework
export const getAllHomework = async (req, res) => {
    try {
        const homeworkList = await Homework.find();
        res.status(200).json(homeworkList);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
