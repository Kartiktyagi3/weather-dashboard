import MinorSectionHeading from "./MinorSectionHeading";
import { loadableLocationForcastAtom } from "../atoms";
import { useAtomValue } from "jotai";
import {
  countBy,
  entries,
  flow,
  head,
  last,
  maxBy,
  partialRight,
  groupBy,
} from "lodash";
import { ForcastRow } from "./ForcastRow";
import NetworkErrorFallback from "./NetworkErrorFallback";

// finds most common thing in the array
function mostCommonProperty(array) {
  const result = flow(countBy, entries, partialRight(maxBy, last), head)(array);

  return result;
}

function Forcast() {
  const { state, data, error } = useAtomValue(loadableLocationForcastAtom);
  console.log("🚀 ~ file: Forcast.jsx:26 ~ Forcast ~ state:", state);

  // min max value are the same value in api???
  // so calculating min and max value by grouping the date
  // and calculating the min and max value for the day
  // similarly getting the most common weather for the day
  const groupedData = groupBy(data, (ele) =>
    new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
    }).format(ele.time)
  );

  const finalWeatherArr = [];

  for (const property in groupedData) {
    const dayWeatherArray = groupedData[property];

    const obj = {
      day: property,
      icon: mostCommonProperty(dayWeatherArray.map((ele) => ele.weather.icon)),
      weatherDescription: mostCommonProperty(
        dayWeatherArray.map((ele) => ele.weather.main)
      ),
      temp_max: maxBy(dayWeatherArray, (ele) => ele.temp.temp_max).temp
        .temp_max,
      temp_min: maxBy(dayWeatherArray, (ele) => -ele.temp.temp_min).temp
        .temp_min,
    };
    if (finalWeatherArr.length == 0) obj.day = "Today";
    finalWeatherArr.push(obj);
  }

  const forcastRows = finalWeatherArr.map((ele) => (
    <ForcastRow {...ele} key={ele.day} />
  ));

  return (
    <NetworkErrorFallback state={state} data={data}>
      <div className="w-96 border px-4 py-2">
        <div className="flex-col">
          <MinorSectionHeading>5-Day Forcast</MinorSectionHeading>
          {forcastRows}
        </div>
      </div>
    </NetworkErrorFallback>
  );
}

export default Forcast;
