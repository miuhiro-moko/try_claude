"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface TaskHeaderProps {
  userEmail: string;
}

export default function TaskHeader({ userEmail }: TaskHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              タスク管理
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {userEmail}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
