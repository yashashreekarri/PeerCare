import { MessageCircle, Heart, UserPlus, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const PeerCard = ({ peer }) => {
  const [connectionStatus, setConnectionStatus] = useState('none'); // none, pending, connected
  const [showReport, setShowReport] = useState(false);

  const handleConnectionRequest = () => {
    setConnectionStatus('pending');
    // In real app: send API request
    setTimeout(() => {
      // Simulate acceptance
      setConnectionStatus('connected');
    }, 2000);
  };

  const handleReport = () => {
    setShowReport(true);
    // In real app: open report modal
    alert('Report feature coming soon. This will allow you to flag inappropriate content.');
  };

  return (
    <div className="glass rounded-2xl p-6 card-hover animate-fadeIn relative">
      {/* Report Button */}
      <button
        onClick={handleReport}
        className="absolute top-4 right-4 p-2 hover:bg-red-100 rounded-lg smooth-transition"
        title="Report inappropriate content"
      >
        <Flag className="w-4 h-4 text-gray-400 hover:text-red-600" />
      </button>

      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={peer.avatar}
            alt={peer.name}
            className="w-16 h-16 rounded-full border-3 border-purple-200"
          />
          {peer.isOnline && (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{peer.name}</h3>
              <p className="text-sm text-gray-500">{peer.age} years old</p>
            </div>
            {peer.isOnline && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Online
              </span>
            )}
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{peer.bio}</p>

          {/* Struggles */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">Dealing with:</p>
            <div className="flex flex-wrap gap-2">
              {peer.struggles.map((struggle, index) => (
                <span
                  key={index}
                  className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                >
                  {struggle}
                </span>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">Interests:</p>
            <div className="flex flex-wrap gap-2">
              {peer.interests.map((interest, index) => (
                <span
                  key={index}
                  className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            {connectionStatus === 'none' && (
              <button
                onClick={handleConnectionRequest}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 smooth-transition"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Send Connection Request</span>
              </button>
            )}
            {connectionStatus === 'pending' && (
              <button
                disabled
                className="flex-1 flex items-center justify-center space-x-2 bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed"
              >
                <span className="text-sm font-medium">Request Pending...</span>
              </button>
            )}
            {connectionStatus === 'connected' && (
              <Link
                to={`/chat/${peer.id}`}
                className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 smooth-transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Message</span>
              </Link>
            )}
            <button className="p-2 border-2 border-purple-200 rounded-lg hover:bg-purple-50 smooth-transition">
              <Heart className="w-5 h-5 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeerCard;