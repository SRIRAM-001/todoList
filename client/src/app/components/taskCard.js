'use client';
import { useRouter } from 'next/navigation';
import PriorityBadge from './priorityBadge';

export default function TaskCard({ task }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/task/${task.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{task.title}</h2>
        <PriorityBadge level={task.priority} />
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">{task.description}</p>

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-3">
        <span>Status: {task.status}</span>
        <span>📅 {task.deadline}</span>
      </div>
    </div>
  );
}
