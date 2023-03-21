import React from "react";
import '../css/weather.css';

const CardExampleCard = ({ weatherData }) => (
  <>
    {"main" && "sys" in weatherData ? (
      <div className="location-name">
        {weatherData.name}, {weatherData.sys.country}
      </div>
    ) : (
      console.log("error in location block")
    )}
    <div className="card">
      <div className="left-block">
        {"main" && "weather" in weatherData ? (
          <ul>
            <li>{Math.round(weatherData.main.temp)} ˚C</li>
            <li></li>
            <li>
              <img
                height={150}
                width={150}
                src={`https://openweathermap.org/img/wn/${
                  weatherData.weather[0].icon.match(/\d+/)[0]
                }d@2x.png`}
                alt="Weather icon"
              />
            </li>
            <li>{weatherData.weather[0].description}</li>
          </ul>
        ) : (
          console.log("error in left block")
        )}
      </div>

      <div className="right-block">
        {"main" && "sys" && "wind" in weatherData ? (
          <>
            <ul>
              <li className="col">
                Low: {Math.round(weatherData.main.temp_min)} ˚C
              </li>
              <li>
                Height: {Math.round(weatherData.main.temp_max)} ˚C
              </li>
            </ul>
            <ul>
              <li>
                Sunrise:{" "}
                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )}
              </li>
              <li>Humidity: {weatherData.main.humidity}%</li>
            </ul>
            <ul>
              <li>
                Sunset:{" "}
                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                )}
              </li>
              <li>Wind : {Math.round(weatherData.wind.speed)} mph</li>
            </ul>
          </>
        ) : (
          console.log("error")
        )}
      </div>
    </div>
  </>
);

export default CardExampleCard;