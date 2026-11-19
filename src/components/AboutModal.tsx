import React, { useState } from 'react';
import { 
  X, 
  Coffee, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Users, 
  Camera, 
  Compass, 
  Cpu, 
  Rocket, 
  Volume2, 
  Layers, 
  ArrowRight, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [scrollProgress, setScrollProgress] = useState(0);

  // Fast, zero-lag scroll tracking optimized for 60fps performance
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, scrollTop / maxScroll)));
    }
  };

  const handleClose = () => {
    soundEngine.playPop();
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fadeIn"
      onClick={handleClose}
    >
      {/* Outer Card with Rounded Edge & Border - Overflow Hidden so scrollbar never bleeds */}
      <div 
        className="clay-card-warm max-w-2xl w-full max-h-[88vh] border-2 border-white shadow-2xl relative text-[#2C241E] animate-modal-pop overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Real-Time Ultra-Fast Progress Tracker (GPU-accelerated scaleX, zero lag) */}
        <div className="absolute top-0 left-0 right-0 z-30 h-1.5 bg-[#EAE2D6]/60 overflow-hidden pointer-events-none">
          <div 
            className="h-full w-full bg-gradient-to-r from-[#E07A5F] via-[#9BB196] to-[#739066] will-change-transform shadow-xs"
            style={{ 
              transform: `scaleX(${scrollProgress})`,
              transformOrigin: 'left center',
              transition: 'transform 0.04s linear'
            }}
          />
        </div>

        {/* Floating Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close About CafeGo dialog"
          className="absolute top-4 right-4 p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-all hover:rotate-90 active:scale-90 cursor-pointer z-30 bg-white/70 backdrop-blur-xs shadow-2xs border border-white/60"
          title="Close modal (or press Escape)"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Infused Scrollable Content Container - Custom sleek scrollbar floating cleanly inside */}
        <div 
          onScroll={handleScroll}
          className="overflow-y-auto flex-1 p-6 md:p-8 pt-7 md:pt-9 space-y-6 infused-scrollbar pr-3 sm:pr-5 mr-1"
        >
          {/* 1. HEADER & BRAND IDENTIFIER */}
          <div className="flex items-start gap-4 pb-4 border-b border-[#E8DFD3] animate-fade-in-up">
            <div className="relative w-14 h-14 rounded-3xl bg-[#9BB196] flex items-center justify-center text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),0_8px_16px_rgba(155,177,150,0.35)] shrink-0 border-2 border-white group hover:scale-105 transition-transform">
              <Coffee className="w-7 h-7 text-white" />
              {/* Animated Steam Plumes */}
              <div className="absolute -top-2 left-4 w-1.5 h-3 bg-white/70 rounded-full animate-steam pointer-events-none" />
              <div className="absolute -top-3 left-6 w-1.5 h-3.5 bg-white/60 rounded-full animate-steam-delay pointer-events-none" />
            </div>

            <div className="flex-1 pr-6">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 id="about-modal-title" className="text-2xl md:text-3xl font-extrabold text-[#2C241E] font-['Outfit'] tracking-tight">
                  About Cafe<span className="text-[#9BB196]">Go</span>
                </h2>
                <span className="text-[11px] bg-[#EEF5EA] text-[#4F7344] px-2.5 py-0.5 rounded-full font-bold border border-[#D5E6CF] shadow-2xs">
                  v1.0 · 3D Discovery
                </span>
              </div>

              {/* Passion Credit */}
              <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#FAF3EC] border border-[#E8DFD3] text-xs font-semibold text-[#E07A5F] shadow-xs hover:scale-102 transition-transform">
                <Heart className="w-3.5 h-3.5 fill-[#E07A5F] text-[#E07A5F] animate-pulse" />
                <span>Developed with passion by <strong className="text-[#2C241E]">Aarya Jain</strong></span>
              </div>
            </div>
          </div>

          {/* 2. THE PROBLEM IT SOLVES */}
          <div className="space-y-2.5 bg-white/80 p-4 sm:p-5 rounded-2xl border border-white/90 shadow-xs animate-fade-in-up delay-75 hover:shadow-md hover:bg-white transition-all duration-300">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E07A5F]">
              <ShieldCheck className="w-4 h-4 text-[#E07A5F]" />
              <span>The Problem We Solve</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#2C241E]">
              End the Era of Fake 5-Star Reviews & Influencer Hype
            </h3>
            <p className="text-sm text-[#5C4A3E] leading-relaxed">
              Finding a good cafe has become exhausting. Review platforms are flooded with bot-boosted ratings, sponsored influencer promotions, and unfair 1-star stranger rants.
            </p>
            <p className="text-sm text-[#5C4A3E] leading-relaxed">
              <strong>CafeGo</strong> cuts through the noise by building a <strong>friend-powered discovery sanctuary</strong>. You only see authentic recommendations from your real dining circle and squads — complete with unvarnished "what to order vs. what to avoid" truth checks, 3D exploration, and tabletop AR.
            </p>
          </div>

          {/* 3. KEY FEATURES */}
          <div className="space-y-3 animate-fade-in-up delay-150">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#739066]">
              <Sparkles className="w-4 h-4 text-[#739066]" />
              <span>Core Features</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#4A3B30]">
              <div className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-white/80 hover:border-[#9BB196]/40 flex items-start gap-2.5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="p-1.5 rounded-lg bg-[#EEF5EA] text-[#4F7344] group-hover:bg-[#9BB196] group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C241E] font-bold text-xs mb-0.5">3D WebGL Cafe World</strong>
                  Click-to-walk exploration, multiple camera angles (Isometric, Counter, Lounge), and chatty NPC patrons.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-white/80 hover:border-[#E07A5F]/40 flex items-start gap-2.5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="p-1.5 rounded-lg bg-[#FDF0EC] text-[#E07A5F] group-hover:bg-[#E07A5F] group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C241E] font-bold text-xs mb-0.5">Squad Truth vs. Stranger Hype</strong>
                  Side-by-side reality checks comparing generic stranger ratings with verified squad reviews.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-white/80 hover:border-[#DDA15E]/40 flex items-start gap-2.5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="p-1.5 rounded-lg bg-[#FAF4EA] text-[#DDA15E] group-hover:bg-[#DDA15E] group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C241E] font-bold text-xs mb-0.5">Live AR Tabletop Scanner</strong>
                  Project signature dishes onto your physical table using your webcam or phone camera.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-white/80 hover:border-[#606C38]/40 flex items-start gap-2.5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="p-1.5 rounded-lg bg-[#F4F6EE] text-[#606C38] group-hover:bg-[#606C38] group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C241E] font-bold text-xs mb-0.5">3D Dish Turntable Viewer</strong>
                  Inspect 3D culinary models from all 360 degrees before deciding what to order.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-white/80 hover:border-[#BC6C25]/40 flex items-start gap-2.5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="p-1.5 rounded-lg bg-[#FAF3EC] text-[#BC6C25] group-hover:bg-[#BC6C25] group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C241E] font-bold text-xs mb-0.5">Procedural Web Audio</strong>
                  Synthesized tactile clicks, barista cup-slide acoustics, and soothing lo-fi cafe ambiance.
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/70 hover:bg-white border border-white/80 hover:border-[#E07A5F]/40 flex items-start gap-2.5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="p-1.5 rounded-lg bg-[#FDF0EC] text-[#E07A5F] group-hover:bg-[#E07A5F] group-hover:text-white transition-colors shrink-0 mt-0.5">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#2C241E] font-bold text-xs mb-0.5">Coffee Token Rewards</strong>
                  Earn tokens for honest reviews and friend referrals to level up food trust badges.
                </div>
              </div>
            </div>
          </div>

          {/* 4. TECH STACK */}
          <div className="space-y-2.5 bg-[#FAF6EE] p-4.5 rounded-2xl border border-[#E8DFD3] animate-fade-in-up delay-225">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B5546]">
              <Cpu className="w-4 h-4 text-[#6B5546]" />
              <span>Tech Stack</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-xs font-bold text-[#2C241E] shadow-2xs hover:scale-108 active:scale-95 transition-transform duration-200 cursor-default">
                ⚛️ React 19
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-xs font-bold text-[#2C241E] shadow-2xs hover:scale-108 active:scale-95 transition-transform duration-200 cursor-default">
                🔷 TypeScript
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-xs font-bold text-[#2C241E] shadow-2xs hover:scale-108 active:scale-95 transition-transform duration-200 cursor-default">
                ⚡ Vite 8
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-xs font-bold text-[#2C241E] shadow-2xs hover:scale-108 active:scale-95 transition-transform duration-200 cursor-default">
                🎮 Three.js & WebGL
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-xs font-bold text-[#2C241E] shadow-2xs hover:scale-108 active:scale-95 transition-transform duration-200 cursor-default">
                🎨 Tailwind CSS v4 (Claymorphism)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-xs font-bold text-[#2C241E] shadow-2xs hover:scale-108 active:scale-95 transition-transform duration-200 cursor-default">
                🔊 Web Audio API
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-[#E0D8CB] text-xs font-bold text-[#2C241E] shadow-2xs hover:scale-108 active:scale-95 transition-transform duration-200 cursor-default">
                ✨ Google Gemini AI SDK Ready
              </span>
            </div>
          </div>

          {/* 5. FUTURE UPDATES */}
          <div className="space-y-2.5 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A3B30]">
              <Rocket className="w-4 h-4 text-[#E07A5F]" />
              <span>Future Updates Roadmap</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/70 transition-colors group">
                <CheckCircle2 className="w-4 h-4 text-[#9BB196] group-hover:scale-115 transition-transform shrink-0 mt-0.5" />
                <span className="text-xs text-[#5C4A3E]">
                  <strong className="text-[#2C241E]">Gemini AI Squad Matchmaker:</strong> AI synthesis of squad taste profiles to generate personalized cafe crawl itineraries.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/70 transition-colors group">
                <CheckCircle2 className="w-4 h-4 text-[#9BB196] group-hover:scale-115 transition-transform shrink-0 mt-0.5" />
                <span className="text-xs text-[#5C4A3E]">
                  <strong className="text-[#2C241E]">Live Geo-Radar:</strong> Real-time alerts when you're walking near a friend's secret work-friendly coffee nook.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/70 transition-colors group">
                <CheckCircle2 className="w-4 h-4 text-[#9BB196] group-hover:scale-115 transition-transform shrink-0 mt-0.5" />
                <span className="text-xs text-[#5C4A3E]">
                  <strong className="text-[#2C241E]">Multiplayer 3D Hangout:</strong> See your friends' 3D avatars live in the cafe with spatial audio chat.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/70 transition-colors group">
                <CheckCircle2 className="w-4 h-4 text-[#9BB196] group-hover:scale-115 transition-transform shrink-0 mt-0.5" />
                <span className="text-xs text-[#5C4A3E]">
                  <strong className="text-[#2C241E]">Community AR Dish Scans:</strong> Turn real cafe dishes into 3D photogrammetry models to share with your squad.
                </span>
              </div>
            </div>
          </div>

          {/* 6. MODAL FOOTER */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E8DFD3] animate-fade-in-up delay-375">
            <span className="text-xs text-[#7A6453] text-center sm:text-left">
              Crafted for true foodies, coffee lovers & honest friends.
            </span>
            <button
              onClick={handleClose}
              className="clay-btn-primary px-6 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all w-full sm:w-auto justify-center group"
            >
              <span>Explore CafeGo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
