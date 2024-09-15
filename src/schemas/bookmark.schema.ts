import * as mongoose from 'mongoose';

export const BookmarkSchema = new mongoose.Schema({
  name: String,
  url: String,
});
