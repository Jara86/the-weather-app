import React from "react";
import "../styles/WeatherForecast.css";

export default function WeatherForecast({ forecast, city }) {
  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  return (
    <div className="WeatherForecast">
      <h3 className="forecast-title">5-Day Forecast for {city}</h3>
      <div className="forecast-container">
        {forecast.slice(0, 5).map((day, index) => (
          <div className="forecast-day" key={index}>
            <div className="forecast-date">{formatDay(day.time)}</div>
            <img 
              src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${day.condition.icon}.png`}
              alt={day.condition.description}
              className="forecast-icon"
            />
            <div className="forecast-temperatures">
              <span className="forecast-temp-max">{Math.round(day.temperature.maximum)}°</span>
              <span className="forecast-temp-min">{Math.round(day.temperature.minimum)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

