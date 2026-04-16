# usdd.io — API 动态加载内容调研

> 调研日期：2026-04-15  
> 调研范围：usdd.io 所有页面，聚焦 JS 骨架渲染完成后仍在加载的 API 数据区域  
> 标注截图：`./screenshots/annotated/`

---

## `/` 首页

**标注截图：** `screenshots/annotated/usdd-home-annotated.png`

| 区域 | 加载内容 |
|------|---------|
| 3 个数据卡片 | Total Supply / Protocol TVL / Savings TVL（实时链上数据） |
| USDD APY 折线图 | Tron / ETH / BNB Chain 历史 APY 数据点 |
| Yield Simulator | 当前 APY 值 + 估算收益计算结果 |
| News 文章列表 | 最新 2 篇文章（标题、摘要、日期，API 拉取） |
| Markets 跑马灯 | 交易所列表及链接数据 |

---

## `/data` — USDD Data

**标注截图：** `screenshots/annotated/usdd-data-annotated.png`

| 区域 | 加载内容 |
|------|---------|
| 4 个指标卡片 | Total Supply / Savings TVL / Total Collateral Value / Smart Allocator Earnings（含 24h 变动） |
| Total Supply 图表 | 历史供应量折线数据（可切换 sUSDD Supply，按链过滤） |
| Collateral Value 图表 | 历史抵押价值折线数据 |
| Allocated Asset Distribution 饼图 | Aave / Spark / JustLend 各协议占比数值 |
| Tron / ETH / BNB Chain APY 迷你图 | 各链最近 90 天 APY 曲线数据 |

---

## `/data/3/SA001-A` — Vault 详情页

**标注截图：** `screenshots/annotated/usdd-data-sa-detail-annotated.png`

URL 变体：`?chain=tron` / `?chain=eth` / `?chain=bsc`

| 区域 | 加载内容 |
|------|---------|
| 顶部 3 个指标 | Total Collateral Value / Total Debt / Current Overcollateralization |
| Activities 表格 | 链上 Borrow / Repay 操作记录（时间戳、金额、TxHash），分页每页 10 条 |

---

## `/sa` — Smart Allocator

**标注截图：** `screenshots/annotated/usdd-sa-annotated.png`

| 区域 | 加载内容 |
|------|---------|
| Overview 指标 | Debt（USDD 数量）/ Invested（USD 金额）/ Earnings / APY |
| Transparency 图表 | Debt vs 总投资额对比柱状图数据 |
| Assets Breakdown 表格 | 各协议 / 网络 / 资产的投资占比及金额 |
| Proof of Reserve 表格 | 每条投资记录：平台、金额、收益、APY、合约地址 |
| Debt Overview 表格 | Tron / ETH / BNB Chain 三条 Vault 债务数据 |

---

## `/treasury` — Treasury Dashboard

**标注截图：** `screenshots/annotated/usdd-treasury-annotated.png`

| 区域 | 加载内容 |
|------|---------|
| Total Treasury Balance | 当前国库总余额（USD） |
| USDD Key Financial Metrics | 3 个季度的 Revenue / Expenditure / Profit & Loss / Treasury Balance |
| JST Buyback & Burn | 总回购金额 / USDD 收益烧毁金额 / 历史轮次数 |

---

## `/news` — News

**标注截图：** `screenshots/annotated/usdd-news-annotated.png`

| 区域 | 加载内容 |
|------|---------|
| 文章列表 | 标题、摘要、分类标签、发布日期（共 15 页约 120 条，API 分页） |

---

## `/faq` — FAQs

**标注截图：** `screenshots/annotated/usdd-faq-annotated.png`

| 区域 | 加载内容 |
|------|---------|
| Q&A 列表 | 问题标题 + 展开答案内容（共 3 页约 24 条，API 分页） |
