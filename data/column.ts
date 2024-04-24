import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export type ColumnWithTasks = Prisma.ColumnGetPayload<{
  include: { tasks: true };
}>;

export const getColumns = async () => {
  try {
    const columns = await db.column.findMany({
      include: { tasks: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });
    return columns as ColumnWithTasks[];
  } catch {
    return null;
  }
};

export const updateColumnOrder = async (sourceIndex: number, destinationIndex: number) => {
  const allColumns = await db.column.findMany({
    orderBy: {
      order: 'asc',
    }
  });
  
  const movedColumn = allColumns[sourceIndex];
  allColumns.splice(sourceIndex, 1);  // Remove the column from its original position
  allColumns.splice(destinationIndex, 0, movedColumn);  // Insert the column at the new position

  // Update the order in the database
  for (let i = 0; i < allColumns.length; i++) {
    await db.column.update({
      where: {
        id: allColumns[i].id,
      },
      data: {
        order: i,
      },
    });
  }
}