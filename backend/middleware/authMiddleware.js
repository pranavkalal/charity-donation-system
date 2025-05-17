const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserFactory = require('../factories/UserFactory'); // ✅ NEW

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Load user doc from DB
      const userDoc = await User.findById(decoded.id).select('-password');

      // ✅ Use Factory to assign correct class (AdminUser or DonorUser)
      req.user = UserFactory.createUser(userDoc);

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
