# 产品概览

## 产品定位

USDD 是一种完全去中心化的稳定币，通过加密资产超额抵押与美元 1:1 挂钩。USDD 2.0 是协议的重大升级版本，面向 DeFi 用户和机构，提供更高的透明度、更强的安全保障和更灵活的收益机制，致力于成为链上最值得信赖的去中心化稳定币。

## 核心功能矩阵

| 模块 | 功能 | 描述 | 覆盖端 |
| --- | --- | --- | --- |
| Vault | 铸造与赎回 | 用户通过抵押加密资产铸造 USDD，或将 USDD 赎回为底层资产 | Web |
| Staking | 质押收益 | 质押 USDD 获取协议收益（sUSDD） | Web |
| PSM | 锚定稳定模块 | 通过 PSM 在 USDD 与其他稳定币之间 1:1 兑换，维护锚定 | Web |
| Smart Allocator | 收益策略引擎 | 将 USDD 现金储备部署到 Aave、Spark、JustLend 等 DeFi 协议赚取收益，利润通过 Earn 分配给用户；多链多协议分散配置，全部链上可验证 | Web |
| Reserve | 储备透明 | 实时展示抵押资产构成与抵押率，链上可验证 | Web |
| Governance | 治理 | 协议参数调整、提案投票等去中心化治理机制 | ⚠️ 未上线 |

## 目标用户

| 用户类型 | 描述 | 核心需求 |
| --- | --- | --- |
| DeFi 原生用户 | 熟悉链上操作，追求收益最大化 | 稳定锚定 + 高透明度 + 可组合性 |
| 稳定币持有者 | 持有 USDT/USDC 等，寻找去中心化替代 | 安全、去中心化、无审查风险 |
| 机构 / DAO 金库 | 管理大额资金，需要稳定存储 | 超额抵押保障 + 链上可审计 + 稳定收益 |

## 关键指标

| 指标 | 定义 | 当前基线 | 目标 |
| --- | --- | --- | --- |
| Total Supply | USDD 全网流通总量（北极星指标） | $1.54B | $2B |
| Protocol TVL | 协议总锁仓价值 | $2.2B | $3.5B |
| Savings TVL | 质押/Earn 锁仓价值 | $421.11M | $1B |
| Total Supply (TRON) | TRON 链 USDD 供应量 | $1.11B | $1.5B |
| Total Collateral Value (TRON) | TRON 链抵押品总价值 | $1.77B | $2B |
| Collateral Ratio (TRON) | 抵押率（TRON 链储备 / 流通量） | ~159%（$1.77B / $1.11B） | 200% |
| Earn APY | 质押 USDD 年化收益率 | 4.75% 基础 / 7.84% 平均（TRON） |  |
| Peg Stability | 脱锚偏差（与 $1.00 的偏离度） | 1% | < 0.5% |

> 数据来源：usdd.io / usdd.io/data，采集日期 2026-04-02

## 业务背景

去中心化稳定币是 DeFi 基础设施的核心组件。当前市场中，USDT 和 USDC 占据主导但存在中心化风险（冻结地址、银行依赖），算法稳定币（如 UST）曾遭遇脱锚崩盘。USDD 2.0 采用加密资产超额抵押模式，在去中心化与稳定性之间取得平衡，同时部署在 TRON 网络上，具有低 Gas 费和高吞吐量优势。

## 战略优先级（当前）

1. Total Supply 增长——扩大 USDD 流通规模，提升市场份额
2. 成本收益平衡——控制协议激励支出，确保收入端可持续

## 技术架构概要

- **底层网络**：多链部署
  - **TRON**（主链）：Vault、PSM、Migrate、Earn、Liquidation、Auction — 功能最全
  - **Ethereum**：PSM、Earn
  - **BNB Chain**：PSM、Earn
- **智能合约**：核心合约包括 USDD Token、Vault（TRX-A/B/C、USDT-A、sTRX-A）、PSM、Staking（sUSDD）、Smart Allocator（SA001-A）
- **预言机**：链上价格喂价，用于计算抵押率和清算阈值
- **前端**：React SPA（Create React App），字体 Inter（全局唯一），暗色主题
- **合约不可变性**：部署后核心逻辑不可修改，参数调整通过治理提案执行

### TRON 链抵押品明细

| Vault | 抵押品价值 | USDD Debt | 最低抵押率 | Stability Fee |
| --- | --- | --- | --- | --- |
| TRX-A | $391M | 170M USDD | 120% | 0.5% |
| TRX-B | $226M | 96M USDD | 117% | 0.5% |
| TRX-C | $469M | 190M USDD | 130% | 0.5% |
| USDT-A | $0.67M | 0.56M USDD | 105% | 1% |
| sTRX-A | $19.2M | 8.9M USDD | 130% | 1% |
| PSM-USDT-A | $71.4M | 71.4M USDD | 100% | 0% |
| SA001-A | $554.7M | 554.7M USDD | 100% | 0% |

> 数据来源：usdd.io/data，采集日期 2026-04-01
