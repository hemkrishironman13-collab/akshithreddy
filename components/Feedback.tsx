import React, { useState } from 'react';
import { Send, Star, MessageSquareQuote, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const categories = ['Bug Report', 'Feature Suggestion', 'General Feedback', 'Security Concern'];

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState(categories[2]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto bg-gray-900 border border-indigo-500/20 p-12 rounded-[2.5rem] text-center space-y-6 shadow-2xl animate-scaleIn">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-white">Feedback Received!</h2>
        <p className="text-gray-400">
          Thank you for helping us make Nexus Shield even stronger. Your insights are invaluable to our security team.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setRating(0);
            setComment('');
          }}
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl font-bold transition-all"
        >
          Send More Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
          <MessageSquareQuote size={32} />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">Transmission Hub</h2>
        <p className="text-gray-400">Your direct uplink to the development and security architects.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block px-1">How would you rate your experience?</label>
          <div className="flex gap-2 justify-center py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-200 transform hover:scale-125 focus:outline-none"
              >
                <Star
                  size={40}
                  className={`${
                    (hoveredRating || rating) >= star
                      ? 'fill-yellow-500 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]'
                      : 'text-gray-700'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block px-1">Feedback Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-3 rounded-2xl text-sm font-bold border transition-all ${
                  category === cat
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block px-1">Detailed Report</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What's on your mind? Describe your experience, suggest a feature, or report an issue..."
            className="w-full h-40 bg-gray-950 border border-gray-800 text-white p-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none placeholder:text-gray-700 font-medium"
          />
        </div>

        {rating === 0 && (
          <div className="flex items-center gap-2 text-red-400 text-xs px-1">
            <AlertCircle size={14} />
            <span>Please select a rating to transmit your feedback.</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || rating === 0 || !comment.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-indigo-600/20 active:scale-95"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              <Send size={20} /> Transmit Feedback
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">
          Transmission encrypted with AES-256
        </p>
      </div>
    </div>
  );
};

export default Feedback;
