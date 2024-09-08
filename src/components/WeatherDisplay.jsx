import React from "react";

export default class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
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
        <h2>Weather {this.props.location}</h2>
        <ul className="weather">
          {dates.map((date, i) => (
            <Day
              key={date}
              maxTemp={maxTemp.at(i)}
              minTemp={minTemp.at(i)}
              code={codes.at(i)}
              date={dates.at(i)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { maxTemp, minTemp, code, date } = this.props;
    return (
      <li>
        <p>{date}</p>
        <p>
          {parseFloat(minTemp).toFixed(0)}&deg; &mdash;{" "}
          {parseFloat(maxTemp).toFixed(0)}&deg;
        </p>
      </li>
    );
  }
}
