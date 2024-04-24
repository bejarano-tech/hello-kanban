import { Board } from "@/components/board/Board";
import { getColumns } from "@/data/column";

export default async function BoardPage() {
  const columns = await getColumns() || []
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-8">Hello Kanban</h1>
      <Board columns={columns} />
    </div>
  );
}
