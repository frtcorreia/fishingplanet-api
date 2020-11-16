const express = require("express");
const swaggerUi = require("swagger-ui-express");
const specs = require("../swagger");

// import sub-routers
const defaultRoute = require("./default");
const baitsRoute = require("./baits-route");
const baitsBrandsRoute = require("./baits-brands-route");
const userRoute = require("./user-route");
const weatherRoute = require("./weather-route");
const uploadRoute = require("./upload-route");

let router = express.Router();

router.use("/", defaultRoute);
router.use("/baits", baitsRoute);
router.use("/brands", baitsBrandsRoute);
router.use("/users", userRoute);
router.use("/weather", weatherRoute);
router.use("/media", uploadRoute);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs.default));

router.get("/healthcheck", (req, res) => res.send("OK"));

module.exports = router;
