import React from "react";
import PropTypes from "prop-types";
import "../styles/WeatherForecast.css";

export default function WeatherForecast({ forecast, city }) {
  function formatDay(timestamp) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(timestamp * 1000);
    return days[date.getDay()];
  }

  WeatherForecast.propTypes = {
    forecast: PropTypes.arrayOf(
      PropTypes.shape({
        time: PropTypes.number.isRequired,
        condition: PropTypes.shape({
          icon: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        }).isRequired,
        temperature: PropTypes.shape({
          maximum: PropTypes.number.isRequired,
          minimum: PropTypes.number.isRequired,
        }).isRequired,
      })
    ).isRequired,
    city: PropTypes.string.isRequired,
  };

  return (
    <div className="WeatherForecast">
      <h3 className="forecast-title">5-Day Forecast for {city}</h3>
      <div className="forecast-container">
        {forecast.slice(0, 5).map((day, index) => (
          <div className="forecast-day" key={day.time}>
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
