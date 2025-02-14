import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../models/UserModel.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
// import setAuthCookie from '../utils/setAuthCookie.js';

function setAuthCookie(res, token) {
  const secure = !['development', 'test'].includes(process.env.NODE_ENV);
  return res.cookie('token', token, {
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000), // in milliseconds
    secure,
    httpOnly: true,
    sameSite: 'lax',
  });
}

const createToken = (_id) =>
  jwt.sign({ _id }, process.env.SECRET, { expiresIn: process.env.JWT_EXPIRES_IN_DAYS + 'd' });

const userSignup = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // const exists = await User.exists({ $or: [{ email }, { username }] });
  // if (exists) throw new ErrorResponse('User already exists', 409);
  const emailInUse = await UserModel.exists({ email });
  if (emailInUse) throw new ErrorResponse('Email already in use', 409);
  // const usernameInUse = await UserModel.exists({ username });
  // if (usernameInUse) throw new ErrorResponse('Username already in use', 409);

  // encrypting pw
  const salt = await bcrypt.genSalt(10);
  const hashedPW = await bcrypt.hash(password, salt);

  const userMongoose = await UserModel.create({ ...req.body, password: hashedPW });
  const user = userMongoose.toObject();
  delete user.password;
  const token = createToken(user._id);

  setAuthCookie(res, token);

  res.status(201).json({ msg: 'Signup', user, token });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).select('+password').lean();
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse('Incorrect password', 401);

  delete user.password;
  const token = createToken(user._id);
  setAuthCookie(res, token);

  res.json({ msg: 'Login', user, token });
});

const logout = (req, res, next) => {
  res.clearCookie('token');
  res.json({ msg: 'Logout sucessful' });
};

const getMe = (req, res, next) => {
  const { user } = req;
  res.json(user);
};

const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) throw new ErrorResponse('No user with this email address', 404);
});
const resetPassword = asyncHandler(async (req, res, next) => {});

export { userSignup, getMe, login, logout, forgotPassword, resetPassword };
