const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.get("/quadrant", async (req, res) => {
  try {
    const response = await fetch("https://www.weather.gov/aawu/");
    const html = await response.text();
    const $ = cheerio.load(html);
    const rawText = $("pre").text();

    if (!rawText.includes("LYNN CANAL AND GLACIER BAY JB")) {
      return res.status(404).json({ error: "Forecast text not found." });
    }

    res.json({ success: true, text: rawText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch forecast." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ AAWU proxy running at http://localhost:${PORT}`);
});
