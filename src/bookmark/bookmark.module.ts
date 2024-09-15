import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { bookmarkProviders } from './bookmark.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BookmarkController],
  providers: [BookmarkService, ...bookmarkProviders],
})
export class BookmarkModule {}
