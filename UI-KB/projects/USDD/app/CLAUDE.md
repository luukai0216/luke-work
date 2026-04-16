# USDD · App — AI 指引

## 概览

- **产品**：USDD DeFi 操作界面（App）
- **设计风格**：深色极简风，品牌绿 `#216C58`，Inter 字体，1440px 桌面基准
- **设计规范**：见 `design-spec.md`（内容与 Web 端一致）
- **Figma 文件**：USDD_APP（见 `figma-index.md`）

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `design-spec.md` | Token + 基础组件规范（必读） |
| `figma-index.md` | Figma 文件链接与页面索引 |
| `figma-structure.md` | Figma 文件命名与组织规范 |
| `component-catalog.md` | App 端组件 Catalog（含 Header / Footer 规格） |

## AI 使用规则

### 生成页面前，必须先读取

1. `design-spec.md` — Token、字体、布局数值
2. `component-catalog.md` — App 端可用组件列表与规格

### 组件使用约束（强制）

> **禁止自行创建组件。** 所有 UI 元素必须从 `component-catalog.md` 中选取。

### 生成输出要求

每次生成页面时，必须同时输出**组件使用清单**：

```
## 本次使用的组件
| 位置 | 组件名 | 规格 |
|------|--------|------|
| 顶部 | App-nav/Dark | 1960×220px |
```

如某 UI 元素在 catalog 中找不到，**必须标注"catalog 缺失：[描述]"**。

### App 模块说明

操作前请确认目标模块（PSM / Vault / Earn / Savings 等），不同模块的表单逻辑不同。
