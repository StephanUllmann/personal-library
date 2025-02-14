import { Router } from 'express';
import { getAll, getOneById, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import {
  addBookToReadingList,
  updateBookStatus,
  deleteFromReadingList,
  getUserById,
} from '../controllers/userControllers.js';
import UserModel from '../models/UserModel.js';
import { userSignup, getMe, login, logout, forgotPassword, resetPassword } from '../controllers/authControllers.js';
import authenticate from '../middlewares/authenticate.js';
import hasPermissions from '../middlewares/hasPermissions.js';
import { validate } from '../middlewares/validate.js';
import { loginSchema } from '../schemas/authSchemas.js';

const userRouter = Router();

userRouter.post('/signup', userSignup);
userRouter.post('/login', validate(loginSchema), login);
userRouter.post('/logout', logout);
userRouter.get('/me', authenticate, getMe);
// userRouter.post('/forgot-password', forgotPassword);
// userRouter.post('/reset-password/:resetToken', resetPassword);

userRouter.get('/', getAll(UserModel));
// userRouter.get('/:id', getOneById(UserModel));
userRouter.get('/:id', getUserById);
userRouter.post('/', createOne(UserModel));
userRouter.put('/:id', authenticate, updateOne(UserModel));
userRouter.delete('/:id', authenticate, hasPermissions('self', 'admin'), deleteOne(UserModel));

userRouter.post('/:id/books', authenticate, addBookToReadingList);
userRouter.put('/:id/books/:bookID', authenticate, updateBookStatus);
userRouter.delete('/:id/books/:bookID', authenticate, deleteFromReadingList);

export default userRouter;
