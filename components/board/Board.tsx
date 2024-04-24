"use client"

import { ColumnWithTasks } from "@/data/column"
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface BoardProps {
  columns: ColumnWithTasks[]
}

export const Board = ({columns}: BoardProps) => {

  const onDragEnd = () => {
    console.log("onDragEnd")
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
    >
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>

        </div>
      )}
    </Droppable>
  </DragDropContext>
  )
}

// Suppress defaultProps warning from react-beautiful-dnd
// until this issue is resolved https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};