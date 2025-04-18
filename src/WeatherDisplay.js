import React, { useState, useEffect } from "react";
import "./WeatherDisplay.css";

export default function WeatherDisplay({ data }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data && data.city) {
      fetchForecast(data.city);
    }
  }, [data]);

  function fetchForecast(city) {
    setLoading(true);
    
    const apiKey = "3980a7c8f2a782241a093131b099f993";
    
    fetch(`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch forecast data");
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        // Get the next 5 days of forecast data
        const forecastData = data.daily.slice(0, 5);
        setForecast(forecastData);
      })
      .catch(error => {
        setLoading(false);
        console.error("Error fetching forecast data:", error);
      });
  }

  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
  }

  return (
    <div>
      <div className="current-weather">
        <h1 className="city">{data.city}</h1>
        <div className="weather-details">
          <span>{data.date}</span> | <span>{data.description}</span>
        </div>
        <div className="temperature-container">
          <img src={data.icon} alt={data.description} className="weather-icon" />
          <span className="temperature">{Math.round(data.temperature)}</span>
          <span className="unit">°C</span>
        </div>
        <div className="weather-details-row">
          <div className="weather-detail">
            <div className="weather-detail-label">Humidity</div>
            <div className="weather-detail-value">{data.humidity}%</div>
          </div>
          <div className="weather-detail">
            <div className="weather-detail-label">Wind</div>
            <div className="weather-detail-value">{Math.round(data.wind)} km/h</div>
          </div>
        </div>
      </div>

      <div className="forecast">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <div className="forecast-row">
          {loading ? (
            <div className="loading">Loading forecast...</div>
          ) : (
            forecast.map((day, index) => (
              <div className="forecast-day" key={index}>
                <div className="forecast-day-name">{formatDay(day.time)}</div>
                <img 
                  src={day.condition.icon_url} 
                  alt={day.condition.description} 
                  className="forecast-icon" 
                />
                <div className="forecast-temperature">
                  <span className="forecast-max">{Math.round(day.temperature.maximum)}°</span>
                  <span className="forecast-min">{Math.round(day.temperature.minimum)}°</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
