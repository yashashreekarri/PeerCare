import { useState } from 'react';
import { X, Save, Smile, Meh, Frown } from 'lucide-react';

const moods = [
  { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-600', bg: 'bg-green-100' },
  { value: 'grateful', label: 'Grateful', icon: Smile, color: 'text-purple-600', bg: 'bg-purple-100' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { value: 'anxious', label: 'Anxious', icon: Frown, color: 'text-orange-600', bg: 'bg-orange-100' },
  { value: 'sad', label: 'Sad', icon: Frown, color: 'text-blue-600', bg: 'bg-blue-100' }
];

const JournalForm = ({ entry, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: entry?.title || '',
    content: entry?.content || '',
    mood: entry?.mood || 'neutral',
    tags: entry?.tags?.join(', ') || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const journalEntry = {
      ...entry,
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      date: entry?.date || new Date().toISOString()
    };
    onSave(journalEntry);
  };

  return (
    <div className="glass rounded-2xl p-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold gradient-text">
          {entry ? 'Edit Entry' : 'New Journal Entry'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg smooth-transition"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="Give your entry a title..."
            required
          />
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-3">How are you feeling?</label>
          <div className="grid grid-cols-5 gap-3">
            {moods.map((mood) => {
              const MoodIcon = mood.icon;
              const isSelected = formData.mood === mood.value;
              return (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: mood.value })}
                  className={`p-4 rounded-xl smooth-transition ${
                    isSelected
                      ? `${mood.bg} ring-2 ring-offset-2 ring-purple-500`
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <MoodIcon className={`w-6 h-6 mx-auto mb-2 ${isSelected ? mood.color : 'text-gray-400'}`} />
                  <p className={`text-xs font-medium ${isSelected ? mood.color : 'text-gray-600'}`}>
                    {mood.label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Your Thoughts</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="textarea-field"
            placeholder="Write about your day, feelings, or anything on your mind..."
            rows="8"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Tags (Optional)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="input-field"
            placeholder="anxiety, progress, gratitude (comma separated)"
          />
          <p className="text-sm text-gray-500 mt-1">
            Separate multiple tags with commas
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 btn-primary flex items-center justify-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>Save Entry</span>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;