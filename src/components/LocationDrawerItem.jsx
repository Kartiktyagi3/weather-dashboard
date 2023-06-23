import { deleteLocationAtom, currentLocationAtom } from "../atoms";
import { useAtom, useSetAtom } from "jotai";
import { displayTemprature } from "../utils/weatherUtils";
import { getCurrentWeather } from "../api";
import { processSingleWeatherData } from "../utils/weatherUtils";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

async function fetchSingleWeatherData({ lat, lon }) {
  const currentWeather = await getCurrentWeather({ lat, lon });

  const weatherObj = {
    ...processSingleWeatherData(currentWeather.data),
  };

  return {
    temp: weatherObj.temp.temp,
    weatherDescreption: weatherObj.weather.main,
    temp_max: weatherObj.temp.temp_max,
    temp_min: weatherObj.temp.temp_min,
  };
}

function LocationDrawerItem({ name, country, lat, lon, state, idx, id }) {
  const [data, setData] = useState({
    temp: "",
    weatherDescreption: "",
    temp_max: "",
    temp_min: "",
  });

  useEffect(() => {
    fetchSingleWeatherData({ lat, lon }).then((weatherData) =>
      setData(weatherData)
    );
  }, [lat, lon]);

  const deleteLocation = useSetAtom(deleteLocationAtom);

  const [currentLocation, setCurrentLocation] = useAtom(currentLocationAtom);

  const isSelected = currentLocation.lat === lat && currentLocation.lon === lon;

  const bgColor = isSelected ? "bg-slate-300" : "bg-white";

  return (
    <Draggable draggableId={id} index={idx}>
      {(provided, snapshot) => (
        <div
          className={`border p-2 text-xs/tight my-3 ${
            snapshot.isDragging ? "bg-emerald-200" : bgColor
          }`}
          onClick={() => {
            if (!isSelected)
              setCurrentLocation({
                name,
                country,
                lat,
                lon,
                state,
              });
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            className="hover:opacity-50"
            onClick={() => {
              deleteLocation(idx);
            }}
          >
            <div className="relative">
              <div className="absolute left-[200px] bottom-[0px] h-4 w-4 ">
                <img src="https://cdn-icons-png.flaticon.com/512/992/992660.png" />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-base ">{name}</div>
              <div className="text-gray-500">{country}</div>
            </div>
            <div className="flex-col justify-between">
              <div className="text-4xl text-gray-500">
                {displayTemprature(data.temp)}
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs/none text-gray-500">
            <div>{data.weatherDescreption}</div>
            <div>
              H:{displayTemprature(data.temp_max)}&nbsp; L:
              {displayTemprature(data.temp_min)}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default LocationDrawerItem;
