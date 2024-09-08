export function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

export function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")

    // Converting each character to its Unicode code point and add an offset of 127397 to get the corresponding regional indicator symbol for the flag emoji
    .map((char) => 127397 + char.charCodeAt());

  // "fromCodePoint" is a static method that returns a string composed of emoji characters created from the specified sequence of Unicode code points.
  return String.fromCodePoint(...codePoints);
}

export function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}
