import React, { useState } from 'react';
import { X, User, Coffee, Award, Calendar, Share2, Sparkles, Check, History, Edit3 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  user,
  isOpen,
  onClose,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name: name.trim(), username: username.trim() });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div 
        className="clay-card-warm max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 border-2 border-white shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-[#7A6453] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-[#E8DFD3]">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),0_8px_16px_rgba(0,0,0,0.15)] border-2 border-white"
            style={{ backgroundColor: user.avatarColor }}
          >
            {user.name.charAt(0)}
          </div>

          <div className="flex-1">
            {!isEditing ? (
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-extrabold text-[#2C221B] font-['Outfit']">
                    {user.name}
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-[#8A7565] hover:text-[#2C221B] transition-colors cursor-pointer"
                    title="Edit profile"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-[#7A6453] font-mono">@{user.username}</p>
                <span className="text-[11px] font-bold text-[#819B72] bg-[#EEF5EA] px-2 py-0.5 rounded-md mt-1 inline-block">
                  Squad: {user.squadName}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="clay-inset w-full px-3 py-1.5 rounded-xl text-xs font-bold text-[#2C221B]"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="clay-inset w-full px-3 py-1.5 rounded-xl text-xs font-mono text-[#2C221B]"
                />
                <button
                  type="submit"
                  className="clay-btn-primary px-3 py-1 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Profile
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Metric Badges Strip */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="clay-card p-3.5 text-center border border-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7565] block">
              Coffee Tokens
            </span>
            <div className="text-2xl font-extrabold text-[#E07A5F] mt-1 tabular-nums">
              {user.coffeeTokens} ☕
            </div>
            <span className="text-[10px] text-[#7A6453]">Earned from reviews & invites</span>
          </div>

          <div className="clay-card p-3.5 text-center border border-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A7565] block">
              Successful Invites
            </span>
            <div className="text-2xl font-extrabold text-[#819B72] mt-1 tabular-nums">
              {user.successfulReferrals}
            </div>
            <span className="text-[10px] text-[#7A6453]">Verified foodie friends</span>
          </div>
        </div>

        {/* Clay Badges Section */}
        <div className="mb-6 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A6453]">
            <Award className="w-4 h-4 text-[#D4A373]" />
            <span>Earned Clay Badges</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((b, i) => (
              <span
                key={i}
                className="clay-bubble px-3 py-1.5 text-xs font-bold text-[#3D2F25] border border-white/90 shadow-xs"
              >
                🏅 {b}
              </span>
            ))}
          </div>
        </div>

        {/* Profile History Section (Visited Spots & Reviews) */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7A6453]">
            <History className="w-4 h-4 text-[#819B72]" />
            <span>Profile Visit History ({user.history.length})</span>
          </div>

          <div className="space-y-2.5">
            {user.history.map((item, idx) => (
              <div key={idx} className="clay-card p-3.5 space-y-1.5 border border-white">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#2C221B]">{item.cafeName}</span>
                  <span className="text-[#8A7565]">{item.visitDate}</span>
                </div>
                <div className="text-xs text-amber-500">
                  {'★'.repeat(item.myRating)} <span className="text-[#7A6453] text-[11px]">({item.myRating}/5 squad rating)</span>
                </div>
                <p className="text-xs text-[#6B5546] italic">“{item.myNotes}”</p>
                <div className="text-[11px] text-[#E07A5F] font-bold">
                  Fusion dish ordered: {item.fusionTried}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Code Footer */}
        <div className="mt-7 pt-4 border-t border-[#E8DFD3] flex items-center justify-between text-xs">
          <div>
            <span className="text-[#8A7565] font-semibold">Your Referral Code:</span>
            <span className="font-mono font-bold text-[#2C221B] ml-2 bg-[#EFE8DD] px-2 py-0.5 rounded-md">
              {user.referralCode}
            </span>
          </div>
          <button
            onClick={onClose}
            className="clay-btn-secondary px-4 py-2 rounded-xl font-bold text-xs cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
