# PRD：USDT 零冻结收益季 — 活动页面

> **版本**：v2.3
> **作者**：Rain.Liu
> **日期**：2026-07-03
> **状态**：草稿

---

## 1. 背景与目标

### 1.1 背景

TRON 链上沉淀大量闲置 USDT，持有零收益且面临 Tether 中心化冻结风险。USDD 以「0 冻结 + 0 手续费兑换 + 持有即生息」为差异化卖点，需一个专属活动落地页：
- 承接从 TRONSCAN / TronLink 广告位点击跳转的目标用户
- 传递核心价值主张，降低「USDT → USDD」的认知门槛
- 在页面内直接完成兑换，减少跳转流失
- 引导用户完成兑换并持有，直接贡献 USDD Total Supply 增长

### 1.2 目标

| 层级 | 目标 | 衡量 |
| --- | --- | --- |
| 北极星 | 拉动 PSM 净铸造量（USDT→USDD） | 活动期 PSM 净兑换量 |
| 增长 | 拉新 USDD 持有地址 | 活动期新增持有地址数 |
| 习惯 | 提升留存 | 活动后 PSM 复用率 |
| 页面 | 高效转化 | 参与转化率（Join Now 点击 → 完成 PSM 兑换 → 看板展示） |

### 1.3 非目标

- 不支持调整兑换方向（本页固定 USDT → USDD，反向兑换至 PSM 页）
- 不提供代币切换下拉（From/To 固定，不可修改）
- 不涉及 jUSDD 储蓄产品（独立漏斗）
- 不支持 Ethereum / BNB Chain（本期仅 TRON）
- 不做收益实时链上结算（4% 为外部发放，非协议原生生息）

---

## 2. 目标用户与场景

### 2.1 目标用户

| 用户类型 | 描述 | 特征 |
| --- | --- | --- |
| 结算 / P2P 用户 | 在 TRON 链持有 USDT，资金阶段性闲置数天，对冻结风险敏感 | 主目标人群 |
| 汇款过渡用户 | 资金在途停留，有短期持有但快进快出 | 次要人群，钩子吸引力较弱 |

### 2.2 核心场景

**场景 1：从 TRONSCAN/TronLink 广告点击进入（新用户）**
- 触发：点击 banner 广告，携带 `?src=tronscan` 或 `?src=tronlink` 参数进入活动页
- 用户目标：了解活动、了解 USDD 相对 USDT 的优势、直接完成兑换
- 当前痛点：不了解 USDD 和 USDT 的区别，兑换有顾虑；多次跳转增加流失

**场景 2：已参与用户回访查看收益**
- 触发：已完成兑换，回来查看当前累计收益
- 用户目标：知道我赚了多少、什么时候可以领
- 当前痛点：无法直观看到收益增长，缺乏持有动力

---

## 3. 功能清单

| 编号 | 功能 | 描述 | 优先级 |
| --- | --- | --- | --- |
| F-01 | Hero Banner | 活动主视觉、标题（英文）、核心卖点副标题、「Join Now →」按钮、活动倒计时 | P0 |
| F-02 | 我的收益看板 | 已连接钱包后紧贴 Hero 下方展示：USDD Holdings / Claimable Rewards / Total Earned 三卡片 + Claim History；未连接时完全不渲染 | P0 |
| F-03 | 连接钱包 | 触发全局钱包连接组件（复用 wallet.md）；未连接时点击 Join Now 按钮触发钱包弹窗 | P0 |
| F-04 | 三大价值卡片 | 「Only Hold」「0 Fees」「4% APY」三卡片，紧贴看板（或 Hero）下方，无独立标题行 | P0 |
| F-05 | 活动规则说明 | Campaign Rules（5 条）：收益计算、收益更新时间、参与门槛、领取规则、活动周期 | P0 |
| F-06 | Why USDD 对比表 | USDD vs USDT vs USDC 五维对比：冻结风险 / 收益 / 去中心化 / On-chain exit / Issuer blacklist | P1 |
| F-07 | 活动数据统计 | Participating Addresses + Net USDD Minted（全局数据，无需连接） | P1 |
| F-08 | 收益领取（Claim） | 有可领取收益时展示「Claim X USDD」按钮；点击弹出三步 Modal（Confirm → Signing → Success）；成功后更新看板数据 | P0 |
| F-09 | 提现记录（Claim History） | 看板下方固定高度（~212px）可滚动列表；列：Date / Amount / TX Hash（点击跳转 Tronscan）；无记录时显示「No claims yet」 | P1 |

---

## 4. 用户流程

### 4.1 主流程（未连接钱包 → 首次参与）

```
进入活动页（携带 src 参数）
  → 展示营销落地页（Hero + 三卡片 + 活动规则 + Why USDD + 数据）
  → 用户点击 Hero「Join Now →」按钮
  → 触发全局钱包弹窗（复用 wallet.md 组件）
  → 连接成功
  → Hero 下方展示「My Rewards」看板（三卡片均为 0，Claim History 为空）
  → 用户前往 PSM 页完成 USDT → USDD 兑换
  → 次日看板数据更新（T-1 批处理，最多延迟 2 小时）
```

### 4.2 分支流程（已连接钱包 → 回访查看 / 领取收益）

```
进入活动页（已有钱包连接态）
  → 自动识别连接状态
  → Hero 下方直接展示「My Rewards」看板
    - USDD Holdings：当前持仓量（ⓘ hover 说明；无持仓时提示去 PSM 兑换）
    - Claimable Rewards：可领取金额（ⓘ hover 说明；有余额时显示「Claim X USDD」按钮）
    - Total Earned：历史已结算累计，不含结算中（ⓘ hover 说明）
  → 用户点击「Claim X USDD」
    → 弹出 Claim Modal（Confirm 态）：金额 / 钱包地址 / 网络信息，Cancel 或 Confirm & Sign
    → 点击 Confirm → Signing 态：转圈 + 等待 TronLink 签名提示
    → 签名成功 → Success 态：✓「Claimed Successfully」+ 到账金额 + TX Hash（Tronscan 链接）
    → 点击 Done：关闭 Modal，Claimable 归零，新记录插入 Claim History 首行
```

### 4.3 异常流程

```
钱包断开 / 未连接：
  → 「My Rewards」看板完全隐藏（不显示任何引导卡片）

活动未开始：
  → Hero 显示「Coming Soon」标记，Join Now 按钮置灰

活动已结束：
  → Hero 替换为「Campaign Ended」状态
  → Bottom CTA 按钮变为「View My Rewards ↑」（锚点滚动至看板）
  → 「My Rewards」看板仍可查看最终数据，标注「Campaign ended · Data locked」

网络错误（收益数据拉取失败）：
  → 看板各数值显示骨架屏（shimmer），加载完成后若失败显示「--」
  → 底部警告文案「Failed to load data. Please refresh and try again.」
```

---

## 5. 业务规则

| 编号 | 规则 | 说明 |
| --- | --- | --- |
| BR-01 | 仅展示 TRON 链 | 本期活动只针对 TRON 链，无多链切换 Tab |
| BR-02 | 未连接钱包：看板完全隐藏 | 不替换为引导卡片，看板区域不渲染；Swap 条按钮显示「Connect Wallet」 |
| BR-03 | 连接成功后展示看板 | 「My Rewards」模块展现，数据来源见 REQ-02 |
| BR-04 | 内嵌 Swap 条固定方向 | From=USDT / To=USDD，不可切换；1:1 执行 PSM 兑换，无跳转 |
| BR-05 | 活动倒计时 | 显示距活动结束剩余时间（Days / Hrs / Mins / Secs）⚠️ 活动周期待确认 |
| BR-06 | 收益看板数据刷新 | 页面进入时拉取一次；用户回到 Tab 时刷新一次；每 5 分钟自动刷新 |
| BR-07 | 领取方式 | ⚠️ 待确认：空投模式无 Claim 按钮，第三列显示自动发放提示；Claim 模式显示金额 + Claim 按钮 |
| BR-08 | 活动数据统计 | 全局数据，无需连接钱包即可显示（社会证明） |
| BR-09 | 页面语言 | 页面内容统一英文；导航栏活动入口名称为「Yield Rush」 |
| BR-10 | 收益结算采用固定1小时时间槽 | 时间轴按整点切分为固定槽（如 00:00–01:00、01:00–02:00）；每槽独立结算；槽内任意时刻余额归零则该槽不计收益 |
| BR-11 | 余额时间线通过 Transfer Event 重建 | 不做周期性轮询；当地址首次发生 PSM 兑换时，调用一次 `balanceOf()` 快照作为余额起点，此后通过 USDD Transfer Event 实时更新余额；Transfer Event 本身不定义结算区间 |
| BR-12 | net_psm_swap 定义与归零保护 | net_psm_swap = 活动期内 Σ(USDT→USDD PSM 兑换量) − Σ(USDD→USDT PSM 兑换量)，最小值为 0；活动开始前已持有 USDD 但未发生 PSM 兑换的地址，net_psm_swap = 0，reward_base = 0，不参与收益分配 |

---

## 5.1 收益结算机制详解

> 本节为技术实现规格，供后端/数据团队对齐，前端无需感知。

### 核心公式

```
每个1小时时间槽 [t, t+1h] 的收益：

min_balance  = 该槽内地址 USDD 余额的最小值（通过 Transfer Event 重建）
reward_base  = min(net_psm_swap_累计, min_balance)
slot_reward  = reward_base × 4% ÷ 8760

当日累计收益 = Σ(当日所有槽的 slot_reward)
```

### 时间槽机制

- **固定切分**：时间轴按整点切分，与用户的 Transfer 行为无关
- **槽内余额重建**：利用该槽内发生的所有 Transfer Event，还原余额在时间槽内每个时间点的值，取最低点作为 min_balance
- **槽内归零判定**：若槽内任意时刻余额 = 0（卖出清仓后再买入），min_balance = 0，该槽不计收益
- **Transfer Event 的作用**：仅用于重建余额曲线，不定义结算区间

### 地址追踪触发

| 事件 | 动作 |
| --- | --- |
| 地址首次通过 PSM 合约完成 USDT→USDD 兑换 | 调用 `balanceOf(addr)` 记录入场余额；开始监听该地址的 USDD Transfer Events |
| 后续每次涉及该地址的 Transfer Event | 更新余额时间线 |
| 活动结束时刻 | 关闭所有开放区间，以活动结束时间戳为 t_end 执行最终结算 |

### 典型场景示意

**场景：用户每5分钟 PSM 兑换10 USDD（验证高频操作不影响收益）**

```
T=0m:   balance = 10   （首次 PSM swap，触发 balanceOf 快照）
T=5m:   balance = 20
T=10m:  balance = 30
...
T=55m:  balance = 120

槽 [0h, 1h)：
  min_balance     = 10（槽内最低点，T=0 时刻）
  net_psm_swap    = 120
  reward_base     = min(120, 10) = 10
  slot_reward     = 10 × 4% ÷ 8760 ≈ 0.00457 USDD  ✓ 正常计入

槽 [1h, 2h)：
  T=60m:  balance = 130（延续上一槽末尾余额）
  min_balance     = 130
  reward_base     = min(240, 130) = 130
  slot_reward     = 130 × 4% ÷ 8760 ≈ 0.0594 USDD  ✓ 随持仓增长
```

**场景：用户在槽内卖出清仓再买回（验证归零保护）**

```
槽 [2h, 3h)：
  T=2h00m: balance = 500
  T=2h20m: 卖出全部，balance = 0     ← 归零
  T=2h50m: 买入200，balance = 200

  min_balance = 0  → 该槽不计收益  ✗
```

**场景：活动前已持仓用户在活动中首次PSM兑换（验证追踪触发时机 + 澄清"Transfer Event 不划分区间"）**

> 背景：本场景源于一个常见误解——认为 Transfer Event 会切出"区间"，只有满1小时的区间才计收益。正确逻辑是：区间（时间槽）由固定整点划定，Transfer Event 只更新槽内余额曲线。

```
活动开始前：某地址已持有 500 USDD（未做任何 PSM 兑换，系统不追踪此地址）

活动进行到第3天：

  T=72h20m：用户首次 PSM 兑换 200 USDT→USDD
    → 触发追踪：系统调用 balanceOf()，快照余额 = 700 USDD（500 原有 + 200 新换）
    → net_psm_swap = 200
    → 开始监听该地址的 USDD Transfer Events

  T=72h40m：用户再次 PSM 兑换 100 USDT→USDD（产生一条 Transfer Event）
    → Transfer Event 仅更新余额时间线：balance → 800 USDD
    → ❌ 不创建新区间，时间槽仍为固定的 [72h, 73h)

槽 [72h, 73h)：
  T=72h20m：balance = 700（balanceOf 快照，槽内第一个已知数据点）
  T=72h40m：balance = 800

  min_balance  = 700（槽内最低点，从快照起点计算）
  net_psm_swap = 300（200 + 100 累计）
  reward_base  = min(300, 700) = 300
  slot_reward  = 300 × 4% ÷ 8760 ≈ 0.1370 USDD  ✓

注：T=72h00m–72h20m 这段时间余额未知（追踪尚未开始），min_balance 从快照时刻起算。
    追踪开始前已持有的 500 USDD 不参与收益基数（net_psm_swap 为 0 时 reward_base = 0）。
```

**概念澄清**

|  | 错误理解 | 正确理解 |
| --- | --- | --- |
| 1小时的含义 | 每次 Transfer Event 之间的间隔须 ≥ 1小时才计收益 | 时间轴按整点切成固定槽（00:00–01:00 等），与 Transfer Event 无关 |
| Transfer Event 的作用 | 划分结算区间，每段区间独立计算 | 仅还原槽内余额曲线，为计算 min_balance 提供数据 |
| 高频操作影响 | 每5分钟 swap 一次 → 每段间隔不满1小时 → 无收益 | 每5分钟 swap 一次 → Transfer Events 更新槽内余额曲线 → 按槽正常计算收益 |
| 活动开始时动作 | 对所有持有 USDD 的地址做全量快照 | 仅在地址**首次 PSM 兑换时**触发 balanceOf() 快照，不做全量扫描 |

### 待确认项

| 项目 | 说明 |
| --- | --- |
| 批处理频率 | 建议每日凌晨结算前一日全部时间槽；看板展示 T-1 数据（最多延迟24小时） |
| PSM 反向兑换扣减 | USDD→USDT 是否从 net_psm_swap 扣减，需与合约侧确认 PSM Event 字段 |
| Transfer Event 索引基础设施 | 确认是否已有 TRON USDD Transfer Event 的链下索引服务 |

---

## 6. UI / 交互说明

> 暗色主题，遵循 design.md。设计稿以 1440px Desktop 为基准，移动端 375px 响应式适配。

### 6.1 页面结构（从上到下）

**区域 1：Hero Banner（全宽）**
- 背景：深色渐变（品牌绿 `#216c58` 为底色调），辅以径向光晕装饰
- 左侧内容：
  - Badge：「Live · TRON Exclusive」（活动进行中脉冲动效）
  - 主标题：`USDT Zero-Freeze Yield Season`，Heading 1（46px Semi Bold），「Zero-Freeze」高亮品牌色
  - 副标题：`Hold USDD, earn 4% APY, zero freeze risk`，Body MD，白色 80% 透明
  - **「Join Now →」按钮**：未连接钱包时点击触发钱包弹窗；已连接时滚动至看板
  - Meta 行：`{N} addresses joined · 1:1 PSM · Zero fees · Zero slippage`，Caption 级别
- 右侧内容：
  - 倒计时组件（Days / Hrs / Mins / Secs 四格）⚠️ 活动周期待确认

**区域 2：My Rewards 看板（已连接钱包时，紧贴 Hero 下方展示）**
- 三张数据卡片横排：
  - **USDD Holdings**：当前地址 USDD 余额；label 含 ⓘ 图标，hover 显示 tooltip 说明
  - **Claimable Rewards**：可领取的已结算收益；有余额时展示「Claim X USDD」按钮；label 含 ⓘ hover 说明
  - **Total Earned**：历史已结算累计（不含结算中）；label 含 ⓘ hover 说明（"Settled rewards only · Excludes in-progress settlement"）
- 数字字阶 32px，卡片背景 `--color-bg-card`，圆角 `radius-lg`
- 活动结束态：三卡片顶部标注「Campaign ended · Data locked」
- **未连接钱包时：此区域完全不渲染**（无引导卡片）

**区域 2.1：Claim History（看板卡片下方）**
- 固定高度容器（~212px），内容超出时区域内滚动
- 表头固定：Date / Amount / TX Hash
- 每行：结算日期 / 金额（USDD）/ TX Hash 前 16 字符 + 「...」（点击跳转 Tronscan）
- 无记录时居中显示「No claims yet」

**区域 3：三大价值卡片（横排三列，无标题行）**
- 卡片背景 `--color-bg-section`，圆角 `radius-lg`，hover 边框变品牌色
- 卡片内容（图标 + 标题 + 描述）：
  - ⏱️ **Only Hold** — Hold USDD for any continuous 1-hour window and rewards accrue automatically — no staking, no locking, no minimum amount.
  - ⚡ **0 Fees** — Swap USDT → USDD via PSM at exactly 1:1 — zero protocol fees, zero slippage, zero price impact. Swap back anytime.
  - 📈 **4% APY** — Hold USDD continuously for 1+ hour and earn 4% annual yield — calculated by the hour, paid on your actual holdings.

**区域 4：活动规则（Campaign Rules）**
- 以编号列表展示（5 条）：
  1. **Reward Calculation** — 收益按固定1小时时间槽结算；reward_base = min(累计净PSM兑换量, 该槽最低USDD余额)；年化 4%，公式：reward_base × 4% ÷ 8760；槽内余额归零不计收益
  2. **Reward Updates** — 收益每日 00:00 UTC 结算，T+2h 内更新至看板（最多延迟 26 小时）；结算中收益不计入 Total Earned
  3. **Eligibility** — TRON 链个人地址；须在活动期间完成至少一次 PSM 兑换（USDT→USDD）；CEX归集地址、合约地址、机器人自动排除
  4. **Reward Claiming** — 链上主动领取，需钱包签名；无过期时间，活动结束后仍可领取
  5. **Campaign Duration** — ⚠️ 待确认周期
- 卡片背景 `--color-bg-card`，圆角 `radius-lg`

**区域 5：Why USDD（对比表）**
- 标题「Why USDD?」+ 副标题「Not all stablecoins are equal」
- 三列对比：USDT / USDC / USDD（USDD 列高亮品牌色背景）
- 五个对比维度：

  | 维度 | USDT | USDC | USDD |
  |------|------|------|------|
  | Freeze risk | ✕ | ✕ | ✓ Cannot be frozen |
  | Yield on holdings | 0% | 0% | 4% APY |
  | Fully decentralized | ✕ | ✕ | ✓ On-chain collateral |
  | On-chain exit | DEX only（fees + slippage） | DEX only（fees + slippage） | ✓ PSM · 1:1 · Zero fees |
  | Issuer blacklist | ✕ Tether can blacklist | ✕ Circle can blacklist | ✓ No issuer |

**区域 6：活动实时数据（全局可见）**
- 两项指标横排：Participating Addresses + Net USDD Minted via PSM
- 数值大字 36px 品牌高亮色

**区域 7：底部 CTA Banner（全宽）**
- 正常态：「Hold USDD, Start Earning」副文案 + 「Join Now →」按钮（滚动至页面顶部 Hero 位置）
- 结束态：「Campaign Complete」+ 「View My Rewards ↑」按钮（锚点滚动至看板）

### 6.2 Claim Modal 交互规格（三状态）

| 状态 | 内容 | 操作 |
| --- | --- | --- |
| Confirm | 领取金额、目标钱包地址、网络（TRON） | Cancel（关闭弹窗）/ Confirm & Sign →（进入 Signing） |
| Signing | 转圈动画 + 「Please confirm the transaction in your TronLink wallet…」 | 等待 TronLink 响应；原型可点「▶ Simulate Success」跳过 |
| Success | ✓「Claimed Successfully」+ 到账金额 + 钱包地址 + TX Hash（Tronscan 链接） | Done（关闭弹窗，触发看板数据更新） |

- 任意状态点击遮罩层外部可关闭弹窗（等同 Cancel）
- Signing 状态用户拒绝签名 → 关闭弹窗，Toast「Claim cancelled」，看板不变

### 6.3 其余交互行为

- **倒计时**：前端本地计时，活动截止时间由后端配置下发
- **看板数据加载**：拉取失败时先显示骨架屏（`--color-bg-elevated` shimmer），超时后显示「--」+ 错误提示
- **卡片 ⓘ tooltip**：鼠标悬浮 ⓘ 图标时弹出说明气泡（出现在图标正下方），移开消失
- **Claim History 跳转**：TX Hash 点击在新 Tab 打开 `https://tronscan.org/#/transaction/{txhash}`

---

## 7. 异常场景与边界条件

| 编号 | 场景 | 触发条件 | 预期表现 |
| --- | --- | --- | --- |
| E-01 | 活动未开始 | 当前时间 < 活动开始时间 | Hero badge 显示「Coming Soon」，Swap 条按钮置灰 |
| E-02 | 活动已结束 | 当前时间 > 活动结束时间 | Hero 替换为「Campaign Ended」，Swap 条隐藏，看板只读并标注「Data locked」 |
| E-03 | 钱包未连接 | 访问页面无钱包连接态 | 看板完全不渲染；Swap 条按钮显示「Connect Wallet」 |
| E-04 | 收益数据加载失败 | API 超时或报错 | 看板骨架屏 → 超时后数值显示「--」，底部「Failed to load data. Please refresh.」 |
| E-05 | 地址不符合活动资格 | 地址被标记为 CEX/合约/机器人 | 看板区域替换为「This address is not eligible」警告卡（保留营销内容） |
| E-06 | 无持有/无收益 | 地址持有 USDD=0 或尚未兑换 | 看板显示 0 值 + 第三列显示「Swap Now to Start Earning →」引导按钮 |
| E-07 | Claim 签名拒绝 | 用户在钱包中拒绝签名 | 右上角红色 Toast「Claim cancelled」，弹窗关闭，看板数据不变 |
| E-08 | Swap 金额为 0 或超出余额 | 用户点击「Swap Now」前校验失败 | Swap 条边框变红 + 行内错误文案，按钮不可点击 |

---

## 8. 数据埋点需求

| 事件名 | 触发时机 | 参数 | 说明 |
| --- | --- | --- | --- |
| `campaign_page_view` | 进入活动页 | `src=tronscan/tronlink/direct` | 渠道来源 |
| `campaign_join_now_click` | 点击「Join Now →」 | `wallet_connected`, `location=hero/bottom_cta` | 参与意向；未连接时触发钱包弹窗 |
| `campaign_connect_wallet_click` | 点击连接钱包 | `location=hero/bottom_cta` | 触发位置 |
| `campaign_wallet_connected` | 钱包连接成功 | `wallet_address`, `src` | 激活事件 |
| `campaign_dashboard_view` | 看板展示成功（连接后） | `held_usdd`, `claimable_rewards`, `total_earned` | 已参与用户回访质量 |
| `campaign_claim_click` | 点击「Claim X USDD」 | `claimable_amount` | 领取意向 |
| `campaign_claim_confirm` | Claim Modal 点击「Confirm & Sign」 | `claimable_amount` | 进入签名流程 |
| `campaign_claim_success` | 链上 Claim 成功 | `claimed_amount`, `tx_hash` | 领取结果 |
| `campaign_claim_cancel` | 取消 Claim（Modal 任意状态关闭） | `modal_state=confirm/signing` | 放弃行为 |
| `campaign_tx_hash_click` | 点击 Claim History TX Hash | `tx_hash` | 浏览器跳转行为 |
| `campaign_rule_view` | 活动规则区域进入视口 | - | 信息关注度 |

---

## 9. 国际化与文案规格

> 页面内容统一英文，无需多语言切换。Key 仍保留供工程引用。

| Key | English | 备注 |
| --- | --- | --- |
| `campaign.hero.title` | USDT Zero-Freeze Yield Season | 活动名称，Hero 主标题 |
| `campaign.hero.subtitle` | Hold USDD, earn 4% APY, zero freeze risk | Hero 副标题 |
| `campaign.hero.meta` | {N} addresses joined · 1:1 PSM · Zero fees · Zero slippage | Hero meta 行 |
| `campaign.hero.cta` | Join Now → | Hero 主按钮 |
| `campaign.hero.coming_soon` | Coming Soon | 活动未开始时按钮文案 |
| `campaign.pillar.hold.title` | Only Hold | 卡片 1 标题 |
| `campaign.pillar.hold.desc` | Hold USDD for any continuous 1-hour window and rewards accrue automatically — no staking, no locking, no minimum amount. | 卡片 1 描述 |
| `campaign.pillar.fees.title` | 0 Fees | 卡片 2 标题 |
| `campaign.pillar.fees.desc` | Swap USDT → USDD via PSM at exactly 1:1 — zero protocol fees, zero slippage, zero price impact. Swap back anytime. | 卡片 2 描述 |
| `campaign.pillar.apy.title` | 4% APY | 卡片 3 标题 |
| `campaign.pillar.apy.desc` | Hold USDD continuously for 1+ hour and earn 4% annual yield — calculated by the hour, paid on your actual holdings. | 卡片 3 描述 |
| `campaign.dashboard.held` | USDD Holdings | 看板卡片 1 标题 |
| `campaign.dashboard.claimable` | Claimable Rewards | 看板卡片 2 标题 |
| `campaign.dashboard.total_earned` | Total Earned | 看板卡片 3 标题 |
| `campaign.dashboard.active` | ✓ Active | 持仓中状态标签 |
| `campaign.dashboard.data_locked` | Campaign ended · Data locked | 结束态标注 |
| `campaign.dashboard.tip.held_empty` | No USDD held. Swap via PSM to start earning. | Holdings 卡片 ⓘ tooltip（无持仓） |
| `campaign.dashboard.tip.claimable` | Settled rewards ready to claim. Updates daily at 00:00 UTC. | Claimable 卡片 ⓘ tooltip |
| `campaign.dashboard.tip.total_earned` | Cumulative settled rewards only. Excludes rewards currently in settlement. | Total Earned 卡片 ⓘ tooltip |
| `campaign.dashboard.claim_btn` | Claim {amount} USDD | Claim 按钮文案 |
| `campaign.claim_history.title` | Claim History | 提现记录标题 |
| `campaign.claim_history.empty` | No claims yet | 无记录提示 |
| `campaign.claim_history.col.date` | Date | 表头 - 日期 |
| `campaign.claim_history.col.amount` | Amount | 表头 - 金额 |
| `campaign.claim_history.col.tx` | TX Hash | 表头 - 交易哈希 |
| `campaign.claim_modal.title` | Claim Rewards | Modal 标题 |
| `campaign.claim_modal.confirm_btn` | Confirm & Sign → | 确认按钮 |
| `campaign.claim_modal.signing_hint` | Please confirm the transaction in your TronLink wallet… | 签名等待提示 |
| `campaign.claim_modal.success_title` | Claimed Successfully | 成功标题 |
| `campaign.rules.title` | Campaign Rules | 规则区标题 |
| `campaign.stats.title` | Live Campaign Stats | 数据区标题 |
| `campaign.stats.addresses` | Participating Addresses | 统计指标 1 |
| `campaign.stats.minted` | Net USDD Minted via PSM | 统计指标 2 |
| `campaign.bottom_cta.title` | Hold USDD, Start Earning | 底部 CTA 主文案 |
| `campaign.bottom_cta.cta_active` | Join Now → | 底部 CTA 按钮（活动中） |
| `campaign.bottom_cta.cta_ended` | View My Rewards ↑ | 底部 CTA 按钮（活动结束） |
| `campaign.error.not_eligible` | This address is not eligible | 不符合资格提示 |
| `campaign.error.load_failed` | Failed to load data. Please refresh and try again. | 数据加载失败提示 |
| `campaign.error.history_failed` | Failed to load history | Claim History 加载失败提示 |

---

## 10. 兼容性与平台差异

| 维度 | 要求 |
| --- | --- |
| 浏览器 | Chrome 90+ / Firefox 88+ / Safari 14+ |
| 移动端 | 响应式适配 375px，支持 TronLink 内置浏览器 |
| 钱包 | TronLink（主要），其他 TronLink 兼容钱包 |
| 链 | 仅 TRON，无需多链切换 |

---

## 11. 安全与隐私

- 渠道参数（src）仅用于埋点统计，不作为链上权限判断依据
- 不存储用户私钥或敏感信息，钱包连接仅读取地址
- Swap 操作需用户在钱包中主动签名确认，不代为签名
- Claim 操作同上

---

## 12. 成功指标与验收标准

### 12.1 成功指标

| 指标 | 基线值 | 目标值 | 衡量方式 |
| --- | --- | --- | --- |
| 页面内 Swap 转化率（submit → success） | -- | ⚠️ 待确认 | 埋点统计 |
| 活动期 PSM 净铸造量 | -- | ⚠️ 待确认 | 链上数据 |
| 新增 USDD 持有地址数 | -- | ⚠️ 待确认 | 链上数据 |

### 12.2 验收标准

- [ ] 未连接钱包时，Hero + 三卡片 + Why USDD + 活动规则完整展示，看板区域不渲染
- [ ] Swap 条未连接时显示「Connect Wallet」，点击触发全局钱包弹窗
- [ ] 连接成功后，Swap 条显示 USDT 余额 badge，按钮切换为「Swap Now」
- [ ] 点击「Swap Now」（金额>0）正确调起钱包签名，签名成功后触发 PSM swap
- [ ] Swap 条 From/To 固定（USDT → USDD），无切换按钮和方向切换按钮
- [ ] 连接钱包后，「My Rewards」看板正确显示 USDD Holdings 和 Accrued Rewards
- [ ] Why USDD 对比表正确展示 5 维对比，USDD 列高亮品牌绿
- [ ] 活动倒计时正确倒数，活动结束后切换为「Campaign Ended」状态，Swap 条隐藏
- [ ] 携带 `?src=tronscan` 参数进入，埋点 `campaign_page_view` 正确上报 src 值
- [ ] 地址被标记为非资格时，看板替换为「This address is not eligible」警告卡
- [ ] 数据加载失败时，看板先显示骨架屏，超时后显示「--」和错误提示，不闪退
- [ ] 移动端（375px）页面布局正常，Swap 条不溢出，三卡片响应式换行

---

## 变更记录

| 版本 | 日期 | 变更内容 | 变更人 |
| --- | --- | --- | --- |
| v1 | 2026-07-01 | 初稿 | Rain.Liu |
| v2 | 2026-07-02 | 根据原型迭代：① 内嵌 PSM Swap 条替换「立即兑换」跳转 CTA；② 新增 Why USDD 对比表（F-09）；③ 三卡片调整为 Only Hold / 0 Fees / 4% APY；④ 页面语言改为英文，导航 Yield Rush；⑤ 未连接钱包时看板完全隐藏；⑥ 页面结构重排；⑦ 更新 BR/E/埋点/i18n/验收标准 | Rain.Liu |
| v2.1 | 2026-07-02 | 补充收益结算机制技术细节：新增 BR-10（固定1小时时间槽）、BR-11（Transfer Event 重建余额时间线）、BR-12（net_psm_swap 定义与归零保护）；新增 §5.1 详解（含公式、槽机制、追踪触发逻辑、典型场景示意）；更新 §6.1 规则1文案精确化 | Rain.Liu |
