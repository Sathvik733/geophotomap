const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const pool = require("../db");
const authMiddleware = require("../middleware/auth");
const generateImageDescription = require("../utils/aiDescription");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { latitude, longitude, description } = req.body;

      if (!req.file) {
        return res.status(400).json({
          message: "Image file is required",
        });
      }

      const imageUrl = `/uploads/${req.file.filename}`;

      const finalDescription = await generateImageDescription(
        req.file.path,
        description
      );

      const newPhoto = await pool.query(
        `
        INSERT INTO photos
        (user_id, image_url, latitude, longitude, description)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [req.user.id, imageUrl, latitude, longitude, finalDescription]
      );

      res.status(201).json({
        message: "Photo uploaded successfully",
        photo: newPhoto.rows[0],
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const photos = await pool.query(`
      SELECT photos.*, users.name
      FROM photos
      JOIN users
      ON photos.user_id = users.id
      ORDER BY photos.created_at DESC
    `);

    res.json(photos.rows);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;