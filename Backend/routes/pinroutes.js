import express from 'express';
import { createPin, editPin, deletePin, fetchUserPins } from '../controller/pincontroller.js';

const router = express.Router();

// Create a new pin
router.post('/', createPin);

// Edit a pin
router.put('/:pinId', editPin);

// Delete a pin
router.delete('/:pinId', deletePin);

// Fetch all pins for a user
router.get('/user/:userId', fetchUserPins);

export default router;