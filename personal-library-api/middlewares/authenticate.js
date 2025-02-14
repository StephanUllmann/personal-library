import jwt from 'jsonwebtoken';
import ErrorResponse from '../utils/ErrorResponse.js';
import UserModel from '../models/UserModel.js';

const authenticate = async (req, res, next) => {
  let { token } = req.cookies;
  const { authorization } = req.headers;

  if (authorization) {
    token = authorization.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Not Authenticated', 401));
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findById(_id).select('username email role').lean();

    if (!user) {
      return next(new ErrorResponse('Not Authenticated', 401));
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    next(new ErrorResponse('Invalid token', 401));
  }
};

export default authenticate;
