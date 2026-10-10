import React from 'react';
import { Coffee, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenCafeStory: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenCafeStory,
}) => {
  return (
    <footer className="mt-20 border-t border-[#E8DFD3] bg-[#F2ECE1]/60 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#E07A5F] flex items-center justify-center text-white shadow-sm">
            <Coffee className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-lg font-extrabold text-[#2C221B] font-['Outfit']">
              Trust<span className="text-[#E07A5F]">Bite</span>
            </span>
            <p className="text-xs text-[#7A6453]">
              Friend-powered cafe & dining discovery without the fake reviews.
            </p>
          </div>
        </div>

        {/* Quiet Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#6B5546]">
          <button
            onClick={() => onNavigateSection('hero')}
            className="hover:text-[#E07A5F] transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            onClick={() => onNavigateSection('discovery')}
            className="hover:text-[#E07A5F] transition-colors cursor-pointer"
          >
            Discovery Engine
          </button>
          <button
            onClick={onOpenCafeStory}
            className="hover:text-[#E07A5F] transition-colors cursor-pointer"
          >
            Trishi's Interactive Cafe
          </button>
          <button
            onClick={() => onNavigateSection('squads')}
            className="hover:text-[#E07A5F] transition-colors cursor-pointer"
          >
            Friend Squads
          </button>
          <button
            onClick={() => onNavigateSection('referral')}
            className="hover:text-[#E07A5F] transition-colors cursor-pointer"
          >
            Referral Perks
          </button>
        </div>

        {/* Quiet Copyright */}
        <div className="text-xs text-[#8A7565] text-center md:text-right">
          <p>© 2026 TrustBite. Made for foodies who value real friends over stranger ratings.</p>
        </div>

      </div>
    </footer>
  );
};
