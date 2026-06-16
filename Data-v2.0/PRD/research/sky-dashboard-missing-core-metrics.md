# USDD Transparency 相比 Sky Dashboard 缺少的核心指标

## 结论

USDD 当前 Transparency 页面更偏向"储备透明 + Smart Allocator 证明 + 季度财务披露"。相比 Sky Ecosystem dashboard，USDD 缺少的核心能力主要集中在四类：全局安全、锚定压力、CDP 风险、收益与财务可持续性。

USDD Transparency 模块不应把所有指标都堆到 Data 首页。更合理的方式是按用户决策路径分层：Data Overview 负责判断全局是否安全和稳定，Data Chain 负责拆解单链风险，Collateral Detail 负责解释单个抵押品风险，Smart Allocator 负责收益质量，USDD Treasury 负责协议经营和资金流。

**补充结论（2026-05-12 合并）**：除了上述四类，USDD 在 ① 财务披露颗粒度（链上逐笔会计事件）、② 收益质量解释力（Yield Source 拆解、策略容量）、③ JST 价值循环（JST staking）、④ 数据可访问性（全局时间范围切换器、CSV / API 导出、KPI 同环比）四个维度也明显落后于 Sky。详见下表新增行。

---

## 披露边界声明（2026-05-22 修订）

**USDD Transparency 不是 Sky 生态级数据披露的复刻**。Sky 的 info / fusion / Atlas / chainlog 四套站覆盖的是"协议 + 多 SubDAO + 数十个 contributor"的生态级数据；USDD 是**单一稳定币产品**，没有 SubDAO，没有分布式 contributor 预算，因此以下 Sky 指标**不在 USDD 披露范围内**：

| 已剔除的 Sky 指标 | 原优先级 | 剔除原因 |
| --- | --- | --- |
| P/E Ratio | P2 | Sky 的 P/E 含多 SubDAO 收益贡献，USDD 没有 SubDAO，分子单薄反而误导市场 |
| 资产负债表（Balance Sheet） | P2 | Sky 因 SubDAO 复杂才需要表达；USDD 用「Treasury 资产构成 + 季度财报」已能覆盖 |
| 运营支出明细分类 | P1 | Sky 有 Phoenix Labs / BlockAnalitica / Sidestream 等数十 contributor，分类有意义；USDD 不是分布式承包模式，分类意义小 |
| 治理参与度 | P2 | Sky 治理体系（SKY voters / Aligned Delegates / Endgame Pod）庞大；USDD 治理走内部 Web3 admin，外部 JST holder 数据稀薄，披露反暴露问题 |

USDD 披露范围明确为：**USDD 协议本身（稳定币 + Vault + PSM + 清算 + 储蓄）+ JST 价值循环（buyback / burn / staking）+ 多链原生发行**。

---

## 一、维度索引（按主题快速定位）

> 把 36 个指标归到 7 个主题维度，下表按"系统安全 → 风险敞口 → 运营经营 → 数据基建"逻辑排序。每一行都是一条可独立讨论的产品议题。
> **范围收敛说明**：原 40 个候选指标中，4 个属于 Sky 生态级披露（USDD 无对应业务）已剔除，详见上文「披露边界声明」。

| 维度 | 关心的问题 | 指标数 | P0 | P1 | P2 | 核心落地页 |
| --- | --- | --- | --- | --- | --- | --- |
| 🛡️ **安全 & 锚定** | USDD 是否被足额、健康的资产支撑？是否还锚定 1:1？ | 6 | 3 | 3 | 0 | Data / Overview |
| ⚡ **风险 & 清算** | 借款人是否健康？极端行情下系统能否守住？ | 8 | 2 | 6 | 0 | Data / Chain + Collateral Detail |
| 🏛️ **抵押品 & 参数** | 各 Vault 池还有多少增长空间？参数怎么变化的？ | 3 | 0 | 3 | 0 | Data / Chain + Collateral Detail |
| 💰 **收益 & sUSDD** | 收益是否可持续？是否有真实用户沉淀？ | 6 | 0 | 1 | 5 | Smart Allocator + Data / Overview |
| 📊 **财务 & 经营** | 协议赚钱吗？Treasury 资产质量如何？回购是否真实？ | 6 | 1 | 4 | 1 | USDD Treasury |
| 🌐 **用户 & 多链分布** | USDD 在哪里流通？是否过度集中？ | 3 | 0 | 2 | 1 | Data / Overview + Chain |
| 🗳️ **JST 价值循环** | JST staking 是否健康？价值循环（buyback / burn / staking）是否闭环？ | 1 | 0 | 0 | 1 | USDD Treasury |
| 🛠️ **数据可访问性** | 研究员能否做二次分析？能否自定义时间窗？ | 3 | 0 | 1 | 2 | 全局 / Footer |
| **合计** | — | **36** | **6** | **20** | **10** | — |

**优先级一句话总结**：
- **P0（6 个）= 必须立刻补**：CR、抵押品结构占比、PSM 净流量、仓位健康度分布、Debt at Risk、实时 Revenue。补完这 6 个，Transparency 页才具备最基本的"判断 USDD 此刻是否安全"能力。
- **P1（20 个）= 下个版本应补**：补完才算"机构级透明"。
- **P2（10 个）= 锦上添花**：服务专业研究员、外部审计、长尾分析师。

---

## 二、完整指标清单（按维度重排）

| 维度 | 模块 | 缺少的核心指标 | 指标意义 | 统计方式 / 口径 | 建议补充页面 | 放置方式 | 页面职责说明 | 优先级 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 🛡️ 安全 & 锚定 | 全局安全 | 全局抵押率 CR | 衡量 USDD 是否被足额资产支撑，是市场信任根基。 | `总抵押品 / 储备 USD 价值 ÷ USDD 总流通 / 总债务`，按实时价格标记。 | Data / Overview | 顶部核心 KPI，和 Total Supply、Total Collateral Value 同级。 | 让用户第一眼判断 USDD 是否足额支撑。 | P0 |
| 🛡️ 安全 & 锚定 | PSM | PSM 净流量 | 判断市场是在用 PSM 铸造 USDD，还是赎回 USDD，直接反映锚定压力。 | `PSM mint volume - redeem volume`，按 24h / 7d / 30d 统计。 | Data / Overview + Data / Chain | Overview 展全局净流量，Chain 页展示该链 PSM 净流量。 | 判断锚定压力来自全局还是某条链。 | P0 |
| 🛡️ 安全 & 锚定 | 全局安全 | 加权抵押率 Weighted CR | 比单一 CR 更能反映不同抵押品的风险差异。 | `Σ(抵押品价值 × 风险折扣) ÷ 总债务`，风险折扣按资产类型、流动性、波动率设定。 | Data / Overview | 放在 CR 旁边作为风险调整后指标，可加 tooltip 解释风险折扣。 | 补足"资产价值足够"之外的"资产质量是否足够"。 | P1 |
| 🛡️ 安全 & 锚定 | 全局安全 | 抵押品结构占比 | 判断 USDD 是否过度依赖某类资产，例如 TRX、PSM、SA、稳定币。 | 按 vault / asset / chain 聚合 `lockedValue ÷ totalCollateralValue`。 | Data / Overview | Collateral Value 图下方增加 donut / stacked bar。 | 展示 TRX、PSM、SA、稳定币等资产对系统支撑的占比。 | P0 |
| 🛡️ 安全 & 锚定 | PSM | PSM 库存余额 | 衡量 PSM 还有多少稳定币缓冲能力。 | 按 PSM-USDT / PSM-USDC 统计 reserve balance、debt、available liquidity。 | Data / Chain | 链页 Collateral List 中 PSM 行展开，或新增 PSM card。 | 展示该链 PSM 还有多少稳定币缓冲能力。 | P1 |
| 🛡️ 安全 & 锚定 | PSM | PSM Swap Activity | 观察套利者使用频率、压力传导和锚定恢复速度。 | 统计 swap 笔数、volume、方向、平均交易规模、活跃地址。 | Data / Collateral Detail: PSM-* | PSM-USDT / PSM-USDC 详情页展示 swap volume、方向、地址。 | 解释 PSM 使用强度、套利行为和压力传导。 | P1 |
| ⚡ 风险 & 清算 | CDP 风险 | 仓位健康度分布 | 判断清算风险集中在哪些区间。 | `Collateral Ratio ÷ Liquidation Ratio` 或 `CR - LR`，分桶展示，例如 `<110%`、`110%-130%`、`130%-150%`、`>150%`。 | Data / Chain + Data / Collateral Detail | Chain 页展示全链分布，抵押品详情页展示该 ilk 分布。 | 定位风险集中在哪条链、哪个抵押品。 | P0 |
| ⚡ 风险 & 清算 | CDP 风险 | Debt at Risk | 量化如果价格下跌，多少 USDD 债务会进入清算区。 | 按不同价格跌幅场景计算触发清算的债务，例如 -5%、-10%、-20%。 | Data / Overview + Data / Collateral Detail | Overview 展全局风险债务，详情页展示该抵押品风险曲线。 | 量化价格下跌场景下的潜在清算压力。 | P0 |
| ⚡ 风险 & 清算 | CDP 风险 | CDP 数量 / 借款人数量 | 判断借贷需求是真实分散，还是少数大户撑起规模。 | 按 Vat urn / owner 聚合，统计 active CDPs、unique borrowers。 | Data / Chain | 链页顶部或 Collateral List 上方补 Vault Activity 小卡片。 | 判断单链借贷需求是否分散。 | P1 |
| ⚡ 风险 & 清算 | CDP 风险 | Liquidation Price 分布 | 帮助判断市场价格接近哪些清算密集区。 | 每个 CDP 计算 `debt × liquidationRatio ÷ collateralAmount`，按价格区间聚合。 | Data / Collateral Detail | 放在 Collateral at Risk 下方，使用价格区间柱状图。 | 让用户看到清算密集价位。 | P1 |
| ⚡ 风险 & 清算 | CDP 风险 | 大户集中度 | 判断系统是否受少数巨鲸仓位影响。 | Top 10 / Top 20 borrowers debt share，或 Herfindahl index。 | Data / Chain + Data / Collateral Detail | Chain 页展示 Top borrowers share，详情页展示该 ilk Top CDP。 | 判断系统是否被少数巨鲸仓位影响。 | P1 |
| ⚡ 风险 & 清算 | 清算系统 | 清算事件历史 | 判断系统在极端行情中是否能有效回收债务。 | 统计 Dog.bark / Clip auction 事件、清算债务、抵押品数量、成交价格。 | Data / Collateral Detail | 新增 Liquidation History 表格。 | 追踪单个抵押品的历史清算与市场压力。 | P1 |
| ⚡ 风险 & 清算 | 清算系统 | 清算效率 | 衡量清算是否顺畅，是否产生坏账。 | `recovered debt ÷ liquidated debt`、平均拍卖时长、折价率、剩余坏账。 | Data / Overview + Data / Collateral Detail | Overview 给全局回收率，详情页给该资产清算效率。 | 判断清算系统是否能有效回收债务、避免坏账。 | P1 |
| ⚡ 风险 & 清算 | 预言机 | OSM 当前价 / 下一价 | 判断 oracle 延迟下是否存在即将触发的风险。 | 展示 Median price、OSM current price、OSM next price、更新时间、延迟 hop。 | Data / Collateral Detail | 放在资产价格图旁边，适合 TRX、sTRX、WBTC 等波动资产。 | 解释预言机延迟下的下一步价格风险。 | P1 |
| 🏛️ 抵押品 & 参数 | 参数治理 | Debt Ceiling 使用率 | 判断各抵押品池是否接近上限，影响增长空间和风险暴露。 | `vault debt ÷ debt ceiling(line)`，按 ilk 展示。 | Data / Chain | Collateral List 中 debt / line 已有，可强化为 utilization bar。 | 判断各抵押品池的增长空间和风险上限。 | P1 |
| 🏛️ 抵押品 & 参数 | 参数治理 | Stability Fee 收入 | 衡量 CDP 模块真实收入能力。 | `debt × stability fee` 年化，按 ilk 聚合。 | Data / Chain + USDD Treasury | Chain 页按 ilk 展示年化收入，Treasury 汇总为收入来源。 | 连接 CDP 参数和协议收入。 | P1 |
| 🏛️ 抵押品 & 参数 | 参数治理 | Risk Parameters Dashboard | 集中暴露每个金库的清算阈值、债务上限、利用率、参数变更历史。 | 从 web3-admin 同步参数 + 历史变更 log；展示 LR、DC、SF、duty、line、Art 等。 | Data / Chain + Data / Collateral Detail | 新增 Risk Parameters 区块，含变更历史时间线。 | 让 borrower 与研究员提前预判参数风险与治理动作。 | P1 |
| 💰 收益 & sUSDD | sUSDD | sUSDD 持有人 / 存款人数量 | 衡量收益模块是否有真实用户沉淀。 | 统计 ERC-4626 share holder、depositors、active suppliers。 | Data / Overview | 放在 Savings TVL 卡片下钻区，或新增 Savings 区块。 | 判断收益模块是否有真实用户沉淀。 | P1 |
| 💰 收益 & sUSDD | 收益质量 | Smart Allocator 收益来源占比 | 判断收益是否集中在单一协议、单一链或单一资产。 | 按 protocol / chain / asset 聚合 invested、earnings、APY。 | Smart Allocator | 在已有 Assets Breakdown 上补 earnings share / risk exposure 维度。 | 判断收益是否集中在单一协议、单一链或单一资产。 | P2 |
| 💰 收益 & sUSDD | 收益质量 | 收益 APY 历史 | 判断收益是短期冲高还是长期稳定。 | 按日记录 Smart Allocator APY、sUSDD APY、资金利用率。 | Smart Allocator + Data / Overview | SA 页展示策略 APY 历史，Overview 只放总 APY 趋势。 | 区分短期高 APY 和长期可持续收益。 | P2 |
| 💰 收益 & sUSDD | 收益质量 | Yield Source 拆解 | 区分"可持续 yield"与"激励驱动 yield"，避免被表面 APY 误导。 | 按策略拆分 `base APY / incentive APY / fee APY`，并标注激励发放方与到期时间。 | Smart Allocator | APY 卡下钻分类柱状图 + 表格。 | 解释 APY 来源构成，提升收益解释力。 | P2 |
| 💰 收益 & sUSDD | 收益质量 | 策略容量 / 剩余可投资额 | 评估各策略的增量空间，辅助下一笔资金分配。 | `max capacity - current invested`，按策略统计；含协议层硬上限与风险上限。 | Smart Allocator | Proof of Reserve 表新增 Capacity / Headroom 列。 | 帮助资金调度决策与风险敞口控制。 | P2 |
| 💰 收益 & sUSDD | sUSDD | 存取款活动 | 判断资金留存和挤兑风险。 | 统计 deposit / withdraw volume、net flow、active wallets、平均持有时长。 | Data / Overview | 新增 Savings Activity，展示 deposit、withdraw、net flow。 | 判断资金留存、挤兑压力和用户行为变化。 | P2 |
| 📊 财务 & 经营 | 财务 | 实时 Revenue / Earnings / Expenses | Sky 有实时经营视角，USDD 当前偏季度披露。 | 按日聚合稳定费、PSM fee、Smart Allocator earnings、清算收入、运营成本、激励成本。 | USDD Treasury | Treasury 顶部新增 realtime metrics，季度披露放下方。 | 从季度财务升级为实时经营视角。 | P0 |
| 📊 财务 & 经营 | 财务 | 净利润趋势 | 判断协议是否可持续覆盖成本。 | `revenue - expenses`，按日 / 周 / 月 / 季度展示。 | USDD Treasury | 新增 Revenue / Expenses / Net Profit 时间序列图。 | 判断协议收入是否可持续覆盖成本。 | P1 |
| 📊 财务 & 经营 | Treasury | Treasury 资产构成 | 判断财政资产质量和流动性。 | 按 token / chain / wallet 分类统计余额、USD value、占比。 | USDD Treasury | Total Treasury Balance 下方新增资产构成 donut / table。 | 判断 treasury 资产质量、流动性和集中度。 | P1 |
| 📊 财务 & 经营 | Buyback | Buyback 执行明细 | 判断回购是否真实、价格是否合理。 | 统计买入时间、金额、数量、平均价格、tx hash、累计 burn。 | USDD Treasury | JST Buyback & Burn 区块下新增 execution records。 | 验证回购执行是否真实、价格是否合理。 | P1 |
| 📊 财务 & 经营 | 财务 | Accounting Events 链上财务流水 | 把"季度披露"升级为"逐笔可审计"，对齐 Sky 的 1572 行会计事件流。 | 按 tx 记录稳定费 / PSM fee / 清算回收 / 运营支出 / buyback / 收入入账，含 timestamp、tx hash、金额、类型。 | USDD Treasury | 季度财务卡片下方新增 Accounting Events 明细表（可分页 / 可筛选 / 可导出）。 | 让外部审计、研究员能够逐笔核对协议现金流。 | P1 |
| 📊 财务 & 经营 | Treasury | Treasury Activity | 追踪资金流入流出，增强透明度。 | 统计 treasury wallet transfers、收入入账、支出、buyback、burn。 | USDD Treasury | 新增 activity table，展示收入入账、支出、buyback、burn。 | 提升资金流透明度。 | P2 |
| 🌐 用户 & 多链分布 | 多链 | 跨链供应分布 | 判断 USDD 在各链流通是否健康。 | 按 Tron / Ethereum / BNB / BTTC 统计 supply、holders、bridge balance。 | Data / Overview | Total Supply 图下方增加 chain distribution。 | 判断 USDD 在各链的真实流通结构。 | P1 |
| 🌐 用户 & 多链分布 | 用户分布 | Holder 分布 / Top Holders | 判断 USDD 是否集中在少数地址或协议。 | Token holder balances，统计 Top 10 占比、地址类型、活跃度。 | Data / Overview + Data / Chain | Overview 展全局 holder 分布，Chain 页展示该链 Top Holders。 | 识别持币集中度、协议地址占比和潜在集中抛压。 | P1 |
| 🌐 用户 & 多链分布 | 多链 | 跨链流动性深度 | 判断多链 USDD 是否可交易、可退出。 | 聚合各链核心 DEX / CEX 池 TVL、USDD 占比、滑点深度。 | Data / Overview | 新增 Liquidity 区块，按 chain / venue 展示 TVL、depth、slippage。 | 判断多链 USDD 是否具备交易和退出深度。 | P2 |
| 🗳️ JST 价值循环 | 治理 | JST staking | 当前仅展示 buyback/burn，未展示 staking 端，无法完整呈现 JST 价值循环。 | 总 staked 数量、staker 数、平均锁仓时长、staking APY、解锁分布。 | USDD Treasury | JST Buyback & Burn 区块下方新增 Staking 卡片。 | 完整呈现 JST 供应去向（流通 / staking / burn）。 | P2 |
| 🛠️ 数据可访问性 | UI / 数据可访问 | 全局时间范围切换器 | 当前 Treasury 仅季度块状卡片、Data 图表时间范围固定，研究员无法自定义。 | 全局 Time Range Picker：7D / 30D / 90D / YTD / All / 自定义起止。 | 全部 Transparency 页顶部 | 顶部统一 Time Range Picker，切换后所有图表同步刷新。 | 满足分析师、研究员的多时间窗分析需求。 | P1 |
| 🛠️ 数据可访问性 | UI / 数据可访问 | CSV 导出 + 数据 API | 当前数据只能截图，无法做二次分析；MCP 文档不在 Dashboard 入口。 | 每个图表 / 表格右上角"导出 CSV"按钮；同时暴露 REST / GraphQL / MCP 端点。 | 全部页面 + Developer Doc 入口 | 图表右上角加导出按钮 + Footer 凸显 API & MCP 入口。 | 让链上数据成为可编程资产，扩大研究覆盖面。 | P2 |
| 🛠️ 数据可访问性 | UI / KPI 增强 | KPI 同比 / 环比变化 | 当前 Hero 卡仅显示日增量，无法看出趋势拐点。 | 在 KPI 卡下追加 7D% / 30D% / YoY% 变化，红绿涨跌色。 | Data / Overview | KPI 卡下方追加 7D / 30D / YoY 三段对比。 | 帮助用户识别趋势拐点与增长动能变化。 | P2 |

---

## 三、页面职责分工

| 页面 | 应承担的指标职责 | 优先补充内容 |
| --- | --- | --- |
| Data / Overview | 总览安全与稳定：CR、PSM 压力、总供应、总抵押、多链分布、Debt at Risk。 | 全局 CR、PSM 净流量、Debt at Risk。 |
| Data / Chain | 链级风险拆解：该链 collateral、debt ceiling、PSM、CDP 数量、健康度、borrower 集中度。 | Debt Ceiling 使用率、PSM 库存、仓位健康度分布、CDP / borrower 数量、Risk Parameters。 |
| Data / Collateral Detail | 单个抵押品风控：清算价、Debt at Risk、OSM、清算历史、Top CDP。 | Liquidation Price 分布、Collateral at Risk 增强、OSM 当前价 / 下一价、清算历史、Risk Parameters 变更日志。 |
| Smart Allocator | 收益质量：投资分布、APY 历史、收益来源、协议 / 链 / 资产集中度。 | APY 历史、earnings share、策略风险敞口、收益来源占比、Yield Source 拆解、策略容量。 |
| USDD Treasury | 协议经营：revenue、expenses、net profit、treasury assets、buyback、burn、JST 价值循环。 | 实时 Revenue / Earnings / Expenses、净利润趋势、Treasury 资产构成、Treasury Activity、Accounting Events、Buyback 执行明细、JST staking。 |
| 全局（跨页） | 数据可访问性与时间分析能力。 | 全局时间范围切换器、CSV 导出 / API、KPI 同环比。 |

---

## 四、第一批优先补齐指标（P0）

1. 全局抵押率 CR — 🛡️ 安全 & 锚定
2. 抵押品结构占比 — 🛡️ 安全 & 锚定
3. PSM 净流量 — 🛡️ 安全 & 锚定
4. 仓位健康度分布 — ⚡ 风险 & 清算
5. Debt at Risk — ⚡ 风险 & 清算
6. 实时 Revenue / Earnings / Expenses — 📊 财务 & 经营

> 这些指标最直接服务 PM 判断：USDD 是否安全、是否稳、收益是否可持续，以及市场压力是否正在积累。
> **分布特征**：3 个"安全&锚定"，2 个"风险&清算"，1 个"财务&经营"——P0 阶段优先解决"系统是否健康 + 资产结构是否健康"，把"用户、收益、JST 价值循环"留到后续。

## 五、第二批建议补齐指标（P1 重点）

1. Accounting Events 链上财务流水 — 📊 财务 & 经营
2. Risk Parameters Dashboard（含历史变更） — 🏛️ 抵押品 & 参数
3. Holder 分布 / Top Holders — 🌐 用户 & 多链分布
4. 全局时间范围切换器（UI 基础设施） — 🛠️ 数据可访问性
5. 跨链供应分布 — 🌐 用户 & 多链分布
6. 净利润趋势 — 📊 财务 & 经营

> 第二批服务于"专业研究员、外部审计、机构投资者"三类受众，是 USDD 从"零售透明"走向"机构级透明"的关键一步。
> **分布特征**：2 个财务，2 个用户分布，1 个抵押品参数，1 个数据基建——P1 阶段重心转移到"经营透明 + 用户透明 + 二次分析能力"。

---

## 六、维度与受众对应（速查）

| 受众 | 最关心的维度 | 进入页面顺序 |
| --- | --- | --- |
| 普通用户 / 持币人 | 🛡️ 安全 & 锚定 → 💰 收益 | Overview → Smart Allocator |
| 借款人 / Vault 持有者 | ⚡ 风险 & 清算 → 🏛️ 抵押品 & 参数 | Chain → Collateral Detail |
| 套利者 / Keeper | 🛡️ PSM 子维度 → ⚡ 清算系统 | Overview → Collateral Detail |
| 机构投资者 / VC | 📊 财务 & 经营 → 🌐 用户 & 多链 | Treasury → Overview |
| 研究员 / 审计 | 全部维度 + 🛠️ 数据可访问性 | 全局 → Treasury Accounting Events |
| 治理 Token (JST) 持有人 | 📊 财务 → 🗳️ JST 价值循环 | Treasury |

---

## 自测报告

- ✅ 新增「披露边界声明」章节，明确 USDD 不对标 Sky 生态级披露，只覆盖"USDD 协议本身 + JST 价值循环 + 多链原生发行"，并列出 4 个剔除项及原因。
- ✅ 剔除 4 个 Sky 生态特有指标：P/E Ratio、资产负债表、运营支出明细分类、治理参与度。最终指标数 40 → 36。
- ✅ 「治理实证」维度因仅剩 JST staking 一项，重命名为「JST 价值循环」，更准确反映 USDD 业务实质。
- ✅ 维度索引表的指标数 / P0 / P1 / P2 / 合计已同步更新（合计 36 / 5 / 21 / 10）。
- ✅ 页面职责分工的 USDD Treasury 行已移除被剔除项。
- ✅ 第二批补齐清单已移除「运营支出明细分类」。
- ✅ 受众对应表的"机构投资者"与"JST 持有人"行已同步替换"治理实证" → "JST 价值循环"。
- ✅ 剩余 36 行指标的内容（指标名、意义、口径、放置方式、优先级）100% 保留，未做语义修改。
- ✅ 修复"第一批优先补齐指标 (P0)"与"优先级一句话总结"前后不一致问题：删除孤项 Peg Deviation、核心池倾斜度（这两项未在详表中作为独立 P0 行存在），P0 清单从 7 项收敛到与详表一致的 5 项；页面职责分工 Data / Overview 行同步删除孤项。
- ✅ 第一批 P0 补充第 6 项：「抵押品结构占比」从 P1 升级为 P0（与 CR / Debt at Risk 同等关键 — 决定 USDD 是否过度依赖单一资产），P0 总数 5 → 6；🛡️ 安全 & 锚定维度 P0 数 2 → 3，P1 数 4 → 3；总合计 P0 5 → 6，P1 21 → 20，总数 36 不变。
- ⚠️ 维度划分基于产品语义（用户决策路径），可能与未来基线 PRD 的章节划分不完全一致；若 baseline-merge 时发现冲突，以基线 PRD 为准。
- ⚠️ 部分指标存在跨维度归属（如 Stability Fee 收入既是"参数治理"也是"财务"），文档优先按"主要受众视角"归类，未做双归。
- ⚠️ 「USDD 独有差异化指标」（多链原生、抵押品多样性、Tron 生态集成）暂未写入本文，建议在独立的"USDD 数据透明差异化优势"文档中展开。
