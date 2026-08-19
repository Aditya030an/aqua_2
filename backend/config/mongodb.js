import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path: ".env"
});

// Cache the connection across serverless invocations so we don't
// open a new connection (or run queries before one is ready) on every request.
let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

const databaseConnection = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Already connected — reuse it.
    if (cached.conn) return cached.conn;

    // Connection in progress — wait for the same promise.
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_URI, {
                bufferCommands: false, // fail fast instead of buffering 10s
                serverSelectionTimeoutMS: 15000,
            })
            .then((m) => {
                console.log("MongoDb connect successfully");
                return m;
            })
            .catch((error) => {
                // Reset so the next request can retry the connection.
                cached.promise = null;
                console.log("MongoDb connection error:", error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default databaseConnection;
