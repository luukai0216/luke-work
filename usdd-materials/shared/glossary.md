# 术语表

> 所有文档中使用的领域术语在此统一定义。写 PRD 时必须使用本表中的标准术语，不得自行发明表述。

## 业务术语

| 术语 | 英文 | 定义 | 示例 |
|------|------|------|------|
| 稳定币 | Stablecoin | 价值锚定法币（通常为美元）的加密货币 | USDD、USDT、USDC、DAI |
| 铸造 | Mint | 用户存入抵押资产，协议生成等值 USDD 的过程 | "铸造 10,000 USDD" |
| 赎回 | Redeem | 用户归还 USDD，取回底层抵押资产的过程 | "赎回 USDD 为 TRX" |
| 锚定 | Peg | USDD 与美元的 1:1 价格关系 | "锚定偏差 < 0.5%" |
| 脱锚 | De-peg | USDD 价格显著偏离 $1.00 的异常状态 | "脱锚至 $0.95" |
| 抵押率 | Collateral Ratio (CR) | 储备资产总价值 / USDD 流通总量，衡量协议安全性 | "抵押率 200% 表示每 1 USDD 有 $2 资产背书" |
| 超额抵押 | Over-collateralization | 抵押资产价值 > 铸造稳定币价值，提供安全缓冲 | "150% 超额抵押" |
| 质押 | Staking | 锁定 USDD 获取协议收益的行为 | "质押 USDD 获得 sUSDD" |
| PSM | Peg Stability Module | 锚定稳定模块，允许 USDD 与其他稳定币 1:1 兑换以维持锚定 | "通过 PSM 将 USDC 兑换为 USDD" |
| sUSDD | Staked USDD | 质押 USDD 后获得的收益凭证代币 | "持有 sUSDD 自动累积收益" |
| APY | Annual Percentage Yield | 年化收益率，含复利计算 | "sUSDD 当前 APY 为 5%" |
| TVL | Total Value Locked | 协议中锁定的总资产价值 | "USDD 2.0 TVL 达 $500M" |
| Vault | Vault | 用于存放和管理抵押资产的智能合约 | "TRX Vault 当前抵押率 180%" |
| 清算 | Liquidation | 抵押率低于阈值时，协议自动出售抵押物偿还债务 | "抵押率跌破 120% 触发清算" |
| 储备金 | Reserve | 支撑 USDD 价值的底层加密资产池 | "储备金包含 TRX、BTC、USDT" |

## 技术术语（PM 需理解）

| 术语 | 英文 | 定义 | PM 需要关注的点 |
|------|------|------|---------------|
| 智能合约 | Smart Contract | 部署在区块链上自动执行的程序 | 一旦部署不可修改，升级需谨慎规划 |
| 预言机 | Oracle | 为智能合约提供链外数据（如价格）的服务 | 喂价延迟或错误可能导致错误清算 |
| Gas 费 | Gas Fee | 链上交易的手续费 | TRON Gas 费远低于 Ethereum，影响用户体验 |
| TRC-20 | TRC-20 | TRON 网络的代币标准 | USDD 遵循此标准，兼容 TRON 生态钱包 |
| 治理提案 | Governance Proposal | 社区对协议参数修改的投票机制 | 参数变更（如抵押率阈值）需经治理流程 |
| 多签 | Multisig | 需多个密钥持有者共同签名才能执行的操作 | 核心合约操作的安全保障机制 |

## 用户界面术语

| 界面元素 | 标准称呼 | 不使用的称呼 |
|---------|---------|-------------|
| 铸造/赎回页面 | Mint/Redeem | 兑换、购买 |
| 质押页面 | Staking | 存款、理财 |
| 储备仪表盘 | Reserve Dashboard | 资产页、余额页 |
| 钱包连接 | Connect Wallet | 登录、注册 |
| 交易确认弹窗 | Transaction Confirmation | 支付确认 |
| 抵押率指示器 | Collateral Ratio Indicator | 安全值、健康度 |

---

> **维护规则**：新增术语时同步更新此表。跨端共享，修改后影响所有端。
