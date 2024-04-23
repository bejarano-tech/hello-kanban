import { Task } from "@prisma/client";
import TaskCard from "./task-card";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";

interface ColumnProps {
  title: string
  tasks: Task[]
}

const Column = ({ title, tasks }: ColumnProps) => {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  
  return (
    <div className="bg-gray-200 p-4 rounded w-64">
      <h2 className="font-bold mb-2">{title}</h2>
      <SortableContext items={tasksIds}>
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </SortableContext>
      {/* {tasks?.map(task => <TaskCard key={task.id} {...task}/>)} */}
    </div>
  );
};

export default Column;
