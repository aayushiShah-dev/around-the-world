var express = require("express");
cors = require("cors");

const axios = require("axios");
const app = express();
app.use(cors());

app.get("/api", async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/name/:countryName", async (req, res) => {
  try {
    const countryName = req.params.countryName;
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/region/:regionName", async (req, res) => {
  try {
    const regionName = req.params.regionName;
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${regionName}`
    );
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.get("*", (req, res) => {
  res.status(500).json({ message: "error" });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
