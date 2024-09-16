# Working with mongoose models in nestjs

- `step1`: create model schema
    
    Example: bookmark schema
    ````typescript
    import * as mongoose from 'mongoose';

    export const BookmarkSchema = new mongoose.Schema({
        name: String,
        url: String,
    });
    ````

- `step2`: create provider to `inject` model into service
    
    Example: bookmark provider
    ````typescript
    import { Connection } from 'mongoose';
    import { BookmarkSchema } from 'src/schemas/bookmark.schema';

    export const bookmarkProviders = [
    {
        provide: 'BOOKMARK_MODEL',
        useFactory: (connection: Connection) => {
        return connection.model('Bookmark', BookmarkSchema);
        },
        inject: ['DATABASE_CONNECTION'],
    },
    ];
    ````

- `step3`: Inject the model into the service
    
    Example: bookmark service
    ````typescript
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
    ````

- `step4`: create model dto & Interface to use them as params and return types
    
    Example: bookmark dto
    ````typescript
    export class CreateBookmarkDto {
        // Define your fields here
        readonly title: string;
        readonly url: string;
    }
    ````

    ````typescript
    import { Document } from 'mongoose';

    export interface BookmarkInterface extends Document {
        readonly name: string;
        readonly url: string;
    }
    ````

- `step5`: write service business logic & controllers for the modules using injected model, interface and 
    
    Example: bookmark provider
    ````typescript
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
    ````