import { useEffect } from "react";
import { formatDay, getWeatherIcon } from "../utils/weatherHelper";

function WeatherDisplay({ weather, location }) {
  useEffect(function () {
    return () => console.log("WeatherDisplay Component unmounted...");
  }, []);
  const {
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
    time: dates,
    weathercode: codes,
  } = weather;

  return (
    <div>
      <h2>Weather for {location}</h2>
      <ul className="weather">
        {dates?.map((date, i) => (
          <Day
            key={date}
            maxTemp={maxTemp?.at(i)}
            minTemp={minTemp?.at(i)}
            code={codes?.at(i)}
            date={dates?.at(i)}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
}

function Day({ maxTemp, minTemp, code, date, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.round(minTemp)}&deg; &mdash;{" "}
        <strong>{Math.ceil(maxTemp)}&deg;</strong>
      </p>
    </li>
  );
}

export default WeatherDisplay;
