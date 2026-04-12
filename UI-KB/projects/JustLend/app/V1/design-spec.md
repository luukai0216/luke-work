# JustLend ·  V1 — 设计规范

> 规范来源：Figma Lucas | 同步日期：2026-04-02
> Figma 文件：`uQnzcnZf27P32MCTh5MCgE`，节点 `2890:5661`

---

## 01 · 色彩系统

### 品牌主色

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--brand-primary` | `#4D54FF` | Supply 按钮、主交互、选中态 |
| `--brand-teal` | `#18C19F` | Borrow 按钮、正向指标 |
| `--brand-accent` | `#9195FB` | 链接文字、重置操作 |
| `--color-risk` | `#FF5266` | 高风险账户、错误状态 |
| `--color-gauge-pink` | `#FF5593` | 风险仪表盘指针 |

### 暗色模式 Dark Mode

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--dark-bg` | `#1F2027` | 页面背景 |
| `--dark-card` | `#22232B` | 卡片 / 输入框背景 |
| `--dark-filter-active` | `#53545A` | 筛选项激活态背景 |
| `--dark-btn-bg` | `rgba(255,255,255,0.06)` | 清算按钮背景 |
| `--dark-text-primary` | `#FFFFFF` | 主要文字 |
| `--dark-text-secondary` | `rgba(255,255,255,0.6)` | 次要文字 / 表头标签 |
| `--dark-text-hint` | `rgba(255,255,255,0.4)` | 提示 / 占位文字 |
| `--dark-text-aux` | `#B3B4B7` | 导航 / 下拉文字 |
| `--dark-divider-row` | `rgba(255,255,255,0.04)` | 表格行分割线 |
| `--dark-divider-header` | `rgba(255,255,255,0.06)` | 表头分割线 |
| `--dark-row-hover` | `rgba(255,255,255,0.03)` | 表格行悬浮态 |

### 亮色模式 Light Mode

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--light-bg` | `#F5F6FA` | 页面背景 |
| `--light-card` | `#FFFFFF` | 卡片背景（带阴影） |
| `--light-text-primary` | `#22232B` | 主要文字 |
| `--light-text-secondary` | `rgba(34,35,43,0.6)` | 次要文字 / 标签 |
| `--light-placeholder` | `#76777F` | 占位文字 |
| `--light-search-bg` | `rgba(75,82,223,0.06)` | 搜索框背景 |
| `--light-risk-bg` | `rgba(255,82,102,0.06)` | 风险提示条背景 |
| `--light-toggle-off` | `#D0D0D6` | Toggle 关闭态轨道 |
| `--light-divider-row` | `rgba(34,35,43,0.05)` | 表格行分割线 |
| `--light-divider-header` | `rgba(34,35,43,0.08)` | 表头分割线 |

### 功能性叠加色

| 色值 | 用途 |
| --- | --- |
| `rgba(77,84,255,0.04)` | Supply 按钮激活背景（亮色） |
| `rgba(77,84,255,0.8)` | Supply 按钮激活边框（亮色） |
| `rgba(24,193,159,0.06)` | Borrow 按钮激活背景 |
| `rgba(24,193,159,0.8)` | Borrow 按钮激活边框 |
| `rgba(0,0,0,0.05)` | 卡片阴影叠加 |
| `rgba(20,22,49,0.3)` | Toggle 滑块阴影 |

---

## 02 · 字体规范

### 字体族

| 场景 | 字体 |
| --- | --- |
| 英文 / 数字 | Avenir Next（Regular · Medium · Demi Bold · Bold） |
| 中文 | PingFang SC（Regular · Medium） |

### 字阶规范

| 层级 | 字号 | 字重 | 字体 | 用途 |
| --- | --- | --- | --- | --- |
| Display | 30px | 700 Bold | Avenir Next | 风险评分大数字 |
| Title XL | 20px | 600 Demi Bold | Avenir Next / PingFang SC | 区块 / 页面标题 |
| Title L | 18px | 700 Bold | Avenir Next | 关键金融数据 |
| Body L | 16px | 600 Demi Bold | Avenir Next | 资产名称、导航 |
| Body M | 14px | 500/600 | Avenir Next / PingFang SC | 表格数据、按钮 |
| Caption | 12px | 400/500 | PingFang SC / Avenir Next | 标签、描述、链接 |

### 典型文字样式

```css
/* 风险评分 */
.risk-score { font: 700 30px 'Avenir Next'; color: #FF5266; }

/* 页面标题 */
.page-title { font: 600 20px 'Avenir Next'; color: #FFFFFF; }

/* 表头 - 暗色 */
.table-header-dark { font: 500 14px 'PingFang SC'; color: rgba(255,255,255,0.6); }

/* 表头 - 亮色 */
.table-header-light { font: 500 14px 'Avenir Next'; color: rgba(34,35,43,0.6); }

/* 表格数据 */
.table-data { font: 600 14px 'Avenir Next'; }

/* 链接 / 重置 */
.link-text { font: 500 12px 'PingFang SC'; color: #9195FB; }

/* 导航辅助文字 */
.nav-aux { font: 500 12px 'PingFang SC'; color: #B3B4B7; }
```

---

## 03 · 间距系统

> 基础单位：8px

| Token | 值 | 用途 |
| --- | --- | --- |
| `--space-2` | `2px` | 微调排版间距 |
| `--space-4` | `4px` | 图标与文字间距 |
| `--space-6` | `6px` | 下拉箭头间距 |
| `--space-8` | `8px` | 基础间距单位 |
| `--space-10` | `10px` | 筛选项内间距 |
| `--space-12` | `12px` | 表格单元格内边距 |
| `--space-16` | `16px` | 图标内容区域 |
| `--space-20` | `20px` | 卡片内边距 |
| `--space-24` | `24px` | 卡片标题下边距 |
| `--space-30` | `30px` | 清算按钮左右内边距 |
| `--space-40` | `40px` | 导航项间距 |
| `--space-120` | `120px` | 页面左右边距 |

---

## 04 · 圆角

| Token | 值 | 适用 |
| --- | --- | --- |
| `--radius-sm` | `2px` | Checkbox、搜索框、提示条 |
| `--radius-md` | `5px` | 按钮、输入框、Supply/Borrow 组件 |
| `--radius-lg` | `10px` | 卡片、面板、弹窗 |

---

## 05 · 阴影

```css
--shadow-card: 0px 10px 20px rgba(0, 0, 0, 0.05);   /* 卡片，仅亮色模式 */
--shadow-toggle: 0px 0px 6px rgba(20, 22, 49, 0.3); /* Toggle 滑块 */
```

> 暗色模式通过背景色叠加实现层次感，不使用投影。

---

## 06 · 布局

| 属性 | 值 |
| --- | --- |
| 页面总宽 | 1440px |
| 内容容器宽 | 1200px |
| 左右页边距 | 120px（各侧） |
| Hero 区高度 | 435px |
| 表格行高 | 44px |
| 表头高度 | 40px（含 1px 分割线） |
| 分页栏高度 | 38px |

### 页面结构

```
┌─────────────────── 1440px ───────────────────┐
│  Hero Section (435px)                         │
│  ├── 导航栏（Fixed）                           │
│  └── 渐变背景 + 装饰圆形                        │
├──────────────── 内容区 1200px ────────────────┤
│  表头 (40px)                                  │
│  数据行 (44px × N)                            │
│  分页 (38px)                                  │
└───────────────────────────────────────────────┘
```

### Hero 渐变背景

```css
background: linear-gradient(
  to bottom,
  #1F2027 13.6%,
  transparent,
  transparent,
  #1F2027 86.1%
);
```

### 装饰元素

| 元素 | 尺寸 | 位置 |
| --- | --- | --- |
| 装饰圆形 1 | 347 × 347px | (539, 82) |
| 装饰圆形 2 | 124 × 124px | (502, 246) |

---

## 07 · 组件规范

### 7.1 按钮 Button

#### 尺寸规格

| 按钮类型 | 宽 | 高 | 内边距 | 圆角 | 字体 |
| --- | --- | --- | --- | --- | --- |
| Supply（标准） | `66px` | 30px` | `5px 12px` | `5px` | Avenir Next Medium 14px |
| Borrow（标准） | `66px` | 30px` | `5px 12px` | `5px` | Avenir Next Medium 14px |
| Supply（小号） | `60px` | `26px` | `5px 12px` | `5px` | Avenir Next Medium 14px |
| Borrow（小号） | `60px` | `26px` | `5px 12px` | `5px` | Avenir Next Medium 14px |
| 清算 Liquidate | `88px` | `33px` | `5px 30px` | `5px` | Avenir Next Medium 14px |

#### Supply 按钮 — 完整交互状态

| 状态 | 背景色 | 边框 | 文字色 | 说明 |
| --- | --- | --- | --- | --- |
| Default | `transparent` | `1px solid rgba(77,84,255,0.4)` | `#4D54FF` | 默认可点击 |
| Hover | `rgba(77,84,255,0.08)` | `1px solid rgba(77,84,255,0.8)` | `#4D54FF` | 鼠标悬浮，背景加深 |
| Active / Pressed | `rgba(77,84,255,0.04)` | `1px solid rgba(77,84,255,0.8)` | `#4D54FF` | 点击按下态 |
| Disabled | `#BEBEC0` | `none` | `rgba(255,255,255,0.6)` | 不可点击，cursor: not-allowed |

```css
.btn-supply {
  width: 65px; height: 28px;
  padding: 5px 12px;
  border-radius: 5px;
  font: 500 14px 'Avenir Next';
  border: 1px solid rgba(77, 84, 255, 0.4);
  color: #4D54FF;
  background: transparent;
  cursor: pointer;
}
.btn-supply:hover {
  background: rgba(77, 84, 255, 0.08);
  border-color: rgba(77, 84, 255, 0.8);
}
.btn-supply:active {
  background: rgba(77, 84, 255, 0.04);
  border-color: rgba(77, 84, 255, 0.8);
}
.btn-supply:disabled, .btn-supply.disabled {
  background: #BEBEC0;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: not-allowed;
}
```

#### Borrow 按钮 — 完整交互状态

| 状态 | 背景色 | 边框 | 文字色 | 说明 |
| --- | --- | --- | --- | --- |
| Default | `transparent` | `1px solid rgba(24,193,159,0.4)` | `#18C19F` | 默认可点击 |
| Hover | `rgba(24,193,159,0.10)` | `1px solid rgba(24,193,159,0.8)` | `#18C19F` | 鼠标悬浮，背景加深 |
| Active / Pressed | `rgba(24,193,159,0.06)` | `1px solid rgba(24,193,159,0.8)` | `#18C19F` | 点击按下态 |
| Disabled | `#D3D3D5` | `none` | `#FFFFFF` | 不可点击，cursor: not-allowed |

```css
.btn-borrow {
  width: 67px; height: 28px;
  padding: 5px 12px;
  border-radius: 5px;
  font: 500 14px 'Avenir Next';
  border: 1px solid rgba(24, 193, 159, 0.4);
  color: #18C19F;
  background: transparent;
  cursor: pointer;
}
.btn-borrow:hover {
  background: rgba(24, 193, 159, 0.10);
  border-color: rgba(24, 193, 159, 0.8);
}
.btn-borrow:active {
  background: rgba(24, 193, 159, 0.06);
  border-color: rgba(24, 193, 159, 0.8);
}
.btn-borrow:disabled, .btn-borrow.disabled {
  background: #D3D3D5;
  border: none;
  color: #FFFFFF;
  cursor: not-allowed;
}
```

#### 清算按钮（暗色模式） — 完整交互状态

| 状态 | 背景色 | 边框 | 文字色 | 说明 |
| --- | --- | --- | --- | --- |
| Default | `rgba(255,255,255,0.06)` | `none` | `#FFFFFF` | 默认态 |
| Hover | `rgba(255,255,255,0.10)` | `none` | `#FFFFFF` | 鼠标悬浮，背景略亮 |
| Active / Pressed | `rgba(255,255,255,0.03)` | `none` | `#FFFFFF` | 点击按下态，背景变暗 |
| Disabled | `rgba(255,255,255,0.03)` | `none` | `rgba(255,255,255,0.3)` | 不可点击 |

```css
.btn-liquidate {
  width: 88px; height: 31px;
  padding: 5px 30px;
  border-radius: 5px;
  font: 500 14px 'Avenir Next';
  background: rgba(255, 255, 255, 0.06);
  color: #FFFFFF;
  border: none;
  cursor: pointer;
}
.btn-liquidate:hover  { background: rgba(255, 255, 255, 0.10); }
.btn-liquidate:active { background: rgba(255, 255, 255, 0.03); }
.btn-liquidate:disabled, .btn-liquidate.disabled {
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.3);
  cursor: not-allowed;
}
```

---

### 7.2 Toggle 开关

```css
.toggle-track { width: 30px; height: 9px; border-radius: 10px; }
.toggle-track.on  { background: #4C54FF; }
.toggle-track.off { background: #D0D0D6; }

.toggle-thumb {
  width: 15px; height: 15px;
  border-radius: 50%;
  background: #FFFFFF;
  box-shadow: 0px 0px 6px rgba(20, 22, 49, 0.3);
}
```

---

### 7.3 表格 Table

```css
.table-row { height: 44px; }

/* 暗色模式 */
.table-row-dark   { border-bottom: 1px solid rgba(255, 255, 255, 0.04); }
.table-row-dark:hover { background: rgba(255, 255, 255, 0.03); }
.table-header-dark { border-bottom: 1px solid rgba(255, 255, 255, 0.06); }

/* 亮色模式 */
.table-row-light   { border-bottom: 1px solid rgba(34, 35, 43, 0.05); }
.table-header-light { border-bottom: 1px solid rgba(34, 35, 43, 0.08); }
```

---

### 7.4 卡片 Card

```css
/* 暗色 */
.card-dark  { background: #22232B; border-radius: 10px; }

/* 亮色 */
.card-light {
  background: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
}
```

---

### 7.5 输入框 Input

```css
/* 暗色 - 风险筛选框 */
.input-filter-dark {
  background: #22232B;
  width: 70px; height: 24px;
  border-radius: 5px;
}
.input-filter-dark.active { background: #53545A; }

/* 亮色 - 搜索框 */
.input-search-light {
  background: rgba(75, 82, 223, 0.06);
  height: 26px;
  border-radius: 2px;
  color: #76777F; /* placeholder */
}
```

---

### 7.6 风险提示条（亮色）

```css
.alert-risk {
  background: rgba(255, 82, 102, 0.06);
  color: #FF5266;
  border-radius: 2px;
  font: 500 12px 'PingFang SC';
}
```

---

### 7.7 账户总览卡片

| 属性 | 值 |
| --- | --- |
| 卡片尺寸 | 390 × 430px |
| 圆角 | 10px |
| 风险仪表尺寸 | 154 × 153px |
| 风险数字 | 30px Bold `#FF5266` |
| 风险标签 | 12px `#FF5266` |
| Net APY | 18px Bold |
| 金额整数部分 | 18px Bold |
| 金额小数部分 | 12px Regular |

---

### 7.8 弹窗 / Dialog

```css
.dialog {
  width: 400px; height: auto;
  border-radius: 10px;
  background: #FFFFFF;
}
.dialog-divider { border-color: rgba(34, 35, 43, 0.08); }
```

---

### 7.9 图标尺寸规范

| 图标 | 尺寸 |
| --- | --- |
| Token Logo | 30 × 30px |
| 下拉箭头 | 6 × 3px |
| 排序箭头 | 8 × 15px |
| 警告图标 | 12 × 12px |
| 关闭按钮 | 8 × 8px |
| 帮助图标（?） | 12 × 12px |
| Checkbox | 12 × 12px |
| 复利图标 | 14 × 14px |

---

## 08 · 交互状态总览

| 状态 | 说明 |
| --- | --- |
| Default | 组件默认展示态 |
| Hover | 表格行背景变为 `rgba(255,255,255,0.03)`（暗色）；按钮边框加深、背景加深 |
| Active / Pressed | Supply/Borrow 按钮半透明背景 + 加深边框；清算按钮背景变暗 |
| Disabled | 按钮变灰（`#BEBEC0` / `#D3D3D5`），文字降低透明度，cursor: not-allowed |
| Toggle On | 轨道色 `#4C54FF`，滑块右移 |
| Toggle Off | 轨道色 `#D0D0D6`，滑块左移 |
| Selected Filter | 背景变为 `#53545A`（暗色） |

---

## 09 · CSS Design Tokens

```css
:root {
  /* ===== 品牌色 ===== */
  --brand-primary: #4D54FF;
  --brand-teal: #18C19F;
  --brand-accent: #9195FB;
  --color-risk: #FF5266;
  --color-gauge-pink: #FF5593;

  /* ===== 暗色模式 ===== */
  --dark-bg: #1F2027;
  --dark-card: #22232B;
  --dark-filter-active: #53545A;
  --dark-btn-bg: rgba(255, 255, 255, 0.06);
  --dark-text-primary: #FFFFFF;
  --dark-text-secondary: rgba(255, 255, 255, 0.6);
  --dark-text-hint: rgba(255, 255, 255, 0.4);
  --dark-text-aux: #B3B4B7;
  --dark-divider-row: rgba(255, 255, 255, 0.04);
  --dark-divider-header: rgba(255, 255, 255, 0.06);
  --dark-row-hover: rgba(255, 255, 255, 0.03);

  /* ===== 亮色模式 ===== */
  --light-bg: #F5F6FA;
  --light-card: #FFFFFF;
  --light-text-primary: #22232B;
  --light-text-secondary: rgba(34, 35, 43, 0.6);
  --light-placeholder: #76777F;
  --light-search-bg: rgba(75, 82, 223, 0.06);
  --light-risk-bg: rgba(255, 82, 102, 0.06);
  --light-toggle-off: #D0D0D6;
  --light-divider-row: rgba(34, 35, 43, 0.05);
  --light-divider-header: rgba(34, 35, 43, 0.08);

  /* ===== 间距 ===== */
  --space-2: 2px;   --space-4: 4px;   --space-6: 6px;
  --space-8: 8px;   --space-10: 10px; --space-12: 12px;
  --space-16: 16px; --space-20: 20px; --space-24: 24px;
  --space-30: 30px; --space-40: 40px; --space-120: 120px;

  /* ===== 圆角 ===== */
  --radius-sm: 2px; --radius-md: 5px; --radius-lg: 10px;

  /* ===== 阴影 ===== */
  --shadow-card: 0px 10px 20px rgba(0, 0, 0, 0.05);
  --shadow-toggle: 0px 0px 6px rgba(20, 22, 49, 0.3);
}
```
