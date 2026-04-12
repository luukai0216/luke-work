# USDD-设计规范

> 数据来源：Figma USDD Design System — Variables

## 色彩 Token

### Brand


| Token 名称                  | 色值                  | 用途            |
| ------------------------- | ------------------- | ------------- |
| `--color-brand-default`   | `#216c58`           | 主操作按钮、主要强调色   |
| `--color-brand-hover`     | `#2a8c6c`           | 主操作按钮 hover 态 |
| `--color-brand-light`     | `#5fc693`           | 品牌色浅色变体       |
| `--color-brand-highlight` | `#81deb0`           | 高亮文字、标签       |
| `--color-brand-subtle`    | `#c8f5e0`           | 浅色标签背景、提示背景   |
| `--color-brand-bg`        | `#216c58```` / 15%` | 品牌色低透明度背景块    |


### Background


| Token 名称              | 色值        | 用途           |
| --------------------- | --------- | ------------ |
| `--color-bg-page`     | `#0c0c0e` | 页面底层背景       |
| `--color-bg-section`  | `#141615` | 区块背景         |
| `--color-bg-card`     | `#181a1c` | 卡片背景         |
| `--color-bg-elevated` | `#212426` | 悬浮层背景（下拉、弹出） |


### Text


| Token 名称                  | 色值                  | 用途     |
| ------------------------- | ------------------- | ------ |
| `--color-text-primary`    | `#ffffff`           | 标题     |
| `--color-text-secondary`  | `#ffffff```` / 80%` | 次要标题   |
| `--color-text-tertiary`   | `#ffffff```` / 60%` | 正文     |
| `--color-text-quaternary` | `#ffffff```` / 40%` | 说明     |
| `--color-text-disabled`   | `#ffffff```` / 20%` | 禁用状态文字 |


### Border


| Token 名称                 | 色值                  | 用途           |
| ------------------------ | ------------------- | ------------ |
| `--color-border-strong`  | `#ffffff```` / 25%` | 强描边（选中态、分割线） |
| `--color-border-default` | `#ffffff```` / 15%` | 默认描边         |
| `--color-border-subtle`  | `#ffffff```` / 8%`  | 分割线          |


### Fill


| Token 名称                | 色值                  | 用途          |
| ----------------------- | ------------------- | ----------- |
| `--color-fill-hover`    | `#ffffff```` / 4%`  | 通用 hover 填充 |
| `--color-fill-disabled` | `#ffffff```` / 20%` | 禁用填充        |
| `--color-fill-overlay`  | `#000000 / 60%`     | 遮罩层         |


### 状态色


| Token 名称                  | 色值（default） | 用途        |
| ------------------------- | ----------- | --------- |
| `--color-success-default` | `#448f6a`   | 成功状态      |
| `--color-warning-default` | `#ff8f0b`   | 警告状态      |
| `--color-danger-default`  | `#d73133`   | 危险 / 错误状态 |
| `--color-info-default`    | `#0d9488`   | 信息提示状态    |


> **规则**：原型中禁止使用裸色值，必须引用 token。

---

## 字体规范

> 字体族：**Inter**（全局唯一）

### 字阶


| 字阶         | Token        | 字号   | 行高   | 字重        | 用途      |
| ---------- | ------------ | ---- | ---- | --------- | ------- |
| Heading 1  | `heading-1`  | 56px | 78px | Semi Bold | 超大页面标题  |
| Heading 2  | `heading-2`  | 48px | 68px | Semi Bold | 大页面标题   |
| Heading 3  | `heading-3`  | 40px | 56px | Semi Bold | 模块主标题   |
| Heading 4  | `heading-4`  | 32px | 46px | Semi Bold | 模块副标题   |
| Heading 5  | `heading-5`  | 24px | 34px | Semi Bold | 卡片标题    |
| Heading 6  | `heading-6`  | 20px | 28px | Semi Bold | 小标题     |
| Body MD    | `body-md`    | 16px | 22px | Regular   | 正文      |
| Body SM    | `body-sm`    | 14px | 20px | Regular   | 次要正文    |
| Label MD   | `label-md`   | 16px | 22px | Semi Bold | 按钮、表单标签 |
| Label SM   | `label-sm`   | 14px | 20px | Semi Bold | 小按钮、标签  |
| Caption    | `caption`    | 12px | 16px | Regular   | 辅助说明    |
| Caption SB | `caption-sb` | 12px | 16px | Semi Bold | 强调辅助说明  |


---

## 圆角规范


| Token         | 值     | 适用组件                 |
| ------------- | ----- | -------------------- |
| `radius-xs`   | 4px   | 标签（Tag）、小徽章          |
| `radius-sm`   | 6px   | 输入框、选择器              |
| `radius-md`   | 8px   | 卡片、按钮                |
| `radius-lg`   | 16px  | 大卡片、弹窗               |
| `radius-xl`   | 24px  | 底部弹出面板（Bottom Sheet） |
| `radius-full` | 999px | 头像、胶囊按钮              |


---

## 间距规范


| Token     | 值    | 常用场景              |
| --------- | ---- | ----------------- |
| `space-1` | 4px  | 图标与文字间距、内联元素间距    |
| `space-2` | 8px  | 组件内紧凑间距           |
| `space-3` | 12px | 组件内默认 padding     |
| `space-4` | 16px | 卡片内 padding、列表项间距 |
| `space-5` | 24px | 模块间距、卡片间距         |
| `space-6` | 32px | 区块间距              |
| `space-7` | 48px | 页面区段间距            |
| `space-8` | 64px | 大区块间距             |
| `space-9` | 80px | 页面顶部/底部留白         |


---

## 标准组件

### 按钮


| 类型        | 用途                                          | 圆角          | 字体         |
| --------- | ------------------------------------------- | ----------- | ---------- |
| Primary   | 主操作（每页最多 1 个），使用 `--color-brand-default` 填充 | `radius-md` | `label-md` |
| Secondary | 次要操作，使用 `--color-border-default` 描边 + 透明背景  | `radius-md` | `label-md` |
| Text      | 文字链接式操作，无背景无描边，颜色 `--color-brand-highlight` | —           | `label-md` |
| Danger    | 危险操作（删除等），使用 `--color-danger-default` 填充    | `radius-md` | `label-md` |


### 弹窗


| 类型           | 用途          | 圆角                 | 背景                    |
| ------------ | ----------- | ------------------ | --------------------- |
| Alert        | 信息确认，单按钮    | `radius-lg`        | `--color-bg-elevated` |
| Confirm      | 操作确认（含取消按钮） | `radius-lg`        | `--color-bg-elevated` |
| Bottom Sheet | 底部弹出选项      | `radius-xl`（仅上方两角） | `--color-bg-card`     |


### 状态展示


| 状态  | 展示方式                           | 说明                                                                      |
| --- | ------------------------------ | ----------------------------------------------------------------------- |
| 加载中 | Skeleton 骨架屏（优先）/ Spinner      | Skeleton 使用 `--color-bg-elevated` 填充；Spinner 使用 `--color-brand-default` |
| 空态  | 插画 + 说明文字（`body-sm`）+ 操作按钮（可选） | 文字颜色 `--color-text-tertiary`                                            |
| 错误态 | 图标 + 错误文案（`body-sm`）+ 重试按钮     | 图标颜色 `--color-danger-default`，文字 `--color-text-secondary`               |


