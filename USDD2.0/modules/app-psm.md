# 稳定币兑换模块 — Swap(PSM)

---

## 一、文档元数据

| 字段 | 说明 |
|------|------|
| **项目名称** | USDD 2.0 / Decentralized USD |
| **模块名称** | 稳定币兑换 / Swap(PSM) — Peg Stability Module |
| **关联模块** | Earn（兑换后可直接存入储蓄）、Vault（共享钱包连接态）、Migrate（同处主导航） |
| **外部依赖** | 链上 PSM 智能合约（Tron / Ethereum / BNB Chain）、钱包连接服务（WalletConnect 协议及各链原生钱包 SDK）、价格预言机（确认 1:1 汇率） |

### 截图/原型参考

| 页面 | 截图 | 说明 |
|------|------|------|
| PSM 主页 — Tron | [查看截图](../prototype/screenshots/psm/tron-main.png) | Headless 截图，无钱包连接态（需补充已连接截图） |
| PSM 主页 — Ethereum | [查看截图](../prototype/screenshots/psm/eth-main.png) | 未连接状态，显示 Connect Wallet 按钮与推广 Banner |
| PSM 主页 — BNB Chain | [查看截图](../prototype/screenshots/psm/bsc-main.png) | 未连接状态，显示 BNB Chain 推广 Banner |
| From 代币下拉 — Tron | [查看截图](../prototype/screenshots/psm/tron-token-dropdown.png) | 展示 USDT / USDD 两个选项 |
| From 代币下拉 — ETH | [查看截图](../prototype/screenshots/psm/eth-token-dropdown.png) | 展示 USDT / USDC / USDD 三个选项 |
| From 代币下拉 — BSC | [查看截图](../prototype/screenshots/psm/bsc-token-dropdown.png) | 展示 USDT / USDD 两个选项 |
| 连接钱包弹窗 — Tron | [查看截图](../prototype/screenshots/psm/tron-connect-modal.png) | TronLink / Binance / OKX / TokenPocket / imToken / WalletConnect |
| 连接钱包弹窗 — ETH | [查看截图](../prototype/screenshots/psm/eth-connect-modal.png) | MetaMask / Binance / OKX / Bitget / WalletConnect |
| 连接钱包弹窗 — BSC | [查看截图](../prototype/screenshots/psm/bsc-connect-modal.png) | MetaMask / Binance / OKX / Bitget / WalletConnect |
| 网络切换器 | [查看截图](../prototype/screenshots/psm/network-selector.png) | 三链选项及各链支持功能说明 |
| 切换网络后自动触发钱包连接（ETH） | [查看截图](../prototype/screenshots/psm/eth-network-switch-connecting.png) | CTA 显示「Connecting...」loading 态，同时弹出浏览器插件授权弹窗 |
| BSC 已输入金额（Service fee 展示态） | [查看截图](../prototype/screenshots/psm/bsc-amount-with-fee.png) | 输入金额后 Available 下方出现「Service fee: X%」 |
| ETH USDC→USDD 余额不足 | [查看截图](../prototype/screenshots/psm/eth-insufficient-balance.png) | 橙色 banner「Insufficient USDC balance」，Approve 按钮置灰 |
| ETH USDD→USDC 流动性不足 | [查看截图](../prototype/screenshots/psm/eth-low-liquidity.png) | 橙色 banner「USDC liquidity is temporarily low...」，Approve 按钮置灰 |
| Confirm 弹窗 + 拒绝 Toast（ETH） | [查看截图](../prototype/screenshots/psm/eth-confirm-rejected.png) | 应用内确认弹窗 + 右上角红色失败 Toast |

### 设计稿

> 本模块的设计稿统一维护在 [figma-design-index.md](../figma-design-index.md) 的「PSM 模块」部分。
>
> 开发实现时以设计稿为**视觉标准**，本文档为**功能与逻辑标准**。如二者不一致，以设计稿最新版为准并同步更新本文档。

### 源码索引（供 Dev 参考）

<details>
<summary>点击展开关键文件清单</summary>

> ⚠️ 待补充：本模块为逆向生成，暂无源码路径。前端同学补充后更新此表。

| 类别 | 文件路径 | 说明 |
|------|---------|------|
| 页面 | `src/pages/psm/` | PSM 主页面 |
| 业务逻辑 | `src/hooks/usePSM.ts` | Swap 核心逻辑、金额计算 |
| 服务层 | `src/services/psmService.ts` | 合约调用封装 |
| 状态管理 | `src/store/psm/` | PSM 页面状态 |

</details>

---

## 二、功能清单（Feature Inventory）

| # | 功能名称 | 功能描述 | 入口/触发方式 | 用户角色 | 优先级 | 状态 |
|---|---------|---------|-------------|---------|-------|------|
| F01 | 代币兑换（Swap） | 以固定 1:1 汇率在 USDD 与支持稳定币之间兑换 | 顶部导航 Swap(PSM) | 已连接钱包用户 | P0 | 已实现 |
| F02 | 兑换方向切换 | 一键互换 From / To 代币位置 | 点击表单中央双向箭头按钮 | 已连接钱包用户 | P0 | 已实现 |
| F03 | 代币选择 | 从下拉列表选择输入代币 | 点击 From 区域代币选择器 | 所有用户 | P0 | 已实现 |
| F04 | MAX 快捷输入 | 一键填入钱包余额上限 | 点击余额旁 MAX 按钮 | 已连接钱包用户 | P1 | 已实现 |
| F05 | PSM 流动性展示 | 实时展示当前方向的可用 USDD 流动性 | 页面加载 / 方向切换后自动刷新 | 所有用户 | P1 | 已实现 |
| F06 | 连接钱包 | 跳出钱包选择弹窗，引导用户连接 | 点击 CTA「Connect Wallet」或右上角连接区 | 未连接用户 | P0 | 已实现 |
| F07 | 网络切换 | 在 Tron / ETH / BSC 间切换 PSM | 点击顶部网络图标弹出网络选择器 | 所有用户 | P0 | 已实现 |
| F08 | 说明面板 | 展示 PSM 定义、价值、机制的静态说明 | 页面右侧常驻 | 所有用户 | P2 | 已实现 |
| F09 | 外链跳转 | 跳转至 Mechanism / PSM Contracts / Audit Report 页面 | 点击说明面板底部三个按钮 | 所有用户 | P2 | 已实现 |
| F10 | 推广 Banner | 展示当前链上的合作活动推广信息（可点击跳转） | 页面底部自动展示 | 所有用户 | P2 | 已实现（ETH/BSC），Tron 无 |

---

## 三、功能详细 Spec

### F01 + F02 + F03 + F04: 兑换核心流程（Swap）

> **截图参考**：
> - 主页（Tron）：[tron-main.png](../prototype/screenshots/psm/tron-main.png)
> - 主页（ETH）：[eth-main.png](../prototype/screenshots/psm/eth-main.png)
> - 主页（BSC）：[bsc-main.png](../prototype/screenshots/psm/bsc-main.png)
> - 输入金额 + Service fee（BSC）：[bsc-amount-with-fee.png](../prototype/screenshots/psm/bsc-amount-with-fee.png)
> - Confirm 弹窗 + 拒绝 Toast（ETH）：[eth-confirm-rejected.png](../prototype/screenshots/psm/eth-confirm-rejected.png)
>
> **设计稿**：见 [figma-design-index.md](../figma-design-index.md)

#### 用户故事
> 作为**持有 USDT 的 Web3 用户**，我希望以 1:1 的固定汇率将 USDT 兑换成 USDD，以便在 USDD 生态中使用（存入 Earn、参与 Vault 等）。

#### 前置条件
- 用户已连接对应链的钱包（Tron / ETH / BSC）
- 用户钱包中持有待兑换代币余额 > 0
- PSM 合约中有充足的目标代币流动性（Available > 0）
- 网络连接正常

#### 主流程（Happy Path）

1. 用户进入 PSM 页面，系统展示**兑换主页**，包含以下内容：
   - **页面标题**：「Swap(PSM)」，副标题「Swap USDD with Other Stablecoins at a Fixed 1:1 Ratio」
   - **From 区域**：
     - 代币选择器（默认选中 USDT，显示代币图标 + 名称 + 链标识 + 下拉箭头）
     - 金额输入框（占位符「0.00」，可编辑）
     - 余额显示：「Balance: [X] [代币名]」+ 「MAX」快捷按钮
   - **方向切换按钮**：居中的绿色圆形双向箭头图标
   - **To 区域**：
     - 代币选择器（默认选中 USDD，与 From 联动，只显示配对代币）
     - 金额显示框（只读，自动扣除 Service fee 后同步显示）
   - **可用流动性区域**（绿色背景底栏）：「Available: [数量] [代币名]」+ ⓘ 图标
   - **CTA 按钮**：初始为「Swap」或「Approve」（绿色，全宽；ETH/BSC 需先完成 ERC20 授权，见步骤 6）
   - **右侧说明面板**：What is / Why / How does PSM work + 三个外链按钮

2. 用户点击 **From 代币选择器**，系统展示代币下拉列表：
   - Tron：USDT、USDD
   - ETH：USDT、USDC、USDD
   - BSC：USDT、USDD
   - 当前已选中代币高亮显示

3. 用户选择目标代币（如选 USDT），系统：
   - From 代币切换为所选代币
   - To 代币自动切换为配对代币（USDD，或当 From=USDD 时为 USDT/USDC）
   - Available 区域更新为新方向的可用流动性

4. 用户在 From 金额输入框中输入数量（如 100），系统：
   - To 金额自动计算并显示（**扣除 Service fee 后的实收金额**）：
     - USDT ↔ USDD：To = From × 1（费率 0%，等额）
     - USDC ↔ USDD：To = From × 0.998（费率 0.2%，从 To 端扣除）
     - 示例：输入 100,000 USDC → To 显示 99,800 USDD
   - **可用流动性区域**更新显示两行信息：
     - 「Available: [数量] [代币名]」+ ⓘ 图标
     - 「Service fee: [费率]」（输入金额后实时出现，金额为空时不显示）

5. 用户点击「MAX」，系统：
   - 自动将 From 金额填入用户该代币的完整钱包余额

6. 用户点击 CTA 按钮，流程因链和授权状态分支：

   **情况 A：Tron 链（无 ERC20 授权机制）**
   - 按钮直接显示「Swap」→ 用户点击 → 系统弹出**应用内 Confirm 弹窗**（见步骤 6a）→ 用户确认 → 唤起钱包签名弹窗 → 确认 → 链上交易提交 → 完成后更新余额与 Available

   **情况 B：ETH / BSC 链（需 ERC20 授权）**
   - 按钮显示「Approve」→ 用户点击 → 唤起钱包授权弹窗（授权 PSM 合约花费该代币）→ 确认授权 → 按钮切换为「Swap」
   - 用户点击「Swap」→ 系统弹出**应用内 Confirm 弹窗**（见步骤 6a）→ 用户确认 → 唤起钱包签名弹窗 → 确认 → 链上交易提交 → 完成后更新余额与 Available
   - 若用户已授权（授权额度未耗尽），直接显示「Swap」，跳过 Approve 步骤

6a. **应用内 Confirm 弹窗**内容：
   - 标题：「Confirm」+ 关闭按钮（×）
   - 兑换方向图示：From 代币图标 → 箭头 → To 代币图标 + 名称
   - 「You will get」：显示扣费后的实收 To 金额（含代币名）
   - 「Service fee」：显示本次费率（如 0 % 或 0.2 %）
   - 两个操作按钮：「Cancel」（深色，取消返回表单）| 「Swap」（绿色，确认进入钱包签名）

7. 用户点击**方向切换按钮**，系统：
   - From 与 To 代币互换位置（如 USDT→USDD 变为 USDD→USDT）
   - 金额清空
   - Available 对应更新为新方向的流动性

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E01-01 | 输入金额超过钱包余额 | 阻止提交 | 表单与 CTA 按钮之间出现橙色 banner：「Insufficient [代币名] balance」；Approve/Swap 按钮置灰 |
| E01-02 | 输入金额超过 Available 流动性（目标代币流动性不足） | 阻止提交 | 橙色 banner：「[代币名] liquidity is temporarily low. You can swap USDD on exchanges. Contact our community if you need help.」（含 community 超链接）；Approve/Swap 按钮置灰 |
| E01-03 | 输入金额为 0 或空 | 阻止提交 | Swap 按钮置灰，无报错 |
| E01-04 | 输入非数字字符 | 过滤非法字符 | 输入框不接受非数字输入 |
| E01-05 | 钱包余额为 0 | 不阻止输入，阻止提交 | Balance 显示「0 [代币]」，Swap 按钮置灰 |
| E01-06 | 用户在钱包弹窗中拒绝签名 | 交易取消，Confirm 弹窗关闭，回到可输入状态 | 右上角红色 Toast：「Swap [代币名] failed! The transaction executed failed. The user has rejected the request.」 |
| E01-07 | 链上交易失败（Gas 不足等） | 交易失败 | 显示失败提示（⚠️ 待确认具体文案与样式） |
| E01-08 | 网络请求超时 / 合约调用失败 | 交易无法发起 | 显示网络错误提示（⚠️ 待确认） |
| E01-09 | PSM Available 为 0（该方向流动性枯竭） | 阻止 Swap | Available 显示 0，Swap 按钮置灰 |
| E01-10 | 用户在交易进行中再次点击 Swap | 防重复提交 | 按钮 loading 态，不允许重复触发 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-PSM-01 | To 金额 = From 金额 × (1 - Service fee 费率)，费率因代币对而异（USDT↔USDD=0%，USDC↔USDD=0.2%）；费率从 **To 端扣除**，From 输入不变 | 用户输入时实时计算并同步到 To 金额 | 不可修改 To 金额 |
| BR-PSM-02 | From 代币与 To 代币不可相同 | 代币选择时 | 下拉列表中排除当前 To 代币 |
| BR-PSM-03 | 输入金额不得超过用户钱包中该代币余额 | 点击 Swap 前校验 | 按钮置灰，显示余额不足提示 |
| BR-PSM-04 | 输入金额不得超过当前方向 PSM 合约的 Available 流动性 | 点击 Swap 前校验 | 按钮置灰，显示流动性不足提示 |
| BR-PSM-05 | MAX 填入金额 = 用户钱包中该代币（USDT/USDC/USDD）的完整余额。Gas 费由链的原生代币支付（ETH/BNB/TRX），与兑换代币无关，MAX 无需预留 Gas 空间 | 点击 MAX 时 | N/A |
| BR-PSM-06 | 单笔兑换无数量上限 / 下限限制，仅受用户余额（BR-PSM-03）与 PSM 流动性（BR-PSM-04）约束 | 用户输入时 | N/A |
| BR-PSM-07 | Service fee 费率：USDT ↔ USDD = 0%；USDC ↔ USDD = 0.2%（从 To 金额扣除）。费率在用户输入金额后实时展示于表单 Available 区域下方 | 用户输入金额时实时计算并展示 | N/A（仅展示，不阻断流程） |
| BR-PSM-08 | ETH / BSC 链上，ERC20 代币（USDT/USDC/USDD）首次使用 PSM 合约前，需先执行 Approve 授权该合约花费代币；授权额度充足时后续兑换直接显示 Swap，无需重复授权。Tron 链无此机制 | 用户点击 CTA 前检查链上授权额度 | 显示「Approve」按钮，授权完成后自动切换为「Swap」 |

#### 数据依赖与接口清单

| 接口名称 | 请求方式 | 端点 | 主要参数 | 返回内容 | 调用时机 | 缓存策略 |
|---------|---------|------|---------|---------|---------|---------|
| 获取 PSM 可用流动性 | 链上读取 | PSM 合约 | 代币对、链 | Available 数量 | 页面加载、方向切换后 | 实时读取，⚠️ 待确认轮询频率 |
| 获取用户代币余额 | 链上读取 | ERC20/TRC20 合约 | 钱包地址、代币地址 | 余额 | 钱包连接后、交易完成后 | ⚠️ 待确认 |
| 执行 Swap 交易 | 链上写入 | PSM 合约 swap 方法 | From 代币、金额、接收地址 | 交易 hash | 用户确认 Swap | 无缓存 |

---

### F06: 连接钱包

> 钱包连接为全局公共模块，完整 Spec 见 **[wallet.md](./wallet.md)**。
>
> 本页面特有行为：连接成功后，Swap 表单 CTA 按钮从「Connect Wallet」切换为「Swap」（或「Approve」，取决于 ERC20 授权状态）。

---

### F07: 网络切换

> **截图参考**：
> - 网络选择器：[network-selector.png](../prototype/screenshots/psm/network-selector.png)
> - 切换网络后自动触发钱包连接（ETH）：[eth-network-switch-connecting.png](../prototype/screenshots/psm/eth-network-switch-connecting.png)

#### 用户故事
> 作为**持有不同链上稳定币的用户**，我希望在 Tron / ETH / BSC 间切换，以便在对应链上完成兑换。

#### 主流程（Happy Path）

1. 用户点击顶部导航右侧的**网络图标**（圆形链标识）
2. 系统展示**网络选择器弹窗**，列出三条链及各链可用功能：
   - **Tron**：Vault、PSM、Migrate、Earn、Liquidation、Auction
   - **Ethereum**：PSM、Earn
   - **BNB Chain**：PSM、Earn
   - 当前链高亮显示「Selected」
3. 用户选择目标链
4. 系统跳转至该链 PSM 页面（URL 变更，如 /eth/psm），页面刷新展示对应链数据
5. 系统检测浏览器钱包插件状态，分两种情况：

   **情况 A：检测到已安装的钱包插件（如 OKX Wallet、MetaMask）**
   - 系统自动触发钱包连接授权，**直接弹出浏览器插件的账户授权弹窗**（跳过应用内钱包选择弹窗），弹窗内容：
     - 显示 DApp 名称（USDD / app.usdd.io）
     - 可选账户列表（显示地址与账户名）
     - 操作说明：「允许当前 DApp 连接你的插件钱包」
     - 按钮：「取消」| 「连接」
   - 同时 CTA 按钮进入 **「Connecting...」loading 态**（置灰 + 旋转动画）
   - 用户点击「连接」→ 授权成功 → CTA 按钮切换为「Swap」，右上角显示钱包地址
   - 用户点击「取消」→ 连接中断 → CTA 按钮恢复为「Connect Wallet」

   **情况 B：未检测到钱包插件**
   - CTA 按钮显示「Connect Wallet」
   - 用户点击后进入应用内钱包选择弹窗（见 F06）

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-NET-01 | Tron 为全功能链，ETH/BSC 仅支持 PSM 和 Earn | 网络选择器渲染时 | 在网络选项下方展示「Network available for:」说明 |
| BR-NET-02 | 切换到新链后，系统自动检测已安装的浏览器钱包插件并触发连接授权；有插件则直接弹出插件授权弹窗，无插件则显示「Connect Wallet」 | 切换网络后页面加载时 | 连接失败或取消 → CTA 恢复「Connect Wallet」 |

---

### F05: PSM 流动性展示

#### 用户故事
> 作为**准备进行大额兑换的用户**，我希望在提交前了解当前可用的流动性，以便判断是否能完成兑换。

#### 主流程

1. 页面加载完成后，Available 区域展示：「Available: [数量] [代币名]」+ ⓘ 图标
2. 数量为 PSM 合约中当前方向可供兑换的代币余额（实时数据）
3. 用户点击方向切换按钮后，Available 自动更新为反向流动性数据
4. 用户 hover ⓘ 图标，展示 tooltip：「The currently available liquidity in the PSM may fluctuate due to users swapping between stablecoins.」

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-LIQ-01 | Available 展示的是 PSM 合约中目标代币的余量，而非用户余额。hover ⓘ 图标显示 tooltip：「The currently available liquidity in the PSM may fluctuate due to users swapping between stablecoins.」 | 页面加载 / 方向切换 | — |
| BR-LIQ-02 | Available = 0 时，Swap 按钮置灰 | 实时 | 显示流动性不足提示 |

---

## 四、模块级总览

### 4.1 页面流程

**起始判断：**
- 用户访问 PSM 页面 → 系统检查钱包连接状态
  - 未连接 → 展示**兑换表单（只读态）**，CTA 显示「Connect Wallet」
  - 已连接 → 展示**兑换表单（可交互态）**，CTA 显示「Swap」，余额实时加载

**兑换主流程：**
- **PSM 主页** → 输入 From 金额 → To 金额自动同步 → 点击「Swap」
  - 情况 A：校验通过 → 钱包签名 → 链上交易 → 成功提示 → 余额更新
  - 情况 B：余额不足 → 按钮置灰，无法提交
  - 情况 C：流动性不足 → 按钮置灰，无法提交

**连接钱包流程（未连接态触发）：**
- 点击「Connect Wallet」→ **钱包选择弹窗** → 选择钱包
  - 钱包已安装 → 唤起授权 → 授权成功 → 弹窗关闭，页面切换为已连接态
  - 钱包未安装 → 跳转安装页（新标签页打开）

**网络切换流程：**
- 点击顶部网络图标 → **网络选择器** → 选择目标链 → 页面跳转至对应链 PSM URL

### 4.2 模块依赖关系

**本模块核心功能：**

1. **兑换表单**：From/To 代币选择、金额输入、1:1 同步计算、Swap 执行
2. **钱包连接**：各链钱包接入、授权管理
3. **流动性展示**：实时读取 PSM 合约 Available 余量
4. **网络切换**：跨链导航（Tron / ETH / BSC）

**与其他模块的关系：**
- **Vault 模块**：共享钱包连接状态和顶部导航
- **Earn 模块**：PSM 兑换所得 USDD 可直接进入 Earn 存入流程；ETH/BSC 页面展示的推广 Banner 指向 sUSDD Earn 活动
- **Migrate 模块**：同为顶部导航一级入口，无直接功能依赖

### 4.3 多链差异对比

| 维度 | Tron | Ethereum | BNB Chain |
|------|------|----------|-----------|
| 支持代币（From） | USDT、USDD | USDT、USDC、USDD | USDT、USDD |
| CTA 按钮（已连接） | Swap | Swap | Swap |
| CTA 按钮（未连接） | Connect Wallet | Connect Wallet | Connect Wallet |
| 支持钱包 | TronLink、Binance、OKX、TokenPocket、imToken、WalletConnect | MetaMask、Binance、OKX、Bitget、WalletConnect | MetaMask、Binance、OKX、Bitget、WalletConnect |
| 推广 Banner | 无 | 有（Binance Wallet × sUSDD） | 有（Gate DEX × sUSDD） |
| 全局功能覆盖 | Vault+PSM+Migrate+Earn+Liquidation+Auction | PSM+Earn | PSM+Earn |

### 4.4 已知待优化项

| # | 描述 | 影响 | 建议优先级 |
|---|------|------|----------|
| 1 | USDC ↔ USDD 收取 0.2% Service fee，但表单中未显示用户实际扣费金额（仅显示百分比，未换算为具体数值） | 大额兑换时用户无法直观了解实际损耗 | P1 |
| 2 | ⓘ Tooltip 仅说明流动性会波动，但未解释「Available」与用户余额的区别，初次用户仍可能混淆 | 用户误以为 Available 是自己的余额 | P2 |
| 3 | 交易失败 Toast（用户拒绝）已确认文案；交易成功 Toast 文案及样式仍未确认 | 成功反馈缺失可能导致用户重复操作 | P1 |
| 4 | ETH/BSC 未连接钱包时余额显示「--」，未提示用户连接 | 用户不知道为何无法看到余额 | P2 |
| 5 | BSC 不支持 USDC，但 ETH 支持，差异原因未在页面说明 | 跨链用户可能产生困惑 | P2 |
| 6 | Tron 页面无推广 Banner，ETH/BSC 有，推广策略不一致 | 待确认是否为有意为之 | P3 |

### 4.5 迭代建议

| 优先级 | 建议 | 原因 |
|-------|------|------|
| P1 | 在 Service fee 行补充换算后的实际扣费金额（如「Service fee: 0.2% ≈ 0.20 USDC」） | 让用户在大额兑换时直观感知实际损耗，降低负面体验 |
| P1 | 明确 ⓘ 图标的 tooltip 文案，解释 Available 的含义 | 降低用户理解成本 |
| P2 | 增加兑换成功后跳转 Earn 的引导入口 | 提升 Earn TVL，完成用户转化 |
| P2 | 未连接钱包时在余额区域增加「Connect to see balance」提示 | 引导新用户操作 |

---

## 质量自检清单

- [x] 主流程步骤描述以用户视角和页面内容为主，无代码级实现描述
- [x] 异常流程覆盖了至少 5 种以上场景（F01 覆盖 10 种，F06 覆盖 5 种）
- [x] 业务规则有明确的校验时机和失败处理方式
- [x] 截图/设计稿有引用或标记为待补充
- [x] 标注了所有不确定的点（⚠️ 待确认）
- [x] 待优化项从产品和用户体验角度提出
- [x] 源码索引折叠展示，不干扰产品阅读
- [x] 多链差异用对比表格单独说明
