import mongoose, { Mongoose } from 'mongoose';

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
    return cached.conn;
  }

  if (!cached || !cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached = global.mongoose = {
      conn: null,
      promise: mongoose.connect(MONGODB_URI, opts)
    };
  }

  try {
    const conn = await cached.promise;
    cached.conn = conn;
  } catch (e) {
    if (cached) cached.promise = null;
    throw e;
  }

  return cached.conn as Mongoose;
}

export default dbConnect;