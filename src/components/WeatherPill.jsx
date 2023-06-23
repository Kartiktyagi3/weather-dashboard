import { displayTemprature } from "../utils/weatherUtils";
import WeatherImage from "./WeatherImage";

function WeatherPill({ time, icon, temp }) {
  return (
    <div className="text-xs flex flex-col gap-4 p-2  justify-center items-center">
      <div className="text-gray-600">{time}</div>
      <div>
        <WeatherImage className="p-0 m-0" icon={icon} alt="weather" />
      </div>
      <div className="text-sm">{displayTemprature(temp)}</div>
    </div>
  );
}

export default WeatherPill;
