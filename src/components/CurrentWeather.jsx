import { useAtomValue } from "jotai";
import {
  loadableCurrentLocationWeatherAtom,
  tempratureSymbolAtom,
} from "../atoms";
import { displayTemprature } from "../utils/weatherUtils";
import WeatherImage from "./WeatherImage";

function CurrentWeather() {
  const { state, data, error } = useAtomValue(
    loadableCurrentLocationWeatherAtom
  );

  const tempratureSymbol = useAtomValue(tempratureSymbolAtom);

  return (
    <div className="w-56 my-2 p-4 text-[10px]/none border">
      {state === "hasError" && <div>Something went wrong</div>}
      {state === "loading" && <div>Loading...</div>}
      {state === "hasData" && (
        <>
          <div className="flex justify-between">
            <div>
              <div className="text-lg">{data.name}</div>
              <div className="flex gap-1 ">
                <div>
                  H:{displayTemprature(data.temp.temp_max, tempratureSymbol)}
                </div>
                <div>
                  L:{displayTemprature(data.temp.temp_min, tempratureSymbol)}
                </div>
              </div>
              <div className="text-xs">{data.weather.main}</div>
            </div>
            <div className=" w-20 p-0 m-0">
              <WeatherImage
                className="p-0 m-0"
                icon={data.weather.icon}
                alt="weather"
              />
            </div>
          </div>
          <div className="flex justify-between align-center">
            <div className="text-[50px]">
              {displayTemprature(data.temp.temp, tempratureSymbol)}
            </div>
            <div className="flex-2">
              <div className="flex gap-2 justify-between underline">
                <div>Detail</div>
              </div>
              <div className="flex gap-2 justify-between">
                <div>Humidity</div>
                <div className="font-bold">{data.temp.humidity}</div>
              </div>
              <div className="flex gap-2 justify-between">
                <div>Wind</div>
                <div className="font-bold">{data.wind.speed}</div>
              </div>
              <div className="flex gap-2 justify-between">
                <div>Pressure</div>
                <div className="font-bold">{data.temp.pressure}</div>
              </div>
              <div className="flex gap-2 justify-between">
                <div>Feels Like</div>
                <div className="font-bold">
                  {displayTemprature(data.temp.feels_like, tempratureSymbol)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWeather;
