import { BoardComponent } from "@/components/board/board-component";
import { getTasks } from "@/data/task";

export default async function Board() {
  const tasks = await getTasks()
  return (
    <BoardComponent tasks={tasks}/>
  );
}
