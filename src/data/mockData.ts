import { Cafe, CafePatron, UserProfile } from '../types';

export const INITIAL_CAFES: Cafe[] = [
  {
    id: 'cafe-1',
    name: 'Mellow Hearth Roasters',
    type: 'cafe',
    oneLinerTag: 'The 3pm cortado & pour-over sanctuary away from TTK Road traffic',
    neighborhood: 'Alwarpet, Chennai',
    priceTier: '₹₹',
    friendMatchScore: 98,
    friendsVouchedCount: 7,
    rankingPosition: 1,
    criteria: {
      foodScore: 4.8,
      foodComment: 'Flaky sourdough melts and brown butter cardamom buns baked fresh every 2 hours.',
      drinksScore: 4.9,
      drinksComment: 'Single-origin Araku Valley pour-over with jasmine floral notes, dialed-in on Kalita Wave.',
      ambienceScore: 4.7,
      ambienceComment: 'Warm terracotta tiles, soft acoustics, natural linen blinds, and quiet background lo-fi.',
      menuStyle: 'Specialty Micro-Roastery & Artisanal Sourdough Bakery'
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
        name: 'Cardamom Espresso Tonic & Valencia Orange Peel',
        description: 'Double shot slow-dripped over artisanal tonic with freshly crushed green cardamom and flamed citrus.',
        price: '₹280',
        friendReaction: 'Rohan: "Sounds weird, but tastes like liquid sunshine in the Chennai heat. Drink it immediately."'
      },
      {
        id: 'fi-2',
        name: 'Kimchi Gouda Croissant Bake',
        description: '24-hour aged kimchi sautéed in brown butter tucked inside twice-baked croissant dough with Dutch gouda.',
        price: '₹340',
        friendReaction: 'Sarah: "The exact umami kick you need when you are hungover or coding in Alwarpet."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-1',
        friendName: 'Sarah Lin',
        avatarColor: '#E07A5F',
        avatarEmoji: '👩🏻‍💻',
        verdict: 'Must Visit',
        reviewText: 'Google reviews kept talking about the generic cold coffee, which was honestly mid. But the Araku pour-over and the kimchi croissant are 10/10. Sit in the back garden bench next to the frangipani tree!',
        whatToOrder: 'Cardamom Espresso Tonic + Kimchi Croissant',
        whatToAvoid: 'The iced flavored latte is sweetened powder syrup',
        visitedDate: '3 days ago',
        friendTrustBadge: 'Foodie Bestie · 18 shared visits'
      },
      {
        id: 'fr-2',
        friendName: 'Rohan Mehta',
        avatarColor: '#819B72',
        avatarEmoji: '☕',
        verdict: 'Good for Work',
        reviewText: 'Wi-Fi hits 180 Mbps. Every table on the left wall has discrete power outlets hidden beneath the teak bench. Baristas never rush you even during busy Alwarpet afternoons.',
        whatToOrder: 'Single-origin batch brew (refills are only ₹90)',
        visitedDate: 'Last weekend',
        friendTrustBadge: 'Coworking Pal · 9 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 4.2,
      strangerQuote: '"Wait time was 12 mins and no pumpkin spice syrup! 1 star!" — Tourist_44',
      friendTruthSummary: 'Your Chennai squad rates this 4.9. Don’t go for generic syrups; go for the handcrafted single-origin beans and serene work corners.'
    }
  },
  {
    id: 'cafe-2',
    name: 'The Dueling Dosa & Dice',
    type: 'cafe',
    oneLinerTag: 'Paper-thin ghee podi dosas meet 200+ tabletop board games near Luz Corner',
    neighborhood: 'Mylapore, Chennai',
    priceTier: '₹',
    friendMatchScore: 94,
    friendsVouchedCount: 5,
    rankingPosition: 2,
    criteria: {
      foodScore: 4.9,
      foodComment: 'Paper-thin ghee podi dosas paired with unexpectedly spicy truffle coconut dips.',
      drinksScore: 4.6,
      drinksComment: 'Filter coffee pulled in traditional brass dabarah with frothy caramelized jaggery.',
      ambienceScore: 4.9,
      ambienceComment: 'Giant wooden communal tables, game masters who teach rules in 3 minutes, cheerful Mylapore buzz.',
      menuStyle: 'South Indian Coastal meets Heritage Boardgame Parlor'
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
        name: 'Truffle Ghee Podi Dosa Quesadilla Roll',
        description: 'Crisp lentil crepe rolled with spiced spiced potato mash, Monterey Jack cheese, and black truffle oil drizzle.',
        price: '₹220',
        friendReaction: 'Marcus: "Ordered one for the table and ended up ordering two more because we fought over the last slice."'
      },
      {
        id: 'fi-4',
        name: 'Filter Kaapi Affogato',
        description: 'Piping hot Kumbakonam chicory decoction poured table-side over salted Madagascar vanilla gelato.',
        price: '₹180',
        friendReaction: 'Maya: "The thermal contrast is ridiculous. Best game night dessert in Chennai."'
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
        whatToOrder: 'Truffle Podi Dosa + Kaapi Affogato',
        whatToAvoid: 'The paneer sandwich is dry, stick to the hot dosas',
        visitedDate: '5 days ago',
        friendTrustBadge: 'Game Night Co-host · 12 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 3.9,
      strangerQuote: '"Too loud for my baby, people were cheering loudly over wooden dice" — RandomStranger_9',
      friendTruthSummary: 'Your friends love the vibrant energy! Perfect for 3-6 friend squads who want games + elite comfort food in Mylapore.'
    }
  },
  {
    id: 'cafe-3',
    name: 'Velvet Dusk Rooftop & Botanical Bar',
    type: 'restaurant',
    oneLinerTag: 'Lush coastal sunset canopy with sea breezes and zero pretentious club noise',
    neighborhood: 'ECR (East Coast Road), Chennai',
    priceTier: '₹₹₹',
    friendMatchScore: 91,
    friendsVouchedCount: 6,
    rankingPosition: 3,
    criteria: {
      foodScore: 4.7,
      foodComment: 'Smoked burrata with grilled peaches, fermented honey, and sourdough foccacia.',
      drinksScore: 4.9,
      drinksComment: 'Cold-pressed kokum spritzers and clarified yuzu botanical mocktails.',
      ambienceScore: 5.0,
      ambienceComment: 'Unobstructed Bay of Bengal sea breeze, real hanging philodendrons, dim Edison lamps, and chill acoustic jazz.',
      menuStyle: 'Coastal Mediterranean Tapas & Cold-Pressed Botanical Bar'
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
        description: 'Ladyfingers soaked in double-strength Nilgiri spiced black tea, mascarpone cream infused with green cardamom.',
        price: '₹380',
        friendReaction: 'Chloe: "I wanted to lick the ceramic plate. Far superior to generic coffee tiramisu."'
      },
      {
        id: 'fi-6',
        name: 'Curry Leaf & Passionfruit Spritzer',
        description: 'Crisp sparkling botanical soda infused with flash-fried coastal curry leaves and fresh passionfruit pulp.',
        price: '₹290',
        friendReaction: 'Alex: "The savory curry leaf aroma with fizzy tart fruit is pure coastal magic."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-4',
        friendName: 'Chloe Bennett',
        avatarColor: '#588157',
        avatarEmoji: '🍸',
        verdict: 'Hidden Gem',
        reviewText: 'Influencers on Instagram said it has a strict dress code. Total lie! We walked in wearing sneakers and linen shorts and the host was the sweetest human. Ask for seating near the east railing for the sunset sea breeze.',
        whatToOrder: 'Chai Tiramisu & Curry Leaf Spritzer',
        whatToAvoid: 'The truffle fries are standard frozen ones, skip them',
        visitedDate: '1 week ago',
        friendTrustBadge: 'Sunset Hunter · 14 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 4.1,
      strangerQuote: '"Felt intimidated by photos online thinking it is a nightclub" — GoogleUser_77',
      friendTruthSummary: 'It looks fancy in photos but is actually hyper-cozy, dog-friendly, and hospitable.'
    }
  },
  {
    id: 'cafe-4',
    name: 'Kaviri Kaapi & Bao Lab',
    type: 'restaurant',
    oneLinerTag: 'Chettinad spiced pulled jackfruit baos & hand-pulled noodles off KNK Road',
    neighborhood: 'Nungambakkam, Chennai',
    priceTier: '₹₹',
    friendMatchScore: 96,
    friendsVouchedCount: 8,
    rankingPosition: 4,
    criteria: {
      foodScore: 5.0,
      foodComment: 'Chettinad spiced biang biang noodles slapped fresh to order, chili oil infused with roasted fennel and star anise.',
      drinksScore: 4.5,
      drinksComment: 'Madurai malli iced cold brews, salted nannari fizz on tap.',
      ambienceScore: 4.6,
      ambienceComment: 'Warm retro diner booths, open noodle theater counter, steam wafting in air.',
      menuStyle: 'Chettinad Meets Sichuan Hand-Pulled Noodles & Bao Lab'
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
        name: 'Chettinad Hand-Pulled Biang Biang Noodles',
        description: 'Wide ribbon noodles swimming in slow-simmered Chettinad spiced broth with pickled shallots and curry leaf chili oil.',
        price: '₹420',
        friendReaction: 'David: "The best fusion dish created in Chennai in the last 5 years. Non-negotiable order."'
      },
      {
        id: 'fi-8',
        name: 'Crispy Podi Enoki Mushroom Bao (Vegan)',
        description: 'Fluffy steamed bao stuffed with crackling enoki fried with gunpowder podi spices and lime vegan mayo.',
        price: '₹310',
        friendReaction: 'Elena: "Crispiest bite of your life, even non-vegetarians were stealing mine."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-5',
        friendName: 'David Zhang',
        avatarColor: '#3A5A40',
        avatarEmoji: '🍜',
        verdict: 'Must Visit',
        reviewText: 'Google has 3.8 stars because tourists complained the Chettinad chili oil is too spicy. If you have an actual palate, this place is royalty. Get spice level 2 if you are sensitive.',
        whatToOrder: 'Chettinad Biang Biang + Nannari Fizz',
        whatToAvoid: 'The scallion pancake is a bit oily, stick to the baos',
        visitedDate: 'Yesterday',
        friendTrustBadge: 'Late Night Noodle Guru · 22 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 3.8,
      strangerQuote: '"Too spicy, my mouth was burning for an hour" — TouristReviewer',
      friendTruthSummary: 'Squad score: 4.9. Don’t trust spice-averse tourists! The depth of Chettinad roasted spices and handmade chew is legendary.'
    }
  },
  {
    id: 'cafe-5',
    name: 'The Whistling Kettle & Books',
    type: 'cafe',
    oneLinerTag: 'Quiet second-hand bookstore cafe just two blocks from Bessy Beach',
    neighborhood: 'Besant Nagar, Chennai',
    priceTier: '₹₹',
    friendMatchScore: 93,
    friendsVouchedCount: 4,
    rankingPosition: 5,
    criteria: {
      foodScore: 4.5,
      foodComment: 'Cardamom saffron soufflé pancakes and toasted sourdough melts.',
      drinksScore: 4.9,
      drinksComment: 'Single-estate Nilgiri whole leaf teas and whipped tender coconut cold brew cloud.',
      ambienceScore: 5.0,
      ambienceComment: 'Sun-drenched skylights, vintage paperback collections, zero rush, quiet ocean breeze.',
      menuStyle: 'Elliot’s Beach Literary Tea Room & Slow Bakes'
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
        name: 'Tender Coconut & Jasmine Foam Cloud',
        description: 'Single-origin cold brew poured over fresh tender coconut water, topped with Madurai jasmine floral foam.',
        price: '₹260',
        friendReaction: 'Zoe: "Light, floral, and naturally refreshing after walking down 6th Avenue in Besant Nagar."'
      }
    ],
    friendReviews: [
      {
        id: 'fr-6',
        friendName: 'Zoe Morales',
        avatarColor: '#BC6C25',
        avatarEmoji: '🍵',
        verdict: 'Hidden Gem',
        reviewText: 'They serve drinks in wonky handmade clay kulhars that feel so warm in your hands. Perfect spot to read a physical book on a breezy Besant Nagar afternoon after walking on Bessy beach.',
        whatToOrder: 'Tender Coconut Cloud + Cardamom Soufflé pancake',
        whatToAvoid: 'No heavy dinner items, only teas and slow bakes',
        visitedDate: '4 days ago',
        friendTrustBadge: 'Slow Living Pal · 11 shared visits'
      }
    ],
    strangerTruthComparison: {
      strangerRating: 4.3,
      strangerQuote: '"Took 20 mins to get pancakes made fresh" — ImpatientUser_4',
      friendTruthSummary: 'It’s a slow-living bookstore haven. Go when you have 45 minutes to unplug, listen to the sea breeze, and breathe.'
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
      myNotes: 'Met Sarah in Alwarpet and tested the Kimchi Gouda Croissant. Mind officially blown.',
      fusionTried: 'Kimchi Gouda Croissant'
    },
    {
      cafeId: 'cafe-2',
      cafeName: 'The Dueling Dosa & Dice',
      visitDate: 'Sep 29, 2026',
      myRating: 5,
      myNotes: 'Won 2 games of Wingspan in Mylapore and ate 3 orders of Truffle Dosa rolls.',
      fusionTried: 'Truffle Ghee Podi Dosa Quesadilla Roll'
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
