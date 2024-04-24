"use server";
import { updateTaskOrder } from "@/data/task";
import { updateColumnOrder } from "@/data/column";

export const updateColumnOrderAction = async (
  destinationIndex: number,
  sourceIndex: number
) => {
  await updateColumnOrder(destinationIndex, sourceIndex);
};

export const updateTaskOrderAction = async (
  sourceColumnId: string,
  destinationColumnId: string,
  sourceIndex: number,
  destinationIndex: number,
  movedTaskId: string
) => {
  await updateTaskOrder(
    sourceColumnId,
    destinationColumnId,
    sourceIndex,
    destinationIndex,
    movedTaskId
  );
};
