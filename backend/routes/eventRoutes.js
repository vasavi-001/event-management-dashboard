import express from 'express';
import { createEvent, getEvents, registerForEvent } from '../controllers/eventController.js';
// import { auth } from '../middleware/auth.js';
import {auth} from '../middleware/auth.js';

const router = express.Router();

router.post('/create', auth, createEvent); // Organizer only
router.get('/', getEvents); // View all events
router.post('/register/:eventId', auth, registerForEvent); // User registration

export default router;
