# JustLend Portal · 组件 Catalog

> 来源：`design-spec.md` · 提取日期：2026-04-09
> 视口：1440px Desktop（含响应式 1024 / 768 / 375px）

---

## 使用规则

1. **颜色只使用** design-spec.md 中定义的 Token
2. 所有组件视觉按本 catalog 实现，不得自创风格
3. 生成输出须附**组件使用清单**
4. 找不到合适组件须标注 **"catalog 缺失"**

---

## 01 · Button 按钮

### Hero CTA（Just Launch）

| 属性 | 值 |
|------|-----|
| 背景 | `#67DBCC` |
| 高度 | 46px，宽度 170px，圆角 10px |
| 文字 | Poppins Medium 16px，`#0A0E19` |
| 带箭头图标 | 20×20px |

### Primary Button

| 属性 | 值 |
|------|-----|
| 背景 | `--gradient-primary` 或 `#01C1AE` |
| 圆角 | 50px（胶囊） |
| 文字 | Poppins SemiBold，`#FFFFFF` |
| Hover | 亮度 +10%，scale(1.02)，teal glow |
| Disabled | `rgba(1,193,174,.3)` 背景，文字 `rgba(255,255,255,.4)` |

### Ghost Button（次要）

- 背景透明，边框 `1px solid rgba(255,255,255,.2)`，文字 `#FFFFFF`
- Hover：边框变 teal，文字变 teal

### Text Link Button

- 无背景边框，文字 `#01C1AE` 或 `#74A4FD`，Hover 显下划线

### 尺寸

| 尺寸 | 高度 | 字号 | 内边距 |
|------|------|------|--------|
| Large | 52px | 18px | 0 32px |
| Default | 44px | 16px | 0 24px |
| Small | 36px | 14px | 0 16px |
| XSmall | 28px | 12px | 0 12px |

---

## 02 · 导航栏（Navigation Bar）

| 属性 | 值 |
|------|-----|
| 高度 | 64px（sticky） |
| 背景 | `rgba(10,14,25,.8)` + backdrop-blur |
| 结构 | Logo · 导航链接 · CTA Button |
| 激活链接 | `#01C1AE` 颜色 |

---

## 03 · Stats Card（数据统计卡片）

| 属性 | 值 |
|------|-----|
| 尺寸 | 约 280–305×96px |
| 背景 | `rgba(28,34,53,.8)` |
| 边框 | `1px solid rgba(255,255,255,.06)` |
| 圆角 | 12px，内边距 20px 24px |
| 标签文字 | Poppins Regular 14px，`--color-text-secondary` |
| 数值 | Poppins SemiBold 28px，`--color-text-primary` |
| Hover | 边框变 `rgba(1,193,174,.3)`，teal glow |

---

## 04 · Feature Card（功能卡片）

| 属性 | 值 |
|------|-----|
| 宽度 | 280–340px，最小高度 200px |
| 背景 | `#1C2235` |
| 边框 | `1px solid rgba(255,255,255,.08)` |
| 圆角 | 16px，内边距 24px |
| Hover | 边框变 teal，顶部光晕，`translateY(-4px)` |

**内容层次：** 图标(40px) → 标题(20px SemiBold) → 描述(14px) → 数据亮点 → CTA 链接

---

## 05 · Mega Dropdown 下拉菜单

| 属性 | 值 |
|------|-----|
| 背景 | `rgba(10,14,25,.95)` + blur |
| 边框 | `1px solid rgba(255,255,255,.08)` |
| 圆角 | 12px |
| 内边距 | 24px |
| 入场动画 | `opacity 0→1` + `translateY(-8px→0)` · 200ms ease-out |

---

## 06 · Tag / Badge 标签

| 变体 | 背景 | 文字 | 用途 |
|------|------|------|------|
| Nova | `rgba(1,193,174,.15)` | `#01C1AE` | 新版功能标签 |
| Classica | `rgba(154,163,188,.15)` | `#9AA3BC` | 旧版功能标签 |
| Warning | `rgba(255,222,2,.15)` | `#FFDE02` | 风险提示 |
| New | `--gradient-primary` | `#FFFFFF` | 新功能标识 |

- 高度：20–24px，内边距：0 8px，圆角：4px
- 字体：Poppins SemiBold 10–12px

---

## 07 · 加载页面（Loading Screen）

- 全屏覆盖，背景 `#0A0E19`
- 居中 TRON/JustLend Logo + 进度指示器
- 淡入淡出动画 300ms

---

## 附：组件选择决策树

```
用户行动引导？
├── Hero 区主 CTA → Hero CTA Button (#67DBCC)
├── 主要操作 → Primary Button（胶囊，50px 圆角）
├── 次要操作 → Ghost Button
└── 文字跳转 → Text Link Button

展示数据卡片？
├── 总量/TVL 等统计 → Stats Card（280×96px，12px 圆角）
└── 功能介绍 → Feature Card（16px 圆角，hover 上移）

标注功能版本？
├── V2/新版 → Nova Tag（teal）
├── V1/旧版 → Classica Tag（灰）
└── 有风险 → Warning Tag（黄）

页面框架？
├── 顶部 → Navigation Bar（64px sticky，blur 背景）
└── 首次加载 → Loading Screen（全屏）
```
