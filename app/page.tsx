import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Task Manager MVP
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          シンプルで使いやすいタスク管理アプリ
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            新規登録
          </Link>
        </div>
      </div>
    </div>
  );
}
