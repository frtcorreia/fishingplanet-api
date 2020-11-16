const express = require('express');
const router = express.Router();

const WeatherController = require('../controllers/weather-controller');

router.get("/now", WeatherController.weatherNow);
router.get("/4days", WeatherController.weather4Days);
router.get("/past", WeatherController.weatherPast);

module.exports = router;
