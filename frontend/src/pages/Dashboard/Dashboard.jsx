// frontend/src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import QuoteCard from '../../components/common/QuoteCard';
import { dashboardService } from '../../services';
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  TrendingUp, 
  AlertCircle, 
  Plus,
  Loader,
  PhoneCall
} from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({
    connectedPeers: 0,
    activeChats: 0,
    journalEntries: 0,
    daysActive: 0
  });
  const [onlinePeers, setOnlinePeers] = useState([]);
  const [recentJournals, setRecentJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch all dashboard data
      const [statsRes, peersRes, journalsRes] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getOnlinePeers(),
        dashboardService.getRecentJournals()
      ]);

      if (statsRes.success) {
        setStats(statsRes.data);
      }

      if (peersRes.success) {
        setOnlinePeers(peersRes.data);
      }

      if (journalsRes.success) {
        setRecentJournals(journalsRes.data);
      }
    } catch (err) {
      console.error('Dashboard error:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      icon: Users,
      label: 'Connected Peers',
      value: stats.connectedPeers,
      color: 'from-blue-500 to-cyan-500',
      link: '/connections'
    },
    {
      icon: MessageCircle,
      label: 'Active Chats',
      value: stats.activeChats,
      color: 'from-purple-500 to-pink-500',
      link: '/chat'
    },
    {
      icon: BookOpen,
      label: 'Journal Entries',
      value: stats.journalEntries,
      color: 'from-green-500 to-emerald-500',
      link: '/journal'
    },
    {
      icon: TrendingUp,
      label: 'Days Active',
      value: stats.daysActive,
      color: 'from-orange-500 to-yellow-500',
      link: '/profile'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-12 h-12 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Here's what's happening with your mental wellness journey today.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Daily Quote */}
        <div className="mb-8 animate-fadeIn">
          <QuoteCard />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fadeIn hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Peers Online */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Peers Online</h2>
              <Link to="/peers" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All →
              </Link>
            </div>

            {onlinePeers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No peers online right now</p>
              </div>
            ) : (
              <div className="space-y-4">
                {onlinePeers.map((peer) => (
                  <Link
                    key={peer._id}
                    to={`/chat/${peer._id}`}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition"
                  >
                    <div className="relative">
                      <img
                        src={peer.avatar}
                        alt={peer.name}
                        className="w-12 h-12 rounded-full border-2 border-purple-200"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">{peer.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{peer.bio || 'Available to chat'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Recent Journal Entries */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Journal Entries</h2>
              <Link to="/journal" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All →
              </Link>
            </div>

            {recentJournals.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 mb-4">No journal entries yet</p>
                <Link
                  to="/journal/new"
                  className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create your first entry</span>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentJournals.map((entry) => (
                  <Link
                    key={entry._id}
                    to="/journal"
                    className="block p-4 hover:bg-gray-50 rounded-lg transition border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                      <span className="text-xs text-gray-500">
                        {format(new Date(entry.createdAt), 'MMM dd')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {entry.content}
                    </p>
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}

                <button
                  onClick={() => navigate('/journal/new')}
                  className="w-full py-3 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition flex items-center justify-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-medium">Add New Entry</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/peers"
              className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 flex items-center space-x-4 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Find New Peers</span>
            </Link>

            <Link
              to="/journal/new"
              className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 flex items-center space-x-4 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Write in Journal</span>
            </Link>

            <Link
              to="/emergency"
              className="glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 flex items-center space-x-4 hover:scale-105"
            >
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-3 rounded-lg">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Emergency Help</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;