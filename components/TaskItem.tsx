"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Task } from "@/lib/supabase";
import TaskForm from "./TaskForm";

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export default function TaskItem({
  task,
  onTaskUpdated,
  onTaskDeleted,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("このタスクを削除してもよろしいですか？")) {
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase.from("tasks").delete().eq("id", task.id);

      if (error) throw error;
      onTaskDeleted(task.id);
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("タスクの削除に失敗しました");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (newStatus: "todo" | "in_progress" | "done") => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", task.id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        onTaskUpdated(data);
      }
    } catch (err) {
      console.error("Error updating task status:", err);
      alert("ステータスの更新に失敗しました");
    }
  };

  const statusColors = {
    todo: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    done: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  };

  const statusLabels = {
    todo: "未着手",
    in_progress: "進行中",
    done: "完了",
  };

  const priorityLabels = {
    low: "低",
    medium: "中",
    high: "高",
  };

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onTaskUpdated={(updatedTask) => {
          onTaskUpdated(updatedTask);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {task.title}
            </h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}
            >
              {statusLabels[task.status]}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}
            >
              優先度: {priorityLabels[task.priority]}
            </span>
          </div>

          {task.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-3 whitespace-pre-wrap">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {task.due_date && (
              <span>
                期限: {new Date(task.due_date).toLocaleDateString("ja-JP")}
              </span>
            )}
            <span>
              作成: {new Date(task.created_at).toLocaleDateString("ja-JP")}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <select
            value={task.status}
            onChange={(e) =>
              handleStatusChange(e.target.value as "todo" | "in_progress" | "done")
            }
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            <option value="todo">未着手</option>
            <option value="in_progress">進行中</option>
            <option value="done">完了</option>
          </select>
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          >
            編集
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors disabled:opacity-50"
          >
            {isDeleting ? "削除中..." : "削除"}
          </button>
        </div>
      </div>
    </div>
  );
}
