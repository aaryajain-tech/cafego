import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  AlertTriangle, 
  Coffee, 
  MapPin, 
  MessageSquarePlus, 
  Check, 
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Tag,
  Camera,
  Box
} from 'lucide-react';
import { Cafe } from '../types';
import { ThreeDishInspector } from './ThreeDishInspector';

interface CafeDetailModalProps {
  cafe: Cafe | null;
  onClose: () => void;
  onOpenAddReview: (cafe: Cafe) => void;
  onLaunchARForDish?: (dishName: string) => void;
}

export const CafeDetailModal: React.FC<CafeDetailModalProps> = ({
  cafe,
  onClose,
  onOpenAddReview,
  onLaunchARForDish,
}) => {
  if (!cafe) return null;

  const [active3DIndex, setActive3DIndex] = useState<number | null>(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div 
        className="clay-card-warm max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border-2 border-white shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#2C221B] text-white font-extrabold text-xs flex items-center justify-center">
              #{cafe.rankingPosition}
            </span>
            <span className="text-xs font-bold text-[#8A7565] uppercase tracking-wider">
              {cafe.neighborhood} · {cafe.priceTier}
            </span>
            <span className="text-xs font-black text-[#4F7344] bg-[#EEF5EA] px-2.5 py-0.5 rounded-full">
              {cafe.friendMatchScore}% Friend Match
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C221B] font-['Outfit']">
            {cafe.name}
          </h2>

          <p className="text-sm font-semibold text-[#E07A5F]">
            “{cafe.oneLinerTag}”
          </p>
        </div>

        {/* STRANGER VS FRIEND TRUTH CHECK */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F6EFE5] border border-[#E8DDCE] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8A7565]">
            <ShieldCheck className="w-4 h-4 text-[#819B72]" />
            <span>The Reality Check: Stranger vs Squad</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white/70 rounded-xl border border-red-200 space-y-1">
              <span className="font-bold text-red-700 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Stranger Google Review ({cafe.strangerTruthComparison.strangerRating} ★)
              </span>
              <p className="italic text-[#6B5A4E]">
                {cafe.strangerTruthComparison.strangerQuote}
              </p>
            </div>

            <div className="p-3 bg-[#EEF5EA] rounded-xl border border-[#D5E8CE] space-y-1">
              <span className="font-bold text-[#3E6532] flex items-center gap-1">
                <Check className="w-3 h-3" /> Verified Squad Truth
              </span>
              <p className="text-[#3E6532] font-medium">
                {cafe.strangerTruthComparison.friendTruthSummary}
              </p>
            </div>
          </div>
        </div>

        {/* REVIEW CRITERIA DETAILED CARDS */}
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A6453]">
            Categorized Review Criteria
          </h3>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-white rounded-2xl border border-[#EDE4D8] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#8A7565]">Food</span>
                <span className="text-sm font-extrabold text-[#2C221B]">{cafe.criteria.foodScore} / 5</span>
              </div>
              <p className="text-[11px] text-[#6B5A4E] leading-normal">{cafe.criteria.foodComment}</p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-[#EDE4D8] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#8A7565]">Drinks</span>
                <span className="text-sm font-extrabold text-[#2C221B]">{cafe.criteria.drinksScore} / 5</span>
              </div>
              <p className="text-[11px] text-[#6B5A4E] leading-normal">{cafe.criteria.drinksComment}</p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-[#EDE4D8] space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#8A7565]">Ambience</span>
                <span className="text-sm font-extrabold text-[#2C221B]">{cafe.criteria.ambienceScore} / 5</span>
              </div>
              <p className="text-[11px] text-[#6B5A4E] leading-normal">{cafe.criteria.ambienceComment}</p>
            </div>
          </div>
        </div>

        {/* FUSION MENU ITEMS */}
        {cafe.fusionItems.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A6453]">
              <Flame className="w-4 h-4 text-[#E07A5F]" />
              <span>Unique & Fusion Menu Items</span>
            </div>

            <div className="space-y-3">
              {cafe.fusionItems.map((fi, idx) => (
                <div key={fi.id} className="p-4 bg-white rounded-2xl border border-[#EDE4D8] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#2C221B]">
                    <span className="text-sm font-extrabold">{fi.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#E07A5F]">{fi.price}</span>
                      <button
                        onClick={() => setActive3DIndex(active3DIndex === idx ? null : idx)}
                        className="px-2 py-1 rounded-lg bg-[#FAF0E6] text-[#E07A5F] hover:bg-[#F3E2D2] transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
                      >
                        <Box className="w-3 h-3" />
                        <span>{active3DIndex === idx ? 'Hide 3D' : 'Spin 3D'}</span>
                      </button>
                      {onLaunchARForDish && (
                        <button
                          onClick={() => onLaunchARForDish(fi.name)}
                          className="px-2 py-1 rounded-lg bg-[#EEF5EA] text-[#4F7344] hover:bg-[#E0EED8] transition-colors flex items-center gap-1 cursor-pointer text-[11px]"
                        >
                          <Camera className="w-3 h-3" />
                          <span>AR</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Interactive 3D Turntable */}
                  {active3DIndex === idx && (
                    <div className="p-2 bg-[#F9F4EB] rounded-2xl border border-[#E8DDCE] text-center my-2">
                      <div className="text-[10px] font-bold text-[#8A7565] uppercase mb-1">
                        3D Spatial Preview · Drag to Inspect 360°
                      </div>
                      <ThreeDishInspector
                        dishType={
                          fi.name.toLowerCase().includes('croissant')
                            ? 'croissant'
                            : fi.name.toLowerCase().includes('espresso') || fi.name.toLowerCase().includes('coffee')
                            ? 'coffee'
                            : fi.name.toLowerCase().includes('tiramisu')
                            ? 'tiramisu'
                            : 'dosa'
                        }
                        height={160}
                      />
                    </div>
                  )}

                  <p className="text-xs text-[#6B5546]">{fi.description}</p>
                  <p className="text-xs text-[#819B72] font-semibold italic">{fi.friendReaction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INDIVIDUAL FRIEND REVIEWS */}
        <div className="mt-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A6453]">
            Friend Reviews ({cafe.friendReviews.length})
          </h3>

          <div className="space-y-3">
            {cafe.friendReviews.map((rev) => (
              <div key={rev.id} className="clay-card p-4 space-y-2 border border-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      style={{ backgroundColor: rev.avatarColor }}
                      className="w-8 h-8 rounded-xl text-white font-bold flex items-center justify-center text-sm shadow-xs"
                    >
                      {rev.friendName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2C221B]">{rev.friendName}</div>
                      <div className="text-[10px] text-[#8A7565]">{rev.friendTrustBadge}</div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#819B72] bg-[#EEF5EA] px-2 py-0.5 rounded-lg">
                    {rev.verdict}
                  </span>
                </div>

                <p className="text-xs md:text-sm text-[#2C221B] font-medium leading-relaxed">
                  “{rev.reviewText}”
                </p>

                <div className="pt-2 border-t border-[#F2ECE3] flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                  <span className="text-[#3E6532] font-semibold">
                    ✓ Order: {rev.whatToOrder}
                  </span>
                  {rev.whatToAvoid && (
                    <span className="text-[#9E5D4B] font-semibold">
                      ✗ Avoid: {rev.whatToAvoid}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-7 pt-4 border-t border-[#E8DFD3] flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenAddReview(cafe);
            }}
            className="clay-btn-primary flex-1 py-3 rounded-2xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Add My Squad Review for {cafe.name}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
