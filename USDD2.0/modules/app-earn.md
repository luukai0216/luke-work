# 储蓄模块 — Earn

---

## 一、文档元数据

| 字段 | 说明 |
|------|------|
| **项目名称** | USDD 2.0 / Decentralized USD |
| **模块名称** | 储蓄 / Earn |
| **关联模块** | PSM（可从 PSM 兑换 USDD 后存入 Earn）、Vault（共享钱包连接态）、Migrate（同处主导航） |
| **外部依赖** | 链上 Earn 智能合约（Ethereum / BNB Chain）、sUSDD 合约、钱包连接服务（WalletConnect 协议及各链原生钱包 SDK）、Tron 合作平台（JustLend DAO、HTX、KuCoin 等） |

> ⚠️ **重要：Tron 与 ETH/BSC 的 Earn 是两种完全不同的产品形态。**
> - **Tron**：聚合器模型 — 展示合作平台列表，用户点击跳转至第三方平台存款，USDD App 本身不承接存取款操作。
> - **ETH / BSC**：直接存取款模型 — 用户在 USDD App 内完成 USDD 存入/取出，获得/赎回 sUSDD。

### 截图/原型参考

| 页面 | 截图 | 说明 |
|------|------|------|
| Tron Earn 主页 | [tron-main.png](../prototype/screenshots/earn/tron-main.png) | Hero + 合作平台卡片列表顶部 |
| Tron Earn 平台全览 | [tron-partner-list.png](../prototype/screenshots/earn/tron-partner-list.png) | 12 个合作平台完整列表（full page）|
| Tron APY 说明 | [tron-apy-explanation.png](../prototype/screenshots/earn/tron-apy-explanation.png) | 底部 USDD Earn APY Explanation 标签页内容 |
| ETH Earn — Deposit | [eth-deposit.png](../prototype/screenshots/earn/eth-deposit.png) | 未连接钱包，Deposit 面板默认态 |
| ETH Earn — Withdraw | [eth-withdraw.png](../prototype/screenshots/earn/eth-withdraw.png) | 未连接钱包，Withdraw 面板 |
| ETH Earn — 钱包选择弹窗 | [eth-connect-modal.png](../prototype/screenshots/earn/eth-connect-modal.png) | 点击 Connect Wallet 后弹出的钱包列表 |
| BSC Earn — Deposit | [bsc-deposit.png](../prototype/screenshots/earn/bsc-deposit.png) | 未连接钱包，Deposit 面板，TVL 与 Users 数据与 ETH 有差异 |
| BSC Earn — Withdraw | [bsc-withdraw.png](../prototype/screenshots/earn/bsc-withdraw.png) | 未连接钱包，Withdraw 面板 |

### 设计稿

> 本模块的设计稿统一维护在 [figma-design-index.md](../figma-design-index.md) 的「Earn 模块」部分。
>
> 开发实现时以设计稿为**视觉标准**，本文档为**功能与逻辑标准**。如二者不一致，以设计稿最新版为准并同步更新本文档。

### 源码索引（供 Dev 参考）

<details>
<summary>点击展开关键文件清单</summary>

> ⚠️ 待补充：本模块为逆向生成，暂无源码路径。前端同学补充后更新此表。

| 类别 | 文件路径 | 说明 |
|------|---------|------|
| 页面（ETH/BSC） | `src/pages/earn/` | Earn 主页面（Deposit / Withdraw） |
| 页面（Tron） | `src/pages/earn/tron/` | Tron 平台聚合页 |
| 业务逻辑 | `src/hooks/useEarn.ts` | 存取款核心逻辑、sUSDD 计算 |
| 服务层 | `src/services/earnService.ts` | 合约调用封装 |
| 状态管理 | `src/store/earn/` | Earn 页面状态 |

</details>

---

## 二、功能清单（Feature Inventory）

| # | 功能名称 | 功能描述 | 入口/触发方式 | 用户角色 | 适用链 | 优先级 | 状态 |
|---|---------|---------|-------------|---------|--------|-------|------|
| F01 | 页面数据总览 | 展示当前链的 APY、TVL、存款用户数及合约地址 | 进入 Earn 页面自动加载 | 所有用户 | ETH / BSC | P0 | 已实现 |
| F02 | 存入 USDD | 用户输入 USDD 金额并确认，存入 Earn 合约获得 sUSDD | Deposit 标签页 → 输入金额 → 点击 Deposit | 已连接钱包用户 | ETH / BSC | P0 | 已实现 |
| F03 | 取出 USDD | 用户输入取出金额，赎回 sUSDD 换回 USDD | Withdraw 标签页 → 输入金额 → 点击 Withdraw | 已存款用户 | ETH / BSC | P0 | 已实现 |
| F04 | MAX 快捷输入 | 一键填入当前最大可操作金额 | 输入框右侧 MAX 按钮 | 已连接钱包用户 | ETH / BSC | P1 | 已实现 |
| F05 | Savings APY 历史图表 | 展示 Earn APY 的历史走势折线图，支持 1M / 3M / 1Y 时间维度切换 | 页面下方图表区 | 所有用户 | ETH / BSC | P1 | 已实现 |
| F06 | ERC20 Approve 授权 | ETH / BSC 上首次存款前需先对 Earn 合约进行 USDD 授权 | 点击 Deposit 按钮时触发 | 已连接钱包用户（首次） | ETH / BSC | P0 | 已实现 |
| F07 | 合约地址展示 | 页面右上角展示 Earn 合约地址缩略，点击可跳转区块链浏览器 | 页面顶部右侧 | 所有用户 | ETH / BSC | P2 | 已实现 |
| F08 | 推广 Banner | 展示 Merkl 流动性激励活动推广条，点击跳转活动页 | 主面板下方横幅 | 所有用户 | ETH / BSC | P2 | 已实现 |
| F09 | 钱包连接 | 未连接钱包时，点击 Connect Wallet 唤起钱包选择弹窗 | Deposit / Withdraw 面板内 CTA 按钮 | 未连接钱包用户 | ETH / BSC | P0 | 已实现 |
| F10 | 合作平台列表 | 展示支持 USDD 存款的第三方平台，显示各平台 APY 及可用状态 | 进入 Tron Earn 页面自动加载 | 所有用户 | Tron | P0 | 已实现 |
| F11 | 跳转合作平台（GO） | 用户点击「GO」按钮，跳转至对应合作平台完成存款操作 | 平台卡片内 GO 按钮 | 所有用户 | Tron | P0 | 已实现 |
| F12 | APY 说明与 Staking Campaign | 底部两个说明标签页：活动规则 + APY 机制解释 | 页面底部标签切换 | 所有用户 | Tron | P1 | 已实现 |

---

## 三、功能详细 Spec

---

### F01 + F07: 页面数据总览 & 合约地址

> **截图参考**：[eth-deposit.png](../prototype/screenshots/earn/eth-deposit.png)

#### 用户故事
> 作为**所有用户**，我希望进入 Earn 页面时即可看到当前链的关键指标和合约地址，以便快速评估是否值得存款。

#### 前置条件
- 用户访问 `/eth/earn` 或 `/bsc/earn`
- 页面自动从链上合约读取数据

#### 主流程（Happy Path）
1. 用户点击导航栏「Earn」进入页面
2. 系统展示 **Earn 主页**，包含以下内容：
   - 页面标题：「Earn」（左上）
   - 合约地址：右上角显示「Contract: 0x****...****」格式缩略地址 + 外链图标，点击跳转对应链的区块链浏览器（Etherscan / BscScan）
   - **Hero 区**（左侧）：
     - 主标题：「Deposit your USDD and earn X.XX% APY!」（APY 数字绿色高亮，后带 ⓘ 信息图标）
     - 数据标签：「TVL $XXX.XXM」「Users X,XXX」
     - USDD → sUSDD 流向示意图标
     - 说明文案：「Stake your USDD to receive sUSDD, a yield-bearing token that grows in value over time...」
     - 「User Guide」按钮（右上角，点击跳转说明文档）
   - **操作面板**（右侧）：Deposit / Withdraw 切换标签，默认选中 Deposit

#### 三链数据对比

| 数据项 | ETH | BSC |
|--------|-----|-----|
| APY | 4.75% | 4.75% |
| TVL | $409.87M | $13.31M |
| 用户数 | 3,696 | 684 |
| 合约地址 | 0xc5d6...f29930 | 0x8ba9...48a82d |
| 导航 NEW 标签 | ✅ 有 | ❌ 无 |

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E01-01 | 合约数据加载中 | 显示数据占位态 | TVL / APY / Users 显示「--」或骨架屏 |
| E01-02 | 合约数据加载失败 | 保留上次缓存或显示错误 | ⚠️ 待确认：具体 fallback 行为 |
| E01-03 | ⓘ 图标被点击 | 展示 APY 说明 Tooltip | Tooltip 内容说明 APY 不固定、随市场动态调整 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-01 | APY 从链上实时读取，非固定值，随链上参数动态变化 | 页面加载时 | 加载失败则显示「--」 |
| BR-EARN-02 | TVL = 当前链 Earn 合约内锁定的 USDD 总量 | 页面加载时 | 同上 |
| BR-EARN-03 | 合约地址点击跳转至对应链的区块链浏览器（ETH → Etherscan，BSC → BscScan） | 点击时 | 在新标签页打开 |

---

### F02: 存入 USDD（Deposit）

> **截图参考**：[eth-deposit.png](../prototype/screenshots/earn/eth-deposit.png)

#### 用户故事
> 作为**已连接钱包的用户**，我希望将持有的 USDD 存入 Earn 合约，以便自动获取 sUSDD 并赚取收益。

#### 前置条件
- 用户已连接钱包
- 用户钱包内持有 USDD
- 对于首次操作，需先完成 ERC20 Approve（见 F06）

#### 主流程（Happy Path）
1. 用户进入 Earn 页面，默认展示 **Deposit** 标签页
2. 面板展示以下内容：
   - 标签：「Deposit USDD」
   - 余额：「Balance: X.XX USDD」（右上角，实时显示钱包余额）
   - 金额输入框：占位文案「Input amount of USDD」+ 右侧「MAX」按钮
   - 数据行：「Earn　APY: X.XX%」（APY 绿色高亮）
   - 数据行：「Savings Balance　X.XX」（显示用户当前已存入的 sUSDD 换算 USDD 价值）
   - CTA 按钮：「Deposit」（绿色）
3. 用户在输入框输入存款金额（或点击 MAX 一键填满）
4. 系统实时更新：「Savings Balance」预计到账数据
5. 用户点击「Deposit」
6. 若首次存款，系统先触发 Approve 流程（见 F06），完成后自动进入下一步
7. 系统弹出钱包签名请求，用户在钱包内确认
8. 交易上链后，系统更新 Balance 和 Savings Balance 数据，存款完成

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E02-01 | 用户未连接钱包 | CTA 按钮显示「Connect Wallet」，点击唤起钱包选择弹窗 | 按钮文案为「Connect Wallet」，无法输入金额 |
| E02-02 | 输入金额为空或为 0 | Deposit 按钮置灰 | 按钮不可点击 |
| E02-03 | 输入金额超过钱包余额 | Deposit 按钮置灰，显示余额不足提示 | ⚠️ 待确认：提示文案及展示位置 |
| E02-04 | 用户在钱包内拒绝签名 | 交易取消，页面恢复输入态 | ⚠️ 待确认：是否有 Toast 提示 |
| E02-05 | 交易上链失败（Gas 不足等） | 显示失败提示 | ⚠️ 待确认：错误提示文案 |
| E02-06 | 输入非数字或负数 | 输入框拦截，不允许输入 | 输入框不接受非法字符 |
| E02-07 | 网络异常导致交易无法发出 | 显示网络错误提示 | ⚠️ 待确认：提示方式 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-04 | 存款无单笔上下限限制，仅受用户钱包 USDD 余额约束 | 点击 Deposit 前 | 超过余额时按钮置灰 |
| BR-EARN-05 | 存入 USDD 后，用户获得 sUSDD，sUSDD 价值随时间增长（不是 1:1），存款时换算比例由合约实时计算 | 用户输入金额时 | N/A |
| BR-EARN-06 | Savings Balance 展示为 sUSDD 折算的 USDD 等值，非 sUSDD 数量 | 实时计算 | N/A |

---

### F03: 取出 USDD（Withdraw）

> **截图参考**：[eth-withdraw.png](../prototype/screenshots/earn/eth-withdraw.png)

#### 用户故事
> 作为**已存款的用户**，我希望随时取回我存入的 USDD（含收益），以便灵活使用资金。

#### 前置条件
- 用户已连接钱包
- 用户在 Earn 合约中持有 sUSDD（即 Savings Balance > 0）

#### 主流程（Happy Path）
1. 用户点击「Withdraw」标签
2. 面板展示以下内容：
   - 标签：「Withdraw USDD」
   - 可取金额：「Available: X.XX USDD」（右上角，显示用户当前可赎回的 USDD 金额）
   - 金额输入框：占位文案「Input amount of USDD」+ 右侧「MAX」按钮
   - 数据行：「Savings Balance　X.XX」（剩余存款余额）
   - CTA 按钮：「Withdraw」（绿色）
3. 用户输入取出金额（或点击 MAX 全部取出）
4. 用户点击「Withdraw」
5. 系统弹出钱包签名请求，用户确认
6. 交易上链后，USDD 返回钱包，Savings Balance 更新

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E03-01 | 用户未连接钱包 | CTA 按钮显示「Connect Wallet」 | 按钮文案为「Connect Wallet」 |
| E03-02 | Savings Balance 为 0（未存款） | Available 显示 0，输入框不可输入，按钮置灰 | ⚠️ 待确认：是否有空状态提示文案 |
| E03-03 | 输入金额超过 Available | 按钮置灰 | ⚠️ 待确认：提示文案 |
| E03-04 | 输入金额为空或 0 | 按钮置灰 | 按钮不可点击 |
| E03-05 | 用户在钱包内拒绝签名 | 交易取消，页面恢复 | ⚠️ 待确认：Toast 提示 |
| E03-06 | 交易上链失败 | 显示失败提示 | ⚠️ 待确认：错误文案 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-07 | 取款无单笔上下限限制，仅受 Available（sUSDD 折算 USDD）约束 | 点击 Withdraw 前 | 超额时按钮置灰 |
| BR-EARN-08 | 取款时 sUSDD 按当前汇率折算为 USDD 返回，含已积累的收益 | 取款时 | N/A |
| BR-EARN-09 | 取款无锁定期，随时可全额取出 | 用户操作时 | N/A |

---

### F04: MAX 快捷输入

#### 用户故事
> 作为**已连接钱包的用户**，我希望一键填入最大可操作金额，省去手动输入。

#### 主流程（Happy Path）
- **Deposit 面板**：点击 MAX，填入用户钱包内全部 USDD 余额
- **Withdraw 面板**：点击 MAX，填入 Available 全额（即全部可赎回 USDD）

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-10 | Deposit MAX = 钱包 USDD 余额全额；Withdraw MAX = Available 全额 | 点击 MAX 时 | N/A |
| BR-EARN-11 | Gas 费由 ETH / BNB 支付，与 USDD 余额无关，MAX 无需预留 Gas | 点击 MAX 时 | N/A |

---

### F05: Savings APY 历史图表

> **截图参考**：[eth-deposit.png](../prototype/screenshots/earn/eth-deposit.png)（图表位于页面下方）

#### 用户故事
> 作为**所有用户**，我希望查看 APY 的历史走势，以便判断收益的稳定性。

#### 主流程（Happy Path）
1. 页面下方展示 **Savings APY** 折线图，包含：
   - 图表标题：「Savings APY」
   - 时间维度切换按钮：「1M」「3M」「1Y」（默认 1M）
   - 纵轴：APY 百分比（0% ~ 6%）
   - 折线图：展示所选时间段内每日 APY 数据

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E05-01 | 切换时间维度 | 图表数据更新为对应时间范围 | 动画过渡刷新折线图 |
| E05-02 | 历史数据不足（如项目刚上线） | 仅展示有数据的区间 | ⚠️ 待确认：是否有「数据不足」说明 |
| E05-03 | 数据加载中 | 图表骨架屏 | ⚠️ 待确认：加载态样式 |

---

### F06: ERC20 Approve 授权

#### 用户故事
> 作为**ETH / BSC 用户**，在首次存款前，我需要先授权 Earn 合约使用我的 USDD，以便后续存款交易能正常执行。

#### 前置条件
- 用户在 ETH 或 BSC 链上首次使用 Earn 合约
- 当前 USDD 对 Earn 合约的授权额度 < 输入金额

#### 主流程（Happy Path）
1. 用户输入存款金额，点击「Deposit」
2. 系统检查链上 allowance，发现授权额度不足
3. CTA 按钮变为「Approve」，用户点击
4. 系统发起 ERC20 approve 交易，用户在钱包中确认
5. Approve 交易上链确认后，按钮自动切换为「Deposit」
6. 用户点击「Deposit」完成存款

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E06-01 | 用户拒绝 Approve 签名 | Approve 取消，按钮恢复 Approve 态 | ⚠️ 待确认：是否有 Toast 提示 |
| E06-02 | Approve 交易失败 | 提示授权失败，用户可重试 | ⚠️ 待确认：错误提示文案 |
| E06-03 | 授权额度已足（后续存款） | 不显示 Approve，直接显示 Deposit | N/A |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-12 | ETH / BSC 链上 USDD 为 ERC20 代币，首次存款须 Approve；授权额度充足后无需重复授权 | 点击 Deposit 前检查 allowance | 显示 Approve 按钮 |
| BR-EARN-13 | Tron 链无 Approve 机制 | N/A | N/A |

---

### F08: 推广 Banner

> **截图参考**：[eth-deposit.png](../prototype/screenshots/earn/eth-deposit.png)（主面板下方横幅）

#### 用户故事
> 作为**用户**，我希望了解 USDD / sUSDD 的额外收益机会，以便最大化资金效率。

#### 主流程（Happy Path）
1. 操作面板下方展示推广横幅
2. 当前文案：「Provide USDD & sUSDD Liquidity on Pancake or Uniswap via Merkl to Earn Your Yield!」
3. 用户点击 Banner 跳转至 Merkl 活动页面（新标签页打开）

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-14 | Banner 内容和链接为可配置项，随运营活动调整 | 页面加载 | ⚠️ 待确认：Banner 是否支持关闭 |

---

### F09: 钱包连接

> 钱包连接为全局公共模块，完整 Spec 见 **[wallet.md](./wallet.md)**。
>
> 本页面特有行为：连接成功后，Deposit / Withdraw 面板的 CTA 按钮从「Connect Wallet」切换为「Deposit」或「Withdraw」，余额与 Savings Balance 实时加载。

---

### F10: 合作平台列表（Tron）

> **截图参考**：[tron-main.png](../prototype/screenshots/earn/tron-main.png) / [tron-partner-list.png](../prototype/screenshots/earn/tron-partner-list.png)

#### 用户故事
> 作为**Tron 链用户**，我希望看到支持 USDD 存款的各个合作平台及其 APY，以便选择最合适的平台存款。

#### 前置条件
- 用户访问 `/tron/earn`

#### 主流程（Happy Path）
1. 用户进入 Tron Earn 页面，系统展示以下内容：
   - **Hero 区**：「USDD 2.0 offers a 20% APY Reward powered by Smart Allocator and TronDAO」+ 右侧 3D 插图
   - **标题**：「Select to Earn」（星号装饰）
   - **合作平台卡片列表**（双列网格布局），每张卡片包含：
     - 平台 Logo 图标
     - 平台名称
     - APY 百分比（绿色高亮）+ 「APY」标签 + ⓘ 图标
     - 操作按钮：「GO」（绿色可点击）或「Sold Out」（灰色不可点击）
   - **JustLend DAO 卡片**额外展示：
     - TVL：$333.20M
     - Reward Pool Balance：$635.93K
     - Reward Pool Address（含 ⓘ 图标）

2. 当前上线平台列表（截图时数据）：

| 平台 | APY | 状态 |
|------|-----|------|
| JustLend DAO | 4.74% | GO（可用） |
| HTX | 4.75% | GO（可用） |
| KuCoin | 5.00% | GO（可用） |
| Gate.io | 5.00% | GO（可用） |
| MEXC | 5.00% | GO（可用） |
| LBank | 5.00% | GO（可用） |
| WEEX | 5.00% | GO（可用） |
| BitMart | 5.00% | GO（可用） |
| CoinDCX | 5.00% | GO（可用） |
| AscendEX | 8.00% | Sold Out |
| BingX | 10.00% | Sold Out |
| EXMO | 20.00% | Sold Out |

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E10-01 | 平台名额已满 | GO 按钮替换为「Sold Out」灰色按钮 | 按钮不可点击 |
| E10-02 | APY ⓘ 被点击 | 展示该平台 APY 的说明 Tooltip | ⚠️ 待确认：Tooltip 具体文案 |
| E10-03 | 平台卡片数据加载中 | APY 等数据显示占位符 | ⚠️ 待确认：加载态样式 |
| E10-04 | 平台下线或暂停 | ⚠️ 待确认：卡片是否隐藏或显示特殊状态 | ⚠️ 待确认 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-17 | 合作平台列表由后台配置，APY 数据实时拉取（⚠️ 待确认：拉取频率与来源） | 页面加载 | 加载失败显示「--」 |
| BR-EARN-18 | Sold Out 状态表示该平台当期名额已满，用户无法通过该入口存款 | 页面加载时根据状态渲染按钮 | 按钮显示「Sold Out」且置灰 |
| BR-EARN-19 | Tron Earn 不在 App 内直接处理存取款，点击 GO 跳转第三方平台，资金安全由对应平台负责 | N/A | N/A |

---

### F11: 跳转合作平台（Tron GO）

#### 用户故事
> 作为**Tron 链用户**，我希望点击「GO」后直接进入对应平台的存款页面，减少操作步骤。

#### 主流程（Happy Path）
1. 用户点击某平台卡片内「GO」按钮
2. 系统在**新标签页**打开对应合作平台的存款页面
3. 用户在第三方平台自行完成存款操作

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-EARN-20 | GO 按钮跳转目标 URL 为各平台存款页，在新标签页打开 | 点击时 | ⚠️ 待确认：目标 URL 是否为固定链接或动态生成 |
| BR-EARN-21 | Sold Out 状态的 GO 按钮不可点击，无跳转行为 | 点击时 | 无响应 |

---

### F12: APY 说明与 Staking Campaign（Tron）

> **截图参考**：[tron-apy-explanation.png](../prototype/screenshots/earn/tron-apy-explanation.png)

#### 用户故事
> 作为**Tron 链用户**，我希望了解 APY 的计算方式和 Staking 活动规则，以便做出存款决策。

#### 主流程（Happy Path）
1. 页面底部展示两个标签：「USDD Staking Campaign」「USDD Earn APY Explanation」
2. **USDD Staking Campaign**（默认选中）：
   - 活动规则说明：USDD 2.0 新分级收益体系介绍，APY 与链上 USDD TVL 关联动态调整
   - 链接：「here」（详情页）和「announcement」（官方公告）
3. **USDD Earn APY Explanation**：
   - 介绍 USDD Earn（USDD Savings Rate）机制
   - 说明初期由 TRON DAO 补贴最高 20%，长期由治理机制调整
   - 「How USDD Earn Works」折叠区：Phase 1（通过 JustLend）和 Phase 2（直接通过 USDD Earn 合约）两阶段说明
   - 「Volatility of USDD Earn APY」折叠区：解释 APY 随市场需求和治理波动的原因

---

## 四、模块级总览

### 4.1 页面流程

**ETH / BSC Earn：**
- 用户访问 `/eth/earn` 或 `/bsc/earn`
  - 未连接钱包 → 展示 **Earn 主页**，CTA 显示「Connect Wallet」
    - 点击「Connect Wallet」→ **钱包选择弹窗** → 连接成功 → CTA 切换为「Deposit」
  - 已连接钱包 → 展示 **Earn 主页**，面板显示余额与 Savings Balance

- **Deposit 流程**：
  - 输入金额 → 点击「Deposit」
    - 首次（allowance 不足）→ 显示「Approve」→ 钱包确认 Approve → 按钮变为「Deposit」→ 钱包确认存款 → 完成
    - 非首次（allowance 充足）→ 钱包确认存款 → 完成

- **Withdraw 流程**：
  - 切换至「Withdraw」标签 → 输入金额 → 点击「Withdraw」→ 钱包确认 → 完成

**Tron Earn：**
- 用户访问 `/tron/earn` → 展示**合作平台列表页**
  - 选择平台 → 点击「GO」→ 新标签页跳转第三方平台（后续操作在第三方完成）

### 4.2 模块依赖关系

**本模块包含以下子模块：**

1. **ETH/BSC 直接存取款**：Deposit / Withdraw 操作面板 + sUSDD 机制 — 负责链上存取款交易
2. **Tron 合作平台聚合**：合作平台列表 + GO 跳转 — 负责流量导流至第三方

**与其他模块的关系：**
- **PSM**：用户可通过 PSM 将 USDT 兑换为 USDD，再来 Earn 存款；钱包连接态共享
- **Vault**：共享全局钱包连接态
- **Migrate**：同处主导航，无直接数据依赖

### 4.3 已知待优化项

| # | 描述 | 影响 | 建议优先级 |
|---|------|------|----------|
| 1 | Tron Earn 与 ETH/BSC Earn 是两种完全不同的产品形态，但共用同一「Earn」导航入口，用户从其他链切换过来会感到困惑 | 用户预期落差，可能误以为 Tron 没有直接存款功能 | P1 |
| 2 | Tron 合作平台卡片中，仅 JustLend DAO 展示了 TVL 和 Reward Pool 数据，其他平台缺乏同等信息，用户难以横向对比 | 影响用户决策质量 | P2 |
| 3 | Sold Out 平台仍显示在列表中，且显示高 APY（如 EXMO 20%、BingX 10%），可能形成「诱导式」展示，用户看到高 APY 却无法操作 | 用户体验负面，可能引发投诉 | P1 |
| 4 | Withdraw 面板对于 Savings Balance 为 0 的用户缺少引导提示（如「您尚未存款，去 Deposit 吧」） | 新用户不知道为何无法操作 | P2 |
| 5 | APY 数字在 Hero 区以「X.XX% APY!」形式展示，但 Deposit 面板内同时也有 APY 展示，两处是否始终一致需明确 | 数据不一致会影响用户信任 | P1 |

### 4.4 迭代建议

| 优先级 | 建议 | 原因 |
|-------|------|------|
| P1 | Tron Earn 页面增加明显的产品说明，告知用户「Tron 链通过合作平台存款，点击 GO 跳转」 | 减少用户因两种模式差异产生的困惑 |
| P1 | Sold Out 平台改为排序至末尾或收起，避免高 APY 吸引点击后无法操作 | 改善用户体验，减少无效操作 |
| P2 | Deposit 成功后增加确认引导（如「存款成功，您现在持有 X sUSDD，预计年化收益 X USDD」） | 帮助用户建立 sUSDD 的价值感知 |
| P2 | APY 历史图表增加鼠标悬停时显示具体日期和数值的 Tooltip | 提升图表可读性 |

---

## 质量自检清单

- [x] 主流程步骤描述以用户视角和页面内容为主，无代码级实现描述
- [x] 异常流程覆盖了至少 5 种以上场景
- [x] 业务规则有明确的校验时机和失败处理方式
- [x] 截图/设计稿有引用或标记为待补充
- [x] 标注了所有不确定的点（⚠️ 待确认）
- [x] 待优化项从产品和用户体验角度提出
- [x] 源码索引折叠展示，不干扰产品阅读
- [x] Tron 与 ETH/BSC 两种模式差异已在文档开头显式说明
- [x] 三链数据差异已用对比表格呈现
