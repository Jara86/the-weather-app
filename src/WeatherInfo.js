import React from "react";
import "../styles/WeatherInfo.css";

export default function WeatherInfo({ data }) {
  const formattedDate = formatDate(data.date);
  
  function formatDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    return `${day}, ${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="WeatherInfo">
      <div className="location-info">
        <h2>{data.city}</h2>
        {data.country && <h3>{data.country}</h3>}
        <div className="date-time">{formattedDate}</div>
      </div>
      
      <div className="current-weather">
        <div className="weather-icon-container">
          <img 
            src={`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${data.icon}.png`} 
            alt={data.description}
            className="weather-icon"
          />
          <div className="weather-description text-capitalize">{data.description}</div>
        </div>
        
        <div className="temperature-container">
          <span className="temperature">{Math.round(data.temperature)}</span>
          <span className="temperature-unit">°C</span>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels like</span>
          <span className="detail-value">{Math.round(data.feelsLike)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{data.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{Math.round(data.wind)} km/h</span>
        </div>
      </div>
    </div>
  );
}
