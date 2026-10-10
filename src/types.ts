export interface FriendReview {
  id: string;
  friendName: string;
  avatarColor: string;
  avatarEmoji: string;
  verdict: 'Must Visit' | 'Skip the Hype' | 'Hidden Gem' | 'Good for Work';
  reviewText: string;
  whatToOrder: string;
  whatToAvoid?: string;
  visitedDate: string;
  friendTrustBadge: string;
}

export interface FusionItem {
  id: string;
  name: string;
  description: string;
  price: string;
  friendReaction: string;
}

export interface CafeReviewCriteria {
  foodScore: number;
  foodComment: string;
  drinksScore: number;
  drinksComment: string;
  ambienceScore: number;
  ambienceComment: string;
  menuStyle: string;
}

export interface Facilities {
  vegFriendly: boolean;
  petFriendly: boolean;
  partyHall: boolean;
  parking: boolean;
  rooftopSeating: boolean;
  coworkingSpaces: boolean;
  boardGamesCafe: boolean;
}

export interface Cafe {
  id: string;
  name: string;
  type: 'cafe' | 'restaurant';
  oneLinerTag: string;
  neighborhood: string;
  priceTier: '$' | '$$' | '$$$';
  friendMatchScore: number; // 0 - 100%
  friendsVouchedCount: number;
  criteria: CafeReviewCriteria;
  facilities: Facilities;
  fusionItems: FusionItem[];
  friendReviews: FriendReview[];
  strangerTruthComparison: {
    strangerRating: number;
    strangerQuote: string;
    friendTruthSummary: string;
  };
  rankingPosition: number;
}

export interface UserProfile {
  name: string;
  username: string;
  avatarColor: string;
  squadName: string;
  coffeeTokens: number;
  referralCode: string;
  successfulReferrals: number;
  badges: string[];
  history: {
    cafeId: string;
    cafeName: string;
    visitDate: string;
    myRating: number;
    myNotes: string;
    fusionTried: string;
  }[];
}

export interface CafePatron {
  id: string;
  name: string;
  role: string;
  x: number; // percentage in scene 0-100
  y: number; // percentage in scene 0-100
  avatarColor: string;
  avatarFace: string;
  quoteBubble: string;
  quickReview?: string;
  spotDetail: string;
  tableLabel: string;
  recommendedFusion: string;
}
