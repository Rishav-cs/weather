// File: src/App.js
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import ToggleTheme from "./components/ToggleTheme";
import Loader from "./components/Loader";
import "./App.css";

const API_KEY = "d91de3a004e26d873b06c828c6841a4e";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);
      fetchForecast(city);
      updateRecentSearches(city);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("Forecast not found");
      const data = await res.json();
      const filtered = data.list.filter((_, idx) => idx % 8 === 0).map((item) => ({
        date: new Date(item.dt_txt).toLocaleDateString("en-US", { weekday: "short" }),
        temp: Math.round(item.main.temp),
        icon: item.weather[0].icon,
        condition: item.weather[0].main,
      }));
      setForecastData(filtered);
    } catch {
      setForecastData([]);
    }
  };

  const updateRecentSearches = (city) => {
    setRecentSearches((prev) => {
      const updated = [city, ...prev.filter((c) => c !== city)];
      return updated.slice(0, 5);
    });
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <ToggleTheme theme={theme} setTheme={setTheme} />
      <SearchBar onSearch={fetchWeather} />
      {loading && <Loader />}
      {error && <div id="error">{error}</div>}
      {weatherData && <WeatherCard data={weatherData} />}
      {forecastData.length > 0 && <Forecast forecast={forecastData} />}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <h3>Recent Searches:</h3>
          <div>
            {recentSearches.map((city, idx) => (
              <button key={idx} onClick={() => fetchWeather(city)}>
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
