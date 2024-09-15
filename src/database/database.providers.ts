import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const mongoUri = configService.get<string>('MONGO_URI');

      if (!mongoUri) {
        throw new Error('MONGO_URI not defined in environment variables');
      }
      return mongoose.connect(mongoUri);
    },
    inject: [ConfigService], // Inject ConfigService to access environment variables
  },
];
