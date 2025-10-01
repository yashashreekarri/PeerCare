// frontend/src/pages/Profile/BrowsePeers.jsx
import { useState, useEffect } from 'react';
import { Search, Users, Loader, AlertCircle } from 'lucide-react';
import { userService, connectionService } from '../../services';
import { useAuth } from '../../contexts/AuthContext';

const BrowsePeers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    online: false,
    struggles: '',
    interests: '',
  });
  const [sendingRequest, setSendingRequest] = useState({});

  // Fetch users on component mount and when filters change
  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await userService.getUsers({
        search: searchTerm,
        online: filters.online || undefined,
        struggles: filters.struggles || undefined,
        interests: filters.interests || undefined,
      });

      if (response.success) {
        setUsers(response.data);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleSendRequest = async (userId) => {
    try {
      setSendingRequest({ ...sendingRequest, [userId]: true });
      
      const response = await connectionService.sendConnectionRequest(userId);
      
      if (response.success) {
        alert('Connection request sent successfully!');
      }
    } catch (err) {
      console.error('Error sending connection request:', err);
      alert(err.message || 'Failed to send connection request');
    } finally {
      setSendingRequest({ ...sendingRequest, [userId]: false });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading peers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Find Your Peers
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with others who understand your journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-2xl p-6 mb-8 animate-fadeIn">
          <form onSubmit={handleSearch} className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or bio..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.online}
                    onChange={(e) => setFilters({ ...filters, online: e.target.checked })}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-700">Online only</span>
                </label>
              </div>

              <div>
                <input
                  type="text"
                  value={filters.struggles}
                  onChange={(e) => setFilters({ ...filters, struggles: e.target.value })}
                  placeholder="Filter by struggles (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={filters.interests}
                  onChange={(e) => setFilters({ ...filters, interests: e.target.value })}
                  placeholder="Filter by interests (comma-separated)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Users Grid */}
        {users.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No peers found</h3>
            <p className="text-gray-500">Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((peer) => (
              <div
                key={peer._id || peer.id}
                className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
              >
                {/* Avatar and Online Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-16 h-16 rounded-full border-4 border-purple-200"
                    />
                    {peer.isOnline && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{peer.age} years</span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{peer.name}</h3>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {peer.bio || 'No bio available'}
                </p>

                {/* Struggles */}
                {peer.struggles && peer.struggles.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Struggles:</p>
                    <div className="flex flex-wrap gap-1">
                      {peer.struggles.map((struggle, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                        >
                          {struggle}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interests */}
                {peer.interests && peer.interests.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {peer.interests.map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connect Button */}
                <button
                  onClick={() => handleSendRequest(peer._id || peer.id)}
                  disabled={sendingRequest[peer._id || peer.id]}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {sendingRequest[peer._id || peer.id] ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Connect</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePeers;