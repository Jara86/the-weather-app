import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import "../styles/WeatherDisplay.css";
import PropTypes from "prop-types";

export default function WeatherDisplay({ data }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data && data.coordinates) {
      const fetchForecast = async () => {
        setLoading(true);
        try {
          const apiKey = "ta004a4a3b736802do35c5853a06aff7";
          const { lat, lon } = data.coordinates;
          const response = await axios.get(
            `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}`
          );
          setForecast(response.data.daily);
          setLoading(false);
        } catch (err) {
          setError("Could not load forecast data");
          setLoading(false);
        }
      };

      fetchForecast();
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="WeatherDisplay">
      <WeatherInfo data={data} />
      
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Loading forecast...</span>
          </div>
          <span className="ms-2">Loading forecast...</span>
        </div>
      )}
      
      {error && <div className="alert alert-warning my-3">{error}</div>}
      
      {forecast && !loading && (
        <WeatherForecast forecast={forecast} city={data.city} />
      )}
    </div>
  );
}

WeatherDisplay.propTypes = {
  data: PropTypes.shape({
    coordinates: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
};
