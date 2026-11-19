import React, { useState, useMemo } from 'react';
import {
  Coffee,
  Utensils,
  Search,
  Sparkles,
  Heart,
  ShieldCheck,
  Users,
  Flame,
  ChevronDown,
  Wifi,
  Dog,
  Car,
  Gamepad2,
  Sun,
  PartyPopper,
  Salad,
  Info,
  ExternalLink,
  MessageSquarePlus,
  Camera,
  Box
} from 'lucide-react';
import { Cafe, Facilities } from '../types';
import { ThreeDishInspector } from './ThreeDishInspector';

interface RecommendationSystemProps {
  cafes: Cafe[];
  onSelectCafe: (cafe: Cafe) => void;
  onOpenAddReview: (cafe: Cafe) => void;
  onOpenARForDish?: (dishName: string) => void;
}

export const RecommendationSystem: React.FC<RecommendationSystemProps> = ({
  cafes,
  onSelectCafe,
  onOpenAddReview,
  onOpenARForDish,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'cafe' | 'restaurant'>('all');
  const [selectedFacility, setSelectedFacility] = useState<keyof Facilities | 'all'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'ranking' | 'vouched'>('match');
  const [active3DDishCafeId, setActive3DDishCafeId] = useState<string | null>(null);

  // Filtered & Sorted Cafes
  const filteredCafes = useMemo(() => {
    return cafes.filter((cafe) => {
      // Type filter
      if (selectedType !== 'all' && cafe.type !== selectedType) return false;

      // Facility filter
      if (selectedFacility !== 'all') {
        if (!cafe.facilities[selectedFacility]) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = cafe.name.toLowerCase().includes(query);
        const matchesNeighborhood = cafe.neighborhood.toLowerCase().includes(query);
        const matchesTag = cafe.oneLinerTag.toLowerCase().includes(query);
        const matchesFusion = cafe.fusionItems.some(
          (f) => f.name.toLowerCase().includes(query) || f.description.toLowerCase().includes(query)
        );
        return matchesName || matchesNeighborhood || matchesTag || matchesFusion;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') return b.friendMatchScore - a.friendMatchScore;
      if (sortBy === 'ranking') return a.rankingPosition - b.rankingPosition;
      return b.friendsVouchedCount - a.friendsVouchedCount;
    });
  }, [cafes, selectedType, selectedFacility, searchQuery, sortBy]);

  return (
    <section id="discovery" className="py-2 max-w-7xl mx-auto px-1 sm:px-2">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Friend Recommendation & Match System · Chennai, India</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#2C221B] font-['Outfit']">
            Cafes & Restaurants Vouched By Your People
          </h2>
          <p className="text-sm md:text-base text-[#6B5546] mt-1.5 max-w-2xl">
            Ranked by authentic taste matches in your circle, deep criteria breakdowns,
            and must-try fusion items across Chennai you won’t find on generic review sites.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5C4A3E]">
          <label htmlFor="sort-dropdown" className="font-bold">Sort by:</label>
          <select
            id="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            aria-label="Sort cafes by match score, squad ranking, or vouched count"
            className="clay-inset px-3 py-2 rounded-xl text-xs font-bold text-[#2C221B] focus:outline-none cursor-pointer"
          >
            <option value="match">Highest Friend Match (%)</option>
            <option value="ranking">Squad Ranking (#1 - #5)</option>
            <option value="vouched">Most Friends Vouched</option>
          </select>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="clay-card-warm p-5 md:p-6 mb-8 border border-white space-y-4 shadow-sm">
        {/* Search bar & Type Segments */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">

          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7565]" aria-hidden="true" />
            <input
              id="cafe-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search by cafe name, fusion dish, or Chennai neighborhood"
              placeholder="Search by cafe name, fusion dish (e.g. Kimchi croissant), or neighborhood..."
              className="clay-inset w-full pl-10 pr-4 py-3 rounded-2xl text-xs md:text-sm font-semibold text-[#2C221B] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
            />
          </div>

          {/* Type Segmented Controls (Interactive buttons) */}
          <div
            role="group"
            aria-label="Filter by venue type"
            className="flex items-center gap-1.5 p-1 bg-[#ECE2D2] rounded-2xl shrink-0"
          >
            <button
              onClick={() => setSelectedType('all')}
              aria-pressed={selectedType === 'all'}
              aria-label={`All spots: ${cafes.length} places`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedType === 'all'
                ? 'bg-white text-[#2C221B] shadow-sm'
                : 'text-[#6B5546] hover:text-[#2C221B]'
                }`}
            >
              All Spots ({cafes.length})
            </button>
            <button
              onClick={() => setSelectedType('cafe')}
              aria-pressed={selectedType === 'cafe'}
              aria-label="Cafes only"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${selectedType === 'cafe'
                ? 'bg-white text-[#2C221B] shadow-sm'
                : 'text-[#6B5546] hover:text-[#2C221B]'
                }`}
            >
              <Coffee className="w-3.5 h-3.5" aria-hidden="true" />
              Cafes Only
            </button>
            <button
              onClick={() => setSelectedType('restaurant')}
              aria-pressed={selectedType === 'restaurant'}
              aria-label="Restaurants only"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${selectedType === 'restaurant'
                ? 'bg-white text-[#2C221B] shadow-sm'
                : 'text-[#6B5546] hover:text-[#2C221B]'
                }`}
            >
              <Utensils className="w-3.5 h-3.5" aria-hidden="true" />
              Restaurants
            </button>
          </div>
        </div>

        {/* Facilities Filter Buttons */}
        <div className="pt-2 border-t border-[#E8DFD3]/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A7565] mb-2 flex items-center gap-1.5">
            <span>Extra Facility Filter:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedFacility('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${selectedFacility === 'all'
                ? 'bg-[#2C221B] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              Any Facility
            </button>
            <button
              onClick={() => setSelectedFacility('vegFriendly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${selectedFacility === 'vegFriendly'
                ? 'bg-[#739066] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              <Salad className="w-3.5 h-3.5" />
              Veg Friendly
            </button>
            <button
              onClick={() => setSelectedFacility('petFriendly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${selectedFacility === 'petFriendly'
                ? 'bg-[#D4A373] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              <Dog className="w-3.5 h-3.5" />
              Pet Friendly
            </button>
            <button
              onClick={() => setSelectedFacility('coworkingSpaces')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${selectedFacility === 'coworkingSpaces'
                ? 'bg-[#3D405B] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              Coworking Spaces
            </button>
            <button
              onClick={() => setSelectedFacility('rooftopSeating')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${selectedFacility === 'rooftopSeating'
                ? 'bg-[#E07A5F] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Rooftop Seating
            </button>
            <button
              onClick={() => setSelectedFacility('boardGamesCafe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${selectedFacility === 'boardGamesCafe'
                ? 'bg-[#BC6C25] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Board Games Cafe
            </button>
            <button
              onClick={() => setSelectedFacility('partyHall')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${selectedFacility === 'partyHall'
                ? 'bg-[#819B72] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              <PartyPopper className="w-3.5 h-3.5" />
              Party Hall
            </button>
            <button
              onClick={() => setSelectedFacility('parking')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${selectedFacility === 'parking'
                ? 'bg-[#6D597A] text-white shadow-xs'
                : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
                }`}
            >
              <Car className="w-3.5 h-3.5" />
              Parking Available
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Recommendation Cards */}
      {filteredCafes.length === 0 ? (
        <div className="clay-card p-12 text-center max-w-md mx-auto space-y-3">
          <div className="text-4xl">🔍</div>
          <h4 className="text-lg font-bold text-[#2C221B]">No matching places found</h4>
          <p className="text-xs text-[#7A6453]">
            Try relaxing your facility filters or searching for another keyword.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedType('all');
              setSelectedFacility('all');
            }}
            className="clay-btn-secondary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {filteredCafes.map((cafe) => (
            <div
              key={cafe.id}
              className="clay-card p-4 sm:p-5 flex flex-col justify-between border-2 border-white/90 hover:shadow-xl transition-all duration-200 relative group"
            >
              <div>
                {/* Minimized Header: Rank & Neighborhood + Match Score */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-6 h-6 rounded-lg bg-[#2C221B] text-white font-black text-xs flex items-center justify-center shrink-0">
                      #{cafe.rankingPosition}
                    </span>
                    <span className="text-xs font-bold text-[#7A6453] uppercase tracking-wide truncate">
                      {cafe.neighborhood} · {cafe.priceTier}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-[#F2F8EE] border border-[#D5E8CE] px-2.5 py-0.5 rounded-full shrink-0">
                    <Sparkles className="w-3 h-3 text-[#5B884C]" />
                    <span className="text-[11px] font-black text-[#3E6532] tabular-nums">
                      {cafe.friendMatchScore}% Match
                    </span>
                  </div>
                </div>

                {/* Cafe Name & Short Tagline */}
                <div className="mb-2.5">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#2C221B] font-['Outfit'] tracking-tight leading-tight">
                    {cafe.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#E07A5F] line-clamp-1 mt-0.5" title={cafe.oneLinerTag}>
                    “{cafe.oneLinerTag}”
                  </p>
                </div>

                {/* Minimized Inline Criteria Score Bar */}
                <div className="flex items-center gap-2 text-xs py-1.5 px-3 bg-[#F9F5EE] rounded-xl border border-[#EAE0D2] mb-3 text-[#5C4A3E] font-medium flex-wrap">
                  <span>Food <strong className="text-[#2C221B] font-extrabold">{cafe.criteria.foodScore}</strong>/5</span>
                  <span className="text-[#C5B7A6]">•</span>
                  <span>Drinks <strong className="text-[#2C221B] font-extrabold">{cafe.criteria.drinksScore}</strong>/5</span>
                  <span className="text-[#C5B7A6]">•</span>
                  <span>Vibe <strong className="text-[#2C221B] font-extrabold">{cafe.criteria.ambienceScore}</strong>/5</span>
                </div>

                {/* Minimized Fusion Item (Single clean row with 3D/AR triggers) */}
                {cafe.fusionItems.length > 0 && (
                  <div className="mb-3 p-2 rounded-xl bg-[#FAF5ED] border border-[#EAE1D3] space-y-1.5">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Flame className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
                        <span className="font-bold text-[#2C221B] truncate">{cafe.fusionItems[0].name}</span>
                        <span className="text-[11px] font-extrabold text-[#E07A5F] shrink-0">{cafe.fusionItems[0].price}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-bold">
                        <button
                          onClick={() => setActive3DDishCafeId(active3DDishCafeId === cafe.id ? null : cafe.id)}
                          className="text-[#E07A5F] hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <Box className="w-3 h-3" />
                          <span>{active3DDishCafeId === cafe.id ? 'Close' : '3D'}</span>
                        </button>
                        {onOpenARForDish && (
                          <button
                            onClick={() => onOpenARForDish(cafe.fusionItems[0].name)}
                            className="text-[#819B72] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <Camera className="w-3 h-3" />
                            <span>AR</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {active3DDishCafeId === cafe.id && (
                      <div className="pt-2 border-t border-[#E8DDCE] text-center">
                        <ThreeDishInspector
                          dishType={
                            cafe.fusionItems[0].name.toLowerCase().includes('croissant')
                              ? 'croissant'
                              : cafe.fusionItems[0].name.toLowerCase().includes('espresso') || cafe.fusionItems[0].name.toLowerCase().includes('coffee')
                                ? 'coffee'
                                : cafe.fusionItems[0].name.toLowerCase().includes('tiramisu')
                                  ? 'tiramisu'
                                  : 'dosa'
                          }
                          height={110}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Minimized Facilities & Vouched Snippet */}
                <div className="flex items-center justify-between gap-2 text-[11px] mb-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {cafe.facilities.vegFriendly && (
                      <span className="bg-[#EEF5EA] text-[#4A723D] px-1.5 py-0.5 rounded-md font-bold">
                        🌱 Veg
                      </span>
                    )}
                    {cafe.facilities.petFriendly && (
                      <span className="bg-[#F8EFE4] text-[#8A5F35] px-1.5 py-0.5 rounded-md font-bold">
                        🐕 Pet
                      </span>
                    )}
                    {cafe.facilities.coworkingSpaces && (
                      <span className="bg-[#EAEFF7] text-[#36527D] px-1.5 py-0.5 rounded-md font-bold">
                        💻 Work
                      </span>
                    )}
                  </div>

                  <span className="text-[#819B72] font-bold text-[10px] bg-[#EEF5EA] px-2 py-0.5 rounded-md shrink-0">
                    {cafe.friendsVouchedCount} vouched
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-[#F0E8DC] flex items-center gap-2">
                <button
                  onClick={() => onSelectCafe(cafe)}
                  className="clay-btn-secondary flex-1 py-1.5 sm:py-2 rounded-xl text-xs font-bold text-[#2C221B] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>Squad Truth</span>
                </button>

                <button
                  onClick={() => onOpenAddReview(cafe)}
                  className="clay-btn-primary px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer shrink-0"
                  title="Add Your Honest Review"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>Review</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};
