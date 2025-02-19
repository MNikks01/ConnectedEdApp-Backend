import Event from '../models/Event';

export async function getAllEvents(req, res) {
    try {
        const events = await Event.find()
            .populate('onwer', 'name')
            .populate('chiefGuest', 'name');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
}

export async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id)
            .populate('onwer', 'name')
            .populate('chiefGuest', 'name');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching event', error: error.message });
    }
}

export async function createEvent(req, res) {
    try {
        const newEvent = new Event({
            ...req.body,
            onwer: req.user._id // Assuming user ID is available from auth middleware
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error: error.message });
    }
}

export async function updateEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is the owner
        if (event.onwer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this event' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error updating event', error: error.message });
    }
}

export async function deleteEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is the owner
        if (event.onwer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await Event.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
} 