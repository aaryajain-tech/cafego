import React, { useState } from 'react';
import { X, Star, Sparkles, Check, Coffee, MessageSquarePlus, UtensilsCrossed } from 'lucide-react';
import { Cafe, FriendReview, UserProfile } from '../types';

interface ReviewModalProps {
  cafe: Cafe | null;
  user: UserProfile;
  onClose: () => void;
  onSubmitReview: (cafeId: string, review: FriendReview, fusionTried: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  cafe,
  user,
  onClose,
  onSubmitReview,
}) => {
  if (!cafe) return null;

  const [foodScore, setFoodScore] = useState(5);
  const [drinksScore, setDrinksScore] = useState(5);
  const [ambienceScore, setAmbienceScore] = useState(5);
  const [verdict, setVerdict] = useState<'Must Visit' | 'Skip the Hype' | 'Hidden Gem' | 'Good for Work'>('Must Visit');
  const [reviewText, setReviewText] = useState('');
  const [whatToOrder, setWhatToOrder] = useState('');
  const [whatToAvoid, setWhatToAvoid] = useState('');
  const [fusionTried, setFusionTried] = useState(cafe.fusionItems[0]?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newReview: FriendReview = {
      id: `fr-${Date.now()}`,
      friendName: user.name || 'Friend',
      avatarColor: user.avatarColor || '#E07A5F',
      avatarEmoji: '✨',
      verdict,
      reviewText: reviewText.trim(),
      whatToOrder: whatToOrder.trim() || 'House specialty brew',
      whatToAvoid: whatToAvoid.trim() || undefined,
      visitedDate: 'Just now',
      friendTrustBadge: 'Verified Squad Member · Fresh Visit',
    };

    onSubmitReview(cafe.id, newReview, fusionTried);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div 
        className="clay-card-warm max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border-2 border-white shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase">
            <MessageSquarePlus className="w-4 h-4" />
            <span>Honest Squad Review</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#2C221B] font-['Outfit']">
            Review {cafe.name}
          </h2>
          <p className="text-xs text-[#7A6453]">
            No corporate stars—just real advice for your friends.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Verdict selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453] mb-2">
              Squad Verdict
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['Must Visit', 'Hidden Gem', 'Good for Work', 'Skip the Hype'] as const).map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => setVerdict(v)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    verdict === v
                      ? 'bg-[#E07A5F] text-white shadow-xs'
                      : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Criteria Star Selectors */}
          <div className="grid sm:grid-cols-3 gap-3 p-3 bg-white rounded-2xl border border-[#EDE4D8]">
            <div className="space-y-1 text-center">
              <span className="text-[11px] font-bold text-[#8A7565]">Food ({foodScore}/5)</span>
              <div className="flex justify-center gap-1 text-amber-500 cursor-pointer">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    onClick={() => setFoodScore(s)}
                    className="text-base select-none hover:scale-125 transition-transform"
                  >
                    {s <= foodScore ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-center border-x border-[#EDE4D8]">
              <span className="text-[11px] font-bold text-[#8A7565]">Drinks ({drinksScore}/5)</span>
              <div className="flex justify-center gap-1 text-amber-500 cursor-pointer">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    onClick={() => setDrinksScore(s)}
                    className="text-base select-none hover:scale-125 transition-transform"
                  >
                    {s <= drinksScore ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-center">
              <span className="text-[11px] font-bold text-[#8A7565]">Ambience ({ambienceScore}/5)</span>
              <div className="flex justify-center gap-1 text-amber-500 cursor-pointer">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    onClick={() => setAmbienceScore(s)}
                    className="text-base select-none hover:scale-125 transition-transform"
                  >
                    {s <= ambienceScore ? '★' : '☆'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Candid Review Text */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453] mb-1.5">
              Candid Friend Advice (What strangers won't tell you)
            </label>
            <textarea
              required
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="e.g. Best seating is on the 2nd floor balcony. Wi-Fi is super fast. Skip the sugary syrup and ask for extra foam..."
              className="clay-inset w-full px-4 py-3 rounded-2xl text-xs md:text-sm font-semibold text-[#2C221B] placeholder:text-[#A8988B] focus:outline-none"
            />
          </div>

          {/* What to order & What to avoid */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4A723D] mb-1">
                ✓ What to Order
              </label>
              <input
                type="text"
                value={whatToOrder}
                onChange={(e) => setWhatToOrder(e.target.value)}
                placeholder="e.g. Cardamom Bun, Cortado"
                className="clay-inset w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#2C221B] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#9E5D4B] mb-1">
                ✗ What to Avoid
              </label>
              <input
                type="text"
                value={whatToAvoid}
                onChange={(e) => setWhatToAvoid(e.target.value)}
                placeholder="e.g. The bottled iced tea"
                className="clay-inset w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#2C221B] focus:outline-none"
              />
            </div>
          </div>

          {/* Fusion Item tried */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453] mb-1">
              Fusion or Signature Item Tried
            </label>
            <input
              type="text"
              value={fusionTried}
              onChange={(e) => setFusionTried(e.target.value)}
              placeholder="e.g. Kimchi Croissant, Chai Tiramisu..."
              className="clay-inset w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#2C221B] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="clay-btn-primary w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Publish to Squad (+15 ☕ Tokens)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
