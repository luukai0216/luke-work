# USDD Tron · 数据加载调研

**调研日期：** 2026-04-14  
**调研对象：** `https://app.usdd.io/tron/`（列表页）及 `https://app.usdd.io/tron/vault?token=TRX-A`（详情页）  
**参照框架：** `usdd-loading-research-integrated.md`

---

## 1. 调研方式

通过 Playwright 浏览器自动化工具对页面进行真实访问，涵盖：
- 截图记录页面加载后状态
- 抓取网络请求（API 调用）
- 读取 DOM 结构与 CSS 类名
- 抓取原始 HTML 验证 SSR 情况
- JavaScript 执行检查 loading 相关元素

---

## 2. 列表页调研 · `app.usdd.io/tron/`

### 2.1 首屏 HTML 结构

```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="scale-wrapper">
    <div id="scale-root">
      <div id="root"></div>  ← 完全为空
    </div>
  </div>
</body>
```

**结论：纯 SPA，无 SSR。** 初始 HTML 的 `#root` 为空，所有内容依赖 JS 执行后渲染。

与参照文档的判断一致：「首屏缺少页面框架，用户容易感知为空白等待。」

### 2.2 API 调用

| 接口 | 方法 | 返回 | 说明 |
|------|------|------|------|
| `/vault/collaterals` | GET | 200 | 所有 Vault 抵押品列表数据 |
| `/status_check` | GET | 200 | 服务健康检查 |

整个列表页只有 **1 个真正的数据接口**（`/vault/collaterals`），数据量小，响应快。

### 2.3 表格加载机制

列表表格使用 Ant Design 的 `Table` 组件，外层被 `ant-spin-nested-loading` / `ant-spin-container` 包裹。

```
.ant-spin-nested-loading
  └── .ant-spin-container
        └── .ant-table（实际表格内容）
```

**关键发现：** 虽然有 Ant Design Spin 的容器结构，但 `hasSpinIndicator = false` —— 意味着 **Table 的 `loading` prop 并未被实际使用**。数据未到达时，表格不展示 spinning 状态，而是直接空表或等待。

### 2.4 数据展示现状

| 数据字段 | 已加载后显示 | 加载中显示 | 问题 |
|----------|-------------|-----------|------|
| Total Collateral | `$399.78M` 等实数 | 无占位，直接等待 | 加载期间表格行为未知 |
| USDD Limit | `170.27M / 400.00M` | 无占位 | 同上 |
| Collateral Ratio | `120%` 等 | 无占位 | 同上 |
| WBTC-A/B | `$0.00` | — | 真实数据为零，非 loading 态，但视觉上易被误读 |

### 2.5 加载态一览

- **骨架屏（Skeleton）：** 无
- **Spinner：** 有容器但未激活
- **占位文案（--、...）：** 无
- **预设背景色：** body 背景为 `rgb(12, 12, 14)`，通过 CSS 设置，不是 HTML 预设

---

## 3. 详情页调研 · `app.usdd.io/tron/vault?token=TRX-A`

### 3.1 页面布局结构

```
┌─────────────────────────────────────────────────────┐
│ 导航栏                                               │
├──────────────┬──────────────────────────────────────┤
│              │  TRX-A/USDD #3                        │
│  All Assets  │  ┌─────────────────────────────────┐  │
│  侧边栏      │  │ Stability Fee | Liq. Fee | Min.  │  │
│  （Vault     │  │ Coll. Ratio   | Dust Limit       │  │
│   类型列表） │  │ Current Price | Next Price       │  │
│              │  └─────────────────────────────────┘  │
│              │  ┌──────────────┬──────────────────┐  │
│              │  │ 左：操作区    │ 右：数据面板      │  │
│              │  │ Manage Vault │ My Position       │  │
│              │  │ Deposit TRX  │ Status            │  │
│              │  │ Mint USDD    │ Collateral        │  │
│              │  │ Connect Btn  │ Debt              │  │
│              │  └──────────────┴──────────────────┘  │
└──────────────┴──────────────────────────────────────┘
```

### 3.2 API 调用

| 接口 | 方法 | 调用次数 | 说明 |
|------|------|----------|------|
| `/vault/collaterals` | GET | 1 | 沿用列表页数据 |
| `/vault/info?ilk=TRX-A` | GET | **3次** | 当前 Vault 详情 |

**问题：`/vault/info` 被重复调用 3 次。** 推测为组件挂载时的重复请求或轮询逻辑，但页面上没有任何视觉反馈说明数据正在刷新或请求中。

### 3.3 顶部统计栏（已稳定加载）

| 字段 | 显示值 | 数据来源 |
|------|--------|----------|
| Stability Fee | `0.5 %` | `/vault/info` |
| Liquidation Fee | `13 %` | `/vault/info` |
| Min. Collateral Ratio | `120 %` | `/vault/info` |
| Dust Limit | `1,000` | `/vault/info` |
| Current Price | `$0.3194` | `/vault/info` |
| Next Price | `$0.3194 in 42 min (0.00%)` | `/vault/info` |

这部分数据加载正常，加载完成后直接显示，**无 loading 态设计**。

### 3.4 右侧 My Position 面板（核心问题区域）

My Position 面板分为 3 个数据组，**钱包未连接时全部显示 `--`：**

```
Status 组
  ├── Liquidation Price   →  $--
  └── Collateral Ratio    →  -- %

Collateral 组
  ├── Collateral          →  TRX-A（固定）
  ├── Collateral Locked   →  --
  └── Available to Withdraw → --

Debt 组
  ├── Debt                →  USDD（固定）
  ├── Vault USDD Debt     →  --
  └── Available to Generate → --
```

**核心问题：`--` 的语义不明确。**

用户看到 `--` 时，无法判断是：
1. 「数据正在加载中」
2. 「请先连接钱包」
3. 「当前暂无数据」

三种状态在视觉上完全一致，但含义和用户的应对行为截然不同。

### 3.5 左侧操作区 loading 状态

| 元素 | 未连接钱包时 | 问题 |
|------|------------|------|
| Balance 显示 | `Balance: 0 TRX` | 显示 `0`，与右侧 `--` 不一致 |
| MAX 显示 | `MAX: 0 USDD` | 显示 `0`，与右侧 `--` 不一致 |
| 操作按钮 | `Connect Wallet` | 正确，引导动作明确 |
| 输入框 | 可输入（未禁用） | 用户可输入但无法操作 |

**问题：Balance 用 `0`，My Position 用 `--`，两个区域的空状态表达不统一。**

---

## 4. 问题汇总

### 4.1 首屏问题

| 问题 | 严重程度 | 说明 |
|------|---------|------|
| 空 root，无 SSR 壳层 | 高 | 网速慢时用户面对空白屏等待 |
| 无 body 背景色预设（HTML 层） | 中 | JS 加载前可能短暂白屏或闪烁 |
| 无品牌 Logo 优先渲染 | 中 | 首批可见内容缺少品牌锚定 |
| 仅 2 个 preconnect（只有 Google Fonts） | 低 | 未预连接核心 CDN 或 API 域名 |

### 4.2 数据加载问题

| 问题 | 严重程度 | 说明 |
|------|---------|------|
| 列表页表格：有 Spin 容器但 loading prop 未激活 | 中 | 接口慢时表格无任何加载反馈 |
| 表格无骨架屏 | 中 | 数据未到达前布局不稳定 |
| 详情页 `/vault/info` 重复调用 3 次 | 中 | 可能的性能浪费，也无对应 loading 反馈 |
| 顶部统计栏无 loading 态 | 低 | 数据快但体验不完整 |

### 4.3 状态表达问题（最核心）

| 问题 | 严重程度 | 说明 |
|------|---------|------|
| `--` 语义不清：loading / 未连接 / 无数据 三态混用 | **高** | 用户无法判断应该等待还是连接钱包 |
| Balance 用 `0`，Position 用 `--`，同页不一致 | 高 | 破坏数据展示的统一感和可信度 |
| 无「请连接钱包以查看您的仓位」引导文案 | 中 | 未连接钱包时缺少明确的行动召唤 |
| `/vault/info` 重复请求无 loading 反馈 | 中 | 数据静默刷新，用户不知道数据是否最新 |

---

## 5. 对照参照文档的设计建议

### 5.1 首屏

对照 `usdd-loading-research-integrated.md` 的「方案 B：品牌加载壳 + 真实布局骨架」：

- 在 `<head>` 中加入 body 背景色，避免白屏闪烁
- 预连接 `app-api.usdd.io`（核心数据域名）
- App 页面整体走「先品牌底色 → 导航骨架 → 内容骨架」路线

### 5.2 列表页表格

- 激活 Ant Design Table 的 `loading` prop，数据请求期间展示 Spin
- 或换为骨架屏方案：表头保留真实显示，表体显示 5~7 行骨架条
- 修正 WBTC-A/B 的 `$0.00` 显示——若是真实零值，可加细节标注避免误读

### 5.3 详情页 My Position 三态区分

**最高优先级修复点。** 建议按三种状态分别设计：

```
状态 A：数据加载中（接口请求中）
  → 显示骨架条（与字段宽度匹配的灰色条）

状态 B：钱包未连接（已有数据但无仓位）
  → 显示引导文案 + Connect Wallet CTA
  → 不显示 --，不混入 loading 感

状态 C：钱包已连接但仓位为空
  → 显示 Empty State：「您目前没有 TRX-A 仓位」+ Mint CTA
```

### 5.4 统一 Balance 与 Position 的空态表达

- 左侧操作区：未连接钱包时，Balance 从 `0 TRX` 改为 `-- TRX` 或隐藏余额行
- 或统一为 `0`，并同步修改 My Position 区域的 `--` 也改为 `0`
- 关键原则：**同一页面内，相同语义的空态必须使用相同视觉表达**

### 5.5 `/vault/info` 重复请求

- 检查是否有重复组件挂载或 useEffect 多次触发
- 若为轮询设计（定时刷新价格），应在顶部 Next Price 区域加入「刷新中」的轻量指示
- 若为 bug，修复以减少不必要的 API 压力

---

## 6. 优先级排序

| 优先级 | 问题 | 预期收益 |
|--------|------|---------|
| P0 | My Position `--` 三态不分 | 直接影响用户信任感和转化 |
| P0 | Balance `0` 与 Position `--` 不一致 | 影响数据可信度 |
| P1 | 列表表格无 loading 反馈 | 网速慢时体验断层 |
| P1 | 首屏空 root，无背景预设 | 影响首次进入感知 |
| P2 | 详情页顶部统计无 loading 态 | 完整度提升 |
| P2 | `/vault/info` 重复调用 | 性能优化 |
