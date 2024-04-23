"use client";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import { Draggable } from "./draggable";
import { Droppable } from "./droppable";
import { useEffect, useState } from "react";
import { ColumnWithTasks } from "@/data/column";

interface BoardComponent {
  columns: ColumnWithTasks[];
}

export const BoardComponent = ({ columns }: BoardComponent) => {
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);
  const containers = ['A', 'B', 'C'];

  const draggableMarkup = <Draggable id="1">Drag me</Draggable>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  };

  useEffect(() => {
    console.log(parent)
  }, [parent])

  return (
    <div className="flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hellow Kanban</h1>
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}
        <div>
        <div className="flex gap-4 p-4 justify-center">
          {containers.map((column) => (
            <Droppable key={column} id={column}>
              <div className="bg-gray-200 p-4 rounded w-64">
                <h2 className="font-bold mb-2">{column}</h2>
                {parent === column ? draggableMarkup : "Drop here"}
              </div>
            </Droppable>
          ))}
        </div>
        </div>
      </DndContext>
      {/* <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <div className="flex gap-4 p-4 justify-center">
          <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
        </div>
      </DndContext> */}
    </div>
  );
};
