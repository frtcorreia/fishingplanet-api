const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParse = require("body-parser");

const defaultRoute = require("./routes/default");
const baitsRoute = require("./routes/baits-route");
const baitsBrandsRoute = require("./routes/baits-brands-route");
const userRoute = require("./routes/user-route");
const weatherRoute = require("./routes/weather-route");
const uploadRoute = require("./routes/upload-route");

const bodyParser = require("body-parser");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.use("/", defaultRoute);
app.use("/baits", baitsRoute);
app.use("/brands", baitsBrandsRoute);
app.use("/users", userRoute);
app.use("/weather", weatherRoute);
app.use("/media", uploadRoute);

app.use((req, res, next) => {
  const erro = new Error("Not Found");
  erro.status(404);
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      message: error.message,
    },
  });
});

module.exports = app;
