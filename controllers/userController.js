const userModel = require('../models/userModel');

const addUser = async (req, res) => {
  const { userId, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findByUserId(userId);
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create the new user
    const newUser = await userModel.createUser(userId, role);

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Failed to add user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

const removeUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Remove the user
    await userModel.removeUser(userId);

    res.sendStatus(204);
  } catch (error) {
    console.error('Failed to remove user:', error);
    res.status(500).json({ error: 'Failed to remove user' });
  }
};

module.exports = {
  addUser,
  removeUser,
};
