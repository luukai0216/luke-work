# TronWallet Adapter — 设计规范

> 最后更新：2026-03-31 | 负责人：待填写

---

## 色彩系统

### 主色板

| Token | 色值 | 用途 |
|-------|------|------|
| `BG_HERO` | `#CEC7FF` | Hero 背景渐变起点 |
| `BG_LIGHT` | `#D3D9FF` | Hero 背景渐变中点 |
| `BG_LAVENDER` | `#CDCAFF` | 页面主背景 |
| `BG_WHITE` | `#FFFFFF` | 卡片、Section 背景 |
| `BG_SECTION` | `#F5F6FF` | 交替 Section 背景 |
| `BLUE_PRIMARY` | `#A7B7FF` | 主强调色 · 编号 · 双色标题关键词 |
| `BLUE_DEEP` | `#667AF9` | 渐变深色端 |
| `NAVY` | `#191A2E` | 主按钮背景 · 深色文字 |

### 文字色彩

| Token | 色值 | 用途 |
|-------|------|------|
| `TEXT_DARK` | `#191A2E` | 主标题 |
| `TEXT_BODY` | `#616082` | 正文 |
| `TEXT_LIGHT` | `#9EA2BD` | 辅助说明 |

### 边框

| Token | 色值 | 用途 |
|-------|------|------|
| `BORDER_LIGHT` | `#E7E8F3` | 浅边框 |
| `BORDER_CARD` | `#E0E3F7` | 卡片边框 |

### 渐变

```css
/* 页面主背景 */
background: linear-gradient(135deg, #CEC7FF 0%, #D3D9FF 50%, #CDCAFF 100%);

/* Section 渐变装饰 */
background: linear-gradient(180deg, rgba(167,183,255,0) 0%, #A7B7FF 100%);

/* 装饰光晕（椭圆，低透明度散布） */
background: #A7B7FF;
opacity: 12–25%;
filter: blur(80–120px);
```

---

## 字体排版

### 字体家族

全站统一使用 **Inter**。

### 字号规范

| 用途 | 字号 | Font Weight |
|------|------|-------------|
| Hero 大标题 | 64–72px | Bold (700) |
| Section 标题 | 36–44px | Bold (700) |
| 卡片标题 | 18–20px | Semi Bold (600) |
| 编号标签（01.） | 16px | Bold (700) |
| 导航链接 | 15–16px | Regular (400) |
| CTA 按钮 | 14–16px | Medium (500) |
| 正文 | 14–16px | Regular (400) |
| 辅助说明 | 13px | Regular (400) |

### 双色标题规则

重要标题的**第一个关键词**使用 `#A7B7FF`，其余文字使用 `#191A2E`。

---

## 间距与圆角

| 元素 | 圆角 | 备注 |
|------|------|------|
| 卡片 | 16–20px | Feature 卡片 |
| 大 Feature 卡片 | 20px | 宽约 1200px |
| 按钮（小） | 8px | 常规操作按钮 |
| 按钮（大/标签） | pill（全圆） | CTA、版本标签 |
| 钱包 Chip | 12px | 高度 60px |
| 产品卡片 | 16px | 高度 100px |
| 代码块 | 12px | 深色背景 |

**页面布局**：
- 页面宽度：1440px
- 内容区左右边距：160px

---

## 视觉风格

- **浅色系**：主背景为薰衣草紫渐变，非暗色主题
- **3D C4D**：关键视觉区使用玻璃质感 3D 渲染图（钱包、设备、几何体），蓝紫色调
- **装饰光晕**：大椭圆低透明度散布在区块角落
- **双色标题**：第一词/关键词用 `#A7B7FF`，其余 `#191A2E`
- **代码感**：深色代码块体现开发者工具定位
- **玻璃质感**：卡片可用 frosted glass（白色半透明 + 模糊边框）


---


> 最后更新：2026-03-31 | 负责人：待填写

---

## 使用原则

- 优先使用设计系统中已有组件，不随意新增
- 新增组件需在本文件登记，并在 Figma 组件库同步

---

## Navbar

```
高度：58px
背景：透明 或 白色
Logo：图标 + 品牌名，Semi Bold，#191A2E
右侧 CTA：#191A2E 背景，白色文字，8px 圆角，宽 140px
```

---

## 按钮 Button

### Primary Button

```
背景：#191A2E
文字：#FFFFFF · 14–16px · Medium
圆角：8px 或 pill（全圆）

Hover：轻微背景加亮
Disabled：透明度降低
```

### Secondary Button

```
背景：#FFFFFF
文字：#191A2E · 14–16px · Medium
边框：1px solid #191A2E
圆角：8px 或 pill（全圆）

Hover：背景 #F5F5F5
```

### 版本标签 Badge

```
背景：#A7B7FF
文字：#FFFFFF · 12–14px · Medium
圆角：pill（全圆）
内边距：4px 12px
```

---

## Feature 卡片

```
背景：#FFFFFF 或 #F5F6FF
边框：1px solid #E0E3F7
圆角：16px
内边距：24–32px

结构：
  编号标签（#A7B7FF Bold，如 "01."）
  标题（Semi Bold，#191A2E）
  描述（Regular，#616082）
  可选：底部线条图标装饰（#A7B7FF 色调）
```

---

## 大 Feature 卡片

```
背景：多层渐变 + 装饰椭圆光晕
圆角：20px
宽度：约 1200px
内边距：48px

布局：一侧放 3D C4D 插图，另一侧放文案 + 按钮组
```

---

## 代码展示卡片

```
背景：#191A2E（深海军蓝）
圆角：12px
内边距：24px

代码区：语法高亮（绿/白/蓝多色），等宽字体
可搭配功能列表（带编号圆点）
```

---

## 钱包 Chip

```
背景：白色半透明（frosted glass）
圆角：12px
高度：60px
宽度：约 200px
内边距：16px 20px

内容：钱包 Logo（32px） + 名称（Medium，#191A2E）
容器背景：深蓝渐变，网格排列
```

---

## 产品卡片

```
背景：#FFFFFF
边框：1px solid #E0E3F7
圆角：16px
高度：100px
宽度：约 590px
内边距：20px 24px

内容：Logo（48px 圆角）+ 名称（Semi Bold）+ 简介（Regular，#616082）
右上角：箭头跳转按钮
```

---

## Footer

```
背景：浅色（#FFFFFF 或 #F5F6FF）
内容：Logo + 文档链接 + 社交图标
社交图标：20px，hover 变 #A7B7FF
```

---

## 废弃组件

| 组件名 | 废弃原因 | 替代方案 |
|--------|----------|----------|
| 待填写 | - | - |
