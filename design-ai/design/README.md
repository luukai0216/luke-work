# USDD 设计资料库

> 本目录存放 USDD 设计相关的补充文档，主要解决 Figma 中不便长期维护的内容。
> 设计系统本体、组件库、变量和页面稿仍以 Figma 为准，这里只记录便于检索、复用和协作的说明。

---

## 目录说明

| 文件 | 作用 | 适用场景 |
| --- | --- | --- |
| `USDD-component-guidelines.md` | 设计规范与组件使用指南 | 需要确认 token、字体、圆角、间距、按钮、弹窗和状态展示时 |
| `USDD-design-decisions.md` | 设计决策记录 | 需要回溯某个方案为什么这样定稿时 |
| `USDD-review-checklist.md` | UI 走查清单 | 开发完成后做还原度验收和问题记录时 |
| `USDD-asset-inventory.md` | 设计资产清单 | 查图标、插画、字体和 Figma 资源时 |
| `USDD-figma-structure.md` | Figma 文件结构说明 | 新人上手、找设计稿、确认页面命名时 |

---

## 文档之间的关系

| 上游资料 | 本目录引用 | 说明 |
| --- | --- | --- |
| PRD / 需求说明 | `USDD-component-guidelines.md` | 把需求转成可执行的设计规范和组件选择 |
| 设计评审记录 | `USDD-design-decisions.md` | 记录评审结论，避免重复讨论已定方案 |
| 开发提测结果 | `USDD-review-checklist.md` | 用于验收界面还原度和问题闭环 |
| Figma Design System | `USDD-asset-inventory.md`、`USDD-figma-structure.md` | 记录资产和文件组织方式，方便快速定位资源 |

---

## 当前文档内容概览

### 1. `USDD-component-guidelines.md`

- 记录品牌色、背景色、文字色、边框、填充等 token
- 统一字体为 Inter，并定义 Heading、Body、Label、Caption 等字阶
- 说明圆角和间距的标准 token
- 定义按钮、弹窗、状态展示等标准组件的使用方式

### 2. `USDD-design-decisions.md`

- 记录关键设计决策及其背景、备选方案、最终选择和理由
- 当前已记录的决策包括首次加载的 loading 方案
- 适合在后续评审、改版和争议讨论时直接引用

### 3. `USDD-review-checklist.md`

- 提供开发完成后的 UI 走查模板
- 包含走查信息、问题记录、必查项、建议查项和结论
- 适合 PM 与设计师共同做验收，统一修复优先级

### 4. `USDD-asset-inventory.md`

- 记录项目使用的图标、插画、字体和 Figma 资源
- 图标以 `Icon/<name>` 命名，尺寸统一为 24×24px，格式为 SVG
- 字体目前记录为 Inter，资源来源为 USDD Design System

### 5. `USDD-figma-structure.md`

- 说明 USDD 相关 Figma 文件的组织方式
- 包含 Design System、官网、APP 三类文件及对应链接
- 约定 Page 命名与 Frame 命名，方便统一查找和归档

---

## 维护原则

- 设计系统本体以 Figma 为准，本目录只维护补充说明和协作信息
- 新增或修改组件时，优先更新 `USDD-component-guidelines.md`
- 新的评审结论应补充到 `USDD-design-decisions.md`
- 新的走查问题和验收模板应更新 `USDD-review-checklist.md`
- 图标、插画、字体和资源链接变化时，更新 `USDD-asset-inventory.md`
- Figma 文件结构或命名规则变化时，更新 `USDD-figma-structure.md`

---

## 使用建议

1. 先看 `USDD-component-guidelines.md`，确认设计 token 和组件规范
2. 找不到原因时，再查 `USDD-design-decisions.md`
3. 开发提测后用 `USDD-review-checklist.md` 做验收
4. 需要复用图标、字体或资源时，查 `USDD-asset-inventory.md`
5. 需要定位设计稿时，查 `USDD-figma-structure.md`

