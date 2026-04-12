# JustLend DAO · Portal 设计规范

> 规范来源：Portal 首页改版 Figma（`ZaiKfoj2ttE5Cb1XhlU2ej`）
> 最后更新：2026-04-07 | 负责人：Leo
> 覆盖端：**Web（1440px 基准）** · **Mobile App（375px 基准，响应式适配）**

---

## 目录

1. [色彩系统](#1-色彩系统)
2. [字体排版](#2-字体排版)
3. [间距系统](#3-间距系统)
4. [圆角规范](#4-圆角规范)
5. [阴影与层级](#5-阴影与层级)
6. [布局与栅格](#6-布局与栅格)
7. [组件规范](#7-组件规范)
8. [交互与动效](#8-交互与动效)
9. [图标与图像](#9-图标与图像)
10. [无障碍（Accessibility）](#10-无障碍)
11. [内容与文案规范](#11-内容与文案规范)
12. [Mobile App 适配规范](#12-mobile-app-适配规范)
13. [Design Token 汇总](#13-design-token-汇总)
14. [变更日志](#14-变更日志)

---

## 1. 色彩系统

### 1.1 品牌主色（Primary）

| Token | Hex | 用途 |
|---|---|---|
| `--color-primary-teal` | `#01C1AE` | 主品牌色、主按钮、强调链接、焦点环 |
| `--color-primary-teal-bright` | `#01FADA` | Hover 高亮、发光效果 |
| `--color-primary-teal-mid` | `#67DBCC` | Hero CTA 按钮背景、描述性高亮文字 |
| `--color-primary-blue` | `#3554F5` | 辅助主色、渐变起点 |
| `--color-primary-blue-light` | `#5566FD` | 按钮 Hover 蓝 |
| `--color-primary-blue-accent` | `#74A4FD` | 文字渐变结束色、链接色、Tag |

### 1.2 辅助色（Secondary）

| Token | Hex | 用途 |
|---|---|---|
| `--color-secondary-teal-deep` | `#01C89E` | 深色背景上的辅助强调 |
| `--color-secondary-green` | `#26A17B` | 涨幅、正向数据 |

### 1.3 中性色（Neutral）

| Token | Hex | 用途 |
|---|---|---|
| `--color-bg-deep` | `#04050F` | 最深背景层 |
| `--color-bg-base` | `#0A0E19` | 页面主背景 |
| `--color-bg-section` | `#060810` | Section 背景 |
| `--color-bg-card` | `#1C2235` | 卡片背景 |
| `--color-bg-card-hover` | `#202732` | 卡片 Hover 背景 |
| `--color-bg-elevated` | `#262A32` | 浮层、Dropdown 背景 |
| `--color-border-subtle` | `rgba(255,255,255,0.08)` | 卡片边框 |
| `--color-border-default` | `rgba(255,255,255,0.12)` | 普通边框 |

### 1.4 文字色（Text）

| Token | Hex | 用途 |
|---|---|---|
| `--color-text-primary` | `#FFFFFF` | 主标题、主要正文 |
| `--color-text-high` | `#E4F1F1` | 高对比度正文 |
| `--color-text-secondary` | `#9AA3BC` | 次要描述文字、导航链接 Default 态 |
| `--color-text-muted` | `#BEC6D9` | 辅助说明 |
| `--color-text-disabled` | `#5F687C` | 禁用态（仅装饰性，不传达有效信息） |

### 1.5 语义色（Semantic）

| Token | Hex | 语义 |
|---|---|---|
| `--color-success` | `#26A17B` | 成功、正向数据 |
| `--color-warning` | `#FFDE02` | 警告、提示 |
| `--color-warning-orange` | `#F7931A` | 中等风险 |
| `--color-error` | `#CC3440` | 错误、危险 |
| `--color-error-bright` | `#FF5450` | 红色数据高亮 |

### 1.6 品牌渐变（Gradient）

```css
/* 主品牌渐变（CTA 按钮、强调区块） */
--gradient-primary: linear-gradient(135deg, #01C1AE 0%, #3554F5 100%);

/* Hero 标题文字渐变 */
--gradient-hero-text: linear-gradient(180deg, #FFFFFF 72.964%, #74A4FD 87.813%);

/* 发光晕染（背景装饰） */
--gradient-glow-teal: radial-gradient(circle, rgba(1,193,174,0.3) 0%, transparent 70%);
--gradient-glow-blue: radial-gradient(circle, rgba(53,84,245,0.25) 0%, transparent 70%);

/* Hero 背景 */
--gradient-hero-bg: linear-gradient(180deg, #060810 0%, #0A0E19 50%, #05072A 100%);
```

---

## 2. 字体排版

### 2.1 字族（Font Family）

| 场景 | 字体 |
|---|---|
| 英文主字体 | **Poppins** |
| 中文主字体 | **PingFang SC** |
| 装饰数字（加载百分比） | **Bahianita** |
| 特殊数据展示 | **Baumans** |

```css
--font-en: 'Poppins', -apple-system, sans-serif;
--font-zh: 'PingFang SC', 'Microsoft YaHei', sans-serif;
--font-display: 'Bahianita', 'Baumans', serif;
```

### 2.2 字号规格（Web）

| Token | 尺寸 | 字重 | 行高 | 用途 |
|---|---|---|---|---|
| `--text-hero` | 90px | Bold 700 | 80px (0.89) | Hero 主标题（`JUSTLEND DAO`） |
| `--text-display` | 66px | Medium 500 | 1.1 | 特殊展示标题 |
| `--text-h1` | 46px | SemiBold 600 | 1.2 | 一级标题 |
| `--text-h2` | 30px | SemiBold 600 | 1.3 | 二级标题 |
| `--text-h3` | 24px | SemiBold / Medium | 1.4 | 三级标题 / 卡片标题 |
| `--text-h4` | 20px | SemiBold / Medium | 1.4 | 四级标题 / 导航项 |
| `--text-body-lg` | 16px | Regular / Medium | 1.6 | 大正文 |
| `--text-body` | 14px | Regular / Medium | 1.6 | 默认正文 |
| `--text-caption` | 12px | Regular / SemiBold | 1.5 | 辅助说明、标签 |
| `--text-xs` | 10px | Regular / SemiBold | 1.4 | 极小文字、角标 |

> **Hero 副标题**：PingFang SC Regular 20px · `#9AA3BC` · line-height 30px · 宽度约 573px

---

## 3. 间距系统

基准单位：**8px**（精细调整使用 4px）

| Token | 值 | 典型用途 |
|---|---|---|
| `--sp-1` | 4px | 图标与文字间距 |
| `--sp-2` | 8px | 行内元素 |
| `--sp-3` | 12px | 卡片内 padding |
| `--sp-4` | 16px | 标准组件内边距 |
| `--sp-5` | 20px | 组件间间距、统计卡片间距 |
| `--sp-6` | 24px | Section 内间距 |
| `--sp-8` | 32px | 卡片间距 |
| `--sp-10` | 40px | Section 主要间距 |
| `--sp-12` | 48px | 大块间距 |
| `--sp-16` | 64px | Section 间距 |
| `--sp-20` | 80px | 大 Section 上下 padding |
| `--sp-30` | 120px | Hero 区上下内边距、页面左右边距 |

---

## 4. 圆角规范

| Token | 值 | 用途 |
|---|---|---|
| `--radius-xs` | 4px | Tag、小按钮 |
| `--radius-sm` | 6px | 小卡片角标 |
| `--radius-md` | 8px | 标准卡片、下拉项 |
| `--radius-lg` | 10px | 中等卡片、Hero CTA 按钮 |
| `--radius-xl` | 16px | 功能卡片 |
| `--radius-2xl` | 20px | 大卡片 |
| `--radius-3xl` | 25px | 特大卡片 |
| `--radius-4xl` | 30px | 突出展示区块 |
| `--radius-pill` | 50px / 9999px | 胶囊形导航 CTA、标签 |
| `--radius-circle` | 50% | 头像、圆形图标 |

---

## 5. 阴影与层级

```css
--shadow-card:       0 4px 24px rgba(0, 0, 0, 0.4);
--shadow-elevated:   0 8px 40px rgba(0, 0, 0, 0.6);
--shadow-glow-teal:  0 0 20px rgba(1, 193, 174, 0.4);
--shadow-glow-blue:  0 0 20px rgba(53, 84, 245, 0.4);
--shadow-inset:      inset 0 1px 0 rgba(255, 255, 255, 0.06);
```

| 层级名 | z-index | 说明 |
|---|---|---|
| base | 0 | 普通内容 |
| overlay | 10 | 卡片悬浮态 |
| sticky | 100 | 导航栏（sticky） |
| dropdown | 200 | 下拉菜单 |
| modal | 300 | 弹窗 |
| toast | 400 | 通知提示 |
| loading | 999 | 加载遮罩 |

---

## 6. 布局与栅格

### 6.1 响应式断点

| 断点名 | 宽度 | 说明 |
|---|---|---|
| `xs` | < 375px | 极小屏 |
| `sm` | 375–767px | 手机（Mobile App 基准） |
| `md` | 768–1023px | 平板 |
| `lg` | 1024–1279px | 小桌面 |
| `xl` | 1280–1439px | 标准桌面 |
| `2xl` | 1440px+ | 宽屏（**Web 主设计稿基准**） |
| `3xl` | 2560px+ | 超宽屏 |

### 6.2 Web 栅格（1440px 基准）

```
|← 120px →|←——————— 1200px（12列 × ~76px + 11×24px gutter）———————→|← 120px →|
```

- 内容区最大宽度：**1200px**
- 左右页边距：120px（各侧）
- 栅格：12 列，gutter 24px
- 统计卡片行：4 等分，各约 280px，间距 20px
- 功能卡片网格：2列 `calc(50% - 12px)` / 3列 `calc(33.33% - 16px)` / 4列 `calc(25% - 18px)`

### 6.3 Web 页面垂直结构

| 区块 | 高度 | 说明 |
|---|---|---|
| Navigation | 64px | Sticky 顶部导航 |
| Hero / KV | 785px | 首屏英雄区（含 3D 背景） |
| Stats Bar | 96px | 四格数据统计行 |
| What's New | ~900px | 新功能介绍 |
| A Growing Ecosystem | ~700px | 生态介绍 |
| JST Section | ~500px | JST 代币介绍 |
| Community | ~700px | 社区治理 |
| Security | ~500px | 安全说明 |
| Partners | ~300px | 合作伙伴 Logo 行 |
| Footer | 639px | 页脚 |
| **Total** | **~6580px** | 全页高度 |

---

## 7. 组件规范

### 7.1 导航栏（Navigation Bar）

**规格**
- 高度：64px
- 背景：`rgba(10,14,25,0.85)` + `backdrop-filter: blur(12px)`
- Position：`sticky`，top: 0，z-index: 100
- 内边距：0 40px

**结构**：Logo | 主导航（居中） | CTA 按钮（右）

**Logo**
- 图标：约 28×28px
- 字体：Poppins Medium 20px，白色

**导航链接**

| 状态 | 文字色 |
|---|---|
| Default | `#9AA3BC` |
| Hover | `#01C1AE`（teal） |
| Active / 当前页 | `#FFFFFF` |

- 字体：Poppins Medium 16px
- 导航项间距：32px

**CTA "Launch App"**
- 背景：`#FFFFFF`（白底），深色文字
- 字体：Poppins SemiBold 14px
- 圆角：50px（胶囊）
- 尺寸：约 140×40px
- 右侧带 `→` 箭头图标
- Hover：背景加深，`scale(1.02)`

---

### 7.2 Mega Dropdown 下拉菜单

- 触发：Hover 导航链接，延迟 150ms 展开
- 宽度：580px（产品型）/ 内容适配（简单列表型）
- 背景：`rgba(28,34,53,0.95)` + `backdrop-filter: blur(20px)`
- 边框：`1px solid rgba(255,255,255,0.08)`
- 圆角：12px
- 内边距：24px
- 阴影：`--shadow-elevated`

**菜单项规格**
- 图标：20×20px，品牌 teal 色
- 标题：Poppins Medium 14px，`#FFFFFF`
- 描述：PingFang SC Regular 12px，`#9AA3BC`
- 行高：56px per item
- Hover 背景：`rgba(255,255,255,0.05)`，圆角 8px

**展开 / 收起动画**
- 展开：`opacity 0→1` + `translateY(-8px→0)`，200ms ease-out
- 收起：`opacity 1→0` + `translateY(0→-4px)`，150ms ease-in

---

### 7.3 按钮（Button）

#### Hero CTA 按钮（Just Launch）

> 从 Figma 节点 `31:2324` 实测

| 属性 | 值 |
|---|---|
| 背景 | `#67DBCC`（teal-mid） |
| 高度 | 46px |
| 宽度 | 170px |
| 圆角 | 10px |
| 文字 | Poppins Medium 16px，`#0A0E19`（深色） |
| 箭头图标 | 20×20px |

#### 主按钮（Primary）

| 属性 | 值 |
|---|---|
| 背景 | `--gradient-primary`（teal→blue 135°）或纯 `#01C1AE` |
| 文字 | Poppins SemiBold，`#FFFFFF` |
| 圆角 | 50px（胶囊） |

| 状态 | 样式 |
|---|---|
| Default | 品牌渐变背景 |
| Hover | 亮度 +10%，`scale(1.02)`，`--shadow-glow-teal` |
| Active | `scale(0.98)`，亮度 -5% |
| Disabled | 背景 `rgba(1,193,174,0.3)`，文字 `rgba(255,255,255,0.4)` |
| Loading | 显示旋转 Spinner，宽度不变 |

#### 次要按钮（Ghost）

- 背景：transparent
- 边框：`1px solid rgba(255,255,255,0.2)`
- 文字：`#FFFFFF`
- Hover：边框 → teal，文字 → teal

#### 文字链接按钮（Text Link）

- 无背景无边框，文字色：`#01C1AE` 或 `#74A4FD`
- Hover：下划线显现

#### 尺寸规格

| 尺寸 | 高度 | 字号 | 内边距 |
|---|---|---|---|
| Large | 52px | 18px | 0 32px |
| Default | 44px | 16px | 0 24px |
| Small | 36px | 14px | 0 16px |
| Extra Small | 28px | 12px | 0 12px |

---

### 7.4 数据统计卡片（Stats Card）

- 宽度：约 280–305px，高度：96px
- 背景：`rgba(28,34,53,0.8)`
- 边框：`1px solid rgba(255,255,255,0.06)`
- 圆角：12px
- 内边距：20px 24px

**内容结构**
```
[图标 16px]  标签文字（Poppins Regular 14px，--color-text-secondary）
$  数值（Poppins SemiBold 28px，--color-text-primary）
   [可选] 辅助说明（12px，teal 色）
```

| 状态 | 样式 |
|---|---|
| Hover | 边框 → `rgba(1,193,174,0.3)`，`--shadow-glow-teal` |
| Loading | 骨架屏 shimmer |

---

### 7.5 功能卡片（Feature Card）

- 宽度：280–340px（自适应），最小高度：200px
- 背景：`--color-bg-card`（`#1C2235`）
- 边框：`1px solid rgba(255,255,255,0.08)`
- 圆角：16px
- 内边距：24px

**内容层次**
1. 图标（40×40px）+ 版本 Tag（可选）
2. 标题：Poppins SemiBold 20px
3. 描述：PingFang SC Regular 14px，`--color-text-secondary`，line-height 1.6
4. 数据亮点（APY、TVL）：SemiBold 大字号，teal 色
5. CTA：文字链接 "了解更多 →"

| 状态 | 样式 |
|---|---|
| Hover | 边框 → teal，顶部出现 teal 光晕，`translateY(-4px)` |
| Active | `scale(0.99)` |

---

### 7.6 Tag / Badge 标签

| 变体 | 背景 | 文字 | 场景 |
|---|---|---|---|
| Nova | `rgba(1,193,174,0.15)` | `#01C1AE` | 新版标签 |
| Classica | `rgba(154,163,188,0.15)` | `#9AA3BC` | 旧版标签 |
| Warning | `rgba(255,222,2,0.15)` | `#FFDE02` | 风险提示 |
| New | `--gradient-primary` | `#FFFFFF` | 新功能 |

- 字体：Poppins SemiBold 10–12px
- 高度：20–24px
- 内边距：0 8px
- 圆角：4px

---

### 7.7 加载页面（Loading Screen）

- 全屏：100vw × 100vh，背景 `#0A0E19`，居中布局
- 圆形进度环：直径约 200px，白色 stroke 2px
- 内部：teal / blue 渐变发光球体（3D 材质动画）
- 百分比数字：Bahianita Regular 90px，`#FFFFFF`；"%" 44px 同族
- 提示文字："Please wait a moment"，Poppins Regular 14px，`#9AA3BC`

---

## 8. 交互与动效

### 8.1 状态视觉反馈

| 组件 | Hover | Active | Focus |
|---|---|---|---|
| 按钮 | 亮度提升 + `scale(1.02)` | `scale(0.98)` | 2px teal outline，offset 2px |
| 导航链接 | 文字 → teal | — | outline |
| 卡片 | `translateY(-4px)` + teal 边框 | `translateY(0)` | — |
| 下拉菜单项 | `rgba(255,255,255,0.05)` 背景 | 背景加深 | — |
| 文字链接 | 下划线显现 | — | outline |

### 8.2 动画时长与缓动

```css
--duration-fast:   150ms;  --easing-fast:   ease-out;
--duration-normal: 250ms;  --easing-normal: cubic-bezier(0.4, 0, 0.2, 1);
--duration-enter:  300ms;  --easing-enter:  cubic-bezier(0, 0, 0.2, 1);
--duration-exit:   200ms;  --easing-exit:   cubic-bezier(0.4, 0, 1, 1);
--easing-spring:           cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 8.3 过渡效果规范

| 场景 | 属性 | 时长 | 缓动 |
|---|---|---|---|
| 按钮颜色 | background-color, color | 150ms | ease-out |
| 按钮缩放 | transform | 150ms | ease-out |
| 卡片上浮 | transform, box-shadow | 250ms | ease-out |
| 导航下拉展开 | opacity + translateY(-8px→0) | 200ms | ease-out |
| 导航下拉收起 | opacity + translateY(0→-4px) | 150ms | ease-in |
| 数字滚动计数 | CountUp | 1200ms | ease-out |
| Section 页面入场 | opacity(0→1) + translateY(20px→0) | 600ms | ease-out |
| 背景球体旋转 | transform: rotate | 无限循环 | linear |

### 8.4 滚动动效

- Section 入场：IntersectionObserver 触发，进入视口时播放 opacity + translateY 入场动画
- 视差：Hero 区 3D 球体视差滚动，速度系数约 0.3×
- 数字计数：统计卡片进入视口时触发 CountUp，持续 1.2s

### 8.5 减少动效（Accessibility）

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. 图标与图像

### 9.1 图标规格

| 尺寸 | 用途 |
|---|---|
| 16×16px | 内联图标（标签内、列表项） |
| 20×20px | 菜单项图标、按钮内图标 |
| 24×24px | 导航图标、卡片图标 |
| 32×32px | 功能模块图标 |
| 40×40px | 功能卡片大图标 |
| 48×48px | 特色功能主图标 |

- 颜色：默认 `currentColor`；强调 `#01C1AE`；禁用 `#5F687C`
- 格式：SVG 优先；3D 装饰图 WebP / PNG，@2× 起步；装饰图标 `aria-hidden="true"`

### 9.2 图片比例

| 场景 | 比例 | 最小尺寸 |
|---|---|---|
| Hero 背景 | 16:9 | 1440px 宽 |
| 功能卡片配图 | 16:9 / 4:3 | 320px 宽 |
| 合作伙伴 Logo | 自由，高度统一 | 高度 40px |
| 头像 | 1:1（圆形裁切） | 80×80px |

### 9.3 骨架屏 Shimmer

```css
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg,
    rgba(255,255,255,0.04) 25%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.04) 75%
  );
  background-size: 800px;
  animation: shimmer 1.5s infinite linear;
}
```

---

## 10. 无障碍（Accessibility）

### 10.1 色彩对比度（WCAG 2.1）

| 前景 / 背景 | 对比比 | 结论 |
|---|---|---|
| `#FFFFFF` on `#0A0E19` | ~18:1 | AA / AAA ✓ |
| `#9AA3BC` on `#0A0E19` | ~5.5:1 | AA ✓ |
| `#01C1AE` on `#0A0E19` | ~5.2:1 | AA ✓ |
| `#FFDE02` on `#0A0E19` | ~14:1 | AA / AAA ✓ |
| `#5F687C` on `#0A0E19` | ~2.8:1 | 不通过 — **仅限装饰性元素** |

### 10.2 焦点样式

```css
:focus-visible {
  outline: 2px solid #01C1AE;
  outline-offset: 2px;
  border-radius: inherit;
}
```

### 10.3 ARIA 标签规范

| 组件 | ARIA 属性 |
|---|---|
| 导航栏 | `<nav aria-label="主导航">` |
| 下拉菜单 | `role="menu"`, `aria-expanded`, `aria-haspopup` |
| 按钮 | `aria-label`（图标按钮必须），`aria-disabled` |
| 统计卡片 | `role="region"`, `aria-label="TVL 数据"` |
| 加载状态 | `role="progressbar"`, `aria-valuenow`, `aria-valuemax` |
| 装饰性图标 | `aria-hidden="true"` |

---

## 11. 内容与文案规范

### 11.1 语气与语调

| 场景 | 规则 | 示例 |
|---|---|---|
| 主标题 | 英文全大写，简洁有力 | "JUSTLEND DAO" |
| 副标题 | 专业清晰，中英双语 | "存款、质押赚取收益，抵押借贷…" |
| 按钮 | 动词开头，英文 ≤4 词 / 中文 ≤6 字 | "Just Launch"、"Explore Markets" |
| 数据标签 | 缩写 + 全称 | "TVL (Total Value Locked)" |
| 外链 | 配 `↗` 图标 | "查看文档 ↗" |
| 提示说明 | 温和、非技术化 | "Please wait a moment" |

### 11.2 数字格式

```
金额：$ 6,663,059,372（$符号 + 空格 + 千分位数字）
百分比：5.23%（2位小数，无空格）
大数简写：$60M+、$28M（首页统计可用）
APY：11.97% APY（单位大写，两位小数）
Token 数量：28,123,456 TRX
```

### 11.3 错误与空状态文案

| 类型 | 模板 |
|---|---|
| 网络错误 | "加载失败，请刷新重试" |
| 空状态 | "暂无数据" + 引导说明 |
| 操作失败 | "操作失败：[原因]" |

---

## 12. Mobile App 适配规范

> Figma 设计稿仅有 Web（1440px）基准，以下为基于设计系统的响应式适配规则。
> Mobile 基准视口：**375px 宽**（iPhone SE 级别安全起点）

### 12.1 布局适配

| 属性 | Web (1440px) | Mobile (375px) |
|---|---|---|
| 页面左右边距 | 120px | 16px |
| 内容最大宽度 | 1200px | 100% |
| 栅格列数 | 12 | 4 |
| 列间距 | 24px | 16px |
| 统计卡片 | 4列横排 | 2列 × 2行（或横向滚动） |
| 功能卡片 | 3–4列 | 1列竖排 |
| 导航栏 | 64px，全展开 | 56px，Hamburger 菜单 |
| 导航下拉 | Hover 触发 | Tap 折叠展开 |

### 12.2 字号缩放

| Web Token | Web 值 | Mobile 值 |
|---|---|---|
| `--text-hero` | 90px | 40px |
| `--text-display` | 66px | 32px |
| `--text-h1` | 46px | 28px |
| `--text-h2` | 30px | 22px |
| `--text-h3` | 24px | 18px |
| `--text-h4` | 20px | 16px |
| `--text-body-lg` | 16px | 15px |
| `--text-body` | 14px | 14px |
| `--text-caption` | 12px | 12px |

### 12.3 触控区域

- 所有可交互元素最小触控区域：**44×44px**
- 按钮间距：最小 8px
- 导航 Tab 高度：56px，每项等宽

### 12.4 手势交互

| 手势 | 行为 |
|---|---|
| Tap | 等同 Click，触控区最小 44×44px |
| Swipe Left/Right | 横向滚动卡片区（统计、合作伙伴 Logo） |
| Pull to Refresh | 数据刷新（如有列表页） |
| Pinch to Zoom | 禁用（`touch-action: manipulation`） |
| Long Press | 无特殊手势 |

### 12.5 Mobile 组件差异

**导航栏（Mobile）**
- 高度：56px，Logo 左对齐，Hamburger（☰）右对齐
- 展开后覆盖全屏，背景 `rgba(10,14,25,0.98)`
- 菜单项：Poppins Medium 18px，行高 56px，上下分割线 `rgba(255,255,255,0.08)`

**Hero 区（Mobile）**
- 3D 背景球体：缩放至 80%，隐藏左侧装饰椭圆
- 标题：40px Bold，居中或左对齐
- CTA 按钮：宽度 100%（含左右 16px 边距后撑满）或固定 280px 居中

**统计卡片（Mobile）**
- 2×2 网格 或 横向 Scroll（设置 `scroll-snap-type: x mandatory`）
- 卡片高度：80px（Web 96px）

**加载页（Mobile）**
- 百分比数字：Bahianita 56px（Web 90px）
- 进度环直径：120px（Web 200px）

---

## 13. Design Token 汇总

```css
:root {
  /* ─── Color — Brand ─── */
  --color-primary-teal:        #01C1AE;
  --color-primary-teal-bright: #01FADA;
  --color-primary-teal-mid:    #67DBCC;
  --color-primary-blue:        #3554F5;
  --color-primary-blue-light:  #5566FD;
  --color-primary-blue-accent: #74A4FD;

  /* ─── Color — Neutral ─── */
  --color-bg-deep:        #04050F;
  --color-bg-base:        #0A0E19;
  --color-bg-section:     #060810;
  --color-bg-card:        #1C2235;
  --color-bg-card-hover:  #202732;
  --color-bg-elevated:    #262A32;
  --color-border-subtle:  rgba(255,255,255,0.08);
  --color-border-default: rgba(255,255,255,0.12);

  /* ─── Color — Text ─── */
  --color-text-primary:  #FFFFFF;
  --color-text-high:     #E4F1F1;
  --color-text-secondary:#9AA3BC;
  --color-text-muted:    #BEC6D9;
  --color-text-disabled: #5F687C;

  /* ─── Color — Semantic ─── */
  --color-success:        #26A17B;
  --color-warning:        #FFDE02;
  --color-warning-orange: #F7931A;
  --color-error:          #CC3440;
  --color-error-bright:   #FF5450;

  /* ─── Gradient ─── */
  --gradient-primary:   linear-gradient(135deg, #01C1AE 0%, #3554F5 100%);
  --gradient-hero-text: linear-gradient(180deg, #FFFFFF 72.964%, #74A4FD 87.813%);
  --gradient-hero-bg:   linear-gradient(180deg, #060810 0%, #0A0E19 50%, #05072A 100%);

  /* ─── Typography ─── */
  --font-en:      'Poppins', -apple-system, sans-serif;
  --font-zh:      'PingFang SC', 'Microsoft YaHei', sans-serif;
  --font-display: 'Bahianita', 'Baumans', serif;

  --text-hero:     90px;   /* Bold 700, lh 80px */
  --text-display:  66px;   /* Medium 500, lh 1.1 */
  --text-h1:       46px;   /* SemiBold 600, lh 1.2 */
  --text-h2:       30px;   /* SemiBold 600, lh 1.3 */
  --text-h3:       24px;   /* SemiBold, lh 1.4 */
  --text-h4:       20px;   /* SemiBold, lh 1.4 */
  --text-body-lg:  16px;   /* Regular, lh 1.6 */
  --text-body:     14px;   /* Regular, lh 1.6 */
  --text-caption:  12px;   /* Regular, lh 1.5 */
  --text-xs:       10px;   /* Regular, lh 1.4 */

  /* ─── Spacing (8px grid) ─── */
  --sp-1:  4px;  --sp-2:  8px;  --sp-3: 12px;
  --sp-4: 16px;  --sp-5: 20px;  --sp-6: 24px;
  --sp-8: 32px;  --sp-10: 40px; --sp-12: 48px;
  --sp-16: 64px; --sp-20: 80px; --sp-30: 120px;

  /* ─── Border Radius ─── */
  --radius-xs:     4px;
  --radius-sm:     6px;
  --radius-md:     8px;
  --radius-lg:     10px;   /* Hero CTA 按钮 */
  --radius-xl:     16px;   /* 功能卡片 */
  --radius-2xl:    20px;
  --radius-3xl:    25px;
  --radius-4xl:    30px;
  --radius-pill:   9999px; /* 导航 CTA、Primary 按钮 */
  --radius-circle: 50%;

  /* ─── Shadow ─── */
  --shadow-card:      0 4px 24px rgba(0,0,0,0.4);
  --shadow-elevated:  0 8px 40px rgba(0,0,0,0.6);
  --shadow-glow-teal: 0 0 20px rgba(1,193,174,0.4);
  --shadow-glow-blue: 0 0 20px rgba(53,84,245,0.4);
  --shadow-inset:     inset 0 1px 0 rgba(255,255,255,0.06);

  /* ─── Motion ─── */
  --duration-fast:   150ms;  --easing-fast:   ease-out;
  --duration-normal: 250ms;  --easing-normal: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-enter:  300ms;  --easing-enter:  cubic-bezier(0, 0, 0.2, 1);
  --duration-exit:   200ms;  --easing-exit:   cubic-bezier(0.4, 0, 1, 1);
  --easing-spring:           cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ─── Layout ─── */
  --layout-max-width: 1440px;
  --layout-content:   1200px;
  --layout-margin:    120px;
  --layout-nav-height-web:    64px;
  --layout-nav-height-mobile: 56px;
}
```

---

## 14. 变更日志

| 版本 | 日期 | 变更说明 |
|---|---|---|
| v1.0 | 2026-04-01 | 初版，基于 Portal 首页改版 Figma 设计稿 |
| v1.1 | 2026-04-03 | 同步至 UI-KB |
| v1.2 | 2026-04-07 | Figma 实测补充 Hero CTA 精确数值（`#67DBCC`，46px，r=10px）；补充 Mobile App 适配规范；补充 Hero 标题渐变 Token；完善 Design Token 汇总 |
