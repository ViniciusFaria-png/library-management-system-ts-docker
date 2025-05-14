import mongoose from 'mongoose';
import connectInDataBase from '../src/config/dbConnect'

beforeAll(async () => {
  await connectInDataBase();
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1){
    await mongoose.disconnect();
  }
});