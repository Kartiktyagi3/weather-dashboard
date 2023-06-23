import axios from "axios";

const API_URL = "https://api.openweathermap.org";

const API_KEY = import.meta.env.VITE_API_KEY;

const instance = axios.create({
  baseURL: API_URL,
  timeout: 3000,
});

// get the top 5 match to location passed
const getLocation = ({ location }) => {
  if (location)
    return instance.get(
      `/geo/1.0/direct?q=${location}&limit=5&appid=${API_KEY}`
    );
};

// get current data for the given location
const getCurrentWeather = ({ lat, lon }) => {
  if (lat && lon)
    return instance.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
};

//get cu
const getFiveDayForcast = ({ lat, lon }) => {
  if (lat && lon) {
    return instance.get(
      `/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
  }
};
export { getLocation, getCurrentWeather, getFiveDayForcast };
