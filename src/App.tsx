import React, { useState } from 'react';
import { ThreeCafeScene } from './components/ThreeCafeScene';
import { RecommendationSystem } from './components/RecommendationSystem';
import { ReferralAndSquadSection } from './components/ReferralAndSquadSection';
import { CafeDetailModal } from './components/CafeDetailModal';
import { ReviewModal } from './components/ReviewModal';
import { ProfileModal } from './components/ProfileModal';
import { ARViewerModal } from './components/ARViewerModal';
import { AboutModal } from './components/AboutModal';
import { INITIAL_CAFES, INITIAL_USER } from './data/mockData';
import { Cafe, FriendReview, UserProfile, CafePatron } from './types';
import {
  Coffee,
  Search,
  Users,
  Camera,
  User,
  X,
  Sparkles,
  ShieldCheck,
  Flame,
  ChevronUp,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export default function App() {
  const [cafes, setCafes] = useState<Cafe[]>(INITIAL_CAFES);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [reviewingCafe, setReviewingCafe] = useState<Cafe | null>(null);

  // Active Overlay Panels ('discovery' | 'squads' | 'profile' | 'ar' | null)
  const [activePanel, setActivePanel] = useState<'discovery' | 'squads' | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAROpen, setIsAROpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [arDishName, setArDishName] = useState('Kimchi Gouda Croissant Bake');

  // Update user state helper
  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Submit a new friend review
  const handleSubmitReview = (cafeId: string, newReview: FriendReview, fusionTried: string) => {
    setCafes((prevCafes) =>
      prevCafes.map((cafe) => {
        if (cafe.id === cafeId) {
          return {
            ...cafe,
            friendsVouchedCount: cafe.friendsVouchedCount + 1,
            friendReviews: [newReview, ...cafe.friendReviews],
          };
        }
        return cafe;
      })
    );

    const cafeObj = cafes.find((c) => c.id === cafeId);
    if (cafeObj) {
      setUser((prev) => ({
        ...prev,
        coffeeTokens: prev.coffeeTokens + 15,
        history: [
          {
            cafeId,
            cafeName: cafeObj.name,
            visitDate: 'Just now',
            myRating: 5,
            myNotes: newReview.reviewText,
            fusionTried: fusionTried || 'Signature brew',
          },
          ...prev.history,
        ],
      }));
    }
  };

  const handleLaunchAR = (dishName?: string) => {
    if (dishName) setArDishName(dishName);
    setIsAROpen(true);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F7F3EB] font-['Plus_Jakarta_Sans']">

      {/* 1. COMPLETE WEB PAGE FULLSCREEN 3D WEBGL CAFE WORLD */}
      <ThreeCafeScene
        user={user}
        onUpdateUser={handleUpdateUser}
        onLaunchAR={() => handleLaunchAR()}
        onOpenDiscovery={() => setActivePanel('discovery')}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* 2. FLOATING BOTTOM DOCK / NAVIGATION BAR */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[94%] sm:w-auto">
        <nav className="clay-card px-3 py-2 border-2 border-white/90 shadow-2xl backdrop-blur-lg flex items-center justify-between sm:justify-center gap-1.5 sm:gap-3">

          {/* Explore Places Button */}
          <button
            onClick={() => setActivePanel(activePanel === 'discovery' ? null : 'discovery')}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activePanel === 'discovery'
              ? 'bg-[#2C241E] text-white shadow-md'
              : 'text-[#4A3B30] hover:bg-black/5'
              }`}
            title="Browse all vouched cafes, restaurants, & reviews"
          >
            <Search className="w-4 h-4 text-[#9BB196]" />
            <span className="hidden sm:inline">Discovery & Reviews</span>
            <span className="sm:hidden">Places</span>
          </button>

          {/* Friend Squads Button */}
          <button
            onClick={() => setActivePanel(activePanel === 'squads' ? null : 'squads')}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activePanel === 'squads'
              ? 'bg-[#2C241E] text-white shadow-md'
              : 'text-[#4A3B30] hover:bg-black/5'
              }`}
            title="Friend dining circle & referral perks"
          >
            <Users className="w-4 h-4 text-[#E07A5F]" />
            <span className="hidden sm:inline">Friend Squads</span>
            <span className="sm:hidden">Squads</span>
          </button>

          {/* AR Tabletop Scanner Button */}
          <button
            onClick={() => handleLaunchAR()}
            className="clay-btn-primary px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 transition-transform"
            title="Inspect 3D dishes in Augmented Reality on your table"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">AR Tabletop</span>
            <span className="sm:hidden">AR</span>
          </button>

          {/* Profile & History Button */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="px-3 py-2 rounded-2xl text-xs font-bold text-[#4A3B30] hover:bg-black/5 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Profile, visited history, & tokens"
          >
            <div className="w-6 h-6 rounded-full bg-[#9BB196] text-white flex items-center justify-center text-xs font-black shadow-inner">
              {user.name.charAt(0)}
            </div>
            <span className="hidden sm:inline font-mono text-[11px] bg-[#E8DFD3] px-1.5 py-0.5 rounded-md">
              {user.coffeeTokens} ☕
            </span>
          </button>

        </nav>
      </div>

      {/* 3. CENTERED MODAL FOR DISCOVERY & REVIEWS (Chennai, India) */}
      {activePanel === 'discovery' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="clay-card-warm w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] border-2 border-white shadow-2xl relative text-[#2C241E] flex flex-col overflow-hidden animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Chennai Badge */}
            <div className="p-4 sm:p-5 border-b border-[#E8DFD3] flex items-center justify-between gap-4 bg-[#F2EDE4]/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#9BB196] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-xl text-[#2C221B] font-['Outfit']">
                      CafeGo Discovery
                    </h3>
                    <span className="text-[11px] bg-[#EEF5EA] text-[#4F7344] px-2.5 py-0.5 rounded-full font-bold border border-[#D5E6CF] shadow-2xs">
                      📍 Chennai, India
                    </span>
                  </div>
                  <p className="text-xs text-[#7A6453]">Verified friend scores across Alwarpet, Mylapore, ECR, Besant Nagar & Nungambakkam</p>
                </div>
              </div>

              <button
                onClick={() => setActivePanel(null)}
                className="p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-all hover:rotate-90 active:scale-90 cursor-pointer shrink-0"
                title="Close (or tap outside to close)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: The Recommendation Engine with Infused Scrollbar */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 infused-scrollbar pr-3 sm:pr-6">
              <RecommendationSystem
                cafes={cafes}
                onSelectCafe={(cafe) => setSelectedCafe(cafe)}
                onOpenAddReview={(cafe) => setReviewingCafe(cafe)}
                onOpenARForDish={(dish) => handleLaunchAR(dish)}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. CENTERED MODAL FOR FRIEND SQUADS & REFERRALS */}
      {activePanel === 'squads' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/50 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActivePanel(null)}
        >
          <div
            className="clay-card-warm w-full max-w-5xl max-h-[92vh] sm:max-h-[88vh] border-2 border-white shadow-2xl relative text-[#2C241E] flex flex-col overflow-hidden animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-5 border-b border-[#E8DFD3] flex items-center justify-between gap-4 bg-[#F2EDE4]/70 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xl text-[#2C221B] font-['Outfit']">
                    Your Foodie Squad & Perks
                  </h3>
                  <p className="text-xs text-[#7A6453]">Invite friends, share authentic reviews & earn coffee tokens together</p>
                </div>
              </div>

              <button
                onClick={() => setActivePanel(null)}
                className="p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-all hover:rotate-90 active:scale-90 cursor-pointer shrink-0"
                title="Close (or tap outside to close)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 infused-scrollbar pr-3 sm:pr-6">
              <ReferralAndSquadSection
                user={user}
                onUpdateUser={handleUpdateUser}
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. MODALS (Cafe Detail, Review, Profile, AR Tabletop) */}
      <CafeDetailModal
        cafe={selectedCafe}
        onClose={() => setSelectedCafe(null)}
        onOpenAddReview={(cafe) => setReviewingCafe(cafe)}
        onLaunchARForDish={(dish) => handleLaunchAR(dish)}
      />

      <ReviewModal
        cafe={reviewingCafe}
        user={user}
        onClose={() => setReviewingCafe(null)}
        onSubmitReview={handleSubmitReview}
      />

      <ProfileModal
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onUpdateUser={handleUpdateUser}
      />

      <ARViewerModal
        isOpen={isAROpen}
        onClose={() => setIsAROpen(false)}
        initialItemName={arDishName}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

    </div>
  );
}
