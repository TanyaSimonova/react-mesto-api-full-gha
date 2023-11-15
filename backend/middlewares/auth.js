const jwt = require('jsonwebtoken');
const NotAuthenticated = require('../errors/NotAuthenticated');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAuthenticated('Authorization required');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'jwt-secret-key');
  } catch (e) {
    if (e.name === 'JsonWebTokenError') {
      next(new NotAuthenticated('Problems with the token'));
    }
  }
  req.user = payload;
  next();
};
