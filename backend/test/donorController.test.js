const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Donor = require('../models/Donor');
const {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} = require('../controllers/donorController');

const { expect } = chai;

describe('Donor Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should create a new donor successfully', async () => {
    const req = {
      body: { name: 'Jane Doe', email: 'jane@example.com' }
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };
  
    const mockDonor = { _id: new mongoose.Types.ObjectId(), ...req.body };
    const stub = sinon.stub(Donor, 'create').resolves(mockDonor);
  
    await createDonor(req, res); // ← MUST be awaited
  
    expect(stub.calledOnceWith(req.body)).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(mockDonor)).to.be.true;
  });
  

  it('should return all donors', async () => {
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    sinon.stub(Donor, 'find').resolves([{ name: 'Jane' }]);

    await getDonors({}, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.called).to.be.true;
  });

  it('should get donor by ID', async () => {
    const donorId = new mongoose.Types.ObjectId();
    const req = { params: { id: donorId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Donor, 'findById').resolves({ _id: donorId, name: 'Jane' });

    await getDonorById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.called).to.be.true;
  });

  it('should update a donor', async () => {
    const donorId = new mongoose.Types.ObjectId();
    const req = { params: { id: donorId }, body: { phone: '999' } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Donor, 'findByIdAndUpdate').resolves({ _id: donorId, ...req.body });

    await updateDonor(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.called).to.be.true;
  });

  it('should delete a donor', async () => {
    const donorId = new mongoose.Types.ObjectId();
    const req = { params: { id: donorId } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    sinon.stub(Donor, 'findByIdAndDelete').resolves({ _id: donorId });

    await deleteDonor(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.firstCall.args[0]).to.have.property('message', 'Donor deleted');
  });
});
