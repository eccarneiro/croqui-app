const express = require("express");
const router = express.Router();
const boulderController = require("../controllers/boulder.controller");
const { auth, authorizeRoles } = require("../middlewares/authMiddleware");

router.post("/", auth, boulderController.createBoulder);
router.get("/", boulderController.getBoulders);
router.put("/:id", auth, authorizeRoles("admin", "superadmin"), boulderController.updateBoulder);
router.delete("/:id", auth, authorizeRoles("admin", "superadmin"), boulderController.deleteBoulder);

module.exports = router;
