import Syllabus from '../models/Syllabus.js';

export {
    getAllSyllabuses,
    getSyllabusById,
    createSyllabus,
    updateSyllabus,
    deleteSyllabus
};

async function getAllSyllabuses(req, res) {
    try {
        const syllabuses = await Syllabus.find()
            .populate('teacher', 'name')
            .populate('subject', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(syllabuses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching syllabuses', error: error.message });
    }
}

async function getSyllabusById(req, res) {
    try {
        const syllabus = await Syllabus.findById(req.params.id)
            .populate('teacher', 'name')
            .populate('subject', 'name');

        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        res.status(200).json(syllabus);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching syllabus', error: error.message });
    }
}

async function createSyllabus(req, res) {
    try {
        const newSyllabus = new Syllabus({
            ...req.body,
            teacher: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedSyllabus = await newSyllabus.save();
        res.status(201).json(savedSyllabus);
    } catch (error) {
        res.status(400).json({ message: 'Error creating syllabus', error: error.message });
    }
}

async function updateSyllabus(req, res) {
    try {
        const syllabus = await Syllabus.findById(req.params.id);

        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        // Check if user is the owner (teacher)
        if (syllabus.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this syllabus' });
        }

        const updatedSyllabus = await Syllabus.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedSyllabus);
    } catch (error) {
        res.status(400).json({ message: 'Error updating syllabus', error: error.message });
    }
}

async function deleteSyllabus(req, res) {
    try {
        const syllabus = await Syllabus.findById(req.params.id);

        if (!syllabus) {
            return res.status(404).json({ message: 'Syllabus not found' });
        }

        // Check if user is the owner (teacher)
        if (syllabus.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this syllabus' });
        }

        await Syllabus.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Syllabus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting syllabus', error: error.message });
    }
} 