const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Device = mongoose.model('Device', deviceSchema);

const findByDeviceId = async (deviceId) => {
  try {
    const device = await Device.findOne({ deviceId });
    return device;
  } catch (error) {
    console.error('Failed to find device by deviceId:', error);
    throw error;
  }
};

const createDevice = async (deviceId, userId) => {
  try {
    const newDevice = new Device({
      deviceId,
      userId,
    });

    await newDevice.save();

    return newDevice;
  } catch (error) {
    console.error('Failed to create device:', error);
    throw error;
  }
};

const removeDevice = async (deviceId) => {
  try {
    await Device.deleteOne({ deviceId });
  } catch (error) {
    console.error('Failed to remove device:', error);
    throw error;
  }
};

module.exports = {
  findByDeviceId,
  createDevice,
  removeDevice,
};
