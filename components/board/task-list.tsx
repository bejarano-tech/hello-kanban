"use client";
import { Task } from "@prisma/client";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskCard } from "@/components/board/task-card";

interface TaskListProps {
  listId: string;
  listType: string;
  tasks: Task[];
  onDelete: (taskId: string) => Promise<void>
}

export const TaskList = ({
  listId,
  listType,
  tasks,
  onDelete
}: TaskListProps) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={false}
      isDropDisabled={false}
      isCombineEnabled={false}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          className="flex flex-col p-2 border pb-0 select-none w-[250px] bg-gray-300"
          {...dropProvided.droppableProps}
        >
          <div className="overflow-x-hidden overflow-y-auto max-h-[250px]">
            <div>
              <div className="min-h-[250px] pb-4" ref={dropProvided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(dragProvided, dragSnapshot) => (
                      <TaskCard
                        onDelete={onDelete}
                        index={index}
                        key={task.id}
                        task={task}
                        isDragging={dragSnapshot.isDragging}
                        provided={dragProvided}
                      />
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          </div>
          {dropProvided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
