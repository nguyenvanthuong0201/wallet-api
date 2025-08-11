import { neon} from '@neondatabase/serverless';
import "dotenv/config";

// create a SQL connect using BD;
export const sql = neon(process.env.DATABASE_URL);

// init database
export async function initDB() {
    try {
        await sql `CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10,2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE 
        )`
        console.log("Database initialized successfully")
    } catch (error) {
        console.log("ERROR initialing DB", error)
        process.exit(1);
    }
}