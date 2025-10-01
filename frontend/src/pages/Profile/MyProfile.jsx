import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Edit, Save, X, User, Mail, Calendar, Heart } from 'lucide-react';

const MyProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    bio: user?.bio || '',
    struggles: user?.struggles?.join(', ') || '',
    interests: user?.interests?.join(', ') || ''
  });

  const handleSave = () => {
    updateProfile({
      ...formData,
      struggles: formData.struggles.split(',').map(s => s.trim()).filter(s => s),
      interests: formData.interests.split(',').map(i => i.trim()).filter(i => i)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      age: user?.age || '',
      bio: user?.bio || '',
      struggles: user?.struggles?.join(', ') || '',
      interests: user?.interests?.join(', ') || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your profile and preferences
          </p>
        </div>

        <div className="glass rounded-2xl p-8 animate-fadeIn">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8 pb-8 border-b border-gray-200">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-purple-200"
            />
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="text-2xl font-bold text-gray-800 input-field mb-2"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{user?.name}</h2>
              )}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-gray-600">
                <span className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {user?.age} years old
                </span>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Edit className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Profile Details */}
          <div className="space-y-6">
            {/* Age */}
            {isEditing && (
              <div>
                <label className="block text-gray-700 font-medium mb-2 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="input-field"
                  min="13"
                  max="100"
                />
              </div>
            )}

            {/* Bio */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <User className="w-5 h-5 mr-2" />
                About Me
              </label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="textarea-field"
                  rows="4"
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {user?.bio || 'No bio added yet'}
                </p>
              )}
            </div>

            {/* Struggles */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                What I'm Dealing With
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.struggles}
                  onChange={(e) => setFormData({ ...formData, struggles: e.target.value })}
                  className="input-field"
                  placeholder="Anxiety, Depression, Stress (comma separated)"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user?.struggles?.map((struggle, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium"
                    >
                      {struggle}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interests */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                My Interests
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.interests}
                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                  className="input-field"
                  placeholder="Reading, Music, Yoga (comma separated)"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user?.interests?.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-pink-100 text-pink-700 px-4 py-2 rounded-full font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 btn-secondary flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;