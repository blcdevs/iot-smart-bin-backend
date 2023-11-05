const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'employee'],
    default: 'user',
  },
});

const User = mongoose.model('User', userSchema);

const findByUserId = async (userId) => {
  try {
    const user = await User.findOne({ userId });
    return user;
  } catch (error) {
    console.error('Failed to find user by userId:', error);
    throw error;
  }
};

const createUser = async (userId, role) => {
  try {
    const newUser = new User({
      userId,
      role,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

const removeUser = async (userId) => {
  try {
    await User.deleteOne({ userId });
  } catch (error) {
    console.error('Failed to remove user:', error);
    throw error;
  }
};

module.exports = {
  findByUserId,
  createUser,
  removeUser,
};
