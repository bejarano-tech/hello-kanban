import { Task } from '@prisma/client';
import TaskCard from './task-card';

interface ColumnProps {
  title: string
  tasks: Task[]
}

const Column = ({ title, tasks }: ColumnProps) => {
  return (
    <div className="bg-gray-200 p-4 rounded w-64">
      <h2 className="font-bold mb-2">{title}</h2>
      {tasks?.map(task => <TaskCard key={task.id} {...task}/>)}
    </div>
  );
};

export default Column;