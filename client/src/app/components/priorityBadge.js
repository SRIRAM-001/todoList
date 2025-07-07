export default function PriorityBadge({ level }) {
    const colors = {
      High: 'bg-red-500',
      Medium: 'bg-yellow-400',
      Low: 'bg-green-500',
    };
  
    return (
      <span className={`text-xs text-white px-2 py-1 rounded ${colors[level]}`}>
        {level}
      </span>
    );
  }
  