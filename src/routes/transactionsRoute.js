import express from "express";
import { createTransactions, deleteTransactions, getSummaryTransactions, getTransactionsByUserId } from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId)
router.get("/summary/:userId", getSummaryTransactions)

router.post("/", createTransactions)

router.delete("/:userId", deleteTransactions)

export default router; 