import ContextForm from '@/components/contextForm';

export default function ContextPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            🧠 Daily Context Input
          </h1>
          <ContextForm />
        </div>
      </div>
    </div>
  );
}
