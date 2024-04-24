"use client";
import { ColumnWithTasks } from "@/data/column";
import { Draggable } from "react-beautiful-dnd";
import { TaskList } from "./task-list";
import { Button } from "../ui/button";

interface ColumnProps {
  column: ColumnWithTasks;
  index: number;
}
export const Column = ({ column, index }: ColumnProps) => {
  const createNewTask = () => {
    console.log(column.id)
  }
  return (
    <Draggable
      key={index}
      draggableId={`${column.id}-draggableId`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className="flex flex-col m-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className="flex items-center justify-center bg-gray-300">
            <h4
              className="p-2 select-none relative"
              
              aria-label={`${column.title} task list`}
            >
              {column.title}
            </h4>
          </div>
          <TaskList
            listId={column.title}
            listType="TASK"
            tasks={column.tasks}
            internalScroll
          />
          <Button onClick={createNewTask}>Create Task</Button>
        </div>
      )}
    </Draggable>
  );
};
