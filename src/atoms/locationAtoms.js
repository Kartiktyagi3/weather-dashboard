import { atom } from "jotai";

import { atomWithStorage } from "jotai/utils";
import { find } from "lodash";
import { defaultLocation } from "../utils/defaultValue";

const currentLocationAtom = atomWithStorage("current", defaultLocation);

const allLocationsAtom = atomWithStorage("allLocation", [defaultLocation]);

const addLocationAtom = atom(null, (get, set) => {
  const allLocations = get(allLocationsAtom);

  const currentLocation = get(currentLocationAtom);

  // only update if a new array
  const isAlreadyInArray = !!find(
    allLocations,
    (ele) => ele.lat === currentLocation.lat && ele.lon == currentLocation.lon
  );
  if (!isAlreadyInArray)
    set(allLocationsAtom, [...allLocations, currentLocation]);
});

const deleteLocationAtom = atom(null, (get, set, index) => {
  const allLocations = get(allLocationsAtom);

  const newAllLocation = allLocations.filter((ele, idx) => idx !== index);

  set(allLocationsAtom, [...newAllLocation]);
});

// add button beside search bar
const showAddLocationAtom = atom((get) => {
  const allLocations = get(allLocationsAtom);

  const currentLocation = get(currentLocationAtom);

  const isAlreadyInArray = !!find(
    allLocations,
    (ele) => ele.lat === currentLocation.lat && ele.lon == currentLocation.lon
  );
  return !isAlreadyInArray;
});

export {
  addLocationAtom,
  deleteLocationAtom,
  showAddLocationAtom,
  currentLocationAtom,
  allLocationsAtom,
};
