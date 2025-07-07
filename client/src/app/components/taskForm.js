'use client';
import { useEffect, useState } from 'react';

export default function TaskForm({ initialTask, onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    deadline: '',
    status: 'Pending',
    category: ''
  });

  useEffect(() => {
    if (initialTask) {
      setFormData(initialTask);
    }
  }, [initialTask]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (onSubmit) {
      onSubmit(formData); // for edit flow
    } else {
      // Step 1: Call AI suggest endpoint
      const aiRes = await fetch('http://localhost:8000/api/ai-suggest/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          context: ["Meeting: Focus on financials", "Email from manager: Q2 report"] // You can dynamically fetch from /api/context/
        })
      });
  
      if (!aiRes.ok) {
        alert("❌ AI enhancement failed");
        return;
      }
  
      const aiData = await aiRes.json();
  
      // Step 2: Create the final task using AI-enhanced data
      const finalTask = {
        ...formData,
        description: aiData.improved_description || formData.description,
        priority: aiData.priority || formData.priority,
        deadline: aiData.suggested_deadline || formData.deadline,
        category: aiData.category || formData.category,
      };
  
      const res = await fetch('http://localhost:8000/api/tasks/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalTask)
      });
  
      if (res.ok) {
        alert('✅ Task created with AI!');
        setFormData({
          title: '',
          description: '',
          priority: 'Medium',
          deadline: '',
          status: 'Pending',
          category: ''
        });
      } else {
        alert('❌ Error creating task');
      }
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-xl mx-auto"
    >
      {/* Title */}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Description</label>
        <textarea
          placeholder="Describe the task..."
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded h-24 bg-white dark:bg-gray-700 text-black dark:text-white"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      {/* Priority & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Priority</label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Status</label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>In Progress</option>
          </select>
        </div>
      </div>

      {/* Deadline */}
      <div>
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">Deadline</label>
        <input
          type="date"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md transition-all"
        >
          {onSubmit ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}
