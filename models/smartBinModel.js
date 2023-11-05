const mongoose = require('mongoose');

const smartBinSchema = new mongoose.Schema({
  binId: {
    type: String,
    required: true,
    unique: true,
  },
  binLevel: {
    type: Number,
    required: true,
  },
  binOrientation: {
    type: String,
    required: true,
  },
  binLocation: {
    type: String,
    required: true,
  },
  binName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const SmartBin = mongoose.model('SmartBin', smartBinSchema);

const createSmartBin = async ({ binId, binLevel, binOrientation, binLocation, binName }) => {
  try {
    const newSmartBin = new SmartBin({
      binId,
      binLevel,
      binOrientation,
      binLocation,
      binName,
    });

    await newSmartBin.save();

    return newSmartBin;
  } catch (error) {
    throw error;
  }
};

const updateSmartBin = async (id, { binLevel, binOrientation, binLocation, binName }) => {
  try {
    const updatedSmartBin = await SmartBin.findByIdAndUpdate(
      id,
      {
        binLevel,
        binOrientation,
        binLocation,
        binName,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    return updatedSmartBin;
  } catch (error) {
    throw error;
  }
};

const deleteSmartBin = async (id) => {
  try {
    await SmartBin.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

const getSmartBin = async (id) => {
  try {
    const smartBin = await SmartBin.findById(id);
    return smartBin;
  } catch (error) {
    throw error;
  }
};

const getSmartBinByBinId = async (binId) => {
  try {
    const smartBin = await SmartBin.findOne({ binId });
    return smartBin;
  } catch (error) {
    throw error;
  }
};

const getAllSmartBins = async () => {
  try {
    const smartBins = await SmartBin.find();
    return smartBins;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createSmartBin,
  updateSmartBin,
  deleteSmartBin,
  getSmartBin,
  getAllSmartBins,
  getSmartBinByBinId,
};