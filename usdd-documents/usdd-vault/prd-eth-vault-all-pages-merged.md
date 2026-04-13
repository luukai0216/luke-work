# PRD | USDD Ethereum 链 Vault 全页面需求（合并版）

> 覆盖范围：Vault 列表页 · Vault 操作页 · Vault Liquidations · Collateral Auctions · Portfolio
> 文档版本：v1（合并自 eth-vault-page、eth-vault-mint-page、eth-vault-pages-2026-04 三份 PRD）
> 文档日期：2026-04-10
> 文档类型：迭代需求 PRD
> 参考基线：prd-tron-vault-page-v1.md · prd-tron-vault-mint-page-v1.md · prd-tron-liquidation-page-v1.md · prd-tron-auction-page-v1.md · prd-tron-portfolio-page-v1.md

> ⚠️ **风险参数待确认**：以太坊链各 ilk 的数量、命名、MCR、Stability Fee、Dust Limit、USDD Limit、Liquidation Fee 均尚未确定，需由**风险测算小组**提供后补齐。本文中涉及参数的位置均以 ⚠️ 标注，开发阶段请勿使用任何占位数值。

---

## 一、需求背景

USDD 2.0 目前 CDP 系统已在 TRON 链稳定运行，支持 TRX/sTRX/USDT/WBTC 多种抵押品，完整覆盖了 Vault 列表、Vault 操作、清算、拍卖、资产组合五个页面。

本次需求目标是将上述五个页面完整复制到 Ethereum 链，形成以 ETH / WBTC 为抵押品的完整 CDP 闭环：

- 以太坊生态的 ETH / WBTC 持有者规模远大于 TRON 生态，引入这两类资产可显著扩大 USDD 抵押品来源
- 以太坊链已有 PSM 和 sUSDD 功能，新增 CDP 将与现有以太坊模块形成"铸造 → 稳定 → 增值"完整闭环
- 延伸 CDP 至以太坊链是 USDD 2.0 多链战略的关键节点，直接影响以太坊链 USDD 流通量增长

**核心原则：本次需求不新设计任何交互、不调整任何业务机制，所有页面的业务逻辑、界面设计风格、组件结构、操作流程与 TRON 链完全一致，仅替换与链相关的元素。**

---

## 二、需求描述

### 2.1 需求范围

本次一次性交付以下 5 个 Ethereum 链页面：

| 页面 | 路由 | 对应 TRON 链参考 |
| --- | --- | --- |
| Vault 列表页 | `/eth/` | `/tron/` |
| Vault 操作页 | `/eth/vault?token={ilk}` | `/tron/vault?token={ilk}` |
| Vault Liquidations | `/eth/liquidation` | `/tron/liquidation` |
| Collateral Auctions | `/eth/auction` | `/tron/auction` |
| Portfolio | `/eth/portfolio` | `/tron/portfolio` |

### 2.2 全局替换规则

以下内容在所有 5 个页面中统一执行，不逐页重复说明：

| 替换维度 | TRON 链（旧） | ETH 链（新） |
| --- | --- | --- |
| 路由前缀 | `/tron/` | `/eth/` |
| 网络限制 | 仅 TRON 可用 | 仅 Ethereum Mainnet 可用 |
| 钱包体系 | TronLink / TokenPocket / OKX 等 TRON 钱包 | MetaMask 等 EVM 钱包（复用 Swap/Earn 现有组件，**不重复开发**） |
| 网络切换检测 | TRON 网络检测 | Ethereum Mainnet 检测（复用 Swap/Earn 现有实现，**不重复开发**） |
| Gas 提示 | "Reduce gas fees with Energy Rental" → JustLend 外链 | 移除 Energy Rental 提示，替换为 ETH Gas 费用提示 |
| 区块浏览器跳转 | TRON 浏览器 | Etherscan |
| 合约调用上下文 | TronWeb | ethers.js / wagmi（复用 Swap/Earn 现有实现） |

### 2.3 本次不包含的内容

- 不新增任何 Ethereum 专属页面模块或交互分支
- 不调整清算、拍卖、资产管理的业务机制
- 不扩展新的抵押品类型（以太坊链首批仅支持 ETH / WBTC）
- 不交付 Vault 以外的以太坊链页面（PSM、Earn、Migrate 等不在本次范围）

---

## 三、功能清单

> 阅读说明：
> - **改动类型**：「复用」= 代码逻辑不动；「替换」= 替换特定配置/文案/数据源；「新增」= ETH 链新增逻辑；「删除」= ETH 链移除该功能
> - 无标注的行默认为「复用」

---

### 页面一：Vault 列表页 `/eth/`

| # | 功能点 | TRON 链现有实现 | ETH 链改动内容 | 改动类型 |
| --- | --- | --- | --- | --- |
| 1 | 顶部导航 | 链切换 + Connect Wallet + Vault 下拉菜单（Borrow USDD / Vault Liquidations / Collateral Auctions / Portfolio） | 复用 Swap/Earn 页现有链切换和钱包连接组件；Vault 下拉菜单子项路由替换为 `/eth/` 前缀 | 替换（路由） |
| 2 | Hero 主标题 | "Leading the Financial Future with Stability and Transparency" | 文案不变 | 复用 |
| 3 | Hero 副标题 | "JUST DAO offers a lending protocol that enables users to mint over-collateralized stablecoins (USDD) by depositing **Tron chain** assets." | 替换为 "USDD enables users to mint over-collateralized stablecoins by depositing **Ethereum** assets as collateral." | 替换（文案） |
| 4 | 活动公告轮播 | 2 张 Slide，自动轮播，圆点导航 | 轮播内容替换为以太坊链相关活动公告（具体文案待运营确认）；轮播交互逻辑不变 | 替换（内容） |
| 5 | All Vaults 表格列结构 | 7 列：Collateral / Total Collateral / USDD Limit ⓘ / Min. Collateral Ratio ⓘ / Stability Fee ⓘ / Dust Limit ⓘ / Mint | 列结构不变；**同步新增**\nTotal Collateral改名为Total Collateral Value，此改动同步至tron链 | 新增（2 个 Tooltip） |
| 6 | Collateral 列 Tooltip | 无 | 新增："Collateral refers to the crypto assets or other acceptable assets deposited by users as collateral for borrowing." | 新增 |
| 7 | Total Collateral 列 Tooltip | 无 | 新增："The current market value of the collateral, used to compare with the debt to ensure that the borrowing risk is within acceptable limits." | 新增 |
| 8 | 表格行数据 | 7 行：TRX-A/B/C、USDT-A、sTRX-A、WBTC-A/B | 替换为以太坊链上线的 ETH / WBTC 系列 ilk；⚠️ 行数、ilk 命名待风险测算小组确认 | 替换（数据） |
| 9 | 各 ilk 参数展示 | MCR / Stability Fee / USDD Limit 等实时从 TRON 链 API 读取 | 切换为以太坊链 API 数据源；⚠️ 参数值待风险测算小组确认 | 替换（数据源） |
| 10 | Reduced Fees 角标 | 促销稳定费时显示，含划线原价 | 逻辑不变；以太坊链是否有促销活动由运营确认 | 复用 |
| 11 | NEW 角标 | 新上线 Vault 显示 NEW 角标 | 逻辑不变；以太坊链首批 Vault 可按需展示 | 复用 |
| 12 | Mint 按钮 | 跳转 `/tron/vault?token={ilk}` | 跳转 `/eth/vault?token={ilk}`；⚠️ ilk 枚举值待确认 | 替换（路由） |
| 13 | 页脚 | support@usdd.io + 版权 + X/Telegram/Discord | 不变 | 复用 |
| 14 | Energy Rental 提示 | 有（全站） | **移除** | 删除 |

---

### 页面二：Vault 操作页 `/eth/vault?token={ilk}`

| # | 功能点 | TRON 链现有实现 | ETH 链改动内容 | 改动类型 |
| --- | --- | --- | --- | --- |
| 1 | All Assets 左侧栏 | 列出 7 个 TRON ilk，Collateral / Min. Coll. Ratio / Stability Fee | 列表内容替换为以太坊链上线的 ETH / WBTC 系列 ilk；⚠️ 枚举待确认 | 替换（内容） |
| 2 | Vault 参数面板：Stability Fee / Liquidation Fee / Min. Collateral Ratio / Dust Limit | 展示 TRON 链各 ilk 参数值 | 展示以太坊链对应 ilk 参数值；⚠️ 各 ilk 具体数值待风险测算小组确认 | 替换（数据） |
| 3 | 参数面板 Tooltip（4 条） | 12 条 Tooltip 全量已有 | 文案不变，语义相同 | 复用 |
| 4 | Current Price / Next Price | TRON 链 OSM 预言机价格（TRX/USDT 等） | 切换为以太坊链 OSM 预言机价格（ETH/WBTC） | 替换（数据源） |
| 5 | Hide/Show 折叠按钮 | 有 | 不变 | 复用 |
| 6 | Energy Rental 外链提示 | "Reduce gas fees with Energy Rental" → JustLend | **移除**，替换为 ETH Gas 费用参考提示 | 替换（文案） |
| 7 | 开仓引导 Guide — "Open a vault" 4 步骤 | 4 步骤图文引导，步骤 2 配图以 TRX 举例 | 步骤内容和文案不变；⚠️ 步骤配图替换为 ETH 举例图 | 替换（图片） |
| 8 | 开仓引导 Guide — "Manage a vault" 5 步骤 | 文字步骤说明 | 不变 | 复用 |
| 9 | Vault ID 选择器（combobox） | 支持切换同一 ilk 下的多个仓位 | 不变 | 复用 |
| 10 | Strategies 下拉选择器 | ⚠️ 待确认 | 不变 | 复用 |
| 11 | 策略切换：Deposit & Mint / Payback & Withdraw | 两套策略，radio 切换 | 不变 | 复用 |
| 12 | Deposit 输入框（存入抵押品） | `Balance: X {token}`，Max 按钮填入余额上限 | ETH 为原生币，**Max 时需预留 gas 费（推荐预留 0.001 ETH）**，不能全额填入；WBTC 为 ERC-20，逻辑不变 | 新增（ETH Max 预留逻辑） |
| 13 | Mint USDD 输入框 | `MAX: X USDD`，Max 按钮，联动计算 | 不变 | 复用 |
| 14 | WBTC ERC-20 首次 Approve | TRON 链 WBTC 已有 Approve 步骤 | ETH 链 WBTC 同样需要 Approve；**新增**：ETH 链 Approve 使用 ERC-20 标准接口（与 TRON 链一致，但合约调用层不同，复用 Swap/Earn 现有 ERC-20 授权组件） | 复用（现有 ERC-20 授权组件） |
| 16 | Payback USDD 输入框 + Payback All 按钮 | 有 | 不变 | 复用 |
| 17 | Withdraw 输入框 + Max 按钮 | 有 | 不变 | 复用 |
| 18 | Submit 按钮 / Connect Wallet 引导 | 未连接钱包显示"Connecting..." | 替换为以太坊链钱包连接流程（复用 Swap/Earn 现有组件） | 替换（组件） |
| 19 | My Position — Liquidation Price / Collateral Ratio | 实时计算，含 ⓘ Tooltip | Tooltip 文案和计算逻辑不变；数据从以太坊链读取 | 替换（数据源） |
| 20 | My Position — Collateral Locked / Available to Withdraw | 有 | 不变 | 复用 |
| 21 | My Position — Vault USDD Debt / Available to Generate | 有 | 不变 | 复用 |
| 22 | My Position 所有 Tooltip（6 条） | 有 | 文案不变 | 复用 |
| 23 | "* Values are estimates and may change." 免责声明 | 有 | 不变 | 复用 |
| 24 | History Tab — 交易历史 | 空态"No Transactions yet" | 历史跳转 TX 详情从 TRON 浏览器改为 **Etherscan** | 替换（链接） |
| 25 | 输入校验：CR < MCR / Dust Limit / 余额不足 | 有 | 逻辑不变；ETH 链 Dust Limit 值待风险测算小组确认 | 复用（逻辑）+ 替换（参数值） |
| 26 | 链上交易错误文案 | TRX/Energy 语境 | 替换为 ETH Gas 语境（如"insufficient gas"等 EVM revert 消息） | 替换（文案） |
| 27 | 关仓流程（Payback All + Withdraw Max） | 有，分两步 | 不变 | 复用 |

---

### 页面三：Vault Liquidations `/eth/liquidation`

| # | 功能点 | TRON 链现有实现 | ETH 链改动内容 | 改动类型 |
| --- | --- | --- | --- | --- |
| 1 | 页面标题 & Hero 说明文案 | "Vault liquidations" + "Liquidation is an essential process to ensure the stability of the USDD system." | 不变 | 复用 |
| 2 | "Learn more" 链接 | docs.usdd.io | 不变 | 复用 |
| 3 | 数据更新时间 + 刷新按钮 | "Updated at: YYYY-MM-DD HH:MM:SS" + 🔄 按钮 | 不变 | 复用 |
| 4 | 表格列结构（7 列） | Vault Type / Vault ID / Collateral / Debt / Collateral Ratio ⓘ / Liquidation Reward ⓘ / Liquidate | 不变 | 复用 |
| 5 | 表格所有 Tooltip 文案 | 有 | 不变 | 复用 |
| 6 | 仓位列表数据 | TRON 链欠抵押仓位（TRX / USDT / sTRX / WBTC） | 切换为**以太坊链**欠抵押仓位数据（ETH / WBTC 系列 ilk） | 替换（数据源） |
| 7 | Vault Type 展示 | TRX-A / TRX-B 等 TRON ilk 命名 | 替换为以太坊链 ilk 命名（⚠️ 枚举待风险测算小组确认） | 替换（内容） |
| 8 | "High Risk" 清算按钮 + 清算触发流程 | 点击 → 钱包确认 → Dog.bark(ilk, urn) → 链上清算 | 合约交互层切换为以太坊链（复用 Swap/Earn 现有 EVM 合约调用组件）；前台流程、按钮样式不变 | 替换（合约层） |
| 9 | 钱包连接方式 | TronLink 等 TRON 钱包 | EVM 钱包（复用 Swap/Earn 现有组件） | 替换（组件） |
| 10 | 清算成功后区块浏览器跳转 | TRON 浏览器 | **Etherscan** | 替换（链接） |
| 11 | Gas 错误文案 | TRX / Energy 语境 | ETH Gas 语境 | 替换（文案） |
| 12 | Keeper 奖励（Liquidation Reward）展示 | 展示激励金额（tip + chip × debt） | 数值从以太坊链读取；⚠️ tip / chip 参数值待确认 | 替换（数据源） |
| 13 | 网络切换检测 | TRON 网络检测 | 复用 Swap/Earn 现有 Ethereum 网络检测组件 | 替换（组件） |

---

### 页面四：Collateral Auctions `/eth/auction`

| # | 功能点 | TRON 链现有实现 | ETH 链改动内容 | 改动类型 |
| --- | --- | --- | --- | --- |
| 1 | 页面标题 & Hero 说明文案 | "Collateral Auctions" + "Collateral auctions maintain USDD stability by liquidating under-collateralized positions." | 不变 | 复用 |
| 2 | "Learn more" 链接 | docs.usdd.io | 不变 | 复用 |
| 3 | 数据更新时间 + 刷新按钮 | 有 | 不变 | 复用 |
| 4 | 表格列结构（8 列） | Auction ID / Auction Debt ⓘ / Available Collateral ⓘ / Auction Price ⓘ / Market Price ⓘ / Potential Net Profit ⓘ / Progress / Action | 不变 | 复用 |
| 5 | 5 条列头 Tooltip 文案 | 有，已通过 JS 实测提取 | 不变 | 复用 |
| 6 | 活跃拍卖 / 历史拍卖数据 | TRON 链 activeAuctions / auctions API | 切换为**以太坊链** activeAuctions / auctions API | 替换（数据源） |
| 7 | 可拍卖抵押品范围 | TRON 链抵押品（TRX / sTRX / USDT / WBTC） | **ETH / WBTC**（以太坊链首批） | 替换（内容） |
| 8 | 空态文案 | "No Auctions Available." | 不变 | 复用 |
| 9 | 竞拍按钮（Action / Bid） & Dialog | ⚠️ 竞拍 Dialog 内容待有活跃拍卖时验证 | 竞拍逻辑和 Dialog 结构不变；合约调用切换为以太坊链 Clip.take（复用 Swap/Earn EVM 合约调用组件） | 替换（合约层） |
| 10 | Redo 操作 | ⚠️ 待确认 | 不变 | 复用 |
| 11 | 竞拍成功后区块浏览器跳转 | TRON 浏览器 | **Etherscan** | 替换（链接） |
| 12 | 钱包连接方式 | TRON 钱包 | EVM 钱包（复用 Swap/Earn 现有组件） | 替换（组件） |
| 13 | Gas 错误文案 | TRX / Energy 语境 | ETH Gas 语境 | 替换（文案） |
| 14 | Potential Net Profit 计算公式 | (Market Price − Auction Price) × Available Collateral | 公式不变；ETH 链价格数据从以太坊链预言机读取 | 复用（逻辑）+ 替换（数据源） |
| 15 | 网络切换检测 | TRON 网络检测 | 复用 Swap/Earn 现有 Ethereum 网络检测组件 | 替换（组件） |

---

### 页面五：Portfolio `/eth/portfolio`

| # | 功能点 | TRON 链现有实现 | ETH 链改动内容 | 改动类型 |
| --- | --- | --- | --- | --- |
| 1 | 页面整体布局（顶部摘要 + 三区块） | Your Total Deposited / Your Total Minted + My Position / History / Wallet Assets / Auction Account | 不变 | 复用 |
| 2 | 顶部摘要：Your Total Deposited / Your Total Minted | 读取 TRON 链仓位数据 | 切换为**以太坊链** ETH / WBTC Vault 仓位数据 | 替换（数据源） |
| 3 | My Position — 仓位卡片 | 展示 TRX / USDT / sTRX / WBTC Vault 仓位 | 展示 **ETH / WBTC** Vault 仓位；卡片结构、字段、风险指标显示不变 | 替换（数据） |
| 4 | My Position — 仓位健康度字段（CR / Liquidation Price 等） | 有 | 不变 | 复用 |
| 5 | My Position — Collateral Returned（清算后返还抵押） | 有，来自 VAT.gem(ilk, account) | 切换为以太坊链 VAT.gem 查询；可取回资产从 TRX/USDT 换为 ETH/WBTC | 替换（数据源） |
| 6 | My Position — "Open a vault" 空态跳转 | 跳转 `/tron/vault` | 跳转 `/eth/vault` | 替换（路由） |
| 7 | My Position — "View Position" 跳转 | 跳转 `/tron/vault?token={ilk}` | 跳转 `/eth/vault?token={ilk}` | 替换（路由） |
| 8 | Vault increase / decrease 排序 | 有 | 不变 | 复用 |
| 9 | History — Vault / Liquidation / Auction Tab | 展示 TRON 链操作记录 | 切换为**以太坊链**操作记录；三个 Tab 结构和字段不变 | 替换（数据源） |
| 10 | History — 交易详情链接 | TRON 浏览器 | **Etherscan** | 替换（链接） |
| 11 | Wallet Assets — 资产卡片 | 展示与 USDD 业务相关的 TRON 侧资产（TRX / sTRX / USDT / USDD / WBTC 等） | 替换为以太坊侧业务相关资产（ETH / WBTC / USDD 等）；卡片结构、快捷跳转逻辑不变 | 替换（内容） |
| 12 | Wallet Assets — CTA 跳转 | 各资产卡片跳转对应 TRON 链功能页 | 跳转对应**以太坊链**功能页（`/eth/vault`、`/eth/` 等） | 替换（路由） |
| 13 | Auction Account — USDD Deposit / Withdraw | 操作以太坊链 JOIN_USDD（TRON 链实现）；含 VAT.hope 授权步骤 | 切换为**以太坊链** JOIN_USDD 合约；Deposit/Withdraw 操作逻辑和 Dialog 不变；授权步骤复用现有 ERC-20 授权组件 | 替换（合约层） |
| 14 | Auction Account — Returned Collateral 提取 | exitTRX / exitGem（TRON 链） | 切换为以太坊链 exitETH / exitGem；前台操作流程不变 | 替换（合约层） |
| 15 | Gas 提示文案 | TRX / Energy 语境 | ETH Gas 语境 | 替换（文案） |
| 16 | 区块浏览器跳转（全页面） | TRON 浏览器 | **Etherscan** | 替换（链接） |
| 17 | 钱包连接方式 | TRON 钱包 | EVM 钱包（复用 Swap/Earn 现有组件） | 替换（组件） |
| 18 | 网络切换检测 | TRON 网络检测 | 复用 Swap/Earn 现有 Ethereum 网络检测组件 | 替换（组件） |
| 19 | 未连接钱包引导 | 弹出 TRON 钱包连接 Modal | 弹出 EVM 钱包连接 Modal（复用现有组件） | 替换（组件） |

---

## 四、跨页面统一改动汇总

以下改动横跨所有 5 个页面，研发可统一处理，无需逐页重复：

| 改动项 | TRON 链 | ETH 链 | 研发建议 |
| --- | --- | --- | --- |
| 钱包连接组件 | TRON 钱包组件 | EVM 钱包组件 | 直接复用 Swap/Earn 已有组件，无需新开发 |
| 网络切换检测 | TRON 网络检测组件 | Ethereum Mainnet 检测组件 | 直接复用 Swap/Earn 已有组件 |
| 区块浏览器链接 | TRON 浏览器 URL 拼接 | Etherscan URL 拼接 | 统一替换 URL 前缀配置 |
| Gas 提示文案 | "Energy Rental" + TRX 语境 | ETH Gas 语境 | 替换对应 i18n key |
| 合约调用 SDK | TronWeb | ethers.js / wagmi | 复用 Swap/Earn 现有 EVM 合约调用封装 |
| API 数据源 | TRON 链 API endpoint | ETH 链 API endpoint | 按链区分 base URL 配置，复用接口定义 |

---

## 五、参数占位表（待风险测算小组确认）

以下参数在开发完成前均不得写入代码，等待风险测算小组输出后由 PM 补充：

| ilk 名称 | MCR | Stability Fee | Liquidation Fee | Dust Limit | USDD Limit |
| --- | --- | --- | --- | --- | --- |
| ⚠️ 待定（ETH 系列） | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| ⚠️ 待定（WBTC 系列） | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |

参数确认后需同步更新的位置：
- All Vaults 表格行枚举和排序
- All Assets 左侧栏 ilk 列表
- Mint 跳转路由 URL 参数枚举
- 埋点 ilk 属性枚举配置
- 输入校验阈值（Dust Limit、MCR 计算基准）

---

## 六、数据埋点

> 以下事件覆盖所有 5 个页面，前缀统一使用 `eth_vault_`，与 TRON 链 `vault_` 前缀区分。

| 事件名 | 触发页面 | 关键属性 | 业务价值 |
| --- | --- | --- | --- |
| `eth_vault_page_view` | 所有 5 页 | `page_name`, `wallet_connected`, `ilk`（操作页） | 以太坊链各页 PV，衡量整体流量 |
| `eth_vault_ilk_switch` | Vault 列表 / 操作页 | `from_ilk`, `to_ilk` | 分析用户 ilk 选择偏好 |
| `eth_vault_row_mint_click` | Vault 列表页 | `ilk`, `wallet_connected`, `usdd_used`, `usdd_limit` | 列表页漏斗核心节点 |
| `eth_vault_strategy_switch` | Vault 操作页 | `from_strategy`, `to_strategy`, `ilk` | 监控操作意图（开仓/调仓/关仓） |
| `eth_vault_wbtc_approve_click` | Vault 操作页 | `ilk` | 统计 WBTC Approve 点击率 |
| `eth_vault_wbtc_approve_success` | Vault 操作页 | `ilk`, `tx_hash` | 衡量 WBTC Approve 完成率（目标 ≥ 85%） |
| `eth_vault_deposit_input` | Vault 操作页 | `ilk`, `input_amount`, `wallet_balance` | 输入漏斗分析 |
| `eth_vault_submit_click` | Vault 操作页 | `ilk`, `strategy`, `operation_type`, `estimated_cr_after` | 提交意图，核心转化节点 |
| `eth_vault_tx_success` | Vault 操作页 | `ilk`, `operation_type`, `tx_hash` | 链上成功率 |
| `eth_vault_tx_failed` | Vault 操作页 | `ilk`, `error_type` | 监控失败原因分布 |
| `eth_vault_close_complete` | Vault 操作页 | `ilk` | 关仓监控，用户留存信号 |
| `eth_liquidation_bark_click` | Liquidation 页 | `ilk`, `vault_id`, `cr` | 清算触发行为 |
| `eth_auction_bid_click` | Auction 页 | `auction_id`, `net_profit`, `ilk` | 竞拍参与意图 |
| `eth_auction_bid_success` | Auction 页 | `auction_id`, `tx_hash` | 拍卖清仓效率 |

---

## 七、成功指标

| 指标 | 定义 | 目标方向 |
| --- | --- | --- |
| 以太坊链 USDD 新增铸造量 | ETH 链 CDP 页产生的净铸造量（月） | ↑ 增长，重点观测指标 |
| 开仓完成率 | `eth_vault_tx_success(Deposit&Mint)` / `eth_vault_submit_click` | ↑ 提升 |
| WBTC Approve 完成率 | `eth_vault_wbtc_approve_success` / `eth_vault_wbtc_approve_click` | ≥ 85% |
| 提交成功率 | `eth_vault_tx_success` / `eth_vault_submit_click` | ≥ 95% |
| Mint 点击率 | `eth_vault_row_mint_click` / `eth_vault_page_view`（列表页） | ↑ 提升 |
| 清算率 | 进入清算列表仓位 / 总活跃仓位 | ↓ 降低 |
| 调仓活跃度 | 存量仓位用户 30 日操作次数 | 监控 |
