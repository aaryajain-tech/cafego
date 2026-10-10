import React from 'react';
import { Sparkles, ShieldCheck, Users, Coffee, ArrowRight, Star, AlertTriangle, Check, Camera, Box } from 'lucide-react';

interface HeroSectionProps {
  onStartExperience: () => void;
  onExploreDiscovery: () => void;
  onLaunchAR?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartExperience,
  onExploreDiscovery,
  onLaunchAR,
}) => {
  return (
    <section id="hero" className="py-12 md:py-16 max-w-7xl mx-auto px-4 md:px-8">
      {/* 2-Column Responsive Split */}
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Bold Value Proposition */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Domain kicker */}
          <div className="flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>3D Spatial Cafe Discovery · Augmented Reality Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#2C221B] leading-[1.15] tracking-tight font-['Outfit']" style={{ textWrap: 'balance' }}>
            Tired of fake 5-star reviews on Google? <br />
            <span className="text-[#E07A5F]">Explore real friend reviews in 3D & AR.</span>
          </h1>

          <p className="text-base md:text-lg text-[#6B5546] max-w-xl leading-relaxed">
            Whenever you search for a cafe, paid food influencers pop up pushing mediocre spots. 
            TrustBite lets you step into a 3D isometric cafe, test secret fusion dishes in Augmented Reality, 
            and see reviews strictly from your verified friends.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onStartExperience}
              className="clay-btn-primary px-7 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
            >
              <Box className="w-5 h-5" />
              <span>Enter 3D Isometric Cafe</span>
            </button>

            {onLaunchAR && (
              <button
                onClick={onLaunchAR}
                className="clay-btn-secondary px-6 py-4 rounded-2xl font-bold text-sm text-[#3D2F25] flex items-center justify-center gap-2 cursor-pointer border border-white"
              >
                <Camera className="w-4 h-4 text-[#E07A5F]" />
                <span>Launch AR Mode</span>
              </button>
            )}

            <button
              onClick={onExploreDiscovery}
              className="px-4 py-4 rounded-2xl text-xs font-bold text-[#7A6453] hover:text-[#2C221B] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Browse Places</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Unboxed Metadata Proof Strip */}
          <div className="pt-6 border-t border-[#E8DFD3] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#7A6453] font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#819B72]" />
              <span>Zero sponsored bot reviews</span>
            </div>
            <span aria-hidden="true" className="text-[#D0C0B0]">·</span>
            <div className="flex items-center gap-1.5">
              <Camera className="w-4 h-4 text-[#E07A5F]" />
              <span>3D & AR Dish Inspection</span>
            </div>
            <span aria-hidden="true" className="text-[#D0C0B0]">·</span>
            <div className="flex items-center gap-1.5">
              <Coffee className="w-4 h-4 text-[#D4A373]" />
              <span>Fusion item warnings</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Clay Comparison Card (Stranger vs Friend) */}
        <div className="lg:col-span-5">
          <div className="clay-card-warm p-6 md:p-7 border-2 border-white relative shadow-xl">
            
            <div className="text-xs font-bold text-[#8A7565] uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>The Search Reality Check</span>
              <span className="text-[11px] text-[#E07A5F] font-bold">Same Cafe · Two Very Different Takes</span>
            </div>

            <div className="space-y-4">
              {/* Fake Google Stranger Review */}
              <div className="bg-[#FAF3EA] p-4 rounded-2xl border border-[#E8DFC9] space-y-2 opacity-85">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#8A7565]">Google Stranger Review</span>
                    <span className="text-[10px] text-red-700 bg-red-100/70 px-1.5 py-0.2 rounded font-medium flex items-center gap-0.5">
                      <AlertTriangle className="w-3 h-3" /> Unverified
                    </span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    ★★★★★
                  </div>
                </div>
                <p className="text-xs text-[#6B5A4E] italic leading-normal">
                  “Omg absolute perfection! Aesthetic vibes! Best matcha in the universe!! You MUST visit!”
                </p>
                <div className="text-[10px] text-[#9E8B7C]">
                  Account: User_83827 · 1 review ever posted · Paid promotion tag hidden
                </div>
              </div>

              {/* Genuine Friend Review on TrustBite */}
              <div className="clay-card p-4.5 space-y-2.5 border-2 border-[#819B72]/40 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#819B72] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      S
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#2C221B]">Sarah (Your Real Friend)</span>
                      <span className="text-[10px] text-[#819B72] font-semibold block">Visited 3 days ago · 18 shared lunches</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#2C221B] bg-[#EAF2E8] text-[#4F7344] px-2 py-0.5 rounded-lg">
                    Real Verdict: 4.8 / 5
                  </span>
                </div>

                <p className="text-xs md:text-sm font-medium text-[#2C221B] leading-relaxed">
                  “Don't fall for the matcha hype—it’s powdered syrup! But their <strong className="text-[#E07A5F]">Kimchi Gouda Croissant</strong> is 10/10. 
                  Sit on the garden patio; inside gets loud by 3pm.”
                </p>

                <div className="pt-2 border-t border-[#F0E8DD] flex items-center justify-between text-[11px]">
                  <span className="text-[#819B72] font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Saved you $8 on mid matcha
                  </span>
                  <span className="text-[#7A6453]">Wi-Fi: 180 Mbps</span>
                </div>
              </div>
            </div>

            {/* Bottom mini takeaway */}
            <div className="mt-5 p-3 rounded-xl bg-[#F0E6D8] text-center text-xs font-bold text-[#5C4839]">
              Friends give context, not inflated star ratings.
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
