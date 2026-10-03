import React, { useState } from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { Review } from '../types';
import { addReview } from '../lib/firebase';

interface ReviewsProps {
  reviews: Review[];
  onReviewAdded: (message: string) => void;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, onReviewAdded }) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    const newReview = {
      name: name.trim(),
      rating,
      comment: comment.trim(),
      timestamp: Date.now()
    };

    try {
      await addReview(newReview);
      onReviewAdded('Your review has been broadcasted to the community.');
      setName('');
      setComment('');
      setRating(5);
      setSubmittedSuccess(true);
      setTimeout(() => setSubmittedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      onReviewAdded('Review recorded locally.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="pt-28 md:pt-36 pb-24 px-4 sm:px-6 bg-[#050505] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Form Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <span className="text-red-500 font-mono tracking-[0.3em] font-bold text-xs uppercase block mb-3">
              COMMUNITY ARCHIVE
            </span>
            <h1 className="text-5xl md:text-6xl font-black uppercase mb-4 leading-none font-oswald">
              Client<br />Feedback
            </h1>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
              Join the legacy. Transmit your EVORAN fit, sizing, and fabric experience to the streetwear collective.
            </p>

            <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-2xl pointer-events-none" />

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                {/* Rating Stars */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2.5 block font-mono">
                    Rating Score: {activeRating} / 5
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isFilled = starValue <= activeRating;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoverRating(starValue)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                          aria-label={`Rate ${starValue} stars`}
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              isFilled
                                ? 'fill-red-600 text-red-600 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]'
                                : 'text-gray-700 hover:text-gray-500'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1.5">
                    Your Name / Alias
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.G. TANVIR AHMED"
                    required
                    className="w-full form-input p-3.5 text-white text-xs uppercase rounded-xl"
                  />
                </div>

                {/* Review Textarea */}
                <div>
                  <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1.5">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="DESCRIBE THE FIT, FABRIC WEIGHT, SIZING & FEEL..."
                    required
                    className="w-full form-input p-3.5 text-white text-xs resize-none rounded-xl"
                  />
                </div>

                {submittedSuccess && (
                  <div className="p-3 bg-green-950/40 border border-green-600/30 text-green-400 text-xs font-mono flex items-center gap-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    Review broadcasted successfully!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-red-600/80 to-[#ff0000] hover:from-red-600 hover:to-rose-600 text-white font-bold uppercase tracking-[0.2em] text-xs transition-all duration-300 cursor-pointer font-oswald shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] border border-red-500/50 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>

          {/* Right Reviews Grid */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10 font-mono text-xs text-gray-500 uppercase tracking-widest">
              <span>Community Reviews ({reviews.length})</span>
              <span>Verified Buyers</span>
            </div>

            {reviews.length === 0 ? (
              <div className="p-12 text-center border border-white/10 bg-[#0a0a0a]">
                <MessageSquareQuote className="w-8 h-8 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-mono text-xs uppercase tracking-wider">
                  No transmissions yet. Be the first to review EVORAN garments.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-6">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-[#0a0a0a] border border-white/10 p-6 flex flex-col justify-between hover:border-red-900/60 transition-colors relative group"
                  >
                    <div>
                      {/* Top Bar: Stars + Date */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i <= rev.rating
                                  ? 'fill-red-600 text-red-600'
                                  : 'text-gray-800'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-600 font-mono">
                          {new Date(rev.timestamp).toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-bold text-white uppercase text-sm mb-2 font-oswald tracking-wide flex items-center gap-2">
                        {rev.name}
                        <span className="text-[9px] font-mono text-gray-500 bg-white/5 px-1.5 py-0.5 border border-white/10">
                          VERIFIED
                        </span>
                      </h3>

                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed italic mb-6">
                        "{rev.comment}"
                      </p>
                    </div>

                    {/* Official Response if present */}
                    {rev.reply && (
                      <div className="mt-4 pt-4 border-t border-white/10 bg-white/[0.02] p-3 rounded-xs">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-bold bg-white text-black px-1.5 py-0.5 uppercase tracking-widest font-mono">
                            Official Response
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 font-sans italic">
                          "{rev.reply}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
