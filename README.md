<div align="center">

# ☕ CafeGo

**Friend-Powered Cafe & Restaurant Discovery with an Immersive 3D WebGL World & AR Tabletop Inspector**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20%2F%207.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini Ready](https://img.shields.io/badge/Gemini%20AI-Ready-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

<br />

<p align="center">
  Tired of bot-boosted 5-star ratings and paid influencer hype? <b>CafeGo</b> replaces generic stranger reviews with honest, vouched recommendations from your real-life friend squads — wrapped in a calming sage-claymorphic interface, tactile synthesized soundscapes, an interactive 3D WebGL cafe, and live AR dish previews.
</p>

</div>

---

## 🌟 Key Features

### 🕹️ Full-Screen 3D WebGL Cafe Scene (`Three.js`)
- **Multiple Camera Angles**: Seamlessly switch between **Isometric Sanctuary**, **Third-Person Follow**, **Barista Counter**, and **Cozy Lounge** camera views.
- **Click-to-Walk Raycasting**: Move your 3D avatar across the cafe floor with smooth physics-assisted interpolation, customizable avatar colors, and animated steam particles.
- **Interactive Patrons & NPCs**: Approach and interact with patrons seated throughout the cafe to hear unvarnished opinions, favorite study spots, and secret order recommendations.
- **Cozy Barista Welcome Flow**: Interactive storytelling modal where your barista slides an espresso across the fluted wood counter when you register your name.

### 👥 Squad Truth vs. Stranger Hype
- **The "Truth Filter"**: Direct side-by-side comparisons between generic internet reviews (e.g. 1-star complaints about lack of seasonal syrups) and authentic squad ratings.
- **Detailed Dimension Scoring**: Breakdown ratings for **Food**, **Drinks**, and **Ambience**, backed by specific comments and verified visit histories.
- **What to Order / What to Avoid**: Quick, actionable dish recommendations so you never order the wrong drink again.
- **Facility & Lifestyle Filtering**: Filter spots instantly by **Pet-Friendly**, **Wi-Fi / Coworking Spaces**, **Vegetarian Friendly**, **Board Game Cafes**, **Rooftop Seating**, **Parking**, and **Party Venues**.

### 📱 Live Augmented Reality (AR) Tabletop Scanner
- **WebRTC Camera Stream**: Project dishes directly onto your physical dining table or desk through your mobile device or laptop camera.
- **Interactive Controls**: Rotate, scale, place, and inspect 3D procedural food models (Kimchi Gouda Croissants, Cardamom Espresso Tonics, Pistachio Tiramisu, Truffle Podi Dosas).
- **Snapshot Capture**: Take and download instant snapshots of AR food placements to share with friends.

### 🍰 Embedded 3D Dish Turntable Viewer
- Interactive 3D modal viewer on every cafe card allowing users to preview dishes from any angle before ordering.

### 🔊 Procedural Web Audio Engine
- Built-in, zero-dependency Web Audio API synthesizer generating tactile feedback:
  - Soft clay button pops and clicks
  - Barista counter cup-sliding acoustics
  - Warm notification chimes
  - Ambient lo-fi background soundscape

### 🎁 Squad Circles & Coffee Token Rewards
- **Create & Manage Squads**: Group up with dining buddies, foodies, and coworking friends.
- **Referral Rewards**: Share your unique referral link (`https://cafego.app/join?ref=...`) to invite friends, earning **Coffee Tokens** to unlock community badges and perks.
- **Trust Badges**: Build trust ratings through verified visits and squad reviews.

---

## 🏗️ Architecture & Tech Stack

```
                     ┌──────────────────────────────────────────────┐
                     │            CafeGo Client (Vite)              │
                     └──────────────────────┬───────────────────────┘
                                            │
               ┌────────────────────────────┼────────────────────────────┐
               │                            │                            │
      ┌────────▼────────┐          ┌────────▼────────┐          ┌────────▼────────┐
      │  3D & AR Engine │          │   UI & States   │          │   Audio Engine  │
      ├─────────────────┤          ├─────────────────┤          ├─────────────────┤
      │ • Three.js      │          │ • React 19      │          │ • Web Audio API │
      │ • WebGL 2.0     │          │ • Tailwind v4   │          │ • Synthesized   │
      │ • Raycasting    │          │ • Lucide Icons  │          │   oscillators   │
      │ • WebRTC Camera │          │ • Claymorphism  │          │ • Tactile FX    │
      └─────────────────┘          └─────────────────┘          └─────────────────┘
                                            │
                                   ┌────────▼────────┐
                                   │  AI Integration │
                                   ├─────────────────┤
                                   │ • @google/genai │
                                   │ • Gemini Models │
                                   └─────────────────┘
```

| Layer | Technologies |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS v4](https://tailwindcss.com/) with custom claymorphic elevation classes |
| **3D Graphics & WebGL** | [Three.js](https://threejs.org/) (custom procedural geometry, materials, lighting & camera controllers) |
| **Icons & Micro-animations** | [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/) |
| **Audio** | Native Browser Web Audio API (`AudioContext`, gain nodes, oscillators) |
| **AI SDK** | [`@google/genai`](https://www.npmjs.com/package/@google/genai) (Google Gemini API SDK ready) |
| **Typography** | [Outfit](https://fonts.google.com/specimen/Outfit) & [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) |

---

## 📂 Project Structure

```text
cafego/
├── .env.example                # Template for environment variables (GEMINI_API_KEY, APP_URL)
├── .gitignore                  # Git ignore patterns
├── index.html                  # HTML5 entrypoint with Google Fonts preconnections
├── metadata.json               # AI Studio project configuration & capabilities
├── package.json                # Project dependencies and script definitions
├── README.md                   # Project documentation
├── tsconfig.json               # TypeScript compiler configuration
├── vite.config.ts              # Vite config (Tailwind v4 plugin, React plugin, aliases)
└── src/
    ├── App.tsx                 # Root application component & layout management
    ├── index.css               # Global styles, Tailwind directives & claymorphism classes
    ├── main.tsx                # React DOM root bootstrapping
    ├── types.ts                # TypeScript interfaces (Cafe, Review, Patron, UserProfile)
    ├── components/
    │   ├── ARViewerModal.tsx          # WebRTC camera AR dish projection modal
    │   ├── CafeDetailModal.tsx        # Comprehensive cafe deep-dive & squad review details
    │   ├── Footer.tsx                 # Community links and app footer
    │   ├── HeroSection.tsx            # Landing banner & value proposition
    │   ├── Navbar.tsx                 # Desktop and mobile navigation bar
    │   ├── ProfileModal.tsx           # User profile, history, and token stats modal
    │   ├── RecommendationSystem.tsx   # Search, filters, sort, and cafe cards
    │   ├── ReferralAndSquadSection.tsx# Squad management, referral link generator & rewards
    │   ├── ReviewModal.tsx            # Interactive form to write verified squad reviews
    │   ├── ThreeCafeScene.tsx         # Full-screen interactive 3D WebGL cafe scene
    │   └── ThreeDishInspector.tsx     # Turntable 3D viewer for individual dishes
    ├── data/
    │   └── mockData.ts         # Initial cafes, menu items, reviews, and cafe patrons
    └── utils/
        └── audio.ts            # Web Audio API synthesizer for tactile UI sounds
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm** (comes with Node) or **pnpm** / **yarn**

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/cafego.git
cd cafego
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory (based on `.env.example`):

```bash
cp .env.example .env.local
```

Open `.env.local` and add your credentials:

```ini
# Google Gemini API key (optional for local mock mode, required for live AI features)
GEMINI_API_KEY="your_actual_gemini_api_key_here"

# Application host URL
APP_URL="http://localhost:3000"
```

> **Tip**: You can obtain a Gemini API key free at [Google AI Studio](https://aistudio.google.com/).

### 3. Run Development Server

```bash
npm run dev
```

The application will launch at:
```
http://localhost:3000
```

---

## 🛠️ Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Starts Vite local development server on port `3000` |
| `build` | `npm run build` | Compiles TypeScript and builds optimized production bundles to `/dist` |
| `preview` | `npm run preview` | Locally serves the production build for testing |
| `test` | `npm test` | Runs automated test suite covering recommendations, security, and WCAG AA accessibility |
| `test:coverage` | `npm run test:coverage` | Runs full test runner with regression coverage |
| `lint` | `npm run lint` | Runs TypeScript compiler checks without emitting files (`tsc --noEmit`) |
| `clean` | `npm run clean` | Removes build output (`dist/`) and temporary build artifacts |

---

## 💡 How It Works

### 1. Exploring the 3D Cafe
- Open the application to step inside the 3D cafe sanctuary.
- Click anywhere on the wooden flooring to walk your character to that spot.
- Use the top-left perspective controls to change between **Isometric**, **Follow**, **Counter**, and **Lounge** camera views.
- Click on any patron seated at the tables to read their personal recommendations and hidden gem alerts.

### 2. Discovering Curated Places
- Click **Discovery & Reviews** in the bottom floating dock.
- Filter spots by type (**Cafe** or **Restaurant**) or amenity (**Pet-friendly**, **Coworking**, **Vegan**, **Board Games**, etc.).
- Sort by **Friend Match %**, **Squad Ranking**, or **Total Vouches**.
- Click **3D Preview** on any fusion item to inspect it on a spinning ceramic plate.

### 3. Placing Dishes in AR
- Click **AR Tabletop** in the dock or **View in AR** on any dish card.
- Allow camera access to turn on your webcam feed.
- Move your device to align the target reticle with your tabletop and tap **Place Dish**.
- Inspect scale, rotation, and texture, then hit **Take Photo** to save the preview.

### 4. Reviewing & Earning Tokens
- Tap **+ Add Review** on any cafe card.
- Score Food, Drink, and Ambience on a 5-star scale, specify what to order vs. what to avoid, and submit your review.
- Earn **+15 Coffee Tokens** instantly, update your visit history, and strengthen your squad's trust score.

---

## 🤖 Integrating Google Gemini AI

The project includes `@google/genai` (^2.4.0) pre-installed. You can easily connect Gemini models (such as `gemini-2.5-flash` or `gemini-2.5-pro`) to power next-level AI features:

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Example: Generate squad truth summary from raw friend notes
export async function generateSquadSummary(cafeName: string, reviews: string[]) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Synthesize the honest verdict for ${cafeName} based on these friend notes:\n${reviews.join('\n')}`,
  });
  return response.text;
}
```

Potential AI integrations:
- **Squad Vibe Matcher**: Compare your personal taste profile with friend reviews to predict dish satisfaction.
- **Smart Itinerary Planner**: Plan a cafe-hopping route based on walking distance, Wi-Fi speed, and pour-over quality.
- **Menu Translator & Fusion Explainer**: Explain unique fusion ingredients and flavor profiles using multimodal vision.

---

## 🎨 Design Philosophy & Styling

CafeGo is designed with a **Warm Sage Minimalist** and **Tactile Claymorphic** design system:
- **Palette**: Natural earthy tones — Terracotta (`#E07A5F`), Sage Green (`#739066` / `#9BB196`), Cream Canvas (`#F8F5EE`), Deep Espresso Charcoal (`#2C241E`).
- **Tactile Claymorphism**: Soft multidirectional inset highlights and warm ambient shadows give cards and buttons a physically pressable feel.
- **Typography**: Clean geometric headings via *Outfit* paired with legible, friendly body text in *Plus Jakarta Sans*.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to modify and build upon it.

<div align="center">
  <sub>Crafted with ☕, Three.js, and authentic recommendations. Say goodbye to fake reviews!</sub>
</div>
