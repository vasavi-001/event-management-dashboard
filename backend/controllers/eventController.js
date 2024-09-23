import Event from '../models/Event.js';
import User from '../models/User.js';

// Create Event (Organizers only)
export const createEvent = async (req, res) => {
  const { name, description, date, maxRegistrations } = req.body;
  try {
    const event = new Event({
      name,
      description,
      date,
      maxRegistrations,
      organizer: req.user.userId // Organizer creating the event
    });
    await event.save();
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Event creation failed' });
  }
};

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get events' });
  }
};

// Register for Event
export const registerForEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (event.registrations.length >= event.maxRegistrations) {
      return res.status(400).json({ error: 'Event is full' });
    }

    event.registrations.push(req.user.userId);
    await event.save();

    // Emit real-time registration update
    req.io.emit('registrationUpdate', { eventId, registrations: event.registrations.length });

    res.json({ message: 'Registered for event successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};
