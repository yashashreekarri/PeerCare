// frontend/src/pages/Chat/ChatPage.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { messageService } from '../../services';
import { Send, ArrowLeft, Loader, AlertCircle, MessageCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ChatPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch messages when userId changes
  useEffect(() => {
    if (userId) {
      fetchMessages(userId);
    }
  }, [userId]);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await messageService.getConversations();
      
      if (response.success) {
        setConversations(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
      setError('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (otherUserId) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await messageService.getConversation(otherUserId);
      
      if (response.success) {
        setMessages(response.data || []);
        setSelectedConversation(otherUserId);
        
        // Mark messages as read
        await messageService.markAsRead(otherUserId);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      setSending(true);
      
      const response = await messageService.sendMessage(
        selectedConversation,
        newMessage.trim()
      );

      if (response.success) {
        // Add new message to the list
        setMessages([...messages, response.data]);
        setNewMessage('');
        
        // Refresh conversations to update last message
        fetchConversations();
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const handleSelectConversation = (otherUserId) => {
    navigate(`/chat/${otherUserId}`);
  };

  const getOtherUser = (conversation) => {
    if (!conversation) return null;
    return conversation.otherUser || null;
  };

  const isMyMessage = (message) => {
    const currentUserId = user?.id || user?._id;
    const senderId = message.sender?._id || message.sender;
    return senderId === currentUserId;
  };

  const getOtherUserFromMessages = () => {
    if (messages.length === 0) return null;
    
    const firstMessage = messages[0];
    const currentUserId = user?.id || user?._id;
    const senderId = firstMessage.sender?._id || firstMessage.sender;
    
    if (senderId === currentUserId) {
      return firstMessage.recipient;
    } else {
      return firstMessage.sender;
    }
  };

  const otherUserInChat = getOtherUserFromMessages();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
            Messages
          </h1>
          <p className="text-gray-600 text-lg">
            Stay connected with your peers
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden animate-fadeIn" style={{ height: '600px' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-full sm:w-1/3 border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-800">Conversations</h2>
              </div>

              {loading && conversations.length === 0 ? (
                <div className="flex items-center justify-center h-32">
                  <Loader className="w-8 h-8 animate-spin text-purple-600" />
                </div>
              ) : conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-center p-4">
                  <MessageCircle className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">No conversations yet</p>
                  <p className="text-gray-400 text-xs">Connect with peers to start chatting</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {conversations.map((conversation) => {
                    const otherUser = conversation.otherUser;
                    if (!otherUser) return null;

                    return (
                      <div
                        key={otherUser._id}
                        onClick={() => handleSelectConversation(otherUser._id)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 transition ${
                          selectedConversation === otherUser._id ? 'bg-purple-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <img
                              src={otherUser.avatar}
                              alt={otherUser.name}
                              className="w-12 h-12 rounded-full border-2 border-purple-200"
                            />
                            {otherUser.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-800 truncate">
                                {otherUser.name}
                              </h3>
                              {conversation.unreadCount > 0 && (
                                <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage?.content || 'No messages yet'}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {conversation.lastMessage?.createdAt &&
                                formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                                  addSuffix: true,
                                })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              {!selectedConversation ? (
                <div className="flex-1 flex items-center justify-center text-center p-8">
                  <div>
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-gray-500">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Messages Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center">
                    <button
                      onClick={() => navigate('/chat')}
                      className="sm:hidden mr-3 text-gray-600 hover:text-gray-800"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    {otherUserInChat && (
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={otherUserInChat.avatar}
                            alt={otherUserInChat.name}
                            className="w-10 h-10 rounded-full border-2 border-purple-200"
                          />
                          {otherUserInChat.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {otherUserInChat.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {otherUserInChat.isOnline ? 'Online' : 'Offline'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    {loading ? (
                      <div className="flex items-center justify-center h-32">
                        <Loader className="w-8 h-8 animate-spin text-purple-600" />
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map((message, index) => {
                        const isMine = isMyMessage(message);
                        const showAvatar = index === 0 || 
                          isMyMessage(messages[index - 1]) !== isMine;
                        
                        return (
                          <div
                            key={message._id}
                            className={`flex items-end space-x-2 ${isMine ? 'flex-row-reverse space-x-reverse' : ''}`}
                          >
                            {/* Avatar */}
                            {showAvatar ? (
                              <img
                                src={isMine ? user?.avatar : message.sender?.avatar}
                                alt={isMine ? user?.name : message.sender?.name}
                                className="w-8 h-8 rounded-full border-2 border-purple-200 flex-shrink-0"
                              />
                            ) : (
                              <div className="w-8 flex-shrink-0"></div>
                            )}

                            {/* Message Bubble */}
                            <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
                              <div
                                className={`px-4 py-2 rounded-2xl ${
                                  isMine
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-none'
                                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                }`}
                              >
                                <p className="break-words">{message.content}</p>
                              </div>
                              <p
                                className={`text-xs mt-1 px-2 ${
                                  isMine ? 'text-gray-500' : 'text-gray-400'
                                }`}
                              >
                                {formatDistanceToNow(new Date(message.createdAt), {
                                  addSuffix: true,
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                        disabled={sending}
                      />
                      <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {sending ? (
                          <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;