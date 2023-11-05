const deviceModel = require('../models/deviceModel');

const addDevice = async (req, res) => {
  const { deviceId, userId } = req.body;

  try {
    // Check if the device already exists
    const existingDevice = await deviceModel.findByDeviceId(deviceId);
    if (existingDevice) {
      return res.status(409).json({ error: 'Device already exists' });
    }

    // Create the new device
    const newDevice = await deviceModel.createDevice(deviceId, userId);

    res.status(201).json(newDevice);
  } catch (error) {
    console.error('Failed to add device:', error);
    res.status(500).json({ error: 'Failed to add device' });
  }
};

const removeDevice = async (req, res) => {
  const { deviceId } = req.params;

  try {
    // Remove the device
    await deviceModel.removeDevice(deviceId);
    res.sendStatus(204);
  } catch (error) {
    console.error('Failed to remove device:', error);
    res.status(500).json({ error: 'Failed to remove device' });
  }
};

module.exports = {
  addDevice,
  removeDevice,
};
