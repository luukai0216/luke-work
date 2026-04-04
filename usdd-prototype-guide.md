# USDD HTML Prototype Guide

根据 PRD 生成 USDD HTML 原型页面的规范与组件参考。两个站点：**usdd.io**（USDD官网）· **app.usdd.io**（USDD APP）

---

## 一、生成规则

1. 以对应站点的完整页面模板为起点，不可省略 `:root` 变量
2. 字体使用 Inter，从 Google Fonts 引入
3. 所有颜色使用 CSS 变量（`var(--brand-default)`），禁止硬编码颜色
4. 深色主题，USDD官网背景 `#0C0C0E`，USDD APP 背景 `#080B0E`，禁止白色背景
5. 间距使用 4px 倍数，优先使用文档中出现的数值
6. 组件样式直接复用文档中的 HTML 代码片段
7. 圆角遵循嵌套原则：父 `radius-xl` → 子 `radius-lg` → 孙 `radius-md`
8. 容器宽度：默认 1200px，视口 ≥ 1472px 时扩至 1440px，≤ 1199px（Pad/Mobile）时改为 `width:auto` + `padding 0 20px`
9. 输出完整单文件 HTML，样式全部写在 `<style>` 内
10. USDD APP 默认不生成左侧 Sidebar，除非 PRD 明确要求后台式管理布局

**站点类型判断：**
- 营销/介绍页 → 使用 USDD官网模板
- 功能/操作页 → 使用 USDD APP 模板

---

## 二、站点概览

### usdd.io — USDD官网

受众：潜在用户、开发者、社区。无需连接钱包，阅读为主。

| 路径 | 页面 | 核心内容 |
| --- | --- | --- |
| `/` | 首页 | 品牌指标 · APY 历史图表 · 收益模拟器 · 代币介绍（USDD / sUSDD / JST）· 合作交易所 |
| `/data` | Data | 链上数据仪表盘，按链切 Tab（Overview / Tron / ETH / BSC） |
| `/sa` | Smart Allocator | 资产配置透明度，含 Proof of Reserve 明细 |
| `/treasury` | Treasury | 协议季度财务报表与 JST 回购销毁记录 |
| `/news` | News | 新闻公告列表，支持分类筛选 |
| `/faq` | FAQ | 常见问题解答 |

---

### app.usdd.io — USDD APP

受众：已连接钱包的 DeFi 用户。所有操作需钱包，按链分路由（/tron/ · /eth/ · /bsc/）。

|  | Tron | ETH | BSC |
| --- | --- | --- | --- |
| **Vault** 超额抵押铸造 USDD | ✅ | ❌ | ❌ |
| **PSM** USDD ↔ USDT/USDC 1:1 兑换 | ✅ | ✅ | ✅ |
| **Earn** 质押 USDD 赚收益 | ✅ | ✅ | ✅ |
| **Migrate** USDDOLD → USDD 迁移 | ✅ | ❌ | ❌ |

---

## 三、设计基础

### 颜色系统

```
品牌色
  主色       #216C58    按钮填充、主操作
  hover      #2A8C6C    按钮悬浮
  浅色强调   #5FC693    文字高亮、次级强调
  高亮       #81DEB0    icon、文字标注
  选中背景   rgba(33,108,88,0.15)   选中态背景

背景层级（从深到浅）
  官网页面底色  #0C0C0E    bg-page
  APP 页面底色  #080B0E    bg-page-app
  区块背景      #141615    bg-section
  卡片背景      #181A1C    bg-card
  APP 卡片      #131416    bg-card-app
  输入/弹窗     #212426    bg-elevated

文字透明度
  主要文字   rgba(255,255,255,1.00)   标题、强调
  正文       rgba(255,255,255,0.80)
  次要信息   rgba(255,255,255,0.60)
  辅助信息   rgba(255,255,255,0.40)
  禁用/占位  rgba(255,255,255,0.20)

边框透明度
  强边框     rgba(255,255,255,0.25)   按钮边框
  默认边框   rgba(255,255,255,0.15)   输入框
  弱边框     rgba(255,255,255,0.08)   分割线

功能色
  成功绿     #448F6A
  警告橙     #FF8F0B
  危险红     #D73133
  信息青     #0D9488
```

### 字体规范

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

### 间距规范

基础单位 4px，所有间距必须是 4 的倍数。

```
4px · 8px · 12px · 16px · 24px · 32px · 48px · 64px · 80px
```

### 圆角规范

嵌套原则：外层容器圆角 > 内层容器圆角

```
radius-xs    4px     Badge、Tooltip
radius-sm    6px     Tag、小型元素
radius-md    8px     Button(md)、Input(sm)、卡片孙级
radius-lg    16px    Input(lg)、卡片子级、Dropdown
radius-xl    24px    卡片父级、Modal、最外层容器
radius-full  999px   特殊 Pill 元素、头像
```

### 断点与容器

```
Large Desktop  ≥ 1472px     容器 width: 1440px
Desktop        1200~1472px  容器 width: 1200px
Pad            767~1199px   容器 width: auto，padding 0 20px
Mobile         < 767px      容器 width: auto，padding 0 20px
```

Header 高度：80px（两站一致）

---

## 四、组件代码库

### Button 按钮

```
类型
  Primary    主操作按钮
  Secondary  次要操作按钮
  Danger     危险/破坏性操作
  Ghost      轻量级内联操作

尺寸
  Large   h 64 / px 32 / radius 12 / text 20 bold
  Medium  h 48 / px 24 / radius 8  / text 16 semibold
  Small   h 40 / px 20 / radius 6  / text 14 semibold
  Mini    h 32 / px 16 / radius 4  / text 14 regular

规则
  Button 不使用 radius-full
  Padding = Height ÷ 2
  Icon only 按钮宽高相等
```

```html
<!-- Primary / Small -->
<button style="height:40px;padding:0 20px;background:var(--brand-default);color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Button</button>

<!-- Primary / Medium -->
<button style="height:48px;padding:0 24px;background:var(--brand-default);color:#fff;border:none;border-radius:8px;font-size:16px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Button</button>

<!-- Primary / Large -->
<button style="height:64px;padding:0 32px;background:var(--brand-default);color:#fff;border:none;border-radius:12px;font-size:20px;font-weight:700;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Button</button>

<!-- Secondary / Small -->
<button style="height:40px;padding:0 20px;background:rgba(255,255,255,0.08);color:var(--text-secondary);border:1px solid var(--border-default);border-radius:6px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:border-color .2s" onmouseover="this.style.borderColor='var(--border-strong)'" onmouseout="this.style.borderColor='var(--border-default)'">Button</button>

<!-- Danger / Small -->
<button style="height:40px;padding:0 20px;background:var(--danger-default);color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer">Button</button>

<!-- Ghost / Small -->
<button style="height:40px;padding:0 20px;background:transparent;color:var(--text-tertiary);border:none;border-radius:6px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer">Button</button>

<!-- Primary / Small / Loading -->
<button style="height:40px;padding:0 20px;background:var(--brand-default);color:var(--text-secondary);border:none;border-radius:6px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
  <span style="font-size:16px;line-height:1">◌</span> Loading
</button>

<!-- Primary / Small / Icon + Text -->
<button style="height:40px;padding:0 20px;background:var(--brand-default);color:#fff;border:none;border-radius:6px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
  <span>+</span> Button
</button>
```

---

## 五、页面模板

### usdd.io — USDD官网模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>USDD — [页面名]</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --brand-default:   #216C58;
      --brand-hover:     #2A8C6C;
      --brand-light:     #5FC693;
      --brand-highlight: #81DEB0;
      --brand-bg:        rgba(33,108,88,0.15);

      --bg-page:     #0C0C0E;
      --bg-section:  #141615;
      --bg-card:     #181A1C;
      --bg-elevated: #212426;

      --text-primary:    rgba(255,255,255,1.00);
      --text-secondary:  rgba(255,255,255,0.80);
      --text-tertiary:   rgba(255,255,255,0.60);
      --text-quaternary: rgba(255,255,255,0.40);
      --text-disabled:   rgba(255,255,255,0.20);

      --border-strong:  rgba(255,255,255,0.25);
      --border-default: rgba(255,255,255,0.15);
      --border-subtle:  rgba(255,255,255,0.08);

      --fill-hover:   rgba(255,255,255,0.04);
      --fill-overlay: rgba(0,0,0,0.60);

      --success-default: #448F6A;
      --warning-default: #FF8F0B;
      --danger-default:  #D73133;
      --info-default:    #0D9488;

      --radius-xs: 4px; --radius-sm: 6px;  --radius-md: 8px;
      --radius-lg: 16px; --radius-xl: 24px; --radius-full: 999px;

      --shadow-sm: 0 1px 8px rgba(0,0,0,0.32);
      --shadow-md: 0 4px 20px rgba(0,0,0,0.48);
      --shadow-lg: 0 8px 40px rgba(0,0,0,0.64);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg-page); color: var(--text-primary); -webkit-font-smoothing: antialiased; line-height: 1.5; }
    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; font-family: inherit; }
    img { display: block; max-width: 100%; }

    .container { width: 1200px; margin: 0 auto; }
    @media(min-width:1472px) { .container { width: 1440px; } }
    @media(max-width:1199px) { .container { width: auto; padding: 0 20px; } }

    section { padding: 100px 0; }
    @media(max-width:1199px) { section { padding: 56px 0; } }
  </style>
</head>
<body>

<!-- Header -->
<header style="position:fixed;top:0;left:0;right:0;height:80px;backdrop-filter:blur(5px);z-index:50;display:flex;align-items:center">
  <div class="container" style="display:flex;align-items:center;justify-content:space-between">

    <!-- Logo -->
    <a href="/" style="display:flex;align-items:center;gap:10px">
      <div style="width:32px;height:32px;background:var(--brand-default);border-radius:50%;flex-shrink:0"></div>
      <div>
        <div style="font-size:16px;font-weight:700;line-height:1.2">USDD</div>
        <div style="font-size:10px;color:var(--text-tertiary);line-height:1.2">Decentralized USD</div>
      </div>
    </a>

    <!-- Nav -->
    <nav style="display:flex;align-items:center;gap:4px">
      <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;font-size:14px;color:var(--text-tertiary);border-radius:var(--radius-full)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Home</a>
      <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;gap:4px;font-size:14px;color:var(--text-tertiary);border-radius:var(--radius-full)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Developer <span style="font-size:10px">▾</span></a>
      <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;gap:4px;font-size:14px;color:var(--text-tertiary);border-radius:var(--radius-full)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Transparency <span style="font-size:10px">▾</span></a>
      <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;gap:4px;font-size:14px;color:var(--text-tertiary);border-radius:var(--radius-full)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'">Community <span style="font-size:10px">▾</span></a>
    </nav>

    <!-- CTA -->
    <button style="height:40px;padding:0 20px;background:var(--brand-default);color:#fff;border:none;border-radius:var(--radius-md);font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Launch APP</button>
  </div>
</header>

<!-- 页面内容（顶部留 80px Header 空间） -->
<div style="padding-top:80px">

  <!-- ① Hero -->
  <section style="padding:100px 0 60px;position:relative;overflow:hidden">
    <div class="container">
      <h2 style="font-size:56px;font-weight:600;line-height:1.25;max-width:800px;margin-bottom:20px">[PRD 主标题]</h2>
      <p style="font-size:16px;color:var(--text-tertiary);line-height:1.6;max-width:640px;margin-bottom:40px">[PRD 副标题 / 描述]</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:64px">
        <button style="height:48px;padding:0 24px;background:var(--brand-default);color:#fff;border:none;border-radius:var(--radius-md);font-size:16px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">[主 CTA]</button>
        <button style="height:48px;padding:0 24px;background:transparent;color:#fff;border:1px solid var(--border-strong);border-radius:var(--radius-md);font-size:16px;font-weight:600;font-family:inherit;cursor:pointer">[次 CTA]</button>
      </div>
      <!-- 数据卡行 -->
      <div style="display:flex;gap:40px;flex-wrap:wrap">
        <div>
          <div style="font-size:14px;color:var(--text-tertiary);margin-bottom:4px">Total Supply</div>
          <div style="font-size:32px;font-weight:600">$1.55B</div>
        </div>
        <div style="width:1px;background:var(--border-subtle)"></div>
        <div>
          <div style="font-size:14px;color:var(--text-tertiary);margin-bottom:4px">Protocol TVL</div>
          <div style="font-size:32px;font-weight:600">$2.19B</div>
        </div>
        <div style="width:1px;background:var(--border-subtle)"></div>
        <div>
          <div style="font-size:14px;color:var(--text-tertiary);margin-bottom:4px">Savings TVL</div>
          <div style="font-size:32px;font-weight:600">$422.71M</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ② 数据/内容区（参考 PRD 决定区块内容） -->
  <section>
    <div class="container">
      <div style="display:flex;align-items:end;justify-content:space-between;gap:24px;margin-bottom:32px;flex-wrap:wrap">
        <div>
          <h2 style="font-size:40px;font-weight:600;line-height:1.4;margin-bottom:8px">[区块标题]</h2>
          <p style="font-size:16px;color:var(--text-tertiary)">[区块说明]</p>
        </div>
        <a href="#" style="font-size:14px;color:var(--brand-light)">View details</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px">
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:32px 24px">
          <div style="font-size:14px;color:var(--text-tertiary);margin-bottom:12px">Metric</div>
          <div style="font-size:40px;font-weight:600;line-height:1.2">Value</div>
          <div style="font-size:12px;color:var(--text-quaternary);margin-top:8px">[说明]</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:32px 24px">
          <div style="font-size:14px;color:var(--text-tertiary);margin-bottom:12px">Metric</div>
          <div style="font-size:40px;font-weight:600;line-height:1.2">Value</div>
          <div style="font-size:12px;color:var(--text-quaternary);margin-top:8px">[说明]</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:32px 24px">
          <div style="font-size:14px;color:var(--text-tertiary);margin-bottom:12px">Metric</div>
          <div style="font-size:40px;font-weight:600;line-height:1.2">Value</div>
          <div style="font-size:12px;color:var(--text-quaternary);margin-top:8px">[说明]</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:32px 24px">
          <div style="font-size:14px;color:var(--text-tertiary);margin-bottom:12px">Metric</div>
          <div style="font-size:40px;font-weight:600;line-height:1.2">Value</div>
          <div style="font-size:12px;color:var(--text-quaternary);margin-top:8px">[说明]</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ③ 内容卡片区（2 列） -->
  <section>
    <div class="container">
      <h2 style="font-size:40px;font-weight:600;line-height:1.4;margin-bottom:8px;text-align:center">[区块标题]</h2>
      <p style="font-size:16px;color:var(--text-tertiary);text-align:center;margin-bottom:40px">[区块说明]</p>
      <div style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px">
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:40px">
          <div style="font-size:12px;color:var(--brand-light);margin-bottom:12px">[标签]</div>
          <h3 style="font-size:32px;font-weight:600;line-height:1.4;margin-bottom:12px">[卡片标题]</h3>
          <p style="font-size:16px;color:var(--text-tertiary);line-height:1.7;margin-bottom:24px">[卡片内容描述]</p>
          <a href="#" style="font-size:14px;color:var(--brand-light)">Learn more</a>
        </div>
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:40px">
          <div style="font-size:12px;color:var(--brand-light);margin-bottom:12px">[标签]</div>
          <h3 style="font-size:32px;font-weight:600;line-height:1.4;margin-bottom:12px">[卡片标题]</h3>
          <p style="font-size:16px;color:var(--text-tertiary);line-height:1.7;margin-bottom:24px">[卡片内容描述]</p>
          <a href="#" style="font-size:14px;color:var(--brand-light)">Learn more</a>
        </div>
      </div>
    </div>
  </section>

  <!-- ④ CTA -->
  <section style="padding-top:0">
    <div class="container">
      <div style="background:linear-gradient(180deg,rgba(33,108,88,.18),rgba(33,108,88,.08));border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:56px 40px;text-align:center">
        <h2 style="font-size:40px;font-weight:600;line-height:1.4;margin-bottom:12px">[CTA 标题]</h2>
        <p style="font-size:16px;color:var(--text-tertiary);line-height:1.6;max-width:720px;margin:0 auto 28px">[引导说明]</p>
        <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap">
          <button style="height:48px;padding:0 24px;background:var(--brand-default);color:#fff;border:none;border-radius:var(--radius-md);font-size:16px;font-weight:600;font-family:inherit;cursor:pointer">Launch APP</button>
          <button style="height:48px;padding:0 24px;background:transparent;color:#fff;border:1px solid var(--border-strong);border-radius:var(--radius-md);font-size:16px;font-weight:600;font-family:inherit;cursor:pointer">Read Docs</button>
        </div>
      </div>
    </div>
  </section>

</div>

<!-- Footer -->
<footer style="padding:56px 0 32px;border-top:1px solid var(--border-subtle)">
  <div class="container" style="display:flex;flex-direction:column;align-items:center;gap:24px;text-align:center">
    <!-- 社交图标 -->
    <div style="display:flex;gap:20px">
      <a href="https://x.com/usddio" style="width:40px;height:40px;background:rgba(255,255,255,0.08);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--text-secondary)">𝕏</a>
      <a href="#" style="width:40px;height:40px;background:rgba(255,255,255,0.08);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--text-secondary)">✈</a>
      <a href="https://discord.com/invite/NurKn6KEqx" style="width:40px;height:40px;background:rgba(255,255,255,0.08);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--text-secondary)">◈</a>
    </div>
    <!-- Logo + 描述 -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:8px">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:32px;height:32px;background:var(--brand-default);border-radius:50%"></div>
        <div style="font-size:18px;font-weight:700">Decentralized USD</div>
      </div>
      <p style="font-size:14px;color:var(--text-tertiary);max-width:480px;line-height:1.6">USDD is a fully Decentralized stablecoin governed by the TRON DAO Reserve.</p>
    </div>
    <!-- 邮箱 -->
    <a href="mailto:support@usdd.io" style="height:40px;padding:0 20px;display:inline-flex;align-items:center;border:1px solid var(--border-default);border-radius:var(--radius-full);font-size:14px;color:var(--text-secondary)">support@usdd.io</a>
    <!-- 版权 -->
    <div style="font-size:14px;color:var(--text-quaternary)">Copyright © 2026 USDD. All rights reserved</div>
  </div>
</footer>

</body>
</html>
```

---

### app.usdd.io — USDD APP 模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>USDD App — [页面名]</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --brand-default:   #216C58;
      --brand-hover:     #2A8C6C;
      --brand-light:     #5FC693;
      --brand-highlight: #81DEB0;
      --brand-bg:        rgba(33,108,88,0.15);

      --bg-page:     #080B0E;
      --bg-section:  #141615;
      --bg-card:     #131416;
      --bg-elevated: #212426;

      --text-primary:    rgba(255,255,255,1.00);
      --text-secondary:  rgba(255,255,255,0.80);
      --text-tertiary:   rgba(255,255,255,0.60);
      --text-quaternary: rgba(255,255,255,0.40);
      --text-disabled:   rgba(255,255,255,0.20);

      --border-strong:  rgba(255,255,255,0.25);
      --border-default: rgba(255,255,255,0.15);
      --border-subtle:  rgba(255,255,255,0.08);

      --fill-hover:   rgba(255,255,255,0.04);
      --fill-overlay: rgba(0,0,0,0.60);

      --success-default: #448F6A;
      --warning-default: #FF8F0B;
      --danger-default:  #D73133;
      --info-default:    #0D9488;

      --radius-xs: 4px; --radius-sm: 6px;  --radius-md: 8px;
      --radius-lg: 16px; --radius-xl: 24px; --radius-full: 999px;

      --shadow-sm: 0 1px 8px rgba(0,0,0,0.32);
      --shadow-md: 0 4px 20px rgba(0,0,0,0.48);
      --shadow-lg: 0 8px 40px rgba(0,0,0,0.64);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg-page); color: var(--text-primary); -webkit-font-smoothing: antialiased; line-height: 1.5; min-height: 100vh; }
    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; font-family: inherit; }
    img { display: block; max-width: 100%; }

    .container { width: 1200px; margin: 0 auto; }
    @media(min-width:1472px) { .container { width: 1440px; } }
    @media(max-width:1199px) { .container { width: auto; padding: 0 20px; } }
  </style>
</head>
<body>

<!-- Header 外层容器（半透明白，实现毛玻璃质感） -->
<div style="position:fixed;top:0;left:0;right:0;background:rgba(255,255,255,0.06);z-index:50">
  <header style="height:80px;display:flex;align-items:center">
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;gap:24px">

      <!-- Logo（链接回官网） -->
      <a href="https://usdd.io" style="display:flex;align-items:center;gap:10px;flex-shrink:0">
        <div style="width:32px;height:32px;background:var(--brand-default);border-radius:50%"></div>
        <div>
          <div style="font-size:16px;font-weight:700;line-height:1.2">USDD</div>
          <div style="font-size:10px;color:var(--text-tertiary);line-height:1.2">Decentralized USD</div>
        </div>
      </a>

      <!-- Nav -->
      <nav style="display:flex;align-items:center;gap:4px">
        <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;gap:6px;border-radius:var(--radius-full);font-size:14px;font-weight:600;color:var(--text-tertiary)" onmouseover="this.style.background='var(--fill-hover)';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='rgba(255,255,255,.6)'">
          Vault <span style="font-size:10px;background:var(--warning-default);color:#000;padding:1px 5px;border-radius:4px;font-weight:700">HOT</span>
        </a>
        <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;border-radius:var(--radius-full);font-size:14px;font-weight:500;color:var(--text-tertiary)" onmouseover="this.style.background='var(--fill-hover)';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='rgba(255,255,255,.6)'">Swap(PSM)</a>
        <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;border-radius:var(--radius-full);font-size:14px;font-weight:500;color:var(--text-tertiary)" onmouseover="this.style.background='var(--fill-hover)';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='rgba(255,255,255,.6)'">Migrate</a>
        <!-- 当前激活项示例 -->
        <a href="#" style="height:40px;padding:0 14px;display:inline-flex;align-items:center;border-radius:var(--radius-full);background:var(--brand-bg);font-size:14px;font-weight:600;color:var(--brand-light)">Earn</a>
      </nav>

      <!-- 右侧：链选择器 + 钱包按钮 -->
      <div style="display:flex;align-items:center;gap:8px">
        <button style="width:40px;height:40px;background:rgba(255,255,255,0.08);border:1px solid var(--border-default);border-radius:var(--radius-md);color:var(--text-secondary);font-size:18px;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center" title="Switch Chain">⬡</button>
        <button style="height:40px;padding:0 18px;background:var(--brand-default);color:#fff;border:none;border-radius:var(--radius-md);font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">Connect Wallet</button>
      </div>
    </div>
  </header>
</div>

<!-- 页面主体（顶部留 80px Header 空间） -->
<main style="padding-top:80px">
  <div class="container" style="padding-top:32px;padding-bottom:64px">

    <!-- ① 页面 Banner / 标题区 -->
    <section style="margin-bottom:24px;padding:0">
      <div style="background:linear-gradient(180deg,rgba(33,108,88,.18),rgba(33,108,88,.04));border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:40px 32px;position:relative;overflow:hidden">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:24px;flex-wrap:wrap">
          <div style="max-width:640px">
            <p style="font-size:16px;color:var(--text-tertiary);margin-bottom:8px">[副标题 / 页面说明]</p>
            <h1 style="font-size:40px;font-weight:700;line-height:1.3;margin-bottom:0">
              <span style="background:linear-gradient(270deg,#87F1BD 61%,#F3EE9F 102%);-webkit-background-clip:text;-webkit-text-fill-color:transparent">[高亮关键词]</span>
              <span> [标题其余部分]</span>
            </h1>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
            <button style="height:40px;padding:0 18px;background:transparent;color:var(--text-primary);border:1px solid var(--border-strong);border-radius:var(--radius-md);font-size:14px;font-weight:600;font-family:inherit;cursor:pointer">[次操作]</button>
            <button style="height:40px;padding:0 18px;background:var(--brand-default);color:#fff;border:none;border-radius:var(--radius-md);font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='var(--brand-hover)'" onmouseout="this.style.background='var(--brand-default)'">[主操作]</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ② KPI 数据行 -->
    <section style="margin-bottom:24px;padding:0">
      <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px">
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:20px">
          <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px">Metric</div>
          <div style="font-size:24px;font-weight:600">Value</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:20px">
          <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px">Metric</div>
          <div style="font-size:24px;font-weight:600">Value</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:20px">
          <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px">Metric</div>
          <div style="font-size:24px;font-weight:600">Value</div>
        </div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:20px">
          <div style="font-size:12px;color:var(--text-tertiary);margin-bottom:8px">Metric</div>
          <div style="font-size:24px;font-weight:600">Value</div>
        </div>
      </div>
    </section>

    <!-- ③ 主业务区（左主内容 + 右操作面板，适用于 Vault / PSM 等操作页） -->
    <!-- 若为卡片网格页（如 Earn），将此区替换为 grid 卡片布局 -->
    <section style="padding:0;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(320px,.85fr);gap:24px;align-items:start">

      <!-- 左：主信息 / 图表 / 列表 -->
      <div style="display:flex;flex-direction:column;gap:24px">
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <h2 style="font-size:20px;font-weight:600">[主模块标题]</h2>
            <span style="font-size:12px;color:var(--text-quaternary)">[辅助说明]</span>
          </div>
          <div style="height:260px;border-radius:var(--radius-lg);background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06)"></div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
            <h2 style="font-size:20px;font-weight:600">[列表 / 历史记录]</h2>
            <a href="#" style="font-size:14px;color:var(--brand-light)">View all</a>
          </div>
          <!-- 表格内容 -->
        </div>
      </div>

      <!-- 右：操作面板 -->
      <aside style="display:flex;flex-direction:column;gap:16px">
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:24px">
          <h2 style="font-size:20px;font-weight:600;margin-bottom:20px">[操作卡标题]</h2>
          <!-- Tab 切换 -->
          <div style="display:flex;gap:8px;margin-bottom:20px">
            <button style="height:36px;padding:0 16px;background:var(--brand-bg);color:var(--brand-light);border:none;border-radius:var(--radius-lg);font-size:14px;font-weight:600;font-family:inherit;cursor:pointer">[Tab A]</button>
            <button style="height:36px;padding:0 16px;background:transparent;color:var(--text-tertiary);border:1px solid var(--border-default);border-radius:var(--radius-lg);font-size:14px;font-weight:500;font-family:inherit;cursor:pointer">[Tab B]</button>
          </div>
          <!-- Input / 操作区 -->
        </div>
        <div style="background:rgba(255,255,255,0.04);border:1px solid var(--border-subtle);border-radius:var(--radius-xl);padding:20px">
          <div style="font-size:14px;font-weight:600;margin-bottom:8px">[说明卡标题]</div>
          <p style="font-size:14px;color:var(--text-tertiary);line-height:1.6">[规则说明 / 风险提示]</p>
        </div>
      </aside>
    </section>

  </div>
</main>

<!-- Footer -->
<footer style="border-top:1px solid var(--border-subtle);padding:16px 0">
  <div class="container" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px">
    <a href="mailto:support@usdd.io" style="font-size:14px;color:var(--text-tertiary)">support@usdd.io</a>
    <span style="font-size:14px;color:var(--text-quaternary)">Copyright © 2026 USDD. All rights reserved</span>
    <div style="display:flex;gap:16px">
      <a href="https://x.com/usddio" style="font-size:14px;color:var(--text-tertiary)">𝕏</a>
      <a href="#" style="font-size:14px;color:var(--text-tertiary)">✈</a>
      <a href="https://discord.com/invite/NurKn6KEqx" style="font-size:14px;color:var(--text-tertiary)">◈</a>
    </div>
  </div>
</footer>

</body>
</html>
```

---

> Design System Source: [Figma](https://www.figma.com/design/R2TQ0Ve55k6UHh4K3sBqv7/USDD-Design-System)
> Sites: [usdd.io](https://usdd.io) · [app.usdd.io](https://app.usdd.io)
> Last updated: 2026-04-03
