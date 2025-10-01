import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JournalEntry from '../../components/journal/JournalEntry';
import JournalForm from '../../components/journal/JournalForm';
import { mockJournalEntries } from '../../utils/mockData';
import { Plus, BookOpen, Filter } from 'lucide-react';

const JournalPage = () => {
  const navigate = useNavigate();
  const { action } = useParams();
  const [entries, setEntries] = useState(mockJournalEntries);
  const [showForm, setShowForm] = useState(action === 'new');
  const [editingEntry, setEditingEntry] = useState(null);
  const [filterMood, setFilterMood] = useState('all');

  const handleSave = (entry) => {
    if (editingEntry) {
      setEntries(entries.map(e => e.id === entry.id ? entry : e));
    } else {
      setEntries([{ ...entry, id: Date.now() }, ...entries]);
    }
    setShowForm(false);
    setEditingEntry(null);
    navigate('/journal');
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEntry(null);
    navigate('/journal');
  };

  const filteredEntries = filterMood === 'all' 
    ? entries 
    : entries.filter(e => e.mood === filterMood);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            My Journal
          </h1>
          <p className="text-gray-600 text-lg">
            Track your thoughts, feelings, and progress
          </p>
        </div>

        {showForm ? (
          <JournalForm
            entry={editingEntry}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <>
            {/* Actions Bar */}
            <div className="glass rounded-2xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  value={filterMood}
                  onChange={(e) => setFilterMood(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 smooth-transition"
                >
                  <option value="all">All Moods</option>
                  <option value="happy">Happy</option>
                  <option value="grateful">Grateful</option>
                  <option value="neutral">Neutral</option>
                  <option value="anxious">Anxious</option>
                  <option value="sad">Sad</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setShowForm(true);
                  navigate('/journal/new');
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>New Entry</span>
              </button>
            </div>

            {/* Entries List */}
            {filteredEntries.length > 0 ? (
              <div className="space-y-6">
                {filteredEntries.map((entry, index) => (
                  <div
                    key={entry.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <JournalEntry
                      entry={entry}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No entries yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your journaling journey by creating your first entry
                </p>
                <button
                  onClick={() => {
                    setShowForm(true);
                    navigate('/journal/new');
                  }}
                  className="btn-primary inline-flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create First Entry</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JournalPage;