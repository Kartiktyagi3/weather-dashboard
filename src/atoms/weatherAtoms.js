import { getCurrentWeather, getFiveDayForcast } from "../api";
import { loadable } from "jotai/utils";
import { processSingleWeatherData } from "../utils/weatherUtils";
import { atom } from "jotai";
import { currentLocationAtom } from "./locationAtoms";

const tempratureSymbolAtom = atom("°");

const currentLocationWeatherAtom = atom(async (get) => {
  const { lat, lon, name } = get(currentLocationAtom);

  const currentWeather = await getCurrentWeather({ lat, lon });

  const weatherObj = {
    name: name,
    ...processSingleWeatherData(currentWeather.data),
  };

  return weatherObj;
});

const loadableCurrentLocationWeatherAtom = loadable(currentLocationWeatherAtom);

const currentLocationForcastAtom = atom(async (get) => {
  const { lat, lon } = get(currentLocationAtom);
  const response = await getFiveDayForcast({ lat, lon });

  const forcastData = response?.data?.list.map((ele) => {
    return processSingleWeatherData(ele);
  });

  return forcastData;
});

const loadableLocationForcastAtom = loadable(currentLocationForcastAtom);

export {
  loadableLocationForcastAtom,
  tempratureSymbolAtom,
  loadableCurrentLocationWeatherAtom,
};
