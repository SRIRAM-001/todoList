'use client';
import { useEffect, useState } from 'react';
import TaskCard from '@/components/taskCard';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: '',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tasks]);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/tasks/');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const applyFilters = () => {
    let result = [...tasks];
    if (filters.status) {
      result = result.filter(task => task.status === filters.status);
    }
    if (filters.priority) {
      result = result.filter(task => task.priority === filters.priority);
    }
    if (filters.category) {
      result = result.filter(task => task.category?.toLowerCase().includes(filters.category.toLowerCase()));
    }
    setFilteredTasks(result);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white"> My Tasks</h1>

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>

        <select
          name="priority"
          value={filters.priority}
          onChange={handleFilterChange}
          className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        >
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="text"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          placeholder="Filter by category..."
          className="p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
        />
      </div>

      {/* 📝 Task List */}
      {filteredTasks.length > 0 ? (
        <div className="grid gap-4">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-300">No tasks found.</p>
      )}
    </main>
  );
}
