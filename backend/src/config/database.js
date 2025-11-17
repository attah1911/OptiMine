import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Test database connection on startup
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL database (Supabase)");
    client.release();
    return true;
  } catch (error) {
    console.error("❌ Failed to connect to database:", error.message);
    console.error("📝 Please check your DATABASE_URL in .env file");
    return false;
  }
};

// Handle unexpected errors
pool.on("error", (err) => {
  console.error("❌ Unexpected error on database client", err);
});

export const query = (text, params) => pool.query(text, params);

export default pool;
