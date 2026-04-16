# USDD · Web 设计规范

> 规范来源：USDD Design System Figma（`R2TQ0Ve55k6UHh4K3sBqv7`）
> 最后更新：2026-04-16 | 负责人：Luke
> 覆盖端：**Web（1440px 基准）** · **Mobile（390px 基准）**
> 主题：**Dark only**（单一暗色模式）
> 备注：Web 与 App 使用同一套设计系统，本文件内容与 `../app/design-spec.md` 一致

---

## 目录

1. [色彩系统](#1-色彩系统)
2. [字体排版](#2-字体排版)
3. [间距系统](#3-间距系统)
4. [圆角规范](#4-圆角规范)
5. [边框规范](#5-边框规范)
6. [阴影与模糊](#6-阴影与模糊)
7. [组件规范](#7-组件规范)
8. [Design Token 汇总](#8-design-token-汇总)
9. [变更日志](#9-变更日志)

---

## 1. 色彩系统

> Token 集合名：**Colors**，单一模式 **Dark**

### 1.1 品牌色（Brand）

| Token | Hex | 用途 |
| --- | --- | --- |
| `brand-default` | `#216C58` | 主品牌色、Primary 按钮背景 |
| `brand-hover` | `#2A8C6C` | 按钮 Hover 态 |
| `brand-light` | `#5FC693` | 高亮文字、数据强调 |
| `brand-highlight` | `#81DEB0` | 次级强调、图表高亮 |
| `brand-subtle` | `#C8F5E0` | 极浅品牌背景 |
| `brand-bg` | `rgba(33,108,88,0.15)` | 品牌色浅层背景（Tag / Alert） |

### 1.2 背景色（Background）

| Token | Hex | 用途 |
| --- | --- | --- |
| `bg-page` | `#0C0C0E` | 页面最底层背景 |
| `bg-section` | `#141615` | Section 分区背景 |
| `bg-card` | `#181A1C` | 卡片背景 |
| `bg-elevated` | `#212426` | 浮层、Modal、Dropdown 背景 |

### 1.3 文字色（Text）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `text-primary` | `#FFFFFF` | 主标题、主要正文 |
| `text-secondary` | `rgba(255,255,255,0.8)` | 次要正文、描述 |
| `text-tertiary` | `rgba(255,255,255,0.6)` | 辅助说明、标签 |
| `text-quaternary` | `rgba(255,255,255,0.4)` | 占位符 |
| `text-disabled` | `rgba(255,255,255,0.2)` | 禁用态文字 |

### 1.4 边框色（Border）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `border-strong` | `rgba(255,255,255,0.25)` | 高对比边框、Focus 态 |
| `border-default` | `rgba(255,255,255,0.15)` | 普通边框（卡片、Input） |
| `border-subtle` | `rgba(255,255,255,0.08)` | 弱分割线 |

### 1.5 填充色（Fill）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `fill-hover` | `rgba(255,255,255,0.04)` | 列表项 / 卡片 Hover 背景 |
| `fill-disabled` | `rgba(255,255,255,0.2)` | 禁用态填充 |
| `fill-overlay` | `rgba(0,0,0,0.6)` | Modal 遮罩层 |

### 1.6 语义色（Semantic）

#### Success（成功 / 正向）

| Token | Hex | 用途 |
| --- | --- | --- |
| `success-default` | `#448F6A` | 成功状态、正向数据、涨幅 |
| `success-hover` | `#60A080` | Hover 态 |
| `success-active` | `#418865` | Active 态 |
| `success-disabled` | `#254737` | 禁用态 |

#### Warning（警告）

| Token | Hex | 用途 |
| --- | --- | --- |
| `warning-default` | `#FF8F0B` | 警告提示、中等风险 |
| `warning-hover` | `#FF9E2D` | Hover 态 |
| `warning-active` | `#EF870D` | Active 态 |
| `warning-disabled` | `#71440F` | 禁用态 |

#### Danger（危险 / 负向）

| Token | Hex | 用途 |
| --- | --- | --- |
| `danger-default` | `#D73133` | 错误、危险操作、跌幅 |
| `danger-hover` | `#EA3A3C` | Hover 态 |
| `danger-active` | `#C52729` | Active 态 |
| `danger-disabled` | `#611E1F` | 禁用态 |

#### Info（信息）

| Token | Hex | 用途 |
| --- | --- | --- |
| `info-default` | `#0D9488` | 信息提示（teal 系） |
| `info-hover` | `#14B8A6` | Hover 态 |
| `info-active` | `#0A7A74` | Active 态 |
| `info-disabled` | `#054744` | 禁用态 |

---

## 2. 字体排版

### 2.1 字族（Font Family）

| 场景 | 字体 |
| --- | --- |
| 全站主字体 | **Inter** |

```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

> 注：无中文字体特殊指定，中文内容默认系统字体回退（PingFang SC / Microsoft YaHei）

### 2.2 字号规格

| Token | 字族 | 字重 | 字号 | 行高 | 用途 |
| --- | --- | --- | --- | --- | --- |
| `heading-1` | Inter | Semi Bold | 56px | 78px | 超大标题（Hero） |
| `heading-2` | Inter | Semi Bold | 48px | 68px | 大标题 |
| `heading-3` | Inter | Semi Bold | 40px | 56px | 一级标题 |
| `heading-4` | Inter | Semi Bold | 32px | 46px | 二级标题 |
| `heading-5` | Inter | Semi Bold | 24px | 34px | 三级标题 / 卡片标题 |
| `heading-6` | Inter | Semi Bold | 20px | 28px | 小标题 / 模块标题 |
| `body-md` | Inter | Regular | 16px | 22px | 正文（大） |
| `body-sm` | Inter | Regular | 14px | 20px | 正文（默认） |
| `label-md` | Inter | Semi Bold | 16px | 22px | 按钮文字（Medium/Large） |
| `label-sm` | Inter | Semi Bold | 14px | 20px | 按钮文字（Small/Mini）、标签 |
| `caption` | Inter | Regular | 12px | 16px | 辅助说明、时间戳 |
| `caption-sb` | Inter | Semi Bold | 12px | 16px | 强调辅助说明、角标 |

---

## 3. 间距系统

> Token 集合名：**Spacing**，基准步长不规则（4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80px）

| Token | 值 | 典型用途 |
| --- | --- | --- |
| `space-1` | 4px | 图标与文字间距、内联元素间距 |
| `space-2` | 8px | 小组件内间距、紧凑排列 |
| `space-3` | 12px | 表单控件内间距 |
| `space-4` | 16px | 标准组件内边距、卡片小间距 |
| `space-5` | 24px | 组件间间距、卡片内边距 |
| `space-6` | 32px | 模块间间距 |
| `space-7` | 48px | Section 内主要间距 |
| `space-8` | 64px | Section 间距 |
| `space-9` | 80px | 大 Section 上下 padding |

---

## 4. 圆角规范

> Token 集合名：**Radius**

| Token | 值 | 用途 |
| --- | --- | --- |
| `radius-xs` | 4px | Tag、小角标 |
| `radius-sm` | 6px | 小组件、Tooltip |
| `radius-md` | 8px | 按钮、Input、卡片（默认） |
| `radius-lg` | 16px | 大卡片、Modal |
| `radius-xl` | 24px | 超大卡片、Hero 区块 |
| `radius-full` | 999px | 胶囊形（Pill）按钮、头像 |

---

## 5. 边框规范

> Token 集合名：**Border**

| Token | 值 | 用途 |
| --- | --- | --- |
| `border-default` | 1px | 卡片、Input、普通边框 |
| `border-strong` | 2px | Focus 态、强调边框 |

---

## 6. 阴影与模糊

### 6.1 阴影（Shadow）

| Token | 值 | 用途 |
| --- | --- | --- |
| `shadow-sm` | `0 1px 8px rgba(0,0,0,0.32)` | 卡片轻阴影 |
| `shadow-md` | `0 4px 20px rgba(0,0,0,0.48)` | 浮层、下拉菜单 |
| `shadow-lg` | `0 8px 40px rgba(0,0,0,0.64)` | Modal、重要弹层 |

### 6.2 背景模糊（Blur）

| Token | 值 | 用途 |
| --- | --- | --- |
| `blur-sm` | `backdrop-filter: blur(10px)` | 轻模糊（导航栏、卡片） |
| `blur-md` | `backdrop-filter: blur(24px)` | 中模糊（Dropdown、Tooltip） |
| `blur-lg` | `backdrop-filter: blur(40px)` | 重模糊（Modal 背景） |

---

## 7. 组件规范

### 7.1 按钮（Button）

> 组件名：`Button`，共 128 个变体（4 Type × 4 Size × 8 State）

#### 类型（Type）

| Type | 背景 | 文字 | 用途 |
| --- | --- | --- | --- |
| **Primary** | `brand-default` (#216C58) | `#FFFFFF` | 主操作（确认、提交、连接钱包） |
| **Secondary** | `rgba(255,255,255,0.08)` + `border-default` | `#FFFFFF` | 次要操作、取消 |
| **Danger** | `danger-default` (#D73133) | `#FFFFFF` | 危险操作（清算、清除） |
| **Ghost** | 透明 | `#FFFFFF` | 辅助操作、文字行内按钮 |

#### 尺寸（Size）

| Size | 高度 | 字号 Token | Icon Only 尺寸 |
| --- | --- | --- | --- |
| Large | 64px | `label-md` (16px SemiBold) | 64×64px |
| Medium | 48px | `label-md` (16px SemiBold) | 48×48px |
| Small | 40px | `label-sm` (14px SemiBold) | 40×40px |
| Mini | 32px | `label-sm` (14px SemiBold) | 32×32px |

#### 状态（State）

| State | 说明 |
| --- | --- |
| Default | 常态 |
| Hover | 鼠标悬停 |
| Active | 点击按下 |
| Disabled | 不可交互（使用 `fill-disabled` 降低不透明度） |
| Loading | 显示 Spinner，宽度扩展保持内容 |
| Icon Left | 左侧带图标 |
| Icon Right | 右侧带图标 |
| Icon Only | 纯图标，方形 |

- 圆角：`radius-md`（8px）
- 内边距：水平方向随内容适配

---

### 7.2 Tag / Badge

> 组件名：`Tag`，共 10 个变体（5 Type × 2 Size）

| Type | 背景 | 文字 | 用途 |
| --- | --- | --- | --- |
| `default` | `rgba(255,255,255,0.08)` | `text-tertiary` | 通用标签 |
| `success` | `rgba(68,143,106,0.15)` | `success-default` | 正向状态 |
| `warning` | `rgba(255,143,11,0.15)` | `warning-default` | 警告 / 风险 |
| `danger` | `rgba(215,49,51,0.15)` | `danger-default` | 错误 / 高风险 |
| `info` | `rgba(13,148,136,0.15)` | `info-default` | 信息提示 |

- 圆角：`radius-xs`（4px）
- 字号：`caption-sb`（12px Semi Bold）

---

## 8. Design Token 汇总

```css
:root {
  /* ─── Brand ─── */
  --brand-default:   #216C58;
  --brand-hover:     #2A8C6C;
  --brand-light:     #5FC693;
  --brand-highlight: #81DEB0;
  --brand-subtle:    #C8F5E0;
  --brand-bg:        rgba(33,108,88,0.15);

  /* ─── Background ─── */
  --bg-page:     #0C0C0E;
  --bg-section:  #141615;
  --bg-card:     #181A1C;
  --bg-elevated: #212426;

  /* ─── Text ─── */
  --text-primary:    #FFFFFF;
  --text-secondary:  rgba(255,255,255,0.8);
  --text-tertiary:   rgba(255,255,255,0.6);
  --text-quaternary: rgba(255,255,255,0.4);
  --text-disabled:   rgba(255,255,255,0.2);

  /* ─── Border ─── */
  --border-strong:  rgba(255,255,255,0.25);
  --border-default: rgba(255,255,255,0.15);
  --border-subtle:  rgba(255,255,255,0.08);

  /* ─── Fill ─── */
  --fill-hover:    rgba(255,255,255,0.04);
  --fill-disabled: rgba(255,255,255,0.2);
  --fill-overlay:  rgba(0,0,0,0.6);

  /* ─── Success ─── */
  --success-default:  #448F6A;
  --success-hover:    #60A080;
  --success-active:   #418865;
  --success-disabled: #254737;

  /* ─── Warning ─── */
  --warning-default:  #FF8F0B;
  --warning-hover:    #FF9E2D;
  --warning-active:   #EF870D;
  --warning-disabled: #71440F;

  /* ─── Danger ─── */
  --danger-default:  #D73133;
  --danger-hover:    #EA3A3C;
  --danger-active:   #C52729;
  --danger-disabled: #611E1F;

  /* ─── Info ─── */
  --info-default:  #0D9488;
  --info-hover:    #14B8A6;
  --info-active:   #0A7A74;
  --info-disabled: #054744;

  /* ─── Spacing ─── */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 24px;  --space-6: 32px;
  --space-7: 48px;  --space-8: 64px;  --space-9: 80px;

  /* ─── Radius ─── */
  --radius-xs:   4px;
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 999px;

  /* ─── Border Width ─── */
  --border-w-default: 1px;
  --border-w-strong:  2px;

  /* ─── Shadow ─── */
  --shadow-sm: 0 1px 8px rgba(0,0,0,0.32);
  --shadow-md: 0 4px 20px rgba(0,0,0,0.48);
  --shadow-lg: 0 8px 40px rgba(0,0,0,0.64);

  /* ─── Typography ─── */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Heading */
  --text-h1: 56px; /* Semi Bold, lh 78px */
  --text-h2: 48px; /* Semi Bold, lh 68px */
  --text-h3: 40px; /* Semi Bold, lh 56px */
  --text-h4: 32px; /* Semi Bold, lh 46px */
  --text-h5: 24px; /* Semi Bold, lh 34px */
  --text-h6: 20px; /* Semi Bold, lh 28px */

  /* Body */
  --text-body-md: 16px; /* Regular, lh 22px */
  --text-body-sm: 14px; /* Regular, lh 20px */

  /* Label */
  --text-label-md: 16px; /* Semi Bold, lh 22px */
  --text-label-sm: 14px; /* Semi Bold, lh 20px */

  /* Caption */
  --text-caption:    12px; /* Regular, lh 16px */
  --text-caption-sb: 12px; /* Semi Bold, lh 16px */
}
```

---

## 9. 变更日志

| 版本 | 日期 | 变更说明 |
| --- | --- | --- |
| v1.0 | 2026-04-16 | 初版，从 Figma Design System（`R2TQ0Ve55k6UHh4K3sBqv7`）提取，涵盖 Token、Typography、Button、Tag |
