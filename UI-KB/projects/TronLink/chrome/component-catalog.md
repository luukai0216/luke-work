# TronLink Chrome 插件 · 组件 Catalog

> 来源：`design-spec.md` + Figma `U1qM2l4Vlvb5IzyzmMw4yW` · 提取日期：2026-04-09
> 视口：360×600px Chrome Extension

---

## 使用规则

1. **颜色只使用** design-spec.md 中定义的色彩 Token
2. 所有组件视觉按本 catalog 实现，不得自创风格
3. 生成输出须附**组件使用清单**
4. 找不到合适组件须标注 **"catalog 缺失"**

---

## 01 · Button 按钮

### 全宽按钮（Full Width）

| 类型 | 背景 | 文字 | 边框 | 高度 |
| --- | --- | --- | --- | --- |
| `Primary` | `#1A212B` | `#FFFFFF` | 无 | 52px |
| `Disabled` | `#F4F4F7` | `#9BA4B6` | 无 | 52px |
| `Secondary/Ghost` | 透明 | `#1A212B` | `1px solid ``#E8E8E8` | 52px |

- 宽度：100%，圆角：6px
- 字体：PingFang SC Medium/Regular 14–15px

### 弹窗双按钮

| 按钮 | 宽度 | 背景 | 文字 | 边框 |
| --- | --- | --- | --- | --- |
| 取消 | 145px | 透明 | `#1A212B` | `1px solid ``#EBEDF0` |
| 确认 | 145px | `#1A212B` | `#FFFFFF` | 无 |

- 高度：40px，圆角：8px，间距：12px

### 弹窗单按钮

高度 40px，宽度 305px，圆角 8px，背景 `#1A212B`，文字白色

---

## 02 · Input 输入框

| 属性 | 值 |
| --- | --- |
| 高度 | 52px |
| 圆角 | 6px |
| 内边距 | 0 16px |
| 占位符 | PingFang SC Medium 14px，`#9BA4B6` |
| 输入文字 | 14px，`#1A212B` |
| 标签 | Medium 14px，`#1A212B`，margin-bottom 8px |

| 状态 | 说明 |
| --- | --- |
| Default | 标准边框 `#EBEDF0` |
| Focused | 高亮边框，显示清除 ✕ |
| Error | `#E03B33` 边框 + 错误提示文字 |
| Disabled | `#F4F4F7` 背景，不可交互 |

---

## 03 · Modal 弹窗

| 属性 | 值 |
| --- | --- |
| 宽度 | 280–320px |
| 圆角 | 12px |
| 背景 | `#FFFFFF` |
| 遮罩 | `rgba(0,0,0,.5)` |
| 内边距 | 20–24px |
| 标题 | PingFang SC Semibold 16–18px，居中，`#1A212B` |
| 正文 | Regular 14px，居中，`#6D778C` |

| 弹窗类型 | 说明 |
| --- | --- |
| Confirm Dialog | 标题 + 正文 + 双按钮 |
| Delete Dialog | radius 12px，padding 24px，带 box-shadow |

---

## 04 · 资产列表项（Asset List Item）

| 元素 | 规格 |
| --- | --- |
| 行高 | 64px |
| Token 图标 | 32×32px，border-radius 50%，带 10px 链验证徽章 |
| Token 名称 | HarmonyOS Sans SC Medium 16px，`#1A212B` |
| 余额 | HarmonyOS Sans SC Medium 16px，`#1A212B`，右对齐 |
| USD 估值 | Regular 12px，`#9BA4B6` |
| 图标与文字间距 | 12px |
| 分隔线 | 1px dashed `#F4F4F7` |

---

## 05 · Badge & Tag 标签

| 类型 | 样式 | 场景 |
| --- | --- | --- |
| 钱包类型 | `#F4F4F7` 底，11px，22px 高，圆角矩形 | "多签" "普通钱包" |
| GasFree | 描边圆角，`#0EB145` 文字，带图标 | GasFree 功能标识 |
| 状态标签 | Pill 形，彩色文字 + 浅色底 | "成功" "失败" "待处理" |
| 网络标签 | 品牌色小标签 | "TRON" "EVM" |

---

## 06 · 通知栏 / Toast

- 位置：顶部固定
- 高度：44px（单行）
- 图标：16×16px 左侧
- 文字：14px，`#1A212B`
- 成功：`#0EB145` 图标/边框
- 错误：`#E03B33` 图标/边框
- 警告：`#EF8607` 图标/边框

---

## 附：组件选择决策树

```
页面操作？
├── 主要操作（确认/提交） → Button Primary，全宽 52px
├── 次要操作（取消） → Button Ghost
└── 弹窗操作 → Modal + 双按钮（40px）

需要用户输入？
└── 文字/数值/密码 → Input（52px 高）

展示资产列表？
└── 每行资产 → Asset List Item（64px 行高）

状态标识？
├── 网络/链 → 网络标签
├── 钱包类型 → 钱包类型 Badge
└── 功能特性 → GasFree / 状态标签

提示通知？
└── 操作反馈 → Toast（顶部，成功/错误/警告）
```
