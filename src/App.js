import { useState } from "react";
import WeatherSearch from "./components/WeatherSearch";
import WeatherDisplay from "./components/WeatherDisplay";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/App.css";
import "./styles/WeatherSearch.css";
import "./styles/WeatherDisplay.css";
import "./styles/Footer.css";
import "./styles/WeatherForecast.css";
import "./styles/WeatherInfo.css";

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
        <h1 className="app-title">Weather App</h1>
        <WeatherSearch 
          onWeatherData={handleWeatherData} 
          onLoading={handleLoading}
          onError={handleError}
          defaultCity="Berlin"
        />
        {loading && (
          <div className="loading-container">
            <output className="spinner-border text-primary">
              <span className="visually-hidden">Loading...</span>
            </output>
            <p>Loading weather data...</p>
          </div>
        )}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {weatherData && !loading && <WeatherDisplay data={weatherData} />}
        {!loading && !error && !weatherData && (
          <p>Please search for a city to see the weather.</p>
        )}
        <Footer />
      </div>
    </div>
  );
}
