# USDD Data 页面 — 竞品 / 参考产品网址清单

> 用途：做 USDD Data（Transparency）页面设计时的对标参考库。
> 核心维度：USDD Data 页要回答「有多少在流通、靠什么抵押、锚定稳不稳、分布在哪些链」。
> 配合阅读：[sky-dashboard-missing-core-metrics.md](./sky-dashboard-missing-core-metrics.md)（指标层面的差距分析）。

---

## 一、稳定币透明页（直接竞品，重点看）

| 产品 | 网址 | 值得参考的设计点 |
| --- | --- | --- |
| **Ethena (USDe)** | https://app.ethena.fi/dashboards/transparency | 业内最现代、最像产品的稳定币数据页。储备资产用环形 / 卡片拆解，配色克制，数字层级清晰。**建议第一个看** |
| **Frax** | https://facts.frax.finance | 老牌「facts」页，一屏看懂抵押率（CR）、供应量、各资产构成。信息密度高但不乱，参考「指标卡 + 表格」组合 |
| **Sky / MakerDAO** | https://info.sky.money ｜ https://daistats.com | 抵押品构成、稳定费、储备金的经典呈现。daistats 是社区版极简风，适合看信息架构 |
| **Circle (USDC)** | https://www.circle.com/transparency | 合规向稳定币范式：储备构成 + 月度报告。偏信任感 / 机构感的视觉、配色与留白 |
| **Curve (crvUSD)** | https://crvusd.curve.fi | DeFi 原生、偏工程感，抵押仓位、清算线可视化做得细 |
| **Tether (USDT)** | https://tether.to/en/transparency | 储备透明页的另一种合规范式，可对照 Circle 看 |

## 二、数据聚合平台（看「该展示哪些维度」）

| 产品 | 网址 | 看什么 |
| --- | --- | --- |
| **DefiLlama 稳定币专区** | https://defillama.com/stablecoins | 行业标准。各链分布、市值占比、抵押类型分类的可视化是教科书级 |
| **USDD 在 DefiLlama** | https://defillama.com/stablecoin/usdd | 直接看第三方如何呈现 USDD 自家数据 |
| **Token Terminal** | https://tokenterminal.com | 协议营收 / 财务向图表风格，深色仪表盘排版专业 |
| **Dune Analytics** | https://dune.com | 进去搜 `USDD` 或 `stablecoin`，找图表类型灵感（堆叠面积图、桑基图等） |
| **Nansen** | https://www.nansen.ai | 链上数据可视化高级参考，配色与精细度高 |
| **Glassnode** | https://studio.glassnode.com | 同上，偏宏观链上指标 |

## 三、USDD 官方（对照自家现状）

| 产品 | 网址 |
| --- | --- |
| **USDD 官网** | https://usdd.io |

---

## 优先级建议

先看这三个就能覆盖「好看 + 完整 + 专业」：

1. **Ethena** — 视觉现代，学版式与配色
2. **Frax** — 信息架构，学指标卡 + 表格组合
3. **DefiLlama 的 USDD 页** — 行业标准维度，确认该展示哪些数据

---

## 图表 / 可视化细节落点

- **锚定稳定性**：参考 Ethena、Frax 用贴近 \$1 的折线 + 偏离高亮表达 peg。
- **抵押资产构成**：参考 DefiLlama、Maker 的环形图 / 堆叠条（USDD 抵押 TRX、BTC、USDT 等，是核心模块）。
- **各链分布**：USDD 跨 TRON / ETH / BSC，参考 DefiLlama 多链 tab 或地图式呈现。
