import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookmarkInterface } from './bookmark.interface';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @Inject('BOOKMARK_MODEL') private bookmarkModel: Model<BookmarkInterface>,
  ) {}

  async create(
    createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkInterface> {
    const createdBookmark = new this.bookmarkModel(createBookmarkDto);
    return createdBookmark.save();
  }

  async findAll(): Promise<BookmarkInterface[]> {
    return this.bookmarkModel.find().exec();
  }
}
