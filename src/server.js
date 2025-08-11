import express from "express";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from './routes/transactionsRoute.js';
import { initDB } from './config/db.js';
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(rateLimiter);
app.use(express.json());

app.use(cors());

// for transaction
app.use("/api/transactions", transactionsRoute)

initDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is up and running on PORT:>> ', PORT);
    })
})