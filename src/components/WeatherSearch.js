import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaLocationArrow } from "react-icons/fa";
import "../styles/WeatherSearch.css";
import PropTypes from "prop-types";
WeatherSearch.propTypes = {
  onWeatherData: PropTypes.func.isRequired,
  onLoading: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  defaultCity: PropTypes.string,
};

export default function WeatherSearch({ onWeatherData, onLoading, onError, defaultCity }) {
  const [city, setCity] = useState(defaultCity || "");

  function handleSubmit(event) {
    event.preventDefault();
    searchCity();
  }

  function searchCity() {
    if (!city.trim()) {
      onError("Please enter a city name");
      return;
    }
    
    onLoading(true);
    const apiKey = "ta004a4a3b736802do35c5853a06aff7";
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    
    axios.get(apiUrl)
      .then(handleResponse)
      .catch(handleApiError);
  }

  function handleResponse(response) {
    const weatherData = {
      city: response.data.city,
      country: response.data.country,
      temperature: response.data.temperature.current,
      feelsLike: response.data.temperature.feels_like,
      humidity: response.data.temperature.humidity,
      wind: response.data.wind.speed,
      description: response.data.condition.description,
      icon: response.data.condition.icon,
      date: new Date(response.data.time * 1000),
      coordinates: {
        lat: response.data.coordinates.latitude,
        lon: response.data.coordinates.longitude
      }
    };
    
    onWeatherData(weatherData);
  }

  function handleApiError(error) {
    if (error.response && error.response.status === 404) {
      onError("City not found. Please try another location.");
    } else {
      onError("An error occurred. Please try again later.");
    }
  }

  function getCurrentLocation() {
    onLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const apiKey = "ta004a4a3b736802do35c5853a06aff7";
          const apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
          
          axios.get(apiUrl)
            .then(response => {
              setCity(response.data.city);
              handleResponse(response);
            })
            .catch(handleApiError);
        },
        () => {
          onError("Unable to access your location. Please enable location services.");
        }
      );
    } else {
      onError("Geolocation is not supported by your browser.");
    }
  }

  useEffect(() => {
    if (defaultCity) {
      searchCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="WeatherSearch">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="search"
            placeholder="Enter a city..."
            className="form-control search-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-search" title="Search">
            <FaSearch />
          </button>
          <button 
            type="button"
            className="btn btn-location" 
            onClick={getCurrentLocation}
            title="Use current location"
          >
            <FaLocationArrow />
          </button>
        </div>
      </form>
    </div>
  );
}
