# TronLink · Chrome 插件 — 设计规范

> 规范来源：Figma 设计稿（150+ 屏分析）| 同步日期：2026-04-03

---

## 01 · 基础信息

| 属性 | 值 |
|------|-----|
| 平台 | Chrome Extension |
| 视口 | 360 × 600 px |
| 设计工具 | Figma |
| 字体 | HarmonyOS Sans · PingFang SC |

---

## 02 · 色彩系统

### 品牌色

| Token | Hex | 用途 |
|---|---|---|
| Brand Primary | `#0D1FFF` | 品牌主色、链接、活跃指示器、能量条 |
| Brand Background | `#CFD2FF` | 品牌色浅底、Tag 高亮背景 |

### 文字色阶

| Token | Hex | 用途 |
|---|---|---|
| 一级文字 Primary | `#1A212B` | 标题、正文主要内容、金额数字 |
| 二级颜色 Secondary | `#6D778C` | 辅助说明文字、次要信息 |
| 三级颜色 Tertiary | `#9BA4B6` | 占位符、提示、禁用文字、副标签 |

### 语义色

| Token | Hex | 用途 |
|---|---|---|
| 成功色 Success | `#0EB145` | 交易成功、GasFree 标识、正向金额 |
| 错误色 Error | `#E03B33` | 交易失败、负向金额、错误提示 |
| 警告色 Warning | `#EF8607` | 安全警告、风险提示 |

### 背景与表面

| Token | Hex | 用途 |
|---|---|---|
| Surface | `#F4F4F7` | 输入框底色、卡片背景、分割线、禁用按钮 |
| Border | `#EBEDF0` | 卡片边框、表格边框、按钮边框 |
| Overlay | `#D1D3D5` | 按钮冻结态 |

### 链与钱包标识色

| Token | Hex | 用途 |
|---|---|---|
| 能量 Energy | `#0D1FFF` | 能量条指示器（蓝色圆点 5px） |
| 带宽 Bandwidth | `#80D41F` | 带宽条指示器（绿色圆点 5px） |

---

## 03 · 字体排版

### 字体族

| 字体 | 适用场景 | 字重 |
|------|----------|------|
| HarmonyOS Sans | 英文文本、数字金额、钱包地址 | Regular 400 · Medium 500 · Bold 700 |
| PingFang SC | 中文标签、标题、正文 | Regular · Medium · Semibold |

### 字阶规范

| 用途 | 字体 | 字号 | 颜色 | 场景 |
|------|------|------|------|------|
| Balance Display 余额展示 | HarmonyOS Sans Bold | 36px | `#1A212B` | 首页核心 |
| Splash Title 启动页标题 | PingFang SC Semibold | 30px | `#1A212B` | 启动页 |
| Page Title 页面标题 | PingFang SC Semibold / Medium | 18px | `#1A212B` | 高频使用 |
| Asset Name 资产名称 | HarmonyOS Sans SC Medium | 16px | `#1A212B` | 高频使用 |
| Button Text 按钮文字 | PingFang SC Medium / Semibold | 14–15px | — | — |
| Body / Label 正文 | PingFang SC / HarmonyOS Sans Regular | 14px | `#1A212B` | 高频使用 |
| Caption 副文本 | PingFang SC / HarmonyOS Sans Regular | 12px | `#9BA4B6` | — |
| Tag Text 标签文字 | PingFang SC Regular | 11px | `#6D778C` | — |

---

## 04 · 圆角规范

| 值 | 使用场景 |
|---|---|
| 4px | 头像、小标签 |
| 6px | 按钮、输入框 |
| 8px | 小卡片 |
| 10px | Logo、导航 |
| 12px | 弹窗、大卡片 |
| 16px | Token 图标 |
| 50% | 圆形操作按钮 |

---

## 05 · 组件规范

### Button 按钮

| 类型 | 背景 | 边框 | 文字 | 用途 |
|------|------|------|------|------|
| Primary | `#1A212B` | — | `#FFFFFF` | 创建钱包、确定、提交等主要操作 |
| Secondary | `#FFFFFF` | 1px `#E8E8E8` | `#1A212B` | 取消、关闭等次要操作 |
| Disabled | `#F4F4F7` | — | `#9BA4B6` | 未满足操作条件 |

- 高度：**52px**
- 圆角：**6px**
- 双按钮组合（弹窗场景）：左侧 Ghost + 右侧 Primary，间距 12px，各占一半宽度

---

### Input 输入框

| 属性 | 值 |
|------|-----|
| 高度 | 52px |
| 圆角 | 6px |
| 内边距 | 0 16px |
| 占位符 | PingFang SC Medium 14px，`#9BA4B6` |
| 输入文字 | PingFang SC / HarmonyOS Sans 14px，`#1A212B` |
| 密码切换 | 20px 眼睛图标，右对齐 |
| 标签 | PingFang SC Medium 14px，`#1A212B`，margin-bottom 8px |

| 状态 | 说明 |
|------|------|
| Default | 标准边框样式 |
| Focused | 高亮边框，显示清除按钮 ✕ |
| Error | 错误提示，错误色边框 |
| Disabled | 灰色背景，不可交互 |

---

### 资产列表项（Asset List Item）

| 元素 | 规格 |
|------|------|
| 行高 Row Height | 64px |
| Token 图标 | 32×32px，border-radius 16px（全圆），带 10px 链验证徽章 |
| Token 名称 | HarmonyOS Sans SC Medium 16px，`#1A212B`，左对齐 |
| 余额 Balance | HarmonyOS Sans SC Medium 16px，`#1A212B`，右对齐 |
| USD 估值 | HarmonyOS Sans SC Regular 12px，`#9BA4B6` |
| 图标与文字间距 | 12px |
| 分隔线 | 1px dashed `#F4F4F7` |

---

### Modal 弹窗

| 属性 | 值 |
|------|-----|
| 遮罩 | `rgba(0, 0, 0, 0.5)` |
| 容器 | `#FFFFFF`，居中，radius 12px |
| 宽度 | 280–320px |
| 内边距 | 20–24px |
| 标题 | PingFang SC Semibold 16–18px，居中，`#1A212B` |
| 正文 | PingFang SC Regular 14px，居中，`#6D778C` |
| 按钮间距 | 12px |

| 弹窗类型 | 说明 |
|------|------|
| Confirm Dialog | 标题 16–18px Semibold 居中 · 正文 14px `#6D778C` 居中 · 双按钮 52px 底部 |
| Delete Dialog | radius 12px，padding 24px，width 280–320px，box-shadow |

---

### Badge & Tag 标签与徽章

| 类型 | 样式 | 示例 |
|------|------|------|
| 钱包类型 | 圆角矩形，`#F4F4F7` 底，11px 文字，22px 高 | "多签" "普通钱包" |
| GasFree Badge | 描边圆角，`#0EB145` 文字，带图标 | "GasFree" |
| 状态标签 | Pill 形，彩色文字 + 浅色底 | "失败" "成功" "待处理" |
| 网络标签 | 品牌色小标签 | "TRON" "EVM" |
