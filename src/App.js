import { useState } from "react";
import "./App.css";
import WeatherSearch from "./WeatherSearch";
import WeatherDisplay from "./WeatherDisplay";
import Footer from "./Footer";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  function handleWeatherData(data) {
    setWeatherData(data);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <WeatherSearch onWeatherData={handleWeatherData} />
        {weatherData && <WeatherDisplay data={weatherData} />}
        <Footer />
      </div>
    </div>
  );
}
