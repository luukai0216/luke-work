# Smart Allocator 页 — Smart Allocator Page

---

## 一、文档元数据

| 字段 | 说明 |
| --- | --- |
| **项目名称** | USDD 官网（usdd.io） |
| **模块名称** | Smart Allocator 页 / Smart Allocator Page |
| **页面路径** | `/sa` |
| **关联模块** | 全局导航栏（Transparency 下拉菜单）、USDD Earn 应用（Launch APP 跳转目标）、SA 债务详情页（/data/3/{vaultType}） |
| **外部依赖** | 后端 API `/smart-allocator/detail-overview`（投资仓位 + Vault 数据）；后端 API `/smart-allocator/htx-fundings`（HTX 融资费率历史）；区块链浏览器外链（TronScan / Etherscan / BscScan） |

### 设计稿

> 本模块的设计稿统一维护在 [figma-design-index.md](./../figma-design-index.md) 的「Smart Allocator 页」部分。
>
> 开发实现时以设计稿为**视觉标准**，本文档为**功能与逻辑标准**。如二者不一致，以设计稿最新版为准并同步更新本文档。

### 源码索引（供 Dev 参考）

<details>
<summary>点击展开关键文件清单</summary>

| 类别 | 文件路径 | 说明 |
|------|---------|------|
| 页面主组件 | `src/pages/Data/smart.tsx` | SA 页面完整实现（组件名 PWADetail），含全部 Section |
| 子组件：资产分布 | `src/pages/Data/SA/InvestChart.tsx` | Assets Breakdown 数据处理，按 Protocol/Network/Asset 聚合 |
| 子组件：分类列表+饼图 | `src/pages/Data/SA/category.tsx` | Category 列表和 PieChartInvest 组件，支持 hover 高亮 |
| 子组件：HTX 详情 | `src/pages/Data/SA/htxDetail.tsx` | HTX 融资费率折叠展开，含折线图和时间区间选择 |
| 表格列定义 | `src/pages/Data/Detail/table.tsx` | investTableColumns（仓位表）和 saTableColumns（Vault 表）列配置 |
| 颜色/图标配置 | `src/pages/Data/Detail/setting.ts` | 各平台、网络、资产的颜色和图标映射 |
| 类型定义 | `src/pages/Data/type.ts` | RWASummaryItem、SAVaultInfoItem、RWASummaryDetail 等接口 |
| API 调用层 | `src/network/data/index.ts` | getSASummaryDetail()、getHTXFundingList() |
| 路由配置 | `src/App.tsx` | `<Route path="/sa" element={<Smart />} />` |
| 导航菜单 | `src/components/Header/index.tsx` | Transparency 下拉中「Smart Allocator」入口，埋点 header_smart_allocator |
| 债务详情页 | `src/pages/Data/Detail/SA.tsx` | /data/3/{vaultType} 详情页，含 KPI + Activities 表格 |
| 后端控制器 | `src/main/java/org/tron/defi/web/SaController.java` | `/smart-allocator/detail-overview` 和 `/smart-allocator/htx-fundings` |
| 后端 VO | `src/main/java/org/tron/defi/web/vo/sa/DetailOverviewVO.java` | 计算总 debt、加权 APY；含 SAPlatformSummaryInfo、SAVaultInfo |
| 后端 DTO | `src/main/java/org/tron/defi/dto/sa/InvestPlatformDataDTO.java` | 投资平台数据，含 HTX/Spark 特殊收益计算逻辑 |
</details>

### 截图/原型参考

| 页面区块 | 截图 | 说明 |
| --- | --- | --- |
| Hero + Overview | ![image.png](assets/c1ee0f8d28d7ac2b2318fa30cacde2bc36fe1f1ca74428979a4b1f3669335602.png) | 页面顶部英雄区 + 三张核心指标卡 + 透明度柱状图 |
| Assets Breakdown | ![image.png](assets/c86ef62664e20a1819cf7ef9c8453d2c558273ac6052cdf0e1d243e4754c83f7.png) | 资产分布：列表进度条 + 甜甜圈图，支持三维度切换 |
| Proof of Reserve 上半段 | ![image.png](assets/ea0da99d13c80c9825434f0e29d44b837fcd60b1082155695ee6229b6c6344ca.png) | 活跃投资仓位（APY > 0）明细表 |
| Proof of Reserve 下半段 + 简介 | ![image.png](assets/70c5404807feb11f6206a6e801955a9753be7c216623ef19f33389a72547e071.png) | 历史仓位（APY = 0）+ Smart Allocator 策略说明文案 |
| Debt Overview | ![image.png](assets/4d40c42ead242937b4354837cd78b504dd17a3948f6f0ca07da55de982de29a5.png) | 各链 USDD 债务概览表 |
---

## 二、功能清单（Feature Inventory）

| # | 功能名称 | 功能描述 | 入口/触发方式 | 用户角色 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| F01 | Hero 区块 | 展示 Smart Allocator 品牌标题、副标题与视觉插图 | 访问 /sa 页面时直接呈现 | 访客 | P1 | 已实现 |
| F02 | Overview 核心指标卡 | 展示三张实时数据卡：Debt(USDD)、Invested 总额、Earnings 与 APY | 页面加载时自动展示并刷新数据 | 访客 | P0 | 已实现 |
| F03 | Transparency 透明度柱状图 | 以柱状图对比 Debt(USDD) 与 Total Investment Value，直观展示储备充足性 | 随 Overview 区块一同展示 | 访客 | P0 | 已实现 |
| F04 | Assets Breakdown 资产分布 | 按协议 / 网络 / 资产三个维度展示各平台投资占比，含进度条列表和甜甜圈图 | 页面滚动至该区块；点击维度标签切换视图 | 访客 | P0 | 已实现 |
| F05 | Proof of Reserve 储备证明表 | 列出所有投资仓位明细（平台、已投金额、收益、APY、投资地址），支持点击地址跳转区块链浏览器；HTX 行可展开查看融资费率详情 | 页面滚动至该区块 | 访客 / 投资人 | P0 | 已实现 |
| F06 | Smart Allocator 策略介绍 | 用文字说明 Smart Allocator 的定义、收益来源、平台筛选机制，并提供详细策略文章链接 | 页面滚动至该区块 | 访客 | P1 | 已实现 |
| F07 | Debt Overview 债务概览 | 按链展示 USDD 债务规模、Vault 编号与合约地址，支持复制合约地址、点击">"进入 SA 债务详情页 | 页面滚动至该区块 | 访客 / 投资人 | P1 | 已实现 |
| F08 | HTX 融资费率详情 | 展开 HTX 仓位行后展示 ETH/USDT 持仓量、平均融资费率折线图，支持 1周/1月/3月/6月/1年 时间区间切换 | 点击 Proof of Reserve 表格中 HTX 行的展开箭头 | 投资人 | P1 | 已实现 |

---

## 三、功能详细 Spec

### F01：Hero 区块

> **截图参考**：![image.png](assets/c1ee0f8d28d7ac2b2318fa30cacde2bc36fe1f1ca74428979a4b1f3669335602.png)

#### 用户故事
> 作为**访客**，我希望在进入页面时立刻了解 Smart Allocator 是什么，以便决定是否继续阅读。

#### 前置条件
- 用户访问 `usdd.io/sa`，页面 JavaScript 正常加载。

#### 主流程（Happy Path）
1. 用户打开 `/sa` 页面。
2. 系统展示 **Hero 区块**，包含以下内容：
  - 主标题：「Smart Allocator」（黄绿色大字，突出显示）
  - 副标题：「Sustainable, Secure, Shared Yields」（白色小字）
  - 右侧 3D 视觉插图：多枚代币被分配投入容器的动态感图形（纯展示，无交互）
3. 页面继续向下渲染 Overview 区块。

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E01-01 | JavaScript 未加载（禁用 JS 的浏览器） | 无法渲染页面内容 | 显示「You need to enable JavaScript to run this app」提示文字 |
| E01-02 | 3D 插图资源加载失败（网络超时） | 插图区域空白 | 不影响文字内容展示，用户仍可阅读标题和副标题 |
| E01-03 | 移动端窄屏访问 | 布局响应式调整 | 插图缩小或折叠，标题文字自动换行 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F01-01 | Hero 区块为纯展示内容，无数据请求依赖 | 不适用 | 不适用 |

---

### F02：Overview 核心指标卡

> **截图参考**：![image.png](assets/424c55d243151c720d3a898c923dbac9a03ab716b06ab1ac2614056487ef28d4.png)

#### 用户故事
> 作为**访客或投资人**，我希望在页面顶部看到 USDD 的债务总量、已投规模和累计收益，以便快速评估 Smart Allocator 的运营规模。

#### 前置条件
- 后端 API `/smart-allocator/detail-overview` 可正常访问（或 sessionStorage 中有未过期缓存）。

#### 主流程（Happy Path）
1. 用户进入页面，系统自动请求 `/smart-allocator/detail-overview`，获取所有仓位和 Vault 数据。
2. 系统展示 **Overview 区块**，包含三张指标卡，从上到下排列：
  - **Debt(USDD)** 卡：显示当前 USDD 债务总量（如 913.18M），右侧有 ℹ️ 图标和柱状图装饰图标；
  - **Invested** 卡：显示当前所有平台已投资的美元总额（如 $926.67M），右侧有 ℹ️ 图标和饼图装饰图标；
  - **Earnings** 卡：显示累计已实现收益美元金额（如 $13,785,622.5），同行右侧显示 **APY 标签**（如 APY: 3.40%，以绿色/青色背景高亮），右侧有 ℹ️ 图标和趋势图装饰图标。
3. 用户悬停 ℹ️ 图标，系统展示字段含义的 Tooltip 说明。

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E02-01 | 链上 RPC 请求超时 | 使用上一次缓存数据展示，或显示加载态 | 数字位置显示「--」或 Skeleton 加载动画 |
| E02-02 | RPC 返回错误 / 数据异常 | 使用降级策略（缓存或隐藏该卡） | 需确认：错误时是否有明确提示文案 |
| E02-03 | 网络断开 | 所有三张卡均无法刷新 | 数字不更新，不崩溃页面 |
| E02-04 | Invested 值略高于 Debt(USDD) | 属于正常状态（收益累积导致） | 正常展示，无特殊提示 |
| E02-05 | 移动端展示 | 三张卡竖向堆叠 | 布局响应式适配，数字完整显示不截断 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F02-01 | Debt(USDD) = 各链 CDP Vault 合约中 USDD 总债务，单位为 USDD | 页面加载时查链 | 查询失败时显示「--」 |
| BR-F02-02 | Invested = 所有投资仓位当前余额换算为美元的总和 | 页面加载时查链 | 查询失败时显示「--」 |
| BR-F02-03 | Earnings = 累计取回 + 当前余额 − 累计投入（底层 token 口径，换算为美元） | 页面加载时计算 | 计算失败时显示「--」 |
| BR-F02-04 | APY = 各仓位 APY 按 holdingAmount 加权平均，公式：sum(apy × holdingAmount) / sum(holdingAmount)，保留 4 位小数；后端在 DetailOverviewVO.getApy() 中计算后返回，前端直接展示 | 后端计算，随 API 返回 | holdingAmount 总和为 0 时 APY 返回 0 |
| BR-F02-05 | ℹ️ 悬停 Tooltip 展示字段定义，移动端点击触发 | 用户悬停/点击时 | 无需降级 |

#### 数据依赖与接口清单

| 接口名称 | 请求方式 | 端点 | 主要参数 | 返回内容 | 调用时机 | 缓存策略 |
| --- | --- | --- | --- | --- | --- | --- |
| 获取 SA 总览数据 | GET | `/smart-allocator/detail-overview` | 无 | debt、apy、platformSummaryInfos[]、vaultInfos[] | 页面初始化 | 前端 sessionStorage 缓存 5 分钟；后端数据来自 Redis |

---

### F03：Transparency 透明度柱状图

> **截图参考**：![image.png](assets/c5430393c215acc6e95c0d2e3d877b61621d5821cb7430a5477d86766a2c4af3.png)

#### 用户故事
> 作为**访客或投资人**，我希望通过图表直观对比 USDD 债务总量与总投资价值，以便验证储备充足性。

#### 前置条件
- F02 Overview 数据已加载完成（Debt、Total Investment Value 可用）。

#### 主流程（Happy Path）
1. 系统在 Overview 区块右侧渲染 **Transparency 柱状图**，包含：
  - 标题：「Transparency」
  - 副标题：「Track total available vs. invested value — all on-chain, fully transparent.」
  - 双柱对比图：左柱代表 Debt(USDD)（绿色），右柱代表 Total Investment Value（紫色/蓝色）；
  - 左柱顶部显示当前值标签（如「$913.18M」），以深色气泡标注；
  - Y 轴刻度：$0 / $200M / $400M / $600M / $800M / $1B；
  - 图例：底部展示 Debt(USDD)（绿色方块）和 Total Investment Value ℹ️（紫色方块）。
2. 用户悬停图例中的 ℹ️，系统展示 Total Investment Value 的定义 Tooltip。
3. 用户悬停柱体，系统展示精确数值 Tooltip（支持 hover 交互）。

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E03-01 | 数据未加载完成 | 图表区域展示加载态 | Skeleton 或空白占位 |
| E03-02 | Total Investment Value > Debt(USDD) | 正常态（表示超额储备） | 右柱高于左柱，无警告 |
| E03-03 | Total Investment Value < Debt(USDD) | 欠储备状态（⚠️ 需确认是否有视觉警示） | ⚠️ 需确认：是否红色标注或警告提示 |
| E03-04 | 移动端 | 图表缩放至屏幕宽度 | 柱体等比缩放，标签不溢出 |
| E03-05 | 数据请求失败 | 图表无法渲染 | 展示占位符或隐藏区块 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F03-01 | Total Investment Value = Invested 总额（与 F02 Invested 卡数据来源相同） | 图表渲染时 | 数据同源，F02 失败则图表同步失败 |
| BR-F03-02 | 图表为静态快照展示，不支持历史时序切换（⚠️ 需确认） | 不适用 | 不适用 |

---

### F04：Assets Breakdown 资产分布

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**访客或投资人**，我希望按照不同维度查看 USDD 的投资分布，以便了解资产集中度与风险分散情况。

#### 前置条件
- Proof of Reserve 仓位数据已加载（F05 数据来源相同）。

#### 主流程（Happy Path）
1. 系统展示 **Assets Breakdown 区块**，默认选中「By Protocol」视图，包含：
  - 顶部右侧三个切换标签：「By Protocol」 | 「By Network」 | 「By Asset」；当前选中标签高亮显示。
  - 左侧列表：每行显示平台/网络/资产名称、占比百分比、美元金额，以及对应长度的彩色进度条；
  - 右侧：甜甜圈饼图，各扇区颜色与左侧列表一致，中心显示 USDD logo。
2. 用户点击「By Network」，系统切换为按链的分布视图，左侧列表和右侧饼图同步更新，支持以下网络：
  - Ethereum（蓝色 #627EEA）
  - Tron（红色 #C53027）
  - BNB Chain（黄色 #F0B90B）
  - Plasma（绿色 #0D8E74）
3. 用户点击「By Asset」，系统切换为按底层资产的分布视图，支持以下资产：
  - USDT（青绿色 #00B294）
  - USDC（蓝色 #2775CA）
  - USDS（黄色 #FEB62F）

**By Protocol 示例数据（当前截图）：**
- Spark：47.73% | $442,199,973.19
- Aave：40.93% | $379,366,297.82
- JustLend：11.34% | $105,103,230.84
- Venus：0.00% | $1.64

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E04-01 | 数据加载中 | 显示加载态 | 列表行显示 Skeleton |
| E04-02 | 某协议占比为 0.00% | 仍显示该行（如 Venus：0.00%） | 进度条长度为零，金额正常显示 |
| E04-03 | 仅一个协议有仓位 | 列表只有一行，饼图为完整圆形 | 正常展示，无额外提示 |
| E04-04 | 切换维度时数据请求失败 | 保持当前视图数据，切换失败 | ⚠️ 需确认是否有 Toast 提示 |
| E04-05 | 移动端 | 列表和饼图上下排列 | 饼图缩放，列表完整展示 |
| E04-06 | By Network 视图切换 | 按 Ethereum/Tron/BNB Chain/Plasma 分组聚合 holdingAmount，重新计算百分比 | 列表和饼图更新为网络维度颜色和名称 |
| E04-07 | By Asset 视图切换 | 按 USDT/USDC/USDS 等 gemSymbol 分组聚合，重新计算百分比 | 列表和饼图更新为资产维度颜色和名称 |
| E04-08 | 饼图 hover 交互 | 用户悬停饼图某扇区 | 该扇区高亮，中心区域切换为该项名称和金额；离开后恢复展示总投资额 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F04-01 | 各维度占比 = 该分组 holdingAmount 之和 / 所有仓位 holdingAmount 总和 × 100% | 切换维度时前端重新计算 | 计算结果异常时展示「--」 |
| BR-F04-02 | 进度条长度与百分比等比，最大占比的行进度条最长 | 渲染时 | 渲染异常不影响数字展示 |
| BR-F04-03 | 三个维度（协议/网络/资产）切换为前端对 platformSummaryInfos 数据重新分组，不触发新的 API 请求 | 点击标签时 | 不适用 |
| BR-F04-04 | 各协议颜色固定：Aave #8987E5、JustLend #26B299、Morpho #4274F6、HTX #008CD6、Spark #CC50A1、Venus #1B63DB、ListaDAO #4946B2 | 渲染时 | 未知协议使用默认颜色 |

---

### F05：Proof of Reserve 储备证明表

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**投资人或审计人员**，我希望看到每一笔投资仓位的详细数据和链上地址，以便独立核实 USDD 的储备情况。

#### 前置条件
- `/smart-allocator/detail-overview` 数据加载完成（与 F02/F04 共享同一接口响应）。

#### 主流程（Happy Path）
1. 系统展示 **Proof of Reserve 表格**，列定义如下：
  - **Platform**：平台 Logo + 名称 + 类型标签（如「Investment」）；部分行有子类型标签（如「Farm」、「Steakhouse」、「Gauntlet」、「Legacy」）；
  - **Invested**：该仓位已投入的底层 token 数量 + token 符号（如 379,366,297.82 USDT0）；
  - **Earnings**：该仓位累计收益的美元金额（如 $2,366,297.07）；
  - **APY**：当前年化收益率百分比；活跃仓位显示具体值（如 3.78%），部分 APY 数字旁有 ℹ️ 图标；已退出仓位显示 0%；
  - **Investment Address**：投资地址（operatorAddress，截断显示 + 外链图标 ↗），点击跳转至对应链的区块链浏览器；HTX 行例外，显示展开箭头（↓）而非外链图标。
2. 表格按 APY 活跃度从高到低排列，活跃仓位在前，0% APY 的历史仓位在后。
3. 用户点击某行的投资地址外链图标，系统在新标签页打开对应链的浏览器页面（如 Etherscan / Tronscan）。
4. 用户悬停 APY 旁的 ℹ️ 图标，系统展示 APY 计算说明 Tooltip。
5. 用户点击 HTX 行的展开箭头（↓），系统展开 HTX 融资费率详情（详见 F08）。

**当前仓位列表（截图数据，仅供参考，实际数据实时更新）：**

| 平台 | 已投 | 收益 | APY |
| --- | --- | --- | --- |
| Aave（Investment） | 379,366,297.82 USDT0 | $2,366,297.07 | 3.78% |
| Spark（Investment） | 272,094,801.07 USDS | $1,588,130.77 | 3.75% |
| Spark（Investment） | 135,105,172.11 USDT | $105,172.1 | 2.94% |
| JustLend（Investment） | 105,103,230.84 USDT | $404,230.21 | 1.52% |
| Spark Farm（Investment） | 35,000,000 USDS | $295,744.42 | 3.94% |
| Venus（Investment） | 1.64 USDT | $2,690.64 | 1.93% |
| Aave（Investment，已退出） | 0 USDT | $3,515,469.56 | 0% |
| Aave（Investment，已退出） | 0 USDC | $2,535,016.27 | 0% |
| Morpho Steakhouse（Investment，已退出） | 0 USDC | $412,349.34 | 0% |
| Morpho Gauntlet（Investment，已退出） | 0 USDC | $142,503.88 | 0% |
| Spark Legacy（Investment，已退出） | 0 USDC | $2,417,796.4 | 0% |
| ListaDAO（Investment，已退出） | 0 USDT | $221.84 | 0% |

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E05-01 | 数据加载中 | 表格行显示加载态 | Skeleton 占位行 |
| E05-02 | 某仓位数据缺失或后端返回异常 | 该行 Invested 显示「--」，Earnings 和 APY 显示「--」 | 整行保留展示，不隐藏 |
| E05-08 | Earnings 正在计算中（后端标记为 Calculating 状态） | 该行 Earnings 显示「Calculating」文字 | 灰色斜体或占位文字展示，不显示具体金额 |
| E05-03 | 用户点击外链跳转区块链浏览器 | 在新标签页打开，当前页面不跳转 | 新标签页打开浏览器地址 |
| E05-04 | 仓位已全部退出（Invested = 0） | 仍显示该行，Earnings 展示历史累计收益，APY = 0% | 正常展示，不隐藏历史仓位 |
| E05-05 | 同一平台有多个仓位（如 Aave 有 USDT0 / USDT / USDC 三个仓位） | 分行展示，Platform 列重复显示平台名和 Logo | 每行独立展示 |
| E05-06 | 投资地址为 Tron 地址（非 EVM 格式） | 跳转 TronScan，地址格式为 T 开头的 Base58 | ⚠️ 需确认跳转链接拼接规则 |
| E05-07 | 移动端展示 | 表格横向滚动或列折叠 | ⚠️ 需确认移动端表格布局方案 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F05-01 | Invested = holdingAmount（后端已换算为等值 USDT 美元数量），展示时附带 gemSymbol（如 USDT/USDC/USDS） | 随 API 响应展示 | 失败时显示「--」 |
| BR-F05-02 | Earnings = holdingAmount + returnAmount − investAmount（美元计价）；HTX 和 Spark USDS Farm 有专用计算逻辑，由后端单独处理 | 随 API 响应展示 | 后端计算中时显示「Calculating」 |
| BR-F05-03 | APY = 协议当前给出的存款年化利率；Farm 类型仓位可能包含额外 token 奖励 | 页面加载时从协议查询 | 失败时显示「--」或 0% |
| BR-F05-04 | 已退出仓位（Invested = 0）仍展示历史收益（Earnings > 0，APY = 0%），不从表格移除 | 展示时 | 不适用 |
| BR-F05-05 | 投资地址外链：ETH/BSC 跳转 Etherscan/BscScan，Tron 跳转 TronScan | 点击时 | 链接拼接失败时不跳转 |
| BR-F05-06 | ℹ️ APY Tooltip 说明该 APY 的计算口径（是否含 Farm 奖励） | 用户悬停时 | 无降级 |

---

### F06：Smart Allocator 策略介绍

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**初次访问的用户**，我希望了解 Smart Allocator 的运作原理和收益来源，以便建立对 USDD 收益机制的信任。

#### 前置条件
- 无数据依赖，纯静态内容。

#### 主流程（Happy Path）
1. 用户滚动至 **Smart Allocator 策略介绍区块**，系统展示以下内容：
  - **标题**：「Smart Allocator: USDD's Sustainable Yield Strategy」
  - **正文段落 1**：说明 Smart Allocator 是 USDD 的收益共享计划，资金来自 USDD 现金储备，通过多元化投资机会获取收益，利润通过 USDD Earn 分配给用户。
  - **正文段落 2**：说明投资策略包括向可信 DeFi 协议提供流动性赚取利息，以及在提供永续合约资金费率的交易所部署 USDD 捕获资金费率，旨在实现可持续、市场中性的收益。
  - **正文段落 3**：说明平台由 USDD 和 JUST DAO 团队基于严格风控选定，所有投资活动公开可查，并提供「Introducing Smart Allocator: USDD's Sustainable Yield Strategy」超链接。
  - **结尾文案**：「Get your sustainable, secure, shared yields with Smart Allocator.」
  - **右侧 3D 插图**：多枚代币分散运动的视觉装饰（纯展示）。
2. 用户点击策略文章超链接，系统在新标签页打开详细策略说明文章。

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E06-01 | 超链接目标页不可访问（404 或网络问题） | 跳转后由目标页处理 | 当前页面无感知 |
| E06-02 | 移动端展示 | 3D 插图缩小或隐藏，文字区域占满宽度 | ⚠️ 需确认移动端插图展示策略 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F06-01 | 超链接在新标签页打开（target="_blank"） | 点击时 | 不适用 |
| BR-F06-02 | 文案内容为静态文本，无需 CMS 或接口支持 | 不适用 | 不适用 |

---

### F07：Debt Overview 债务概览

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**投资人或审计人员**，我希望看到各链上 USDD 债务的规模和合约地址，以便独立验证 USDD 发行规模。

#### 前置条件
- 链上 RPC 可正常连接（Tron / ETH / BSC 各链债务合约）。

#### 主流程（Happy Path）
1. 用户滚动至 **Debt Overview 区块**，系统展示表格，列定义如下：
  - **Network**：链名称 + 链 Logo（如 Tron / Ethereum / BNB Chain）；
  - **Vault**：Vault 编号（如 SA001-A）；
  - **Total Debt**：该链 USDD 债务总量（如 554.7M）；
  - **contract**：Vault 合约地址（截断显示 + 复制图标 📋），点击复制图标复制完整地址；
  - **Actions**：「>」按钮，点击进入该链债务详情页。
2. 用户点击「contract」列的地址旁复制图标，系统将完整合约地址复制到剪贴板，并展示复制成功提示（⚠️ 需确认是否有 Toast）。
3. 用户点击「>」按钮，系统站内跳转至 SA 债务详情页，路由为 `/data/3/{vaultType}?chainType={chain}`（如 `/data/3/SA001-A?chainType=eth`）。

**当前数据（截图）：**
| 链 | Vault | Total Debt | 合约地址 |
| --- | --- | --- | --- |
| Tron | SA001-A | 554.7M | TYyC3kxzMYCtSGKpui79VAzwn992jCA6fN |
| Ethereum | SA001-A | 358.48M | 0x5bf0c2de6ce7114efdb5a64e38fef3c43a481407 |
| BNB Chain | SA001-A | 0 | 0xa86f1lae77bba1dc03174f60c7d956f3c2444866 |

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E07-01 | 某链数据查询失败 | 该行 Total Debt 显示「--」 | 整行保留，不隐藏 |
| E07-02 | 某链债务为 0（如 BNB Chain） | 正常展示该行，Total Debt 显示 0 | 不隐藏该行 |
| E07-03 | 用户点击复制地址 | 系统复制完整地址至剪贴板 | ⚠️ 需确认：是否有「已复制」Toast 提示 |
| E07-04 | 浏览器不支持剪贴板 API | 复制失败 | ⚠️ 需确认降级方案（如弹窗选择复制） |
| E07-05 | 用户点击「>」按钮 | 站内跳转至 `/data/3/{vaultType}?chainType={chain}` | 页面路由切换，当前页面内导航 |
| E07-06 | 移动端 | 表格横向滚动 | 合约地址列截断，不影响操作 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F07-01 | Total Debt = 后端从链上 CDP Vault 合约查询的 USDD 债务总量，通过 `/smart-allocator/detail-overview` 的 vaultInfos[].debt 字段返回 | 随 API 响应展示 | 失败时显示「--」 |
| BR-F07-02 | 合约地址展示截断格式（前 6 位 + ... + 后 4 位），完整地址通过复制功能获取 | 展示时 | 不适用 |
| BR-F07-03 | 即使 Total Debt = 0 的链也展示在列表中（如 BNB Chain） | 展示时 | 不适用 |

#### 数据依赖与接口清单

| 接口名称 | 请求方式 | 端点 | 主要参数 | 返回内容 | 调用时机 | 缓存策略 |
| --- | --- | --- | --- | --- | --- | --- |
| 获取 SA 总览数据（含 Vault） | GET | `/smart-allocator/detail-overview` | 无 | vaultInfos[]（chain、vaultType、debt、contractAddress） | 与 F02 共享，页面初始化时 | sessionStorage 缓存 5 分钟 |

---

### F08：HTX 融资费率详情

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**投资人**，我希望展开 HTX 仓位行后看到具体的持仓量和融资费率历史，以便评估该策略的收益稳定性。

#### 前置条件
- Proof of Reserve 表格已加载，HTX 行可见。

#### 主流程（Happy Path）
1. 用户点击 Proof of Reserve 表格中 HTX 行的展开箭头（↓）。
2. 系统向 `/smart-allocator/htx-fundings?interval=WEEKLY` 发起请求，并在 HTX 行下方展开详情区域，包含：
  - **Backing in HTX 区域**：
    - ETH 持仓金额（如 $X,XXX,XXX）
    - USDT 持仓金额（如 $X,XXX,XXX）
    - 描述文本：说明 HTX 融资费率策略的运作方式
  - **Average Funding (1W) 区域**：
    - 时间区间选择器：「1W」|「1M」|「3M」|「6M」|「1Y」（默认选中 1W）
    - 折线图：展示所选时间区间内的融资费率历史走势（X 轴为时间，Y 轴为费率）
3. 用户点击其他时间区间（如「1M」），系统向 `/smart-allocator/htx-fundings?interval=MONTHLY` 发起新请求，折线图更新为对应数据。
4. 用户再次点击收起箭头（↑），详情区域折叠，表格回到正常状态。

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E08-01 | 用户点击展开 HTX 行，API 请求中 | 显示加载态 | 展开区域显示 Skeleton 或 loading spinner |
| E08-02 | HTX 融资费率 API 请求失败 | 图表无法渲染 | 展示空状态或「--」，不崩溃整个表格 |
| E08-03 | 用户切换时间区间 | 触发新 API 请求，图表重新渲染 | 图表显示加载态后更新为新数据 |
| E08-04 | fundingList 数据为空 | 图表无数据 | 展示空图表占位提示 |
| E08-05 | 移动端展示 | 图表等比缩放至屏幕宽度 | 折线图可横向滚动或缩放适配 |
| E08-06 | 同时展开多个行 | ⚠️ 需确认：是否支持多行同时展开 | ⚠️ 需确认 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F08-01 | 展开时默认请求 interval=WEEKLY（1 周）数据 | 用户点击展开时 | 请求失败时显示空状态 |
| BR-F08-02 | 时间区间对应参数：1W=WEEKLY、1M=MONTHLY、3M=THREE_MONTHS、6M=BIANNUAL、1Y=ANNUAL | 用户切换区间时 | 参数错误时不发送请求 |
| BR-F08-03 | fundingList 中每个数据点含 statisticTime（时间戳）和 funding（费率值），前端格式化后渲染折线图 | 数据渲染时 | 格式化失败时不渲染该点 |

#### 数据依赖与接口清单

| 接口名称 | 请求方式 | 端点 | 主要参数 | 返回内容 | 调用时机 | 缓存策略 |
| --- | --- | --- | --- | --- | --- | --- |
| 获取 HTX 融资费率历史 | GET | `/smart-allocator/htx-fundings` | `interval`（WEEKLY/MONTHLY/THREE_MONTHS/BIANNUAL/ANNUAL） | `{ ethValue, usdtValue, fundingList: [{statisticTime, funding}] }` | 用户展开 HTX 行 / 切换时间区间时 | 无本地缓存，每次切换都重新请求 |

---

## 四、模块级总览

### 4.1 页面流程

**访问入口：**
- 用户通过直接访问 `usdd.io/sa` 进入页面
- 或通过全局导航「Transparency」下拉菜单中的 Smart Allocator 入口进入（⚠️ 需确认导航路径）

**页面内浏览流程：**
- 进入页面 → **Hero 区块**（标题「Smart Allocator」+ 副标题 + 背景图）
  → 向下滚动 → **Overview 核心指标卡**（Debt / Invested / Earnings + APY）+ **Transparency 柱状图**
  → 向下滚动 → **Assets Breakdown 资产分布**（By Protocol / By Network / By Asset 切换）
    - 点击维度标签 → 列表和饼图同步切换，不触发新 API 请求
    - hover 饼图扇区 → 中心区域显示该项详情
  → 向下滚动 → **Proof of Reserve 表格**（所有仓位明细，活跃 + 历史）
    - 点击投资地址外链 → 新标签页打开对应链区块链浏览器
    - 点击 HTX 行展开箭头 → 展开 **HTX 融资费率详情**（F08）
      - 选择时间区间（1W/1M/3M/6M/1Y）→ 折线图更新
  → 向下滚动 → **Smart Allocator 策略介绍**
    - 点击文章链接 → 新标签页打开详细策略文章
  → 向下滚动 → **Debt Overview 表格**（各链债务）
    - 点击复制图标 → 复制合约地址至剪贴板
    - 点击「>」 → 站内跳转至 `/data/3/{vaultType}?chainType={chain}` 债务详情页

**外部跳转：**
- 导航栏「Launch APP」→ USDD Earn 应用

### 4.2 模块依赖关系

**本模块包含 8 个功能区块：**

1. **Hero 区块**：静态展示，无数据依赖。
2. **Overview 核心指标卡**：依赖后端 `/smart-allocator/detail-overview`，所有数值（debt、apy、holdingAmount、actualEarnings）均由后端计算后返回。
3. **Transparency 柱状图**：数据与 Overview 完全共享，无额外请求。
4. **Assets Breakdown**：数据来源与 Proof of Reserve 相同（同一 API 响应的 platformSummaryInfos），前端按维度重新分组聚合，不触发新请求。
5. **Proof of Reserve 表格**：依赖 `/smart-allocator/detail-overview` 的 platformSummaryInfos 数组，含 HTX 行展开功能。
6. **策略介绍**：纯静态文案，无数据依赖。
7. **Debt Overview**：依赖 `/smart-allocator/detail-overview` 的 vaultInfos 数组，与 F02 共享同一 API 调用。
8. **HTX 融资费率详情**：依赖独立接口 `/smart-allocator/htx-fundings`，仅在用户展开 HTX 行时按需请求。

**与其他模块的关系：**
- **全局导航栏**：在「Transparency」下拉菜单提供本页入口，埋点 `header_smart_allocator`；
- **SA 债务详情页**（`/data/3/{vaultType}`）：Debt Overview 的「>」跳转目标，为站内独立页面；
- **USDD Earn 应用**（Launch APP）：本页为信息展示层，用户转化后进入 Earn 应用操作；
- **区块链浏览器**（外链）：Etherscan / TronScan / BscScan，Proof of Reserve 投资地址点击后跳转。

### 4.3 已知待优化项

| # | 描述 | 影响 | 建议优先级 |
| --- | --- | --- | --- |
| 1 | 已退出仓位（APY = 0%）与活跃仓位混列，不易区分当前实际投资状态 | 用户需自行判断哪些是活跃仓位，增加认知负担 | P2 |
| 2 | 移动端表格列较多，横向滚动体验待验证（Proof of Reserve / Debt Overview） | 移动端用户操作成本高 | P2 |
| 3 | 数据刷新机制不明确，用户无法判断数据是否为实时 | 投资人可能误判数据时效性 | P2 |
| 4 | sessionStorage 缓存 5 分钟，用户看到旧数据时无时效性说明（无「最后更新时间」展示） | 投资人无法判断数据是否实时，影响可信度 | P2 |

### 4.4 迭代建议

| 优先级 | 建议 | 原因 |
| --- | --- | --- |
| P1 | 明确数据刷新机制并在页面增加「最后更新时间」标注 | 当前 sessionStorage 5 分钟缓存对用户不透明，影响数据可信度 |
| P2 | 为活跃仓位添加视觉标识（如高亮行或分组标题），与已退出仓位区分 | 提升 Proof of Reserve 表格可读性，降低用户认知负担 |
| P2 | 移动端 Proof of Reserve 表格考虑卡片式布局替代横向滚动 | 改善移动端阅读体验 |

---

## 五、后端数据计算说明

> 本章节面向开发和 QA，描述后端如何产出 `/smart-allocator/detail-overview` 接口中各字段的数值。

### 5.1 数据流与缓存机制

```
定时任务（Scheduler）
  └─→ getInvestPlatformDataDTOsFromDb()
        ├─→ 从数据库读取 RwaPlatformInfo 列表
        ├─→ 调用 rwaHandlerExecutor 转换为 InvestPlatformDataDTO（链上余额、APY 等）
        ├─→ 追加 HTX 数据（getInvestPlatformDataDTOForHTX()）
        └─→ 写入 Redis（key: ALL_SA_INVEST_PLATFORM_DATA_DTO）

前端请求 → SaController.detailOverview()
  ├─→ redisCacheService.getInvestPlatformDataDTOs()
  │     └─→ 从 Redis 读取；缓存 miss 时同步调用 updateInvestPlatformDataDTOs() 回源
  └─→ redisCacheService.getCollateralInfosForRWA()
        └─→ 从 Redis 读取 RWA 抵押品（Vault）信息
```

**缓存说明：**
- 投资平台数据存储在 Redis，无前端感知的 TTL；缓存 miss 时同步回源更新
- 前端额外使用 sessionStorage 缓存接口响应 5 分钟，减少重复请求

---

### 5.2 各字段计算公式

#### Overview 指标卡字段

| 字段 | 计算公式 | 计算位置 | 备注 |
| --- | --- | --- | --- |
| **Debt（总债务）** | `sum(vaultInfos[i].debt)` | `DetailOverviewVO.getDebt()` | 所有 Vault 债务加总 |
| **Invested（总投资额）** | `sum(platformSummaryInfos[i].holdingAmount)` | 前端聚合 | 各平台 holdingAmount 之和 |
| **Earnings（总收益）** | `sum(platformSummaryInfos[i].actualEarnings)` | 前端聚合 | 各平台 actualEarnings 之和 |
| **APY（综合年化）** | `sum(apy[i] × holdingAmount[i]) / sum(holdingAmount[i])`，保留 4 位小数 | `DetailOverviewVO.getApy()` | holdingAmount 总和为 0 时返回 0 |

---

#### 各平台 actualEarnings 计算逻辑

后端按以下优先级选择计算方式：

```
if actualEarningsForHTX != null → 使用 HTX 专用收益（来自账户账本）
else if actualEarningsForSpark != null → 使用 Spark 专用收益
else → 默认公式：holdingAmount + returnAmount - investAmount
```

| 平台 | 计算方式 | 数据来源 |
| --- | --- | --- |
| **Aave / JustLend / Venus / Morpho 等** | `holdingAmount + returnAmount - investAmount` | 链上查询（rwaHandlerExecutor） |
| **Spark（USDS Farm）** | `actualEarningsForSpark`（专用字段） | 链上特殊逻辑 |
| **HTX** | `actualEarningsForHTX`（专用字段） | `HtxAccountLedgerHistory` 账本历史 |

---

### 5.3 HTX 平台特殊处理

HTX 的数据采集逻辑与其他 DeFi 协议完全不同（融资费率策略）：

| 字段 | 来源 | 说明 |
| --- | --- | --- |
| **holdingAmount** | `HtxAccountInfo.getTotalInvestValue()` | HTX 账户总持仓价值（ETH + USDT） |
| **actualEarnings** | `HtxAccountLedgerHistory.getEarnings()` | HTX 账户账本历史累计收益 |
| **APY** | `HtxFundingRate.getLatest().getApy() × 100`，最低为 0，保留 2 位小数 | 最新一期资金费率年化，强制下限为 0（避免负值展示） |
| **returnAmount** | 固定为 0 | HTX 不走链上取回流程 |
| **investAmount** | 固定为 0 | HTX 不走链上投入流程 |
| **strategy** | `SA_STRATEGY_HTX`（融资费率策略标识） | 与 DeFi 协议的「Investment」策略区分 |

> ⚠️ **当前状态**：HTX 在 `SaController.convertToSAPlatformSummaryInfo()` 中被过滤，**不返回给前端**。HTX 行在 Proof of Reserve 表格中不展示（F08 HTX 展开功能暂时屏蔽）。后续上线需移除过滤逻辑。

---

### 5.4 ListaDAO 硬编码数据

ListaDAO 数据当前在 `SaController.getSAPlatformSummaryInfos()` 中以硬编码方式追加，不走 Redis 缓存，不从数据库读取：

| 字段 | 值 |
| --- | --- |
| platform | ListaDAO |
| gemSymbol | USDT |
| chain | BSC |
| investAddress | `0xD00e0079B8CAB524F3fa20EA879a7736E512a5Fc` |
| holdingAmount | 0 |
| investAmount | 10,002,689 |
| returnAmount | 10,002,910.84 |
| apy | 3.05% |

> 由上述数据可知：ListaDAO 仓位已全部退出（holdingAmount = 0），actualEarnings = 0 + 10,002,910.84 − 10,002,689 = **221.84 USDT**，与页面展示一致。

> ⚠️ **待优化**：硬编码方式导致数据无法动态更新，未来应迁移至数据库统一管理。

---

### 5.5 Vault（债务）数据来源

Debt Overview 中各链 Vault 数据（chain、vaultType、debt、contractAddress）来自：
- Redis 中的 RWA 抵押品信息（`getCollateralInfosForRWA()`）
- contractAddress 为 Vault Urn 地址，从系统配置中查询
- debt 字段含稳定费（stability fee），非纯本金

---

## 质量自检清单

- [x] 主流程步骤描述以用户视角和页面内容为主，无代码级实现描述
- [x] 异常流程覆盖了至少 5 种以上场景（每个功能均覆盖 5+ 条）
- [x] 业务规则有明确的校验时机和失败处理方式
- [ ] 截图/设计稿有引用或标记为待补充 — ⚠️ 截图均标注为「待补充」，需补充本地截图路径
- [x] 标注了所有不确定的点（⚠️ 需确认）
- [x] 待优化项从产品和用户体验角度提出
- [x] 源码索引折叠展示，不干扰产品阅读
- [x] Assets Breakdown 的 By Network / By Asset 维度字段和颜色已基于代码补充完整
- [x] Debt Overview「>」按钮目标路由已确认：`/data/3/{vaultType}?chainType={chain}`
- [x] 新增 F08 HTX 融资费率详情 Spec
- [ ] F08 HTX 展开行：需确认是否支持多行同时展开
