# Web 端设计规范

> 来源：TRON 官网规范 V3.5.0 · 同步日期：2026-03-31 | 负责人：待填写

---

## 色彩系统

### 主色调

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--color-brand-red` | `#D01919` | 主按钮、强调色、品牌识别 |
| `--color-brand-red-hover` | `#E5282A` | 主按钮 hover / active 状态 |
| `--color-bg-black` | `#000000` | 页面主背景 |
| `--color-bg-deep` | `#0D0D0D` | 卡片、模块背景 |
| `--color-bg-surface` | `#1A1A1A` | 次级区块、输入框背景 |

### 文字色彩

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--color-text-primary` | `#FFFFFF` | 主要标题与正文 |
| `--color-text-secondary` | `#999999` | 次要文本、辅助说明 |
| `--color-text-tertiary` | `#666666` | 占位符、禁用状态文字 |
| `--color-text-link` | `#FFFFFF` | 导航链接（hover 时加下划线） |

### 边框 & 分割线

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--color-border-default` | `#2A2A2A` | 卡片边框、分割线 |
| `--color-border-light` | `#3A3A3A` | 输入框、hover 边框 |

### 功能色

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--color-success` | `#00C48C` | 成功状态、正向数据 |
| `--color-warning` | `#FFB020` | 警告提示 |
| `--color-error` | `#E5282A` | 错误状态（与品牌红复用） |

### 渐变

```css
/* 品牌主渐变（横向） */
background: linear-gradient(90deg, #D01919 0%, #FF4444 100%);

/* 背景氛围渐变（Hero 区域红色光晕） */
background: radial-gradient(ellipse at center, rgba(208,25,25,0.3) 0%, rgba(0,0,0,0) 70%);
```

---

## 字体排版

### 字体家族

| 字体 | 用途 | 语言 |
| --- | --- | --- |
| **Zero World** | 展示标题、数字大字、Hero 文案 | 英文 |
| **PingFang HK Semibold / Medium** | 中文标题、中文正文 | 中文 |
| **Inter / SF Pro Display** | 英文正文、数据展示 | 英文 |

### 字号规范

| 级别 | 字号 | 字重 | 行高 | 用途 |
| --- | --- | --- | --- | --- |
| Display XL | 96px | 700 | 1.1 | Hero 超大标题 |
| Display L | 64px | 700 | 1.15 | 节标题 |
| H1 | 48px | 600 | 1.2 | 页面主标题 |
| H2 | 36px | 600 | 1.25 | 区块标题 |
| H3 | 24px | 500 | 1.3 | 卡片标题、子标题 |
| Body L | 18px | 400 | 1.6 | 大段正文 |
| Body M | 16px | 400 | 1.6 | 标准正文 |
| Body S | 14px | 400 | 1.5 | 辅助说明、标签 |
| Caption | 12px | 400 | 1.4 | 注释、时间戳 |

### 字体颜色使用

- 主标题：`#FFFFFF`
- 描述/正文：`#999999`
- 高亮/强调：`#D01919`
- 链接 hover：`#FFFFFF` + `underline`

### 数字展示（统计数据）

- 字体：Zero World / Inter Semibold
- 字号：48–96px（根据重要程度）
- 颜色：`#FFFFFF`

---

## 间距系统（8px 基准）

| Token | 值 | 用途 |
| --- | --- | --- |
| `--spacing-1` | 4px | 极小间距 |
| `--spacing-2` | 8px | 组件内间距 |
| `--spacing-3` | 12px | 小型内边距 |
| `--spacing-4` | 16px | 标准内边距 |
| `--spacing-6` | 24px | 卡片内边距 |
| `--spacing-8` | 32px | 区块内边距 |
| `--spacing-12` | 48px | 区块间距 |
| `--spacing-16` | 64px | 节间距 |
| `--spacing-24` | 96px | Hero 区间距 |

---

## 圆角规范

| Token | 值 | 用途 |
| --- | --- | --- |
| `--radius-sm` | 6px | 标签、小组件 |
| `--radius-md` | 8px | 输入框 |
| `--radius-lg` | 12px | 图标容器 |
| `--radius-xl` | 16px | 卡片 |
| `--radius-2xl` | 20px | 模态框 |
| `--radius-full` | 100px | 按钮（Pill）、Tab |

---

## 阴影规范

```css
--shadow-sm:  0 2px 8px rgba(0,0,0,0.4);
--shadow-md:  0 4px 16px rgba(0,0,0,0.5);
--shadow-lg:  0 8px 32px rgba(0,0,0,0.6);
--shadow-red: 0 4px 24px rgba(208,25,25,0.3);  /* 品牌红光晕 */
```

---

## 响应式断点

| 断点 | 宽度 | 容器宽度 | 内边距 |
| --- | --- | --- | --- |
| Desktop XL | ≥ 1440px | 1280px | 0 auto |
| Desktop | 1200–1439px | 1140px | 0 auto |
| Laptop | 960–1199px | 全宽 | 0 40px |
| Tablet | 768–959px | 全宽 | 0 32px |
| Mobile | < 768px | 全宽 | 0 20px |

**网格系统**：12 列，列间距 24px，最大内容宽 1280px

---

## 动效规范

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);    /* 标准动效 */
--ease-in:      cubic-bezier(0.4, 0, 1, 1);       /* 元素退出 */
--ease-out:     cubic-bezier(0, 0, 0.2, 1);       /* 元素进入 */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性效果 */
```

| 场景 | 效果 |
| --- | --- |
| 按钮 hover | 0.2s ease，轻微亮度提升 + 光晕 |
| 链接 hover | 0.15s，下划线出现 |
| 卡片 hover | 0.2s，上移 4px + 边框高亮至 `#D01919` |
| 页面滚动 | 特定区块使用视差滚动（Sticky Sections） |
| 数字计数 | 关键数据使用 Count Up 滚动计数动效 |

---

## Z-Index 层级

| 层级 | 值 | 场景 |
| --- | --- | --- |
| Base | 0 | 普通内容 |
| Sticky | 100 | 吸顶元素 |
| Dropdown | 200 | 下拉菜单 |
| Header | 1000 | 全局导航 |
| Modal Overlay | 1100 | 遮罩层 |
| Modal Content | 1200 | 弹窗内容 |
| Toast | 1300 | 通知提示 |

---

## 视觉风格

- **整体基调**：纯黑暗色背景 + 品牌红高光，科技感 3D 视觉风格
- **3D 元素**：高质量 3D 渲染物件（抽象几何体、球形、金属质感）
- **光晕效果**：Hero、CTA 周边使用红色光晕
- **纹理**：背景可叠加细密网格纹（低不透明度）
- **图片色调**：所有图片在深色背景下展示，不允许白色背景截图

### 图片尺寸规范

| 类型 | 规格 | 说明 |
| --- | --- | --- |
| Hero Banner | 1440 × 720 px | 全宽，3D 视觉主图 |
| Feature Block 图 | 600 × 400 px | 模块配图，深色背景 |
| 图标配图 | 80 × 80 px | 功能图标附带装饰图 |
| 钱包/合作方 Logo | 48 × 48 px（圆角 12px） | 统一尺寸展示 |

---

## Header & Footer

### Header

- **高度**：64px（普通）/ 80px（Hero 透明模式）
- **背景**：`rgba(0,0,0,0.9)` + `backdrop-filter: blur(20px)`
- **定位**：sticky top:0，z-index: 1000
- **底部边框**：`1px solid #1A1A1A`（滚动后出现）
- **结构**：`[TRON Logo]  [导航链接]  [CTA Button]`
- **Logo**：TRON 六边形标志 + 文字，高度 32px
- **导航链接**：14px · Regular · `#FFFFFF`，hover 时 ```#D01919`
- **导航菜单**：Ecosystem / Developers / Foundation / Community / Blog

### Footer

- **背景**：`#000000`
- **顶部 Section**：`#0D0D0D`，包含链接列
- **底部 Bar**：`#D01919`（品牌红），高度 48px
- **链接颜色**：`#999999`，hover: `#FFFFFF`
- **分组标题**：`#FFFFFF` · 14px · Semibold
- **社交图标**：20px，hover: `#D01919`


---


> 来源：TRON 官网规范 V3.5.0 · 同步日期：2026-03-31 | 负责人：待填写

---

## 使用原则

- 优先使用设计系统中已有组件，不随意新增
- 新增组件需在本文件登记，并在 Figma 组件库同步
- 组件变更需通知开发同步修改

---

## 按钮 Button

### Primary Button（主按钮）

```
背景：#D01919
文字：#FFFFFF · 14px · Semibold
圆角：100px（Pill）
内边距：12px 24px
最小宽度：120px

Regular:  背景 #D01919
Hover:    背景 #E5282A，scale(1.02)，光晕效果
Disabled: 背景 #666666，文字 #999999
```

### Secondary Button（次要按钮）

```
背景：#FFFFFF
文字：#000000 · 14px · Semibold
圆角：100px（Pill）
内边距：12px 24px

Regular:  背景 #FFFFFF
Hover:    背景 #F0F0F0
```

### Dropdown Button（下拉按钮）

```
背景：#1A1A1A
文字：#FFFFFF · 14px · Medium
圆角：100px
内边距：10px 20px
末尾带 "↓" 下拉箭头

示例：Start ↓
```

### Text Link（文字链接）

```
文字：#FFFFFF · 14px · Regular
下划线：默认无，hover 时显示
过渡：0.15s

示例：What is TRX
```

### Arrow Link（箭头链接）

```
文字：#FFFFFF · 14px · Regular
末尾带 "→" 箭头
hover 时箭头向右位移 4px

示例：View Burn Records →
```

---

## 卡片 Card

```
背景：#0D0D0D 或 #111111
边框：1px solid #2A2A2A
圆角：16px（--radius-xl）
内边距：24px
hover 边框：1px solid #D01919
hover 位移：translateY(-4px)，过渡 0.2s ease
```

---

## 输入框 Input

```
背景：#1A1A1A
边框：1px solid #2A2A2A
圆角：8px（--radius-md）
内边距：12px 16px
文字：#FFFFFF · 14px
占位符：#666666
focus 边框：1px solid #D01919
error 边框：1px solid #E5282A
```

---

## Tab / Filter

```
容器背景：#1A1A1A · 圆角 100px
选项：All | Mobile | Extension | Hardware Wallet

未选中：文字 #999999，背景透明
选中：  背景 #000000，文字 #FFFFFF，圆角 100px
        可带数字 Badge（白底黑字，圆角）
过渡：0.2s ease
```

---

## 数据表格 Table

```
整体背景：#0D0D0D
表头背景：#1A1A1A
表头文字：#999999 · 12px · Medium
行内文字：#FFFFFF · 14px · Regular
行间分割：1px solid #1A1A1A
hover 行背景：#1A1A1A
```

---

## 进度条 Progress

```
背景轨道：#1A1A1A
填充色：#D01919（或品牌渐变）
高度：4–8px
圆角：100px
```

---

## 徽章 / 标签 Badge & Tag

```
背景：#D01919（品牌红）或 #1A1A1A
文字：#FFFFFF · 12px · Medium
圆角：100px
内边距：4px 10px
```

---

## 模态框 Modal

```
遮罩：rgba(0,0,0,0.8) · backdrop-filter: blur(8px)
容器背景：#111111
边框：1px solid #2A2A2A
圆角：20px（--radius-2xl）
内边距：32px
```

---

## 通知 Toast

```
背景：#1A1A1A
边框：1px solid #2A2A2A
圆角：12px（--radius-lg）
图标：左侧对应功能色（success/warning/error）
文字：#FFFFFF · 14px
最大宽度：400px
```

---

## 图标 Icon

### 尺寸规范

| 尺寸 | 用途 |
| --- | --- |
| 16 × 16 px | 行内小图标、标签 |
| 20 × 20 px | 导航栏图标 |
| 24 × 24 px | 功能区标准图标 |
| 32 × 32 px | 卡片图标 |
| 48 × 48 px | 大型功能图标 |

### 图标风格

- **线性（Outline）**：主要使用 1.5px 描边，圆角端点，用于功能图标
- **填充（Solid）**：用于强调/激活状态
- **品牌图标**：TRON 六边形 Logo，固定使用 `#D01919`

### 钱包生态图标

展示规格：48 × 48 px，圆角 12px，深色背景卡片内

| 类型 | 示例 |
| --- | --- |
| Mobile Wallet | TronLink、Trust Wallet、TokenPocket、imToken、BitKeep |
| Extension | TronLink Pro、MetaMask、SafePal |
| Hardware Wallet | Ledger、Trezor |
| Exchange | Bybit、Cobo、OKX、Bitget |

---

## 页面结构模板

### 二级页通用结构

```
┌─────────────────────────┐
│ Header（粘性导航）        │
├─────────────────────────┤
│ Page Hero               │
│  标题（64px · Zero World）│
│  副标题（18px · #999999） │
│  内边距：120px 0 80px    │
├─────────────────────────┤
│ 内容模块 Section ×N      │
├─────────────────────────┤
│ Footer                  │
└─────────────────────────┘
```

Page Hero 背景：黑色 + 红色光晕渐变（品牌 3D 视觉资产）

---

## 废弃组件

| 组件名 | 废弃原因 | 替代方案 |
| --- | --- | --- |
| 待填写 | - | - |
