import MinorSectionHeading from "./MinorSectionHeading";
import { loadableLocationForcastAtom } from "../atoms";
import { useAtomValue } from "jotai";
import WeatherPill from "./WeatherPill";
import NetworkErrorFallback from "./NetworkErrorFallback";
//weather for the next 24 hours
function DayWeather() {
  const { state, data, error } = useAtomValue(loadableLocationForcastAtom);
  console.log("🚀 ~ file: DayWeather.jsx:9 ~ DayWeather ~ state:", state);

  // data to prevent error
  // needed since value used bofore the network children
  if (!data || data.length === 0) return <></>;

  const dataToShow = data?.slice(0, 8);

  const weatherPills = dataToShow.map(({ temp, time, weather }) => {
    return (
      <WeatherPill
        key={time}
        temp={temp.temp}
        time={time.getHours()}
        icon={weather.icon}
      />
    );
  });

  return (
    <NetworkErrorFallback state={state} data={data}>
      <div className="my-2 p-4 border">
        <MinorSectionHeading>24 Hour forcast</MinorSectionHeading>
        <div className="flex gap-1">{weatherPills}</div>
      </div>
    </NetworkErrorFallback>
  );
}

export default DayWeather;
