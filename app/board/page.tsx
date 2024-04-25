import { Board } from "@/components/board/board-component";
import { getColumns } from "@/data/column";

export const dynamic = 'force-dynamic'

export default async function BoardPage() {
  const columns = await getColumns() || []
  return (
    <div>
      <h1 className="ml-2 md:text-center font-bold my-8 text-2xl md:text-4xl">Hello Kanban</h1>
      <div className="overflow-auto">
      <Board columns={columns} />
      </div>
    </div>
  );
}
