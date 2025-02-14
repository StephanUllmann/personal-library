import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import errorHandler from './utils/errorHandler.js';
import ErrorResponse from './utils/ErrorResponse.js';

import userRouter from './routes/userRouter.js';
import bookRouter from './routes/bookRouter.js';
import cookieParser from 'cookie-parser';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://astounding-pudding-a5f367.netlify.app'];

// app.use(
//   cors({
//     credentials: true,
//     origin: 'https://astounding-pudding-a5f367.netlify.app',
//   })
// );
// app.use(
//   cors({
//     origin: ['http://localhost:5173', 'http://localhost:5172', 'https://astounding-pudding-a5f367.netlify.app'],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) cb(null, true);
      else cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json(), cookieParser());

app.use('/users', userRouter);
app.use('/books', bookRouter);

app.use('*', (req, res, next) => {
  next(new ErrorResponse(`Cannot find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

export default app;
