const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const {
  registerUser,
  loginUser,
  getProfile,
  updateUserProfile,
} = require('../controllers/authController');

const { expect } = chai;

describe('Auth Controller', function () {
  this.timeout(5000); // Extend timeout if needed

  afterEach(() => {
    sinon.restore();
  });

  describe('registerUser', () => {
    it('should register a new user', async () => {
      const req = {
        body: { name: 'Test User', email: 'test@example.com', password: 'pass123' }
      };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(User, 'findOne').resolves(null);
      const mockUser = { id: '123', name: 'Test User', email: 'test@example.com' };
      sinon.stub(User, 'create').resolves(mockUser);
      sinon.stub(jwt, 'sign').returns('mockedtoken');

      await registerUser(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWithMatch({ email: req.body.email, token: 'mockedtoken' })).to.be.true;
    });

    it('should return 400 if user already exists', async () => {
      const req = {
        body: { name: 'Existing User', email: 'exist@example.com', password: 'pass' }
      };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(User, 'findOne').resolves({ email: 'exist@example.com' });

      await registerUser(req, res);
      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'User already exists' })).to.be.true;
    });
  });

  describe('loginUser', () => {
    it('should login with valid credentials', async () => {
      const req = {
        body: { email: 'test@example.com', password: 'pass123' }
      };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      const mockUser = {
        id: 'user123',
        name: 'User Test',
        email: 'test@example.com',
        password: 'hashed',
      };

      sinon.stub(User, 'findOne').resolves(mockUser);
      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(jwt, 'sign').returns('mocktoken');

      await loginUser(req, res);
      expect(res.json.calledWithMatch({ email: req.body.email, token: 'mocktoken' })).to.be.true;
    });

    it('should return 401 if credentials are invalid', async () => {
      const req = { body: { email: 'x@y.com', password: 'wrong' } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      sinon.stub(User, 'findOne').resolves({ email: 'x@y.com', password: 'hashedpass' });
      sinon.stub(bcrypt, 'compare').resolves(false);

      await loginUser(req, res);
      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Invalid email or password' })).to.be.true;
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      const req = { user: { id: 'userId123' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(User, 'findById').resolves({
        name: 'John',
        email: 'john@example.com',
        university: 'QUT',
        address: 'Brisbane',
      });

      await getProfile(req, res);
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWithMatch({ name: 'John' })).to.be.true;
    });

    it('should return 404 if user not found', async () => {
      const req = { user: { id: 'invalidId' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(User, 'findById').resolves(null);
      await getProfile(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'User not found' })).to.be.true;
    });
  });

  describe('updateUserProfile', () => {
    it('should update and return updated user profile', async () => {
      const req = {
        user: { id: 'userId123' },
        body: {
          name: 'Updated Name',
          university: 'Updated Uni'
        }
      };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      const mockUser = {
        name: 'Old Name',
        email: 'user@example.com',
        university: 'Old Uni',
        address: 'Old Addr',
        save: sinon.stub().resolvesThis(),
        id: 'userId123',
      };

      sinon.stub(User, 'findById').resolves(mockUser);
      sinon.stub(jwt, 'sign').returns('token');

      await updateUserProfile(req, res);
      expect(res.json.calledWithMatch({ name: 'Updated Name', university: 'Updated Uni' })).to.be.true;
    });

    it('should return 404 if user not found', async () => {
      const req = { user: { id: 'unknown' }, body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(User, 'findById').resolves(null);

      await updateUserProfile(req, res);
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'User not found' })).to.be.true;
    });
  });
});
