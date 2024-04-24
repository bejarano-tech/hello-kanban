"use client";
import { Task } from "@prisma/client";
import { DraggableProvided } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TaskCardProps {
  task: Task;
  provided: DraggableProvided;
  isDragging: boolean;
  index: number;
  onDelete: (taskId: string) => Promise<void>
}

export const TaskCard = ({
  task,
  provided,
  isDragging,
  index,
  onDelete
}: TaskCardProps) => {
  return (
    <a
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={task.id}
      data-index={index}
      aria-label={`task ${task.name}`}
    >
      <Card className="flex flex-col grow-1 basis-full rounded p-4 mb-4">
        <h4>{task.name}</h4>
        <p>{task.description}</p>
        <Button variant="link" onClick={() => onDelete(task.id)}>Delete</Button>
      </Card>
    </a>
  );
};
