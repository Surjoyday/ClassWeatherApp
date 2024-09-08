import React from "react";
import { convertToFlag } from "./utils/weatherHelper";
import WeatherDisplay from "./components/WeatherDisplay";

class App extends React.Component {
  state = {
    location: "lisbon",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  handleLocationInput = (e) => {
    this.setState({ location: e.target.value });
  };

  fetchWeather = async () => {
    try {
      this.setState({ isLoading: true });
      // Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      console.log(`${name} ${convertToFlag(country_code)}`);

      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });

      // Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      console.log(weatherData.daily);

      this.setState({ weather: weatherData.daily });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="app">
        <h1>ClassWeatherApp</h1>
        <div>
          <input
            type="text"
            placeholder="Search for loaction..."
            value={this.state.location}
            onChange={this.handleLocationInput}
          />
        </div>
        <button className="btn" onClick={this.fetchWeather}>
          Get weather
        </button>

        {this.state.isLoading && <p className="loader">Loading....</p>}
        {/* <p>{this.state.displayLoaction}</p> */}
        {this.state.weather.weathercode?.length > 0 && (
          <WeatherDisplay
            weather={this.state.weather}
            location={this.state.displayLocation}
          />
        )}
      </div>
    );
  }
}

export default App;
