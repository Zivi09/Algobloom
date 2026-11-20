# Product Requirements Document (PRD) 🌸
# AlgoBloom: Multi-User Collaborative Learning Platform

- **Product Name:** AlgoBloom
- **Document Version:** 2.0.0
- **Status:** Approved / In Implementation
- **Target Audience:** Self-taught Developers, CS Undergraduates, Bootcamps, Competitive Programmers, Educators
- **Core Value Proposition:** *Learn algorithms. Bloom with confidence. Grow together.*

---

## 1. Executive Summary & Vision

AlgoBloom is an interactive, visual-first computer science learning platform that pairs rigorous algorithmic pedagogy with a gamified botanical aesthetic ("Sunset Garden"). Currently operating as a client-side single-player application, AlgoBloom empowers learners to visualize algorithms step-by-step, take quizzes, relearn tricky concepts, and grow digital flowers as their mastery deepens.

**AlgoBloom 2.0 Multi-User Platform** transitions the platform from an isolated single-player sandbox into a vibrant, global social learning ecosystem. Learners can preserve and sync progress across devices, showcase their botanical gardens to the world, compete in weekly leagues, join collaborative study guilds, and challenge peers in real-time synchronized algorithmic races (**AlgoRace**).

---

## 2. Problem Statement

1. **Isolation in Algorithmic Learning:** Algorithm study (DSA) is notorious for high drop-out rates, frustration ("LeetCode burn-out"), and lack of positive reinforcement. Learners study in silos without peer encouragement.
2. **Device Locking & Data Loss Risk:** With `localStorage` persistence, clearing browser cookies, switching laptops, or learning on mobile deletes hard-earned garden blossoms, XP, and streak milestones.
3. **Lack of Trust in Public Mastery:** Because quiz answers and mastery state reside in client-side code, achievements cannot be reliably verified or showcased to peers, study groups, or prospective employers.
4. **Missing Classroom / Team Utility:** CS instructors, teaching assistants, and study club leaders cannot track cohorts or assign coordinated problem sets through AlgoBloom.

---

## 3. User Personas

| Persona | Role | Key Pain Points | Core Goals in AlgoBloom 2.0 |
| :--- | :--- | :--- | :--- |
| **Maya (The Self-Taught Climber)** | Career Switcher | Struggles with Big O abstraction; feels isolated; loses momentum easily. | Cross-device sync; show off her growing botanical garden on LinkedIn/Discord; stay accountable with streaks and weekly leagues. |
| **Leo (The CS Sophomore)** | College Student | Bored by dry lecture slides; exams demand step-by-step trace predictions. | Battle classmates in 1v1 AlgoRace; join a University Study Guild to unlock communal garden milestones. |
| **Prof. Chen (The Educator)** | Algorithms Professor | Cannot easily verify if students actually understand algorithmic traces vs memorizing code. | Use AlgoBloom in labs; view cohort completion analytics; assign weekly algorithm traces. |
| **Sam (The Competitive Botanist)** | Tech Interviewee | Needs speed and retention; seeks mastery across all 15 curriculum levels. | Top the Global Blossom League; speedrun quiz traces; archive revision items in cloud. |

---

## 4. Product Goals & Success Metrics (KPIs)

### Primary Product Goals:
1. **Frictionless Onboarding:** Allow users to start exploring immediately as guests, with a 1-click upgrade to cloud sync preserving 100% of guest progress.
2. **High-Engagement Social Loop:** Foster continuous daily engagement through Streaks, Weekly Leagues, Garden Visitations, and Guild Goals.
3. **Verified Algorithmic Mastery:** Ensure quiz results, trace speed, and XP issuance are validated securely on the backend.
4. **Real-Time Synchronous Learning:** Enable low-latency peer-to-peer algorithmic duels.

### Key Performance Indicators:
- **D1 / D7 / D30 Retention:** > 55% / 35% / 22%
- **Guest-to-Registered Conversion Rate:** > 40% within 3 sessions
- **Weekly Active Garden Showcases:** > 30% of WAU sharing or visiting a public `/garden/@username`
- **Quiz Completion Rate:** > 75% on started lessons
- **Average Daily Session Duration:** > 18 minutes

---

## 5. Functional Requirements

### 5.1. Authentication & Identity Management
- **FR-1.1 Guest Mode (Default):** Unauthenticated users can access all lessons, run visualizers, take quizzes, and accumulate garden plants stored locally.
- **FR-1.2 Zero-Loss Account Creation:**
  - Support Sign Up via Email/Password, GitHub OAuth, and Google OAuth.
  - Upon registration, automatically detect local progress and execute a single-transaction cloud sync (`POST /api/progress/migrate-local`).
- **FR-1.3 User Profiles:**
  - Unique handle (`@username`), Display Name, Botanical Title (e.g., "Lotus Grandmaster"), Avatar Flower, Bio, and Location/Timezone.
  - Profile settings: privacy toggle (Public / Guild-Only / Private Garden), sound effects, playback speed defaults.
- **FR-1.4 Session Management:**
  - Secure JWT access tokens (short-lived) + httpOnly refresh cookies (long-lived) with automatic token rotation.

### 5.2. Cloud Progress & Garden Persistence
- **FR-2.1 Real-Time Cloud Sync:**
  - Persist lesson completions, 5/5 mastery status, unlocked levels, quiz scores, and active bookmarks.
  - Offline sync: Queues changes in IndexedDB/localStorage when disconnected and reconciles upon reconnection using last-write-wins with server timestamp arbitration.
- **FR-2.2 Botanical Garden Cloud State:**
  - Each plant record stores: `algorithmId`, `plantName`, `stage` (`seed`, `sprout`, `bud`, `bloomed`), `flowerType`, `plantedAt`, `bloomedAt`.
  - Garden health: Daily activity maintains garden luster; dormant streaks trigger subtle autumn leaf overlays without killing flowers.

### 5.3. Public Garden Showcases (`/garden/@username`)
- **FR-3.1 Interactive Public Garden Page:**
  - Shareable URL displaying the user's active garden layout, total bloomed flowers, XP, and streak.
  - Visitors can click individual flowers to inspect:
    - Which algorithm bloomed it (e.g. *Dijkstra's Algorithm - Golden Sunflower*).
    - Mastery date and quiz score.
- **FR-3.2 Floral Reactions & Visitor Log:**
  - Authenticated visitors can leave one botanical reaction per day (`🌸 Sparkle Blossom`, `🐝 Honeybee Pollinator`, `💧 Fresh Dewdrop`).
  - Reaction counter visible on public profile and notifies the owner on their next login.

### 5.4. Leagues & Global Leaderboards
- **FR-4.1 Tiered Botanical Leagues:**
  - Weekly promotion/relegation leagues with 30 users per tier:
    1. *Seedling League* (Bronze)
    2. *Sprout League* (Silver)
    3. *Budding Grove* (Gold)
    4. *Blossom Sanctuary* (Platinum)
    5. *Ancient Botanical Grove* (Diamond / Master)
  - Top 5 promote every Sunday midnight UTC; bottom 5 relegate.
- **FR-4.2 Leaderboard Views:**
  - **Weekly XP** (Competitive sprint)
  - **All-Time XP** (Dedication & mastery)
  - **Streak Champions** (Consistency)
  - **Guild Standings** (Team collaboration)

### 5.5. Collaborative Garden Guilds (Study Groups)
- **FR-5.1 Guild Creation & Membership:**
  - Any learner with > 500 XP can create a Guild (up to 30 members).
  - Guild customization: Name, Motto, Botanical Banner, Privacy (Public / Application / Invite-Only).
- **FR-5.2 The Communal Greenhouse (World Tree):**
  - All XP earned by members during the week feeds the Guild's shared "Great Oak / Sacred Lotus".
  - Completing guild milestones unlocks exclusive guild badges and custom flower cosmetics for all members.
- **FR-5.3 Guild Activity Feed:**
  - Real-time bulletin of member achievements (e.g., "*Maya mastered Merge Sort! +150 XP to Guild*").

### 5.6. AlgoRace (Real-Time 1v1 Synchronized Duels)
- **FR-6.1 Matchmaking & Direct Invites:**
  - Quick Match (searches for similar MMR/tier) or Custom Room (shareable 6-character room code).
- **FR-6.2 Race Formats:**
  - **Trace Sprint:** Both players watch a live randomized sorting/graph execution and must predict the next pointer swap or visited node within 10 seconds.
  - **Quiz Rush:** 5 synchronized rapid-fire questions. Fastest correct answer gains bonus points.
- **FR-6.3 Live Progress Meter:**
  - Real-time visual progress bar displaying both players' current question and bloom status.

### 5.7. Anti-Cheat & Secure Verification
- **FR-7.1 Server-Side Quiz Grading:**
  - Correct answers are strictly omitted from client-side bundles.
  - Submissions evaluated server-side with latency sanity checks (minimum 3 seconds per complex question to prevent script bots).
- **FR-7.2 Rate Limiting & XP Caps:**
  - Maximum 500 XP earnable per 10-minute window to neutralize automated payload loops.

---

## 6. Non-Functional Requirements

### 6.1. Performance & Latency
- First Contentful Paint (FCP) < 1.2s; Time to Interactive (TTI) < 2.0s.
- Visualizer trace execution running at consistent 60 FPS in canvas/DOM.
- API response times: < 80ms p95 for progress queries; < 150ms p95 for quiz grading.
- AlgoRace WebSocket message propagation latency < 45ms.

### 6.2. Security & Compliance
- Passwords hashed using bcrypt (cost factor 12) or Argon2id.
- Strict Content Security Policy (CSP), CORS whitelisting, and SQL injection prevention via parameterized queries / ORM.
- GDPR / CCPA compliance: "Export My Data" (JSON) and "Delete My Account" self-service buttons in Settings.

### 6.3. Scalability & Availability
- Stateless API application layer horizontally scalable behind an Application Load Balancer.
- 99.9% uptime SLA.
- Database read replicas for public garden and leaderboard queries.

---

## 7. Future Scope (Post-v2.0)
- **Classroom / LMS Integration:** LTI 1.3 support for Canvas, Blackboard, and Google Classroom.
- **Custom Community Algorithms:** User-submitted algorithm lessons created with a visual trace builder.
- **Mobile Native Applications:** iOS & Android builds via React Native / Capacitor.
