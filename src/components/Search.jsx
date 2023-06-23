// import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getLocation } from "../api";
import AsyncSelect from "react-select/async";
import { debounce } from "../utils/debounce";
import { useRef, useState } from "react";
import {
  currentLocationAtom,
  addLocationAtom,
  showAddLocationAtom,
} from "../atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

const loadOptions = (inputValue, callback) => {
  getLocation({ location: inputValue }).then((response) => {
    const options = [];
    response.data.forEach((ele) => {
      options.push({
        label: `${ele.name}, ${ele.country}`,
        value: {
          lat: ele.lat,
          lon: ele.lon,
          name: ele.name,
          country: ele.country,
          state: ele.state,
          id: `${ele.lat}-${ele.lon}`,
        },
      });
    });
    callback(options);
  });
};

function AddLocation() {
  const addLocation = useSetAtom(addLocationAtom);

  return (
    <div
      className="uppercase text-sm/tight p-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-400 transition-all"
      onClick={() => addLocation()}
    >
      add
    </div>
  );
}

function Search() {
  const [search, setSeatch] = useState("");

  const setCurrentAtom = useSetAtom(currentLocationAtom);

  const showAddLocation = useAtomValue(showAddLocationAtom);

  // will prevent recreation of the function
  const debouncedLoadOption = useRef(debounce(loadOptions, 600));

  const handleChange = (event) => {
    setCurrentAtom(event.value);

    setSeatch("");
  };

  return (
    <div className="flex gap-3 items-center">
      {showAddLocation && <AddLocation />}
      <div className="max-w-xs min-w-[250px]">
        <AsyncSelect
          cacheOptions
          defaultValue
          value={search}
          onChange={handleChange}
          loadOptions={debouncedLoadOption.current}
        />
      </div>
    </div>
  );
}

export default Search;
