import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import UserModel from '../models/UserModel.js';
import BookModel from '../models/BookModel.js';

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await UserModel.find().lean();
  res.json({ data: users });
});

const getUserById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findById(id).populate('readingList.bookRefId', 'title author description ').lean();
  if (!user) throw new ErrorResponse('User not found', 404);
  res.json({ data: user });
});

const createUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  res.status(201).json({ data: user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.json({ msg: 'Update successful', data: user });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) throw new ErrorResponse('User not found', 404);
  res.json({ msg: `Successfully deleted`, data: user });
});

const addBookToReadingList = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { bookRefId } = req.body;

  const bookExists = await BookModel.exists({ _id: bookRefId });
  if (!bookExists) throw new ErrorResponse('Book not found', 404);

  // const user = await UserModel.findByIdAndUpdate(
  //   id,
  //   {
  //     $addToSet: {
  //       readingList: {
  //         bookRefId,
  //         status: 'not read',
  //       },
  //     },
  //   },
  //   { new: true, runValidators: true }
  // );

  // Um sicher zu gehen, dass das Buch nicht schon in der Liste ist, reicht ein einfaches $addToSet nicht aus. Jeder Eintrag in der readingList ist ein eigenen Object mit eigener _id. Also müssen wir im Filter sicherstellen, dass die bookRefId nicht unserem Input entspricht ($ne - not equal)
  const user = await UserModel.findOneAndUpdate(
    { _id: id, 'readingList.bookRefId': { $ne: bookRefId } }, // Filter
    {
      $addToSet: {
        readingList: {
          bookRefId,
        },
      },
    },
    { new: true, runValidators: true }
  );
  if (!user) throw new ErrorResponse('Book already in List', 409);

  res.json({ data: 'Add book to reading list', data: user });
});

const updateBookStatus = asyncHandler(async (req, res, next) => {
  const { id, bookID } = req.params;
  const { status } = req.body;

  const user = await UserModel.findOneAndUpdate(
    { _id: id, 'readingList.bookRefId': bookID },
    { $set: { 'readingList.$.status': status } },
    { new: true, runValidators: true }
  );

  if (!user) throw new ErrorResponse('User not found', 404);

  res.json({ data: 'Add book to reading list', data: user });
});
const deleteFromReadingList = asyncHandler(async (req, res, next) => {
  const { id, bookID } = req.params;

  const user = await UserModel.findByIdAndUpdate(
    id,
    { $pull: { readingList: { bookRefId: bookID } } },
    { new: true, runValidators: true }
  );

  if (!user) throw new ErrorResponse('User not found', 404);

  res.json({ data: 'Add book to reading list', data: user });
});

export {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addBookToReadingList,
  updateBookStatus,
  deleteFromReadingList,
};
