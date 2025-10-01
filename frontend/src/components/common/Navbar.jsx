import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              className={navLinkClass('/chat')}
            >
              Messages
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
              className={isActive('/emergency') ? "text-red-700 font-bold smooth-transition border-b-2 border-red-600 pb-1" : "text-red-600 hover:text-red-700 smooth-transition font-medium"}
            >
              Emergency
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 smooth-transition"
            >
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'}
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-purple-300"
              />
              <span className="font-medium">{user?.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 smooth-transition"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-purple-100 smooth-transition"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slideIn">
            <div className="flex flex-col space-y-4">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-purple-600 smooth-transition font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/peers"
                className="text-gray-700 hover:text-purple-600 smooth-transition font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
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
                className="text-gray-700 hover:text-purple-600 smooth-transition font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                to="/journal"
                className="text-gray-700 hover:text-purple-600 smooth-transition font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Journal
              </Link>
              <Link
                to="/emergency"
                className="text-red-600 hover:text-red-700 smooth-transition font-medium px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Emergency
              </Link>
              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 smooth-transition px-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">My Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-red-600 smooth-transition px-2 text-left"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;