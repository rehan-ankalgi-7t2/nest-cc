import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkInterface } from './bookmark.interface';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  // Endpoint to create a new bookmark
  @Post()
  async create(
    @Body() createBookmarkDto: CreateBookmarkDto,
  ): Promise<BookmarkInterface> {
    return this.bookmarkService.create(createBookmarkDto);
  }

  // Endpoint to retrieve all bookmarks
  @Get()
  async findAll(): Promise<BookmarkInterface[]> {
    return this.bookmarkService.findAll();
  }
}
