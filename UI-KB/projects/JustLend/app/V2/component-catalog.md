# JustLend App V2 · 组件 Catalog

> 来源：`design-spec.md` · 提取日期：2026-04-09
> 说明：V2 Figma 文件为页面设计稿，无独立 COMPONENT 节点。本 catalog 基于 design-spec.md 整理，是 AI 生成页面的权威参考。

---

## 使用规则

生成页面时：
1. **颜色只使用** `design-spec.md` 中的 CSS Variables
2. **组件视觉只按本 catalog 实现**，不得自创风格
3. 生成输出时须附**组件使用清单**
4. 找不到合适组件时须标注 **"catalog 缺失"**

---

## 01 · Button 按钮

| 变体 | 背景 | 文字 | 边框 | 用途 |
| --- | --- | --- | --- | --- |
| `Primary` | `#24B887` | `#FFFFFF` | 无 | 主操作（Supply、Borrow） |
| `Secondary` | `--color-surface-2` | `--color-text-primary` | 无 | 次要操作 |
| `Purple` | `#7B5EA7` | `#FFFFFF` | 无 | 特殊功能按钮 |
| `Outline` | 透明 | `--color-text-primary` | `1px solid --color-border` | 辅助操作 |
| `Danger` | `#E84B54` | `#FFFFFF` | 无 | 危险操作（清算、退出） |
| `Text` | 透明 | `#24B887` | 无 | 文字链接式操作 |

**尺寸：**

| 尺寸 | 高度 | 内边距 | 字体 |
| --- | --- | --- | --- |
| `lg` | 48px | 0 24px | 14px / 500 |
| `md` | 40px | 0 20px | 14px / 500 |
| `sm` | 32px | 0 16px | 12px / 500 |

**圆角：** 5px | **状态：** hover → `#00D9A0`；disabled → `opacity: 0.4`；loading → spinner

---

## 02 · Input 输入框

| 属性 | 值 |
| --- | --- |
| 高度 | 48px |
| 圆角 | 8px |
| 内边距 | 0 16px |
| 边框（默认） | `1px solid --color-border` |
| 背景 | `--color-surface-2` |
| 字体（数值） | JetBrains Mono，tabular-nums |
| 字体（文字） | Inter 14px/400 |

| 状态 | 边框 | 阴影 |
| --- | --- | --- |
| 默认 | `--color-border` | 无 |
| Focus | `#24B887` | `0 0 0 3px rgba(36,184,135,.15)` |
| Error | `#E84B54` | `0 0 0 3px rgba(232,75,84,.15)` |
| Risk | `#FF8C00` | `0 0 0 3px rgba(255,140,0,.15)` |

---

## 03 · Modal 弹窗

| 属性 | 值 |
| --- | --- |
| 宽度 | 480px |
| 圆角 | 16px |
| 背景 | `--color-surface-1` |
| 遮罩 | `rgba(0,0,0,.6)` |
| 内边距 | 24px |
| 入场动画 | `opacity 0→1` + `translateY(8px→0)` · 200ms ease-out |

**多步骤签名弹窗：** 显示步骤进度条（Step 1: Approve · Step 2: Supply）

---

## 04 · Table 数据表格

| 属性 | 值 |
| --- | --- |
| 表头高度 | 48px |
| 行高 | 64px |
| 表头背景 | `--color-surface-1` |
| 表头字体 | 11px uppercase `--color-text-secondary` |
| 行背景 | `--color-surface-2` |
| 行 hover | `--color-surface-1` · 100ms ease |
| 行间分割线 | `1px solid --color-border` |
| 单元格内边距 | 0 16px |

**数值格式：** 金额 `$1,072,850.12`，APY `6.89%`，Token 数量 `28,123,456 TRX`（JetBrains Mono tabular-nums）

---

## 05 · Card 卡片

| 属性 | 值 |
| --- | --- |
| 圆角 | 12px |
| 背景 | `--color-surface-1` |
| 内边距 | 20–24px |
| 嵌套卡片 | 圆角 8px，背景 `--color-surface-2` |

---

## 06 · 导航栏

| 属性 | 值 |
| --- | --- |
| 高度 | 60px |
| 背景 | `--color-bg-base` |
| 内容宽度 | 1200px |

---

## 附：组件选择决策树

```
需要用户操作？
├── 提交/确认 → Button Primary (lg/md)
├── 取消/次要 → Button Outline 或 Secondary
├── 危险操作 → Button Danger
├── 文字链接 → Button Text
└── 输入数值/地址 → Input（数值用 tabular-nums）

展示数据？
├── 列表/市场数据 → Table（行高64px，表头48px）
├── 统计数据卡 → Card（12px圆角）
└── 弹窗操作 → Modal（480px宽，16px圆角）

深色 vs 浅色模式？
├── 默认深色 → 使用 dark theme CSS variables
└── 浅色模式 → 使用 [data-theme="light"] 覆盖变量
```
