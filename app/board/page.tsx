import { BoardComponent } from "@/components/board/board-component";
import { getColumns } from "@/data/column";

export default async function Board() {
  const columns = await getColumns()
  return (
    <BoardComponent columns={columns}/>
  );
}
