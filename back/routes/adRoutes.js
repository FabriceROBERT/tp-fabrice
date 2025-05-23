const express = require("express");
const {
  createAd,
  getAllAds,
  deleteAd,
  updateAd,
  getAdById,
} = require("../controllers/adController");
const authMiddleware = require("../middleware/middleware");
const router = express.Router();

router.post("/create", authMiddleware, createAd);
router.get("/getAllAds", getAllAds);
router.delete("/delete/:id", authMiddleware, deleteAd);
router.put("/edit/:id", authMiddleware, updateAd);
router.get("/:id", authMiddleware, getAdById);
module.exports = router;
