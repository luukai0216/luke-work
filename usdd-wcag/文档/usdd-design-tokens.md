# USDD Design Tokens 设计变量手册

> 基于 `variables.scss`，面向设计师的颜色 & 布局变量参考

---

## 一、品牌主色 Brand Colors

品牌色基于 TRON 生态绿，从深到浅构成完整的交互状态体系。

| Token 名 | 色值 | 用途 |
|---|---|---|
| `$primary-bg-color` | `#17483C` | 品牌色区块背景（最深） |
| `$primary-color` | `#216C58` | 按钮默认态、主要强调色 |
| `$primary-hover-color` | `#5FC693` | 按钮 Hover 态 |
| `$primary-click-color` | `#448F6A` | 按钮 Active/点击态 |
| `$primary-sub-color` | `#87F1BD` | 高亮辅助色（渐变终点、标签强调） |
| `$primary-text-color` | `#81DEB0` | 品牌绿文字、链接默认色 |
| `$link-hover-color` | `#81DEB0` | 链接 Hover 态（与 primary-text 同色） |

### 渐变 Gradients

```
$primary-gradient-color
  → linear-gradient(270deg, #448F6A -1.41%, #5FC693 102.26%)
  用途：主要 CTA 按钮背景

$primary-gradient-color-highlight
  → linear-gradient(270deg, #87F1BD -1.41%, #F3EE9F 102.26%)
  用途：高亮态 / 特殊强调渐变（绿→黄）

$primary-gradient-color-hover
  → #5FC693（纯色，非渐变）
  用途：渐变按钮的 Hover 态回退色
```

---

## 二、中性色（文字 & 透明层）Neutral Colors

> ⚠️ **WCAG 无障碍警告**
> 以下 60% 以下的透明白色在浅色 / 渐变背景上对比度不足。
> **文字用途请优先使用 60% 及以上，40% 以下仅限非文字装饰层。**

背景基准：主背景 `#0C0C0E`（fill-color-4）

| Token 名 | 色值 | 对比度（vs #0C0C0E） | WCAG AA | 推荐用途 |
|---|---|---|---|---|
| `$neutral-color-100` | `#FFFFFF` | 21:1 | ✅ AAA | 主标题、主按钮文字 |
| `$neutral-color-80` | `#CECECF` | ~10:1 | ✅ AAA | 正文、次级标题 |
| `$neutral-color-60` | `#9E9E9F` | ~6:1 | ✅ AA | 辅助说明文字、描述段落 |
| `$neutral-color-40` | `#6D6D6E` | **~4.0:1** | ❌ 不通过 | 仅限非必读装饰性文字 |
| `$neutral-color-25` | `#49494A` | ~2.6:1 | ❌ 不通过 | 仅限分隔线、浮层蒙层 |
| `$neutral-color-20` | `#3D3D3E` | ~2.1:1 | ❌ 不通过 | 仅限边框、图标填充 |
| `$neutral-color-15` | `#303032` | ~1.7:1 | ❌ 不通过 | 仅限 Hover 背景蒙层 |
| `$neutral-color-10` | `#242426` | ~1.4:1 | ❌ 不通过 | 仅限卡片内背景 |
| `$neutral-color-8` | `#1F1F21` | ~1.3:1 | ❌ 不通过 | 仅限极轻量背景填充 |
| `$neutral-color-5` | `#18181A` | ~1.1:1 | ❌ 不通过 | 仅限最轻底纹 |

### 文字层级使用规则（重要）

```
标题文字  →  neutral-100（或 neutral-80 + Bold 字重）
正文文字  →  neutral-80
说明文字  →  neutral-60
禁用文字  →  neutral-40（⚠️ 对比度临界，建议改为实色 #808080）
装饰/icon →  neutral-25 及以下（不承载信息内容）
```

---

## 三、填充色 Fill Colors

用于卡片、浮层、页面分层背景，从浅到深表示层级关系。

| Token 名 | 色值 | 用途 |
|---|---|---|
| `$fill-color-1` | `#3F4042` | 最浅层，输入框、标签背景 |
| `$fill-color-2` | `#212426` | 卡片、弹窗背景 |
| `$fill-color-3` | `#181A1C` | 次级页面背景 |
| `$fill-color-4` | `#0C0C0E` | 主页面背景（最深） |
| `$fill-color-5` | `#1B1B1C` | 全局蒙层（Modal 遮罩） |
| `$default-bg-color` | `#080B0E` | 极深背景（最底层） |

> 层级关系（浅 → 深）：fill-1 → fill-2 → fill-3 → fill-4 → default-bg

---

## 四、边框色 Border Colors

| Token 名 | 色值 | 用途 |
|---|---|---|
| `$border-color` | `#49494A` | 默认边框 |
| `$border-color-40` | `#79797A` | 激活态 / 聚焦边框 |
| `$border-color-15` | `#303032` | 轻量分割线 |
| `$border-color-5` | `#18181A` | 极轻量底纹分隔 |

---

## 五、功能色 Semantic Colors

### Success 成功色

| Token 名 | 色值 | 用途 |
|---|---|---|
| `$success-color` | `#448F6A` | 默认态（与 primary-click 同色） |
| `$success-hover-color` | `#60A080` | Hover 态 |
| `$success-click-color` | `#418865` | Active/点击态 |
| `$success-disabled-color` | `#254737` | 禁用态 |

### Warning 警告色

| Token 名 | 色值 | 用途 |
|---|---|---|
| `$warning-color` | `#FF8F0B` | 默认态 |
| `$warning-hover-color` | `#FF9E2D` | Hover 态 |
| `$warning-click-color` | `#EF870D` | Active 态 |
| `$warning-disabled-color` | `#71440F` | 禁用态 |

### Danger 危险色

| Token 名 | 色值 | 用途 |
|---|---|---|
| `$danger-color` | `#D73133` | 默认态 |
| `$danger-hover-color` | `#EA3A3C` | Hover 态 |
| `$danger-click-color` | `#C52729` | Active 态 |
| `$danger-disabled-color` | `#611E1F` | 禁用态 |

---

## 六、布局变量 Layout Tokens

### 断点 Breakpoints

| 变量 | 值 | 说明 |
|---|---|---|
| `$phone-max-width` | `767px` | 手机最大宽度 |
| `$pc-max-width` | `1479px` | PC 最大宽度 |

### 内容宽度 Content Width

| 变量 | 值 | 说明 |
|---|---|---|
| `$max-width` | `1200px` | 标准内容区最大宽 |
| `$max-width-lg` | `1440px` | 宽屏内容区最大宽 |
| `$pad-padding` | `16px` | 容器内边距 |
| `$section-bg-padding-inline` | `20px` | 区块水平内边距（PC） |
| `$phone-section-bg-padding-inline` | `24px` | 区块水平内边距（Mobile） |

### 间距 Spacing

| 变量 | 值 | 用途 |
|---|---|---|
| `$gap` | `24px` | 标准栅格间距（PC） |
| `$phone-gap` | `16px` | 标准栅格间距（Mobile） |

### 高度 Heights

| 变量 | 值 | 说明 |
|---|---|---|
| `$header-height` | `80px` | PC 顶部导航高度 |
| `$phone-header-height` | `64px` | Mobile 顶部导航高度 |
| `$footer-height` | `60px` | 底部栏高度 |
| `$header-btn-width` | `150px` | Header 按钮宽度 |

---

## 七、待整改：无障碍合规问题 ⚠️

基于 WCAG 审计，以下颜色用于文字时存在合规风险：

| 问题 Token | 当前色值 | 当前对比度 | 建议替换为 | 替换后对比度 |
|---|---|---|---|---|
| `$neutral-color-40`（文字用途） | `#6D6D6E` | 4.0:1 ❌ | `#808080` | 4.6:1 ✅ |
| `$neutral-color-25`（文字用途） | `#49494A` | 2.6:1 ❌ | `#696969` | 5.7:1 ✅ |
| `$neutral-color-20`（文字用途） | `#3D3D3E` | 2.1:1 ❌ | 仅用于非文字装饰 | — |

> **核心原则**：透明度颜色不适合文字，因为背景色变化会导致对比度不可控。
> 文字层级差异改用**色调深浅（实色）+ 字重**来表达。

---

*最后更新：2026-04-28*
