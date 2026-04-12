# WINkLink · 官网 — 设计规范

> 规范来源：WINkLink 官网三份 Figma 设计稿 | 同步日期：2026-04-03
> Figma 规范文件：https://www.figma.com/design/0YwxUiiJnKVizEdoo36OKE

---

## 01 · 色彩系统

### 品牌主色

| Token | Hex | 用途 |
|---|---|---|
| `--yellow-primary` | `#F5C100` | 主品牌色、主按钮、激活态、强调 |
| `--yellow-hover` | `#FFD000` | 按钮 Hover 态 |

### 背景色阶

| Token | Hex | 用途 |
|---|---|---|
| `--bg-deep` | `#080E1C` | 最深背景（NavBar、Footer） |
| `--bg-base` | `#0D1525` | 页面主背景 |
| `--bg-section` | `#0F1828` | Section 背景（交替） |
| `--bg-card` | `#131E33` | 卡片背景 |
| `--bg-elevated` | `#1A2744` | 浮层、Dropdown、表头 |
| `--border-default` | `#1E3050` | 普通边框 |
| `--border-subtle` | `#162340` | 轻边框、分割线 |

### 文字色

| Token | Hex | 用途 |
|---|---|---|
| `--text-primary` | `#FFFFFF` | 主标题、主要正文 |
| `--text-secondary` | `#8899B2` | 次要描述文字 |
| `--text-muted` | `#5B6A82` | 辅助说明 |
| `--text-disabled` | `#3A4A62` | 禁用态（仅装饰性场景） |

### 语义色

| Hex | 语义 |
|---|---|
| `#02C076` | 成功、涨幅（绿） |
| `#F0A500` | 警告、提示（橙黄） |
| `#F6465D` | 错误、跌幅（红） |
| `#4A90D9` | 信息、链接（蓝） |

### 渐变与阴影

```css
--gradient-brand:      linear-gradient(90deg, #F5C100 0%, #F0A500 100%);
--shadow-card:         0 4px 20px rgba(0, 0, 0, 0.4);
--shadow-elevated:     0 8px 40px rgba(0, 0, 0, 0.6);
--shadow-glow-yellow:  0 0 24px rgba(245, 193, 0, 0.4);
--shadow-nav:          0 2px 16px rgba(0, 0, 0, 0.5);
```

---

## 02 · 字体排版

### 字族

| 场景 | 字体 |
|---|---|
| 英文 / 数字 | Inter（Fallback: -apple-system, sans-serif） |
| 中文 | PingFang SC（Fallback: Microsoft YaHei） |

### 字阶规范

| Token | 尺寸 | 字重 | 行高 | 用途 |
|---|---|---|---|---|
| Heading/H1 | 48px | Bold 700 | 1.2 | 页面主标题、Hero 标题 |
| Heading/H2 | 36px | Bold 700 | 1.3 | 章节标题 |
| Heading/H3 | 28px | Semi Bold 600 | 1.4 | 卡片标题、副标题 |
| Heading/H4 | 22px | Semi Bold 600 | 1.4 | 小节标题、导航项 |
| Body/Large | 18px | Regular 400 | 1.6 | 大正文、功能描述 |
| Body/Default | 16px | Regular 400 | 1.6 | 默认正文 |
| Body/Small | 14px | Regular 400 | 1.6 | 小正文、表格内容 |
| Label/Medium | 14px | Medium 500 | 1.4 | 按钮文字、标签 |
| Label/Small | 12px | Medium 500 | 1.4 | Tag、小标签 |
| Caption | 11px | Regular 400 | 1.4 | 注释、版权、辅助文字 |

---

## 03 · 间距系统

基准单位：**8px**（精细调整使用 4px）

| 值 | 用途 |
|---|---|
| 4px | 图标与文字间距 |
| 8px | 行内元素 |
| 12px | 卡片内小间距 |
| 16px | 标准内边距 |
| 20px | 组件间距 |
| 24px | Section 内间距 |
| 32px | 卡片间距 |
| 40px | Section 主要间距 |
| 48px | 大块间距 |
| 64px | Section 间距 |
| 80px | 大 Section 上下 padding |
| 120px | Hero 区上下内边距 |

---

## 04 · 圆角

| Token | 值 | 用途 |
|---|---|---|
| xs | 4px | Tag、小徽章 |
| sm | 8px | 输入框、小卡片 |
| md | 12px | 标准卡片、表格容器 |
| lg | 16px | 功能卡片 |
| xl | 20px | 大卡片、弹窗 |
| 2xl | 24px | 高亮卡片 |
| pill | 50px | 胶囊按钮（Primary Button） |
| circle | 50% | 头像、圆形图标 |

---

## 05 · 图标规范

| 尺寸 | 用途 |
|---|---|
| 16×16px | 内联图标（列表项、标签内） |
| 20×20px | 导航项、菜单 |
| 24×24px | 卡片图标、按钮 |
| 32×32px | 功能模块图标 |
| 40×40px | Section 特性图标 |
| 48×48px | Hero 区主图标 |
| 64×64px | 空状态插图 |

- 风格：线性描边（Stroke-based），1.5px，圆角端点
- 格式：SVG 优先（支持 `currentColor` 主题切换）；3D 装饰图使用 WebP / PNG @2×
- 颜色：默认 `currentColor`；品牌高亮 `#F5C100`；禁用 `#3A4A62`

---

## 06 · 组件规范

### 导航栏（NavBar）

- 高度：64px，背景：`#080E1C` + `backdrop-filter: blur(12px)`，position: sticky
- 内边距：0 80px；内容最大宽度：1440px
- Logo：**WIN**（`#F5C100`）+ **kLink**（`#FFFFFF`），Inter Bold 18px
- 导航链接：Inter Medium 14px，默认 `#8899B2`，Hover/Active：`#F5C100` + 2px 底部线
- CTA "Launch App"：黄底深色字，50px 胶囊圆角，约 120×36px

| 状态 | 文字色 | 指示 |
|---|---|---|
| Default | `#8899B2` | — |
| Hover | `#F5C100` | — |
| Active / Current | `#F5C100` | 2px 黄色底部线 |

---

### Button 按钮

| 变体 | 背景 | 文字 | 圆角 |
|---|---|---|---|
| Primary Default | `#F5C100` | `#080E1C` | 50px |
| Primary Hover | `#FFD000` + scale(1.02) | `#080E1C` | 50px |
| Primary Disabled | `#F5C100` opacity 35% | — | 50px |
| Secondary Default | `#131E33` + border `#1E3050` | `#FFFFFF` | 50px |
| Secondary Hover | border 变 `#F5C100`，文字变 `#F5C100` | — | 50px |
| Ghost / Text | 无背景无边框 | `#F5C100` | — |

| 尺寸 | 高度 | 字号 | 内边距 |
|---|---|---|---|
| Large (lg) | 52px | 18px | 0 32px |
| Default (md) | 44px | 16px | 0 24px |
| Small (sm) | 36px | 14px | 0 16px |
| XSmall (xs) | 28px | 12px | 0 12px |

**状态规则：**
- Hover：亮度 +10%，scale(1.02)，`--shadow-glow-yellow`
- Active：scale(0.98)
- Disabled：opacity 35%
- Focus：`outline: 2px solid #F5C100; outline-offset: 2px`

---

### Card 卡片

| 类型 | 宽×高 | 圆角 | 边框 | Hover |
|---|---|---|---|---|
| Feature Card | 280×220px+ | 16px | `#1E3050` | translateY(-4px) + 边框变 `#F5C100` |
| Stats Card | 240×96px | 12px | `#1E3050` | `--shadow-glow-yellow` |
| Highlight Card | 280×220px+ | 20px | `#F5C100` | — |
| Data Row Card | 400×56px | 8px | `#162340` | 背景加深 |

- Feature Card 内边距：24px
- Stats Card 内边距：20px 24px
- Hover 动效：250ms ease-out

---

### Badge / Tag 标签

| 变体 | 背景 | 文字 | 圆角 |
|---|---|---|---|
| Brand / Ecosystem | `rgba(245,193,0,0.15)` | `#F5C100` | 4px |
| New | `#F5C100` | `#080E1C` | 4px |
| Success | `rgba(2,192,118,0.15)` | `#02C076` | 4px |
| Warning | `rgba(240,165,0,0.15)` | `#F0A500` | 4px |
| Error | `rgba(246,70,93,0.15)` | `#F6465D` | 4px |
| Info | `rgba(74,144,217,0.15)` | `#4A90D9` | 4px |
| Neutral | `#1A2744` | `#8899B2` | 4px |

- 字号：Inter SemiBold 10–12px
- 高度：SM 20px / MD 24px / LG 28px
- 内边距：0 8px ~ 0 12px

---

### Table 数据表格

| 属性 | 值 |
|---|---|
| 容器背景 | `#131E33`，圆角 12px |
| 表头背景 | `#1A2744`，高度 48px |
| 表头文字 | Inter SemiBold 13px，`#8899B2` |
| 数据行文字 | Inter Regular 13px |
| Pair 列 | `#FFFFFF`（白色） |
| 其余列 | `#8899B2`（次要色） |
| 行高 | 48px |
| 交替背景 | `#131E33` / `#0F1828` |
| Action "view" | 黄色文字 `#F5C100`，`rgba(245,193,0,0.15)` 背景，圆角 6px |
| 空状态 | 图标 + 提示文字，居中对齐 |

---

### Footer 页脚

- 背景：`#080E1C`（最深层）
- 内边距：80px（左右）
- Logo：Inter Bold 18px，WIN 黄色 + kLink 白色
- 栏标题：Inter Medium 13px，白色
- 链接：Regular 12px，`#8899B2`，Hover 变 `#F5C100`
- 分割线：`#162340`
- 版权：11px，`#5B6A82`

---

## 07 · 布局与栅格

### 响应式断点

| 断点 | 宽度 | 说明 |
|---|---|---|
| xs | < 375px | 极小屏手机 |
| sm | 375–767px | 手机 |
| md | 768–1023px | 平板 |
| lg | 1024–1279px | 小桌面 |
| xl | 1280–1439px | 标准桌面 |
| 2xl | 1440px+ | 宽屏（主设计稿基准） |
| 3xl | 2560px+ | 大屏适配 |

### 栅格（1440px 基准）

- 内容区最大宽度：**1200px**（左右各 120px 边距）
- 栅格：12 列，gutter 24px，单列约 76px

### 页面垂直结构

| 区块 | 高度 | 说明 |
|---|---|---|
| Navigation Bar | 64px | sticky，blur |
| Hero / KV | 740px+ | 主 Banner |
| Stats Bar | ~100px | 数据统计行 |
| Section 内容 | Auto | 功能介绍、生态等 |
| Footer | 300px+ | 深色底，链接导航 |

---

## 08 · 动效规范

| 场景 | 时长 | 缓动 |
|---|---|---|
| 按钮色彩 / 透明度 | 150ms | ease-out |
| 按钮缩放（Hover） | 150ms | ease-out |
| 卡片上浮 | 250ms | ease-out |
| 导航下拉展开 | 200ms | ease-out |
| 导航下拉收起 | 150ms | ease-in |
| 数字计数 CountUp | 1200ms | ease-out |
| Section 入场 | 600ms | cubic-bezier(0,0,0.2,1) |
| Modal 展开 | 300ms | cubic-bezier(0,0,0.2,1) |

```css
--duration-fast:   150ms;
--duration-normal: 250ms;
--duration-enter:  300ms;
--duration-exit:   200ms;
--ease-std:   cubic-bezier(0.4, 0, 0.2, 1);
--ease-decel: cubic-bezier(0, 0, 0.2, 1);
```

- Section 入场：IntersectionObserver，opacity(0→1) + translateY(20px→0)
- 减少动效：通过 `prefers-reduced-motion` 降级（animation-duration: 0.01ms）

---

## 09 · 层级（Z-index）

| 层级名 | z-index | 说明 |
|---|---|---|
| base | 0 | 普通内容 |
| card-hover | 10 | 卡片悬浮态 |
| sticky-nav | 100 | 导航栏 |
| dropdown | 200 | 下拉菜单 |
| modal | 300 | 弹窗 |
| toast | 400 | 通知提示 |
| loading | 999 | 加载遮罩 |

---

| 版本 | 日期 | 变更说明 |
|---|---|---|
| v1.0 | 2026-04-03 | 初版，基于三份 WINkLink 官网 Figma 设计稿整理 |
