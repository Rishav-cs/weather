const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); 

// Log the API key to check if it's being loaded correctly
console.log("API Key:", process.env.OPENWEATHER_API_KEY);  

const app = express();
const port = 5000;

app.use(cors()); // Allow cross-origin requests from frontend

// Route to fetch current weather
app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Weather API error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error fetching weather data',
    });
  }
});

// Route to fetch 5-day forecast
app.get('/forecast', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!city) {
    return res.status(400).json({ message: 'City is required' });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Forecast API error:", error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.message || 'Error fetching forecast data',
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Backend server running at http://localhost:${port}`);
});
