const express = require("express");
const router = express.Router();
const sectorController = require("../controllers/sector.controller");
const { auth } = require("../middlewares/authMiddleware");

router.post("/", auth, sectorController.createSector);
router.get("/", sectorController.getSectors);

module.exports = router;
