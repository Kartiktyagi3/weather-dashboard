// displayes the temprateure with selected format
function displayTemprature(temp, suffex = "°", precision = 0) {
  if (!temp) return "";
  const float = parseFloat(temp).toFixed(precision);

  return `${float}${suffex}`;
}

// generates the url for the images using the icon info provided
function weatherImageLocation(icon) {
  if (icon) return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return "";
}

// extracts the display information from the api response
function processSingleWeatherData({ main, weather, wind, dt }) {
  const timeInMilliSeconds = dt * 1000;

  return {
    temp: main,
    weather: weather[0],
    wind: wind,
    time: new Date(timeInMilliSeconds),
  };
}

export { displayTemprature, weatherImageLocation, processSingleWeatherData };
