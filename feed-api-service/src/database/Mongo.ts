import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const connect = async () => {
  const mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();
  await mongoose.connect(uri);
  console.log('Connected to database');
};

export {
  connect,
};
