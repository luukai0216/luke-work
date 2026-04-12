# JustLend · Portal — AI 指引

## 概览

- **产品**：JustLend Portal
- **设计风格**：深色科技风，品牌 teal `#01C1AE` + 蓝紫渐变，Poppins 英文字体，1440px 桌面基准
- **Figma 文件**：Portal-首页改版（见 `figma-index.md`）

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `design-spec.md` | 设计 Token + 组件规范 |
| `figma-index.md` | Figma 文件链接与页面索引 |
| `figma-structure.md` | Figma 文件命名与组织规范 |

## AI 使用规则


## AI 使用规则

### 生成页面前，必须先读取

1. `design-spec.md` — 色彩 Token、字体、布局数值
2. `component-catalog.md` — 可用组件列表与规格

### 组件使用约束（强制）

> **禁止自行创建组件。** 所有 UI 元素必须从 `component-catalog.md` 中选取。

### 生成输出要求

每次生成页面时，必须同时输出**组件使用清单**：

```
## 本次使用的组件
| 位置 | 组件名 | 规格 |
|------|--------|------|
| 顶部操作区 | Primary Button | 44px，胶囊 |
```

如某 UI 元素在 catalog 中找不到，**必须标注"catalog 缺失：[描述]"**。

