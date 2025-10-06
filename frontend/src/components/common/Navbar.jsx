// frontend/src/components/common/Navbar.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { messageService } from '../../services';
import { Heart, LogOut, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count on mount and every 30 seconds
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await messageService.getUnreadCount();
      if (response.success) {
        setUnreadCount(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navLinkClass = (path) => {
    return isActive(path)
      ? "text-purple-600 font-bold smooth-transition border-b-2 border-purple-600 pb-1"
      : "text-gray-700 hover:text-purple-600 smooth-transition font-medium";
  };

  return (
    <nav className="glass sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg group-hover:scale-110 smooth-transition">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              PeerCare IIT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/dashboard"
              className={navLinkClass('/dashboard')}
            >
              Dashboard
            </Link>
            <Link
              to="/peers"
              className={navLinkClass('/peers')}
            >
              Find Peers
            </Link>
            <Link
              to="/connections"
              className={navLinkClass('/connections')}
            >
              Connections
            </Link>
            <Link
              to="/chat"
              className={`${navLinkClass('/chat')} relative`}
            >
              Messages
              <span className={`absolute -top-2 -right-4 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${unreadCount > 0 ? 'bg-red-500' : 'bg-gray-400'
                }`}>
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            </Link>
            <Link
              to="/journal"
              className={navLinkClass('/journal')}
            >
              Journal
            </Link>
            <Link
              to="/guidelines"
              className={navLinkClass('/guidelines')}
            >
              Guidelines
            </Link>
            <Link
              to="/emergency"
              className={isActive('/emergency') ?
                "text-red-600 font-bold smooth-transition border-b-2 border-red-600 pb-1" :
                "text-red-600 hover:text-red-700 smooth-transition font-medium"
              }
            >
              Emergency
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 hover:bg-gray-100 px-3 py-2 rounded-lg smooth-transition"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full border-2 border-purple-200"
              />
              <span className="text-gray-700 font-medium">{user?.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 smooth-transition"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-purple-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 ${navLinkClass('/dashboard')}`}
            >
              Dashboard
            </Link>
            <Link
              to="/peers"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 ${navLinkClass('/peers')}`}
            >
              Find Peers
            </Link>
            <Link
              to="/connections"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 ${navLinkClass('/connections')}`}
            >
              Connections
            </Link>
            <Link
              to="/chat"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 ${navLinkClass('/chat')} relative`}
            >
              Messages
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link
              to="/journal"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 ${navLinkClass('/journal')}`}
            >
              Journal
            </Link>
            <Link
              to="/guidelines"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 ${navLinkClass('/guidelines')}`}
            >
              Guidelines
            </Link>
            <Link
              to="/emergency"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Emergency
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 flex items-center space-x-2 border-t pt-4"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-8 h-8 rounded-full border-2 border-purple-200"
              />
              <span className="text-gray-700 font-medium">{user?.name}</span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-gray-600 hover:text-red-600 flex items-center space-x-2"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;