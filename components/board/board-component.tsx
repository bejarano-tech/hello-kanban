"use client";
import { useEffect, useMemo, useState } from "react";
import { ColumnWithTasks } from "@/data/column";
import { Task } from "@prisma/client";
import { DndContext, DragEndEvent, DragOverEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Column from "@/components/board/column";


interface BoardComponent {
  columns: ColumnWithTasks[]
}

export const BoardComponent = ({ columns: defaultColums }: BoardComponent) => {
  const [columns, setColumns] = useState<ColumnWithTasks[]>(defaultColums);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState<ColumnWithTasks | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    console.log(event)
  }

  const onDragEnd = (event: DragEndEvent) => {
    console.log(event)
  }

  const onDragOver = (event: DragOverEvent) => {
    console.log(event)
  }

  return (
    <div className="flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hellow Kanban</h1>
        <div className="flex gap-4 p-4 justify-center">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
            <div className="flex gap-4 p-4">
            <SortableContext items={columnsId}>
              {columns.map(({title, id, tasks}) => (
                <Column
                  key={id}
                  title={title}
                  tasks={tasks.filter((task) => task.columnId === id)}
                />
              ))}
            </SortableContext>
            </div>
          </DndContext>
        </div>
    </div>
  );
};
