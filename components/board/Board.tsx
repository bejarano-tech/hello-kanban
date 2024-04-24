"use client";

import { ColumnWithTasks } from "@/data/column";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Column } from "./Column";

interface BoardProps {
  columns: ColumnWithTasks[];
}

export const Board = ({ columns }: BoardProps) => {
  const onDragEnd = () => {
    console.log("onDragEnd");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(provided) => (
          <div
            className="bg-yellow-500 h-screen min-w-full inline-flex"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {columns.map((column, index) => (
              <Column key={`${index}-col`} column={column} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Suppress defaultProps warning from react-beautiful-dnd
// until this issue is resolved https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
