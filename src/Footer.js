import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <p>
        This project was coded by{' '}
        <a
          href="https://github.com/Jara86"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jarouschka
        </a>{' '}
        and is{' '}
        <a
          href="https://github.com/Jara86/weather-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          open-sourced on GitHub
        </a>{' '}
        and{' '}
        <a
          href="https://jaras-weather-app.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          hosted on Netlify
        </a>
      </p>
    </footer>
  );
}
