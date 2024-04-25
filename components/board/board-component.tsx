"use client";

import { ColumnType, ColumnWithTasks } from "@/data/column";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import {
  updateColumnOrderAction,
  updateTaskOrderAction,
} from "@/actions/order";
import { Button } from "@/components/ui/button";
import { NewColumnModal } from "@/components/board/new-column-modal";
import { createNewColumnAction } from "@/actions/column";
import { Column } from "@/components/board/column-component";

interface BoardProps {
  columns: ColumnWithTasks[];
}

export const Board = ({ columns: defaultColums }: BoardProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [columns, setColumns] = useState(defaultColums);
  const [openNewColumnModal, setOpenNewColumnModal] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);
  const onDragEnd = async (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const newColumns = Array.from(columns);
      const [reorderedItem] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, reorderedItem);

      setColumns(newColumns);
      await updateColumnOrderAction(destination.index, source.index);
      return;
    }

    if (result.type === "TASK") {
      const sourceColumn = columns.find(
        (column) => column.title === source.droppableId
      );
      const destinationColumn = columns.find(
        (column) => column.title === destination.droppableId
      );
      if (!sourceColumn || !destinationColumn) {
        return;
      }
      const sourceTasks = Array.from(sourceColumn.tasks);
      const [movedTask] = sourceTasks.splice(source.index, 1);
      if (source.droppableId === destination.droppableId) {
        // Moving within the same column
        sourceTasks.splice(destination.index, 0, movedTask);
        const newColumns = columns.map((column) => {
          if (column.id === sourceColumn.id) {
            return { ...column, tasks: sourceTasks };
          }
          return column;
        });
        setColumns(newColumns);
      } else {
        // Moving to a different column
        const destinationTasks = Array.from(destinationColumn.tasks);
        destinationTasks.splice(destination.index, 0, movedTask);
        const newColumns = columns.map((column) => {
          if (column.id === sourceColumn.id) {
            return { ...column, tasks: sourceTasks };
          } else if (column.id === destinationColumn.id) {
            return { ...column, tasks: destinationTasks };
          }
          return column;
        });
        setColumns(newColumns);
      }
      await updateTaskOrderAction(
        sourceColumn.id,
        destinationColumn.id,
        source.index,
        destination.index,
        movedTask.id
      );
    }
  };
  const toggleNewColumnModal = () => setOpenNewColumnModal(!openNewColumnModal);

  const createNewColumn = async (title: string) => {
    const newColumn = {
      title,
      order: columns.length,
    };
    const columnCreated = await createNewColumnAction(newColumn) as ColumnWithTasks
    setColumns([...columns, columnCreated]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {isBrowser ? (
          <Droppable droppableId="board" type="COLUMN" direction="horizontal">
            {(provided) => (
              <div
                className="bg-yellow-500 h-screen min-w-full inline-flex overflow-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.map((column, index) => (
                  <Column setColumns={setColumns} key={`${column.id}`} column={column} index={index} />
                ))}
                <Button
                  className="mt-2"
                  onClick={() => setOpenNewColumnModal(true)}
                >
                  Create Column
                </Button>
                <NewColumnModal
                  onCreate={createNewColumn}
                  isOpen={openNewColumnModal}
                  toggleModal={toggleNewColumnModal}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : null}
      </div>
    </DragDropContext>
  );
};

// Suppress defaultProps warning from react-beautiful-dnd
// until this issue is resolved https://github.com/recharts/recharts/issues/3615
const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};
