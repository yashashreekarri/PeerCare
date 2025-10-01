// frontend/src/pages/Journal/JournalPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { journalService } from '../../services';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Loader, 
  AlertCircle, 
  CheckCircle,
  Smile,
  Meh,
  Frown,
  Search
} from 'lucide-react';
import { format } from 'date-fns';

const JournalPage = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    mood: '',
    tags: ''
  });
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
    tags: ''
  });

  // Mood options
  const moods = [
    { value: 'happy', label: 'Happy', icon: Smile, color: 'text-green-600' },
    { value: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-600' },
    { value: 'sad', label: 'Sad', icon: Frown, color: 'text-red-600' },
    { value: 'anxious', label: 'Anxious', icon: AlertCircle, color: 'text-orange-600' },
    { value: 'excited', label: 'Excited', icon: Smile, color: 'text-purple-600' }
  ];

  useEffect(() => {
    fetchEntries();
  }, [filters]);

  useEffect(() => {
    if (action === 'new') {
      setIsCreating(true);
    }
  }, [action]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await journalService.getEntries({
        mood: filters.mood || undefined,
        tags: filters.tags || undefined
      });

      if (response.success) {
        setEntries(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching entries:', err);
      setError('Failed to load journal entries');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const entryData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        mood: formData.mood || 'neutral',
        tags: formData.tags
          .split(',')
          .map(t => t.trim())
          .filter(t => t)
      };

      const response = await journalService.createEntry(entryData);

      if (response.success) {
        setSuccess('Journal entry created successfully!');
        setFormData({ title: '', content: '', mood: '', tags: '' });
        setIsCreating(false);
        navigate('/journal');
        fetchEntries();
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error creating entry:', err);
      setError(err.message || 'Failed to create journal entry');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!selectedEntry) return;

    try {
      setLoading(true);
      setError('');
      
      const entryData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        mood: formData.mood,
        tags: formData.tags
          .split(',')
          .map(t => t.trim())
          .filter(t => t)
      };

      const response = await journalService.updateEntry(selectedEntry._id, entryData);

      if (response.success) {
        setSuccess('Journal entry updated successfully!');
        setIsEditing(false);
        setSelectedEntry(null);
        fetchEntries();
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error updating entry:', err);
      setError(err.message || 'Failed to update journal entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (entryId) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await journalService.deleteEntry(entryId);

      if (response.success) {
        setSuccess('Journal entry deleted successfully!');
        setSelectedEntry(null);
        fetchEntries();
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
      setError(err.message || 'Failed to delete journal entry');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      tags: entry.tags?.join(', ') || ''
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setSelectedEntry(null);
    setFormData({ title: '', content: '', mood: '', tags: '' });
    setError('');
    navigate('/journal');
  };

  const getMoodIcon = (mood) => {
    const moodObj = moods.find(m => m.value === mood);
    if (!moodObj) return null;
    const Icon = moodObj.icon;
    return <Icon className={`w-5 h-5 ${moodObj.color}`} />;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
              My Journal
            </h1>
            <p className="text-gray-600 text-lg">
              Track your thoughts and emotions
            </p>
          </div>
          {!isCreating && !isEditing && (
            <button
              onClick={() => {
                setIsCreating(true);
                navigate('/journal/new');
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          )}
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2 animate-fadeIn">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <div className="glass rounded-2xl p-8 mb-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isCreating ? 'Create New Entry' : 'Edit Entry'}
            </h2>
            
            <form onSubmit={isCreating ? handleCreate : handleUpdate} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Give your entry a title..."
                  required
                />
              </div>

              {/* Mood */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">How are you feeling?</label>
                <div className="flex flex-wrap gap-2">
                  {moods.map((mood) => {
                    const Icon = mood.icon;
                    return (
                      <button
                        key={mood.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, mood: mood.value })}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition ${
                          formData.mood === mood.value
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${mood.color}`} />
                        <span className="text-sm font-medium">{mood.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows="10"
                  placeholder="Write your thoughts..."
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Comma-separated (e.g., gratitude, reflection)"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>{isCreating ? 'Create' : 'Update'}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters */}
        {!isCreating && !isEditing && (
          <div className="glass rounded-2xl p-6 mb-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Filter by Mood</label>
                <select
                  value={filters.mood}
                  onChange={(e) => setFilters({ ...filters, mood: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">All Moods</option>
                  {moods.map((mood) => (
                    <option key={mood.value} value={mood.value}>
                      {mood.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Filter by Tags</label>
                <input
                  type="text"
                  value={filters.tags}
                  onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
                  placeholder="Comma-separated tags"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        {!isCreating && !isEditing && (
          <div className="space-y-6">
            {loading && entries.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-12 h-12 animate-spin text-purple-600" />
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No entries yet</h3>
                <p className="text-gray-500 mb-4">Start journaling to track your journey</p>
                <button
                  onClick={() => {
                    setIsCreating(true);
                    navigate('/journal/new');
                  }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Your First Entry</span>
                </button>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry._id}
                  className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getMoodIcon(entry.mood)}
                        <h3 className="text-xl font-bold text-gray-800">{entry.title}</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        {format(new Date(entry.createdAt), 'MMMM dd, yyyy - hh:mm a')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 whitespace-pre-wrap">{entry.content}</p>

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalPage;