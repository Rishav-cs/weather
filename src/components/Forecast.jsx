// File: src/components/Forecast.jsx
import React from "react";
import "./Forecast.css";

const Forecast = ({ data }) => {
  if (!data || !Array.isArray(data)) return null; // ← Safeguard

  return (
    <div className="forecast">
      {data.map((item, index) => (
        <div key={index} className="forecast-day">
          <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
          />
          <p>{Math.round(item.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
