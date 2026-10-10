import React from 'react';
import { Coffee, User, Users, Sparkles, Camera } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  onOpenProfile: () => void;
  onOpenCafeStory: () => void;
  onOpenAR: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenProfile,
  onOpenCafeStory,
  onOpenAR,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F8F5EE]/90 backdrop-blur-md border-b border-[#E8DFD3] px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="flex items-center gap-2.5 text-left group cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#9BB196] flex items-center justify-center text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.4),0_6px_12px_rgba(155,177,150,0.35)] group-hover:scale-105 transition-transform">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#2C221B] font-['Outfit']">
            Cafe<span className="text-[#9BB196]">Go</span>
          </span>
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5C4A3E]">
          <button
            onClick={() => onNavigateSection('discovery')}
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Friend Discovery
          </button>
          <button
            onClick={onOpenCafeStory}
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-[#E07A5F]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Trishi's Cafe (Login)
          </button>
          <button
            onClick={() => onNavigateSection('squads')}
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Friend Squads
          </button>
          <button
            onClick={() => onNavigateSection('referral')}
            className="hover:text-[#E07A5F] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Referral Rewards
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenAR}
            className="clay-btn-primary px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
            title="Launch Augmented Reality Dish & Review Viewer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Launch AR</span>
          </button>

          <button
            onClick={onOpenProfile}
            className="clay-btn-secondary px-3 py-2 rounded-2xl text-xs md:text-sm font-bold flex items-center gap-2 cursor-pointer"
            title="Open Profile & History"
          >
            <div className="w-6 h-6 rounded-full bg-[#E07A5F] text-white flex items-center justify-center text-xs font-bold shadow-inner">
              {user.name.charAt(0)}
            </div>
            <span className="hidden sm:inline text-[#3D2F25]">{user.name}</span>
            <span className="text-[11px] font-medium text-[#7A6453] bg-[#E2D8CA] px-1.5 py-0.5 rounded-lg">
              {user.coffeeTokens} ☕
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
