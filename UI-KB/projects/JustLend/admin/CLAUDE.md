# JustLend · 管理后台 — AI 指引

## 概览

- **产品**：JustLend 管理后台
- **设计风格**：浅色内容区 + 深色侧边栏 · 品牌紫 `#6840FF` · 简洁商务后台风格
- **Figma 文件**：`eXrKOoEKqzUVClzJiHYqzQ`（见 `figma-index.md`）

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `design-spec.md` | 设计 Token + 组件规范（色彩、字体、布局） |
| `component-catalog.md` | 组件 Catalog — Figma Node ID + 变体选择规则 |
| `figma-index.md` | Figma 文件链接与页面索引 |
| `figma-structure.md` | Figma 文件命名与组织规范 |

## AI 使用规则

### 生成页面前，必须先读取

1. `design-spec.md` — 色彩 Token、字体、布局数值
2. `component-catalog.md` — 可用组件列表与 Node ID

### 组件使用约束（强制）

> **禁止自行创建组件。** 所有 UI 元素必须从 `component-catalog.md` 中选取。

- 按钮 → 只用 `Button/点击` 或 `Button/切换`，不得自定义形状
- 输入框 → 只用 `输入框` 或 `搜索框` 组件集，选择正确变体
- 弹窗 → 只用 `弹窗` 组件集（`184:448`），按场景选宽度和高度变体
- 标签/Badge → 只用 catalog 中列出的 4 个 Badge 组件
- 侧边栏 → 只用 `侧边栏`（`197:1552`），选择 `默认`/`下拉`/`有tab`

### 生成输出要求

每次生成页面时，必须同时输出**组件使用清单**，格式如下：

```
## 本次使用的组件
| 位置 | 组件名 | Node ID | 变体 |
|------|--------|---------|------|
| 顶部操作区 | Button/点击 | 142:375 | 填充按钮·默认 |
| 搜索区 | 搜索框 | — | 未输入 |
...
```

如某个 UI 元素在 catalog 中找不到对应组件，**必须明确标注"catalog 缺失"**，不得静默自定义。

