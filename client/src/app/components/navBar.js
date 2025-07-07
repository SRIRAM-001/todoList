'use client';

import Link from 'next/link';
import ThemeToggle from './themeToggle';

export default function NavBar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 tracking-tight">
        Smart Todo
      </h1>

      <div className="flex items-center space-x-6">
        <Link
          href="/dashboard"
          className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
        >
           Tasks
        </Link>
        <Link
          href="/task/create"
          className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
        >
           Add
        </Link>
        <Link
          href="/context"
          className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition"
        >
           Feed
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
