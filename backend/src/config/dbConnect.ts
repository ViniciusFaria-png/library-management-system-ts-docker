import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectInDataBase = async () => {
    try {

      if (process.env.NODE_ENV === 'test'){
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri);
        console.log('Connected to in-memory MongoDB');
      } else {
        const connectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`;
        await mongoose.connect(connectionString, {
          authMechanism: 'SCRAM-SHA-256',
          authSource: 'admin',
          retryWrites: true,
          w: 'majority'
      });
      
      console.log('MongoDB Connected...');
      }
      
    } catch (err) {
      console.error('Database connection error:', err);
      process.exit(1);
    }
};

export default connectInDataBase;