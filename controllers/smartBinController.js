const SmartBin = require('../models/smartBinModel');

const createSmartBin = async (req, res) => {
  const { binId, binLevel, binOrientation, binLocation, binName } = req.query;

  try {
    const newSmartBin = await SmartBin.createSmartBin({
      binId,
      binLevel,
      binOrientation,
      binLocation,
      binName,
    });

    res.status(201).json(newSmartBin);
  } catch (error) {
    console.error('Failed to create smart bin:', error);
    res.status(500).json({ error: 'Failed to create smart bin' });
  }
};

const updateSmartBin = async (req, res) => {
  const { id } = req.params;
  const { binLevel, binOrientation, binLocation, binName } = req.query;

  try {
    const updatedSmartBin = await SmartBin.updateSmartBin(id, {
      binLevel,
      binOrientation,
      binLocation,
      binName,
    });

    res.json(updatedSmartBin);
  } catch (error) {
    console.error('Failed to update smart bin:', error);
    res.status(500).json({ error: 'Failed to update smart bin' });
  }
};

const deleteSmartBin = async (req, res) => {
  const { id } = req.params;

  try {
    await SmartBin.deleteSmartBin(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Failed to delete smart bin:', error);
    res.status(500).json({ error: 'Failed to delete smart bin' });
  }
};

const getSmartBin = async (req, res) => {
  try {
    const { id } = req.params;
    const { binLevel, binOrientation, binLocation, binName } = req.query;

    const smartBin = await SmartBin.findOne({ id });

    if (!smartBin) {
      return res.status(404).json({ error: 'Smart bin not found' });
    }

    if (binLevel) {
      smartBin.binLevel = binLevel;
    }
    if (binOrientation) {
      smartBin.binOrientation = binOrientation;
    }
    if (binLocation) {
      smartBin.binLocation = binLocation;
    }
    if (binName) {
      smartBin.binName = binName;
    }

    await smartBin.save();

    res.status(200).json({ message: 'Smart bin updated successfully', smartBin });
  } catch (error) {
    console.error('Error updating smart bin:', error);
    res.status(500).json({ error: 'Failed to update smart bin' });
  }
};


const getSmartBinByBinId = async (req, res) => {
  try {
    const { binId } = req.params;
    const { binLevel, binOrientation, binLocation, binName } = req.query;

    const smartBin = await SmartBin.getSmartBinByBinId(binId);

    if (!smartBin) {
      return res.status(404).json({ error: 'Smart bin not found' });
    }

    if (binLevel) {
      smartBin.binLevel = binLevel;
    }
    if (binOrientation) {
      smartBin.binOrientation = binOrientation;
    }
    if (binLocation) {
      smartBin.binLocation = binLocation;
    }
    if (binName) {
      smartBin.binName = binName;
    }

    await smartBin.save();

    res.status(200).json({ message: 'Smart bin updated successfully', smartBin });
  } catch (error) {
    console.error('Error updating smart bin:', error);
    res.status(500).json({ error: 'Failed to update smart bin' });
  }
};



const getAllSmartBins = async (req, res) => {
  try {
    const smartBins = await SmartBin.getAllSmartBins();
    res.json(smartBins);
  } catch (error) {
    console.error('Failed to retrieve smart bins:', error);
    res.status(500).json({ error: 'Failed to retrieve smart bins' });
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