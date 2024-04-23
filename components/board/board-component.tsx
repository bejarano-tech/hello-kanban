import { Task } from "@prisma/client";
import Column from "./column";

interface BoardComponent {
  tasks: Task[]
}

export const BoardComponent = ({ tasks }: BoardComponent) => {
  return (
    <div className="flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hellow Kanban</h1>
      <div className="flex gap-4 p-4 justify-center">
        <Column title="To Do" />
        <Column title="In Progress" />
        <Column title="Done" />
      </div>
    </div>
  );
};
