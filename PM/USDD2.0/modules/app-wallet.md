# 钱包连接 — Wallet Connection

---

## 一、文档元数据

| 字段 | 说明 |
|------|------|
| **项目名称** | USDD 2.0 / Decentralized USD |
| **模块名称** | 钱包连接 / Wallet Connection |
| **适用范围** | 全局公共模块，PSM、Earn、Vault、Migrate、Liquidation 等所有需要链上操作的页面均使用同一套连接逻辑 |
| **关联模块** | PSM（兑换需连接）、Earn（存取款需连接）、Vault（铸造/赎回需连接）、Migrate（迁移需连接） |
| **外部依赖** | WalletConnect 协议、各链原生钱包 SDK（TronLink、MetaMask 等）、各链 RPC 节点 |

### 截图/原型参考

| 页面 | 截图 | 说明 |
|------|------|------|
| 钱包选择弹窗 — Tron | [tron-connect-modal.png](../prototype/screenshots/psm/tron-connect-modal.png) | TronLink / Binance / OKX / TokenPocket / imToken / WalletConnect |
| 钱包选择弹窗 — ETH | [eth-connect-modal.png](../prototype/screenshots/psm/eth-connect-modal.png) | MetaMask / Binance / OKX / Bitget / WalletConnect |
| 钱包选择弹窗 — BSC | [bsc-connect-modal.png](../prototype/screenshots/psm/bsc-connect-modal.png) | MetaMask / Binance / OKX / Bitget / WalletConnect |
| 连接中间态（等待钱包确认） | [wallet-confirm-connecting.png](../prototype/screenshots/wallet/wallet-confirm-connecting.png) | App 内显示「Confirm in your wallet...」loading 弹窗，同时浏览器钱包插件弹出账户授权窗 |
| 已连接态下拉面板 | [wallet-connected-dropdown.png](../prototype/screenshots/wallet/wallet-connected-dropdown.png) | 点击右上角地址后展开，显示余额（原生币 / USDD / sUSDD）+ Disconnect 按钮 |
| WalletConnect 二维码弹窗 | [wallet-connect-qrcode.png](../prototype/screenshots/wallet/wallet-connect-qrcode.png) | 标题「WalletConnect」+ 二维码 + Copy link 按钮 + Search Wallet 搜索框（支持 380+ 钱包） |

### 设计稿

> 本模块的设计稿统一维护在 [figma-design-index.md](../figma-design-index.md) 的「公共组件 - 钱包连接」部分。
>
> 开发实现时以设计稿为**视觉标准**，本文档为**功能与逻辑标准**。如二者不一致，以设计稿最新版为准并同步更新本文档。

### 源码索引（供 Dev 参考）

<details>
<summary>点击展开关键文件清单</summary>

> ⚠️ 待补充：前端同学补充后更新此表。

| 类别 | 文件路径 | 说明 |
|------|---------|------|
| 全局状态 | `src/store/wallet/` | 钱包连接状态、地址、链信息 |
| 业务逻辑 | `src/hooks/useWallet.ts` | 连接 / 断开 / 切换钱包逻辑 |
| 组件 | `src/components/WalletModal/` | 钱包选择弹窗 UI 组件 |
| 服务层 | `src/services/walletService.ts` | 各链 SDK 适配层 |

</details>

---

## 二、功能清单（Feature Inventory）

| # | 功能名称 | 功能描述 | 入口/触发方式 | 用户角色 | 优先级 | 状态 |
|---|---------|---------|-------------|---------|-------|------|
| F01 | 连接钱包 | 弹出钱包选择弹窗，引导用户选择并授权钱包连接 | 右上角「Connect Wallet」按钮 / 各页面功能区 CTA 按钮 | 未连接用户 | P0 | 已实现 |
| F02 | 已连接态展示 | 连接成功后，右上角展示钱包地址缩略 + 链图标 | 连接成功后自动更新 | 已连接用户 | P0 | 已实现 |
| F03 | 已连接账户面板 & 断开钱包 | 点击右上角地址展开面板，查看余额并可断开连接 | 点击右上角钱包地址 | 已连接用户 | P1 | 已实现 |
| F04 | 未安装钱包引导安装 | 检测到所选钱包未安装时，提供安装跳转入口 | 钱包选择弹窗内 | 未安装对应钱包的用户 | P1 | 已实现 |

---

## 三、功能详细 Spec

---

### F01: 连接钱包

> **截图参考**：
> - Tron：[tron-connect-modal.png](../prototype/screenshots/psm/tron-connect-modal.png)
> - ETH：[eth-connect-modal.png](../prototype/screenshots/psm/eth-connect-modal.png)
> - BSC：[bsc-connect-modal.png](../prototype/screenshots/psm/bsc-connect-modal.png)

#### 用户故事
> 作为**未连接钱包的用户**，我希望快速连接我使用的钱包，以便在 USDD App 上完成链上操作。

#### 前置条件
- 用户未连接钱包
- 用户已安装对应链的钱包扩展程序 / App，或可通过 WalletConnect 扫码连接

#### 触发入口（全局）

| 触发位置 | 按钮文案 | 说明 |
|---------|---------|------|
| 页面右上角（全局导航栏） | 「Connect Wallet」 | 任意页面均可触发，连接后不跳转 |
| PSM 兑换表单 CTA 区 | 「Connect Wallet」 | 连接成功后 CTA 切换为「Swap」 |
| Earn Deposit / Withdraw 面板 CTA 区 | 「Connect Wallet」 | 连接成功后 CTA 切换为「Deposit」/「Withdraw」 |
| Vault 操作面板 CTA 区 | 「Connect Wallet」 | 连接成功后切换为对应操作按钮 |

#### 主流程（Happy Path）

1. 用户点击任意「Connect Wallet」入口
2. 系统弹出**钱包选择弹窗**，内容包含：
   - 弹窗标题：「Please Connect Your Wallet」
   - 副标题：「Connect to an [当前链名] wallet」
   - 钱包选项列表（图标 + 名称 + 状态标签，详见各链支持列表）
   - 底部免责声明：「Clicking to 'Connect' indicates your acceptance of the Terms of Service and Privacy Policy」
3. 用户点击目标钱包选项（以已安装的浏览器扩展钱包为例）
4. 钱包选择弹窗切换为**「Confirm in your wallet...」loading 中间态**：
   - 弹窗内容替换为钱包图标（旋转动画）+ 文案「Confirm in your wallet...」+ 两个进度点
   - 同时，浏览器钱包插件自动弹出**账户授权窗口**，包含：
     - App 信息：「USDD / app.usdd.io」
     - 可连接账户：钱包地址（全长）+ 账户昵称（如「钱包 A - 账户 01」），右侧「>」箭头可切换账户
     - 权限说明：「允许当前 DApp 连接你的插件钱包」
     - 操作按钮：「取消」（左）| 「连接」（右，绿色）
5. 用户在钱包插件窗口点击「连接」完成授权
6. 连接成功：
   - App 内弹窗自动关闭
   - 右上角显示**已连接态**：链图标 + 钱包地址缩略（如 `0xc6...9b14`）
   - 当前页面功能区 CTA 按钮切换为对应操作按钮

#### 各链支持钱包

| 链 | 支持的钱包 |
|----|-----------|
| Tron | TronLink、Binance Wallet、OKX Wallet、TokenPocket、imToken（仅 App，无浏览器扩展）、WalletConnect |
| Ethereum | MetaMask、Binance Wallet、OKX Wallet、Bitget Wallet、WalletConnect |
| BNB Chain | MetaMask、Binance Wallet、OKX Wallet、Bitget Wallet、WalletConnect |

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E01-01 | 用户选择的钱包未安装 | 不唤起钱包，提供安装入口 | 钱包选项右侧显示「Install」标签，点击在新标签页跳转官方安装页 |
| E01-02 | 用户在钱包内拒绝授权 | 连接取消，弹窗恢复初始状态 | 弹窗保持打开，无错误提示 |
| E01-03 | 用户关闭钱包选择弹窗 | 连接中断，保持未连接态 | 弹窗关闭，CTA 保持「Connect Wallet」 |
| E01-04 | 钱包连接超时 | ⚠️ 待确认 | ⚠️ 待确认：是否显示超时提示 |
| E01-05 | 钱包连接请求失败（状态码异常等） | 右上角显示失败 Toast | Toast 文案：「Connect wallet failed / [错误原因]」 |
| E01-06 | imToken（Tron 链）选项 | 不展示扩展安装入口，仅支持 App 扫码 | 选项标注「App only」 |
| E01-07 | WalletConnect 选项 | 弹出独立二维码弹窗 | 弹窗标题「WalletConnect」，包含：① 二维码（中心为 WalletConnect logo）② 文案「Scan this QR Code with your phone」③「Copy link」按钮（复制连接链接）④ 搜索框「Search Wallet」（支持 380+ 移动端钱包） |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-WALLET-01 | 点击任意钱包选项即视为同意服务条款和隐私政策，弹窗底部展示免责说明，不单独弹确认框 | 用户点击钱包选项时 | N/A |
| BR-WALLET-02 | 未安装的钱包不可直接连接，显示「Install」标签 | 渲染钱包列表时检测 | 展示 Install 引导 |
| BR-WALLET-03 | 钱包连接状态全局共享，一次连接在 PSM / Earn / Vault 等所有页面生效，无需重复连接 | 连接成功后 | N/A |
| BR-WALLET-04 | 每条链有各自独立的支持钱包列表，切换链后弹窗展示对应链的钱包选项 | 弹窗打开时 | N/A |

---

### F02 + F03: 已连接账户面板 & 断开钱包

#### 用户故事
> 作为**已连接钱包的用户**，我希望随时查看当前账户的余额信息，并能在需要时断开连接。

#### 主流程（Happy Path）

**已连接态导航栏展示：**

连接成功后，全局导航栏右上角持续展示：
- **链图标**：当前链的品牌图标（Tron 红 / ETH 蓝 / BSC 黄，对应不同颜色）
- **钱包地址**：缩略格式 `0xXX...XXXX`（前 4 位 + 后 4 位）

**点击地址 → 展开账户面板：**

点击右上角地址后，展开**账户下拉面板**，内容包含：
- **地址行**：完整缩略地址（如 `0xc6...9b14`）+ 复制图标，点击复制完整地址
- **余额列表**（当前链相关代币）：
  - 原生代币（BNB / ETH / TRX）：显示余额，如 `BNB　0.000802`
  - USDD：显示余额，如 `USDD　0`，右侧带「+」图标，鼠标悬停显示「Add USDD to wallet」，点击将 USDD 添加至钱包资产列表
  - sUSDD：显示余额，如 `sUSDD　0`，右侧带「+」图标，鼠标悬停显示「Add sUSDD to wallet」，点击将 sUSDD 添加至钱包资产列表
- **Disconnect 按钮**：带断开图标，点击断开钱包连接

**断开后状态：**
- 账户面板关闭
- 全局导航栏恢复「Connect Wallet」按钮
- 所有页面功能区 CTA 按钮恢复「Connect Wallet」
- 余额、Savings Balance 等数据清空显示「--」

#### 各链账户面板余额展示

| 链 | 原生代币 | 稳定币 |
|----|---------|-------|
| Tron | TRX | USDD、sUSDD |
| Ethereum | ETH | USDD、sUSDD |
| BNB Chain | BNB | USDD、sUSDD |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-WALLET-05 | 导航栏地址显示格式为「前 4 位...后 4 位」缩略 | 连接成功时 | N/A |
| BR-WALLET-06 | 账户面板余额从链上实时读取，原生代币 + USDD + sUSDD | 面板展开时 | 加载失败显示「--」 |
| BR-WALLET-07 | 用户在外部钱包内切换网络，不影响当前 App 页面的正常使用（钱包支持多网络，无需重新连接） | 实时监听 | 无提示，正常可用 |
| BR-WALLET-08 | Disconnect 操作仅断开 App 与钱包的连接，不影响钱包本身的资产和状态 | 点击 Disconnect 时 | N/A |

---

### F04: 未安装钱包引导安装

#### 用户故事
> 作为**尚未安装目标钱包的用户**，我希望在选择钱包时看到安装入口，以便快速完成安装后返回连接。

#### 主流程（Happy Path）

1. 用户打开钱包选择弹窗
2. 系统检测浏览器已安装的钱包扩展（⚠️ 待确认：检测机制）
3. **未安装的钱包**：选项右侧显示「Install」标签（绿色）
4. 用户点击「Install」
5. 系统在**新标签页**打开该钱包的官方安装页（Chrome 应用商店或官网）
6. 弹窗保持打开，用户安装完成后回到 App 刷新即可连接

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-WALLET-07 | 安装链接跳转至钱包官方渠道（扩展商店或官网），在新标签页打开 | 点击 Install 时 | N/A |
| BR-WALLET-08 | 安装入口仅针对支持浏览器扩展的钱包；仅 App 支持的钱包（如 imToken）不显示 Install，展示「App only」说明 | 渲染时 | N/A |

---

## 四、模块级总览

### 4.1 连接流程

**初次连接：**
- 用户进入任意页面 → CTA 显示「Connect Wallet」
  - 点击「Connect Wallet」→ **钱包选择弹窗**（「Please Connect Your Wallet」）
    - 钱包已安装（浏览器扩展）→ 弹窗切换为「Confirm in your wallet...」loading 态 → 浏览器扩展弹出账户授权窗
      - 用户点击「连接」→ 连接成功 → 弹窗关闭，全局切换已连接态
      - 用户点击「取消」→ 弹窗恢复钱包列表初始态
    - 钱包未安装 → 选项显示「Install」→ 点击跳转安装页（弹窗保持打开）
    - 用户关闭弹窗 → 保持未连接态

**已连接态操作：**
- 点击右上角地址 → **账户面板下拉**（余额 + Disconnect）
  - 点击 Disconnect → 断开连接 → 全局恢复未连接态
  - 点击复制图标 → 复制完整地址到剪贴板

**已连接态（页面刷新/重新访问）：**
- 系统自动恢复上次的连接状态（⚠️ 待确认：是否依赖钱包本身的持久化，还是 App 侧有本地存储）

### 4.2 与各模块的关系

| 模块 | 依赖方式 | 连接后 CTA 变化 |
|------|---------|----------------|
| PSM | 未连接时 CTA = Connect Wallet | 连接后变为「Swap」 |
| Earn（ETH/BSC） | 未连接时 CTA = Connect Wallet | 连接后变为「Deposit」/「Withdraw」 |
| Earn（Tron） | 不依赖钱包（点击 GO 跳第三方） | 无变化 |
| Vault | 未连接时 CTA = Connect Wallet | 连接后变为对应操作按钮 |
| Migrate | 未连接时 CTA = Connect Wallet | 连接后变为「Migrate」 |

### 4.3 已知待优化项

| # | 描述 | 影响 | 建议优先级 |
|---|------|------|----------|
| 1 | 用户拒绝授权后，App 内弹窗恢复初始态但无任何提示，用户不清楚为何操作没有继续 | 困惑，可能重复操作 | P2 |
| 2 | 账户面板中「+」添加代币按钮缺乏初次使用引导，用户可能不知道该功能的存在 | 降低代币可见性，影响用户追踪余额 | P3 |
| 3 | 页面刷新后是否自动恢复连接态，行为待明确，不同钱包表现可能不一致 | 用户需重复连接，体验割裂 | P1 |

### 4.4 迭代建议

| 优先级 | 建议 | 原因 |
|-------|------|------|
| P1 | 断开连接后考虑增加确认弹窗（「确认断开连接？」），避免误触 Disconnect | 用户误操作后需重新连接，体验受损 |
| P2 | 用户在钱包插件内拒绝授权后，App 弹窗给出友好提示（如「授权已取消，如需连接请重新选择钱包」） | 减少用户困惑 |

---

## 质量自检清单

- [x] 主流程步骤描述以用户视角和页面内容为主，无代码级实现描述
- [x] 异常流程覆盖了至少 5 种以上场景
- [x] 业务规则有明确的校验时机和失败处理方式
- [x] 截图有引用，缺失项标记为待补充
- [x] 标注了所有不确定的点（⚠️ 待确认）
- [x] 待优化项从产品和用户体验角度提出
- [x] 源码索引折叠展示，不干扰产品阅读
- [x] 各触发入口已按页面分类列出
- [x] 各链支持钱包差异已用表格呈现
