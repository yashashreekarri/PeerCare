import { Quote } from 'lucide-react';
import { getDailyQuote } from '../../assets/data/quotes';

const QuoteCard = () => {
  const quote = getDailyQuote();

  return (
    <div className="glass rounded-2xl p-6 card-hover animate-fadeIn">
      <div className="flex items-start space-x-4">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl flex-shrink-0">
          <Quote className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Daily Inspiration
          </h3>
          <p className="text-gray-700 italic leading-relaxed mb-3">
            "{quote.text}"
          </p>
          <p className="text-sm text-purple-600 font-medium">
            — {quote.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;