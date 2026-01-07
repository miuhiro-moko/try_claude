"use client";

import { useState } from "react";
import { Task } from "@/lib/supabase";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

interface TaskListProps {
  initialTasks: Task[];
}

export default function TaskList({ initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "todo" | "in_progress" | "done">("all");
  const [showForm, setShowForm] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const statusCounts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
    setShowForm(false);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            すべて ({statusCounts.all})
          </button>
          <button
            onClick={() => setFilter("todo")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "todo"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            未着手 ({statusCounts.todo})
          </button>
          <button
            onClick={() => setFilter("in_progress")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "in_progress"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            進行中 ({statusCounts.in_progress})
          </button>
          <button
            onClick={() => setFilter("done")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "done"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            完了 ({statusCounts.done})
          </button>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          {showForm ? "キャンセル" : "+ 新規タスク"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <TaskForm onTaskAdded={handleTaskAdded} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <p className="text-gray-500 dark:text-gray-400">
              {filter === "all" ? "タスクがありません" : `「${filter === "todo" ? "未着手" : filter === "in_progress" ? "進行中" : "完了"}」のタスクがありません`}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}
