"use client"

import { ColumnWithTasks } from "@/data/column"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
        <div className="bg-yellow-500 h-screen min-w-full inline-flex" ref={provided.innerRef} {...provided.droppableProps}>
          {columns.map((column, index) => 
             <Draggable key={index} draggableId={column.title} index={index}>
            {(provided, snapshot) => (
              <div className="flex flex-col m-2" ref={provided.innerRef} {...provided.draggableProps}>
                {/* TODO: Change color on snapshot.isDragging */}
                <div className="flex items-center justify-center bg-gray-300">
                  <h4
                    className="p-2 select-none relative"
                    {...provided.dragHandleProps}
                    aria-label={`${column.title} task list`}
                  >
                    {column.title}
                  </h4>
                </div>
              </div>
            )}
          </Draggable>
          )}
          {provided.placeholder}
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