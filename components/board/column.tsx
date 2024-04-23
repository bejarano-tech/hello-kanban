import TaskCard from './task-card';

interface ColumnProps {
  title: string
}

const Column = ({ title }: ColumnProps) => {
  return (
    <div className="bg-gray-200 p-4 rounded w-64">
      <h2 className="font-bold mb-2">{title}</h2>
      <TaskCard />
    </div>
  );
};

export default Column;