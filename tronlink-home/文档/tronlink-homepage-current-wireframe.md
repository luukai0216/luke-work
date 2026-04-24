# TronLink Homepage — Current Site Wireframe Prototype

**Version:** v1.0
**Source:** [https://www.tronlink.org](https://www.tronlink.org)
**Captured:** 2026-04-24

> Pure document wireframe based on the live homepage content and visible information architecture.
> This draft uses the desktop reading order as the primary reference and omits duplicated mobile-only DOM content.

---

## Page Type

- Standard long-scroll homepage
- Hero + 4 feature sections + footer
- Primary goal: install/download TronLink
- Secondary goal: route users to docs, help, and developer resources

---

## Global Structure Map

```text
Announcement Bar
Navigation Bar
Hero
Stats Strip
Section 2: Wallet Security Protection
Section 3: Network Coverage
Section 4: Asset Management
Section 5: User Experience
Footer
```

---

## Global Elements

```text
┌──────────────────────────────────────────────────────────────────┐
│ Announcement Bar                                                 │
│ Only official website of TronLink: https://tronlink.org     [icon] │
└──────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────┐
│ Navigation Bar                                                   │
│ [Logo]  AI Support  Developer  Help  [Install]  [Language]      │
└──────────────────────────────────────────────────────────────────┘
```

**Navigation content**

- AI Support
  - MCP Server
  - MCP Core
  - Skills
  - TronLink Signer
  - TronLink Cli
- Developer
  - TronLink Developer Docs
  - TronLink Integration
  - TronWeb
  - Tron Protocols
- Help
- Install
- Language switcher
  - English
  - Traditional Chinese
  - Simplified Chinese

**Global notes**

- The topmost announcement repeats the official-domain notice
- The header is content-heavy and mixes product, docs, and support entry points
- Install remains the strongest CTA in the global nav

---

## Section 1 · Hero

```text
┌──────────────────────────────────────────────────────────────────┐
│ Hero                                                             │
│ [配图]                                                           │
│                                                                  │
│  LEFT:                                                           │
│  TronLink Wallet                                                 │
│  Trusted by over 10,000,000 users worldwide                      │
│                                                                  │
│  - Self-custody wallet                                           │
│  - Strong TRON support and staking support                       │
│  - Extension supports TRON + EVM networks                        │
│  - DApp access and on-chain actions                              │
│                                                                  │
│  [Install Now]                                                   │
│                                                                  │
│  Download Groups                                                 │
│  - Mobile app: QR / Android / iOS                                │
│  - Browser extension: Chrome Web Store                           │
│  - Android APK + Security Verification + download line selector  │
│                                                                  │
│  RIGHT:                                                          │
│  [配图]                                                          │
└──────────────────────────────────────────────────────────────────┘
```

**Key content**

- Product name: `TronLink Wallet`
- Trust headline: `Trusted by over 10,000,000 users worldwide`
- Primary CTA: `Install Now`
- Mobile download paths:
  - QR install
  - Google Play
  - Android APK
  - App Store
- Desktop download path:
  - Chrome Web Store
- Extra utility links:
  - Security Verification
  - Download line selection: Asia Line / US Line

---

## Stats Strip

```text
┌──────────────────────────────────────────────────────────────────┐
│ 100,000+ Tokens | 5 Years Proven Track Record | 200+ Countries  │
│ 10,000,000+ Global Users                                        │
└──────────────────────────────────────────────────────────────────┘
```

**Current messaging**

- Token coverage scale
- Brand longevity / trust
- Global footprint
- User count

---

## Section 2 · Wallet Security Protection

```text
┌──────────────────────────────────────────────────────────────────┐
│ Section Title                                                    │
│ Top-Notch & Full-Coverage                                        │
│ Wallet Security Protection                                       │
│                                                                  │
│ Feature 1                                                        │
│ [icon]                                                           │
│ End-to-end protection across environment and transaction flow    │
│                                                                  │
│ Feature 2                                                        │
│ [icon]                                                           │
│ Runtime environment checks and system-level security tests       │
│                                                                  │
│ Feature 3                                                        │
│ [icon]                                                           │
│ Private keys protected with dual encryption                      │
└──────────────────────────────────────────────────────────────────┘
```

**Content intent**

- Build trust through security language
- Explain wallet protection from device environment to transaction execution
- Reinforce private-key safety

---

## Section 3 · Network Coverage

```text
┌──────────────────────────────────────────────────────────────────┐
│ Section Title                                                    │
│ More Inclusive                                                   │
│ Network Coverage                                                 │
│                                                                  │
│ Feature 1                                                        │
│ [icon]                                                           │
│ TRON support: TRX, TRC-10, TRC-20, TRC-721, staking resources   │
│                                                                  │
│ Feature 2                                                        │
│ [icon]                                                           │
│ EVM support in extension: Ethereum, BSC, BTTC                   │
│                                                                  │
│ Feature 3                                                        │
│ [icon]                                                           │
│ One mnemonic can manage assets across multiple chains            │
└──────────────────────────────────────────────────────────────────┘
```

**Content intent**

- Position TronLink as more than a single-chain wallet
- Connect TRON depth with multichain convenience
- Emphasize unified wallet recovery structure

---

## Section 4 · Asset Management

```text
┌──────────────────────────────────────────────────────────────────┐
│ Section Title                                                    │
│ More Secure                                                      │
│ Asset Management                                                 │
│                                                                  │
│ Feature 1                                                        │
│ [icon]                                                           │
│ Local private-key storage + layered encryption                   │
│                                                                  │
│ Feature 2                                                        │
│ [icon]                                                           │
│ Hot wallet and cold wallet workflow for isolation                │
│                                                                  │
│ Feature 3                                                        │
│ [icon]                                                           │
│ Node switching and automatic reconnection                        │
└──────────────────────────────────────────────────────────────────┘
```

**Content intent**

- Frame TronLink as decentralized and locally controlled
- Add operational safety with hot/cold wallet narrative
- Reduce anxiety around reliability with node-failover messaging

---

## Section 5 · User Experience

```text
┌──────────────────────────────────────────────────────────────────┐
│ Section Title                                                    │
│ More Convenient                                                  │
│ User Experience                                                  │
│                                                                  │
│ Feature 1                                                        │
│ [icon]                                                           │
│ One-click create/import, HD wallet support, Ledger support       │
│                                                                  │
│ Feature 2                                                        │
│ [icon]                                                           │
│ Multisignature for shared asset control                          │
│                                                                  │
│ Feature 3                                                        │
│ [icon]                                                           │
│ Built-in Web3 browser for DApps, favorites, and discovery        │
└──────────────────────────────────────────────────────────────────┘
```

**Content intent**

- Lower setup friction
- Signal support for advanced users and institutions
- Tie wallet usage to downstream Web3 activity

---

## Footer

```text
┌──────────────────────────────────────────────────────────────────┐
│ Footer                                                           │
│ [icon]                                                           │
│ tronlink@tronlink.org                                            │
│ Help Center                                                      │
│ Privacy Policy                                                   │
│ © Helix Tech Company Limited 2026                                │
└──────────────────────────────────────────────────────────────────┘
```

**Footer content**

- Contact email: `tronlink@tronlink.org`
- Help Center
- Privacy Policy
- Social links:
  - Twitter / X
  - Telegram

---

## Information Architecture Summary

1. Trust users first with official-domain notice and large install CTA.
2. Convert immediately through multiple download entry points in the Hero.
3. Support product evaluation through 4 stacked capability sections:
   security, network coverage, asset management, and user experience.
4. Finish with support/contact/legal links in the footer.

---

## Prototype Notes

- This is a structure-first wireframe; large visual placeholders use `配图`, while icon-scale placeholders are kept as `icon`
- The live page appears to include duplicated content blocks for different breakpoints; this prototype keeps one canonical desktop content flow
- Copy has been normalized into concise prototype language while preserving the live page's section hierarchy and core claims
