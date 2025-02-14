import { Schema, model } from 'mongoose';

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

// 1 uppercase, lowercase, number, special char, at min 8 chars
// on very long strings performance implications possible (multiple lookaheads)
const pwRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const readingObject = new Schema({
  bookRefId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
  },
  status: {
    type: String,
    enum: ['read', 'pending', 'lend', 'not read', 'lost', 'on wishlist'],
    default: 'not read',
  },
});

const userSchema = new Schema({
  firstName: {
    type: String,
    maxLength: [50, 'First name too long. Max 50 characters.'],
  },
  lastName: String,
  readingList: [readingObject],
  // username: {
  //   type: String,
  //   maxLength: [25, 'Username max. length is 25'],
  //   unique: [true, 'Username already in use'],
  //   required: [true, 'Please provide a username'],
  // },
  email: {
    type: String,
    unique: [true, 'Email already in use'],
    required: [true, 'Please provide an email'],
    match: [emailRegex, 'Email must be valid'],
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'author'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
    maxLength: 100,
    match: [
      pwRegex,
      'Password must have 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (#?!@$%^&*-), and a minimum length of 8 characters',
    ],
  },
  resetToken: {
    type: String,
    select: false,
  },
});

const UserModel = model('User', userSchema);
export default UserModel;
