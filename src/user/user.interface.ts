import { Document } from 'mongoose';

export interface UserInterface extends Document {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  age?: string;
  gender?: string;
  dob?: Date;
  countryCode?: string;
  mobile: string;
  email?: string;
  designation?: string;
  status?: number;
  pfp?: string;
  refreshToken?: string;
  otpSecret?: string;
  otpExpiration?: Date;
}
