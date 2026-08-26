import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";


dotenv.config();

connectDB();
connectCloudinary();

const app = express();

app.use(cors()); // Enable Cross Origin Resource Sharing

// JSON body parser middleware for standard API routes
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => {res.send("API is working")});
app.use("/api/user", userRouter);
app.use("/api/hotels" , hotelRouter);
app.use("/api/rooms" , roomRouter);
app.use("/api/bookings", bookingsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
