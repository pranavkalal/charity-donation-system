// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      goalAmount,
      currency,
      startDate,
      endDate,
      status,
      mediaUrl
    } = req.body;

    if (!title || !description || !goalAmount || !startDate || !endDate) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    const campaign = await Campaign.create({
      title,
      description,
      goalAmount,
      currency: currency || "USD",
      startDate,
      endDate,
      status: status || "Active",
      mediaUrl
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create campaign', error: error.message });
  }
};

// Update a campaign
const updateCampaign = async (req, res) => {
  try {
    const updatedData = req.body;

    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update campaign', error: error.message });
  }
};
