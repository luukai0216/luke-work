# TronLink · App — 设计规范

> 版本：v4.20.0 · 更新：2026-03
> 来源：Figma `hUdskcXVM2HWObHPfsfR3D` · 节点 `274:58`
> 约束：所有 UI 生成必须严格遵循本规范，不得使用规范外的颜色、字体、圆角或间距值。

---

## 1. 色彩系统

TronLink 以深蓝色为品牌主色、深灰色为功能主色，辅以语义色彩。

### CSS 变量

```css
/* 品牌色 */
--color-primary:           #0D1FFF;   /* 主蓝色，强调/链接/焦点边框 */
--color-primary-light:     #ECEDFF;   /* 主色浅底，选中背景 */
--color-button-primary-bg: #1A212B;   /* 深灰主按钮背景 */

/* 文字色 */
--color-text-primary:      #1A212B;   /* 一级文本（标题、重要内容） */
--color-text-secondary:    #6D778C;   /* 二级文本（说明、副标题） */
--color-text-tertiary:     #9BA4B6;   /* 三级文本（占位符、辅助） */
--color-text-white:        #FFFFFF;   /* 白色文本（深色背景上） */

/* 背景色 */
--color-bg-primary:        #FFFFFF;   /* 主背景 */
--color-bg-secondary:      #F4F4F7;   /* 次要背景、输入框、搜索栏 */
--color-border:            #EBEDF0;   /* 边框、分割线 */
--color-bg-overlay:        rgba(26,33,43,0.60); /* 遮罩层 */

/* 语义色 */
--color-success:           #0EB145;
--color-warning:           #EF8607;
--color-error:             #E03B33;

/* 功能色 */
--color-energy:            #0D1FFF;   /* 能量资源 */
--color-bandwidth:         #80D41F;   /* 带宽资源 */

/* 禁用色 */
--color-disabled-bg:       #D1D3D5;
```

### 使用规则

| 场景 | 变量 |
| --- | --- |
| 主要操作按钮背景 | `--color-button-primary-bg` (#1A212B) |
| 品牌强调 / 链接 / 焦点边框 | `--color-primary` (#0D1FFF) |
| 一级正文 | `--color-text-primary` |
| 二级说明文字 | `--color-text-secondary` |
| 占位符 / 提示文字 | `--color-text-tertiary` |
| 输入框 / 搜索背景 | `--color-bg-secondary` |
| 普通边框 | `--color-border` |
| 遮罩层 | `--color-bg-overlay` |

> **禁止**使用规范外的任意颜色值。主色蓝 `#0D1FFF` 仅用于焦点边框和品牌强调，**不用于大面积背景**。

---

## 2. 字体排版

中文：**PingFang SC**；英文 / 数字：**HarmonyOS Sans**

| 层级 | 规格 | 典型场景 |
| --- | --- | --- |
| T1 大标题 | HarmonyOS Sans Bold · 32px | 资产总额大数字 |
| T2 页面标题 | PingFang SC Semibold · 20px | 页面顶部导航标题 |
| T3 钱包名称 | PingFang SC Medium · 16px | 钱包名称、列表主标题 |
| T4 资产名称 | HarmonyOS Sans Medium · 16px | 代币符号（TRX、USDT） |
| T5 板块标题 | PingFang SC Semibold · 14px | 模块分区标题 |
| T6 正文 | PingFang SC Regular · 14px | 正文内容、按钮文字 |
| T7 辅助文本 | HarmonyOS Sans Regular · 12px | 辅助说明、时间戳 |

### 弹窗字体

| 元素 | 规格 |
| --- | --- |
| 双按钮弹窗标题 | PingFang SC Semibold 16px · `--color-text-primary` |
| 单按钮弹窗标题 | PingFang SC Semibold 18px · `--color-text-primary` |
| 弹窗正文 | PingFang SC Regular 14px · `--color-text-secondary` |
| 底部弹窗分组标题 | PingFang SC Medium 16px · `--color-text-primary` |
| 底部弹窗选项 | PingFang SC Regular 14px · `--color-text-primary` |
| 错误提示文字 | PingFang SC Regular 12px · `--color-error` |
| 复选框标签 | PingFang SC Regular 12px · `--color-text-secondary` |

---

## 3. 圆角规范

> 原则：圆角随组件层级递增——底层容器大圆角，小型控件小圆角。

| 级别 | 值 | 适用组件 |
| --- | --- | --- |
| XS | 4px | 头像、小标签 |
| SM | 8px | **按钮、输入框、搜索栏、卡片内按钮、警告提示条** |
| MD | 12px | 卡片 |
| LG | **16px** | **弹窗（Dialog）、底部弹窗（Bottom Sheet）顶部** |
| Capsule | 20px | 开关组件（Switch/Toggle） |
| Tag | 2px | 标签与徽章（非胶囊形） |

---

## 4. 关键约束总览

| 约束项 | 规则 |
| --- | --- |
| 颜色 | 只使用上述 CSS 变量色值，禁止其他颜色 |
| 字体 | 中文 PingFang SC，英文/数字 HarmonyOS Sans |
| 按钮圆角 | 统一 **8px**，弹窗/底部面板 **16px** |
| 主按钮色 | `#1A212B`（深灰），**不使用蓝色作为主按钮背景** |
| 输入框高度 | 固定 **50px**，搜索栏 **40px** |
| 弹窗遮罩 | `#1A212B` 60% 透明度 |
| 标签圆角 | **2px**（非胶囊），开关圆角 **20px** |
| 错误色背景 | 提示条使用 10% 透明度，非纯色填充 |


---


> 版本：v4.20.0 · 更新：2026-03
> 来源：Figma `hUdskcXVM2HWObHPfsfR3D` · 节点 `274:58`

---

## 按钮 Button

### 全宽按钮

| 属性 | Primary | Disabled | Secondary/Ghost |
| --- | --- | --- | --- |
| 高度 | 44px | 44px | 44px |
| 宽度 | 100% | 100% | 100% |
| 圆角 | 8px | 8px | 8px |
| 背景 | `#1A212B` | `#D1D3D5` | transparent |
| 文字色 | `#FFFFFF` | `#FFFFFF` | `#1A212B` |
| 边框 | 无 | 无 | 1px solid `#EBEDF0` |
| 字体 | PingFang SC Regular 14px | PingFang SC Regular 14px | PingFang SC Regular 14px |

### 半宽按钮

| 属性 | 次要（创建钱包） | 主要（导入钱包） |
| --- | --- | --- |
| 高度 | 48px | 48px |
| 宽度 | 162px | 162px |
| 圆角 | 8px | 8px |
| 背景 | `#F4F4F7` | `#1A212B` |
| 文字色 | `#1A212B` | `#FFFFFF` |
| 字体 | PingFang SC Semibold 14px | PingFang SC Semibold 14px |
| 图标 | 20×20px · 左侧 · 间距 8px | 20×20px · 左侧 · 间距 8px |

### 弹窗双按钮

| 属性 | 取消 | 确认 |
| --- | --- | --- |
| 高度 | 40px | 40px |
| 宽度 | 145px | 145px |
| 圆角 | 8px | 8px |
| 背景 | transparent | `#1A212B` |
| 文字色 | `#1A212B` · 14px | `#FFFFFF` · 14px |
| 边框 | 1px solid `#EBEDF0` | 无 |

### 弹窗单按钮

| 属性 | 值 |
| --- | --- |
| 高度 | 40px |
| 宽度 | 305px |
| 圆角 | 8px |
| 背景 | `#1A212B` |
| 文字 | `#FFFFFF` · PingFang SC Regular 14px |

---

## 输入框 Input

### 基础文本输入框

| 属性 | 默认态 | 聚焦态 | 错误态 |
| --- | --- | --- | --- |
| 高度 | 50px | 50px | 50px |
| 宽度 | 100% | 100% | 100% |
| 圆角 | 8px | 8px | 8px |
| 边框 | 1px solid `#EBEDF0` | 1px solid `#0D1FFF` | 1px solid `#E03B33` |
| 输入值字体 | PingFang SC Semibold 14px · `#1A212B` | — | — |
| 占位文字 | PingFang SC Regular 14px · `#9BA4B6` | — | — |

### 密码输入框

与基础输入框规格一致（50px × 100% × 8px），仅对内容做 mask 处理。

### 带操作按钮的输入框

与基础输入框一致，右侧附加操作按钮：
- 标题栏：PingFang SC Medium 16px · `#1A212B`
- 粘贴按钮文字：PingFang SC Regular 12px · `#1A212B`

### 多行输入框 Textarea

| 属性 | 值 |
| --- | --- |
| 最小高度 | 140px |
| 宽度 | 100% |
| 圆角 | 8px |
| 边框 | 1px solid `#EBEDF0` |
| 内边距 | 12px 16px |

### 错误提示

- 文字：PingFang SC Regular 12px · `#E03B33`
- 图标：14×14px · `#E03B33`

### 复选框 Checkbox

| 属性 | 值 |
| --- | --- |
| 尺寸 | 14×14px |
| 圆角 | 2px |
| 标签字体 | PingFang SC Regular 12px · `#6D778C` |

---

## 标签与徽章 Tags & Badges

| 属性 | 值 |
| --- | --- |
| 圆角 | **2px**（非胶囊形） |
| 内边距 | 2px 6px |
| 图标高度 | 16px |

---

## 弹窗 Dialog

### 双按钮弹窗

| 属性 | 值 |
| --- | --- |
| 宽度 | 345px |
| 圆角 | **16px** |
| 内边距 | 30px 20px 20px |
| 遮罩 | `#1A212B` · 60% 透明度 |
| 标题 | PingFang SC Semibold 16px · `#1A212B` |
| 正文 | PingFang SC Regular 14px · `#6D778C` |
| 标题与正文间距 | 24px |
| 正文与按钮间距 | 24px |
| 按钮间距 | 15px |

### 单按钮弹窗（安全提示）

| 属性 | 值 |
| --- | --- |
| 圆角 | **16px** |
| 遮罩 | `#1A212B` · 60% 透明度 |
| 顶部图标 | 60×60px |
| 图标与标题间距 | 10px |
| 标题 | PingFang SC Semibold **18px** · `#1A212B` |
| 正文 | PingFang SC Regular 14px · `#6D778C` |
| 按钮 | 305×40px |

---

## 搜索栏 Search Bar

| 属性 | 值 |
| --- | --- |
| 高度 | 40px |
| 宽度 | 100% |
| 圆角 | 8px |
| 背景 | `#F4F4F7` |
| 搜索图标 | 16×16px · `#9BA4B6` |
| 图标与文字间距 | 8px |

---

## 底部弹窗 Bottom Sheet

| 属性 | 值 |
| --- | --- |
| 顶部圆角 | **16px**（仅上方两角） |
| 遮罩 | `#1A212B` · 60% 透明度 |
| 内边距 | 20px |
| 分组标题 | PingFang SC Medium 16px · `#1A212B` |
| 选项文字 | PingFang SC Regular 14px · `#1A212B` |

---

## 开关 Switch / Toggle

| 属性 | 开启 (ON) | 关闭 (OFF) |
| --- | --- | --- |
| 容器尺寸 | 38×24px | 38×24px |
| 圆角 | 20px（胶囊形） | 20px（胶囊形） |
| 背景色 | `#0EB145` | `#D1D3D5` |
| 滑块 | 20×20px · 白色 · 阴影 | 20×20px · 白色 · 阴影 |
| 滑块位置 | right: 2px | left: 2px |

---

## 提示条 Alerts & Banners

### 错误提示条

| 属性 | 值 |
| --- | --- |
| 背景 | `rgba(224,59,51,0.10)` |
| 文字 | PingFang SC Regular 12px · `#E03B33` |
| 图标 | 14px · `#E03B33` |
| 内边距 | 10px 15px |
| 圆角 | 无（全宽横幅） |

### 警告提示条

| 属性 | 值 |
| --- | --- |
| 背景 | `rgba(239,134,7,0.10)` |
| 文字 | PingFang SC Regular 12px · `#EF8607` |
| 圆角 | 8px |
