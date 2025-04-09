// File: src/components/WeatherCard.jsx
import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ data }) => {
  if (!data) return null; // ← Prevent render if data is undefined

  const {
    name,
    main: { temp, humidity },
    weather,
    wind: { speed },
  } = data;

  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <div className="weather-info">
        <p>Temperature: {temp}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {speed} m/s</p>
        <p>{weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
