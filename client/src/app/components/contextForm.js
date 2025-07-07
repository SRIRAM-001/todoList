'use client';
import { useEffect, useState } from 'react';

export default function ContextForm() {
  const [context, setContext] = useState('');
  const [history, setHistory] = useState([]);

  // ✅ Fetch context entries from backend on mount
  useEffect(() => {
    const fetchContextEntries = async () => {
      const res = await fetch('http://localhost:8000/api/contexts/');
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    };
    fetchContextEntries();
  }, []);

  const handleAdd = async () => {
    if (!context.trim()) return;

    const res = await fetch('http://localhost:8000/api/contexts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: context,
        source_type: 'note' // or 'email', 'whatsapp', based on your use case
      })
    });

    if (res.ok) {
      const newEntry = await res.json();
      setHistory([newEntry, ...history]);
      setContext('');
    } else {
      alert('❌ Error saving context');
    }
  };

  return (
    <div className="space-y-6">
      {/* Context Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          🧠 Enter New Context
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Paste your context... (e.g. notes, emails, tasks)"
          value={context}
          rows={4}
          onChange={(e) => setContext(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
        >
          Save Context
        </button>
      </div>

      {/* Context History with AI Insights */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
           History
        </h3>
        <ul className="space-y-3">
          {history.map((item, idx) => (
            <li
              key={idx}
              className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-lg text-gray-800 dark:text-gray-100 shadow-sm"
            >
              {/* Show only AI insight */}
              {item.processed_insight || item.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
