import { BoardComponent } from "@/components/board/board-component";
import { getTasks } from "@/data/task";
import { Task } from "@prisma/client";

export default async function Board() {
  const tasks = await getTasks()
  return (
    <BoardComponent tasks={tasks as Task[]}/>
  );
}
