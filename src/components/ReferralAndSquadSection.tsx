import React, { useState } from 'react';
import { Users, Gift, Share2, Copy, Check, Sparkles, Coffee, Award, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

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

  const inviteLink = `https://cafego.app/join?ref=${user.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedFriendEmail) return;
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
    if (newSquadName.trim()) {
      onUpdateUser({ squadName: newSquadName.trim() });
      setIsEditingSquad(false);
    }
  };

  return (
    <section id="referral" className="py-12 max-w-7xl mx-auto px-4 md:px-8">
      <div id="squads" className="scroll-mt-24" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E07A5F] uppercase tracking-wider">
          <Gift className="w-4 h-4" />
          <span>Form Your Squad · Referral Program</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C221B] font-['Outfit']">
          Invite Your Friends. Share Honest Bites.
        </h2>
        <p className="text-base text-[#6B5546]">
          You can't believe strangers on Google. So form a squad, invite your friends,
          let them review spots, and enjoy free coffee tokens together.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Squad & Friend Group Management */}
        <div className="lg:col-span-6 space-y-6">
          <div className="clay-card-warm p-6 md:p-8 border border-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#819B72] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#2C221B]">Your Foodie Squad</h3>
                  <p className="text-xs text-[#7A6453]">Active dining & cafe voting circle</p>
                </div>
              </div>

              {!isEditingSquad ? (
                <button
                  onClick={() => setIsEditingSquad(true)}
                  className="clay-btn-secondary px-3 py-1.5 rounded-xl text-xs font-bold text-[#5C4A3E] cursor-pointer"
                >
                  Rename Squad
                </button>
              ) : null}
            </div>

            {isEditingSquad ? (
              <form onSubmit={handleSaveSquad} className="my-4 flex gap-2">
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
              </form>
            ) : (
              <div className="my-4 p-3 bg-[#FAF6F0] rounded-2xl border border-[#EAE0D0] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#8A7565] uppercase">Current Squad</span>
                  <div className="text-base font-extrabold text-[#2C221B]">{user.squadName}</div>
                </div>
                <span className="text-xs font-bold text-[#819B72] bg-[#EEF5EA] px-2.5 py-1 rounded-lg">
                  6 Verified Friends
                </span>
              </div>
            )}

            {/* Squad Members List */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-[#8A7565] uppercase tracking-wider block">
                Circle Members & Recent Activity:
              </span>

              <div className="space-y-2">
                {[
                  { name: 'Sarah Lin', role: 'Cardamom Bun Aficionado', visit: 'Reviewed Mellow Hearth 3d ago', color: '#E07A5F' },
                  { name: 'Rohan Mehta', role: 'Wi-Fi & Pour-Over Scout', visit: 'Saved 4 coworking spots', color: '#819B72' },
                  { name: 'Maya Patel', role: 'Boardgame Master', visit: 'Booked table at Dueling Dosa', color: '#D4A373' },
                  { name: 'Marcus & Biscuit', role: 'Pet Patio Specialist', visit: 'Added dog friendly tag', color: '#588157' },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-[#EDE4D8] text-xs">
                    <div className="flex items-center gap-2.5">
                      <div
                        style={{ backgroundColor: member.color }}
                        className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs shadow-inner"
                      >
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-[#2C221B]">{member.name}</span>
                        <span className="text-[11px] text-[#8A7565] block">{member.role}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#6B5546] font-medium">{member.visit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Squad Bucket List Concept */}
            <div className="mt-5 p-4 rounded-2xl bg-[#F4EDE2] border border-[#E4D9C8] space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#2C221B]">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>Squad Shared Weekend Target</span>
              </div>
              <p className="text-xs text-[#6B5546]">
                3 of your friends voted to try the <strong>Birria Hand-Pulled Biang Biang Noodles</strong> at Neon Noodle this Saturday!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Referral Program & Token Rewards */}
        <div className="lg:col-span-6 space-y-6">
          <div className="clay-card p-6 md:p-8 border-2 border-white">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD3]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E07A5F] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#2C221B]">Referral Program</h3>
                  <p className="text-xs text-[#7A6453]">Earn coffee tokens for every friend who joins</p>
                </div>
              </div>

              <div className="bg-[#FAF3EA] px-3 py-1 rounded-xl text-xs font-bold text-[#E07A5F] border border-[#EBDCCF]">
                {user.coffeeTokens} Tokens ☕
              </div>
            </div>

            {/* Quick Share Link Box */}
            <div className="my-5 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453]">
                Your Personal Referral Link
              </label>
              <div className="flex items-center gap-2">
                <div className="clay-inset flex-1 px-3.5 py-3 rounded-2xl text-xs font-mono font-semibold text-[#2C221B] truncate select-all">
                  {inviteLink}
                </div>
                <button
                  onClick={handleCopy}
                  className="clay-btn-primary px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Send Invite Box */}
            <form onSubmit={handleSendInvite} className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#7A6453]">
                Invite A Friend Directly via Email
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  value={simulatedFriendEmail}
                  onChange={(e) => setSimulatedFriendEmail(e.target.value)}
                  placeholder="friend@example.com"
                  className="clay-inset flex-1 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#2C221B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="clay-btn-secondary px-4 py-2.5 rounded-xl text-xs font-bold text-[#2C221B] cursor-pointer shrink-0"
                >
                  Send Invite (+10 ☕)
                </button>
              </div>
              {inviteSuccess && (
                <div className="text-xs font-bold text-[#819B72] bg-[#EEF5EA] p-2.5 rounded-xl border border-[#D7E9D0] flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Invite sent! +10 Coffee Tokens credited to your wallet.</span>
                </div>
              )}
            </form>

            {/* Referral Perks Progression Bar */}
            <div className="mt-6 pt-5 border-t border-[#E8DFD3] space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#5C4A3E]">Referral Tier Status:</span>
                <span className="text-[#E07A5F]">{user.successfulReferrals} Friends Joined</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FAF6F0] border border-[#EAE1D3]">
                  <span className="font-semibold text-[#2C221B]">1 Friend: 2 Free Pour-Overs at Trishi's</span>
                  <span className="text-[#819B72] font-bold">✓ Unlocked</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FAF6F0] border border-[#EAE1D3]">
                  <span className="font-semibold text-[#2C221B]">3 Friends: Squad VIP Clay Badge</span>
                  <span className="text-[#819B72] font-bold">✓ Unlocked</span>
                </div>
                <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#FAF6F0] border border-[#EAE1D3]">
                  <span className="font-semibold text-[#2C221B]">5 Friends: $25 Artisan Bakery Pass</span>
                  <span className="text-[#8A7565] font-semibold">{5 - user.successfulReferrals} more to go</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
