const express = require("express");
const router = express.Router();
const login = require("../middleware/login");

const BaitsController = require("../controllers/baits-controller");

router.get("/", BaitsController.getBait);
router.post("/", login.required, BaitsController.postBait);
router.get("/:id", login.required, BaitsController.getBaitDetail);
router.patch("/:id", login.required, BaitsController.updateBait);
router.delete("/:id", login.required, BaitsController.deleteBait);

module.exports = router;
