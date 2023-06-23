import LocationDrawer from "./components/LocationDrawer";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import Forcast from "./components/Forcast";
import DayWeather from "./components/DayWeather";

function App() {
  return (
    <div className="max-w-screen-lg my-2 mx-auto border">
      <div className="flex">
        <div className="border-r-4">
          <LocationDrawer />
        </div>
        <div className="w-full p-4">
          <div className="flex justify-end">
            <Search />
          </div>
          <div className="flex gap-5">
            <CurrentWeather />
            <DayWeather />
          </div>
          <div>
            <Forcast />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
