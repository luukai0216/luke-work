# USDD App · 组件 Catalog

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

| 规格 | Desktop | Mobile |
| --- | --- | --- |
| 组件名 | `App-nav/Dark` | `App-nav_M-new` |
| 尺寸 | 1960×220px（含子菜单展开区） | 430×204px |
| Node ID | `191:507` | `191:654` |
| 特性 | 含 Risk 指标 + 钱包连接按钮 | 汉堡菜单 |

---

## 02 · Footer（页脚）

| 场景 | 组件名 | 尺寸 | Node ID |
| --- | --- | --- | --- |
| App Desktop | `footer/app-pc` | 1920×80px | `199:407` |
| App Mobile | `footer/app-m` | 390×393px | `199:722` |

> App Footer 为精简版（80px 高），仅含版权信息与外链。

---

## 03 · Button 按钮

> 完整规格见 `design-spec.md § 7.1`

| Type | App 使用场景 |
| --- | --- |
| Primary | "Mint USDD"、"Repay"、"Deposit"、"Connect Wallet" |
| Secondary | "Cancel"、"Back"、查看详情 |
| Danger | "Liquidate"、"Close Vault" |
| Ghost | 次级文字操作、链接跳转 |

**App 推荐尺寸：** Medium（表单主操作 48px）/ Small（表格行操作 40px）/ Mini（状态切换 32px）

---

## 04 · Tag / Badge 标签

> 完整规格见 `design-spec.md § 7.2`

**App 常用场景：**
- `success` — 健康值安全、正收益率
- `danger` — 健康值危险、清算风险
- `warning` — 健康值警告（接近清算线）
- `info` — 功能类型标注（PSM / Vault / Earn）
- `default` — 一般状态

---

## 05 · Input 输入框

> catalog 缺失：Design System 有 Input 组件（页面 `239:2`），以下规格来源 Figma 设计稿实测

| 属性 | 值 |
| --- | --- |
| 高度 | 48px（Medium）/ 40px（Small） |
| 背景 | `bg-elevated` (#212426) |
| 边框 | `1px solid border-default` |
| 圆角 | `radius-md`（8px） |
| 内边距 | 0 `space-4`（16px） |
| 文字 | `body-sm`，`text-primary` |
| Placeholder | `body-sm`，`text-quaternary` |
| Focus | 边框变 `border-strong`（2px，rgba(255,255,255,0.25)） |
| Error | 边框变 `danger-default` |

**金额输入框特例：**
- 右侧附 Token Logo + 名称
- 底部显示换算价值（`caption`，`text-tertiary`）
- Max 按钮：Ghost / Mini 规格

---

## 06 · 数据卡片（Stat / Info Card）

> catalog 缺失：以下规格来源 App 设计稿实测

| 属性 | 值 |
| --- | --- |
| 背景 | `bg-card` (#181A1C) |
| 边框 | `1px solid border-subtle` |
| 圆角 | `radius-lg`（16px） |
| 内边距 | `space-5`（24px） |
| 标签 | `caption-sb`，`text-tertiary` |
| 数值 | `heading-5` 或 `heading-4`，`text-primary` |
| 子数值 / 说明 | `body-sm`，`text-tertiary` |

---

## 07 · 风险/健康值指示器（Risk Indicator）

> catalog 来源：`Header` 页面的 `.Risk/Dark` 组件（Node `202:626`）

| 状态 | 颜色 |
| --- | --- |
| 安全 | `success-default` (#448F6A) |
| 警告 | `warning-default` (#FF8F0B) |
| 危险 | `danger-default` (#D73133) |

---

## 附：组件选择决策树

```
顶部导航？
└── App 页面统一 → App-nav/Dark（1960×220px）

表单主操作按钮？
├── 铸造 / 存入 / 确认 → Primary · Medium（48px）
├── 清算 / 关闭仓位    → Danger · Medium（48px）
├── 取消 / 返回        → Secondary · Medium（48px）
└── 最大值 / 次级操作  → Ghost · Mini（32px）

风险状态展示？
├── 健康值 > 150% → success Tag
├── 100%–150%     → warning Tag
└── < 100%        → danger Tag

底部？
└── App 页面统一 → footer/app-pc（Desktop 80px）
```
