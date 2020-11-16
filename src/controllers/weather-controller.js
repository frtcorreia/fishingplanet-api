const axios = require("axios");
const dotenv = require('dotenv');
dotenv.config();
//API OPEN WEATHER MAP
const appid = process.env.WEATHER_API;
const units = "metric";
const lang = "pt";

exports.weatherNow = (req, res) => {
  var axios = require("axios");

  var lat = req.body.latitude;
  var lon = req.body.longitude;

  var config = {
    method: "get",
    url:
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=" +
      units +
      "&lang=" +
      lang +
      "&appid=" +
      appid,
  };

  axios(config)
    .then(function (response) {
      res.json({ Error: false, Result: response.data });
    })
    .catch(function (error) {
      res.json({ Error: false, Result: error });
    });
};

exports.weather4Days = (req, res) => {
  var axios = require("axios");

  var lat = req.body.latitude;
  var lon = req.body.longitude;

  var config = {
    method: "get",
    url:
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=" +
      units +
      "&lang=" +
      lang +
      "&appid=" +
      appid,
    headers: {},
    maxRedirects: 0,
  };

  axios(config)
    .then(function (response) {
      res.json({ Error: false, Result: response.data });
    })
    .catch(function (error) {
      res.json({ Error: false, Result: error });
    });
};
exports.weatherPast = (req, res) => {
  var axios = require("axios");

  var lat = req.body.latitude;
  var lon = req.body.longitude;
  var data = req.body.data;

  var config = {
    method: "get",
    url:
      "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
      lat +
      "&lon=" +
      lon +
      "&dt=" +
      data +
      "&units=" +
      units +
      "&lang=" +
      lang +
      "&appid=" +
      appid,
    headers: {},
    maxRedirects: 0,
  };

  axios(config)
    .then(function (response) {
      res.json({ Error: false, Result: response.data });
    })
    .catch(function (error) {
      res.json({ Error: true, Result: error });
    });
};
