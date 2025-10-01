import { format } from 'date-fns';

const MessageBubble = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
      <div className={`max-w-[70%] ${isCurrentUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isCurrentUser
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none'
              : 'bg-white text-gray-800 rounded-bl-none shadow-md'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <p className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
          {format(new Date(message.timestamp), 'hh:mm a')}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;