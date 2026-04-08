# USDD HTML Prototype Guide

根据 PRD 生成 USDD HTML 原型页面的规范。两个站点：**usdd.io**（USDD 官网）· **app.usdd.io**（USDD APP）

> Sites: [usdd.io](https://usdd.io) · [app.usdd.io](https://app.usdd.io)
> Last updated: 2026-04-08

---

## 0. TL;DR

**输入**：一份 PRD（含页面目标、内容、数据字段）
**输出**：单文件 HTML 原型（样式内联在 `<style>`，所有第三方库走 CDN）。若 PRD 同时涉及两个站点，分别生成两份独立 HTML。
**核心**：判断站点（可能多个） → 复制对应模板骨架 → 按内容映射表选区块 → 填数据 → 跑自检清单

---

## 1. 工作流

按以下顺序生成页面，不要跳步。

### 1.1 判断站点（可能命中多个）

**通过 PRD 文档内容判断**，不要只看标题。逐条扫描 PRD 中的页面、章节、需求项，按以下信号归类到对应站点。**只要命中任一信号即归入该站点**；若两个站点都命中，则两个站点都要生成（见 §1.2）。


| 站点                   | PRD 中的判断信号                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **usdd.io**（官网）      | 路径 `usdd.io/...`；面向潜在用户的展示页；无需连接钱包；内容类型为品牌介绍、数据仪表盘、Treasury 报表、新闻、FAQ、Smart Allocator、Proof of Reserve；目标是"了解、阅读、查看"而非"操作"      |
| **app.usdd.io**（APP） | 路径 `app.usdd.io/...` 或 `/tron/` `/eth/` `/bsc/`；需要连接钱包；涉及链选择；功能为 Vault / PSM / Earn / Migrate；存在金额输入 + 确认/签名流程；面向已连接钱包的 DeFi 用户 |


**判断步骤：**

1. 通读 PRD，列出所有页面/需求项
2. 对每一项打标签：`usdd.io` / `app.usdd.io` / 两者都有
3. 汇总站点清单 → 决定生成 1 份还是 2 份 HTML

### 1.2 复制模板骨架（按命中站点数生成）

- **仅命中 usdd.io** → 生成 1 份 HTML，使用 §6.1 官网模板
- **仅命中 app.usdd.io** → 生成 1 份 HTML，使用 §6.2 APP 模板
- **两个站点都命中** → 必须生成 **2 份独立 HTML 文件**，分别使用对应模板。**禁止把官网内容和 APP 内容塞进同一个文件**，因为它们的 `:root` 背景色、Header 结构、用户身份假设都不同。建议命名 `usdd-io-[页面名].html` 与 `app-usdd-io-[页面名].html`，并在回复开头列出文件清单。

**通用规则**：从 §6 复制完整模板骨架。USDD APP 默认不生成左侧 Sidebar，除非 PRD 明确要求后台式管理布局。

### 1.3 解析 PRD 内容 → 查 §4 内容映射表

把 PRD 的每一段内容归类到映射表中的"内容类型"，对应到具体区块组件。**先列出区块清单再写代码**。

### 1.4 填充数据

按 §7 数据格式规范统一金额、百分比、地址、时间等字段格式。占位符用 `[xxx]`。

### 1.5 应用响应式规则

按 §3.5 断点规则处理容器宽度，按 §4 末尾的塌缩规则处理 grid 列数。

### 1.6 跑自检清单（§9）

生成完成后逐项核对，未通过则修正。

---

## 2. 站点概览

### 2.1 usdd.io — USDD 官网

受众：潜在用户、开发者、社区。无需连接钱包，阅读为主。


| 路径          | 页面              | 核心内容                                                      |
| ----------- | --------------- | --------------------------------------------------------- |
| `/`         | 首页              | 品牌指标 · APY 历史图表 · 收益模拟器 · 代币介绍（USDD / sUSDD / JST）· 合作交易所 |
| `/data`     | Data            | 链上数据仪表盘，按链切 Tab（Overview / Tron / ETH / BSC）              |
| `/sa`       | Smart Allocator | 资产配置透明度，含 Proof of Reserve 明细                             |
| `/treasury` | Treasury        | 协议季度财务报表与 JST 回购销毁记录                                      |
| `/news`     | News            | 新闻公告列表，支持分类筛选                                             |
| `/faq`      | FAQ             | 常见问题解答                                                    |


### 2.2 app.usdd.io — USDD APP

受众：已连接钱包的 DeFi 用户。所有操作需钱包，按链分路由（`/tron/` · `/eth/` · `/bsc/`）。


|                                 | Tron | ETH | BSC |
| ------------------------------- | ---- | --- | --- |
| **Vault** 超额抵押铸造 USDD           | ✅    | ❌   | ❌   |
| **PSM** USDD ↔ USDT/USDC 1:1 兑换 | ✅    | ✅   | ✅   |
| **Earn** 质押 USDD 赚收益            | ✅    | ✅   | ✅   |
| **Migrate** USDDOLD → USDD 迁移   | ✅    | ❌   | ❌   |


---

## 3. 设计 Token

### 3.1 颜色系统

```
品牌色
  主色       #216C58    按钮填充、主操作
  hover      #2A8C6C    按钮悬浮
  浅色强调   #5FC693    文字高亮、次级强调
  高亮       #81DEB0    icon、文字标注
  选中背景   rgba(33,108,88,0.15)

背景层级（从深到浅）
  官网底色   #0C0C0E    bg-page
  APP 底色   #080B0E    bg-page-app
  区块背景   #141615    bg-section
  卡片背景   #181A1C    bg-card
  APP 卡片   #131416    bg-card-app
  输入/弹窗  #212426    bg-elevated

文字透明度
  主要文字   rgba(255,255,255,1.00)
  正文       rgba(255,255,255,0.80)
  次要信息   rgba(255,255,255,0.60)
  辅助信息   rgba(255,255,255,0.40)
  禁用/占位  rgba(255,255,255,0.20)

边框透明度
  强边框     rgba(255,255,255,0.25)
  默认边框   rgba(255,255,255,0.15)
  弱边框     rgba(255,255,255,0.08)

功能色
  成功绿     #448F6A
  警告橙     #FF8F0B
  危险红     #D73133
  信息青     #0D9488
```

**强制规则**：页面业务样式中的颜色必须使用 CSS 变量（如 `var(--brand-default)`），禁止硬编码颜色，禁止白色背景。文档中的演示代码若出现字面色值，仅用于说明色值映射关系，落地页面时仍需改写为变量。

**示例变量名约定**：后文代码片段默认引用以下变量名；若你在模板中使用别名，需保证语义一致。

```css
--brand-default
--brand-hover
--brand-light
--danger-default
--text-primary
--text-secondary
--text-tertiary
--text-disabled
--border-strong
--border-default
--border-weak
--button-primary-disabled-bg
--button-primary-disabled-text
--button-secondary-bg
--button-secondary-disabled-bg
--button-secondary-disabled-border
--button-danger-hover-bg
--button-ghost-hover-bg
```

### 3.2 字体规范

字体：**Inter**（从 Google Fonts 引入）

```
heading-1   56px / 600 / lh 78px    大标题 Hero
heading-2   48px / 600 / lh 68px    页面主标题
heading-3   40px / 600 / lh 56px    区块标题
heading-4   32px / 600 / lh 46px    卡片标题
heading-5   24px / 600 / lh 34px    小节标题
heading-6   20px / 600 / lh 28px    组件标题
body-md     16px / 400 / lh 22px    正文
body-sm     14px / 400 / lh 20px    次要正文、说明
caption     12px / 400 / lh 18px    辅助信息、时间戳
```

### 3.3 间距规范

基础单位 4px，所有间距必须是 4 的倍数。

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80 (px)
```

### 3.4 圆角规范

嵌套原则：父 `radius-xl` → 子 `radius-lg` → 孙 `radius-md`。

```
radius-xs    4px     Badge、Tooltip
radius-sm    6px     Tag、小型元素
radius-md    8px     Button(md)、Input(sm)、卡片孙级
radius-lg    16px    Input(lg)、卡片子级、Dropdown
radius-xl    24px    卡片父级、Modal、最外层容器
radius-full  999px   特殊 Pill 元素、头像（按钮禁用）
```

### 3.5 断点与容器

```
Large Desktop  ≥ 1472px      容器 width: 1440px
Desktop        1200~1472px   容器 width: 1200px
Pad            767~1199px    容器 width: auto，padding 0 20px
Mobile         < 767px       容器 width: auto，padding 0 20px
```

Header 高度：80px（两站一致）。

### 3.6 动效时长

```
hover / 颜色过渡     150ms ease
expand / modal       240ms cubic-bezier(.2,.8,.2,1)
page-enter           320ms ease-out
```

---

## 4. 内容映射表（PRD → 区块）

> 这是 PRD-to-HTML 的核心。先用此表把 PRD 拆成区块清单，再写代码。

### 4.1 内容类型 → 区块组件


| PRD 中出现的内容类型        | 对应区块                             | 站点  |
| ------------------- | -------------------------------- | --- |
| 品牌主张 / 产品介绍         | Hero（带数据卡行）                      | 官网  |
| 数据指标罗列（≥3 项）        | KPI Grid（4 列）                    | 两站  |
| 功能/特性介绍（2~4 项）      | Feature Card Grid（2 列大卡 / 3 列中卡） | 官网  |
| 步骤流程                | Step List（带序号圆点）                 | 两站  |
| 对比说明                | 双栏对照 / 对比表格                      | 两站  |
| 引导转化                | CTA Block（渐变背景 + 双按钮）            | 官网  |
| 操作类（输入 + 确认）        | 左主右操作面板（Operation Layout）        | APP |
| 卡片网格选择类（如 Earn 池列表） | Pool Card Grid                   | APP |
| 数据明细                | Table + 筛选器                      | 两站  |
| 历史/事件流              | Timeline / History List          | APP |
| 规则说明 / 风险提示         | Info Card                        | APP |
| 公告 / 新闻列表           | Article List                     | 官网  |
| Q&A                 | FAQ Accordion                    | 官网  |


### 4.2 响应式塌缩规则


| 桌面端           | Pad（≤1199） | Mobile（<767） |
| ------------- | ---------- | ------------ |
| 4 列 grid      | 2 列        | 1 列          |
| 3 列 grid      | 2 列        | 1 列          |
| 2 列 grid      | 2 列        | 1 列          |
| 左主 + 右操作面板    | 上下堆叠（主在上）  | 上下堆叠         |
| Header 横向 nav | 折叠为汉堡      | 折叠为汉堡        |


---

## 5. 组件库

> 每个组件至少包含：默认态 HTML 片段 + 五态参考（default / hover / loading / disabled / error/empty，按适用补全）。
> 当前为目录占位，内容后续补充。

### 5.1 基础组件（Atoms）

- **Button** — 见 §5.1.1

> 除 `Button` 外，其余组件库内容后续由你补充。

#### 5.1.1 Button

> Source: [Figma — Button](https://www.figma.com/design/R2TQ0Ve55k6UHh4K3sBqv7/USDD-Design-System?node-id=8-8)
> **4 Types · 4 Sizes · 5 States · 3 Icon Layouts**
> 规则：`Padding = Height ÷ 2`；按钮禁用 `radius-full`；Icon Only 宽高相等。
> 以下 HTML 片段已改为 CSS 变量写法，可直接作为页面原型参考。

**类型（Type）**


| 类型        | 用途                      |
| --------- | ----------------------- |
| Primary   | 主操作按钮，页面唯一主 CTA         |
| Secondary | 次要操作，与 Primary 并列时使用    |
| Danger    | 危险 / 破坏性操作（删除、撤销、清空）    |
| Ghost     | 轻量内联操作（表格行、卡片角、Toolbar） |


**尺寸（Size）**


| 尺寸     | Height | Padding X | Radius | Font | Weight         | Icon | Gap          |
| ------ | ------ | --------- | ------ | ---- | -------------- | ---- | ------------ |
| Large  | 64     | 32        | 12     | 20   | Bold (700)     | 20   | 8            |
| Medium | 48     | 24        | 8      | 16   | SemiBold (600) | 16   | 8（loading 7） |
| Small  | 40     | 20        | 6      | 14   | SemiBold (600) | 16   | 6            |
| Mini   | 32     | 16        | 4      | 14   | Regular (400)  | 14   | 6（loading 5） |


**状态（State）色值表**


| Type             | Default                  | Hover                    | Active                   | Disabled                 | Loading                  |
| ---------------- | ------------------------ | ------------------------ | ------------------------ | ------------------------ | ------------------------ |
| **Primary** bg   | `#216C58`                | `#2A8C6C`                | `#1C5D4C`                | `rgba(33,108,88,0.4)`    | `#216C58`                |
| Primary text     | `#FFF`                   | `#FFF`                   | `#FFF`                   | `rgba(255,255,255,0.4)`  | `rgba(255,255,255,0.8)`  |
| **Secondary** bg | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.05)` | `rgba(255,255,255,0.08)` |
| Secondary border | `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.25)` | `rgba(255,255,255,0.15)` | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.15)` |
| Secondary text   | `rgba(255,255,255,0.8)`  | `rgba(255,255,255,0.8)`  | `rgba(255,255,255,0.6)`  | `rgba(255,255,255,0.2)`  | `rgba(255,255,255,0.6)`  |
| **Danger** bg    | `#D73133`                | `#EA3A3C`                | `#C52729`                | `rgba(215,49,51,0.4)`    | `#D73133`                |
| Danger text      | `#FFF`                   | `#FFF`                   | `#FFF`                   | `rgba(255,255,255,0.4)`  | `rgba(255,255,255,0.8)`  |
| **Ghost** bg     | `transparent`            | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.08)` | `transparent`            | `rgba(255,255,255,0.04)` |
| Ghost text       | `rgba(255,255,255,0.6)`  | `rgba(255,255,255,0.8)`  | `rgba(255,255,255,0.6)`  | `rgba(255,255,255,0.2)`  | `rgba(255,255,255,0.6)`  |


**图标布局（Icon Layout）**

- **Icon + Text**：图标在文字左侧（常用于 `+ Add`、`↓ Download`）
- **Text + Icon**：图标在文字右侧（常用于 `Next ›`、`Learn more →`）
- **Icon Only**：宽高相等（Large 64×64 / Medium 48×48 / Small 40×40 / Mini 32×32），无 padding

**HTML 代码片段**

```html
<!-- ===== Primary ===== -->
<!-- Primary / Large / Default -->
<button style="height:64px;padding:0 32px;background:var(--brand-default);color:var(--text-primary);border:none;border-radius:12px;font:700 20px/1 Inter,sans-serif;cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Button</button>

<!-- Primary / Medium / Default -->
<button style="height:48px;padding:0 24px;background:var(--brand-default);color:var(--text-primary);border:none;border-radius:8px;font:600 16px/1 Inter,sans-serif;cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Button</button>

<!-- Primary / Small / Default -->
<button style="height:40px;padding:0 20px;background:var(--brand-default);color:var(--text-primary);border:none;border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Button</button>

<!-- Primary / Mini / Default -->
<button style="height:32px;padding:0 16px;background:var(--brand-default);color:var(--text-primary);border:none;border-radius:4px;font:400 14px/1 Inter,sans-serif;cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Button</button>

<!-- Primary / Small / Disabled -->
<button disabled style="height:40px;padding:0 20px;background:var(--button-primary-disabled-bg);color:var(--button-primary-disabled-text);border:none;border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:not-allowed">Button</button>

<!-- Primary / Small / Loading -->
<button style="height:40px;padding:0 20px;background:var(--brand-default);color:var(--text-secondary);border:none;border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
  <span style="display:inline-block;width:16px;height:16px;border:2px solid var(--border-weak);border-top-color:var(--text-primary);border-radius:50%;animation:spin 1s linear infinite"></span>
  Loading
</button>
<style>@keyframes spin{to{transform:rotate(360deg)}}</style>

<!-- ===== Secondary ===== -->
<!-- Secondary / Small / Default -->
<button style="height:40px;padding:0 20px;background:var(--button-secondary-bg);color:var(--text-secondary);border:1px solid var(--border-default);border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:pointer;transition:border-color .15s" onmouseover="this.style.borderColor='var(--border-strong)'" onmouseout="this.style.borderColor='var(--border-default)'">Button</button>

<!-- Secondary / Small / Disabled -->
<button disabled style="height:40px;padding:0 20px;background:var(--button-secondary-disabled-bg);color:var(--text-disabled);border:1px solid var(--button-secondary-disabled-border);border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:not-allowed">Button</button>

<!-- ===== Danger ===== -->
<!-- Danger / Small / Default -->
<button style="height:40px;padding:0 20px;background:var(--danger-default);color:var(--text-primary);border:none;border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--button-danger-hover-bg)'" onmouseout="this.style.background='var(--danger-default)'">Button</button>

<!-- ===== Ghost ===== -->
<!-- Ghost / Small / Default -->
<button style="height:40px;padding:0 20px;background:transparent;color:var(--text-tertiary);border:none;border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:pointer;transition:background .15s,color .15s" onmouseover="this.style.background='var(--button-ghost-hover-bg)';this.style.color='var(--text-secondary)'" onmouseout="this.style.background='transparent';this.style.color='var(--text-tertiary)'">Button</button>

<!-- ===== Icon Layouts ===== -->
<!-- Icon + Text -->
<button style="height:40px;padding:0 20px;background:var(--brand-default);color:var(--text-primary);border:none;border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
  Button
</button>

<!-- Text + Icon -->
<button style="height:40px;padding:0 20px;background:var(--brand-default);color:var(--text-primary);border:none;border-radius:6px;font:600 14px/1 Inter,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
  Button
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
</button>

<!-- Icon Only -->
<button aria-label="Settings" style="width:40px;height:40px;padding:0;background:var(--brand-default);color:var(--text-primary);border:none;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;justify-content:center">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
</button>
```

> 上述代码省略了 Medium / Mini 各类型的完整片段以保持简洁。其他尺寸按“尺寸表”调整 `height / padding / border-radius / font` 即可，色值与同类型 Small 完全一致。

---

## 6. 页面模板

> 完整 HTML 骨架，复制即用。当前为目录占位，模板代码后续补充。

### 6.1 usdd.io — USDD 官网模板

- 完整单文件 HTML（含 `:root` 变量 / Header / 内容区 / Footer）
- 当前仅保留模板结构要求；实际骨架代码后续补充

### 6.2 app.usdd.io — USDD APP 模板

- 完整单文件 HTML（含 `:root` 变量 / Header / 主体 / Footer）
- 当前仅保留模板结构要求；实际骨架代码后续补充

---

## 7. 数据格式与文案规范

DeFi 高频字段必须按以下格式展示，禁止每次生成时随意发挥。

```
金额（大额）   $1.55B / $422.71M / $12.34K
金额（精确）   $1,234.56
百分比         12.34%（两位小数）
APY            4.25% APY
地址           0x1234...5678（前 4 后 4，跨链统一）
TxHash         0x1234...5678
时间（绝对）   2026-04-07 14:30 UTC
时间（相对）   2 hours ago / 3 days ago
变化值（涨）   +2.34%   颜色 var(--success-default)
变化值（跌）   -1.20%   颜色 var(--danger-default)
链名           Tron / Ethereum / BSC（首字母大写）
代币符号       USDD / sUSDD / USDT / USDC / JST（全大写）
状态           Active / Pending / Failed / Completed
```

**文案语种**：默认英文，标题用 Title Case，正文用 Sentence case。

---

## 8. 反例清单（禁止做）

- ❌ 白色或浅色背景
- ❌ 页面业务样式中硬编码颜色（如 `#fff`、`#ccc`），必须用 CSS 变量
- ❌ 按钮使用 `radius-full`
- ❌ 圆角嵌套反向（子元素圆角 ≥ 父元素）
- ❌ 间距使用非 4 倍数值（如 5px、15px）
- ❌ 省略 `:root` 变量定义
- ❌ 在 USDD APP 默认生成左侧 Sidebar
- ❌ 数据格式不一致（同一页面 `$1.55B` 与 `1,550,000,000` 混用）
- ❌ 直接拼接 React/Vue 组件，原型必须是纯 HTML
- ❌ 使用未在 §6.1 / §6.2 模板中定义的字体

---

## 9. 自检 Checklist

生成完成后逐项核对，未通过则返回修正。

**结构**

- 站点判断正确，使用了对应模板结构
- `:root` 变量完整未省略
- Header 高度 80px，主体 `padding-top:80px`
- Footer 存在
- 单文件 HTML，所有样式在 `<style>` 内

**视觉**

- 没有白色背景
- 页面业务样式没有硬编码颜色（说明性示例代码除外）
- 圆角嵌套：父 xl → 子 lg → 孙 md
- 所有间距为 4 的倍数
- 按钮未使用 `radius-full`

**内容**

- 已对照 §4 内容映射表选用区块
- 数据字段符合 §7 格式规范
- 文案语种统一

**响应式**

- 容器三档宽度齐全（1440 / 1200 / auto）
- grid 列数按 §4.2 塌缩
- Pad/Mobile 下 padding 0 20px

**状态（按 PRD 要求）**

- 必要的 empty / loading / error 态已覆盖

---

## 10. 技术依赖（CDN）

两个站点通过自托管 CDN（`prod-app-cdn-new.usdd.io/cdn/`）加载所有第三方库与图标资源。

### 10.1 可用库清单


| 库                 | 版本      | 用途         | 是否常用于原型        |
| ----------------- | ------- | ---------- | -------------- |
| **ECharts**       | 5.6.0   | 图表 / 数据可视化 | ✅ 数据页必用        |
| **Ant Design**    | 5.21.6  | 设计参考 / 对照  | 不直接用于纯 HTML 原型 |
| **Day.js**        | 1.11.10 | 日期格式化      | 按需使用           |
| **Remix Icon**    | 4.x     | 图标字体 / SVG  | ✅ 统一图标来源      |
| React + React DOM | 18.3.1  | 框架（SPA）    | ❌ 原型用纯 HTML    |
| TronWeb           | 6.0.3   | Tron 链交互   | ❌ 原型不需要        |
| Ethers.js         | 6.14.4  | EVM 链交互    | ❌ 原型不需要        |


### 10.2 CDN 资源引用

```html
<!-- ECharts（数据可视化图表，数据页必引） -->
<script src="https://prod-app-cdn-new.usdd.io/cdn/echarts.min_5.6.0.js"></script>

<!-- Day.js（日期格式化） -->
<script src="https://prod-app-cdn-new.usdd.io/cdn/dayjs.min_1.11.10.js"></script>

<!-- Remix Icon（统一图标来源） -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css">
```

### 10.3 图标使用规范

- 原型中的所有线性 / 填充图标优先使用 Remix Icon
- 图标 class 统一使用 `ri-` 前缀，例如 `ri-arrow-right-line`、`ri-wallet-3-line`
- 需要与文本基线对齐时，优先用 `font-size: 1em` 和 `vertical-align: -0.125em`
- 除非 PRD 明确要求其他图标体系，否则不要混用 Ant Design Icons、Font Awesome 等其他来源

### 10.4 ECharts 深色主题基础用法

```html
<div id="chart" style="width:100%;height:280px;border-radius:var(--radius-lg)"></div>
<script src="https://prod-app-cdn-new.usdd.io/cdn/echarts.min_5.6.0.js"></script>
<script>
  const css = getComputedStyle(document.documentElement);
  const brandLight = css.getPropertyValue('--brand-light').trim() || '#5FC693';
  const chart = echarts.init(document.getElementById('chart'), null, { backgroundColor: 'transparent' });
  chart.setOption({
    backgroundColor: 'transparent',
    grid: { top: 16, right: 16, bottom: 32, left: 48 },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
      axisLabel: { color: 'rgba(255,255,255,0.40)', fontSize: 12 },
      splitLine: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(255,255,255,0.40)', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.06)' } }
    },
    series: [{
      type: 'line',
      data: [120, 200, 150, 220, 180, 260],
      smooth: true,
      lineStyle: { color: brandLight, width: 2 },
      itemStyle: { color: brandLight },
      areaStyle: {
        color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(95,198,147,0.20)' },
            { offset: 1, color: 'rgba(95,198,147,0.00)' }
          ]
        }
      }
    }]
  });
</script>
```


