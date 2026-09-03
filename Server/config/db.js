import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState === 1) {
        return;
    }

    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI is not defined in environment variables");
            return;
        }

        const dbUrl = uri.endsWith('/') ? `${uri}hotel-booking` : `${uri}/hotel-booking`;
        const conn = await mongoose.connect(dbUrl);
        isConnected = !!conn.connections[0].readyState;
        console.log("DATABASE CONNECTED");
    }
    catch (error) {
        console.log("Database connection error:", error.message);
    }
}

export default connectDB;
