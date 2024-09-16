import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  age: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  countryCode: {
    type: String,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  designation: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  pfp: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  otpSecret: {
    type: String,
  },
  otpExpiration: {
    type: Date,
  },
});
