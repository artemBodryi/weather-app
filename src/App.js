import React, { useState, useEffect }  from 'react';
import './css/App.css';
import Weather from "./components/weather";
import InputField from './components/input';

export default function App() {
  // const [lat, setLat] = useState(null);
  // const [long, setLong] = useState(null);
  const [city, setCity] = useState('');
  const [data, setData] = useState({});
  const [coord, setCoord] = useState({});
  // const [statistic, setStatistic] = useState({});

    useEffect(() => {
      const fetchData = async () => {
          let url;
          if (city) {
            url = `${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`;
          } else if (coord.lat && coord.lon) {
            url = `${process.env.REACT_APP_API_URL}/weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
          } else {
            return;
          }

          const response = await fetch(url);
          const result = await response.json();

          //convert data from Kelvin to Celsius
          // check if temperature in Kelvin is valid
          if (result.main.temp >= 0 && result.main.temp <= 1000) {
            // convert temperature from Kelvin to Celsius
            const temperatureCelsius = result.main.temp + 273.15;
            result.main.temp = temperatureCelsius.toFixed(2);

            const lowCelsius = result.main.temp_min + 273.15;
            result.main.temp_min = lowCelsius.toFixed(2);

            const heightCelsius = result.main.temp_max + 273.15;
            result.main.temp_max = heightCelsius.toFixed(2);
          } else {
             // set temperature to NaN if it is not valid
             result.main.temp = NaN;
           }
          console.log(result.main.temp)
          setData(result)
        };
  
      fetchData();
    }, [city, coord]);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setCoord({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }, [])

    const handleCitySubmit = (city) => {
      setCity(city);
    }
  
  return (
    <div className="container">
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Rubik+Iso&display=swap');
        url('https://fonts.googleapis.com/css2?family=Edu+NSW+ACT+Foundation:wght@800&display=swap');
      </style>
      <div className="App">
        <div>
          <span className="logo-name">Umblella</span>
        </div>
        {/* {coord != null ? <InputField inputCoordinates={coord} onSubmit={handleCitySubmit}/> : console.log("input error")} */}
        <InputField onSubmit={handleCitySubmit}/>
        {data != null ? <Weather weatherData={data} /> : console.log("error")}
      </div>
    </div>
  );
}