import React, { useState } from 'react';
import { ThreeCafeScene } from './components/ThreeCafeScene';
import { RecommendationSystem } from './components/RecommendationSystem';
import { ReferralAndSquadSection } from './components/ReferralAndSquadSection';
import { CafeDetailModal } from './components/CafeDetailModal';
import { ReviewModal } from './components/ReviewModal';
import { ProfileModal } from './components/ProfileModal';
import { ARViewerModal } from './components/ARViewerModal';
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
      />

      {/* 2. FLOATING BOTTOM DOCK / NAVIGATION BAR */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[94%] sm:w-auto">
        <nav className="clay-card px-3 py-2 border-2 border-white/90 shadow-2xl backdrop-blur-lg flex items-center justify-between sm:justify-center gap-1.5 sm:gap-3">
          
          {/* Explore Places Button */}
          <button
            onClick={() => setActivePanel(activePanel === 'discovery' ? null : 'discovery')}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activePanel === 'discovery'
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
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activePanel === 'squads'
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

      {/* 3. SLIDE-OVER DRAWER FOR DISCOVERY & REVIEWS */}
      {activePanel === 'discovery' && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-[#F8F5EE]/95 backdrop-blur-xl border-l-2 border-white/80 shadow-2xl flex flex-col animate-slideLeft">
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#E8DFD3] flex items-center justify-between gap-4 bg-[#F2EDE4]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#9BB196] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <Search className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#2C221B] font-['Outfit']">
                  CafeGo Discovery
                </h3>
                <p className="text-xs text-[#7A6453]">Verified friend scores vs Google stranger reviews</p>
              </div>
            </div>

            <button
              onClick={() => setActivePanel(null)}
              className="p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body: The Recommendation Engine */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <RecommendationSystem
              cafes={cafes}
              onSelectCafe={(cafe) => setSelectedCafe(cafe)}
              onOpenAddReview={(cafe) => setReviewingCafe(cafe)}
              onOpenARForDish={(dish) => handleLaunchAR(dish)}
            />
          </div>
        </div>
      )}

      {/* 4. SLIDE-OVER DRAWER FOR FRIEND SQUADS & REFERRALS */}
      {activePanel === 'squads' && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-[#F8F5EE]/95 backdrop-blur-xl border-l-2 border-white/80 shadow-2xl flex flex-col animate-slideLeft">
          <div className="p-5 border-b border-[#E8DFD3] flex items-center justify-between gap-4 bg-[#F2EDE4]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#2C221B] font-['Outfit']">
                  Your Foodie Squad & Perks
                </h3>
                <p className="text-xs text-[#7A6453]">Invite friends to unlock authentic reviews & coffee tokens</p>
              </div>
            </div>

            <button
              onClick={() => setActivePanel(null)}
              className="p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            <ReferralAndSquadSection
              user={user}
              onUpdateUser={handleUpdateUser}
            />
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

    </div>
  );
}
