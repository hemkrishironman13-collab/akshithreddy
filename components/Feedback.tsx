
import React, { useState } from 'react';
import { Send, Star, MessageSquareQuote, CheckCircle2, Loader2, AlertCircle, User, Lightbulb } from 'lucide-react';

const categories = ['Bug Report', 'Feature Suggestion', 'General Feedback', 'Security Concern'];

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [memberName, setMemberName] = useState('');
  const [category, setCategory] = useState(categories[2]);
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !suggestion.trim() || !memberName.trim()) return;

    setIsSubmitting(true);
    // Simulate API call to Nexus Central
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto glass-panel border-green-500/20 p-12 rounded-[3rem] text-center space-y-6 shadow-2xl animate-reveal">
        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-4 border border-green-500/30">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Transmission Successful</h2>
          <p className="text-gray-400 mt-2 font-medium">
            Thank you, <span className="text-white font-black italic">{memberName}</span>. 
            Your suggestion has been logged into the Nexus development roadmap.
          </p>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setRating(0);
            setMemberName('');
            setSuggestion('');
          }}
          className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase italic tracking-widest transition-all border border-white/10"
        >
          Initiate New Transmission
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
        <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">Transmission Hub</h2>
        <p className="text-gray-400">Your direct uplink to the development and security architects.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-[3rem] shadow-2xl space-y-10 border-white/10">
        {/* Rating Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Quality of Experience</label>
          <div className="flex gap-3 justify-center py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all duration-300 transform hover:scale-125 focus:outline-none"
              >
                <Star
                  size={44}
                  className={`${
                    (hoveredRating || rating) >= star
                      ? 'fill-indigo-500 text-indigo-500 drop-shadow-[0_0_12px_rgba(99,102,241,0.6)]'
                      : 'text-gray-800'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Member Identity Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Member Identity</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <User className="text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
            </div>
            <input
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="Enter your callsign or name..."
              className="w-full bg-black/40 border border-white/5 text-white pl-14 pr-6 py-5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all font-bold placeholder:text-gray-800"
            />
          </div>
        </div>

        {/* Category Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Neural Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-4 rounded-2xl text-[11px] font-black uppercase tracking-wider border transition-all ${
                  category === cat
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-xl shadow-indigo-600/20'
                    : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Suggestion Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Strategic Suggestion</label>
          <div className="relative group">
             <div className="absolute top-5 left-5 pointer-events-none">
              <Lightbulb className="text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={20} />
            </div>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Provide your technical insights or enhancement requests..."
              className="w-full h-44 bg-black/40 border border-white/5 text-white pl-14 pr-6 py-5 rounded-[2rem] focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all resize-none placeholder:text-gray-800 font-medium text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Error Handling */}
        {(rating === 0 || !memberName.trim() || !suggestion.trim()) && (
          <div className="flex items-center gap-2 text-red-400/80 text-[10px] font-black uppercase tracking-widest px-1 animate-pulse">
            <AlertCircle size={14} />
            <span>Complete all parameters for transmission</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || rating === 0 || !suggestion.trim() || !memberName.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-black py-5 rounded-[1.5rem] transition-all flex items-center justify-center gap-4 shadow-2xl hover:shadow-indigo-600/30 active:scale-95 uppercase italic tracking-[0.2em]"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>
              Transmit Data <Send size={20} />
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-[9px] text-gray-600 font-black tracking-[0.5em] uppercase">
          Nexus Command Node • Non-Persistent Memory
        </p>
      </div>
    </div>
  );
};

export default Feedback;
