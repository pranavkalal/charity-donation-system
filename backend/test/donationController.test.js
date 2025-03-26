const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Donation = require('../models/Donation');
const {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
} = require('../controllers/donationController');

const { expect } = chai;

describe('Donation Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a new donation', async () => {
    const req = {
      body: {
        amount: 100,
        donorId: new mongoose.Types.ObjectId(),
      },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    const donation = { _id: new mongoose.Types.ObjectId(), ...req.body };
    sinon.stub(Donation, 'create').resolves(donation);

    await createDonation(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(donation)).to.be.true;
  });

  it('should get all donations', async () => {
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    sinon.stub(Donation, 'find').resolves([{ amount: 50 }]);

    await getDonations({}, res);
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should get a donation by ID', async () => {
    const id = new mongoose.Types.ObjectId();
    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Donation, 'findById').resolves({ _id: id, amount: 50 });

    await getDonationById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should update a donation', async () => {
    const id = new mongoose.Types.ObjectId();
    const req = { params: { id }, body: { amount: 200 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Donation, 'findByIdAndUpdate').resolves({ _id: id, amount: 200 });

    await updateDonation(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });

  it('should delete a donation', async () => {
    const id = new mongoose.Types.ObjectId();
    const req = { params: { id } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Donation, 'findByIdAndDelete').resolves({ _id: id });

    await deleteDonation(req, res);
    expect(res.status.calledWith(200)).to.be.true;
  });
});
