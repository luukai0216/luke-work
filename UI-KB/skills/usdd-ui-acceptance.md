---
name: usdd-ui-acceptance
description: USDD UI 验收测试 - 对比 Figma 设计稿与实现页面，结合 USDD 设计规范，覆盖布局间距、颜色字体、响应式、交互状态四个维度，输出 HTML 报告
source: ~/.claude/skills/ui-acceptance/SKILL.md
---
# USDD UI 验收测试

基于通用 `ui-acceptance` skill，补充 USDD 专属上下文。

---

## USDD 项目上下文

### Figma 文件

| 字段 | 值 |
| --- | --- |
| Design System | `R2TQ0Ve55k6UHh4K3sBqv7` — [打开](https://www.figma.com/design/R2TQ0Ve55k6UHh4K3sBqv7/USDD-Design-System) |
| Web 设计稿 | `ZsstNkZcZL0CJ4TgA7ErvP` — [打开](https://www.figma.com/design/ZsstNkZcZL0CJ4TgA7ErvP/USDD_Web) |
| App 设计稿 | `aRW7JHtGfisbnpwPeNisfi` — [打开](https://www.figma.com/design/aRW7JHtGfisbnpwPeNisfi/USDD_APP) |

### 设计规范参考

执行验收前，**必须先读取**以下文件：

| 端 | 文件 | 用途 |
| --- | --- | --- |
| Web | `../projects/USDD/web/design-spec.md` | Token、字体、间距、圆角、阴影完整规范 |
| Web | `../projects/USDD/web/component-catalog.md` | Web 组件规格（Header/Footer/Button 等） |
| App | `../projects/USDD/app/design-spec.md` | Token、字体、间距、圆角、阴影完整规范 |
| App | `../projects/USDD/app/component-catalog.md` | App 组件规格（Header/Input/Card 等） |

---

## USDD 专属验收规则

在通用四维度基础上，额外检查以下 USDD 特有规范：

### 色彩

- 页面背景必须为 `#0C0C0E`，不可出现白色或浅灰背景
- 品牌绿主色精确为 `#216C58`（Hover `#2A8C6C`），不接受近似色
- Primary 按钮背景必须为 `#216C58`，文字必须为 `#FFFFFF`
- Danger 按钮背景必须为 `#D73133`
- 成功/正向数据颜色必须为 `#448F6A`，危险/负向必须为 `#D73133`
- 警告状态颜色必须为 `#FF8F0B`
- 卡片背景必须为 `#181A1C`，不可使用其他深色近似值

### 字体

- 全站统一使用 **Inter** 字体
- 不接受 Roboto、SF Pro 等替代字体
- 标题字重必须为 Semi Bold（600）
- 正文字重必须为 Regular（400）
- 标签/按钮字重必须为 Semi Bold（600）
- 最小字号不低于 12px（Caption 级）

### 按钮

- 所有按钮圆角必须为 `8px`（`radius-md`），非 4px / 12px / 50px 等其他值
- Large 按钮高度必须为 64px
- Medium 按钮高度必须为 48px
- Small 按钮高度必须为 40px
- Mini 按钮高度必须为 32px
- Disabled 态使用 `rgba(255,255,255,0.2)` 降低不透明度

### 卡片

- 卡片背景必须为 `#181A1C`
- 卡片边框必须为 `1px solid rgba(255,255,255,0.08)`（`border-subtle`）
- 卡片圆角必须为 `16px`（`radius-lg`）
- 卡片内边距必须为 `24px`（`space-5`）
- Hover 时边框变为 `rgba(255,255,255,0.15)`，轻阴影 `shadow-sm`

### Input 输入框

- 高度 48px（Medium）/ 40px（Small）
- 背景必须为 `#212426`（`bg-elevated`）
- 边框默认 `1px solid rgba(255,255,255,0.15)`，Focus 时变为 `2px solid rgba(255,255,255,0.25)`
- 圆角 `8px`

### Header

**Web（官网首页）：**
- 高度必须为 80px
- 桌面端参考组件：`Home-nav/dark`（Node `191:945`）

**App（DeFi 应用）：**
- 高度含子菜单展开区约 220px
- 桌面端参考组件：`App-nav/Dark`（Node `191:507`）

### 响应式断点

| 断点 | 宽度 | 说明 |
| --- | --- | --- |
| Desktop | 1440px | 主设计基准 |
| Mobile | 390px | 移动端基准 |

### 间距

- 所有间距必须使用 space-1 ～ space-9 系列（4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80px）
- 不接受 7px / 10px / 15px 等非规范值

### 阴影

- 卡片轻阴影：`0 1px 8px rgba(0,0,0,0.32)`
- 浮层阴影：`0 4px 20px rgba(0,0,0,0.48)`
- Modal 阴影：`0 8px 40px rgba(0,0,0,0.64)`

---

## 严重程度定义（USDD 版）

| 级别 | 定义 | 示例 |
| --- | --- | --- |
| **P0** | 品牌一致性严重违反，或功能性错误 | 按钮用了蓝色、品牌绿不准确、卡片背景不对 |
| **P1** | 可察觉的视觉偏差，影响整体一致性 | 圆角偏差、间距非规范值、字重错误 |
| **P2** | 细微偏差，不影响整体效果 | 透明度轻微不符、阴影强度略偏 |
| **Pass** | 与设计稿及规范一致 | — |

---

## 使用方式

### 场景一：最简验收（仅 Figma 对比）

```
/usdd-ui-acceptance

端: web  （或 app）
Figma URL: https://www.figma.com/design/ZsstNkZcZL0CJ4TgA7ErvP/USDD_Web?node-id=3-2
```

### 场景二：标准验收（Figma + 实现截图）

```
/usdd-ui-acceptance

端: app
Figma URL: https://www.figma.com/design/aRW7JHtGfisbnpwPeNisfi/USDD_APP?node-id=6-248490
实现截图: /Users/luke/Desktop/vault-screenshot.png
```

### 场景三：精准验收（Figma + 截图 + 页面 URL）

```
/usdd-ui-acceptance

端: web
Figma URL: https://www.figma.com/design/ZsstNkZcZL0CJ4TgA7ErvP/USDD_Web?node-id=3-2
实现截图: /Users/luke/Desktop/home-screenshot.png
测试环境 URL: https://usdd.io
```

---

## 报告输出

```
~/Desktop/usdd-ui-acceptance-[YYYYMMDD-HHmm].html
```

报告标题：**USDD UI 验收报告 — {端} · {页面/模块名}**

---

完整验收流程技术细节见：`~/.claude/skills/ui-acceptance/SKILL.md`
