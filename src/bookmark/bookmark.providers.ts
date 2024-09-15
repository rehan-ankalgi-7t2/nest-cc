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
