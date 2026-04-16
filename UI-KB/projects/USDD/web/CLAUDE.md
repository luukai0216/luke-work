# USDD · Web — AI 指引

## 概览

- **产品**：USDD 官网（Web）
- **设计风格**：深色极简风，品牌绿 `#216C58`，Inter 字体，1440px 桌面基准
- **设计规范**：见 `design-spec.md`（内容与 App 端一致）
- **Figma 文件**：USDD_Web（见 `figma-index.md`）

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `design-spec.md` | Token + 基础组件规范（必读） |
| `figma-index.md` | Figma 文件链接与页面索引 |
| `figma-structure.md` | Figma 文件命名与组织规范 |
| `component-catalog.md` | Web 端组件 Catalog（含 Header / Footer 规格） |

## AI 使用规则

### 生成页面前，必须先读取

1. `design-spec.md` — Token、字体、布局数值
2. `component-catalog.md` — Web 端可用组件列表与规格

### 组件使用约束（强制）

> **禁止自行创建组件。** 所有 UI 元素必须从 `component-catalog.md` 中选取。

### 生成输出要求

每次生成页面时，必须同时输出**组件使用清单**：

```
## 本次使用的组件
| 位置 | 组件名 | 规格 |
|------|--------|------|
| 顶部 | Home-nav/dark | 1920×80px |
```

如某 UI 元素在 catalog 中找不到，**必须标注"catalog 缺失：[描述]"**。
