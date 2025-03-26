const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Campaign = require('../models/Campaign');
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} = require('../controllers/campaignController');

const { expect } = chai;

describe('Campaign Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a new campaign', async () => {
    const req = {
      body: { title: 'Clean Water Drive', description: 'Help communities', goalAmount: 10000 },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    const campaign = { _id: new mongoose.Types.ObjectId(), ...req.body };
    sinon.stub(Campaign, 'create').resolves(campaign);

    await createCampaign(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(campaign)).to.be.true;
  });

  it('should get all campaigns', async () => {
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    sinon.stub(Campaign, 'find').resolves([{ title: 'Health Camp' }]);

    await getCampaigns({}, res);
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should get a campaign by ID', async () => {
    const id = new mongoose.Types.ObjectId();
    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Campaign, 'findById').resolves({ _id: id, title: 'Food Drive' });

    await getCampaignById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should update a campaign', async () => {
    const id = new mongoose.Types.ObjectId();
    const req = { params: { id }, body: { goalAmount: 20000 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Campaign, 'findByIdAndUpdate').resolves({ _id: id, goalAmount: 20000 });

    await updateCampaign(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should delete a campaign', async () => {
    const id = new mongoose.Types.ObjectId();
    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Campaign, 'findByIdAndDelete').resolves({ _id: id });

    await deleteCampaign(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });
});
