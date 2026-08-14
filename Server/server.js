import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
dotenv.config();

connectDB();

const app = express();

app.use(cors()); // Enable Cross Origin Resource Sharing

// JSON body parser middleware for standard API routes
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => {
    res.send("API is working")
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
