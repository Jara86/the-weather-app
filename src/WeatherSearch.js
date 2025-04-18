import React, { useState } from "react";
import "./WeatherSearch.css";

export default function WeatherSearch({ onWeatherData }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    
    const apiKey = "3980a7c8f2a782241a093131b099f993";
   
    fetch(`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found. Please try another city.");
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        
     
        const formattedData = {
          city: data.city,
          temperature: data.temperature.current,
          description: data.condition.description,
          humidity: data.temperature.humidity,
          wind: data.wind.speed,
          date: formatDate(new Date(data.time * 1000)),
          icon: data.condition.icon_url
        };
        
        onWeatherData(formattedData);
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
        console.error("Error fetching weather data:", error);
      });
  }

  function formatDate(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[date.getDay()];
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    
    return `${day} ${hours}:${minutes} ${ampm}`;
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter a city..."
          className="search-input"
          onChange={handleCityChange}
          autoFocus="on"
        />
        <input 
          type="submit" 
          value={loading ? "Loading..." : "Search"} 
          className="search-button"
          disabled={loading}
        />
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
