import { Task } from "@prisma/client"
import { DraggableProvided } from "react-beautiful-dnd"

interface TaskCardProps {
  task: Task
  provided: DraggableProvided
  isDragging: boolean
  index: number
}

export const TaskCard = ({task, provided, isDragging, index}: TaskCardProps) => {
  return     <a
  ref={provided.innerRef}
  {...provided.draggableProps}
  {...provided.dragHandleProps}
  data-is-dragging={isDragging}
  data-testid={task.id}
  data-index={index}
  aria-label={`task ${task.name}`}
>
  <div className="flex flex-col grow-1 basis-full">
    <div>{task.description}</div>
  </div>
</a>
}