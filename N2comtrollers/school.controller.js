import School from '../models/School.js';

export const createSchool = async (req, res) => {
    try {
        const { name, vision, mission, address, facilities, achievements } = req.body;
        const school = await School.create({ name, vision, mission, address, facilities, achievements });

        res.status(201).json({ message: 'School created successfully', school });
    } catch (err) {
        res.status(400).json({ error: 'Error creating school', details: err.message });
    }
};

export const getSchoolProfile = async (req, res) => {
    try {
        const school = await School.findById(req.params.id).populate('teachers');
        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }

        res.status(200).json({ school });
    } catch (err) {
        res.status(400).json({ error: 'Error fetching school profile', details: err.message });
    }
};

export const updateSchoolInfo = async (req, res) => {
    try {
        const { vision, mission, address, facilities, achievements } = req.body;
        const updatedSchool = await School.findByIdAndUpdate(
            req.params.id,
            { vision, mission, address, facilities, achievements },
            { new: true }
        );

        res.status(200).json({ message: 'School info updated successfully', school: updatedSchool });
    } catch (err) {
        res.status(400).json({ error: 'Error updating school info', details: err.message });
    }
};
