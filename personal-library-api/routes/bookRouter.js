import { Router } from 'express';
import { getAll, getOneById, createOne, updateOne, deleteOne } from '../controllers/crudFactory.js';
import BookModel from '../models/BookModel.js';

const bookRouter = Router();

bookRouter.get('/', getAll(BookModel));
bookRouter.get('/:id', getOneById(BookModel));
bookRouter.post('/', createOne(BookModel));
bookRouter.put('/:id', updateOne(BookModel));
bookRouter.delete('/:id', deleteOne(BookModel));

export default bookRouter;
