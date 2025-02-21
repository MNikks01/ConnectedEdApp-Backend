import Event from '../../models/Event.js'; // Adjust the path as necessary

const eventResolvers = {
    Query: {
        events: async () => {
            try {
                const events = await Event.find()
                    .populate('owner', 'name')
                    .populate('chiefGuest', 'name');
                return events;
            } catch (error) {
                throw new Error('Error fetching events: ' + error.message);
            }
        },
        event: async (_, { id }) => {
            try {
                const event = await Event.findById(id)
                    .populate('owner', 'name')
                    .populate('chiefGuest', 'name');

                if (!event) {
                    throw new Error('Event not found');
                }

                return event;
            } catch (error) {
                throw new Error('Error fetching event: ' + error.message);
            }
        },
        getAllEvents: async () => {
            try {
                const events = await Event.find()
                    .populate('owner', 'name')
                    .populate('chiefGuest', 'name');
                return events;
            } catch (error) {
                throw new Error('Error fetching events: ' + error.message);
            }
        },
        getEventById: async (_, { id }) => {
            try {
                const event = await Event.findById(id)
                    .populate('owner', 'name')
                    .populate('chiefGuest', 'name');

                if (!event) {
                    throw new Error('Event not found');
                }

                return event;
            } catch (error) {
                throw new Error('Error fetching event: ' + error.message);
            }
        },
    },
    Mutation: {
        createEvent: async (_, { date, title, description, type, mode, owner, crowdAllowed, chiefGuest }) => {
            try {
                const event = new Event({ date, title, description, type, mode, owner, crowdAllowed, chiefGuest });
                return await event.save();
            } catch (error) {
                throw new Error('Error creating event: ' + error.message);
            }
        },
        updateEvent: async (_, { id, date, title, description, type, mode, crowdAllowed, chiefGuest }) => {
            try {
                const event = await Event.findById(id);

                if (!event) {
                    throw new Error('Event not found');
                }

                const updatedEvent = await Event.findByIdAndUpdate(
                    id,
                    { date, title, description, type, mode, crowdAllowed, chiefGuest },
                    { new: true, runValidators: true }
                );

                return updatedEvent;
            } catch (error) {
                throw new Error('Error updating event: ' + error.message);
            }
        },
        deleteEvent: async (_, { id }) => {
            try {
                const event = await Event.findById(id);

                if (!event) {
                    throw new Error('Event not found');
                }

                await Event.findByIdAndDelete(id);
                return { message: 'Event deleted successfully' };
            } catch (error) {
                throw new Error('Error deleting event: ' + error.message);
            }
        },
    },
};

export default eventResolvers; 