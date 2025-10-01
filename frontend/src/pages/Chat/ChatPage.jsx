import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatList from '../../components/chat/ChatList';
import ChatWindow from '../../components/chat/ChatWindow';
import { mockUsers, mockMessages } from '../../utils/mockData';
import { MessageCircle } from 'lucide-react';

const ChatPage = () => {
  const { userId } = useParams();
  
  // Mock chat list data
  const mockChats = mockUsers
    .filter(u => u.isOnline)
    .slice(0, 3)
    .map(user => ({
      ...user,
      lastMessage: {
        content: "Hey! How are you doing today?",
        timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString()
      },
      unreadCount: Math.floor(Math.random() * 3)
    }));

  const initialChat = userId 
    ? mockUsers.find(u => u.id === parseInt(userId))
    : mockChats[0];

  const [activeChat, setActiveChat] = useState(initialChat);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Messages
          </h1>
          <p className="text-gray-600 text-lg">
            Connect and chat with your peers
          </p>
        </div>

        {/* Chat Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat List - Hidden on mobile when chat is selected */}
          <div className={`lg:col-span-1 ${activeChat && 'hidden lg:block'}`}>
            <ChatList
              chats={mockChats}
              activeChat={activeChat}
              onSelectChat={setActiveChat}
            />
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            {activeChat ? (
              <ChatWindow
                peer={activeChat}
                messages={mockMessages}
              />
            ) : (
              <div className="glass rounded-2xl h-[calc(100vh-12rem)] flex flex-col items-center justify-center p-8 text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Chat Selected
                </h3>
                <p className="text-gray-600">
                  Select a chat from the list to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;