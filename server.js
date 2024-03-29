const path = require("path");
const express = require("express");
require("dotenv").config();
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3001;

// Serve public folder/static files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.use(express.static("public"));

// Middleware to parse req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fetch the City Coodinates from Open Weather API
app.post("/city", async (req, res, next) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.apiKey}`;
  // console.log(url);
  const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

// Fetch the City Weather from Open Weather API
app.post("/weather", async (req, res, next) => {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.lon}&appid=${process.env.apiKey}&units=imperial`;
  // console.log(url);
  const response = await fetch(url)
    .then((response) => response.json())
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
