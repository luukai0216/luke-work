# 模块全景

> 该端所有功能模块的基线 PRD 索引。基线 PRD 描述「线上当前是什么样」，不是「将来要做什么」。

## 官网模块

| 模块 | 文件 | 描述 | 最近合并版本 |
|------|------|------|-------------|
| 全局组件 | website-global.md | 导航栏、页脚、通用交互等贯穿所有页面的组件 | 初始基线 |
| 首页 | website-homepage.md | Hero、核心指标、APY 图表、收益模拟器、Why USDD、代币介绍、Markets | 初始基线 |
| 数据透明 | website-data.md | 多链指标卡片、时间序列图表、Collateral List、Vault 详情二级页 | 初始基线 |
| Smart Allocator | website-smart-allocator.md | 投资总览、资产分布、Proof of Reserve、Debt Overview | 初始基线 |
| 国库 | website-treasury.md | 季度财务报表（收入/支出/利润）、JST Buyback & Burn | 初始基线 |
| News | website-news.md | 新闻列表、分类筛选、分页，点击跳转 Medium 外部文章 | 初始基线 |
| FAQ | website-faq-page.md | 折叠式 Q&A 自助答疑页，内容由后台 CMS 动态配置，支持搜索与分页 | 初始基线 |

## App 模块

| 模块 | 文件 | 描述 | 最近合并版本 |
|------|------|------|-------------|
| 稳定币兑换 (PSM) | app-psm.md | Peg Stability Module，支持 USDD 与其他稳定币 1:1 兑换（Tron/Ethereum/BNB Chain） | 初始基线 |
| 储蓄 (Earn) | app-earn.md | USDD 储蓄模块，ETH/BSC 链上存取款 + Tron 聚合器跳转第三方平台 | 初始基线 |
| 钱包连接 | app-wallet.md | 全局公共模块，所有链上操作页面共享的钱包连接逻辑（WalletConnect / TronLink / MetaMask） | 初始基线 |
| 迁移 (Migrate) | app-migrate.md | USDDOLD 到 USDD 的 1:1 迁移模块（Tron 限定），当前直接通道已关闭 | 初始基线 |
| TRON Vault 列表 | app-tron-vault.md | TRON 链多 Vault 市场列表页，展示可用抵押借贷仓位类型与关键参数 | 初始基线 |
| TRON Vault Mint | app-tron-vault-mint.md | TRON 链通用 Vault Mint / 仓位管理工作台，支持任意抵押品类型 | 初始基线 |
| TRON Portfolio | app-tron-portfolio.md | TRON 用户个人资产与行为工作台（My Position / Transaction History / Wallet Assets / Auction Account） | 初始基线 |
| TRON 清算 (Liquidation) | app-tron-liquidation.md | 展示低于清算阈值的高风险 Vault 仓位，供 Keeper 触发链上清算 | 初始基线 |
| TRON 拍卖 (Auction) | app-tron-auction.md | 荷兰式递减价格拍卖页，承接清算触发后的抵押品竞拍与债务回收 | 初始基线 |

## 其他

| 模块 | 文件 | 描述 | 最近合并版本 |
|------|------|------|-------------|
| Slack 通知系统 | slack-notifications.md | 运营/风控/On-Call 告警通知（Smart Allocator、清算、PSM、预言机、黑名单等） | 初始基线 |

---

> **维护规则**：
> - 基线仅在版本上线后通过 `baseline-merge` Skill 合并，不在迭代中直接修改
> - 新增模块时在此表中添加条目
> - 「最近合并版本」记录该模块最后一次被合并更新的版本号
