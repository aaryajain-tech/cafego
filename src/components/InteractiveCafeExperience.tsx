import React, { useState, useRef, useEffect } from 'react';
import { 
  Coffee, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  HelpCircle, 
  X, 
  Move, 
  MessageCircle, 
  UtensilsCrossed, 
  Heart,
  ChevronRight,
  Maximize2,
  RefreshCw
} from 'lucide-react';
import { CAFE_PATRONS } from '../data/mockData';
import { CafePatron, UserProfile } from '../types';

interface InteractiveCafeExperienceProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const InteractiveCafeExperience: React.FC<InteractiveCafeExperienceProps> = ({
  user,
  onUpdateUser,
  isOpenModal = false,
  onCloseModal,
}) => {
  // Walkthrough Story Steps: 
  // 1: Enter & Walk inside
  // 2: Meet Trishi at the counter ("What can I call you?")
  // 3: Spotting cafe reviews around the room
  // 4: Steaming coffee slides on the desk & Password prompt
  // 5: Welcome to the circle + Cute person pops up for free roaming
  const [storyStep, setStoryStep] = useState<number>(user.name ? 5 : 1);
  const [inputName, setInputName] = useState(user.name || '');
  const [inputPassword, setInputPassword] = useState('');
  const [coffeeSlid, setCoffeeSlid] = useState(false);
  const [loginCompleted, setLoginCompleted] = useState(!!user.name);

  // Roaming state
  const [characterPos, setCharacterPos] = useState<{ x: number; y: number }>({ x: 50, y: 55 });
  const [isWalking, setIsWalking] = useState(false);
  const [activePatron, setActivePatron] = useState<CafePatron | null>(CAFE_PATRONS[0]);
  const [autoProximityActive, setAutoProximityActive] = useState<boolean>(true);
  const [characterColor, setCharacterColor] = useState<string>('#E07A5F');
  const floorRef = useRef<HTMLDivElement>(null);

  // Proximity detection: check if character is close to any patron
  useEffect(() => {
    if (!autoProximityActive) return;

    let closestPatron: CafePatron | null = null;
    let minDistance = 1000;

    CAFE_PATRONS.forEach((patron) => {
      const dx = characterPos.x - patron.x;
      const dy = characterPos.y - patron.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 18 && dist < minDistance) {
        minDistance = dist;
        closestPatron = patron;
      }
    });

    if (closestPatron) {
      setActivePatron(closestPatron);
    }
  }, [characterPos, autoProximityActive]);

  // Handle click on floor to walk there
  const handleFloorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!floorRef.current) return;
    const rect = floorRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    // Bounds check
    const clampedX = Math.max(10, Math.min(90, clickX));
    const clampedY = Math.max(15, Math.min(88, clickY));

    setIsWalking(true);
    setCharacterPos({ x: clampedX, y: clampedY });
    setTimeout(() => setIsWalking(false), 500);
  };

  // Move via D-pad or keyboard
  const moveCharacter = (dx: number, dy: number) => {
    setIsWalking(true);
    setCharacterPos((prev) => ({
      x: Math.max(10, Math.min(90, prev.x + dx)),
      y: Math.max(15, Math.min(88, prev.y + dy)),
    }));
    setTimeout(() => setIsWalking(false), 300);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (storyStep !== 5) return;
      if (e.key === 'ArrowUp' || e.key === 'w') moveCharacter(0, -6);
      if (e.key === 'ArrowDown' || e.key === 's') moveCharacter(0, 6);
      if (e.key === 'ArrowLeft' || e.key === 'a') moveCharacter(-6, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') moveCharacter(6, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [storyStep]);

  // Handle Trishi Name submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    onUpdateUser({ name: inputName.trim(), username: inputName.trim().toLowerCase().replace(/\s+/g, '_') });
    setStoryStep(3); // Next to sample reviews
  };

  // Trigger coffee slide
  const triggerCoffeeSlide = () => {
    setCoffeeSlid(true);
    setTimeout(() => {
      setStoryStep(4);
    }, 700);
  };

  // Handle final password login
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginCompleted(true);
    onUpdateUser({
      name: inputName || user.name || 'Friend',
      coffeeTokens: (user.coffeeTokens || 0) + 10,
    });
    setStoryStep(5);
  };

  return (
    <div className="w-full relative">
      {/* Container with Claymorphic styling */}
      <div className="clay-card-warm p-6 md:p-8 relative overflow-hidden border-2 border-white/80">
        
        {/* Header / Mode Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E8DFD3]/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Story Experience · Claymorphism Cafe</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C221B] font-['Outfit']">
              {storyStep < 5 ? "Trishi's Counter & Warm Welcoming" : "Explore the Cafe & Candid Friend Reviews"}
            </h2>
            <p className="text-sm text-[#7A6453] mt-1">
              {storyStep < 5
                ? "Walk into the cafe, meet barista Trishi, enter your name, and watch reviews come alive."
                : "Move your cute avatar around the floor to eavesdrop on authentic friend reviews!"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {storyStep === 5 ? (
              <button
                onClick={() => {
                  setStoryStep(1);
                  setCoffeeSlid(false);
                }}
                className="clay-btn-secondary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Replay Trishi Story
              </button>
            ) : (
              <button
                onClick={() => setStoryStep(5)}
                className="clay-btn-secondary px-3 py-1.5 rounded-xl text-xs font-bold text-[#7A6453] cursor-pointer"
              >
                Skip to Free Roam
              </button>
            )}

            {onCloseModal && (
              <button
                onClick={onCloseModal}
                className="p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* =============================================================== */}
        {/* STORY WALKTHROUGH STEPS (Steps 1 to 4) */}
        {/* =============================================================== */}
        {storyStep < 5 && (
          <div className="py-8 max-w-3xl mx-auto">
            {/* Step 1: Entering the Cafe */}
            {storyStep === 1 && (
              <div className="text-center space-y-6 animate-fadeIn">
                <div className="w-24 h-24 mx-auto rounded-3xl bg-[#E07A5F]/15 flex items-center justify-center shadow-[inset_3px_3px_6px_rgba(255,255,255,0.8),0_10px_20px_rgba(224,122,95,0.15)] animate-gentle-float">
                  <Coffee className="w-12 h-12 text-[#E07A5F]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#2C221B]">
                    Push open the cafe door...
                  </h3>
                  <p className="text-base text-[#6E5A4D] max-w-lg mx-auto">
                    The smell of freshly ground cardamom espresso and warm croissants fills the air.
                    Soft indie acoustic music hums in the background. Ahead is the espresso counter.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setStoryStep(2)}
                    className="clay-btn-primary px-8 py-3.5 rounded-2xl font-bold text-base flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <span>Walk Up to the Counter</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Meet Trishi ("Hi, I am Trishi, what can I call you?") */}
            {storyStep === 2 && (
              <div className="grid md:grid-cols-12 gap-8 items-center animate-fadeIn">
                {/* Trishi Character Avatar */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-3xl bg-[#EAE2D6] p-2 flex items-center justify-center shadow-[inset_3px_3px_6px_rgba(255,255,255,0.9),inset_-3px_-3px_6px_rgba(180,150,130,0.2),0_14px_28px_rgba(100,75,55,0.15)] border-2 border-white">
                      <div className="text-6xl select-none">👩🏽‍🍳</div>
                    </div>
                    {/* Steaming Coffee badge */}
                    <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-[#E07A5F] shadow-md border border-[#E8DFD3] flex items-center gap-1">
                      <span>☕ Barista Trishi</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold text-lg text-[#2C221B]">Trishi</h4>
                    <span className="text-xs text-[#8A7565]">Head Barista & Truth-Keeper</span>
                  </div>
                </div>

                {/* Trishi's Dialog & Name Input */}
                <div className="md:col-span-7 space-y-5">
                  <div className="clay-bubble p-5 relative border border-[#E8DFD3]/80">
                    <p className="text-lg font-medium text-[#2C221B] leading-relaxed">
                      “Hi! I am <span className="font-extrabold text-[#E07A5F]">Trishi</span>! Welcome to our sanctuary. 
                      Before I pour your brew, <span className="underline decoration-[#E07A5F] decoration-2">what can I call you</span>?”
                    </p>
                    <div className="absolute -left-2 top-8 w-4 h-4 bg-white rotate-45 border-l border-b border-[#E8DFD3]/80 hidden md:block"></div>
                  </div>

                  <form onSubmit={handleNameSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453] mb-1.5">
                        Your Name or Foodie Nickname
                      </label>
                      <input
                        type="text"
                        required
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                        placeholder="e.g. Aarya, Sam, Chloe..."
                        className="clay-inset w-full px-4 py-3.5 rounded-2xl text-[#2C221B] font-semibold placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="clay-btn-primary w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Tell Trishi Your Name</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Step 3: Reviews popping up across the spots in the cafe */}
            {storyStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="text-center space-y-2">
                  <div className="clay-bubble inline-block px-4 py-1.5 text-sm font-bold text-[#E07A5F]">
                    Trishi smiles: “Nice to meet you, {inputName || user.name}!”
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C221B]">
                    Look around the cafe...
                  </h3>
                  <p className="text-sm text-[#7A6453]">
                    Authentic friend reviews are glowing at different tables and corners of the venue:
                  </p>
                </div>

                {/* Review samples across spots */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Spot 1 */}
                  <div className="clay-card p-4 space-y-2 transform hover:-translate-y-1 transition-transform border border-white">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🌿</span>
                      <span className="text-xs font-bold text-[#819B72]">At Sunlit Window</span>
                    </div>
                    <p className="text-sm font-semibold text-[#2C221B]">“Good ambience ✨”</p>
                    <p className="text-xs text-[#7A6453]">
                      Natural light, zero glare, plants everywhere. Perfect spot for afternoon deep-talks.
                    </p>
                  </div>

                  {/* Spot 2 */}
                  <div className="clay-card p-4 space-y-2 transform hover:-translate-y-1 transition-transform border border-white">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">❤️</span>
                      <span className="text-xs font-bold text-[#E07A5F]">At The Counter</span>
                    </div>
                    <p className="text-sm font-semibold text-[#2C221B]">“Friendly staff ❤️”</p>
                    <p className="text-xs text-[#7A6453]">
                      Trishi remembers your name and knows exactly how much oat milk to froth.
                    </p>
                  </div>

                  {/* Spot 3 */}
                  <div className="clay-card p-4 space-y-2 transform hover:-translate-y-1 transition-transform border border-white">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">☕</span>
                      <span className="text-xs font-bold text-[#D4A373]">At Brew Station</span>
                    </div>
                    <p className="text-sm font-semibold text-[#2C221B]">“Nice single-origin coffee ☕”</p>
                    <p className="text-xs text-[#7A6453]">
                      No burnt bitterness. Floral Ethiopian wash with crisp peach aroma.
                    </p>
                  </div>
                </div>

                {/* Trishi slides the coffee button */}
                <div className="text-center pt-4">
                  <button
                    onClick={triggerCoffeeSlide}
                    className="clay-btn-primary px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 mx-auto cursor-pointer"
                  >
                    <span>Watch Trishi Place the Coffee on the Desk</span>
                    <Coffee className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Steaming coffee slides on the desk & Password to login */}
            {storyStep === 4 && (
              <div className="grid md:grid-cols-12 gap-8 items-center animate-fadeIn">
                {/* Steaming Coffee on desk visual */}
                <div className="md:col-span-5 flex flex-col items-center text-center">
                  <div className="relative">
                    {/* Steam rising */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
                      <div className="w-2 h-7 bg-white/70 rounded-full blur-[1px] animate-steam"></div>
                      <div className="w-2 h-9 bg-white/70 rounded-full blur-[1px] animate-steam-delay"></div>
                      <div className="w-2 h-6 bg-white/70 rounded-full blur-[1px] animate-steam"></div>
                    </div>

                    {/* Warm clay coffee cup */}
                    <div className="w-32 h-32 rounded-3xl bg-[#E07A5F] flex flex-col items-center justify-center text-white shadow-[inset_3px_3px_6px_rgba(255,255,255,0.4),0_16px_32px_rgba(224,122,95,0.4)] border-2 border-white transform transition-transform duration-500 scale-105">
                      <Coffee className="w-14 h-14" />
                      <span className="text-[11px] font-bold mt-1 text-white/90">Warm Pour-Over</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <span className="text-xs font-bold text-[#E07A5F]">Poured Fresh For {inputName || user.name}</span>
                    <p className="text-xs text-[#7A6453]">Cardamom-infused single-origin bean</p>
                  </div>
                </div>

                {/* Password / Passcode Form */}
                <div className="md:col-span-7 space-y-5">
                  <div className="clay-bubble p-5 border border-[#E8DFD3]/80">
                    <p className="text-base font-medium text-[#2C221B] leading-relaxed">
                      *Trishi slides the steaming ceramic cup right in front of you onto the wooden counter.*
                    </p>
                    <p className="text-sm text-[#7A6453] mt-2">
                      “Take a sip, {inputName || user.name}! Now, what password would you like for your trusted friend circle?”
                    </p>
                  </div>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453] mb-1.5">
                        Squad Password or Secret Word
                      </label>
                      <input
                        type="password"
                        required
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        placeholder="Enter your password..."
                        className="clay-inset w-full px-4 py-3.5 rounded-2xl text-[#2C221B] font-semibold placeholder:text-[#A8988B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                      />
                      <p className="text-[11px] text-[#8A7565] mt-1">
                        Login handle saved as: <span className="font-bold text-[#E07A5F]">@{inputName ? inputName.toLowerCase().replace(/\s+/g, '_') : 'you'}</span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        className="clay-btn-primary flex-1 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Login & Join the Circle</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setInputPassword('friend123');
                          handlePasswordSubmit({ preventDefault: () => {} } as any);
                        }}
                        className="clay-btn-secondary px-4 py-3.5 rounded-2xl text-xs font-bold cursor-pointer"
                      >
                        Quick Passkey Demo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =============================================================== */}
        {/* STEP 5: THE ROAMING CAFE FLOOR WITH CUTE PERSON POPPING UP */}
        {/* =============================================================== */}
        {storyStep === 5 && (
          <div className="space-y-6 pt-2 animate-fadeIn">
            {/* Interactive instructions bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#EFE8DC] p-3.5 rounded-2xl border border-[#E0D5C3]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5C4A3E]">
                <div className="w-6 h-6 rounded-lg bg-[#E07A5F] text-white flex items-center justify-center font-bold text-xs shadow-inner">
                  👤
                </div>
                <span>
                  <strong>Cute person popped up!</strong> Click/tap anywhere on the cafe floor to walk, or use arrow keys!
                </span>
              </div>

              {/* Avatar color picker */}
              <div className="flex items-center gap-2 text-xs text-[#7A6453]">
                <span>Avatar Clay Color:</span>
                <div className="flex gap-1.5">
                  {['#E07A5F', '#819B72', '#D4A373', '#3D405B', '#BC6C25'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setCharacterColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                        characterColor === color ? 'scale-125 border-white shadow-sm' : 'border-transparent'
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* The Main 2D Clay Cafe Interactive Floor */}
            <div className="relative">
              <div
                ref={floorRef}
                onClick={handleFloorClick}
                className="w-full h-[460px] md:h-[520px] rounded-3xl relative overflow-hidden cursor-crosshair select-none border-2 border-white/80 shadow-[inset_0_4px_12px_rgba(120,85,60,0.1)]"
                style={{
                  backgroundColor: '#ECE3D4',
                  backgroundImage: `
                    radial-gradient(#DACBB8 1.5px, transparent 1.5px),
                    linear-gradient(to right, rgba(230, 215, 195, 0.4) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(230, 215, 195, 0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                }}
              >
                {/* Visual cafe furniture zones */}
                {/* 1. Barista Counter along top center */}
                <div className="absolute top-4 left-[25%] right-[25%] h-24 rounded-2xl bg-[#D6C5B0] border-2 border-[#C5B099] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.7),0_8px_16px_rgba(120,95,75,0.15)] flex flex-col items-center justify-center p-2 pointer-events-none">
                  <div className="text-[11px] font-bold text-[#5A4535] uppercase tracking-wider mb-1">
                    ☕ Artisan Espresso Bar
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🫖</span>
                    <span className="text-xs bg-[#EAE0D2] px-2 py-0.5 rounded-lg text-[#6B5342] font-semibold">
                      Trishi's Roasting Deck
                    </span>
                    <span className="text-xl">🥐</span>
                  </div>
                </div>

                {/* 2. Window Booth (left side) */}
                <div className="absolute top-[52%] left-4 w-40 h-32 rounded-2xl bg-[#E2D5C3] border-2 border-[#D0BFAB] shadow-sm flex flex-col justify-between p-2 pointer-events-none">
                  <div className="text-[10px] font-bold text-[#6B5342]">🪟 Sunlit Window Booth</div>
                  <div className="w-16 h-10 rounded-xl bg-[#FAF6F0] mx-auto border border-[#D0BFAB] flex items-center justify-center text-xs">
                    🍵 🥐
                  </div>
                  <div className="text-[9px] text-[#8F7764] text-center">Cozy cushioned booth</div>
                </div>

                {/* 3. Outdoor Brick Patio (right side) */}
                <div className="absolute top-[55%] right-4 w-44 h-32 rounded-2xl bg-[#E8D0BE] border-2 border-[#D6BCAB] shadow-sm flex flex-col justify-between p-2 pointer-events-none">
                  <div className="text-[10px] font-bold text-[#80503B]">🪴 Pet Patio & Brick Terrace</div>
                  <div className="w-16 h-10 rounded-xl bg-[#FAF6F0] mx-auto border border-[#D6BCAB] flex items-center justify-center text-xs">
                    ☕ 🐾
                  </div>
                  <div className="text-[9px] text-[#80503B] text-center">Heated tiles & water bowl</div>
                </div>

                {/* 4. Center Wood Communal Table */}
                <div className="absolute top-[40%] left-[38%] w-36 h-20 rounded-2xl bg-[#DFD0BD] border border-[#CCAFA0] flex items-center justify-center text-center p-1 pointer-events-none">
                  <div className="text-[10px] font-bold text-[#6D5443]">
                    Communal Table<br />
                    <span className="text-[9px] font-normal text-[#8E7462]">Power plugs available</span>
                  </div>
                </div>

                {/* Decorative Clay Plants */}
                <div className="absolute bottom-4 left-6 text-2xl pointer-events-none">🪴</div>
                <div className="absolute bottom-4 right-6 text-2xl pointer-events-none">🌿</div>
                <div className="absolute top-6 left-6 text-2xl pointer-events-none">🌵</div>
                <div className="absolute top-6 right-6 text-2xl pointer-events-none">🍃</div>

                {/* Seated Patrons / Strangers / Friends */}
                {CAFE_PATRONS.map((patron) => {
                  const isSelected = activePatron?.id === patron.id;
                  return (
                    <div
                      key={patron.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePatron(patron);
                        setCharacterPos({ x: patron.x - 4, y: patron.y + 4 });
                      }}
                      style={{
                        left: `${patron.x}%`,
                        top: `${patron.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      className="absolute z-10 cursor-pointer group flex flex-col items-center"
                    >
                      {/* Avatar Circle with Clay styling */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-200 border-2 ${
                          isSelected
                            ? 'scale-125 border-[#E07A5F] shadow-[0_0_0_4px_rgba(224,122,95,0.25),0_10px_20px_rgba(0,0,0,0.15)] ring-2 ring-white'
                            : 'border-white shadow-[0_6px_12px_rgba(0,0,0,0.1)] group-hover:scale-110'
                        }`}
                        style={{ backgroundColor: patron.avatarColor }}
                      >
                        <span className="select-none">{patron.avatarFace}</span>
                      </div>

                      {/* Name tag */}
                      <div className="mt-1 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-lg text-[10px] font-bold text-[#3D2F25] shadow-xs border border-[#E8DFD3] whitespace-nowrap">
                        {patron.name}
                      </div>

                      {/* Proximity Ping Ring if selected */}
                      {isSelected && (
                        <div className="absolute -inset-2 rounded-full border border-[#E07A5F]/40 animate-ping pointer-events-none"></div>
                      )}
                    </div>
                  );
                })}

                {/* THE CUTE PERSON POPPED UP (Movable User Avatar) */}
                <div
                  style={{
                    left: `${characterPos.x}%`,
                    top: `${characterPos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: isWalking ? 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                  }}
                  className={`absolute z-20 pointer-events-none flex flex-col items-center ${
                    isWalking ? 'animate-character-walk' : ''
                  }`}
                >
                  {/* Avatar Sphere */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-[inset_2px_2px_4px_rgba(255,255,255,0.6),inset_-2px_-2px_4px_rgba(0,0,0,0.2),0_12px_24px_rgba(0,0,0,0.25)] border-2 border-white transition-colors"
                    style={{ backgroundColor: characterColor }}
                  >
                    <span className="select-none">🥰</span>
                  </div>

                  {/* "You" Tag */}
                  <div className="mt-1 bg-[#2C221B] text-white px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-md flex items-center gap-1">
                    <span>You ({user.name || 'Explorer'})</span>
                  </div>

                  {/* Shadow on floor */}
                  <div className="w-10 h-2.5 bg-black/15 rounded-full blur-[2px] mt-0.5"></div>
                </div>

                {/* Helpful click guidance overlay */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11px] text-[#6B5342] font-semibold border border-[#E8DFD3] pointer-events-none flex items-center gap-1.5 shadow-xs">
                  <Move className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>Tap anywhere on floor to walk</span>
                </div>
              </div>

              {/* Mobile / Screen Directional D-pad for easy control */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#7A6453]">Walk Controls:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveCharacter(-8, 0)}
                      className="clay-btn-secondary w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center cursor-pointer"
                      title="Move Left"
                    >
                      ←
                    </button>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveCharacter(0, -8)}
                        className="clay-btn-secondary w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center cursor-pointer"
                        title="Move Up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveCharacter(0, 8)}
                        className="clay-btn-secondary w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center cursor-pointer"
                        title="Move Down"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      onClick={() => moveCharacter(8, 0)}
                      className="clay-btn-secondary w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center cursor-pointer"
                      title="Move Right"
                    >
                      →
                    </button>
                  </div>
                </div>

                {/* Quick Teleport to any Patron */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#7A6453]">Talk to:</span>
                  {CAFE_PATRONS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActivePatron(p);
                        setCharacterPos({ x: p.x - 5, y: p.y + 4 });
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activePatron?.id === p.id
                          ? 'bg-[#E07A5F] text-white shadow-sm'
                          : 'bg-[#EAE2D6] text-[#4A3B2F] hover:bg-[#E2D8C9]'
                      }`}
                    >
                      {p.avatarFace} {p.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CLOUD BUBBLE DISPLAY VIEW (Compact, puffy cloud bubble, quick to understand, no tips) */}
            {activePatron && (
              <div className="flex flex-col items-center animate-fadeIn max-w-sm sm:max-w-md mx-auto my-3 relative">
                {/* Main Cloud Body */}
                <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border border-white/90 shadow-[0_14px_30px_rgba(70,55,40,0.12),inset_0_2px_4px_rgba(255,255,255,0.9)] relative flex items-center gap-3 w-full">
                  {/* Puffy Cloud Lobes */}
                  <div className="absolute -top-2 left-6 w-7 h-7 rounded-full bg-white/90 -z-10 pointer-events-none shadow-xs" />
                  <div className="absolute -top-3.5 left-14 w-9 h-9 rounded-full bg-white/95 -z-10 pointer-events-none shadow-xs" />
                  <div className="absolute -top-2 right-12 w-7 h-7 rounded-full bg-white/90 -z-10 pointer-events-none shadow-xs" />
                  <div className="absolute -bottom-1 left-10 w-5 h-5 rounded-full bg-white/90 -z-10 pointer-events-none shadow-xs" />

                  {/* Character Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg shadow-xs border-2 border-white shrink-0"
                    style={{ backgroundColor: activePatron.avatarColor }}
                  >
                    <span className="select-none">{activePatron.avatarFace}</span>
                  </div>

                  {/* Compact, Quick Review Content */}
                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex items-center gap-1.5 leading-none mb-1">
                      <span className="font-extrabold text-[#2C221B] text-xs font-['Outfit'] truncate">
                        {activePatron.name}
                      </span>
                      <span className="text-[10px] text-[#8A7565] bg-[#F2EDE4] px-1.5 py-0.5 rounded-full font-medium shrink-0">
                        {activePatron.tableLabel.split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#2C221B] leading-snug">
                      “{activePatron.quickReview || activePatron.quoteBubble.replace(/^[“"]|[”"]$/g, '')}”
                    </p>
                  </div>

                  {/* Quick Dismiss button */}
                  <button
                    onClick={() => setActivePatron(null)}
                    className="w-6 h-6 rounded-full bg-[#FAF5EE] hover:bg-[#EAE2D6] text-[#7A6453] hover:text-[#2C221B] flex items-center justify-center text-[10px] font-bold shadow-xs shrink-0 cursor-pointer transition-colors"
                    title="Close cloud"
                  >
                    ✕
                  </button>
                </div>

                {/* Little trailing cloud bubbles pointing down */}
                <div className="flex flex-col items-center gap-1 mt-1 -ml-16 pointer-events-none">
                  <div className="w-3.5 h-3.5 rounded-full bg-white/95 shadow-xs border border-white/80" />
                  <div className="w-2 h-2 rounded-full bg-white/90 shadow-xs border border-white/80" />
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
