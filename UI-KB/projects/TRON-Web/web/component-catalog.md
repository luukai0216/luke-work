# TRON 官网 · 组件 Catalog

> 来源：`design-spec.md` · 提取日期：2026-04-09
> 视口：1440px Desktop（含响应式）

---

## 使用规则

1. **颜色只使用** design-spec.md 中定义的 Token
2. 所有组件视觉按本 catalog 实现，不得自创风格
3. 生成输出须附**组件使用清单**
4. 找不到合适组件须标注 **"catalog 缺失"**

---

## 01 · Button 按钮

### Primary Button（主按钮）

| 属性 | 值 |
|------|-----|
| 背景 | `--gradient-primary`（teal→blue 135°）或纯 `#01C1AE` |
| 文字 | Poppins SemiBold，`#FFFFFF` |
| 圆角 | 50px（胶囊形） |
| Hover | 亮度 +10%，`scale(1.02)`，teal glow 阴影 |
| Active | `scale(0.98)` |
| Disabled | `rgba(1,193,174,.3)` 背景，文字 `rgba(255,255,255,.4)` |

### Secondary Button（次要/Ghost）

- 背景：透明
- 边框：`1px solid rgba(255,255,255,.2)`
- 文字：`#FFFFFF`
- Hover：边框变 teal，文字变 teal

### Hero CTA Button（Just Launch）

- 背景：`#67DBCC`，高度 46px，宽度 170px，圆角 10px
- 文字：Poppins Medium 16px，`#0A0E19`（深色文字）
- 带右箭头图标 20×20px

### Text Link Button

- 无背景无边框，文字色：`#01C1AE` 或 `#74A4FD`
- Hover：下划线显现

### 尺寸规格

| 尺寸 | 高度 | 字号 | 内边距 |
|------|------|------|--------|
| Large | 52px | 18px | 0 32px |
| Default | 44px | 16px | 0 24px |
| Small | 36px | 14px | 0 16px |
| Extra Small | 28px | 12px | 0 12px |

---

## 02 · Card 卡片

| 类型 | 背景 | 圆角 | 内边距 | Hover |
|------|------|------|--------|-------|
| 默认卡片 | `rgba(255,255,255,.04)` | 16px | 24–32px | border teal + translateY(-4px) |
| Feature Card | `#1E3050` 或 dark surface | 16px | 24px | translateY(-4px) + border `#01C1AE` |
| Stats Card | `rgba(255,255,255,.06)` | 12px | 20px 24px | teal glow 阴影 |

---

## 03 · Header 导航栏

| 属性 | 值 |
|------|-----|
| 高度 | 72px（sticky） |
| 背景 | `rgba(10,14,25,.8)` + backdrop-blur 20px |
| 结构 | TRON Logo · 导航链接 · CTA Button |
| 链接 hover | 颜色变 `#01C1AE` |
| 分隔线 | `1px solid rgba(255,255,255,.08)` |

---

## 04 · Input 输入框

| 属性 | 值 |
|------|-----|
| 高度 | 48px |
| 圆角 | 8px |
| 背景 | `rgba(255,255,255,.06)` |
| 边框 | `1px solid rgba(255,255,255,.1)` |
| 文字 | `#FFFFFF` |
| 占位符 | `rgba(255,255,255,.3)` |
| Focus | 边框 `#01C1AE`，阴影 `0 0 0 3px rgba(1,193,174,.2)` |

---

## 05 · Tab / Filter

- 底部下划线风格，激活 `#01C1AE`，宽度 `100%`，高度 2px
- 非激活：`rgba(255,255,255,.6)`
- 可带数字 Badge（白底黑字，圆角，4px 内边距）

---

## 06 · Badge & Tag

| 类型 | 背景 | 文字 | 圆角 |
|------|------|------|------|
| Success | `rgba(0,193,131,.15)` | `#00C183` | 4px |
| Warning | `rgba(255,140,0,.15)` | `#FF8C00` | 4px |
| Error | `rgba(232,75,84,.15)` | `#E84B54` | 4px |
| 品牌 Tag | teal tint 底 | `#01C1AE` | 4–6px |

---

## 07 · Modal 弹窗

| 属性 | 值 |
|------|-----|
| 宽度 | 480–560px |
| 圆角 | 16px |
| 背景 | `#0F1117` 或 dark surface |
| 遮罩 | `rgba(0,0,0,.7)` |
| 边框 | `1px solid rgba(255,255,255,.08)` |

---

## 08 · Footer 页脚

- 背景：`#0A0E19`（最深色）
- 顶部分割线：`1px solid rgba(255,255,255,.08)`
- Logo + 链接列 + 社交图标 + 版权文字

---

## 附：组件选择决策树

```
用户行动引导？
├── 主要 CTA → Button Primary（胶囊形，50px 圆角）
├── Hero 区 CTA → Hero CTA Button（#67DBCC 背景）
├── 次要操作 → Button Ghost
└── 文字链接 → Text Link Button

展示内容块？
├── 功能介绍 → Feature Card（hover translateY(-4px)）
├── 数据统计 → Stats Card（12px 圆角）
└── 通用内容 → 默认卡片（16px 圆角）

页面框架？
├── 顶部 → Header 导航（72px sticky）
└── 底部 → Footer（#0A0E19 背景）

状态标签？
└── 按语义色选对应 Badge 类型
```
