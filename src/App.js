import { useState } from "react";
import "./App.css";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";
import Footer from "./components/Footer";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleWeatherData(data) {
    setWeatherData(data);
    setLoading(false);
    setError(null);
  }

  function handleLoading(isLoading) {
    setLoading(isLoading);
  }

  function handleError(errorMessage) {
    setError(errorMessage);
    setLoading(false);
  }

  return (
    <div className="App">
      <div className="container">
        <h1 className="app-title">Jara's Weather App</h1>
        <WeatherSearch 
          onWeatherData={handleWeatherData} 
          onLoading={handleLoading}
          onError={handleError}
          defaultCity="Berlin"
        />
        {loading && (
          <div className="loading-container">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading weather data...</p>
          </div>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {weatherData && !loading && <WeatherDisplay data={weatherData} />}
        <Footer />
      </div>
    </div>
  );
}
