import { useState } from "react";
import classNames from "classnames";
import fallbackWeatherImage from "../assets/weatherGeneric.png";
import { weatherImageLocation } from "../utils/weatherUtils";

// add comment
export const WeatherImage = ({ icon, alt, className }) => {
  const [error, setError] = useState(false);

  const imageClass = classNames(className);

  const src = weatherImageLocation(icon);

  const useFalbackImage = error || !src;

  return (
    <>
      <img
        src={useFalbackImage ? fallbackWeatherImage : src}
        alt={alt}
        onError={() => setError(true)}
        className={imageClass}
      />
    </>
  );
};

export default WeatherImage;
