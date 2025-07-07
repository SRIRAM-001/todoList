'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import TaskForm from '@/components/taskForm';

export default function EditTaskPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/api/tasks/${id}/`)
        .then(res => res.json())
        .then(data => setTask(data))
        .catch(err => console.error('Error fetching task:', err));
    }
  }, [id]);

  const handleUpdate = async (updatedTask) => {
    const res = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    });

    if (res.ok) {
      alert('✅ Task updated successfully!');
    } else {
      alert('❌ Error updating task');
    }
  };

  if (!task) return <p className="p-6 text-gray-500 dark:text-gray-300">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
             Edit Task 
          </h1>
          <TaskForm initialTask={task} onSubmit={handleUpdate} />
        </div>
      </div>
    </div>
  );
}
