import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import TaskList from "@/components/TaskList";
import TaskHeader from "@/components/TaskHeader";

export default async function TasksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <TaskHeader userEmail={user.email || ""} />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <TaskList initialTasks={tasks || []} />
      </main>
    </div>
  );
}
