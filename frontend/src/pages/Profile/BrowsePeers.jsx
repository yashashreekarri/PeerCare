import { useState } from 'react';
import PeerCard from '../../components/profile/PeerCard';
import { mockUsers } from '../../utils/mockData';
import { Search, Filter } from 'lucide-react';

const BrowsePeers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOnline, setFilterOnline] = useState(false);

  const filteredPeers = mockUsers.filter(peer => {
    const matchesSearch = peer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         peer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         peer.struggles.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesOnline = !filterOnline || peer.isOnline;
    return matchesSearch && matchesOnline;
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Find Your Peers
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with people who understand your journey
          </p>
        </div>

        {/* Search and Filter */}
        <div className="glass rounded-2xl p-6 mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
                placeholder="Search by name, struggles, or interests..."
              />
            </div>

            {/* Filter */}
            <button
              onClick={() => setFilterOnline(!filterOnline)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium smooth-transition ${
                filterOnline
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Online Only</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-purple-600">{filteredPeers.length}</span> peer{filteredPeers.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Peers Grid */}
        {filteredPeers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPeers.map((peer, index) => (
              <div
                key={peer.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PeerCard peer={peer} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No peers found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePeers;