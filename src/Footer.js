import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      Coded with ❤️ by Jara86 | {" "}
      <a
        href="https://github.com/Jara86/the-weather-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open-source code
      </a>{" "}
      | {" "}
      <a
        href="https://jaras-weather-app.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Hosted on Netlify
      </a>
    </footer>
  );
}
