"use client"
import { ColumnWithTasks } from "@/data/column";
import { Draggable } from "react-beautiful-dnd";
import { TaskList } from "./task-list";

interface ColumnProps {
  column: ColumnWithTasks;
  index: number;
}
export const Column = ({ column, index }: ColumnProps) => {
  return (
    <Draggable key={index} draggableId={`${column.title}-draggableId`} index={index}>
      {(provided, snapshot) => (
        <div
          className="flex flex-col m-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex items-center justify-center bg-gray-300">
            <h4
              className="p-2 select-none relative"
              {...provided.dragHandleProps}
              aria-label={`${column.title} task list`}
            >
              {column.title}
            </h4>
          </div>
          <TaskList listId={column.title} listType="TASK" tasks={column.tasks} internalScroll />
        </div>
      )}
    </Draggable>
  );
};
