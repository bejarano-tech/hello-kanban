"use client";
import { useEffect, useMemo, useState } from "react";
import { ColumnWithTasks } from "@/data/column";
import { Task } from "@prisma/client";
import { DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

interface BoardComponent {
  columns: ColumnWithTasks[]
  tasks: Task[]
}

export const BoardComponent = ({ columns: defaultColums, tasks: defaultTasks }: BoardComponent) => {
  const [columns, setColumns] = useState<ColumnWithTasks[]>(defaultColums);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const [activeColumn, setActiveColumn] = useState<ColumnWithTasks | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hellow Kanban</h1>
        <div className="flex gap-4 p-4 justify-center">
        <DndContext
          sensors={sensors}
        >
          </DndContext>
        </div>
    </div>
  );
};
