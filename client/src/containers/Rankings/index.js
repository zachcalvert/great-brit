import React, { useState } from "react";
// import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = () => {
  const mockBakers = [
    "Darius",
    "Derek",
    "Dennis",
    "Dylan",
    "Dustin",
    "Dwayne",
    "Dwight",
    "Earl",
    "Eddie",
    "Edgar",
  ];

  return mockBakers.map((baker, idx) => ({
    id: `item-${baker}`,
    content: `${baker}`,
  }));
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  height: "40px",
  display: "flex",
  alignItems: "center",
  fontSize: "24px",
  color: "var(--dark-blue)",
  fontweight: "bold",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "var(--manilla)",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.08)",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "white",
  padding: grid,
  margin: "0 auto",
  marginTop: "160px",
  width: "50%",
});

const Rankings = () => {
  const [state, setState] = useState({
    items: getItems(),
  });

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index
    );

    setState({
      items,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {state.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {index + 1}: {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Rankings;
