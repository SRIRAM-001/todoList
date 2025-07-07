'use client';
import TaskForm from '@/components/taskForm';

export default function CreateTaskPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            📝 Create New Task
          </h1>
          <TaskForm />
        </div>
      </div>
    </div>
  );
}
