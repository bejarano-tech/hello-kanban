import { Board } from "@/components/board/Board";
import { getColumns } from "@/data/column";

export default async function BoardPage() {
  const columns = await getColumns() || []
  return (
    <div className="p-8">
      <h1 className="text-center font-bold text-4xl">Hello Kanban</h1>
      <Board columns={columns} />
    </div>
  );
}
