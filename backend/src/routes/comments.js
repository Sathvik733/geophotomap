const express = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/:photoId", authMiddleware, async (req, res) => {
  try {
    const { photoId } = req.params;
    const { comment } = req.body;

    const newComment = await pool.query(
      `INSERT INTO comments (photo_id, user_id, comment)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [photoId, req.user.id, comment]
    );

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:photoId", async (req, res) => {
  try {
    const { photoId } = req.params;

    const comments = await pool.query(
      `SELECT comments.*, users.name
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.photo_id = $1
       ORDER BY comments.created_at DESC`,
      [photoId]
    );

    res.json(comments.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;