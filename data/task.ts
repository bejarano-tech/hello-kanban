import { db } from "@/lib/db";

export const getTasks = async () => {
  try {
    const tasks = await db.task.findMany();
    return tasks;
  } catch {
    return null;
  }
};

export const updateTaskOrder = async (sourceColumnId: string, destinationColumnId: string, sourceIndex: number, destinationIndex: number, movedTaskId: string) => {
  const sourceTasks = await db.task.findMany({
    where: { columnId: sourceColumnId },
    orderBy: { order: 'asc' }
  });
  const destinationTasks = sourceColumnId === destinationColumnId ? sourceTasks : await db.task.findMany({
    where: { columnId: destinationColumnId },
    orderBy: { order: 'asc' }
  });

  // Remove the task from its original position
  const [movedTask] = sourceTasks.splice(sourceIndex, 1);

  // If the task is moving to a different column, update its columnId
  if (sourceColumnId !== destinationColumnId) {
    movedTask.columnId = destinationColumnId;
  }

  // Insert the task at its new position in the destination
  destinationTasks.splice(destinationIndex, 0, movedTask);

  // Update the database
  const updates = destinationTasks.map((task, index) => db.task.update({
    where: { id: task.id },
    data: {
      order: index,
      columnId: task.columnId
    },
  }));

  // If moving within the same column, we need to update the order in the original column as well
  if (sourceColumnId === destinationColumnId) {
    updates.push(...sourceTasks.map((task, index) => db.task.update({
      where: { id: task.id },
      data: { order: index }
    })));
  }

  await db.$transaction(updates);
}