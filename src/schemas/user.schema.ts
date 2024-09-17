import * as mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// Extend the Mongoose Document interface to include the modified field
interface UserDocument extends Document {
  password: string;
  isModified: (field: string) => boolean;
}

UserSchema.pre<UserDocument>(
  'save',
  async function (
    next: (error?: mongoose.CallbackError) => void,
  ): Promise<any> {
    const user = this; // aliasing the this keyword with user for this user model context

    // Only hash the password if it has been modified (or is new)
    if (user.isModified('password')) {
      try {
        const salt = await bcrypt.genSalt(10); // Adjust salt rounds if needed
        user.password = await bcrypt.hash(user.password, salt);
      } catch (error) {
        return next(error); // Pass the error to the next middleware
      }
    }

    next();
  },
);
