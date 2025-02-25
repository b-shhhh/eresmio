import Pin from '../model/pinmodel.js';

// Create a new pin
export const createPin = async (req, res) => {
    try {
        const { userId, imageUrl, description } = req.body;
        const newPin = await Pin.create({ userId, imageUrl, description });
        res.status(201).json({ message: 'Pin created successfully', pin: newPin });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Edit a pin
export const editPin = async (req, res) => {
    try {
        const { pinId } = req.params;
        const updatedData = req.body;

        const [updated] = await Pin.update(updatedData, {
            where: { id: pinId },
        });

        if (!updated) {
            return res.status(404).json({ error: 'Pin not found' });
        }

        const updatedPin = await Pin.findByPk(pinId);
        res.status(200).json({ message: 'Pin updated successfully', pin: updatedPin });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a pin
export const deletePin = async (req, res) => {
    try {
        const { pinId } = req.params;

        const deleted = await Pin.destroy({
            where: { id: pinId },
        });

        if (!deleted) {
            return res.status(404).json({ error: 'Pin not found' });
        }

        res.status(200).json({ message: 'Pin deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch all pins for a user
export const fetchUserPins = async (req, res) => {
    try {
        const { userId } = req.params;
        const pins = await Pin.findAll({ where: { userId } });
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};