# TronWallet Adapter · 官网 — AI 指引

## 概览

- **产品**：TronWallet Adapter 官方网站
- **设计风格**：蓝紫浅色主题 · 3D C4D 玻璃质感 · 开发者工具风格
- **主色调**：`#A7B7FF`（蓝紫强调）+ `#191A2E`（深海军蓝）
- **Figma 文件**：待填写（见 `figma-index.md`）

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `design-spec.md` | 设计 Token + 组件规范 |
| `figma-index.md` | Figma 文件链接与页面索引 |
| `figma-structure.md` | Figma 文件命名与组织规范 |

## AI 使用规则

- Figma 操作参考 `~/.claude/skills/tronwallet-adapter/SKILL.md`
- 注意：本项目为**浅色主题**，勿与 TRON Web 暗色规范混用

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
```

如某 UI 元素在 catalog 中找不到，**必须标注"catalog 缺失：[描述]"**。

