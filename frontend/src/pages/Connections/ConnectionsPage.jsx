// frontend/src/pages/Connections/ConnectionsPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connectionService } from '../../services';
import { Users, Check, X, Loader, AlertCircle, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ConnectionsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState({});

  useEffect(() => {
    fetchConnections();
  }, [activeTab]);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError('');
      
      const status = activeTab === 'accepted' ? 'accepted' : 'pending';
      const response = await connectionService.getConnections(status);

      if (response.success) {
        setConnections(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching connections:', err);
      setError('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (connectionId) => {
    try {
      setProcessing({ ...processing, [connectionId]: 'accepting' });
      
      const response = await connectionService.acceptRequest(connectionId);

      if (response.success) {
        fetchConnections();
      }
    } catch (err) {
      console.error('Error accepting connection:', err);
      setError(err.message || 'Failed to accept connection');
    } finally {
      setProcessing({ ...processing, [connectionId]: null });
    }
  };

  const handleReject = async (connectionId) => {
    try {
      setProcessing({ ...processing, [connectionId]: 'rejecting' });
      
      const response = await connectionService.rejectRequest(connectionId);

      if (response.success) {
        fetchConnections();
      }
    } catch (err) {
      console.error('Error rejecting connection:', err);
      setError(err.message || 'Failed to reject connection');
    } finally {
      setProcessing({ ...processing, [connectionId]: null });
    }
  };

  const handleMessage = (userId) => {
    navigate(`/chat/${userId}`);
  };

  const getOtherUser = (connection) => {
    if (!connection) return null;
    
    // Get current user ID (try all possible locations)
    const currentUserId = user?.id || user?._id;
    
    // Check if current user is requester or recipient
    const requesterId = connection.requester?._id || connection.requester;
    const recipientId = connection.recipient?._id || connection.recipient;
    
    const isRequester = requesterId === currentUserId;
    return isRequester ? connection.recipient : connection.requester;
  };

  const isPendingReceived = (connection) => {
    // Get current user ID
    const currentUserId = user?.id || user?._id;
    const recipientId = connection.recipient?._id || connection.recipient;
    
    // Check if this is a pending request received by current user
    return recipientId === currentUserId;
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Connections
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your peer connections
          </p>
        </div>

        {/* Tabs */}
        <div className="glass rounded-2xl p-2 mb-8 animate-fadeIn">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pending Requests
            </button>
            <button
              onClick={() => setActiveTab('accepted')}
              className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'accepted'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              My Friends
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Connections List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-12 h-12 animate-spin text-purple-600" />
          </div>
        ) : connections.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {activeTab === 'pending' ? 'No pending requests' : 'No friends yet'}
            </h3>
            <p className="text-gray-500 mb-4">
              {activeTab === 'pending' 
                ? 'Connection requests will appear here' 
                : 'Connect with peers to start chatting'}
            </p>
            <button
              onClick={() => navigate('/peers')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              <Users className="w-5 h-5" />
              <span>Browse Peers</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {connections.map((connection) => {
              const otherUser = getOtherUser(connection);
              if (!otherUser) return null;

              const isReceived = isPendingReceived(connection);
              const isPending = connection.status === 'pending';

              return (
                <div
                  key={connection._id}
                  className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn"
                >
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <img
                      src={otherUser.avatar}
                      alt={otherUser.name}
                      className="w-16 h-16 rounded-full border-4 border-purple-200"
                    />

                    {/* User Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {otherUser.name}
                          </h3>
                          <p className="text-sm text-gray-500">{otherUser.age} years old</p>
                          <p className="text-sm text-gray-600 mt-1">
                            {otherUser.email}
                          </p>
                        </div>

                        {/* Status Badge */}
                        {isPending && (
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            isReceived 
                              ? 'bg-yellow-100 text-yellow-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {isReceived ? 'Received' : 'Sent'}
                          </span>
                        )}
                      </div>

                      {/* Bio */}
                      {otherUser.bio && (
                        <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                          {otherUser.bio}
                        </p>
                      )}

                      {/* Struggles & Interests */}
                      <div className="mt-3 space-y-2">
                        {otherUser.struggles && otherUser.struggles.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {otherUser.struggles.slice(0, 3).map((struggle, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full"
                              >
                                {struggle}
                              </span>
                            ))}
                          </div>
                        )}
                        {otherUser.interests && otherUser.interests.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {otherUser.interests.slice(0, 3).map((interest, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex space-x-3">
                        {isPending && isReceived ? (
                          // Show Accept/Reject for received requests
                          <>
                            <button
                              onClick={() => handleAccept(connection._id)}
                              disabled={processing[connection._id]}
                              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {processing[connection._id] === 'accepting' ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin" />
                                  <span>Accepting...</span>
                                </>
                              ) : (
                                <>
                                  <Check className="w-4 h-4" />
                                  <span>Accept</span>
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(connection._id)}
                              disabled={processing[connection._id]}
                              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {processing[connection._id] === 'rejecting' ? (
                                <>
                                  <Loader className="w-4 h-4 animate-spin" />
                                  <span>Rejecting...</span>
                                </>
                              ) : (
                                <>
                                  <X className="w-4 h-4" />
                                  <span>Reject</span>
                                </>
                              )}
                            </button>
                          </>
                        ) : isPending ? (
                          // Show pending status for sent requests
                          <span className="text-sm text-gray-500 italic">
                            Waiting for response...
                          </span>
                        ) : (
                          // Show Message button for accepted connections
                          <button
                            onClick={() => handleMessage(otherUser._id)}
                            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Send Message</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;