"use client"
import { Task } from "@prisma/client";
import Column from "./column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";
import { useState } from "react";

interface BoardComponent {
  tasks: Task[]
}

export const BoardComponent = ({ tasks }: BoardComponent) => {
  const [isDropped, setIsDropped] = useState(false);

  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }

  return (
    <div className="flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hellow Kanban</h1>
      <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <div className="flex gap-4 p-4 justify-center">
      <Droppable>
        {isDropped ? draggableMarkup : 'Drop here'}
      </Droppable>
      </div>
    </DndContext>
    </div>
  );
};
