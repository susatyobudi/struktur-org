const express = require('express');
const axios = require('axios');
const csv = require('csvtojson');
const app = express();
const PORT = process.env.PORT || 3000;

const sheetId = "1kV0vx0DyTeVkUZg8yyjKkgMQgGr555qjcXEwn3UWVfc";
const sheetName = "Sheet1";
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

app.get('/api/struktur', async (req, res) => {
  try {
    const response = await axios.get(sheetUrl);
    const json = await csv().fromString(response.data);
    res.json(json);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
