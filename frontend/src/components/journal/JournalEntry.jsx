import { format } from 'date-fns';
import { Calendar, Edit, Trash2, Smile, Meh, Frown } from 'lucide-react';

const moodIcons = {
  happy: { icon: Smile, color: 'text-green-600', bg: 'bg-green-100' },
  neutral: { icon: Meh, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  sad: { icon: Frown, color: 'text-blue-600', bg: 'bg-blue-100' },
  anxious: { icon: Frown, color: 'text-orange-600', bg: 'bg-orange-100' },
  grateful: { icon: Smile, color: 'text-purple-600', bg: 'bg-purple-100' }
};

const JournalEntry = ({ entry, onEdit, onDelete }) => {
  const moodConfig = moodIcons[entry.mood] || moodIcons.neutral;
  const MoodIcon = moodConfig.icon;

  return (
    <div className="glass rounded-2xl p-6 card-hover animate-fadeIn">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{entry.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {format(new Date(entry.date), 'MMM dd, yyyy')}
            </span>
            <div className={`flex items-center space-x-1 ${moodConfig.bg} px-3 py-1 rounded-full`}>
              <MoodIcon className={`w-4 h-4 ${moodConfig.color}`} />
              <span className={`capitalize ${moodConfig.color} font-medium`}>
                {entry.mood}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(entry)}
            className="p-2 hover:bg-purple-100 rounded-lg smooth-transition"
          >
            <Edit className="w-5 h-5 text-purple-600" />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-2 hover:bg-red-100 rounded-lg smooth-transition"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-relaxed mb-4">{entry.content}</p>

      {/* Tags */}
      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalEntry;