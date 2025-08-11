import { sql } from '../config/db.js';

export async function getTransactionsByUserId(req, res) {
    try {
        const { userId } = req.params;
        const transaction = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;
        return res.status(200).json(transaction);
    } catch (error) {
        console.log("Error creating the transaction", error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function createTransactions(req, res) {
    try {
        const { title, amount, category, user_id } = req.body;
        if (!title || !user_id || !amount || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const transaction = await sql`
                INSERT INTO transactions(user_id, title, amount, category)
                VALUES (${user_id}, ${title} ,${amount} ,${category})
                RETURNING *
            `
        return res.status(200).json({ message: "Create transaction success" });
    } catch (error) {
        console.log("Error creating the transaction", error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteTransactions(req, res) {
    try {
        const { userId } = req.params;
        const transaction = await sql`
            DELETE FROM transactions WHERE user_id = ${userId} RETURNING *
        `;
        if (transaction.length === 0) {
            return res.status(400).json({ message: "transaction not found" });
        }
        return res.status(200).json({ message: " Transaction delete successfully" });
    } catch (error) {
        console.log("Error creating the transaction", error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getSummaryTransactions(req, res) {
    try {
        const { userId } = req.params;
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
        `;

        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
        `;

        const expensesResult = await sql`
            SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
        `;

        return res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses,
        });
    } catch (error) {
        console.log("Error creating the transaction", error)
        return res.status(500).json({ message: "Internal server error" });
    }
}