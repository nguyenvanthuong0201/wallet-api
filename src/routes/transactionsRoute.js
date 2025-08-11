import express from "express";
import { createTransactions, deleteTransactions, getSummaryTransactions, getTransactionsByUserId } from "../controllers/transactionsController.js";

const router = express.Router();

router.post("/", createTransactions)
router.get("/:userId", getTransactionsByUserId)
router.delete("/:userId", deleteTransactions)
router.get("/summary/:userId", getSummaryTransactions)

export default router; 