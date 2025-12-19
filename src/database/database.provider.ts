import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://veraomaior:secid2025@verao-maior-db.wbdit0w.mongodb.net/?appName=verao-maior-db',
      ),
  },
];
