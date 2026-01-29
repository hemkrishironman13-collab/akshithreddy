import React, { useState, useEffect } from 'react';
import { Send, Star, MessageSquareQuote, CheckCircle2, Loader2, AlertCircle, User } from 'lucide-react';

interface FeedbackProps {
  userEmail: string;
}

const categories = ['Bug Report', 'Feature Suggestion', 'General Feedback', 'Security Concern'];

const Feedback: React.FC<FeedbackProps> = ({ userEmail }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [category, setCategory] = useState(categories[2]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Automatically set name from email if not already set
    if (userEmail && !name) {
      const extractedName = userEmail.split('@')[0];
      setName(extractedName.charAt(0).toUpperCase() + extractedName.slice(1));
    }
  }, [userEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim() || !name.trim()) return;

    setIsSubmitting(true);
    // Simulate API transmission to Nexus Core
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto glass-panel border border-indigo-500/20 p-12 rounded-[3rem] text-center space-y-6 shadow-2xl animate-reveal">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-green-500/30">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Uplink Successful!</h2>
        <p className="text-gray-400 font-medium italic">
          Nexus Intelligence acknowledges your report, <span className="text-white font-bold">{name}</span>. Your data is being processed for core optimization.
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setRating(0);
            setComment('');
          }}
          className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl shadow-indigo-600/30 active:scale-95"
        >
          New Transmission
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-reveal">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20">
          <MessageSquareQuote size={32} />
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">Feedback Hub</h2>
        <p className="text-gray-500 text-sm font-medium">Direct uplink to the development and security architects.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8 animate-reveal animate-stagger-1">
        {/* Name Input */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Reporter Identity</label>
          <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="text-gray-600 group-focus-within:text-indigo-400 transition-colors" size={18} />
             </div>
             <input
               type="text"
               value={name}
               onChange={(e) => setName(e.target.value)}
               placeholder="Confirm your name..."
               className="w-full bg-black/40 border border-white/10 text-white pl-12 pr-5 py-4 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium text-sm placeholder:text-gray-800"
               required
             />
          </div>
        </div>

        {/* Rating Section */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Experience Evaluation</label>
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
                  size={42}
                  strokeWidth={1.5}
                  className={`${
                    (hoveredRating || rating) >= star
                      ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]'
                      : 'text-gray-800 hover:text-gray-600'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Category Grid */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Transmission Category</label>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  category === cat
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-black/40 border-white/5 text-gray-600 hover:border-white/20 hover:text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Comment */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block px-1">Detailed Log Entry</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Report your findings, suggestions, or technical concerns..."
            className="w-full h-40 bg-black/40 border border-white/10 text-white p-5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none placeholder:text-gray-800 font-medium text-sm leading-relaxed"
            required
          />
        </div>

        {(rating === 0 || !name.trim() || !comment.trim()) && (
          <div className="flex items-center gap-2 text-red-500/70 text-[9px] font-bold uppercase tracking-widest px-1">
            <AlertCircle size={14} />
            <span>Incomplete identity or data detected.</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || rating === 0 || !comment.trim() || !name.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800/50 disabled:text-gray-700 text-white font-black py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-indigo-600/30 active:scale-95 uppercase italic tracking-[0.2em]"
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
        <p className="text-[9px] text-gray-600 font-black tracking-[0.4em] uppercase">
          Transmission Protocol: AES-512 Secure Link
        </p>
      </div>
    </div>
  );
};

export default Feedback;
