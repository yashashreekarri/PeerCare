import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import QuoteCard from '../../components/common/QuoteCard';
import { Users, MessageCircle, BookOpen, AlertCircle, TrendingUp, Calendar } from 'lucide-react';
import { mockUsers, mockJournalEntries } from '../../utils/mockData';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Users,
      label: 'Connected Peers',
      value: '12',
      color: 'from-blue-500 to-cyan-500',
      link: '/peers'
    },
    {
      icon: MessageCircle,
      label: 'Active Chats',
      value: '3',
      color: 'from-purple-500 to-pink-500',
      link: '/chat'
    },
    {
      icon: BookOpen,
      label: 'Journal Entries',
      value: mockJournalEntries.length.toString(),
      color: 'from-green-500 to-emerald-500',
      link: '/journal'
    },
    {
      icon: TrendingUp,
      label: 'Days Active',
      value: '28',
      color: 'from-orange-500 to-yellow-500',
      link: '/profile'
    }
  ];

  const onlinePeers = mockUsers.filter(u => u.isOnline).slice(0, 4);
  const recentEntries = mockJournalEntries.slice(0, 2);

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

        {/* Daily Quote */}
        <div className="mb-8">
          <QuoteCard />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="glass rounded-2xl p-6 card-hover animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl w-fit mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </Link>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Online Peers */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Peers Online</h2>
              <Link to="/peers" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {onlinePeers.map(peer => (
                <Link
                  key={peer.id}
                  to={`/chat/${peer.id}`}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-purple-50 smooth-transition"
                >
                  <div className="relative">
                    <img
                      src={peer.avatar}
                      alt={peer.name}
                      className="w-12 h-12 rounded-full border-2 border-purple-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{peer.name}</p>
                    <p className="text-sm text-gray-600 truncate">{peer.bio.substring(0, 40)}...</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Journal Entries */}
          <div className="glass rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Journal Entries</h2>
              <Link to="/journal" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentEntries.map(entry => (
                <div
                  key={entry.id}
                  className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {format(new Date(entry.date), 'MMM dd')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
                  <div className="flex items-center mt-3 space-x-2">
                    {entry.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs bg-white px-2 py-1 rounded-full text-purple-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                to="/journal/new"
                className="block w-full p-4 border-2 border-dashed border-purple-300 rounded-xl text-center text-purple-600 hover:bg-purple-50 smooth-transition"
              >
                + Add New Entry
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 glass rounded-2xl p-6 animate-fadeIn">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/peers"
              className="flex items-center space-x-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-md smooth-transition"
            >
              <Users className="w-6 h-6 text-blue-600" />
              <span className="font-medium text-gray-800">Find New Peers</span>
            </Link>
            <Link
              to="/journal/new"
              className="flex items-center space-x-3 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:shadow-md smooth-transition"
            >
              <BookOpen className="w-6 h-6 text-green-600" />
              <span className="font-medium text-gray-800">Write in Journal</span>
            </Link>
            <Link
              to="/emergency"
              className="flex items-center space-x-3 p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl hover:shadow-md smooth-transition"
            >
              <AlertCircle className="w-6 h-6 text-red-600" />
              <span className="font-medium text-gray-800">Emergency Help</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;