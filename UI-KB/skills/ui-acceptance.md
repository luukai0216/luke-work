---
name: ui-acceptance
description: TRON Web UI 验收测试 - 对比 Figma 设计稿与实现页面，结合 TRON 设计规范，覆盖布局间距、颜色字体、响应式、交互状态四个维度，输出 HTML 报告
source: ~/.claude/skills/ui-acceptance/SKILL.md
---
# TRON Web UI 验收测试

基于通用 `ui-acceptance` skill，补充 TRON Web 专属上下文。

---

## TRON 项目上下文

### Figma 文件

| 字段 | 值 |
| --- | --- |
| 文件名 | TRON |
| File Key | `Y6aCELT09PrPFQkiZVqESm` |
| 文件链接 | https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON |
| 当前版本 | V3.5.2 |

页面 Node ID 索引见：`../web/figma-design-index.md`

### 设计规范参考

执行验收前，**必须先读取**以下文件作为判断依据：

| 文件 | 用途 |
| --- | --- |
| `../web/design.md` | 色彩、字体、间距、圆角、阴影、动效完整规范 |
| `../design/review-checklist.md` | 走查清单，逐项核对 |
| `../design/component-guidelines.md` | 各组件的精确规格（按钮、卡片、输入框等） |

---

## TRON 专属验收规则

在通用四维度基础上，额外检查以下 TRON 特有规范：

### 色彩

- 页面背景必须为纯黑 `#000000`，不可出现白色或浅色背景
- 品牌红必须精确为 `#D01919`（hover `#E5282A`），不接受近似色
- 所有图片、截图必须在深色背景下展示，不可有白色底板
- Footer 底部条必须为品牌红 `#D01919`，高度 48px

### 字体

- 展示标题（Display XL/L）必须使用 Zero World 字体
- 中文标题/正文使用 PingFang HK，英文正文使用 Inter
- 最小字号不低于 12px（Caption 级）

### 按钮

- 主按钮圆角必须为 100px（Pill），非 8px 或其他值
- 主按钮背景精确为 `#D01919`，文字为 `#FFFFFF`
- hover 状态必须有 scale(1.02) 轻微放大 + 光晕效果

### 卡片

- 卡片圆角必须为 16px
- hover 时边框变为 `#D01919`，且有 translateY(-4px) 上移
- 过渡时长 0.2s ease

### Header

- 高度必须为 64px
- 背景必须为 `rgba(0,0,0,0.9)` + `backdrop-filter: blur(20px)`
- 滚动后底部边框 `1px solid #1A1A1A` 出现
- Logo 高度 32px，导航链接 hover 色 `#D01919`

### 响应式断点

| 断点 | 宽度 | 容器 |
| --- | --- | --- |
| Desktop XL | ≥ 1440px | 1280px |
| Desktop | 1200–1439px | 1140px |
| Mobile | < 768px | 全宽，内边距 20px |

### 间距

- 所有间距必须为 8px 的倍数，不接受 7px、9px 等非基准值

---

## 严重程度定义（TRON 版）

| 级别 | 定义 | 示例 |
| --- | --- | --- |
| **P0** | 品牌一致性严重违反，或功能性错误 | 按钮用了蓝色、背景出现白色、主按钮圆角非 Pill |
| **P1** | 可察觉的视觉偏差，影响整体一致性 | 卡片圆角 12px 而非 16px、间距非 8px 基准 |
| **P2** | 细微偏差，不影响整体效果 | 字重偏差、透明度轻微不符 |
| **Pass** | 与设计稿及规范一致 | — |

---

## 报告输出

沿用通用 skill 的 HTML 报告格式，输出到：

```
~/Desktop/tron-ui-acceptance-[YYYYMMDD-HHmm].html
```

报告标题改为：**TRON Web UI 验收报告 — {页面/模块名}**

---

## 使用说明

### 第一步：准备材料

| 材料 | 是否必须 | 说明 |
| --- | --- | --- |
| Figma 节点 URL | 必须 | 从 `../web/figma-design-index.md` 查找对应页面链接 |
| 实现页截图 | 建议提供 | 用系统截图工具截取，保存为 PNG |
| 测试环境 URL | 可选 | 有 URL 时可自动分析 CSS 数值，更精准 |
| 响应式截图 | 可选 | 移动端/平板截图，没有时报告中会列出人工验证项 |
| 交互状态截图 | 可选 | hover/focus/disabled 等状态，没有时列出待验证清单 |

---

### 场景一：最简验收（仅设计稿对比）

只有 Figma 链接时，AI 会基于设计数据 + TRON 规范进行分析，实现端数值需人工对照。

```
/ui-acceptance

Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=xxx-xxx
```

---

### 场景二：标准验收（设计稿 + 实现截图）

最常用的方式，AI 视觉对比设计稿与实现截图。

```
/ui-acceptance

Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=xxx-xxx
实现截图: /Users/Leo/Desktop/homepage-screenshot.png
```

截图获取方法（macOS）：
- 全屏：`Command + Shift + 3`
- 区域：`Command + Shift + 4`
- 浏览器截全页：DevTools → Command + Shift + P → 输入 `screenshot`

---

### 场景三：精准验收（设计稿 + 截图 + 页面 URL）

同时提供截图和 URL，截图用于视觉对比，URL 用于 CSS 数值精确提取，两者互补，结果最准确。

```
/ui-acceptance

Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=xxx-xxx
实现截图: /Users/Leo/Desktop/homepage-screenshot.png
测试环境 URL: https://staging.tron.network
```

---

### 场景四：全量验收（含响应式和交互状态）

```
/ui-acceptance

Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=xxx-xxx
实现截图: /Users/Leo/Desktop/homepage-desktop.png
测试环境 URL: https://staging.tron.network
响应式截图:
  - Mobile: /Users/Leo/Desktop/homepage-mobile.png
  - Tablet: /Users/Leo/Desktop/homepage-tablet.png
交互状态截图:
  - Hover: /Users/Leo/Desktop/button-hover.png
  - Disabled: /Users/Leo/Desktop/button-disabled.png
```

---

### 验收报告说明

报告生成在桌面：`~/Desktop/tron-ui-acceptance-[YYYYMMDD-HHmm].html`，双击用浏览器打开。

**报告结构：**

| 区域 | 内容 |
| --- | --- |
| 执行摘要 | 总体结论（Pass / Needs Work / Fail）+ 四维度 P0/P1/P2 问题数 |
| 视觉对比 | 设计稿截图（左）vs 实现截图（右）并排展示 |
| 布局和间距 | 偏差超过 2px 的间距/尺寸问题，含具体数值 |
| 颜色和字体 | 色值/字号/字重不符项，含精确对比值 |
| 响应式表现 | 各断点的布局问题 |
| 交互状态 | hover/focus/disabled 等状态验证结果或待验证清单 |
| 人工验证清单 | 无法自动检测的项目，带复选框供人工勾选 |

**问题修复建议格式示例：**
> `padding: 16px 24px` → 应改为 `padding: 12px 20px`（P1）

---

### 场景五：多状态组件验收（弹窗 / Modal）

当验收弹窗、下拉菜单等有多个状态的组件时，需对每个状态分别截图对比。

```
/ui-acceptance

Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=1577-632
验收范围: 只验收 AI Search 按钮 + 弹窗（空态/有结果/无结果）
弹窗截图:
  - 空态:   /Users/Leo/Desktop/modal-empty.png
  - 有结果: /Users/Leo/Desktop/modal-results.png
  - 无结果: /Users/Leo/Desktop/modal-noresult.png
```

AI 会自动用 `get_metadata` 枚举该页面下所有状态的 Frame，逐一对比。

---

### 如何找到组件各状态的 Node ID

**方法一：AI 自动枚举（推荐）**

只提供页面级 node-id，AI 会调用 `get_metadata` 扫描页面内所有 Frame，
通过名称关键词（如 `search`、`modal`、`弹窗`）自动定位各状态节点。

**方法二：Figma 手动复制**

在 Figma 中选中目标 Frame → 右键 → `Copy link` → 从 URL 取 `node-id` 参数（`-` 转 `:`）。

---

### 已验收模块 Node ID 记录

| 模块 | 状态 | Node ID | Figma 链接 |
| --- | --- | --- | --- |
| Search or Ask AI | 页面（含所有状态） | `1577:632` | [打开](https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=1577-632) |
| Search or Ask AI | Header 按钮 | `1771:1020` | [打开](https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=1771-1020) |
| Search or Ask AI | 弹窗 — 空态 | `1615:39127` | [打开](https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=1615-39127) |
| Search or Ask AI | 弹窗 — 有结果 | `1615:44625` | [打开](https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=1615-44625) |
| Search or Ask AI | 弹窗 — 无结果 | `1753:884` | [打开](https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=1753-884) |
| Search or Ask AI | 搜索结果页 | `1622:67133` | [打开](https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=1622-67133) |

---

### 验收报告说明

报告生成在桌面：`~/Desktop/tron-ui-acceptance-[YYYYMMDD-HHmm].html`，双击用浏览器打开。

**报告结构（按区域分组）：**

| 区域 | 内容 |
| --- | --- |
| 执行摘要 | 总体结论（Pass / Needs Work / Fail）+ 各区域 P0/P1/P2 汇总 |
| 各区域对比 | 每个区域/状态独立一个 Section，左侧设计稿定位链接，右侧实现截图（base64 内嵌） |
| 问题详情表 | ID / 问题描述 / 设计稿值 / 实现值 / 级别 / 修复建议 |
| 人工验证清单 | hover、blur、响应式等无法截图验证的项目，带复选框 |

**左侧设计稿列格式：**
```
[节点名称]
Node ID: 1615:39127
↗ 在 Figma 中查看（可跳转定位）
```
左侧**不嵌入截图**，只放 Figma 定位链接，避免报告体积过大。

**修复建议格式：**
> 改为 `border-radius: 100px`（当前为 `8px`）

---

### 常见问题

**Q：Figma node-id 去哪里找？**
提供页面级 URL，AI 会自动用 `get_metadata` 扫描页面内所有 Frame 名称，定位目标组件。或在 Figma 中选中 Frame → 右键 → Copy link，从 `node-id=` 参数获取（`-` 转 `:`）。

**Q：只想验收某个功能，不想全页验收怎么办？**
在输入时补充 `验收范围: 只验收 [组件名]`，AI 会只扫描和对比该范围内的节点。

**Q：弹窗有多个状态，要提供几张截图？**
每个状态提供一张截图，AI 会逐状态对比。标注状态名（空态/有结果/无结果）便于 AI 匹配对应设计稿 Frame。

**Q：没有测试环境 URL 怎么办？**
仅用截图也可以完成验收，CSS 数值通过视觉估算，精度略低。

**Q：报告打开是空白？**
截图以 base64 内嵌，文件较大（1–3 MB），用 Chrome 或 Safari 打开，避免用文本编辑器。

---

完整验收流程技术细节见：`~/.claude/skills/ui-acceptance/SKILL.md`
