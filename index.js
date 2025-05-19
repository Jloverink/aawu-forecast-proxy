const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 10000;

app.get('/quadrant', async (req, res) => {
  try {
    const response = await axios.get('https://www.weather.gov/aawu/');
    const $ = cheerio.load(response.data);

    // Target the specific <pre> block where quadrant text lives
    const forecastBlock = $('div#main-content pre').text();

    if (!forecastBlock) {
      return res.status(404).json({ error: 'Forecast text not found.' });
    }

    const quadrants = ['JB', 'JC', 'JD', 'JF'];
    const results = {};

    quadrants.forEach(zone => {
      const regex = new RegExp(`(.*?${zone}[\\s\\S]*?)(?=\\n{2,}|$)`, 'g');
      const matches = [...forecastBlock.matchAll(regex)];
      if (matches.length > 0) {
        results[zone] = matches.map(m => m[1].trim()).join('\n\n');
      }
    });

    res.json(results);
  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).json({ error: 'Error fetching AAWU forecast' });
  }
});

app.listen(PORT, () => {
  console.log(`AAWU proxy running on port ${PORT}`);
});
