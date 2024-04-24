"use client";
import * as z from "zod";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ColumnWithTasks } from "@/data/column";
import { TaskList } from "./task-list";
import { Button } from "../ui/button";
import { NewTaskModal } from "./new-task-modal";
import { NewTaskSchema } from "@/schemas";
import { createNewTaskAction, deleteTaskAction } from "@/actions/task";
import { Task } from "@prisma/client";
import { deleteColumnAction } from "@/actions/column";

interface ColumnProps {
  column: ColumnWithTasks;
  index: number;
  setColumns: any;
}
export const Column = ({ column, index, setColumns }: ColumnProps) => {
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const toggleNewTaskModal = () => setOpenNewTaskModal(!openNewTaskModal);

  const createNewTask = async (values: z.infer<typeof NewTaskSchema>) => {
    const taskCreated = await createNewTaskAction(values, column.id) as Task
    const tasks = [...column.tasks, taskCreated];
    updateColumnsWithTask(tasks)
  };

  const onDeleteTask = async (taskId: string) => {
    await deleteTaskAction(taskId)
    const tasks = column.tasks.filter(({id}) => id !== taskId)
    updateColumnsWithTask(tasks)
  }

  const updateColumnsWithTask = (tasks: Task[]) => {
    setColumns((currentColumns: ColumnWithTasks[]) => currentColumns.map(col => {
      if (col.id === column.id) {
        return { ...col, tasks };
      }
      return col;
    }));
  }

  const onDeleteColumn = async () => {
    await deleteColumnAction(column.id)
    setColumns((currentColumns: ColumnWithTasks[]) => currentColumns.filter(({id}) => id !== column.id));
  }

  return (
    <>
    <Draggable
      key={index}
      draggableId={`${column.id}-draggableId`}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className="flex flex-col m-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className="flex items-center justify-between bg-gray-300">
            <h4
              className="p-2 select-none relative"
              
              aria-label={`${column.title} task list`}
            >
              {column.title}
            </h4>
            <Button variant="link" onClick={onDeleteColumn}>Delete</Button>

          </div>
          <TaskList
            listId={column.title}
            listType="TASK"
            tasks={column.tasks}
            onDelete={onDeleteTask}
          />
          <Button onClick={toggleNewTaskModal}>Create Task</Button>
        </div>
      )}
    </Draggable>
    <NewTaskModal isOpen={openNewTaskModal} toggleModal={toggleNewTaskModal} onCreate={createNewTask} />
    </>
  );
};
