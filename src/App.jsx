import { useCallback, useEffect, useState } from "react";
import { convertToFlag } from "./utils/weatherHelper";
import WeatherDisplay from "./components/WeatherDisplay";

const KEY = "bdc_44f973f8fab64e7ca7826166a2d50cb9";

function App() {
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  function handleLocationInput(e) {
    const inputValue = e.target.value;
    setLocation(inputValue);
  }

  const fetchWeather = useCallback(
    async function fetchWeather() {
      if (location.length <= 2) {
        setWeather({});
        return;
      }
      try {
        setIsLoading(true);

        // Getting location (geocoding)
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } =
          geoData.results.at(0);
        console.log(timezone);
        console.log(`${name} ${convertToFlag(country_code)}`);

        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        // Getting actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        console.log(weatherData.daily);

        setWeather(weatherData.daily);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [location]
  );

  useEffect(
    function () {
      if (!location) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          //   console.dir(pos);
          const { latitude, longitude } = pos.coords;

          const res = await fetch(
            `https://api-bdc.net/data/reverse-geocode?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${KEY}`
          );
          const data = await res.json();
          console.log(data);
          console.log(data.locality);

          setLocation(data?.locality);
        });
      }

      fetchWeather();
    },
    [fetchWeather, location]
  );

  useEffect(
    function () {
      fetchWeather();
    },
    [fetchWeather]
  );

  return (
    <div className="app">
      <h1>Class-based Weather-App</h1>
      <div>
        <Input location={location} onLoactionInput={handleLocationInput} />
      </div>

      {isLoading && <p className="loader">Loading....</p>}
      {weather.weathercode?.length > 0 && (
        <WeatherDisplay weather={weather} location={displayLocation} />
      )}
    </div>
  );
}

export default App;

function Input({ location, onLoactionInput }) {
  return (
    <input
      type="text"
      placeholder="Search for loaction..."
      value={location}
      onChange={onLoactionInput}
    />
  );
}
