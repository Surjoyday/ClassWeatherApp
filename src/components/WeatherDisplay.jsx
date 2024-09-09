import React from "react";
import { formatDay, getWeatherIcon } from "../utils/weatherHelper";

export default class WeatherDisplay extends React.Component {
  componentWillUnmount() {
    console.log("Weather component is unmounted");
  }
  render() {
    const {
      temperature_2m_max: maxTemp,
      temperature_2m_min: minTemp,
      time: dates,
      weathercode: codes,
    } = this.props.weather;
    console.log(this.props.weather);

    return (
      <div>
        <h2>Weather for {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              maxTemp={maxTemp.at(i)}
              minTemp={minTemp.at(i)}
              code={codes.at(i)}
              date={dates.at(i)}
              isToday={i === 0}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { maxTemp, minTemp, code, date, isToday } = this.props;
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
}
