import express from "express";
import pool from "../pool.js"; // import the Postgres pool

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // comes from verifyToken middleware
    console.log(userId);

    const result = await pool.query(
      "INSERT INTO notes (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
      [title, content, userId]
    );

    res.json({ note: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add note" });
  }
});

// GET /api/notes - fetch all notes for logged-in user
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;

    // Postgres query
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY id DESC",
      [userId]
    );

    const notes = result.rows;

    if (notes.length === 0) {
      return res.status(200).json({ message: "No notes found", notes: [] });
    }

    res.json({ notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const noteId = parseInt(id, 10);
  if (isNaN(noteId)) {
    return res.status(400).json({ error: "Invalid note ID" });
  }
  const userId = req.userId;

  try {
    // Option 1: Use DELETE ... RETURNING to check whether a row was removed
    const deleteQuery = `
      DELETE FROM notes
      WHERE id = $1 AND user_id = $2
      RETURNING id, title;
    `;
    const { rows } = await pool.query(deleteQuery, [noteId, userId]);

    if (rows.length === 0) {
      // either note doesn't exist, or it doesn't belong to this user
      return res
        .status(404)
        .json({ error: "Note not found or not owned by you" });
    }

    return res.status(200).json({ message: "Note deleted", deleted: rows[0] });
  } catch (err) {
    console.error("Error deleting note:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
