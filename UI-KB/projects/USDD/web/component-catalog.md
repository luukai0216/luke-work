# USDD Web · 组件 Catalog

> 来源：`design-spec.md` + `figma-index.md` | 提取日期：2026-04-16
> 视口：1440px Desktop（含响应式 Mobile 390px）

---

## 使用规则

1. **Token 只使用** `design-spec.md` 中定义的值
2. 所有组件视觉按本 catalog 实现，不得自创风格
3. 生成输出须附**组件使用清单**
4. 找不到合适组件须标注 **"catalog 缺失"**

---

## 01 · Header（导航栏）

### Home-nav（官网首页顶栏）

| 规格 | Desktop | Mobile |
|------|---------|--------|
| 组件名 | `Home-nav/dark` | `Home-nav_M/dark` |
| 尺寸 | 1920×80px | 390×72px |
| Node ID | `191:945` | `191:983` |

### App-nav（DeFi 应用顶栏）

> Web 页面如内嵌 App 功能则使用此 Header

| 规格 | Desktop | Mobile |
|------|---------|--------|
| 组件名 | `App-nav/Dark` | `App-nav_M-new` |
| 尺寸 | 1960×220px（含子菜单区） | 430×204px |
| Node ID | `191:507` | `191:654` |

---

## 02 · Footer（页脚）

| 场景 | 组件名 | 尺寸 | Node ID |
|------|--------|------|---------|
| 官网首页 Desktop | `footer/home-pc` | 1920×763px | `199:279` |
| 官网首页 Mobile | `footer/home-m` | 390×961px | `199:664` |

---

## 03 · Button 按钮

> 完整规格见 `design-spec.md § 7.1`

| Type | 用途示例（Web） |
|------|----------------|
| Primary | "了解更多"、"查看数据"、"Connect Wallet" |
| Secondary | "返回"、次要入口 |
| Ghost | 导航行内链接按钮 |
| Danger | 确认危险操作 |

**Web 推荐尺寸：** Large（Hero CTA）/ Medium（Section CTA）/ Small（内联操作）

---

## 04 · Tag / Badge 标签

> 完整规格见 `design-spec.md § 7.2`

**Web 常用场景：**
- `success` — 数据正涨幅标签
- `danger` — 数据负跌幅标签、风险等级
- `info` — 功能说明标注
- `warning` — 风险提示

---

## 05 · 数据展示卡片（Data Card）

> catalog 缺失：Design System 中无 Data Card 组件，以下规格来源 Web 设计稿实测

| 属性 | 值 |
|------|-----|
| 背景 | `bg-card` (#181A1C) |
| 边框 | `1px solid border-subtle` |
| 圆角 | `radius-lg`（16px） |
| 内边距 | `space-5`（24px） |
| 标题文字 | `body-sm`，`text-tertiary` |
| 数值文字 | `heading-5` 或 `heading-4`，`text-primary` |
| Hover | 边框变 `border-default`，`shadow-sm` |

---

## 附：组件选择决策树

```
顶部导航？
├── 官网首页 → Home-nav/dark（80px）
└── App 功能页 → App-nav/Dark（含子菜单）

用户主操作？
├── 主要 CTA（Hero 区） → Primary Button · Large（64px）
├── Section 内主操作  → Primary Button · Medium（48px）
├── 次要 / 取消      → Secondary Button
└── 文字行内链接     → Ghost Button

数据状态？
├── 涨 / 正向  → success Tag
├── 跌 / 负向  → danger Tag
├── 警告 / 风险 → warning Tag
└── 信息提示   → info Tag
```
