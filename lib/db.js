import mongoose from 'mongoose';

let cached = global.mongoose
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("check you mongodb uri in env")
}
if (!cached) {
    cached = global.mongoose={conn:null, promise:null}
}

export async function connectDb() {
 if (cached.conn) {
    return cached.conn;
 }

 if (!cached.promise) {    

  const opts = {
bufferCommands:true,
maxPoolSize:10,
  }  

  cached.promise = mongoose.connect(MONGODB_URI,opts).then(()=>mongoose.connection)

 }
 
 try {
    cached.conn = await cached.promise;
 } catch (error) {
    cached.promise = null;
    throw error
 }
}