import mongoose, { Mongoose, ConnectOptions } from 'mongoose';

declare global {
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
  if (cached && cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }

  if (!cached || !cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      // Removed: useNewUrlParser and useUnifiedTopology are no longer needed
      // They are set to true by default in newer versions of Mongoose
    };

    console.log('Connecting to MongoDB...');
    cached = global.mongoose = {
      conn: null,
      promise: mongoose.connect(MONGODB_URI, opts)
    };
  }

  try {
    const conn = await cached.promise;
    console.log('Successfully connected to MongoDB');
    cached.conn = conn;
  } catch (e) {
    console.error('Error connecting to MongoDB:', e);
    if (cached) cached.promise = null;
    throw e;
  }

  return cached.conn as Mongoose;
}

export default dbConnect;
