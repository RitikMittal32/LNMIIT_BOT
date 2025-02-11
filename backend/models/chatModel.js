import pool from "../config/database.js";

// Save chat message
export const saveMessage = async (sessionId, sender, message) => {
  await pool.query(
    'INSERT INTO chat_messages (session_id, sender, message) VALUES (?, ?, ?)',
    [sessionId, sender, message]
  );
};

// Get chat history
export const getChatHistory = async (sessionId) => {
  const [rows] = await pool.query(
    'SELECT * FROM chat_messages WHERE session_id = ? ORDER BY timestamp ASC',
    [sessionId]
  );
  return rows;
};
