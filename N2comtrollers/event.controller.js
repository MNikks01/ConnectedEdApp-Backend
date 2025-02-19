// controllers/eventController.js
import Event from '../models/Event.js';

// Create Event
export const createEvent = async (req, res) => {
    const { title, description, eventDate, location, schoolId } = req.body;

    try {
        const event = new Event({
            title,
            description,
            eventDate,
            location,
            school: schoolId
        });

        await event.save();
        res.status(201).json({ message: 'Event created successfully', event });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Events by School
export const getEventsBySchool = async (req, res) => {
    const { schoolId } = req.params;

    try {
        const events = await Event.find({ school: schoolId });
        if (!events) {
            return res.status(404).json({ message: 'No events found for this school' });
        }
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
