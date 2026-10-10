import { Cafe, CafePatron, UserProfile } from '../types';

export const INITIAL_CAFES: Cafe[] = [
  {
    id: 'cafe-1',
    name: 'Mellow Hearth Roasters',
    type: 'cafe',
    oneLinerTag: 'The 3pm cortado sanctuary with zero influencer noise',
    neighborhood: 'Old Mill District',
    priceTier: '$$',
    friendMatchScore: 98,
    friendsVouchedCount: 7,
    rankingPosition: 1,
    criteria: {
      foodScore: 4.8,
      foodComment: 'Flaky sourdough melts and brown butter cardamom buns baked every 2 hours.',
      drinksScore: 4.9,
      drinksComment: 'Single-origin Ethiopian pour-over with jasmine floral notes, dialed-in perfectly.',
      ambienceScore: 4.7,
      ambienceComment: 'Warm terracotta tiles, soft acoustics, natural linen blinds, and quiet background lo-fi.',
      menuStyle: 'Nordic Minimalist Bakery & Specialty Micro-Roastery'
    },
    facilities: {
      vegFriendly: true,
      petFriendly: true,
      partyHall: false,
      parking: true,
      rooftopSeating: false,
      coworkingSpaces: true,
      boardGamesCafe: false
    },
    fusionItems: [
      {
        id: 'fi-1',
        name: 'Cardamom Espresso Tonic & Orange Peel',
        description: 'Double shot slow-dripped over artisanal tonic with freshly crushed green cardamom and flamed citrus.',
        price: '$6.50',
        friendReaction: 'Rohan: "Sounds weird, but tastes like liquid sunshine. Drink it immediately."'
      },
      {
        id: 'fi-2',
        name: 'Kimchi Gouda Croissant Bake',
        description: '24-hour aged kimchi sautéed in brown butter tucked inside twice-baked croissant dough with Dutch gouda.',
        price: '$7.80',
        friendReaction: 'Sarah: "The exact umami kick you need when you are hungover or coding."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-1',
        friendName: 'Sarah Lin',
        avatarColor: '#E07A5F',
        avatarEmoji: '👩🏻‍💻',
        verdict: 'Must Visit',
        reviewText: 'Google reviews kept talking about the matcha, which was honestly mid. But the pour-over and the kimchi croissant are 10/10. Sit in the back garden bench next to the olive tree!',
        whatToOrder: 'Cardamom Espresso Tonic + Kimchi Croissant',
        whatToAvoid: 'The iced matcha latte is sweetened powder syrup',
        visitedDate: '3 days ago',
        friendTrustBadge: 'Foodie Bestie · 18 shared visits'
      },
      {
        id: 'fr-2',
        friendName: 'Rohan Mehta',
        avatarColor: '#819B72',
        avatarEmoji: '☕',
        verdict: 'Good for Work',
        reviewText: 'Wi-Fi hits 180 Mbps. Every table on the left wall has discrete power outlets hidden beneath the wooden bench. Baristas never rush you even if you stay 3 hours.',
        whatToOrder: 'Single-origin batch brew (refills are only $2)',
        visitedDate: 'Last weekend',
        friendTrustBadge: 'Coworking Pal · 9 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 4.2,
      strangerQuote: '"Wait time was 12 mins and no oat milk pumpkin spice syrup! 1 star!" — Karen99 (Reviewer level 1)',
      friendTruthSummary: 'Your squad rates this 4.9. Don’t go for generic syrups; go for the handcrafted single-origin beans and serene work corners.'
    }
  },
  {
    id: 'cafe-2',
    name: 'The Dueling Dosa & Dice',
    type: 'cafe',
    oneLinerTag: 'Crispy fermented crepes meet 200+ tabletop board games',
    neighborhood: 'Arts Crossing',
    priceTier: '$',
    friendMatchScore: 94,
    friendsVouchedCount: 5,
    rankingPosition: 2,
    criteria: {
      foodScore: 4.9,
      foodComment: 'Paper-thin ghee podi dosas paired with unexpectedly spicy truffle dips.',
      drinksScore: 4.6,
      drinksComment: 'Filter coffee pulled in traditional brass dabarah with frothy caramelized jaggery.',
      ambienceScore: 4.9,
      ambienceComment: 'Giant wooden communal tables, game masters who teach rules in 3 minutes, cheerful energy.',
      menuStyle: 'South Indian Coastal meets European Boardgame Parlor'
    },
    facilities: {
      vegFriendly: true,
      petFriendly: false,
      partyHall: true,
      parking: false,
      rooftopSeating: false,
      coworkingSpaces: false,
      boardGamesCafe: true
    },
    fusionItems: [
      {
        id: 'fi-3',
        name: 'Truffle Masala Dosa Quesadilla Roll',
        description: 'Crisp lentil crepe rolled with spiced spiced Yukon mash, Monterey Jack cheese, and black truffle oil drizzle.',
        price: '$9.50',
        friendReaction: 'Marcus: "Ordered one for the table and ended up ordering two more because we fought over the last slice."'
      },
      {
        id: 'fi-4',
        name: 'Filter Kaapi Affogato',
        description: 'Piping hot chicory decoction poured table-side over salted Madagascar vanilla gelato.',
        price: '$6.00',
        friendReaction: 'Maya: "The thermal contrast is ridiculous. Best game night dessert ever."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-3',
        friendName: 'Maya Patel',
        avatarColor: '#D4A373',
        avatarEmoji: '🎲',
        verdict: 'Must Visit',
        reviewText: 'Google reviews complained that it was too noisy on Friday night. Well yes, people are having genuine fun playing Catan! Book a table on WhatsApp 1 day prior.',
        whatToOrder: 'Truffle Masala Dosa + Kaapi Affogato',
        whatToAvoid: 'The paneer sandwich is dry, stick to the dosas',
        visitedDate: '5 days ago',
        friendTrustBadge: 'Game Night Co-host · 12 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 3.9,
      strangerQuote: '"Too loud for my baby, people were cheering loudly over wooden dice" — Stranger_901',
      friendTruthSummary: 'Your friends love the vibrant energy! Perfect for 3-6 friend squads who want games + elite comfort food.'
    }
  },
  {
    id: 'cafe-3',
    name: 'Velvet Dusk Rooftop & Botanical Bar',
    type: 'restaurant',
    oneLinerTag: 'Lush sunset canopy with zero velvet-rope pretentious attitude',
    neighborhood: 'Highline Terrace',
    priceTier: '$$$',
    friendMatchScore: 91,
    friendsVouchedCount: 6,
    rankingPosition: 3,
    criteria: {
      foodScore: 4.7,
      foodComment: 'Smoked burrata with grilled peaches, fermented honey, and sourdough foccacia.',
      drinksScore: 4.9,
      drinksComment: 'Clarified yuzu mezcal cocktails and natural orange biodynamic wines.',
      ambienceScore: 5.0,
      ambienceComment: 'Unobstructed skyline view, real hanging philodendrons, dim Edison lamps, and chill acoustic jazz.',
      menuStyle: 'Mediterranean Tapas & Botanical Aperitivo'
    },
    facilities: {
      vegFriendly: true,
      petFriendly: true,
      partyHall: true,
      parking: true,
      rooftopSeating: true,
      coworkingSpaces: false,
      boardGamesCafe: false
    },
    fusionItems: [
      {
        id: 'fi-5',
        name: 'Masala Chai Tiramisu with Pistachio Bark',
        description: 'Ladyfingers soaked in double-strength Assam spiced black tea and rum, mascarpone cream infused with green cardamom.',
        price: '$11.00',
        friendReaction: 'Chloe: "I wanted to lick the ceramic plate. Far superior to coffee tiramisu."'
      },
      {
        id: 'fi-6',
        name: 'Matcha Wasabi Cacio e Pepe',
        description: 'Handmade tagliolini tossed with Pecorino Romano, toasted black tellicherry pepper, and gentle ceremonial matcha.',
        price: '$18.50',
        friendReaction: 'Alex: "The savory matcha cut through the heavy cheese effortlessly. Pure magic."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-4',
        friendName: 'Chloe Bennett',
        avatarColor: '#588157',
        avatarEmoji: '🍸',
        verdict: 'Hidden Gem',
        reviewText: 'Influencers on Instagram said it has a strict dress code. Total lie! We walked in wearing sneakers and jeans and the host was the sweetest human. Ask for seating near the west railing for sunset.',
        whatToOrder: 'Chai Tiramisu & Clarified Yuzu spritz',
        whatToAvoid: 'The truffle fries are standard frozen ones, skip them',
        visitedDate: '1 week ago',
        friendTrustBadge: 'Sunset Hunter · 14 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 4.1,
      strangerQuote: '"Felt intimidated by photos online thinking it is a club" — GoogleUser_77',
      friendTruthSummary: 'It looks fancy in photos but is actually hyper-cozy, dog-friendly, and hospitable.'
    }
  },
  {
    id: 'cafe-4',
    name: 'Neon Noodle & Bao Lab',
    type: 'restaurant',
    oneLinerTag: 'Slow-simmered bone broth and unexpected Mexican-Sichuan hand-pulled noodles',
    neighborhood: 'Chinatown Lofts',
    priceTier: '$$',
    friendMatchScore: 96,
    friendsVouchedCount: 8,
    rankingPosition: 4,
    criteria: {
      foodScore: 5.0,
      foodComment: 'Chewy biang biang noodles slapped fresh to order, chili oil infused with roasted cacao.',
      drinksScore: 4.5,
      drinksComment: 'Salted plum sodas, smoked barley tea on tap, and Taiwan craft lagers.',
      ambienceScore: 4.6,
      ambienceComment: 'Warm retro diner booths, open noodle theater counter, steam wafting in air.',
      menuStyle: 'Sichuan Hand-Pulled Noodles & Oaxaca Birria Fusion'
    },
    facilities: {
      vegFriendly: true,
      petFriendly: false,
      partyHall: false,
      parking: false,
      rooftopSeating: false,
      coworkingSpaces: false,
      boardGamesCafe: false
    },
    fusionItems: [
      {
        id: 'fi-7',
        name: 'Birria Hand-Pulled Biang Biang Noodles',
        description: 'Wide ribbon noodles swimming in slow-cooked beef shank birria consommé with pickled shallots and cilantro chili oil.',
        price: '$15.50',
        friendReaction: 'David: "The best fusion dish created in our city in the last 5 years. Non-negotiable order."'
      },
      {
        id: 'fi-8',
        name: 'Mala Crispy Enoki Mushroom Bao (Vegan)',
        description: 'Fluffy steamed bao stuffed with crackling enoki fried with numbing Sichuan pepper and lime vegan mayo.',
        price: '$9.00',
        friendReaction: 'Elena: "Crispiest bite of your life, even meat-eaters were stealing mine."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-5',
        friendName: 'David Zhang',
        avatarColor: '#3A5A40',
        avatarEmoji: '🍜',
        verdict: 'Must Visit',
        reviewText: 'Google has 3.8 stars because random tourists complained the noodle broth is too spicy. If you have an actual palate, this place is royalty. Get spice level 2 if you are sensitive.',
        whatToOrder: 'Birria Biang Biang + Salted Plum Fizz',
        whatToAvoid: 'The scallion pancake is a bit oily, stick to the baos',
        visitedDate: 'Yesterday',
        friendTrustBadge: 'Late Night Noodle Guru · 22 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 3.8,
      strangerQuote: '"Too spicy, my mouth was burning for an hour" — TouristReviewer',
      friendTruthSummary: 'Squad score: 4.9. Don’t trust spice-averse tourists! The depth of chili oil and handmade chew is legendary.'
    }
  },
  {
    id: 'cafe-5',
    name: 'Sage & Ceramic Living Room',
    type: 'cafe',
    oneLinerTag: 'Sip loose leaf oolong while surrounded by clay wheels and leafy pothos',
    neighborhood: 'Greenway Basin',
    priceTier: '$$',
    friendMatchScore: 93,
    friendsVouchedCount: 4,
    rankingPosition: 5,
    criteria: {
      foodScore: 4.5,
      foodComment: 'Fluffy Japanese soufflé pancakes and toasted sesame sourdough.',
      drinksScore: 4.9,
      drinksComment: 'Single-estate Taiwanese high mountain oolong and whipped matcha cloud cold brew.',
      ambienceScore: 5.0,
      ambienceComment: 'Sun-drenched skylights, handmade pottery you can drink from and purchase, zero rush.',
      menuStyle: 'Ceramic Studio & Zen Tea Lounge'
    },
    facilities: {
      vegFriendly: true,
      petFriendly: true,
      partyHall: false,
      parking: true,
      rooftopSeating: false,
      coworkingSpaces: true,
      boardGamesCafe: false
    },
    fusionItems: [
      {
        id: 'fi-9',
        name: 'Whipped Matcha Ube Foam Cloud',
        description: 'Ceremonial grade Uji matcha shaken with sweet coconut water, topped with purple sweet potato cream.',
        price: '$7.20',
        friendReaction: 'Zoe: "Not sickeningly sweet like Starbucks! Natural earthiness and silky foam."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-6',
        friendName: 'Zoe Morales',
        avatarColor: '#BC6C25',
        avatarEmoji: '🍵',
        verdict: 'Hidden Gem',
        reviewText: 'They serve drinks in wonky handmade clay mugs that feel so warm in your hands. Perfect spot to read a physical book on a rainy afternoon.',
        whatToOrder: 'Matcha Ube Cloud + Black Sesame Souffle pancake',
        whatToAvoid: 'No savoury dinner items, only teas and pastries',
        visitedDate: '4 days ago',
        friendTrustBadge: 'Slow Living Pal · 11 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 4.3,
      strangerQuote: '"Took 20 mins to get pancakes made fresh" — ImpatientUser_4',
      friendTruthSummary: 'It’s a slow-living pottery haven. Go when you have 45 minutes to unplug and breathe.'
    }
  }
];

export const INITIAL_USER: UserProfile = {
  name: 'Aarya',
  username: 'aarya_sancheti',
  avatarColor: '#E07A5F',
  squadName: 'The Weekend Coffee Seekers',
  coffeeTokens: 30,
  referralCode: 'AARYA-SQUAD-2026',
  successfulReferrals: 3,
  badges: ['Founding Member', 'Trishi’s Regular', 'Anti-Fake Review Crusader', 'Fusion Connoisseur'],
  history: [
    {
      cafeId: 'cafe-1',
      cafeName: 'Mellow Hearth Roasters',
      visitDate: 'Oct 8, 2026',
      myRating: 5,
      myNotes: 'Met Sarah and tested the Kimchi Gouda Croissant. Mind officially blown.',
      fusionTried: 'Kimchi Gouda Croissant'
    },
    {
      cafeId: 'cafe-2',
      cafeName: 'The Dueling Dosa & Dice',
      visitDate: 'Sep 29, 2026',
      myRating: 5,
      myNotes: 'Won 2 games of Wingspan and ate 3 orders of Truffle Dosa rolls.',
      fusionTried: 'Truffle Masala Dosa Quesadilla Roll'
    }
  ]
};

export const CAFE_PATRONS: CafePatron[] = [
  {
    id: 'patron-trishi',
    name: 'Trishi',
    role: 'Head Barista & Host',
    x: 50,
    y: 28,
    avatarColor: '#E07A5F',
    avatarFace: '👩🏽‍🍳',
    tableLabel: 'Espresso Bar Counter',
    quoteBubble: '“Welcome in! Remember: strangers rate on star inflation, but your real friends tell you if the milk is steamed right!”',
    quickReview: 'Fresh single-origin roast. Friends tell the real truth!',
    spotDetail: 'Pulling fresh single-origin espresso with smooth tactile clay cups.',
    recommendedFusion: 'Cardamom Espresso Tonic & Warm Oat Milk'
  },
  {
    id: 'patron-sarah',
    name: 'Sarah & Dev',
    role: 'Close Friends (Your Squad)',
    x: 20,
    y: 65,
    avatarColor: '#819B72',
    avatarFace: '👥',
    tableLabel: 'Sunlit Window Booth',
    quoteBubble: '“Hey! We saw a 5-star review claiming the matcha was amazing, but we tasted it—total syrup! Get the Kimchi Croissant instead, it is insane!”',
    quickReview: 'Skip the syrup matcha! Kimchi Croissant is 10/10 elite.',
    spotDetail: 'Sharing a fresh pastry while pointing out the best sunlit window spots.',
    recommendedFusion: 'Kimchi Gouda Croissant Bake'
  },
  {
    id: 'patron-marcus',
    name: 'Marcus & Biscuit (Pup)',
    role: 'Friend · Pet Explorer',
    x: 78,
    y: 72,
    avatarColor: '#D4A373',
    avatarFace: '🐕',
    tableLabel: 'Outdoor Brick Patio',
    quoteBubble: '“The patio has heated terracotta tiles for dogs, plus Biscuit got a complimentary puppuccino with peanut butter foam!”',
    quickReview: 'Heated patio tiles for dogs + free peanut puppuccinos!',
    spotDetail: 'Sipping a slow batch brew while Biscuit naps on a warm woven mat.',
    recommendedFusion: 'Salted Peanut Butter Cold Brew'
  },
  {
    id: 'patron-elena',
    name: 'Elena',
    role: 'Friend · Coworking Pro',
    x: 32,
    y: 35,
    avatarColor: '#588157',
    avatarFace: '💻',
    tableLabel: 'Quiet Oak Work Bench',
    quoteBubble: '“Wi-Fi password is right under the clay coaster. Zero phone calls allowed in this section so you can actually write deep work.”',
    quickReview: '180 Mbps Wi-Fi & whisper quiet. Perfect for deep focus.',
    spotDetail: 'Focused on laptop with noise-canceling headphones and a steaming Cortado.',
    recommendedFusion: 'Double Cortado with Oat Milk'
  },
  {
    id: 'patron-rohan',
    name: 'Rohan',
    role: 'Friend · Boardgame Guru',
    x: 82,
    y: 32,
    avatarColor: '#BC6C25',
    avatarFace: '🎲',
    tableLabel: 'Corner Lounge Table',
    quoteBubble: '“Google reviews were complaining about wait times, but that’s because everything is hand-ground. Bring a game, relax!”',
    quickReview: 'Freshly hand-ground coffee. Bring a board game and chill!',
    spotDetail: 'Setting up a quick card game while waiting for pour-overs.',
    recommendedFusion: 'Filter Kaapi Affogato'
  }
];
