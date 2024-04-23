import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Kanban Board</h1>
      <p className="mb-8">Welcome to Kanban Board: A small task manager app for kanban methodology</p>
      <Button><Link href={"/auth/login"}>Login</Link></Button>
    </main>
  );
}
