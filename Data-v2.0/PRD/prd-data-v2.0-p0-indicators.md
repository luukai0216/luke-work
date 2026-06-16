# PRD（轻量版）：Data v2.0 — P0 核心指标补齐

> **版本**：v5 | **作者**：Rain.Liu | **日期**：2026-06-09 | **状态**：草稿
> **关联文档**：
> - 缺口分析：[sky-dashboard-missing-core-metrics.md](./sky-dashboard-missing-core-metrics.md)
> - 原型预览：[p0-indicators-preview.html](./p0-indicators-preview.html)
> - 基线 PRD：[data.md](./../../modules/website/data.md)
> - 设计规范：[design.md](./../../design.md)

---

## 1. 背景与目标

**背景**：USDD 当前 Transparency 三页（`/data`、`/sa`、`/treasury`）以"静态储备 + Smart Allocator 证明 + 季度财报"为主，对"USDD 此刻是否安全 / 是否锚定 / 抗风险能力如何"缺少实时披露。Sky 生态对标分析识别 36 项缺口（详见关联文档），本轮聚焦其中 5 个 P0 指标。

**目标**：让用户进入 `/data` 后 1 分钟内能回答 3 个核心问题 ——
1. USDD 当前是否被足额支撑？（CR + 抵押品结构占比）
2. 锚定压力来自哪里？（PSM 净流量）
3. 极端行情下风险敞口多大？（仓位健康度 + Debt at Risk）

**架构基础认知**：USDD 沿用 MCD 体系，**PSM 与 SA 是特殊 ilk**（LR=100% / 1:1 锚定 / 不可清算），与 TRX、WBTC 等真 CDP ilk 共用 Vat 数据结构，参与 CR / 抵押品结构等聚合指标时**口径完全一致**。本 PRD 所有计算复用现有 Collateral List 中各 ilk 的 `Collateral Value` 和 `Debt` 字段，不重新设计统计逻辑。

---

## 2. 目标用户与场景

**目标用户**：普通持币人（50%）/ Vault 借款人（15%）/ 套利者 & Keeper（10%）/ 机构研究员（15%）/ 内部风控（10%）

**核心场景**：
- **场景 1（普通持币人）**：市场剧烈波动（如 TRX 单日跌幅 > 10%）时，进入 Overview Tab 1 分钟内判断协议是否仍被足额支撑、清算压力多大
- **场景 2（套利者）**：DEX 上 USDD 价格偏离 1，看对应链 Tab 的 PSM 净流量是 Mint 主导还是 Redeem 主导，判断套利空间是否被竞争者吃完
- **场景 3（机构研究员 / 风控自查）**：进入 TRON Tab 检查健康度分布、Debt at Risk，识别潜在风险并复制 urn 跳 app.usdd.io 进一步分析

---

## 3. 方案描述

### 3.1 功能说明

5 个 P0 指标（+ 新增 F-06 Vault Risk Summary）按"业务实质"分布到两个入口：**Chain Analytics 页面**（沿用 `/data?chainType=overview|tron|eth|bsc` 架构，呈现链上供应与抵押结构）和**新增 Protocol Health 专属页面**（`/data/protocol-health`，集中呈现协议风险指标）。导航栏 "Data" 菜单扩展为两个子菜单项（详见 §4.1）。各 Tab 按"该链业务范围"差异化展示模块（详见 §4）。

| 编号 | 功能 | 展示位置 | 备注 |
| --- | --- | --- | --- |
| F-01 | 全局抵押率 CR | **Protocol Health 专属页面**（全宽折线图，带链筛选器 All / TRON / ETH / BSC + 时间选择器，默认 1Y） | Chain Analytics Overview Tab 不展示 CR；CR 是 Protocol Health 页面核心指标 |
| F-02 | 抵押品结构占比 | **Protocol Health 专属页面**（Collateral Composition Donut + 图例，与 DaR 并排，链筛选器联动） | Chain Analytics 不再展示 Donut |
| F-03 | PSM 净流量 | **各链 PSM 抵押品详情页**（改造现有 PSM Volume 图为 "Mint / Redeem Trend" 柱状图，时间选择器 7D/1M/6M/1Y/All + 底部时间轴） | Supply & Flow 图不新增 PSM Net Flow Tab；Overview Tab 不建 PSM Activity Section |
| F-04 | 仓位健康度分布 | **加密抵押品详情页**（TRX-A / TRX-B / TRX-C / sTRX-A / WBTC-A / WBTC-B / ETH-A 等） | 主 Tab 均不展示；PSM / SA 详情页不加（无清算风险）；BNB 无 Vault 不适用 |
| F-05 | Debt at Risk | **Protocol Health 专属页面**（DaR 风险曲线 + 链筛选器 + 抵押品筛选器 + 明细表） | 与 F-01 / F-02 同页，不在 Chain Analytics 展示 |
| F-06 | Vault Risk Summary | **Protocol Health 专属页面**（Vault Risk Summary 表，带链筛选器，含健康度分桶可视化色条 + Critical / High 汇总） | 新增模块；与 F-04 详情页互为聚合与下钻关系 |

> **布局原则**：
> - **Chain Analytics（/data）** 专注链上供应与抵押结构数据（Supply & Flow 折线图、Collateral Analytics 折线图、Allocated Asset Distribution），**不展示任何协议风险内容**（无 PSM Net Flow Tab、无 Collateral Ratio Tab、无 Risk Snapshot）。
> - **Protocol Health（/data/protocol-health）** 集中承载全链聚合风险视图（F-01 CR / F-02 Donut / F-05 DaR / F-06 Vault Risk Summary），通过链筛选器满足"按链查看"诉求，避免两个页面重复渲染。
> - **主链 Tab（TRON / ETH / BSC，仅 Chain Analytics 内）** 不新增任何风险模块，保持现有结构（KPI + 折线图 + Collateral List）不变。
> - **F-04 健康度分布** 粒度最细（per-ilk），自然属于各加密抵押品的详情页，而非主 Tab 聚合视图。
> - **数据复用原则**：所有指标基于现有 Collateral List 的 `Collateral Value` / `Debt` 字段聚合，**不重新设计计算逻辑**；前端做加总和分组展示即可。

### 3.2 用户流程

**主流程（普通用户 — 安全判断）**：

```
进入 usdd.io/data（默认 Chain Analytics · Overview Tab）
 → KPI 区（保持现有不变）
 → Supply & Flow 折线图（时间选择器 7D/1M/6M/1Y/All + 底部时间轴）
 → Collateral Analytics 折线图（时间选择器联动）
 → 导航栏 Data ▾ → 点击 "Protocol Health"
     → 4 张 KPI 卡：CR 172.4% HEALTHY / Critical Vault Debt $18.4M / DaR@-20% $394M / Largest Asset TRX
     → 全宽 CR 折线图（可按链筛选 All / TRON / ETH / BSC，时间选择器默认 1Y）
     → Collateral Composition Donut（F-02）+ DaR 风险曲线（F-05，按链+抵押品筛选）
     → Vault Risk Summary 表（F-06，可按链筛选）
 → 完成"USDD 此刻是否安全"判断
```

**分支流程（研究员 / 风控 — 仓位健康下钻）**：

```
Protocol Health 页面发现 CR 或 DaR 数字异常
 → 切换链筛选器定位具体链（All / TRON / ETH / BSC）
 → Vault Risk Summary 表查看各 ilk 风险等级分布
 → 导航栏 → 点击 "Chain Analytics" → 进入 TRON Tab → Collateral List
 → 点击目标 ilk（如 TRX-A）进入详情页
 → 查看仓位健康度分布（F-04，4 桶单色柱状图 + Top 5 极危表）
 → 点击 🔴 极危仓位 Top 5 → 复制 urn 跳 app.usdd.io
```

**分支流程（套利者 — PSM 净流量判断）**：

```
任意链 Tab → Collateral List → PSM-USDT-A 详情页
 → 查看改造后的 Mint / Redeem Trend 图（双色柱状图，时间选择器 7D/1M/6M/1Y/All）
 → 判断当前套利方向是否饱和
```

### 3.3 业务规则

| 编号 | 规则 | 说明 |
| --- | --- | --- |
| **通用** |  |  |
| BR-01 | 价格统一 OSM | 所有指标用 OSM 价格（带 1h hop），tooltip 必须明示 |
| BR-02 | 数据复用现有统计 | CR / 抵押品结构 / 各 ilk Collateral Value 与 Debt 直接复用现有 Collateral List 的统计口径，**前端只做加总与分组**，不重新设计计算 |
| BR-03 | 刷新频率 | 链上数据 ≤ 60s 刷新 |
| BR-04 | 时间窗对齐 | 自然日，7D / 30D / 90D 同理 |
| BR-05 | 假设数据保护 | 上线前 mock 数据必须标注「假设数据」橙色徽章 |
| BR-06 | F-01 CR 展示位置 | F-01 CR 展示在 **Protocol Health 专属页面**，全宽折线图，支持链筛选器（All / TRON / ETH / BSC）+ 时间选择器（7D/1M/6M/1Y/All，默认 1Y）；**Chain Analytics 的 Collateral Analytics 图不含 Collateral Ratio Tab**；Chain Analytics 各链 Tab 均不展示 CR；KPI 卡展示当前 CR 数值 + 状态标签（Healthy / Stable / Warning） |
| BR-07 | N/A 模块隐藏 | 该页面无对应业务的模块直接不渲染，不显示"暂无数据"占位；Chain Analytics 主链 Tab（TRON / ETH / BSC）无风险模块；PSM / SA 详情页无 F-04 Health Distribution Tab（无清算风险）；Chain Analytics Overview Tab 不展示 Collateral List；Protocol Health 页面 BSC 链筛选时 DaR 图显示空态文案"No active CDP vaults on BSC" |
| BR-08 | 不做主动告警样式 | 抵押品结构 / 集中度等模块**只客观呈现数据**，不预设阈值告警色或风险提示框；CR 状态色（BR-CR-03）和健康度桶色（BR-HEA-03）属于"指标本身的内置语义"，不在此限 |
| **F-01 CR**（PSM / SA 视为特殊 ilk 一并加和） |  |  |
| BR-CR-01 | 分子分母口径 | CR 分子 = Σ_ilk Collateral Value（所有 ilk，含 TRX-A/B/C、sTRX-A、WBTC-A/B、PSM-USDT-A、SA001-A 等）；CR 分母 = Σ_ilk Debt（即 USDD 总流通）。完全复用现有 Collateral List 字段 |
| BR-CR-02 | SA / PSM 数据口径 | SA001-A 与 PSM-USDT-A 的 Collateral Value 直接取链上 Vat 当前值（已由 oracle / 治理 NAV 喂入），前端不做额外口径调整；后端需保证 SA NAV 取保守值（已实现收益 + 持仓本金，不计 unrealized PnL） |
| BR-CR-03 | 状态分级 | ≥150% Healthy / 110–150% Stable / <110% Warning |
| **F-02 抵押品结构占比** |  |  |
| BR-COL-01 | 按 token 分类（不合并） | 分类粒度按 token：**TRX**（TRX-A/B/C）/ **sTRX**（sTRX-A）/ **WBTC**（WBTC-A/B）/ **USDT**（各链 PSM-USDT + USDT-A，如有）/ **USDC**（各链 PSM-USDC，如有）/ **SA001**（含 SA001-A，未来 SAxxx-A 各自独立分类）/ **其他**。 |
| BR-COL-02 | 跨链同名合并（默认 All） | Protocol Health Donut 默认 All 时：TRON-WBTC 与 ETH-WBTC 同归"WBTC"；TRON-PSM-USDT 与 ETH-PSM-USDT 同归"USDT"（同原 Overview Tab 聚合逻辑） |
| BR-COL-03 | Donut 链筛选 | Donut 在 Protocol Health 专属页面展示，带链筛选器（All / TRON / ETH / BSC）；默认 All 显示跨链聚合（BR-COL-02）；切换单链后 Donut 数据只统计该链资产，**鼠标移入色块悬浮展示该 token 的美元价值和占比百分数，精确至小数点后两位** |
| BR-COL-04 | 客观呈现，不告警 | Donut 段与拆解表只展示占比数字与颜色（按 token 固定配色），**不基于占比阈值变色 / 不弹风险提示框 / 不发外部通知**。集中度风险由用户自行判断 |
| **F-03 PSM 净流量** |  |  |
| BR-PSM-01 | 方向定义 | 正值 = Mint 主导（USDD 需求上升）；负值 = Redeem 主导（USDD 赎回压力） |
| BR-PSM-02 | 桥转出不计 | 用户跨链转 USDD 不算 PSM 净流量 |
| BR-PSM-03 | decimal 归一化 | USDT/USDC/DAI decimal 不同，跨链汇总前统一到 18 位 |
| BR-PSM-04 | 展示策略 | F-03 PSM 净流量**仅在各 PSM 抵押品详情页**展示（"Mint / Redeem Trend" 柱状图，时间选择器 7D/1M/6M/1Y/All）；**Chain Analytics Supply & Flow 图不新增 PSM Net Flow Tab**；**不建 PSM Activity Section**；跨链汇总不在单独页面提供 |
| **F-04 仓位健康度分布** |  |  |
| BR-HEA-01 | 健康度公式 | `health = (urn.ink × pip) / (urn.art × rate × Spot.ilks[i].mat)` |
| BR-HEA-02 | 多 ilk 分算 | 各真 CDP ilk 的 LR 不同（TRX-A 175% / TRX-B 130% 等），按 ilk 算 health 再聚合 |
| BR-HEA-03 | 分桶规则 | 🔴 Critical <1.05 / 🟠 High Risk 1.05–1.15 / 🟡 Moderate 1.15–1.40 / 🟢 Safe ≥1.40 |
| BR-HEA-04 | 特殊 ilk 排除 | PSM-USDT-A、SA001-A、USDT-A 等特殊 ilk（LR=100%、1:1 锚定）不参与健康度分布计算，仅真 CDP ilk（TRX-A/B/C、sTRX-A、WBTC-A/B/C、ETH-A/B/C等）纳入 |
| BR-HEA-05 | sTRX 价格 | 用 sTRX/USD 复合预言机（含 staking 兑换率），不直接用 TRX 价 |
| BR-HEA-06 | 适用范围 | 仅在加密抵押品详情页展示（TRX-A / TRX-B / TRX-C / sTRX-A / WBTC-A / WBTC-B / ETH-A 等真 CDP ilk 各自详情页）；主 Tab（Overview / TRON / ETH / BSC）**均不展示**；PSM / SA 详情页不加（无清算风险，BR-HEA-04） |
| **F-05 Debt at Risk** |  |  |
| BR-DAR-01 | 默认场景 | 4 档：-5% / -10% / -20% / -30% |
| BR-DAR-02 | 冲击模式 | 全市场冲击（Protocol Health 页面默认，全链聚合）/ 关联冲击（TRX → sTRX 联动跌，高级，本轮不强制） |
| BR-DAR-03 | 特殊 ilk 排除 | PSM、SA 等 1:1 锚定 ilk 不在 DaR 范畴；peg risk 是另一类风险 |
| BR-DAR-04 | 与坏账区分 | DaR = "进入清算的债务"，不等于坏账。坏账 = DaR ×（1 − 拍卖回收率），tooltip 明示 |
| BR-DAR-05 | 适用范围 | 仅在 **Protocol Health 专属页面**展示；支持链筛选器（All / TRON / ETH / BSC）+ 抵押品筛选器（All / TRX / WBTC / sTRX）；WBTC 拆分为 WBTC-A（TRON）和 WBTC-B（ETH）；Chain Analytics 各 Tab 均不展示 DaR |

### 3.4 计算公式与数据源

#### F-01 全局抵押率 CR

**公式**：

```
CR = Σ_ilk Collateral Value (USD) ÷ Σ_ilk Debt (USDD)
```

**数据源**：

| 字段 | 来源 | 取值方法 |
| --- | --- | --- |
| 各 ilk Collateral Value | 现有 Collateral List 接口 | `GET /data-platform/latest-collateral?chain=all` 返回 `items[].collateralValue` |
| 各 ilk Debt | 同上 | `items[].debt` |
| PSM / SA NAV 已喂值 | 链上 Vat + oracle（后端已处理） | 前端无需额外调用 |

**取值规则**：
- 遍历所有 ilk（含 TRX-A/B/C、sTRX-A、WBTC-A/B、USDT-A、PSM-USDT-A、SA001-A 等），不做去重也不分段
- 分子是 USD 总额，分母是 USDD 总流通
- 实测验算（基于 2026-05-28 截图数据）：分子约 $1,979M / 分母约 $1,149M → CR ≈ 172%
- 输出小数位：百分比保留 2 位
- 30 天历史曲线：按天 snapshot 同一字段

**实时性**：≤ 60s（沿用 Collateral List 刷新频率）

---

#### F-02 抵押品结构占比

**公式**：

```
占比[token_i] = Σ_(ilk ∈ token_i) Collateral Value ÷ Σ_all Collateral Value
```

**数据源**：

| 字段 | 来源 |
| --- | --- |
| 各 ilk Collateral Value | 同 F-01（复用 Collateral List） |
| ilk → token 分组映射 | 前端配置表（按 BR-COL-01） |

**ilk → token 映射表**：

| token 分类 | 包含 ilk |
| --- | --- |
| TRX | TRX-A, TRX-B, TRX-C |
| sTRX | sTRX-A |
| WBTC | WBTC-A, WBTC-B（+ ETH-WBTC 若有） |
| USDT | PSM-USDT-A, USDT-A（+ ETH/BSC PSM-USDT 若有） |
| USDC | ETH/BSC PSM-USDC（若有） |
| SA001 | SA001-A（未来 SAxxx-A 各自独立分类） |
| 其他 | 上述外的 ilk 兜底 |

**取值规则**：
- 单链 Tab：Donut 只统计该链 ilk（BR-COL-03）
- Overview Tab：跨链同名合并（BR-COL-02），如 TRON-WBTC + ETH-WBTC 同归 "WBTC"
- 段配色：按 token 固定调色板，不基于占比变色（BR-COL-04）

**实时性**：≤ 60s
---

#### F-03 PSM 净流量

**公式**：

```
Net Flow (window) = Σ_chain Σ_psm (SellGem.value − BuyGem.value)
                      其中 block.timestamp ∈ window
```

**数据源**：

| 字段 | 链上合约 | 事件 / 字段 |
| --- | --- | --- |
| Mint 量（用稳定币换 USDD） | DssPsm（TRON / ETH / BSC） | `event SellGem(address owner, uint256 value, uint256 fee)` |
| Redeem 量（用 USDD 换稳定币） | 同上 | `event BuyGem(address owner, uint256 value, uint256 fee)` |
| 活跃地址数 | 同上 | unique addresses of SellGem.owner ∪ BuyGem.owner |

**取值规则**：
- 单位：以 USDD 计（value 字段已是 USDD 单位）
- value 已扣 fee（按 DssPsm 标准实现）
- USDT / USDC decimal 不同，跨链汇总前归一化到 18 位（BR-PSM-03）
- 桥转出不算（BR-PSM-02）
- 时间窗： 7d / 1M / 6M /滚动窗口（非自然日）

**实时性**：事件实时（监听新区块）+ 60s 滚动重算

---

#### F-04 仓位健康度分布

**公式**：

```
对每个真 CDP ilk i 的每个活跃 urn u：
  health = (urn.ink × pip_price[i]) ÷ (urn.art × rate[i] × Spot.ilks[i].mat)

分桶：
  🔴 极危：health < 1.05
  🟠 高风险：1.05 ≤ health < 1.15
  🟡 中等：1.15 ≤ health < 1.40
  🟢 安全：health ≥ 1.40
```

**数据源**：

| 字段 | 链上合约 | 取值方法 |
| --- | --- | --- |
| `urn.ink`（抵押品数量） | Vat | `Vat.urns(bytes32 ilk, address urn).ink` |
| `urn.art`（标准化债务） | Vat | `Vat.urns(...).art` |
| `rate`（累计利率） | Vat | `Vat.ilks(bytes32 ilk).rate` |
| `mat`（清算线） | Spot | `Spot.ilks(bytes32 ilk).mat`（RAY 单位） |
| `pip_price`（资产价格） | Spot / OSM | `Spot.ilks(ilk).pip.read()` 或后端聚合 |
| **活跃 urn 全量列表** | ⚠️ **CDP indexer**（依赖项） | 需后端提供全量索引 API |

**取值规则**：
- 仅真 CDP ilk 纳入：TRX-A/B/C、sTRX-A、WBTC-A/B等
- 特殊 ilk 排除：PSM-USDT-A、SA001-A，USDT- A 等（LR约等于100% 无清算意义，BR-HEA-04）
- sTRX 价格用 sTRX/USD 复合预言机（含 staking 兑换率，BR-HEA-05）
- 多 ilk LR 不同，必须按 ilk 算 health 再聚合（BR-HEA-02）
- 桶下钻 Top 20：按 health 升序取前 20，字段含 urn 地址 / ilk / 债务 / health / 清算价

**前置依赖**：CDP urn 全量索引（自测 ⚠️ 1）

**实时性**：≤ 60s

---

#### F-05 Debt at Risk

**公式**：

```
对每个价格冲击场景 s ∈ {-5%, -10%, -20%, -30%}：

  DaR[s] = Σ { urn.art × rate[i]
              | (urn.ink × pip[i] × (1+s)) / (urn.art × rate[i]) < Spot.ilks[i].mat,
                ilk i 属于真 CDP }
```

**数据源**：复用 F-04 全部链上数据（urn / pip / mat / rate / art），叠加价格冲击模拟（后端预计算）

**冲击模式**：

| 模式 | 含义 | 默认应用 |
| --- | --- | --- |
| 全市场冲击 | 所有非稳定币抵押品同跌 X% | Overview Tab 默认 |
| 关联冲击 | TRX → sTRX 联动跌（强相关 ≥ 0.95） | 高级模式（本轮不强制） |

**取值规则**：
- 仅真 CDP ilk 参与（PSM / SA 排除，BR-DAR-03）
- 风险曲线（连续场景）：后端预计算 -50% 到 0% 区间 11 个采样点
- DaR ≠ 坏账：tooltip 明示「坏账 ≈ DaR × (1 − 拍卖回收率)」（BR-DAR-04）
- 单位：以 USDD 计

**前置依赖**：同 F-04（CDP urn indexer）

**实时性**：≤ 60s（与 F-04 同步）

---

#### 接口归并建议

为减少前端请求次数，建议后端将 F-01 / F-02 合并为一个接口：

```
GET /api/data/collateral-overview?scope={overview|tron|eth|bsc}
↓ 返回
{
  ilks: [
    { name: "TRX-A", token: "TRX", collateralValue: 458985089, debt: 170430000, ... },
    { name: "SA001-A", token: "SA001", collateralValue: 649434232, debt: 649430000, ... },
    ...
  ],
  cr: { value: 1.72, status: "Stable" },
  composition_history_90d: [...]  // 按天 snapshot
}
```

F-03 / F-04 / F-05 独立接口（详见 §6 接口建议表）。

---

## 4. UI / 交互说明

### 4.1 页面入口与导航

**导航栏 "Data" 菜单变更**（🆕 本轮新增子菜单结构）：

```
Data ▾
├── Chain Analytics    Multi-chain supply and collateral metrics   → /data?chainType=overview
└── Protocol Health    Vault risk and collateral safety            → /data/protocol-health
```

**Chain Analytics（原 /data）**：
- 沿用现有架构：`/data?chainType={overview|tron|eth|bsc}` 单页多 Tab
- Tab 沿用现状：`Overview` / `TRON` / `ETH` / `BSC` 共 4 个 Tab（**不新增 Tab，不加 BTTC**）
- 默认 Tab：保持现状（不改业务规则 BR-DATA-03，沿用当前默认逻辑）
- 链 Tab 切换语义：`Overview` = 全链聚合供应视图；`TRON / ETH / BSC` = 该链 view

**Protocol Health（🆕 新增页面）**：
- URL：`/data/protocol-health`
- 面包屑：`Data / Protocol Health`
- 单页面，无 Tab 切换；风险相关筛选器在各模块内部（链筛选器 + 抵押品筛选器）

### 4.2 Chain Analytics Tab 通用结构

Chain Analytics 页面各 Tab 沿用同一信息流（自上而下），**不包含任何风险模块**：

```
[链 Tab 选择器（沿用）]
[KPI 区]                       ← 各 Tab 卡数不同，本轮不新增
[Supply & Flow 折线图]         ← 沿用（含时间选择器 7D/1M/6M/1Y/All + 底部时间轴）
[Collateral Analytics 折线图]  ← 沿用（含时间选择器）
[Allocated Asset Distribution] ← 沿用（仅 Overview Tab）
[Collateral List]              ← 沿用（主链 Tab 展示，Overview Tab 不展示）
```

> 注：**Supply & Flow 图不新增 PSM Net Flow Tab；Collateral Analytics 图不新增 Collateral Ratio Tab；Overview Tab 不展示 Risk Snapshot Section / PSM Activity Section。**

### 4.3 各页面模块矩阵

| 模块 | Chain Analytics Overview Tab | Chain Analytics 主链 Tab（TRON/ETH/BSC） | Protocol Health 专属页面 | 加密抵押品详情页 | PSM 抵押品详情页 |
| --- | --- | --- | --- | --- | --- |
| KPI 卡数 | 3 张（现有不变） | 3 张（TRON）/ 4 张（ETH/BSC）现有不变 | 4 张（🆕 CR / Critical Vault Debt / DaR@-20% / Largest Asset） | — | 3 张（Total Collateral Value / Total Debt / Current Overcollateralization） |
| Supply & Flow 折线图 + 时间选择器 | ✓（现有，**无 PSM Net Flow Tab**） | ✓ 同左 | ❌ | 沿用现有（单 ilk 趋势） | 沿用现有 |
| Collateral Analytics 折线图 + 时间选择器 | ✓（现有，**无 Collateral Ratio Tab**） | ✓ 同左 | ❌ | ❌ | ❌ |
| Allocated Asset Distribution Donut | ✓（仅 Overview Tab，现有） | ❌ | ❌ | ❌ | ❌ |
| **🆕 F-01 CR 折线图** | ❌ | ❌ | ✓（全宽，链筛选器 + 时间选择器，默认 1Y） | ❌ | ❌ |
| **🆕 F-02 Collateral Composition Donut** | ❌ | ❌ | ✓（与 DaR 并排，链筛选器联动） | ❌ | ❌ |
| **🆕 F-03 PSM Mint/Redeem Trend** | ❌ | ❌ | ❌ | ❌ | ✓（"Mint / Redeem Trend" 图，时间选择器 7D/1M/6M/1Y/All + 底部时间轴） |
| **🆕 F-04 仓位健康度分布** | ❌ | ❌ | ❌ | ✓（Health Distribution Tab 嵌入 Vault Risk 图；4 桶单色柱状图 + Top 5 极危表；无 KPI 卡 / 无图例 / 无时间筛选） | ❌（PSM 无清算风险） |
| **🆕 F-05 Debt at Risk** | ❌ | ❌ | ✓（DaR 风险曲线，链筛选器 + 抵押品筛选器） | ❌ | ❌ |
| **🆕 F-06 Vault Risk Summary 表** | ❌ | ❌ | ✓（链筛选器，健康度分桶色条，Critical/High 汇总） | ❌ | ❌ |
| Collateral List（沿用） | ❌ Overview Tab 不展示 | ✓ 该链 ilks | ❌ | — | — |

### 4.4 Chain Analytics · Overview Tab 布局

| 顺序 | 区域 | 状态 | 说明 |
| --- | --- | --- | --- |
| 1 | KPI 区（3 张，现有不变） | 沿用，不新增 | Total Supply 全链 / 总抵押全链 / Earn APY 加权 |
| 2 | Supply & Flow 折线图 | 沿用 + 时间选择器 | 时间选择器 7D/1M/6M/1Y/All + 底部时间轴拖动器（联动）；**不新增 PSM Net Flow Tab** |
| 3 | Collateral Analytics 折线图 | 沿用 + 时间选择器 | 时间选择器同 Supply & Flow；**不新增 Collateral Ratio Tab** |
| 4 | Allocated Asset Distribution | 现有 | Donut 呈现全链资产分布（沿用现有组件）

### 4.5 TRON Tab 布局（保持现有结构不变）

| 顺序 | 区域 | 状态 | 说明 |
| --- | --- | --- | --- |
| 1 | KPI 区（3 张，现有不变） | 沿用，不新增 | Total Supply TRON / TRON Collateral / Earn APY |
| 2 | D03 折线图 | 现有 | 无变动 |
| 3 | Collateral List | 现有+扩展 | TRX-A/B/C, sTRX-A, WBTC-A/B, USDT-A, PSM-USDT-A, SA001-A 全量。点击各行进入详情页 → 加密抵押品详情页可查 F-04 仓位健康度；PSM 详情页可查 F-03 净流量 |

> **说明**：TRON 主 Tab 不新增任何风险模块。F-01 / F-02 / F-05 / F-06 在 Protocol Health 专属页面以全链聚合形式提供（可按链筛选）；F-03 TRON 单链数据在 PSM-USDT-A 详情页查看。

### 4.6 ETH Tab 布局（保持现有结构不变）

| 顺序 | 区域 | 状态 | 说明 |
| --- | --- | --- | --- |
| 1 | KPI 区（4 张，现有不变） | 沿用，不新增 | Total Supply ETH / ETH Collateral / Savings TVL / Earn APY |
| 2 | D03 折线图 | 现有 | 不变动 |
| 3 | Collateral List | 现有+扩展 | PSM 行（ETH-USDT / ETH-USDC 等）。点击进入 PSM 详情页可查 F-03 净流量；ETH vault（WBTC-A / ETH-A，即将上线）详情页可查 F-04 健康度 |

> **说明**：ETH 主 Tab 不新增任何 Risk Snapshot / PSM Activity Section。

### 4.7 BSC Tab 布局（保持现有结构不变）

与 ETH Tab 结构一致（仅链名 + 数据源不同），不重复描述。BSC 目前无 Vault 业务，F-04 不适用。

### 4.8 加密抵押品详情页布局（新增 F-04 区域）

适用 ilk：TRX-A / TRX-B / TRX-C / sTRX-A / WBTC-A / WBTC-B / ETH-A（即将上线）等所有真 CDP ilk 详情页。

| 顺序 | 区域 | 状态 | 说明 |
| --- | --- | --- | --- |
| 1 | 详情页头部（ilk 名称 / 参数卡） | 现有 | 沿用 |
| 2 | 现有折线图（如 Collateral Price / Stability Fee 趋势等） | 现有 | 沿用 |
| 3 | **Vault Risk 图**（含扩展 Health Distribution Tab） | 现有改造 | 原 "Collateral at Risk" 图卡重命名为 **"Vault Risk"**；保留原有 "Collateral at Risk" Tab，新增 **"Health Distribution" Tab**（🆕 F-04）。**Health Distribution Tab 内**：**无 KPI 卡 / 无图例 / 无时间筛选**；4 桶单色柱状图（🔴 Critical <1.05 / 🟠 High Risk 1.05–1.15 / 🟡 Moderate 1.15–1.40 / 🟢 Safe ≥1.40，每桶一色，Y 轴 = USDD 债务额）；柱状图下方附 **Top 5 极危仓位表**（urn / ilk / debt / health / 清算价 / 跳转 app.usdd.io） |

> **PSM / SA 详情页**：不渲染 Health Distribution Tab（BR-HEA-04 / BR-HEA-06）。

### 4.9 PSM 抵押品详情页布局（改造现有 PSM Volume 图）

适用页面：PSM-USDT-A 详情页（TRON）/ ETH-PSM-USDT 详情页 / BSC-PSM-USDT 详情页等所有 PSM ilk 详情页。

| 操作 | 说明 |
| --- | --- |
| **KPI 卡（3 张）** | **Total Collateral Value**（USDT 流动性池可兑换余额，悬浮 tooltip 说明）/ **Total Debt**（USDD minted via PSM）/ **Current Overcollateralization**（PSM LR=100% · 1:1 peg，绿色显示 100%） |
| **改造内容** | 现有 "PSM Volume" 折线图改造为 **"Mint / Redeem Trend" 柱状图**：Mint 正值柱（绿色）/ Redeem 负值柱（橙红色）；X 轴 = 时间，Y 轴 = 净流量（USDD）；Hover 显示当日 Mint / Redeem 值 |
| **数据源** | 同 F-03，但 scope = 当前 PSM ilk（单 PSM，非汇总） |
| **时间窗** | **7D / 1M / 6M / 1Y / All**（快捷按钮）+ 底部时间轴拖动器（联动） |
| **Total Collateral Value tooltip** | "This value represents the available USDT balance in the PSM-USDT-A liquidity pool. Users can redeem USDD for USDT up to this amount. Higher balance means greater redeemable liquidity." |

### 4.10 Protocol Health 专属页面视觉规范

**页面整体布局（自上而下）**：

| 顺序 | 区域 | 说明 |
| --- | --- | --- |
| 1 | 面包屑 | `Data / Protocol Health`，点击 `Data` 返回 Chain Analytics Overview |
| 2 | KPI 卡（4 张横排，无副标题文字） | **CR**（数值 + 状态标签 HEALTHY/STABLE/WARNING）/ **Critical Vault Debt**（$值，含 `?` hover tooltip 说明 Health Factor 公式）/ **DaR@-20%**（$值，全链聚合）/ **Largest Asset**（最大抵押品 token 名称） |
| 3 | CR 折线图（全宽） | 标题 "Collateral Ratio Trend"；顶部：链筛选器（All / TRON / ETH / BSC）+ 时间选择器（7D/1M/6M/1Y/All，默认 1Y）+ 底部时间轴；折线带状态色参考线（≥150% 绿 / 110–150% 橙 / <110% 红） |
| 4 | 双栏并排 | 左：Collateral Composition Donut（F-02，标题 + 图例，联动全局链筛选器）；右：DaR 风险曲线（F-05，连续曲线 X=-30%～0%；顶部：链筛选器 All/TRON/ETH/BSC + 抵押品筛选器 All/TRX/WBTC/sTRX；曲线下方表格含链徽章；WBTC 拆分 WBTC-A TRON / WBTC-B ETH） |
| 5 | Vault Risk Summary 表（全宽） | 标题 "Vault Risk Summary"；顶部：链筛选器（All / TRON / ETH / BSC）；列：Ilk / Chain / Vaults / Total Debt / Critical Debt (count) / High Risk Debt (count) / Risk Profile（4色分桶色条）；末行：汇总 Total 行；页脚：Health Factor 公式说明 + 风险分级色标；BSC 无 Vault 时显示空态提示 |

**Critical Vault Debt KPI 卡 tooltip 文案**：

```
Total debt held by vaults near liquidation.
A vault enters "Critical" when its Health Factor < 1.05.

Health Factor = (ink × OSM price) ÷ (art × rate × mat)

ink = collateral amount · OSM = on-chain price
art = debt shares · rate = debt accumulator · mat = liquidation ratio

When Health Factor drops below 1.0, the vault becomes eligible for liquidation.
```

### 4.11 交互行为

| 操作 | 触发方式 | 前置条件 | 结果 | 是否影响线上 |
| --- | --- | --- | --- | --- |
| Chain Analytics 链 Tab 切换 | 点击 Overview / TRON / ETH / BSC | — | URL `chainType` 同步变化；对应 Tab 数据刷新；各 Tab 不显示任何风险模块 | 否 |
| 时间选择器切换（Supply & Flow / Collateral Analytics） | 点击 7D/1M/6M/1Y/All 快捷按钮或拖动底部时间轴 | Chain Analytics 折线图已渲染 | 折线图数据范围更新；时间轴选择窗口同步移动 | 否 |
| Protocol Health 导航入口 | 点击导航栏 Data ▾ → Protocol Health | — | 跳转 `/data/protocol-health`，面包屑显示 `Data / Protocol Health` | 否 |
| Protocol Health 链筛选器切换 | 点击 All / TRON / ETH / BSC | Protocol Health 页面已渲染 | CR 折线图、Donut、DaR 曲线、Vault Risk 表数据全部跟随刷新；BSC 时 DaR 显示空态"No active CDP vaults on BSC" | 否 |
| DaR 抵押品筛选器切换 | 点击 All / TRX / WBTC / sTRX | Protocol Health DaR 区域 | DaR 曲线和明细表只计算选中抵押品；当前链不含所选品种则自动重置为 All | 否 |
| Critical Vault Debt `?` hover | 鼠标悬停 `?` 图标 | Protocol Health 页面 | 弹出 tooltip 展示 Health Factor 公式 + 字段说明 | 否 |
| Total Collateral Value `?` hover（PSM 详情页） | 鼠标悬停 `?` 图标 | PSM 详情页 | 弹出 tooltip 说明该值为 USDT 流动性池可兑换余额 | 否 |
| Donut 段 hover（F-02） | 鼠标悬停 | Protocol Health Donut 已渲染 | 显示 token 名 + 占比（精确 2 位小数）+ USD 值 | 否 |
| Donut 段点击（F-02） | 点击段 | 段值 > 0 | 下钻弹出该 token 的 ilk 明细 tooltip | 否 |
| Health Distribution Tab 桶柱 hover（F-04） | 鼠标悬停 | 加密抵押品详情页 Vault Risk 图已切到 Health Distribution Tab | 显示该桶 USDD 债务额 | 否 |
| urn 行点击（F-04 Top 5 表） | 点击 Top 5 表格行 | — | 在新标签页跳转 `app.usdd.io/vault/{urn}`（`target=_blank rel=noopener`） | 否 |
| 时间选择器切换（PSM Mint/Redeem Trend） | 点击 7D/1M/6M/1Y/All 或拖动时间轴 | PSM 详情页 | 刷新 Mint / Redeem Trend 图，不影响 KPI 卡 | 否 |

### 4.12 状态色映射（沿用 design.md）

仅以下两类指标具有"内置语义状态色"，**抵押品结构 / 集中度不做状态色**：

| 状态 | 色 token | 应用场景 |
| --- | --- | --- |
| 健康 | `success #448f6a` / `brand-hi ````````````````````````````````````````````````````````````````#81deb0` | CR ≥ 200%、🟢 桶 |
| 中性 | `info ````````````````````````````````````````````````````````````````#0d9488` | 🟡 桶 |
| 警告 | `warning ````````````````````````````````````````````````````````````````#ff8f0b` | CR 110–150%、🟠 桶、DaR > 30% |
| 危险 | `danger ````````````````````````````````````````````````````````````````#d73133` | CR < 110%、🔴 桶、DaR > 50% |

> **Donut 段配色**：按 token 类型用 **固定调色板**（如 TRX 红、WBTC 橙、USDT 绿、USDC 蓝、SA001 青、其他灰），**不基于占比阈值变色**（BR-COL-04）。

### 4.13 移动端响应式（< 768px）

| 桌面模块 | 移动端降级 |
| --- | --- |
| KPI 区（Chain Analytics 各 Tab，不新增卡） | 横向滚动卡片列表，或 2 列 × 2–3 行网格 |
| Supply & Flow 折线图（含时间选择器） | 时间选择器收起为下拉；图表高度缩减至 200px |
| Collateral Analytics 折线图（含时间选择器） | 同上 |
| Protocol Health KPI 卡（4 张） | 2 列 × 2 行网格 |
| CR 折线图（全宽，含链筛选器 + 时间选择器） | 链筛选器置于图表上方全宽；图高缩减至 200px |
| Donut（F-02）\ | DaR 曲线（F-05）双列 | 竖向堆叠（Donut 在上，DaR 在下） |
| Vault Risk Summary 表（F-06） | 横向滚动表格 |
| F-03 Mint/Redeem Trend 柱状图（PSM 详情页） | 默认 7D；时间选择器收起为下拉 |
| F-04 极危 Top 5 表（加密抵押品详情页） | 表格改为卡片列表 |
| F-05 风险曲线（Protocol Health） | 简化为 4 场景 KPI（隐藏连续曲线） |

### 4.14 多链信息架构原则

为防止后续新增指标继续挤压 KPI 区，本 PRD 确立以下原则：

| 原则 | 说明 |
| --- | --- |
| **顶部 KPI 区不新增** | 本轮所有新增指标均以 Section 内"摘要卡"形式嵌入所在报表区域，不在顶部 KPI 卡池中扩张；如后续确需新增顶部 KPI，必须单独评审 |
| **全局指标 Overview 集中** | 全链聚合风险指标（CR / 抵押品结构 / DaR）集中在 Overview Tab 的 Risk Snapshot Section，通过链筛选器满足"按链查看"诉求；主链 Tab 不重复展示，减少页面高度 |
| **N/A 模块隐藏** | 该 Tab 无业务对应的模块直接不渲染，不显示"暂无数据"占位卡 |
| **复用 D03 折线图承载新指标历史** | 新指标的"时间序列趋势"作为 D03 的新维度，不单独建图 |
| **新增 Section 必须有"业务实质"分组** | 如 Risk Snapshot（安全三件套，顶部含链筛选器）/ PSM Activity（锚定流量，Section 内含净流量 KPI 卡组），不堆"碎片化新模块" |
| **客观数据呈现优先** | 抵押品结构等模块只呈现数据，不主动加风险提示样式；用户的风险判断由 CR 状态色和 Vault 健康度桶（这两类指标本身有内置语义）承担 |

---

## 5. 异常与边界

| 场景 | 触发条件 | 预期表现 |
| --- | --- | --- |
| 链上 RPC 超时 | 单链 RPC > 10s 无响应 | 该链相关卡片显示骨架屏 + "loading" 标签；其他链正常；BFF 自动重试 |
| CR 临时 < 110% | 价格短暂回调击穿红线 | Protocol Health KPI 卡状态变红（内置语义 Warning）+ 醒目提示（仅页面反馈，不触发外部通知） |
| CDP indexer 不完整 | F-04 / F-05 数据缺失 | 显示"数据正在同步"占位卡 + 上次成功更新时间戳 |
| Protocol Health BSC 链筛选 | 选择 BSC 链 | DaR 图显示"No active CDP vaults on BSC"；Vault Risk 表显示空态；CR / Donut 正常展示 BSC 数据 |
| Chain Analytics 主链 Tab 切换 | Tab 切换至 TRON / ETH / BSC | 各 Tab 均不渲染任何风险模块（无空占位） |
| 空态 — 某桶 0 Vault | 健康度某桶为空 | 桶柱状图高度为 0 + 显示数字 "0"；不显示下钻表 |
| 空态 — 桶下钻为空 | 点击桶但 Top 5 为空 | 显示"该桶暂无活跃 Vault"提示 |
| 加载态 | 接口请求中 | KPI 卡显示骨架屏 / 图表显示 spinner |
| 错误态 | 接口失败 | "数据加载失败，请稍后再试" + 上次成功更新时间戳 + 重试按钮 |
| 用户网络不通 | 全局加载失败 | 全局 toast 提示 + 重试按钮 |

---

## 6. 验收标准

| 编号 | 验收项 | 验收方式 | 通过条件 |
| --- | --- | --- | --- |
| AC-01 | F-01 CR 数值正确 | 手动测试 + Collateral List 字段加总核算 | CR = Σ Collateral Value ÷ Σ Debt（按基线表所列各 ilk 加总）；误差 ≤ 0.1% |
| AC-02 | F-01 CR 展示在 Protocol Health 专属页面 | 手动访问 `/data/protocol-health` | CR 全宽折线图存在，含链筛选器（All/TRON/ETH/BSC）+ 时间选择器（默认 1Y）；**Chain Analytics 的 Collateral Analytics 图不含 Collateral Ratio Tab**（BR-06） |
| AC-03 | F-01 状态分级正确 | 手动模拟 | KPI 卡状态标签（Healthy ≥150% / Stable 110–150% / Warning <110%）切换符合 BR-CR-03 |
| AC-04 | F-02 Token 粒度分类正确 | 视觉走查 | Protocol Health Donut 段为 TRX / sTRX / WBTC / USDT / USDC / SA001 / 其他（**TRX 与 sTRX 独立、USDT 与 USDC 独立**） |
| AC-05 | F-02 Donut 链筛选正确 | 数据对账 | Protocol Health Donut 默认 All 时总额 = 全链 ilk 聚合；切换单链时只统计该链资产（误差 ≤ 0.01%） |
| AC-06 | F-02 不做集中度告警样式 | 视觉走查 | 各 Donut 段均**不基于占比阈值变色**；段按 token 固定配色（BR-COL-04） |
| AC-07 | F-03 PSM 净流量准确 | 链上事件对账 | PSM 详情页 Mint/Redeem Trend 图数据与 indexer 原始事件一致（误差 ≤ 0.01%）；时间选择器 7D/1M/6M/1Y/All 各窗口均正确 |
| AC-08 | F-03 仅在 PSM 详情页展示 | 手动访问 Chain Analytics | Chain Analytics Supply & Flow 图**无 PSM Net Flow Tab**；F-03 净流量**仅出现在 PSM 抵押品详情页** |
| AC-09 | F-04 仅在加密抵押品详情页展示 | 手动访问各 ilk 详情页 | TRX-A / TRX-B / TRX-C / sTRX-A / WBTC-A / WBTC-B 详情页均有健康度分布 Section；PSM-USDT-A / SA001-A 详情页**无此 Section**；主 Tab 均**无**健康度分布（BR-HEA-06）；urn 数量与 web3-admin 对账一致（BR-HEA-04） |
| AC-10 | F-04 多 ilk LR 差异化 | 手动测试 | TRX-A / TRX-B 等不同 LR 的 ilk 健康度分别计算无串行 |
| AC-11 | F-04 / F-05 主 Tab 均不展示 | 手动切 Tab | Chain Analytics 所有主 Tab（Overview / TRON / ETH / BSC）**均不渲染** F-04 健康度分布；F-05 DaR **仅在 Protocol Health 专属页面**展示（BR-DAR-05）；Chain Analytics 各 Tab 无任何风险模块 |
| AC-12 | F-05 DaR 4 档计算 | 手动测试 | 4 档场景数字正确，曲线连续无跳变；PSM / SA 不在 DaR 范畴 |
| AC-13 | 链 Tab 切换数据刷新 | 手动测试 | Chain Analytics 切换 Tab 后对应区域数据刷新；切换至 TRON / ETH / BSC 时**各 Tab 均不渲染任何风险模块**（无空占位） |
| AC-14 | Chain Analytics KPI 区不新增 | 视觉走查 | 各 Tab 顶部 KPI 卡数保持现有不变（Overview/TRON = 3 张，ETH/BSC = 4 张）；CR 等风险指标**不在** Chain Analytics 顶部 KPI 区；各 Tab KPI 区下方**直接**是 Supply & Flow 折线图 |
| AC-15 | 首屏 LCP ≤ 2.5s | Lighthouse 4G 模拟 | LCP ≤ 2.5s |
| AC-16 | 全部 P0 加载完成 ≤ 5s | 手动 | 桌面 / 移动 均 ≤ 5s（活跃 urn ≤ 5,000 情况） |
| AC-17 | 异常场景全覆盖 | QA 全量回归 | §5 全部场景表现符合 PRD |
| AC-18 | 中 / 英 / 繁中 三语 | QA 视觉走查 | 全部 key 覆盖，无 fallback 显示，数字格式（千分位 / 小数位）一致 |
| AC-19 | 移动端响应式 | 多设备测试 | < 768px 时各模块降级方案符合 §4.13 |
| AC-20 | Chain Analytics Overview Tab 布局正确 | 视觉走查 | Overview Tab 有：① KPI 区（3 张，不新增）② Supply & Flow 折线图（**无 PSM Net Flow Tab**，含时间选择器）③ Collateral Analytics 折线图（**无 Collateral Ratio Tab**，含时间选择器）④ Allocated Asset Distribution；**无 Risk Snapshot Section / 无 PSM Activity Section / 不展示 Collateral List** |
| AC-21 | F-04 Vault Risk 图 Health Distribution Tab 布局正确 | 视觉走查 | 各加密抵押品详情页（TRX-A 等）的 Vault Risk 图含 "Health Distribution" Tab：**4 桶单色柱状图（无 KPI 卡 / 无图例）+ Top 5 极危表**，Tab 内无单独时间筛选器；桶范围：<1.05 / 1.05–1.15 / 1.15–1.40 / ≥1.40 |
| AC-22 | PSM 详情页 F-03 改造 | 视觉走查 | PSM-USDT-A 等 PSM 详情页：① 3 张 KPI 卡（Total Collateral Value + `?` tooltip / Total Debt / Current Overcollateralization）；② PSM Volume 图改造为 "Mint / Redeem Trend" 双色柱状图（时间窗 7D/1M/6M/1Y/All + 底部时间轴）；③ Total Collateral Value tooltip 文案完整展示 |
| AC-23 | Protocol Health 页面布局完整 | 手动访问 `/data/protocol-health` | 页面包含：① Breadcrumb `Data / Protocol Health`；② 4 张 KPI 卡（CR 状态色 / Critical Vault Debt `?` tooltip / DaR@-20% / Largest Asset）；③ 全宽 CR 折线图（链筛选器 All/TRON/ETH/BSC + 时间选择器默认 1Y + 底部时间轴）；④ 双列：Donut（F-02）+ DaR 风险曲线（F-05，链+抵押品筛选器）+ 明细表；⑤ Vault Risk Summary 表（F-06，链筛选器 + 健康度色条 + Total 行）；Critical Vault Debt tooltip HF 公式完整 |
| AC-24 | 导航 Data 二级菜单 | 手动访问 usdd.io | 导航栏 "Data ▾" 展开后显示两个子菜单项：**Chain Analytics**（副标题 "Multi-chain supply and collateral metrics"，点击跳 `/data?chainType=overview`）和 **Protocol Health**（副标题 "Vault risk and collateral safety"，点击跳 `/data/protocol-health`）；原 Data 单入口不保留 |

### 接口建议（参考）

| 端 | 接口路径 | 说明 |
| --- | --- | --- |
| 官网 BFF | `GET /api/data/cr` | 返回全局 CR + 30 天历史 + 按 ilk 拆解的 Collateral Value / Debt 明细（前端按 token 聚合） |
| 官网 BFF | `GET /api/data/collateral-composition?scope={overview\ | tron\ | eth\ | bsc}` | 返回按 token 分类的占比数据 + 90 天 stacked 历史；scope=overview 含跨链合并 |
| 官网 BFF | `GET /api/data/psm-flow?scope={overview\ | tron\ | eth\ | bsc}&window={24h\ | 7d\ | 30d}` | 返回 PSM 净流量；scope=overview 时按链 stacked |
| 官网 BFF | `GET /api/data/health-distribution?ilk={ilk_name}` | 返回指定 ilk 健康度分桶 + 极危 Top 20 详情；仅含真 CDP ilk |
| 官网 BFF | `GET /api/data/debt-at-risk?scope={overview}&mode={all\ | correlated}` | 返回 DaR 曲线 + 4 档场景值；仅含真 CDP ilk |

> 注：接口路径为建议，以前后端对接实际约定为准；前端逻辑不依赖具体路径。CR / 抵押品结构相关数据**应复用现有 Collateral List 接口**，避免重复实现。

---

## 变更记录

| 版本 | 日期 | 变更内容 | 变更人 |
| --- | --- | --- | --- |
| v1 | 2026-05-22 | 完整版 PRD 初稿（按 `prd-template.md` 14 节，含 6 个 P0 指标） | Rain.Liu |
| v2 | 2026-05-28 | **新增 §3.4 计算公式与数据源**：每个 P0 指标补充独立小节，含计算公式（伪代码块）、字段-合约-取值方法对应表、取值规则细节、实时性要求；F-02 补充 ilk → token 映射表；F-04 / F-05 列明 Vat / Spot 链上合约字段调用；末尾给出 F-01/F-02 接口归并建议（避免前端重复请求） | Rain.Liu |
| v3 | 2026-06-03 | **UI 布局架构重设计 — 按业务实质差异化各页面展示位置**：① F-01 CR / F-02 Donut / F-05 DaR 集中到 Overview Tab 的 Risk Snapshot Section，带链筛选器（All / TRON / ETH / BSC），主链 Tab 不新增 Risk Snapshot Section；② F-04 健康度分布改为仅在加密抵押品详情页展示（per-ilk），主 Tab 均不展示；③ F-03 PSM 净流量改为 Overview Tab 4 链汇总 + PSM 详情页改造现有 PSM Volume 图，主链 Tab 不新增 PSM Activity Section；④ 更新 BR-06 / BR-COL-03 / BR-PSM-04 / BR-HEA-06 / BR-DAR-02 / BR-DAR-05；⑤ 新增 §4.8 加密抵押品详情页布局 / §4.9 PSM 详情页布局；⑥ §4.3 Tab 矩阵改为 4 列含详情页；⑦ §4.5–4.7 主链 Tab 布局简化（保持现有结构）；⑧ 新增 AC-21 / AC-22 | Rain.Liu |

---

## 自测报告（v5）

**架构完整性**

- ✅ 两页架构（Chain Analytics / Protocol Health）贯穿全文一致：§3.1 指标分布表、§3.2 用户流程、§3.3 BR、§4.1 nav、§4.2–4.4 Chain Analytics 布局、§4.10 Protocol Health 布局，无架构矛盾
- ✅ §4.1 导航二级菜单规范完整（Chain Analytics + Protocol Health，含路由、副标题）
- ✅ §4.3 模块矩阵扩展为 5 列，Protocol Health 专属页面独立一列，各 F 模块归属清晰
- ✅ Chain Analytics 明确不新增 PSM Net Flow Tab / Collateral Ratio Tab / Risk Snapshot Section（§4.2、§4.4、BR-06、BR-PSM-04、AC-08、AC-20）
- ✅ F-01/F-02/F-05/F-06 仅在 Protocol Health 专属页面（BR-06、BR-DAR-05、AC-02、AC-11、AC-23）

**UI 规范完整性**

- ✅ §4.9 PSM 详情页：3 张 KPI 卡规范 + Total Collateral Value tooltip 全文 + Mint/Redeem Trend 时间窗（7D/1M/6M/1Y/All + 底部时间轴）
- ✅ §4.10 Protocol Health 专属页面：Breadcrumb / KPI 卡 4 张 / CR 全宽折线图（链筛选器+时间选择器默认 1Y）/ 双列 Donut+DaR / Vault Risk Summary 表；Critical Vault Debt tooltip HF 公式完整
- ✅ §4.11 交互规范：链筛选器、DaR 抵押品筛选器、`?` tooltip hover、时间选择器、Protocol Health 导航入口均有对应行
- ✅ §4.13 移动端降级：Protocol Health 各模块均有降级规则
- ✅ §4.14 信息架构原则：5 条原则对齐新双页架构，移除旧 Risk Snapshot / PSM Activity 描述

**业务规则与异常**

- ✅ BR-06/07/PSM-04/DAR-02/DAR-05 已对齐新架构（§3.3）
- ✅ §5 异常边界：Protocol Health BSC 空态 + DaR "No active CDP vaults on BSC" 已覆盖

**验收标准**

- ✅ AC-02/05/07/08/11/13/14/20/22 修订完成，不含旧架构描述（Risk Snapshot / PSM Net Flow Tab / Collateral Ratio Tab 等）
- ✅ 新增 AC-23（Protocol Health 页面布局完整）+ AC-24（导航二级菜单）

**通用规范**

- ✅ §1 架构基础认知（PSM / SA 特殊 ilk）保持不变
- ✅ BR-CR-01 / BR-COL-01 符合 MCD ilk 模型；TRX vs sTRX 独立
- ✅ 客观数据呈现优先（BR-08 / BR-COL-04），无集中度告警样式
- ✅ §3.4 计算公式与数据源完整（F-01 至 F-05 全部逻辑）
- ✅ 作者署名 = Rain.Liu；版本号 v5；日期 2026-06-09
- ✅ 变更记录 5 条（v1–v5），清晰对应各阶段演进

**待确认项**

- ⚠️ 待确认：ETH Vault（WBTC-A / ETH-A）上线时间，届时 F-04 适用范围需同步扩展
