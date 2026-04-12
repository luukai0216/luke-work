# USDD Grayscale Prototype Guide

基于 PRD 生成**单文件灰度原型 HTML** 的完整规范。两个站点：**usdd.io**（官网）· **app.usdd.io**（APP）

> Last updated: 2026-04-09

---

## 1. 生成流程

1. 读取 PRD，判断站点
2. 复制 §4 骨架，填入 `:root` 变量
3. 按 §5 映射表拆出区块清单，逐块写 HTML
4. 数据字段按 §6 格式填写，占位符用 `[xxx]`
5. 对照 §8 自检清单逐项核对


| 站点          | PRD 信号                                    |
| ----------- | ----------------------------------------- |
| usdd.io     | 展示页、品牌介绍、数据仪表盘、FAQ、无需连接钱包                 |
| app.usdd.io | 连接钱包、链选择、Vault/PSM/Earn/Migrate、金额输入+确认流程 |


两个站点都命中 → 生成 2 份独立 HTML，命名 `usdd-io-[页面].html` / `app-usdd-io-[页面].html`。APP 默认不生成左侧 Sidebar。

---

## 2. CSS 变量

所有颜色必须使用变量，禁止硬编码色值。

本版附加条件：

- 页面背景保持单一底色，默认使用 `--bg-page`，不通过 section 切换背景做分割
- 卡片默认不加描边，仅在状态区分、输入框、表格、折叠项等明确需要边界时使用边框

```css
:root {
  --bg-page:      #0F0F0F;
  --bg-section:   #161616;
  --bg-card:      #1E1E1E;
  --bg-elevated:  #252525;

  --text-primary:   #EBEBEB;
  --text-secondary: #999999;
  --text-tertiary:  #555555;
  --text-disabled:  #383838;

  --border-strong:  #4A4A4A;
  --border-default: #2E2E2E;
  --border-weak:    #1E1E1E;

  --btn-primary-bg:   #EBEBEB;
  --btn-primary-text: #0F0F0F;
  --btn-secondary-bg: #1E1E1E;
  --btn-danger-bg:    #555555;

  --r-xs: 4px;
  --r-sm: 6px;
  --r-md: 8px;
  --r-lg: 16px;
  --r-xl: 24px;
}
```

---

## 3. 设计 Token

**字体：Inter**（Google Fonts）


| Token     | Size / Weight / Line-height |
| --------- | --------------------------- |
| heading-1 | 56px / 600 / 78px           |
| heading-2 | 48px / 600 / 68px           |
| heading-3 | 40px / 600 / 56px           |
| heading-4 | 32px / 600 / 46px           |
| heading-5 | 24px / 600 / 34px           |
| heading-6 | 20px / 600 / 28px           |
| body-md   | 16px / 400 / 22px           |
| body-sm   | 14px / 400 / 20px           |
| caption   | 12px / 400 / 18px           |


**间距：** 基础单位 4px，所有间距必须是 4 的倍数：`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 80`

**圆角嵌套：** 父 `--r-xl` → 子 `--r-lg` → 孙 `--r-md`


| Token  | 值    | 用途                      |
| ------ | ---- | ----------------------- |
| --r-xs | 4px  | Badge、Tooltip           |
| --r-sm | 6px  | Tag、小型元素                |
| --r-md | 8px  | Button、Input(sm)、卡片孙级   |
| --r-lg | 16px | Input(lg)、卡片子级、Dropdown |
| --r-xl | 24px | 卡片父级、Modal、最外层容器        |


**断点与容器**

```
≥ 1472px    容器 width: 1440px; padding: 0 48px
1200~1471px 容器 width: 1200px; padding: 0 48px
< 1200px    容器 width: auto;   padding: 0 20px
```

Header 高度：80px，主体 `padding-top: 80px`。

**Grid 响应式塌缩**


| 桌面       | Pad ≤1199 | Mobile <767 |
| -------- | --------- | ----------- |
| 4列       | 2列        | 1列          |
| 3列       | 2列        | 1列          |
| 2列       | 2列        | 1列          |
| 左主+右操作面板 | 上下堆叠      | 上下堆叠        |


**图标：Remix Icon**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css">
```

- class 统一 `ri-` 前缀，颜色继承父元素，不硬编码
- 与文字对齐：`font-size:1em; vertical-align:-0.125em`
- Remix Icon 未收录的场景用内联 SVG（`fill="currentColor"`）
- 禁止混用其他图标库

**Button 规格**

- 默认使用高度 `40px` 的按钮，作为全站按钮基线规格
- 默认按钮对应 `.btn` / `.btn-sm`，常规操作、筛选、切换、次级 CTA 优先使用这一档
- `48px` 及以上仅用于需要明显强调的主 CTA、提交流程确认按钮，必须有明确层级理由

---

## 4. HTML 骨架

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>[页面名] — Prototype</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css">
  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    body{font:400 14px/1.5 Inter,-apple-system,sans-serif;background:var(--bg-page);color:var(--text-primary)}

    :root{
      --bg-page:#0F0F0F;--bg-section:#161616;--bg-card:#1E1E1E;--bg-elevated:#252525;
      --text-primary:#EBEBEB;--text-secondary:#999999;--text-tertiary:#555555;--text-disabled:#383838;
      --border-strong:#4A4A4A;--border-default:#2E2E2E;--border-weak:#1E1E1E;
      --btn-primary-bg:#EBEBEB;--btn-primary-text:#0F0F0F;--btn-secondary-bg:#1E1E1E;--btn-danger-bg:#555555;
      --r-xs:4px;--r-sm:6px;--r-md:8px;--r-lg:16px;--r-xl:24px;
    }

    .container{width:1440px;max-width:100%;margin:0 auto;padding:0 48px}
    @media(max-width:1471px){.container{width:1200px}}
    @media(max-width:1199px){.container{width:auto;padding:0 20px}}

    .header{position:fixed;top:0;left:0;right:0;height:80px;background:var(--bg-card);border-bottom:1px solid var(--border-default);display:flex;align-items:center;z-index:100}
    .header .container{display:flex;align-items:center;justify-content:space-between}

    .main{padding-top:80px;min-height:100vh}
    .section{padding:64px 0}
    .section-alt{background:transparent}

    .card{background:var(--bg-card);border:none;border-radius:var(--r-xl);padding:24px}

    .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
    .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
    .grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
    @media(max-width:1199px){.grid-4{grid-template-columns:repeat(2,1fr)}.grid-3{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:767px){.grid-4,.grid-3,.grid-2{grid-template-columns:1fr}}

    .btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:40px;padding:0 20px;border:none;cursor:pointer;font-size:14px;font-weight:600;border-radius:var(--r-md)}
    .btn-lg{height:64px;padding:0 32px;font-size:20px;border-radius:12px}
    .btn-md{height:48px;padding:0 24px;font-size:16px}
    .btn-sm{height:40px;padding:0 20px;font-size:14px}
    .btn-mini{height:32px;padding:0 16px;font-size:14px;font-weight:400}
    .btn-primary{background:var(--btn-primary-bg);color:var(--btn-primary-text)}
    .btn-secondary{background:var(--btn-secondary-bg);color:var(--text-secondary);border:1px solid var(--border-default)}
    .btn-ghost{background:transparent;color:var(--text-tertiary);border:none}
    .btn:disabled{opacity:.4;cursor:not-allowed}

    .input{width:100%;height:48px;padding:0 16px;background:var(--bg-elevated);border:1px solid var(--border-default);border-radius:var(--r-lg);font-size:14px;color:var(--text-primary);outline:none}
    .input:focus{border-color:var(--border-strong)}

    .kpi-label{font-size:12px;color:var(--text-tertiary);margin-bottom:4px}
    .kpi-value{font-size:24px;font-weight:600;color:var(--text-primary)}
    .kpi-sub{font-size:12px;color:var(--text-tertiary);margin-top:4px}

    .table{width:100%;border-collapse:collapse}
    .table th{font-size:12px;color:var(--text-tertiary);font-weight:400;padding:8px 12px;border-bottom:1px solid var(--border-weak);text-align:left}
    .table td{padding:12px;border-bottom:1px solid var(--border-weak);font-size:14px;color:var(--text-secondary)}
    .table tr:last-child td{border-bottom:none}

    .badge{display:inline-block;padding:2px 8px;border-radius:var(--r-xs);font-size:12px;border:1px solid var(--border-default);color:var(--text-tertiary)}
    .chart-ph{background:var(--bg-section);border:1px dashed var(--border-default);border-radius:var(--r-lg);display:flex;align-items:center;justify-content:center;color:var(--text-disabled);font-size:12px}
    .footer{padding:48px 0;border-top:1px solid var(--border-weak);color:var(--text-tertiary);font-size:12px}
  </style>
</head>
<body>

<header class="header">
  <div class="container">
    <span style="font-size:18px;font-weight:700">USDD</span>
    <nav style="display:flex;gap:24px;font-size:14px;color:var(--text-secondary)">
      <a href="#" style="color:inherit;text-decoration:none">[Nav]</a>
    </nav>
    <button class="btn btn-sm btn-primary">[CTA]</button>
  </div>
</header>

<main class="main">
  <!-- 按 §5 内容映射表插入区块 -->
</main>

<footer class="footer">
  <div class="container">© 2026 USDD</div>
</footer>

</body>
</html>
```

---

## 5. 内容映射表（PRD → 区块）


| PRD 内容类型        | 使用区块              | 站点  |
| --------------- | ----------------- | --- |
| 品牌主张 / 产品介绍     | Hero + KPI 数据行    | 官网  |
| 数据指标罗列（≥3项）     | KPI Grid          | 两站  |
| 功能 / 特性介绍（2~4项） | Feature Card Grid | 官网  |
| 操作类（输入 + 确认）    | Operation Layout  | APP |
| 池列表 / 卡片选择      | Pool Card Grid    | APP |
| 数据明细 / 历史记录     | Table + 筛选器       | 两站  |
| 图表 / 数据可视化      | 图表占位块             | 两站  |
| Q&A             | FAQ Accordion     | 官网  |
| 引导转化            | CTA Block         | 官网  |


### Hero

```html
<section class="section" style="padding:80px 0">
  <div class="container" style="text-align:center">
    <p style="font-size:12px;color:var(--text-tertiary);margin-bottom:12px;letter-spacing:.08em">TAGLINE</p>
    <h1 style="font-size:48px;font-weight:600;line-height:1.2;margin-bottom:16px">[主标题]</h1>
    <p style="font-size:16px;color:var(--text-secondary);max-width:560px;margin:0 auto 32px">[副标题]</p>
    <div style="display:flex;gap:12px;justify-content:center">
      <button class="btn btn-md btn-primary">[主 CTA]</button>
      <button class="btn btn-md btn-secondary">[次 CTA]</button>
    </div>
    <div class="grid-4" style="margin-top:64px">
      <div class="card" style="text-align:center"><div class="kpi-label">[指标]</div><div class="kpi-value">[值]</div></div>
      <div class="card" style="text-align:center"><div class="kpi-label">[指标]</div><div class="kpi-value">[值]</div></div>
      <div class="card" style="text-align:center"><div class="kpi-label">[指标]</div><div class="kpi-value">[值]</div></div>
      <div class="card" style="text-align:center"><div class="kpi-label">[指标]</div><div class="kpi-value">[值]</div></div>
    </div>
  </div>
</section>
```

### KPI Grid

```html
<section class="section section-alt">
  <div class="container">
    <h2 style="font-size:24px;font-weight:600;margin-bottom:24px">[标题]</h2>
    <div class="grid-4">
      <div class="card">
        <div class="kpi-label">[指标名]</div>
        <div class="kpi-value">[值]</div>
        <div class="kpi-sub">[说明]</div>
      </div>
    </div>
  </div>
</section>
```

### Feature Card Grid

```html
<section class="section">
  <div class="container">
    <h2 style="font-size:32px;font-weight:600;margin-bottom:32px">[标题]</h2>
    <div class="grid-3">
      <div class="card">
        <div style="width:40px;height:40px;background:var(--bg-section);border-radius:var(--r-md);display:flex;align-items:center;justify-content:center;margin-bottom:16px">
          <i class="ri-[icon]-line" style="font-size:18px;color:var(--text-secondary)"></i>
        </div>
        <h3 style="font-size:18px;font-weight:600;margin-bottom:8px">[特性标题]</h3>
        <p style="font-size:14px;color:var(--text-secondary)">[描述]</p>
      </div>
    </div>
  </div>
</section>
```

### Operation Layout（APP）

```html
<section class="section">
  <div class="container">
    <div class="grid-2" style="align-items:start">
      <div>
        <h2 style="font-size:24px;font-weight:600;margin-bottom:16px">[模块名]</h2>
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:24px">[说明]</p>
        <div class="grid-2" style="gap:12px">
          <div class="card"><div class="kpi-label">[指标]</div><div class="kpi-value">[值]</div></div>
          <div class="card"><div class="kpi-label">[指标]</div><div class="kpi-value">[值]</div></div>
        </div>
      </div>
      <div class="card">
        <div style="display:flex;gap:8px;margin-bottom:24px">
          <button class="btn btn-sm btn-primary">[Tab1]</button>
          <button class="btn btn-sm btn-ghost">[Tab2]</button>
        </div>
        <div style="margin-bottom:16px">
          <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px">[输入标签]</div>
          <input class="input" placeholder="0.00">
        </div>
        <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:16px">
          Balance: <span style="color:var(--text-secondary)">1,234.56 USDD</span>
        </div>
        <button class="btn btn-md btn-primary" style="width:100%">[确认]</button>
      </div>
    </div>
  </div>
</section>
```

### Table

```html
<section class="section">
  <div class="container">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <h2 style="font-size:20px;font-weight:600">[标题]</h2>
      <button class="btn btn-sm btn-secondary">[筛选]</button>
    </div>
    <div class="card" style="padding:0;overflow:hidden">
      <table class="table">
        <thead><tr><th>[列1]</th><th>[列2]</th><th>[列3]</th><th>Status</th></tr></thead>
        <tbody>
          <tr>
            <td>0x1234...5678</td>
            <td>$1,234.56</td>
            <td>2026-04-07 14:30 UTC</td>
            <td><span class="badge">Active</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>
```

### 图表占位

```html
<section class="section section-alt">
  <div class="container">
    <h2 style="font-size:20px;font-weight:600;margin-bottom:16px">[图表标题]</h2>
    <div class="card">
      <div class="chart-ph" style="height:240px">[Chart: 描述图表类型和数据]</div>
    </div>
  </div>
</section>
```

### FAQ Accordion

```html
<section class="section">
  <div class="container" style="max-width:720px">
    <h2 style="font-size:32px;font-weight:600;margin-bottom:32px">FAQ</h2>
    <div style="display:flex;flex-direction:column;gap:8px">
      <details style="background:var(--bg-card);border:1px solid var(--border-default);border-radius:var(--r-lg);padding:16px 20px">
        <summary style="font-size:15px;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between">
          [问题] <span style="color:var(--text-tertiary)">+</span>
        </summary>
        <p style="font-size:14px;color:var(--text-secondary);margin-top:12px">[答案]</p>
      </details>
    </div>
  </div>
</section>
```

### CTA Block

```html
<section class="section section-alt" style="padding:96px 0">
  <div class="container" style="text-align:center">
    <div class="card" style="max-width:640px;margin:0 auto;padding:48px">
      <h2 style="font-size:32px;font-weight:600;margin-bottom:12px">[标题]</h2>
      <p style="font-size:15px;color:var(--text-secondary);margin-bottom:32px">[说明]</p>
      <div style="display:flex;gap:12px;justify-content:center">
        <button class="btn btn-md btn-primary">[主 CTA]</button>
        <button class="btn btn-md btn-secondary">[次 CTA]</button>
      </div>
    </div>
  </div>
</section>
```

---

## 6. 数据格式规范

```
金额（大额）   $1.55B / $422.71M / $12.34K
金额（精确）   $1,234.56
百分比         12.34%
APY            4.25% APY
地址           0x1234...5678（前4后4）
时间（绝对）   2026-04-07 14:30 UTC
时间（相对）   2 hours ago
链名           Tron / Ethereum / BSC
代币符号       USDD / sUSDD / USDT / USDC / JST（全大写）
状态           Active / Pending / Failed / Completed
```

**状态的灰度表达**（不依赖颜色）


| 状态       | 写法                                                                       |
| -------- | ------------------------------------------------------------------------ |
| Active   | `<span class="badge">Active</span>`                                      |
| Pending  | `<span class="badge" style="border-style:dashed">Pending</span>`         |
| Failed   | `<span class="badge" style="text-decoration:line-through">Failed</span>` |
| Disabled | 对应元素加 `opacity:0.4`                                                      |
| Empty    | 虚线边框容器 + 文字「No data」                                                     |


---

## 6.5 版式 & 审美规则

生成前先分析内容，再选结构。以下规则优先于骨架模板的默认值。

**风格参考锚点：** Linear / Vercel / Stripe 的 dark mode 产品风格——克制、高对比、呼吸感强。

### 列数判断


| 同层级内容项数 | 选用布局             |
| ------- | ---------------- |
| ≤ 3 项   | `grid-2` 或居中单列   |
| 4～6 项   | `grid-3`         |
| ≥ 7 项   | `grid-4`，考虑分组拆多行 |


### 间距档位


| 场景                   | section padding |
| -------------------- | --------------- |
| 默认                   | `64px 0`        |
| 页面主要叙述区（标题+正文 > 2 行） | `80px 0`        |
| 全页唯一 CTA Block       | `96px 0`        |


### KPI 字号权重


| 场景                         | kpi-value 字号                     |
| -------------------------- | -------------------------------- |
| 多个 KPI 并列                  | 默认 `24px`                        |
| 一屏唯一核心数字（TVL、Total Supply） | `40px`                           |
| 次级说明数字（占比、增量）              | `18px` + `var(--text-secondary)` |


### 审美约束（禁止项）

- 页面背景必须保持一个颜色，不用 section 背景切块制造分割感
- 卡片默认禁止加描边，优先用底色、圆角、留白建立层级
- 禁止无理由将按钮默认升级为 `48px` 或更大规格
- 禁止所有卡片等高等宽、内容完全对称 → 像表格，无节奏感
- 禁止标题与正文字号差 < 4px → 层级模糊
- 禁止同一区块出现 3 种以上不同字号
- 禁止 CTA 按钮宽度撑满容器（操作卡片内确认按钮除外）
- Feature Card > 3 个时，图标容器高度必须统一（`40px`）

### 视觉层次

同一区块内信息用三层颜色控制，不引入额外字号：

- 主信息 → `var(--text-primary)`
- 次要信息 → `var(--text-secondary)`
- 说明 / 标签 → `var(--text-tertiary)`

每一屏至少有一个视觉重心，通过以下方式之一实现：字号跳级 / 背景色对比（`--bg-elevated` vs `--bg-card`）/ CTA 按钮存在。

---

## 7. 生成原则

**严格按 PRD 范围生成，不自行扩展。**

- PRD 没有提到的区块、交互、说明性 UI，一律不生成
- 禁止添加 `PROTOTYPE ANNOTATIONS`、`设计说明`、`埋点速查` 等标注区块
- CSS 只写当前页面用到的类，骨架里未使用的样式规则全部删除
- 行内 `style=""` 只用于一次性微调，重复 3 次以上提为 class
- HTML 结构扁平，能用 1 个元素表达的不用 2 个

---

## 8. 自检清单

**结构**

- 单文件 HTML，所有样式在 `<style>` 内，零外部依赖（Remix Icon CDN 除外）
- `:root` 变量完整，无硬编码色值
- Header 固定 80px，主体 `padding-top:80px`，Footer 存在
- 圆角嵌套：父 `--r-xl` → 子 `--r-lg` → 孙 `--r-md`
- 所有间距为 4 的倍数
- Grid 按断点正确塌缩
- 数据字段符合 §6 格式
- 状态通过 badge 文字 + 边框样式区分，不依赖颜色
- 图表用 `.chart-ph` 占位，不引 ECharts
- 无 PRD 未涉及的额外区块或标注内容
- CSS 无冗余规则

**版式 & 审美（§6.5）**

- 内容项 ≤ 3 时未使用 `grid-4`
- 页面背景保持单一底色，未用 section 背景做分割
- 卡片默认无描边，仅在明确需要边界的场景使用边框
- 常规按钮默认使用 `40px` 高度，放大到 `48px` 或以上时有明确强调理由
- KPI 并列时字号统一；单核心数字已放大至 `40px`
- 每屏有明确视觉重心
- Feature Card > 3 个时图标容器高度已统一
- 无标题与正文字号差 < 4px 的情况
- CTA 按钮未无故撑满容器宽度
