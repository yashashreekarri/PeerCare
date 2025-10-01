// frontend/src/pages/Profile/MyProfile.jsx
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services';
import { Edit, Save, X, User, Mail, Calendar, Heart, Loader, AlertCircle, CheckCircle } from 'lucide-react';

const MyProfile = () => {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || '',
    bio: user?.bio || '',
    struggles: user?.struggles?.join(', ') || '',
    interests: user?.interests?.join(', ') || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Prepare data for API
      const updateData = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        bio: formData.bio.trim(),
        struggles: formData.struggles
          .split(',')
          .map(s => s.trim())
          .filter(s => s),
        interests: formData.interests
          .split(',')
          .map(i => i.trim())
          .filter(i => i)
      };

      const response = await userService.updateProfile(updateData);

      if (response.success) {
        // Refresh user data in context
        await refreshUser();
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      age: user?.age || '',
      bio: user?.bio || '',
      struggles: user?.struggles?.join(', ') || '',
      interests: user?.interests?.join(', ') || ''
    });
    setError('');
    setSuccess('');
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
          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-8 pb-8 border-b border-gray-200">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full border-4 border-purple-200"
            />
            <div className="flex-1 text-center sm:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Age"
                      min="13"
                      max="100"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                  <p className="text-gray-600">{user?.age} years old</p>
                </>
              )}
              <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-600 text-sm">{user?.email}</p>
              </div>
            </div>

            {/* Edit/Save/Cancel Buttons */}
            <div className="flex space-x-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={loading}
                    className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-purple-600" />
              About Me
            </h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows="4"
                placeholder="Tell others about yourself..."
                maxLength="500"
              />
            ) : (
              <p className="text-gray-700">
                {user?.bio || 'No bio added yet. Click edit to add one!'}
              </p>
            )}
          </div>

          {/* Struggles Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Struggles</h3>
            {isEditing ? (
              <input
                type="text"
                name="struggles"
                value={formData.struggles}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Comma-separated (e.g., Anxiety, Depression)"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {user?.struggles && user.struggles.length > 0 ? (
                  user.struggles.map((struggle, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                    >
                      {struggle}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No struggles added</p>
                )}
              </div>
            )}
          </div>

          {/* Interests Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Interests</h3>
            {isEditing ? (
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Comma-separated (e.g., Reading, Music, Hiking)"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {user?.interests && user.interests.length > 0 ? (
                  user.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No interests added</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;