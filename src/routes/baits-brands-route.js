const express = require("express");
const router = express.Router();
const login = require("../middleware/login");

const BaitBrandController = require("../controllers/brands-controller");

router.get("/", BaitBrandController.getBaitBrands);
router.post("/", login.required, BaitBrandController.postBaitBrand);
router.get("/:id", login.required, BaitBrandController.getBaitBrandDetail);
router.patch("/:id", login.required, BaitBrandController.updateBaitBrand);
router.delete("/:id", login.required, BaitBrandController.deleteBaitBrand);

module.exports = router;
