import ProjectAndHomework from '../models/ProjectAndHomework.js';

export {
    getAllProjectsAndHomeworks,
    getProjectAndHomeworkById,
    createProjectAndHomework,
    updateProjectAndHomework,
    deleteProjectAndHomework
};

async function getAllProjectsAndHomeworks(req, res) {
    try {
        const projectsAndHomeworks = await ProjectAndHomework.find()
            .populate('teacher', 'name')
            .populate('school', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(projectsAndHomeworks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects and homeworks', error: error.message });
    }
}

async function getProjectAndHomeworkById(req, res) {
    try {
        const projectAndHomework = await ProjectAndHomework.findById(req.params.id)
            .populate('teacher', 'name')
            .populate('school', 'name');

        if (!projectAndHomework) {
            return res.status(404).json({ message: 'Project or homework not found' });
        }

        res.status(200).json(projectAndHomework);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching project or homework', error: error.message });
    }
}

async function createProjectAndHomework(req, res) {
    try {
        const newProjectAndHomework = new ProjectAndHomework({
            ...req.body,
            teacher: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedProjectAndHomework = await newProjectAndHomework.save();
        res.status(201).json(savedProjectAndHomework);
    } catch (error) {
        res.status(400).json({ message: 'Error creating project or homework', error: error.message });
    }
}

async function updateProjectAndHomework(req, res) {
    try {
        const projectAndHomework = await ProjectAndHomework.findById(req.params.id);

        if (!projectAndHomework) {
            return res.status(404).json({ message: 'Project or homework not found' });
        }

        // Check if user is the owner (teacher)
        if (projectAndHomework.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this project or homework' });
        }

        const updatedProjectAndHomework = await ProjectAndHomework.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedProjectAndHomework);
    } catch (error) {
        res.status(400).json({ message: 'Error updating project or homework', error: error.message });
    }
}

async function deleteProjectAndHomework(req, res) {
    try {
        const projectAndHomework = await ProjectAndHomework.findById(req.params.id);

        if (!projectAndHomework) {
            return res.status(404).json({ message: 'Project or homework not found' });
        }

        // Check if user is the owner (teacher)
        if (projectAndHomework.teacher.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this project or homework' });
        }

        await ProjectAndHomework.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project or homework deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting project or homework', error: error.message });
    }
} 