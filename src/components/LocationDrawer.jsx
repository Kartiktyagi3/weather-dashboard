import { allLocationsAtom } from "../atoms";
import { useAtom } from "jotai";
import LocationDrawerItem from "./LocationDrawerItem";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

function LocationDrawer() {
  const [allLocation, setAllLocation] = useAtom(allLocationsAtom);

  const drawerItems = allLocation.map((ele, idx) => {
    return (
      <LocationDrawerItem
        key={ele.id}
        name={ele.name}
        country={ele.country}
        lat={ele.lat}
        lon={ele.lon}
        state={ele.state}
        id={ele.id}
        idx={idx}
      />
    );
  });

  // update state after dropping
  const dragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (source.index === destination.index) return;

    const newAllLocation = Array.from(allLocation);

    newAllLocation.splice(source.index, 1);

    newAllLocation.splice(destination.index, 0, allLocation[source.index]);

    setAllLocation(newAllLocation);
  };

  return (
    <DragDropContext onDragEnd={dragEnd}>
      <Droppable droppableId="locationDrawer">
        {(provided, snapshot) => (
          <div
            className={`min-w-[250px] h-full p-4 ${
              snapshot.isDraggingOver && "bg-cyan-50"
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className="text-md my-2">My Locations</div>

            {drawerItems}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default LocationDrawer;
