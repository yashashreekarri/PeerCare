import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Send, Smile, MoreVertical } from 'lucide-react';

const ChatWindow = ({ peer, messages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        userId: peer.id,
        senderId: 'current',
        content: newMessage,
        timestamp: new Date().toISOString(),
        isCurrentUser: true
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="glass rounded-2xl flex flex-col h-[calc(100vh-12rem)]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={peer.avatar}
              alt={peer.name}
              className="w-12 h-12 rounded-full border-2 border-purple-200"
            />
            {peer.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{peer.name}</h3>
            <p className="text-sm text-gray-500">
              {peer.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-purple-50 rounded-lg smooth-transition">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {chatMessages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isCurrentUser={message.isCurrentUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 hover:bg-purple-50 rounded-lg smooth-transition"
          >
            <Smile className="w-6 h-6 text-gray-400" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;