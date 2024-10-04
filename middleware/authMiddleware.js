const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Check for 'authorization'
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Split to get the token after 'Bearer'
  
  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id; // Save decoded id to req object
    next(); // Pass to the next handler
  });
};

module.exports = authMiddleware;
