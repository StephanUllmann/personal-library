import ErrorResponse from '../utils/ErrorResponse.js';

const validate = (schema) => (req, res, next) => {
  const value = schema.validate(req.body, { abortEarly: false });
  if (value.error) {
    const errResponse = new ErrorResponse(value.error, 400);
    errResponse.name = 'ValidationError';
    return next(errResponse);
  }
  next();
};

export { validate };
