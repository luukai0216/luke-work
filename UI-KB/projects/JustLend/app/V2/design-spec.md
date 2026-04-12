# JustLend App V2 — 设计规范

> Supply & Borrow Market V2 — 基于 TRON 链的隔离保证金借贷协议
> 最后更新：2026-04-09 | 来源：Figma `Z3RKqDSy96ba5h5y1aHWHr` · 节点 `4:2051`
> Figma 文件：[JL 设计规范 组件库](https://www.figma.com/design/Z3RKqDSy96ba5h5y1aHWHr/)

| 设计工具 | 模式 | 断点 |
| --- | --- | --- |
| Figma | 深色（默认）/ 浅色 | 1440px Desktop |

---

## 1. 色彩系统

### 品牌主色

| Token | Hex | 用途 |
| --- | --- | --- |
| `--color-brand-green` | `#24B887` | 主 CTA、主按钮、激活状态、超链接 |
| `--color-brand-green-hover` | `#00D9A0` | Hover 高亮态 |
| `--color-brand-green-tint` | `rgba(0,193,131,0.15)` | 背景填充、选中底色 |
| `--color-brand-purple` | `#7B5EA7` | 紫色辅助按钮 |

### 中性色阶（深色模式 · 默认）

| Token | Hex / Alpha | 用途 |
| --- | --- | --- |
| `--color-bg-base` | `#0F1117` | 最底层背景（bg-1） |
| `--color-bg-body` | `#13161D` | 页面主背景（bg-2） |
| `--color-surface-1` | `#181C24` | 卡片/面板背景 |
| `--color-surface-2` | `#1E232D` | 嵌套卡片背景 |
| `--color-border` | `#252B38` | 分割线/边框 |
| `--color-border-2` | `#2E3545` | 次级边框 |
| `--color-text-primary` | `#FFFFFF` | 一级文字 |
| `--color-text-secondary` | `#8A93A8` | 二级文字 |
| `--color-text-tertiary` | `#505666` | 三级/占位文字 |

### 中性色阶（浅色模式）

| Token | Hex | 用途 |
| --- | --- | --- |
| `--color-bg-body` | `#F5F7FA` | 大背景 |
| `--color-surface-1` | `#FFFFFF` | 卡片背景 |
| `--color-surface-2` | `#F0F2F5` | 嵌套卡片 |
| `--color-border` | `#E2E8F0` | 分割线/边框 |
| `--color-border-2` | `#CBD5E1` | 次级边框 |
| `--color-text-primary` | `#1A1D24` | 一级文字 |
| `--color-text-secondary` | `#64748B` | 二级文字 |
| `--color-text-tertiary` | `#94A3B8` | 三级/占位文字 |

### 语义色

| Token | Hex | 用途 |
| --- | --- | --- |
| `--color-success` | `#00C183` | 成功、正收益、存款 |
| `--color-danger` | `#E84B54` | 错误、高风险值、清算 |
| `--color-danger-high` | `#F4394F` | 高风险 |
| `--color-warning` | `#FF8C00` | 中等风险、注意 |
| `--color-warning-assist` | `#F79743` | 辅助警示色 |
| `--color-info` | `#3B82F6` | 信息提示 |

---

## 2. 字体排印

主字体：**Inter**；数字等宽字体：**JetBrains Mono**
数值显示开启 `font-variant-numeric: tabular-nums`

| Token | 规格 | CSS 速记 |
| --- | --- | --- |
| `heading-xl` | 32px / 800 / ls -0.5px | `800 32px/1.2 Inter` |
| `heading-lg` | 24px / 700 / ls -0.3px | `700 24px/1.3 Inter` |
| `heading-md` | 20px / 700 | `700 20px/1.4 Inter` |
| `heading-sm` | 16px / 600 | `600 16px/1.5 Inter` |
| `body-md` | 14px / 400 / lh 1.6 | `400 14px/1.6 Inter` |
| `body-sm` | 13px / 400 | `400 13px/1.6 Inter` |
| `label` | 12px / 500 | `500 12px/1.4 Inter` |
| `caption` | 11px / 400 · uppercase · ls 0.08em | `400 11px/1.4 Inter` |
| `mono-num` | tabular-nums | `JetBrains Mono / monospace` |

```css
--font-sans: 'Inter', -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;

--text-heading-xl: 800 32px/1.2 var(--font-sans);   /* ls: -0.5px */
--text-heading-lg: 700 24px/1.3 var(--font-sans);   /* ls: -0.3px */
--text-heading-md: 700 20px/1.4 var(--font-sans);
--text-heading-sm: 600 16px/1.5 var(--font-sans);
--text-body-md:    400 14px/1.6 var(--font-sans);
--text-body-sm:    400 13px/1.6 var(--font-sans);
--text-label:      500 12px/1.4 var(--font-sans);
--text-caption:    400 11px/1.4 var(--font-sans);   /* uppercase, ls: 0.08em */
```

---

## 3. 间距与栅格

### 间距令牌（4px 基准）

| Token | 值 |
| --- | --- |
| `--sp-1` | `4px` |
| `--sp-2` | `8px` |
| `--sp-3` | `12px` |
| `--sp-4` | `16px` |
| `--sp-5` | `20px` |
| `--sp-6` | `24px` |
| `--sp-8` | `32px` |
| `--sp-10` | `40px` |
| `--sp-12` | `48px` |
| `--sp-15` | `60px` |
| `--sp-20` | `80px` |
| `--sp-30` | `120px` |

### 页面栅格

| 属性 | 值 |
| --- | --- |
| 画布宽度 | 1440px |
| 内容宽度 | 1200px |
| 左右边距 | 120px |
| 列数 | 12 列 |
| 列间距 | 24px |
| 导航高度 | 60px |

### 圆角

| Token | 值 | 用途 |
| --- | --- | --- |
| `--radius-sm` | `4px` | 标签、徽章 |
| `--radius-md` | `6px` | 通用 |
| `--radius-btn` | `5px` | 按钮 |
| `--radius-input` | `8px` | 输入框 |
| `--radius-card` | `12px` | 卡片、面板 |
| `--radius-lg` | `16px` | 大卡片 |
| `--radius-full` | `9999px` | 头像、药丸形标签 |

---

## 4. 动效规范

| 场景 | 属性 | 时长 | 缓动 |
| --- | --- | --- | --- |
| 按钮 Hover / Active | `background-color`, `border-color` | `150ms` | `ease` |
| 输入框 Focus | `border-color`, `box-shadow` | `150ms` | `ease` |
| Modal 弹出 | `opacity` + `translateY(8px→0)` | `200ms` | `ease-out` |
| Modal 关闭 | `opacity` + `translateY(0→8px)` | `150ms` | `ease-in` |
| 遮罩 fade | `opacity` | `200ms` | `ease` |
| 数字滚动（行情） | `color flash` | `300ms` | `ease` |
| Toggle 开关 | `transform`, `background` | `200ms` | `ease` |
| 风险条进度 | `width` | `300ms` | `ease-in-out` |
| 行悬浮高亮 | `background` | `100ms` | `ease` |

---

## 5. 完整 CSS Variables

```css
/* ─── JustLend DAO Design Tokens ─── */

:root {
  /* Color — Brand */
  --color-brand-green:       #24B887;
  --color-brand-green-hover: #00D9A0;
  --color-brand-green-tint:  rgba(0, 193, 131, 0.15);
  --color-brand-purple:      #7B5EA7;

  /* Color — Neutral (Dark, default) */
  --color-bg-base:        #0F1117;
  --color-bg-body:        #13161D;
  --color-surface-1:      #181C24;
  --color-surface-2:      #1E232D;
  --color-border:         #252B38;
  --color-border-2:       #2E3545;
  --color-text-primary:   #FFFFFF;
  --color-text-secondary: #8A93A8;
  --color-text-tertiary:  #505666;

  /* Color — Semantic */
  --color-success:        #00C183;
  --color-danger:         #E84B54;
  --color-danger-high:    #F4394F;
  --color-warning:        #FF8C00;
  --color-warning-assist: #F79743;
  --color-info:           #3B82F6;

  /* Typography */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --text-heading-xl: 800 32px/1.2 var(--font-sans);
  --text-heading-lg: 700 24px/1.3 var(--font-sans);
  --text-heading-md: 700 20px/1.4 var(--font-sans);
  --text-heading-sm: 600 16px/1.5 var(--font-sans);
  --text-body-md:    400 14px/1.6 var(--font-sans);
  --text-body-sm:    400 13px/1.6 var(--font-sans);
  --text-label:      500 12px/1.4 var(--font-sans);
  --text-caption:    400 11px/1.4 var(--font-sans);

  /* Spacing (4px grid) */
  --sp-1:  4px;  --sp-2:  8px;  --sp-3:  12px;
  --sp-4:  16px; --sp-5:  20px; --sp-6:  24px;
  --sp-8:  32px; --sp-10: 40px; --sp-12: 48px;
  --sp-15: 60px; --sp-20: 80px; --sp-30: 120px;

  /* Border Radius */
  --radius-sm:    4px;
  --radius-md:    6px;
  --radius-btn:   5px;
  --radius-input: 8px;
  --radius-card:  12px;
  --radius-lg:    16px;
  --radius-full:  9999px;

  /* Layout */
  --layout-max-width:  1440px;
  --layout-content:    1200px;
  --layout-margin:     120px;
  --layout-nav-height: 60px;

  /* Motion */
  --duration-fast:   100ms;
  --duration-normal: 150ms;
  --duration-medium: 200ms;
  --duration-slow:   300ms;
  --ease-default:    ease;
  --ease-out:        ease-out;
  --ease-in:         ease-in;
  --ease-in-out:     ease-in-out;
  --ease-spring:     cubic-bezier(.16, 1, .3, 1);
}

/* ─── Light Theme Overrides ─── */
[data-theme="light"] {
  --color-bg-body:        #F5F7FA;
  --color-surface-1:      #FFFFFF;
  --color-surface-2:      #F0F2F5;
  --color-border:         #E2E8F0;
  --color-border-2:       #CBD5E1;
  --color-text-primary:   #1A1D24;
  --color-text-secondary: #64748B;
  --color-text-tertiary:  #94A3B8;
}
```


---


> 最后更新：2026-04-09 | 来源：Figma `Z3RKqDSy96ba5h5y1aHWHr` · 节点 `4:2051`

---

## 按钮 Button

### 变体

| 变体 | 背景色 | 文字色 | 边框 | 用途 |
| --- | --- | --- | --- | --- |
| `Primary` | `#24B887` | `#FFFFFF` | 无 | 主要操作（Supply、Borrow） |
| `Secondary` | `--color-surface-2` | `--color-text-primary` | 无 | 次要操作 |
| `Purple` | `#7B5EA7` | `#FFFFFF` | 无 | 特殊功能 |
| `Outline` | 透明 | `--color-text-primary` | `--color-border` | 辅助操作 |
| `Danger` | `#E84B54` | `#FFFFFF` | 无 | 危险操作（清算、退出） |
| `Text` | 透明 | `#24B887` | 无 | 文字链接式操作 |

### 尺寸

| 尺寸 | 高度 | 内边距（左右） | 字体 |
| --- | --- | --- | --- |
| `lg` | `48px` | `24px` | `body-md` / 500 |
| `md` | `40px` | `20px` | `body-md` / 500 |
| `sm` | `32px` | `16px` | `label` / 500 |

### 状态

| 状态 | 视觉变化 |
| --- | --- |
| `default` | 基础样式 |
| `hover` | Primary → `#00D9A0`；其余加深/减淡 10% |
| `active` | 加深 5%；`transform: scale(0.98)` |
| `disabled` | `opacity: 0.4`；`cursor: not-allowed` |
| `loading` | 显示 spinner；禁止交互 |

圆角统一：`border-radius: 5px`（`--radius-btn`）

---

## 输入框 Input

### 规格

| 属性 | 值 |
| --- | --- |
| 高度 | `48px` |
| 圆角 | `8px` |
| 内边距 | `0 16px` |
| 边框 | `1px solid --color-border` |
| 背景 | `--color-surface-2` |
| 字体 | `mono-num`（数值）/ `body-md`（文字） |

### 状态

| 状态 | 边框 | 阴影 |
| --- | --- | --- |
| `default` | `--color-border` | 无 |
| `hover` / `focus` | `--color-brand-green` | `0 0 0 3px rgba(36,184,135,0.15)` |
| `error` | `--color-danger` | `0 0 0 3px rgba(232,75,84,0.15)` |
| `risk` | `--color-warning` | `0 0 0 3px rgba(255,140,0,0.15)` |

### 提示文字

- 错误：`--color-danger` · `caption` 字号
- 风险警告：`--color-warning` · `caption` 字号

---

## 数据表格 Table

### 列结构（Supply Vaults 示例）

| 列名 | 对齐 | 可排序 |
| --- | --- | --- |
| Vault Token | 左对齐 | 否 |
| Supply APY | 右对齐 | 是（⇅） |
| Total Supply | 右对齐 | 是（⇅） |
| Collateral | 居中 | 否 |
| Wallet Balance | 右对齐 | 否 |
| Operation | 右对齐 | 否 |

### 规格

| 属性 | 值 |
| --- | --- |
| 表头高度 | `48px` |
| 行高 | `64px` |
| 表头背景 | `--color-surface-1` |
| 表头字体 | `caption`（11px · uppercase · `--color-text-secondary`） |
| 行背景（默认） | `--color-surface-2` |
| 行背景（hover） | `--color-surface-1`（`transition: 100ms ease`） |
| 行间分割线 | `1px solid --color-border` |
| 单元格内边距 | `0 16px` |

### 数值格式

- 金额：`$1,072,850.12`（千位逗号，2位小数）
- APY：`6.89%`
- Token 数量：`28,123,456 TRX`
- 字体：`mono-num`（tabular-nums）

---

## 弹窗 Modal

### 规格

| 属性 | 值 |
| --- | --- |
| 宽度 | `480px` |
| 圆角 | `16px`（`--radius-lg`） |
| 背景 | `--color-surface-1` |
| 遮罩 | `rgba(0,0,0,0.6)` |
| 内边距 | `24px` |

### 动画

| 动作 | 属性 | 时长 | 缓动 |
| --- | --- | --- | --- |
| 弹出 | `opacity 0→1` + `translateY(8px→0)` | `200ms` | `ease-out` |
| 关闭 | `opacity 1→0` + `translateY(0→8px)` | `150ms` | `ease-in` |
| 遮罩淡入/淡出 | `opacity` | `200ms` | `ease` |

### 多步骤签名流程

需要 Approve + Supply 两步时：
1. 展示步骤进度条（Step 1: Approve · Step 2: Supply）
2. 提示：`本次发起 {存款} 交易，需先授权 TRX Vault 合约`
3. 注意：`需进行 2 次签名，流程中断不影响已签名操作`
4. 等待签名时显示：`请在钱包中签名`

---

## 组件速查

| 组件 | 高度 | 圆角 | 关键 Token |
| --- | --- | --- | --- |
| 主按钮（lg） | 48px | 5px | `--color-brand-green` |
| 主按钮（md） | 40px | 5px | `--color-brand-green` |
| 主按钮（sm） | 32px | 5px | `--color-brand-green` |
| 输入框 | 48px | 8px | focus: `--color-brand-green` |
| 表格行 | 64px | — | hover: `--color-surface-1` |
| 表头 | 48px | — | `--color-surface-1` · `caption` |
| Modal | — | 16px | `--color-surface-1` |
| 卡片 | — | 12px | `--color-surface-1` |
| 导航栏 | 60px | — | `--color-bg-base` |
