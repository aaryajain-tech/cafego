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
    <section id="discovery" className="py-12 max-w-7xl mx-auto px-4 md:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase tracking-wider mb-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Friend Recommendation & Match System</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C221B] font-['Outfit']">
            Cafes & Restaurants Vouched By Your People
          </h2>
          <p className="text-sm md:text-base text-[#6B5546] mt-1.5 max-w-2xl">
            Ranked by authentic taste matches in your circle, deep criteria breakdowns, 
            and must-try fusion items you won’t find on generic review sites.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5C4A3E]">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
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
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A7565]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by cafe name, fusion dish (e.g. Kimchi croissant), or neighborhood..."
              className="clay-inset w-full pl-10 pr-4 py-3 rounded-2xl text-xs md:text-sm font-semibold text-[#2C221B] placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
            />
          </div>

          {/* Type Segmented Controls (Interactive buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#ECE2D2] rounded-2xl shrink-0">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-white text-[#2C221B] shadow-sm'
                  : 'text-[#6B5546] hover:text-[#2C221B]'
              }`}
            >
              All Spots ({cafes.length})
            </button>
            <button
              onClick={() => setSelectedType('cafe')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedType === 'cafe'
                  ? 'bg-white text-[#2C221B] shadow-sm'
                  : 'text-[#6B5546] hover:text-[#2C221B]'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              Cafes Only
            </button>
            <button
              onClick={() => setSelectedType('restaurant')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedType === 'restaurant'
                  ? 'bg-white text-[#2C221B] shadow-sm'
                  : 'text-[#6B5546] hover:text-[#2C221B]'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
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
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                selectedFacility === 'all'
                  ? 'bg-[#2C221B] text-white shadow-xs'
                  : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
              }`}
            >
              Any Facility
            </button>
            <button
              onClick={() => setSelectedFacility('vegFriendly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedFacility === 'vegFriendly'
                  ? 'bg-[#739066] text-white shadow-xs'
                  : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
              }`}
            >
              <Salad className="w-3.5 h-3.5" />
              Veg Friendly
            </button>
            <button
              onClick={() => setSelectedFacility('petFriendly')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedFacility === 'petFriendly'
                  ? 'bg-[#D4A373] text-white shadow-xs'
                  : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              Pet Friendly
            </button>
            <button
              onClick={() => setSelectedFacility('coworkingSpaces')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedFacility === 'coworkingSpaces'
                  ? 'bg-[#3D405B] text-white shadow-xs'
                  : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              Coworking Spaces
            </button>
            <button
              onClick={() => setSelectedFacility('rooftopSeating')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedFacility === 'rooftopSeating'
                  ? 'bg-[#E07A5F] text-white shadow-xs'
                  : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              Rooftop Seating
            </button>
            <button
              onClick={() => setSelectedFacility('boardGamesCafe')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedFacility === 'boardGamesCafe'
                  ? 'bg-[#BC6C25] text-white shadow-xs'
                  : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Board Games Cafe
            </button>
            <button
              onClick={() => setSelectedFacility('partyHall')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedFacility === 'partyHall'
                  ? 'bg-[#819B72] text-white shadow-xs'
                  : 'bg-[#EAE2D6] text-[#5C4A3E] hover:bg-[#E2D8C9]'
              }`}
            >
              <PartyPopper className="w-3.5 h-3.5" />
              Party Hall
            </button>
            <button
              onClick={() => setSelectedFacility('parking')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedFacility === 'parking'
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
        <div className="grid md:grid-cols-2 gap-8">
          {filteredCafes.map((cafe) => (
            <div
              key={cafe.id}
              className="clay-card p-6 md:p-7 flex flex-col justify-between border-2 border-white/90 hover:shadow-2xl transition-all duration-300 relative group"
            >
              <div>
                {/* Top Row: Ranking Position & Friend Match Score */}
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#2C221B] text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                      #{cafe.rankingPosition}
                    </span>
                    <span className="text-xs font-bold text-[#7A6453] uppercase tracking-wider">
                      {cafe.neighborhood} · {cafe.priceTier}
                    </span>
                  </div>

                  {/* Friend Match Score */}
                  <div className="flex items-center gap-1.5 bg-[#F2F8EE] border border-[#D5E8CE] px-3 py-1 rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#5B884C]" />
                    <span className="text-xs font-black text-[#3E6532] tabular-nums">
                      {cafe.friendMatchScore}% Friend Match
                    </span>
                  </div>
                </div>

                {/* Cafe Name */}
                <h3 className="text-2xl font-black text-[#2C221B] font-['Outfit'] tracking-tight">
                  {cafe.name}
                </h3>

                {/* Generated One-Liner Tag/Caption */}
                <p className="text-sm font-semibold text-[#E07A5F] mt-1.5 leading-snug">
                  “{cafe.oneLinerTag}”
                </p>

                {/* Menu Style info */}
                <div className="text-xs text-[#7A6453] font-medium mt-1">
                  Style: <span className="text-[#2C221B] font-semibold">{cafe.criteria.menuStyle}</span>
                </div>

                {/* Criteria Score Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2.5 my-4 p-3 bg-[#F9F5EE] rounded-2xl border border-[#EAE0D2]">
                  <div className="text-center space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#8A7565]">Food</span>
                    <div className="text-base font-extrabold text-[#2C221B] tabular-nums">
                      {cafe.criteria.foodScore} <span className="text-xs text-[#8A7565]">/ 5</span>
                    </div>
                    <div className="text-[10px] text-[#7A6453] line-clamp-1 truncate" title={cafe.criteria.foodComment}>
                      {cafe.criteria.foodComment}
                    </div>
                  </div>

                  <div className="text-center space-y-0.5 border-x border-[#E0D5C5]">
                    <span className="text-[10px] uppercase font-bold text-[#8A7565]">Drinks</span>
                    <div className="text-base font-extrabold text-[#2C221B] tabular-nums">
                      {cafe.criteria.drinksScore} <span className="text-xs text-[#8A7565]">/ 5</span>
                    </div>
                    <div className="text-[10px] text-[#7A6453] line-clamp-1 truncate" title={cafe.criteria.drinksComment}>
                      {cafe.criteria.drinksComment}
                    </div>
                  </div>

                  <div className="text-center space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#8A7565]">Ambience</span>
                    <div className="text-base font-extrabold text-[#2C221B] tabular-nums">
                      {cafe.criteria.ambienceScore} <span className="text-xs text-[#8A7565]">/ 5</span>
                    </div>
                    <div className="text-[10px] text-[#7A6453] line-clamp-1 truncate" title={cafe.criteria.ambienceComment}>
                      {cafe.criteria.ambienceComment}
                    </div>
                  </div>
                </div>

                {/* Must-Try Unique Fusion Items Box */}
                {cafe.fusionItems.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C221B]">
                        <Flame className="w-3.5 h-3.5 text-[#E07A5F]" />
                        <span>Must-Try Fusion Item:</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActive3DDishCafeId(active3DDishCafeId === cafe.id ? null : cafe.id)}
                          className="text-[11px] font-bold text-[#E07A5F] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Box className="w-3 h-3" />
                          <span>{active3DDishCafeId === cafe.id ? 'Hide 3D' : 'Spin 3D'}</span>
                        </button>
                        {onOpenARForDish && (
                          <button
                            onClick={() => onOpenARForDish(cafe.fusionItems[0].name)}
                            className="text-[11px] font-bold text-[#819B72] hover:underline flex items-center gap-1 cursor-pointer ml-1"
                          >
                            <Camera className="w-3 h-3" />
                            <span>View in AR</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Interactive 3D Turntable if toggled */}
                    {active3DDishCafeId === cafe.id && (
                      <div className="p-2 bg-[#F6EFE5] rounded-2xl border border-[#E8DDCE] text-center">
                        <div className="text-[10px] font-bold text-[#8A7565] uppercase mb-1">
                          Interactive 3D Dish Inspection · Drag to Spin
                        </div>
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
                          height={140}
                        />
                      </div>
                    )}

                    <div className="bg-[#FAF5ED] p-3 rounded-2xl border border-[#EAE1D3] space-y-1">
                      <div className="flex items-center justify-between text-xs font-extrabold text-[#2C221B]">
                        <span>{cafe.fusionItems[0].name}</span>
                        <span className="text-[#E07A5F]">{cafe.fusionItems[0].price}</span>
                      </div>
                      <p className="text-[11px] text-[#6B5A4E] leading-relaxed">
                        {cafe.fusionItems[0].description}
                      </p>
                      <p className="text-[11px] text-[#819B72] font-semibold italic">
                        {cafe.fusionItems[0].friendReaction}
                      </p>
                    </div>
                  </div>
                )}

                {/* Facilities Badges (Unboxed clean styling or small tactile chips) */}
                <div className="flex items-center gap-1.5 flex-wrap text-[11px] text-[#6B5546] font-medium mb-4">
                  {cafe.facilities.vegFriendly && (
                    <span className="bg-[#EEF5EA] text-[#4A723D] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                      🌱 Veg Friendly
                    </span>
                  )}
                  {cafe.facilities.petFriendly && (
                    <span className="bg-[#F8EFE4] text-[#8A5F35] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                      🐕 Pet Friendly
                    </span>
                  )}
                  {cafe.facilities.coworkingSpaces && (
                    <span className="bg-[#EAEFF7] text-[#36527D] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                      💻 Coworking Friendly
                    </span>
                  )}
                  {cafe.facilities.boardGamesCafe && (
                    <span className="bg-[#F5EDE8] text-[#8A4828] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                      🎲 Board Games
                    </span>
                  )}
                  {cafe.facilities.rooftopSeating && (
                    <span className="bg-[#FBF1EA] text-[#9E5D4B] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                      🌅 Rooftop Seating
                    </span>
                  )}
                  {cafe.facilities.parking && (
                    <span className="bg-[#EDEBF3] text-[#554A78] px-2 py-0.5 rounded-lg font-bold flex items-center gap-1">
                      🚗 Parking
                    </span>
                  )}
                </div>

                {/* Vouched Friends Snippet */}
                <div className="pt-3 border-t border-[#F0E8DC] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {cafe.friendReviews.map((rev) => (
                        <div
                          key={rev.id}
                          style={{ backgroundColor: rev.avatarColor }}
                          className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold"
                          title={rev.friendName}
                        >
                          {rev.friendName.charAt(0)}
                        </div>
                      ))}
                    </div>
                    <span className="text-[#6B5546] font-semibold">
                      {cafe.friendsVouchedCount} friends vouched
                    </span>
                  </div>

                  <span className="text-[#819B72] font-bold text-[11px] bg-[#EEF5EA] px-2 py-0.5 rounded-md">
                    {cafe.friendReviews[0]?.verdict || 'Vouched'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-[#F0E8DC] flex items-center gap-2.5">
                <button
                  onClick={() => onSelectCafe(cafe)}
                  className="clay-btn-secondary flex-1 py-2.5 rounded-xl text-xs font-bold text-[#2C221B] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>Read Full Squad Truth</span>
                </button>

                <button
                  onClick={() => onOpenAddReview(cafe)}
                  className="clay-btn-primary px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Add Your Honest Review"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add Review</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};
