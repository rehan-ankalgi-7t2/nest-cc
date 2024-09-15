import { Document } from 'mongoose';

export interface BookmarkInterface extends Document {
  readonly name: string;
  readonly url: string;
}
