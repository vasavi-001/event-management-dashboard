import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maxRegistrations: {
    type: Number,
    required: true,
  },
  registrations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
