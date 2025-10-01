import { Search } from 'lucide-react';
import { format } from 'date-fns';

const ChatList = ({ chats, activeChat, onSelectChat }) => {
  return (
    <div className="glass rounded-2xl p-4 h-[calc(100vh-12rem)] flex flex-col">
      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Search chats..."
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-3 rounded-xl text-left smooth-transition ${
              activeChat?.id === chat.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'hover:bg-purple-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-200"
                />
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`font-semibold truncate ${
                    activeChat?.id === chat.id ? 'text-white' : 'text-gray-800'
                  }`}>
                    {chat.name}
                  </p>
                  <span className={`text-xs ${
                    activeChat?.id === chat.id ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {format(new Date(chat.lastMessage.timestamp), 'HH:mm')}
                  </span>
                </div>
                <p className={`text-sm truncate ${
                  activeChat?.id === chat.id ? 'text-purple-100' : 'text-gray-600'
                }`}>
                  {chat.lastMessage.content}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <div className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;