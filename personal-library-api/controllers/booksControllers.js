// import asyncHandler from '../utils/asyncHandler.js';
// import ErrorResponse from '../utils/ErrorResponse.js';
// import UserModel from '../models/UserModel.js';

// const getAllUsers = asyncHandler(async (req, res, next) => {
//   const users = await UserModel.find().lean();
//   res.json({ data: users });
// });

// const getUserById = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await UserModel.findById(id).lean();
//   if (!user) throw new ErrorResponse('User not found', 404);
//   res.json({ data: user });
// });

// const createUser = asyncHandler(async (req, res, next) => {
//   const user = await UserModel.create(req.body);
//   res.status(201).json({ data: user });
// });

// const updateUser = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await UserModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//   res.json({ msg: 'Update successful', data: user });
// });

// const deleteUser = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await UserModel.findByIdAndDelete(id);
//   if (!user) throw new ErrorResponse('User not found', 404);
//   res.json({ msg: `Successfully deleted`, data: user });
// });

// export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
