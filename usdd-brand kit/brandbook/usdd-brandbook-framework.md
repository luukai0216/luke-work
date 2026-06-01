# USDD Brand Book — Framework（内容框架 / 生成蓝图）

> **版本**：v0.3 | **日期**：2026-06-01
> **参考**：Aave《Visual Identity Guidelines》（July 2024，36 页，已逐页拆解）
> **数据来源**：USDD Figma Design System（Design Tokens）+ Brand Kit PRD（Yuki, v1）+ 真实 token 资产
> **本文用途**：作为生成正式 Brand Book（Slides / Figma / HTML）的逐页蓝图——每个子章节 = 一张/一组页面，已标注「左侧文案 + 右侧视觉」的版式模板。

---

## A · 整体设计语言（对齐 Aave 版式）

Aave VIG 全册只用 **5 套版式模板** 反复组合。USDD Brand Book 沿用同一套语言，仅把 Aave 的「紫 + 幽灵」换成 USDD 的「品牌绿 + 美元硬币」。

| 模板 | 用途 | 版式描述 |
|------|------|---------|
| **T1 封面** | Cover / 封底 | 满版品牌绿底；左上 `USDD`，居中 `Visual Identity Guidelines`，右上日期；超大 Symbol 局部出血做背景 |
| **T2 章节扉页** | 4 个大章分隔页 | 满版品牌绿底；左侧超大章节号（1/2/3/4），中缝竖线，右侧超大白色章节标题 |
| **T3 单视觉页** | 绝大多数内容页 | **左列**＝小章节号（顶）+ 加粗标题 + 1–3 段说明正文；**右侧**＝一块大视觉（品牌绿 / 深色 / 浅色卡）。左下角页脚 `USDD Visual Identity Guidelines` |
| **T4 多栏对比页** | 并列展示 2–4 项 | 顶部一排栏目标签（如 `Square / Circular`），每栏一条细竖线引导，下方对应视觉块 |
| **T5 色板页** | 颜色展示 | 每色＝一张高圆角卡，纵向 3 个明度档（深→浅），HEX 居中；最浅档的 HEX 用该色本身上色 |

**统一规则**
- 页脚固定：左下 `USDD Visual Identity Guidelines`，右上小号章节编号（如 `1.2`）
- 主背景色：品牌绿 `#216C58`（扉页/封面/部分大视觉）；内容页用浅灰 `#F2F2F2` 或纯白衬底
- 留白充足，视觉块四周大间距；正文用小字号、克制

---

## Index 目录（对齐 Aave 4 章结构）

```
1  Logo
   1.1  Symbol               — USDD 核心符号（绿色硬币 + $）
   1.2  Wordmark             — USDD 字标
   1.3  Logo                 — Symbol + Wordmark 组合锁定
   1.4  Logo Construction    — 构成与安全间距
   1.5  Token Logo           — 圆形容器版（链无关）
   1.6  Profile Picture      — 头像规范（方形 / 圆形）
   1.7  USDD & sUSDD         — 双 Symbol 对照（子品牌）
   1.8  Token Icons          — 多链 token × chain 组合

2  Colors
   2.1  Brand Palette        — 4 主色（双绿 + 黑白）
   2.2  Extended Palette     — UI 语义色阶（Design Tokens）
   2.3  Logo Colorways       — Logo 在不同底色的标准搭配
   2.4  Chain Badge Colors   — 链标识衍生色

3  Typeface
   3.1  Brand Typeface       — Inter
   3.2  Typeface Weights     — 3 字重
   3.3  Typeface Hierarchy   — 9 级字阶
   3.4  Using Typefaces      — 实际应用示例

4  Brand Accents
   4.1  The Circle           — 圆形品牌图形（源自硬币轮廓）
   4.2  Using the Circle     — 圆形的灵活运用

+  Common Mistakes（DON'Ts，对齐 WBTC 标准）
+  Credits
```

---

## 1 · Logo

> 对应 Aave 第 1 章（Ghost Logomark → Wordmark → Logo → Construction → Token Logo → Profile → Variations → Derivative）。USDD 把「幽灵」替换为「美元硬币」，把 Aave 的「表情变体 / 社区衍生 logo」替换为「sUSDD 子品牌 / 多链 token icon」。

### 1.1 Symbol　`T3`
USDD 的核心图形识别——**品牌绿圆形硬币，内嵌美元符号（$），顶部一对短横点缀**。链无关，是所有品牌资产的基础。

- **左列文案**：Symbol 是 USDD 视觉识别的核心，统一承载品牌于各平台；由简洁的圆形几何造型构成，无论印刷或数字、无论尺寸都保持一致识别。
- **右视觉**：品牌绿底，居中白色 Symbol（大）
- 适用：editorial / 新闻 / 社媒 / 二创等链无关内容

### 1.2 Wordmark　`T3`
`USDD` 字标，与 Symbol 同源的几何造型。

- **左列文案**：Wordmark 由 Symbol 延展支撑；字形采用与 Symbol 一致的圆润几何骨架。
- **右视觉**：品牌绿底，居中白色 `USDD` 字标（大）
- ⚠️ 待 Luke / Daivd 交付真实矢量源；当前 prototype 用 Inter 占位

### 1.3 Logo　`T3`
完整 Logo＝Symbol + Wordmark 的组合锁定。

- **左列文案**：完整 USDD Logo 是 Symbol 与 Wordmark 的组合。
- **右视觉**：品牌绿底，Symbol（左）+ `USDD`（右）水平锁定，居中
- 三种标准变体（可单列一页 `T4`）：

| 变体 | 构成 | 适用场景 |
|------|------|---------|
| Symbol Only | 圆形硬币 | 头像 / favicon / app icon |
| Horizontal | Symbol + `USDD` | 导航栏 / 合作展示 |
| + Tagline | Symbol + `USDD` + `Decentralized USD` | 官网 Hero / 品牌背板 |

### 1.4 Logo Construction　`T3`
构成规则与安全间距（对齐 Aave 1.4 的「明 / 暗双图 + 节点描线」做法）。

- **页 A（浅底）**：把 Logo 拆成 `Symbol`｜`Wordmark` 两块，标注组合关系
- **页 B（深底）**：Logo 轮廓 + 锚点节点描线，展示几何构造
- **安全间距**：四周留白 = Symbol 高度 × 50%
- **最小尺寸**：数字端 40px / 印刷端 12mm

### 1.5 Token Logo　`T3`
把 Symbol 放进圆形容器——即「硬币」形态本身，用于链无关的 token 展示。

- **左列文案**：Token Logo 由 Symbol 居中置于圆形容器构成。
- **右视觉**：浅底，居中品牌绿圆形硬币（白色 $）

### 1.6 Profile Picture　`T4`
社媒头像容器规范。

- **栏目**：`Square`（App Store / Google Play / 部分 CEX 圆角方形）｜`Circular`（X / Discord / Telegram 圆形）
- **右视觉**：两栏并列，各放一版 Symbol 容器示意

### 1.7 USDD & sUSDD — Sub-brand　`T4`
> 对应 Aave 1.7「Logomark Variations」。Aave 用表情区分变体；USDD 用 **储蓄子品牌 sUSDD** 作为同源衍生。

- **左列文案**：sUSDD 是 USDD 的储蓄版衍生品牌，沿用同一硬币造型，仅以品牌绿明度区分。
- **栏目**：`USDD`（深绿 `#216C58`）｜`sUSDD`（亮绿 `#36B364`）两个 Symbol 并排对照
- 注：sUSDD 在 TRON 实际承载为 **jUSDD**，故品牌资产层不展示 `sUSDD/TRON`

### 1.8 Token Icons　`T4`
> 对应 Aave 1.8「Derivative Logos」。带链标识的多链图标，用于需要明示链的集成场景。

| Icon | 链 | Badge |
|------|----|-------|
| USDD × TRON | TRON | TRON Red |
| USDD × Ethereum | ETH | ETH |
| USDD × BNB Chain | BNB | BNB |
| sUSDD × Ethereum | ETH | ETH |
| sUSDD × BNB Chain | BNB | BNB |

- 每卡＝中心 token Symbol + 右下角链 logo badge
- 适用：CEX listing / 钱包 / DeFi 协议 UI
- 卡片下方引导条：`Need contract addresses? → docs.usdd.io`
- 区分原则：**Symbol（1.1）用于链无关；Token Icon（1.8）用于明示链**

---

## 2 · Colors

> 对应 Aave 第 2 章（Core Palette → Extended Palettes → Logo Colorways → Derivative Palettes）。每色卡提供 **HEX / RGB / CMYK** 三组数据（对齐 WBTC 标准，覆盖屏幕 + 印刷）。

### 2.1 Brand Palette　`T5`
USDD 品牌识别色，4 主色。

| Token | HEX | 用途 |
|-------|-----|------|
| USDD Green | `#216C58` | 主品牌色 / 按钮 / 主填充 |
| sUSDD Green | `#36B364` | 子品牌 / 轻量强调 |
| Black | `#000000` | 深底 / 单色印刷 |
| White | `#FFFFFF` | 浅底 / Logo 反白 |

- **版式**：每色一张高圆角卡，卡内附 HEX / RGB / CMYK；双绿卡左上加 micro-tag（USDD / sUSDD）防混淆
- 交互（若做 HTML 版）：点色块复制 HEX + Toast `Copied #XXXXXX`

### 2.2 Extended Palette — UI Tokens　`T5`
产品 UI 内部的完整语义色阶，来源：Figma Design Tokens。

**Background**

| Token | HEX | 用途 |
|-------|-----|------|
| bg-page | `#0C0C0E` | 页面底色 |
| bg-card | `#181A1C` | 卡片底色 |
| bg-elevated | `#212426` | 浮层 / Dropdown |

**Text**

| Token | HEX | 用途 |
|-------|-----|------|
| text-primary | `#FFFFFF` | 主标题 / 正文 |
| text-secondary | `#CECECF` | 副标题 / 说明 |
| text-tertiary | `#9E9E9F` | 辅助 |
| text-quaternary | `#6D6D6E` | 占位 / 禁用 |

**Border**

| Token | HEX | 用途 |
|-------|-----|------|
| border-strong | `#49494A` | 强调边框 2px |
| border-default | `#303032` | 默认边框 1px |
| border-subtle | `#1F1F21` | 分割线 |

**Status**

| 状态 | Default | Hover | Active | Disabled |
|------|---------|-------|--------|----------|
| Success | `#448F6A` | `#60A080` | `#418865` | `#254737` |
| Warning | `#FF8F0B` | `#FF9E2D` | `#EF870D` | `#71440F` |
| Danger | `#D73133` | `#EA3A3C` | `#C52729` | `#611E1F` |

### 2.3 Logo Colorways　`T4`
> 对应 Aave 2.4。Logo / Wordmark 在不同底色的标准搭配（PRD 04 的 4 种 wordmark 变体）。

| 变体 | Logo 颜色 | 背景 |
|------|-----------|------|
| White on Dark | 白 | `#0C0C0E` 深底 ✅ |
| Black on Light | 黑 | `#FFFFFF` 浅底 ✅ |
| Brand Green Background | 白 | `#216C58` 品牌绿底 ✅ |
| Highlight Monochrome | 单色 | 单色印刷 ✅ |

- **版式**：四宫格，每格一种底色 + 对应 Logo
- ❌ 禁止：低对比度底 / 复杂图片底 / 非品牌色底

### 2.4 Chain Badge Colors　`T5`
> 对应 Aave 2.6「Derivative Palettes」。多链 badge 衍生色，仅用于 1.8 Token Icons 的链标识。

| 链 | HEX |
|----|-----|
| TRON | `#FF060A` |
| Ethereum | `#627EEA` |
| BNB Chain | `#F0B90B` |

---

## 3 · Typeface

> 对应 Aave 第 3 章（Brand Typeface → Weights → Alternative Glyphs → Hierarchy → Using Typefaces）。Aave 用定制字体 FT Regola Neue；USDD 用开源 **Inter**，故省略「Alternative Glyphs」一节。

### 3.1 Brand Typeface　`T3`（大字版面）
USDD 唯一指定字体：**Inter**。

- **版面**：超大 `Inter` 字样标题 + 一组品牌相关词的大字阵列（如 `Stablecoin · Reserve · Peg · USD · 100%`），呼应 Aave 3.1 的 `Protocol / Borrow / Assets` 做法
- **左列文案**：Inter 开源免费，几何无衬线，数字清晰，覆盖数字端与印刷场景。
- 获取：rsms.me/inter

### 3.2 Typeface Weights　`T3`
3 个品牌字重。

| 字重 | 用途 |
|------|------|
| Regular 400 | 正文 / 说明 / 数据标注 |
| Medium 500 | 导航 / 标签 / 次级标题 |
| Semi Bold 600 | 标题 / 卡片标题 / 按钮 |

- **版面**：左侧 `Regular / Medium / Semi Bold` 大字叠放，右侧 `AaBbCc` 字形对照

### 3.3 Typeface Hierarchy　`T3`
9 级字阶，来源：Figma Typography。基础单位 4px，行高均为 4 的倍数。

| 级别 | 字号 | 行高 | 字重 | 用途 |
|------|------|------|------|------|
| Display-1 | 56 | 78 | Semi Bold | Hero 主标题 |
| Display-2 | 48 | 68 | Semi Bold | 大标题 |
| Heading-1 | 40 | 56 | Semi Bold | 页面 H1 |
| Heading-2 | 32 | 46 | Semi Bold | Section 标题 |
| Heading-3 | 24 | 34 | Semi Bold | 卡片标题 |
| Heading-4 | 20 | 28 | Semi Bold | 小标题 / 标签 |
| Body-lg | 16 | 22 | Regular | 正文 |
| Body-md | 14 | 20 | Regular | 说明 |
| Body-sm | 12 | 18 | Regular | 注释 / Caption |

### 3.4 Using Typefaces　`T4`
实际应用示例（对齐 Aave 3.5 的双卡做法）。

- **卡 A**：标题 Semi Bold + 正文 Regular 的段落范例
- **卡 B**：数据卡——大字数字（Semi Bold）+ 单位标注（Regular）；强调 Inter 的等宽数字适合 token 金额展示
- 规则：标题用 Medium / Semi Bold，正文用 Regular

---

## 4 · Brand Accents

> 对应 Aave 第 4 章（The Semicircle → Using the Semicircle → Illustrations）。Aave 的图形源自幽灵头顶半圆；USDD 的天然图形是 **完整圆形（硬币轮廓）**。Illustrations 一节 USDD 暂无吉祥物，标为可选。

### 4.1 The Circle　`T3`
USDD 的品牌图形元素——圆形，源自硬币 Symbol 的基础造型。

- **推导图**：Symbol → 去掉内部 $ → 纯圆形轮廓
- **左列文案**：圆形是 USDD 视觉语言的基础单元，代表稳定、完整、循环流通。

### 4.2 Using the Circle　`T4`
圆形元素的灵活运用（对齐 Aave 4.2：standalone / repeated-rotated / overlapped，simple→detailed）。

- **A**：单独使用（背景装饰 / 分割）
- **B**：重复 / 叠加（图案 / Section 背景）
- **C**：与文字组合（数据卡 / 社媒封面）
- ❌ 禁止：圆形与文字重叠遮挡

### 4.3 Illustrations（可选 / TBD）
USDD 暂无吉祥物体系。若后续建立，参照 Aave 4.3「Ronnie 幽灵」做法：半透明插画 + 多底色适配。**当前留空，待设计团队确认。**

---

## + · Common Mistakes（DON'Ts）　`T4`

> Aave VIG 未单设此章，但 USDD Brand Kit 已有（PRD 06，对齐 WBTC 标准）。建议正式 Brand Book 收录，放在 Logo 章之后或全册末尾。

8 条禁用示范，每条用 CSS filter / transform 即时演示错误效果（原文件不被修改）：

`Recolor`（改色）·`Crop`（裁切）·`Delete elements`（删元素）·`Shadows`（加阴影）·`Rotate`（旋转）·`Mirror`（镜像）·`Opacity`（改透明度）·`Squeeze`（压缩变形）

---

## + · Credits　`T1`（封底）

满版品牌绿底，左上 `USDD` / `Visual Identity Guidelines`，下方署名：

```
Design: USDD Brand Team
Typeface by Inter (rsms.me/inter)
Press: press@usdd.io
```

---

## Brand Voice — 官方文案（来源：Figma brandbook node 1:50 / 1:51）

**Tagline**
> Leading The Financial Future With Stability And Transparency

**Boilerplate（媒体长文案）**
> Decentralized USD (USDD) is a fully decentralized stablecoin pegged to the US dollar through crypto reserves.

**Logo 副标题**
> Decentralized USD

---

## 页面计划（Slides 估算）

| 章节 | 子节 | 预计页数 |
|------|------|---------|
| Cover + Index | — | 2 |
| 1 · Logo | 1.1–1.8（8 节） | 10–12 |
| 2 · Colors | 2.1–2.4（4 节） | 6–8 |
| 3 · Typeface | 3.1–3.4（4 节） | 5–7 |
| 4 · Brand Accents | 4.1–4.3（3 节） | 4–6 |
| Common Mistakes | — | 1–2 |
| Credits | — | 1 |
| **合计** | | **约 29–38 页** |

---

## 待确认 / 待补充

| 项目 | 说明 | Owner |
|------|------|-------|
| USDD / sUSDD Wordmark 矢量源 | 当前 Inter 占位 | Luke / Daivd |
| Brand Palette 的 RGB / CMYK 值 | 印刷场景需补全 3 组 | 设计组 |
| 2.2 渐变色（gradient-primary / heading）具体色值 | 从 Figma 渐变面板核实 | 设计组 |
| 4.3 Illustrations 是否建立吉祥物体系 | 暂留空 | 设计团队 |
| Common Mistakes 是否纳入正式册 | 建议纳入 | Luke |

---

## 变更记录

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v0.1 | 2026-06-01 | 初稿（8 章节结构） |
| v0.2 | 2026-06-01 | 参照 Aave VIG 重构为 4 章 + 页面计划 |
| v0.3 | 2026-06-01 | 逐页拆解 Aave VIG（36 页）后重写：补 5 套版式模板（T1–T5）、对齐章节顺序、并入 PRD 真实数据（sUSDD Green `#36B364`、HEX/RGB/CMYK、Token Icons、Common Mistakes），每节标注版式模板 |
