# TronLink Homepage Redesign — Wireframe Prototype

**Version:** v1.0 · Based on PRD v1.2
**URL:** [https://www.tronlink.org](https://www.tronlink.org)

> Wireframe-level prototype. Describes layout structure and content for each redesigned screen. Visual details not included.

---

## Global Elements

```
┌──────────────────────────────────────────────────────────────────┐
│  Announcement Bar                                                │
│  [Brand Deep Blue BG]  Only official website of TronLink: tronlink.org  [×]│
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│  Navigation Bar                                                  │
│  [Logo]    AI Support   Developer   Help   [𝕏] [TG]   🌐   [Install TronLink]│
└──────────────────────────────────────────────────────────────────┘
```

- Announcement bar: brand deep blue background, dismissible on right, compact font size
- Navigation: transparent/dark on screen 1, white background on screens 2–5; Install TronLink button always visible
- Language switcher: demoted to globe icon 🌐, moved to secondary position

---

## Screen 1 · Hero

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  [Deep Blue Gradient Background]                                 │
│                                                                  │
│   ┌─────────────────────────┐   ┌──────────────────────────┐    │
│   │  LEFT · Text Area        │   │  RIGHT · Illustration    │    │
│   │                         │   │                          │    │
│   │  TronLink               │   │   ┌──────────────────┐   │    │
│   │  Secure, Connected,     │   │   │                  │   │    │
│   │  and Truly Yours        │   │   │                  │   │    │
│   │                         │   │   │                  │   │    │
│   │  · Your private keys    │   │   │                  │   │    │
│   │    stay on your device  │   │   └──────────────────┘   │    │
│   │  · Earn staking rewards │   │                          │    │
│   │    from your wallet     │   │                          │    │
│   │  · Manage TRON, ETH,    │   │                          │    │
│   │    BSC in one place     │   │                          │    │
│   │  · One-tap access to    │   │                          │    │
│   │    DeFi, games, Web3    │   └──────────────────────────┘    │
│   │                         │                                   │
│   │  ┌─────────────────┐    │                                   │
│   │  │ Install TronLink │    │                                   │
│   │  └─────────────────┘    │                                   │
│   │                         │                                   │
│   │  Browser Extension      │                                   │
│   │  [Chrome]               │                                   │
│   │                         │                                   │
│   │  Mobile App             │                                   │
│   │  [QR] [Android] [iOS]   │                                   │
│   └─────────────────────────┘                                   │
│                                                                  │
│  ──────────────────────────────────────────────────────────────  │
│  100,000+ Tokens  |  5 Years  |  200+ Countries  |  10M+ Users  │
│  ──────────────────────────────────────────────────────────────  │
│                            ↓                                     │
└──────────────────────────────────────────────────────────────────┘
```

**Components**

- Headline: TronLink — Secure, Connected, and Truly Yours
- Bullets: 4 items, written from user benefit perspective
- Primary CTA: `Install TronLink` button
- Download icons: two stacked groups — Browser Extension (Chrome) / Mobile App (QR + Android + iOS), each with a label above
- Stats bar: 4 metrics, white text
- Scroll cue arrow: low opacity, gentle float animation, click scrolls to screen 2

---

## Screen 2 · Wallet Security

```
┌──────────────────────────────────────────────────────────────────┐
│  [White Background]                     ← Text Left / Image Right│
│                                                                  │
│   ┌─────────────────────────┐   ┌──────────────────────────┐    │
│   │  LEFT · Text Area        │   │  RIGHT · 3D Illustration │    │
│   │                         │   │                          │    │
│   │  END-TO-END PROTECTION  │   │                          │    │
│   │  Wallet Security        │   │                          │    │
│   │                         │   │                          │    │
│   │  ○ Every transaction    │   │                          │    │
│   │    is protected,        │   │                          │    │
│   │    from start to finish │   │                          │    │
│   │                         │   │                          │    │
│   │  ○ Automatic security   │   │                          │    │
│   │    checks run every     │   │                          │    │
│   │    time you use the app │   │                          │    │
│   │                         │   │                          │    │
│   │  ○ Your private keys    │   │                          │    │
│   │    never leave your     │   │                          │    │
│   │    device               │   │                          │    │
│   │                         │   │                          │    │
│   │  Install Now →          │   │                          │    │
│   └─────────────────────────┘   └──────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Components**

- Tag: END-TO-END PROTECTION (all caps, brand blue, small)
- Headline: Wallet Security
- Bullets: 3 items, existing copy
- Secondary CTA: `Install Now →` (brand blue text link)
- Illustration: existing 3D shield, right side

---

## Screen 3 · Network Coverage

```
┌──────────────────────────────────────────────────────────────────┐
│  [White Background]                     ← Mirrored: Image Left / Text Right│
│                                                                  │
│   ┌──────────────────────────┐   ┌─────────────────────────┐    │
│   │  LEFT · 3D Illustration  │   │  RIGHT · Text Area       │    │
│   │                          │   │                         │    │
│   │                          │   │  MULTICHAIN READY       │    │
│   │                          │   │  Network Coverage       │    │
│   │                          │   │                         │    │
│   │                          │   │  ○ All TRON tokens      │    │
│   │                          │   │    supported —          │    │
│   │                          │   │    including NFTs and   │    │
│   │                          │   │    staking rewards      │    │
│   │                          │   │                         │    │
│   │                          │   │  ○ Use Ethereum and BSC │    │
│   │                          │   │    without switching    │    │
│   │                          │   │    apps                 │    │
│   │                          │   │                         │    │
│   │                          │   │  ○ One recovery phrase. │    │
│   │                          │   │    All your chains.     │    │
│   │                          │   │    Always.              │    │
│   │                          │   │                         │    │
│   │                          │   │  Install Now →          │    │
│   └──────────────────────────┘   └─────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Components**

- Tag: MULTICHAIN READY
- Headline: Network Coverage
- Layout: mirrored — illustration left, text right
- Secondary CTA: `Install Now →`

---

## Screen 4 · Asset Management

```
┌──────────────────────────────────────────────────────────────────┐
│  [White Background]                     ← Text Left / Image Right│
│                                                                  │
│   ┌─────────────────────────┐   ┌──────────────────────────┐    │
│   │  LEFT · Text Area        │   │  RIGHT · 3D Illustration │    │
│   │                         │   │                          │    │
│   │  YOUR ASSETS, YOUR RULES│   │                          │    │
│   │  Asset Management       │   │                          │    │
│   │                         │   │                          │    │
│   │  ○ Your keys are stored │   │                          │    │
│   │    on your device —     │   │                          │    │
│   │    never on any server  │   │                          │    │
│   │                         │   │                          │    │
│   │  ○ Keep daily funds     │   │                          │    │
│   │    accessible. Store    │   │                          │    │
│   │    savings offline.     │   │                          │    │
│   │                         │   │                          │    │
│   │  ○ Always connected —   │   │                          │    │
│   │    with automatic node  │   │                          │    │
│   │    switching built in   │   │                          │    │
│   │                         │   │                          │    │
│   │  Install Now →          │   │                          │    │
│   └─────────────────────────┘   └──────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Components**

- Tag: YOUR ASSETS, YOUR RULES
- Headline: Asset Management
- Layout: text left / image right (same as Screen 2)
- Secondary CTA: `Install Now →`

---

## Screen 5 · User Experience

```
┌──────────────────────────────────────────────────────────────────┐
│  [White Background]                     ← Mirrored: Image Left / Text Right│
│                                                                  │
│   ┌──────────────────────────┐   ┌─────────────────────────┐    │
│   │  LEFT · 3D Illustration  │   │  RIGHT · Text Area       │    │
│   │                          │   │                         │    │
│   │                          │   │  BUILT FOR EVERYONE     │    │
│   │                          │   │  User Experience        │    │
│   │                          │   │                         │    │
│   │                          │   │  ○ Set up your wallet   │    │
│   │                          │   │    in under 60 seconds. │    │
│   │                          │   │    Ledger supported.    │    │
│   │                          │   │                         │    │
│   │                          │   │  ○ Shared wallet control│    │
│   │                          │   │    for teams, families, │    │
│   │                          │   │    or organizations     │    │
│   │                          │   │                         │    │
│   │                          │   │  ○ Browse DeFi, games,  │    │
│   │                          │   │    and social apps —    │    │
│   │                          │   │    all inside TronLink  │    │
│   │                          │   │                         │    │
│   │                          │   │  Install Now →          │    │
│   └──────────────────────────┘   └─────────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Components**

- Tag: BUILT FOR EVERYONE
- Headline: User Experience
- Layout: mirrored — illustration left, text right (same as Screen 3)
- Secondary CTA: `Install Now →`

---

## Footer CTA Block

```
┌──────────────────────────────────────────────────────────────────┐
│  [Deep Blue Background — echoes Hero]                            │
│                                                                  │
│        Ready to explore TRON?                                    │
│                                                                  │
│              ┌──────────────────┐                               │
│              │ Install TronLink │                               │
│              └──────────────────┘                               │
│           [Android]  [iOS]  [Chrome]                            │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Footer

```
┌──────────────────────────────────────────────────────────────────┐
│  [Dark Background]                                               │
│                                                                  │
│  [Logo]          Product             Developer        Support    │
│                  Features           Developer Docs   Help Center │
│                  Security           TronWeb          Privacy     │
│                  Download           Integration      Twitter     │
│                                                                  │
│  ──────────────────────────────────────────────────────────────  │
│  © Helix Tech Company Limited              [Twitter] [TG] [Mail]│
└──────────────────────────────────────────────────────────────────┘
```

---

## Left Navigation Dots (Global)

```
  ·  ←── Screen 1 · Home       [hover: "Home"]
  ·  ←── Screen 2 · Security   [hover: "Security"]
  ·  ←── Screen 3 · Network    [hover: "Network"]
  ·  ←── Screen 4 · Assets     [hover: "Assets"]
  ·  ←── Screen 5 · Experience [hover: "Experience"]
```

- Visual dot size unchanged
- Clickable hit area expanded; hover reveals screen name tooltip

---

## Redesign Change Log

| Element               | Before                              | After                                              |
| --------------------- | ----------------------------------- | -------------------------------------------------- |
| Headline              | TronLink Wallet                     | TronLink — Secure, Connected, and Truly Yours      |
| Hero CTA              | Install Now + QR side by side       | Install TronLink button + two labeled icon groups  |
| Feature screen layout | All four screens: text left / image right | Alternating — Screens 3 & 5 mirrored         |
| Feature screen CTA    | None                                | Install Now → text link                            |
| Feature screen tag    | Grey plain text                     | Brand blue, all caps, small label                  |
| Nav Install button    | Hidden on screen 1                  | Always visible                                     |
| Language switcher     | Listed alongside primary nav items  | Demoted to globe icon                              |
| Announcement bar      | Black background                    | Brand deep blue background, compact height         |
| Footer                | Social icons + copyright only       | Footer CTA block + three-column links              |
