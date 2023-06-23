import { displayTemprature } from "../utils/weatherUtils";
import WeatherImage from "./WeatherImage";

export function ForcastRow({
  day,
  icon,
  weatherDescription,
  temp_max,
  temp_min,
}) {
  return (
    <div className="w-full flex justify-between items-center uppercase text-xs/tight border-t-2 py-1">
      <div className=" flex gap-2 items-center ">
        <div className="w-[90px] ">{day}</div>
        <div className="p-0 m-0">
          <WeatherImage className="p-0 m-0 h-8" icon={icon} alt="weather" />
        </div>
      </div>
      <div className=" flex gap-2">
        <div className=""> {weatherDescription}</div>
        <div className="w-[80px]  text-right">
          H:{displayTemprature(temp_max)} L:{displayTemprature(temp_min)}
        </div>
      </div>
    </div>
  );
}
