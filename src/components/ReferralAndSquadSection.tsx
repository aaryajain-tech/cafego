import React, { useState } from 'react';
import { Users, Gift, Share2, Copy, Check, Sparkles, Coffee, Award, ArrowRight, AlertCircle } from 'lucide-react';
import { UserProfile } from '../types';
import { sanitizeInput, isValidEmail } from '../utils/security';

interface ReferralAndSquadSectionProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const ReferralAndSquadSection: React.FC<ReferralAndSquadSectionProps> = ({
  user,
  onUpdateUser,
}) => {
  const [copied, setCopied] = useState(false);
  const [newSquadName, setNewSquadName] = useState(user.squadName);
  const [isEditingSquad, setIsEditingSquad] = useState(false);
  const [simulatedFriendEmail, setSimulatedFriendEmail] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const inviteLink = `https://cafego.app/join?ref=${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = simulatedFriendEmail.trim();
    if (!cleanEmail) return;

    if (!isValidEmail(cleanEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setEmailError(null);
    setInviteSuccess(true);
    onUpdateUser({
      successfulReferrals: (user.successfulReferrals || 0) + 1,
      coffeeTokens: (user.coffeeTokens || 0) + 10,
    });
    setSimulatedFriendEmail('');
    setTimeout(() => setInviteSuccess(false), 4000);
  };

  const handleSaveSquad = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = sanitizeInput(newSquadName, 40);
    if (cleanName.trim()) {
      onUpdateUser({ squadName: cleanName.trim() });
      setIsEditingSquad(false);
    }
  };

  return (
    <section id="referral" className="py-2 max-w-7xl mx-auto px-1 sm:px-2">
      <div id="squads" className="scroll-mt-24" />

      {/* Horizontal Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#E8DFD3]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E07A5F] uppercase tracking-wider mb-1">
            <Gift className="w-4 h-4" />
            <span>Squad Circle & Referral Rewards</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2C221B] font-['Outfit']">
            Invite Friends. Share Honest Bites.
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5546]">
            Cut through fake ratings with your real dining circle and earn coffee tokens together.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#FAF3EA] border border-[#EBDCCF] px-3.5 py-2 rounded-2xl shrink-0 self-start sm:self-center">
          <span className="text-xs font-bold text-[#7A6453]">Token Wallet:</span>
          <span className="text-sm font-extrabold text-[#E07A5F]">{user.coffeeTokens} ☕</span>
        </div>
      </div>

      <div className="space-y-6">

        {/* Horizontal Section 1: Squad & Friend Group Management */}
        <div className="clay-card-warm p-5 md:p-6 border border-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DFD3]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#819B72] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-lg text-[#2C221B]">{user.squadName}</h3>
                  <span className="text-[11px] font-bold text-[#819B72] bg-[#EEF5EA] px-2 py-0.5 rounded-lg border border-[#D5E8CE]">
                    6 Verified Friends
                  </span>
                </div>
                <p className="text-xs text-[#7A6453]">Active dining & cafe voting circle</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isEditingSquad ? (
                <button
                  onClick={() => setIsEditingSquad(true)}
                  className="clay-btn-secondary px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#5C4A3E] cursor-pointer"
                >
                  Rename Squad
                </button>
              ) : null}
            </div>
          </div>

          {isEditingSquad && (
            <form onSubmit={handleSaveSquad} className="flex gap-2">
              <input
                type="text"
                value={newSquadName}
                onChange={(e) => setNewSquadName(e.target.value)}
                className="clay-inset flex-1 px-3 py-2 rounded-xl text-xs font-bold text-[#2C221B] focus:outline-none"
                placeholder="Enter squad name..."
              />
              <button
                type="submit"
                className="clay-btn-primary px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingSquad(false)}
                className="clay-btn-secondary px-3 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}

          {/* Horizontal Grid of Squad Members */}
          <div>
            <span className="text-[11px] font-bold text-[#8A7565] uppercase tracking-wider block mb-2">
              Circle Members & Recent Activity:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { name: 'Sarah Lin', role: 'Filter Kaapi Aficionado', visit: 'Reviewed Trishi’s 2d ago', color: '#E07A5F' },
                { name: 'Rohan Mehta', role: 'Wi-Fi & Pour-Over Scout', visit: 'Saved 4 Alwarpet spots', color: '#819B72' },
                { name: 'Maya Patel', role: 'Boardgame Master', visit: 'Booked table at Board & Brew', color: '#D4A373' },
                { name: 'Marcus & Biscuit', role: 'Pet Patio Specialist', visit: 'Added pet friendly tag', color: '#588157' },
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-2.5 p-2.5 bg-white rounded-xl border border-[#EDE4D8] text-xs shadow-2xs">
                  <div
                    style={{ backgroundColor: member.color }}
                    className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs shadow-inner shrink-0"
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-[#2C221B] truncate block">{member.name}</span>
                    <span className="text-[10px] text-[#8A7565] truncate block">{member.role}</span>
                    <span className="text-[10px] text-[#6B5546] font-medium truncate block">{member.visit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Squad Shared Target Banner */}
          <div className="p-3 rounded-xl bg-[#F4EDE2] border border-[#E4D9C8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E07A5F] shrink-0" />
              <span className="text-[#6B5546]">
                <strong className="text-[#2C221B]">Squad Target This Weekend:</strong> 3 members voted to try the <strong>Cardamom Filter Kaapi Bun</strong> at Trishi’s in Alwarpet!
              </span>
            </div>
            <span className="text-[#819B72] font-bold bg-[#EEF5EA] px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-center">
              3 Votes Vouched
            </span>
          </div>
        </div>

        {/* Horizontal Section 2: Referral Program & Token Rewards */}
        <div className="clay-card p-5 md:p-6 border-2 border-white space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DFD3]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-[#2C221B]">Referral Program</h3>
                <p className="text-xs text-[#7A6453]">Earn 10 free coffee tokens for every friend who joins your circle</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#5C4A3E]">Referral Tier Status:</span>
              <span className="text-xs font-extrabold text-[#E07A5F] bg-[#FAF3EA] px-2.5 py-1 rounded-lg border border-[#EBDCCF]">
                {user.successfulReferrals} Friends Joined
              </span>
            </div>
          </div>

          {/* Horizontal 2-Column Action Inputs */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left: Referral Link */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453]">
                Your Personal Referral Link
              </label>
              <div className="flex items-center gap-2">
                <div className="clay-inset flex-1 px-3 py-2.5 rounded-xl text-xs font-mono font-semibold text-[#2C221B] truncate select-all">
                  {inviteLink}
                </div>
                <button
                  onClick={handleCopy}
                  className="clay-btn-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Direct Email Invite */}
            <form onSubmit={handleSendInvite} className="space-y-1.5">
              <label htmlFor="friend-email-input" className="block text-xs font-bold uppercase tracking-wider text-[#7A6453]">
                Invite A Friend Directly via Email
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="friend-email-input"
                  type="email"
                  required
                  value={simulatedFriendEmail}
                  onChange={(e) => {
                    setSimulatedFriendEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder="friend@example.com"
                  className="clay-inset flex-1 px-3 py-2.5 rounded-xl text-xs font-medium text-[#2C221B] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                />
                <button
                  type="submit"
                  aria-label="Send email invite and earn 10 coffee tokens"
                  className="clay-btn-secondary px-4 py-2.5 rounded-xl text-xs font-bold text-[#2C221B] cursor-pointer shrink-0 whitespace-nowrap"
                >
                  Send Invite (+10 ☕)
                </button>
              </div>
              {emailError && (
                <div role="alert" className="text-xs font-bold text-[#C84B31] bg-[#FDF0ED] p-2 rounded-xl border border-[#F5C7BC] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{emailError}</span>
                </div>
              )}
            </form>
          </div>

          {inviteSuccess && (
            <div className="text-xs font-bold text-[#819B72] bg-[#EEF5EA] p-2.5 rounded-xl border border-[#D7E9D0] flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>Invite sent! +10 Coffee Tokens credited to your wallet.</span>
            </div>
          )}

          {/* Horizontal Referral Tier Badges */}
          <div className="pt-3 border-t border-[#E8DFD3]">
            <div className="text-[11px] font-bold text-[#8A7565] uppercase tracking-wider mb-2">
              Perks & Milestones:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EAE1D3]">
                <span className="font-semibold text-[#2C221B]">1 Friend: 2 Free Pour-Overs</span>
                <span className="text-[#819B72] font-bold text-[11px] shrink-0">✓ Unlocked</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EAE1D3]">
                <span className="font-semibold text-[#2C221B]">3 Friends: VIP Clay Badge</span>
                <span className="text-[#819B72] font-bold text-[11px] shrink-0">✓ Unlocked</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EAE1D3]">
                <span className="font-semibold text-[#2C221B]">5 Friends: ₹500 Bakery Pass</span>
                <span className="text-[#8A7565] font-semibold text-[11px] shrink-0">{Math.max(0, 5 - user.successfulReferrals)} to go</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
