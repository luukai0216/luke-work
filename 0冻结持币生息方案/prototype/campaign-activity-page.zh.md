# USDT 零冻结收益季活动页中文翻译稿

来源文件：`campaign-activity-page.html`
原型版本：`REQ-01 · v2.5.1`
翻译范围：页面原型中的英文 UI 文案、弹窗文案、状态提示、规则说明和表格字段。右侧规范面板中已经是中文的业务规则保留原意。

## 原型外壳

### 左侧场景导航

- 原型文档：`v2.5.1`
- 原型名称：`USDT 零冻结收益季活动落地页`
- 需求编号：`REQ-01`

场景：

| 分组 | 场景 | 中文文案 |
| --- | --- | --- |
| 未连接钱包 | S1 | 未连接钱包（营销态） |
| 已连接钱包 | S2 | 已连接，暂无持仓 |
| 已连接钱包 | S3 | 已连接，有收益（可领取） |
| 异常 / 边界态 | S4 | 活动已结束 |
| 异常 / 边界态 | S5 | 地址不符合资格 |
| 异常 / 边界态 | S6 | 数据加载失败 |

### 顶部导航

| 英文原文 | 中文翻译 |
| --- | --- |
| PSM | PSM |
| Earn | 收益 |
| Yield Rush | 收益季 |
| Data | 数据 |
| Connect Wallet | 连接钱包 |

## 领取奖励弹窗

### 确认态

| 英文原文 | 中文翻译 |
| --- | --- |
| Claim Rewards | 领取奖励 |
| You will receive | 你将收到 |
| To wallet | 接收钱包 |
| Network | 网络 |
| Rewards will be sent to your connected wallet. A wallet signature is required to confirm. No gas fees. | 奖励将发送到你当前连接的钱包。需要钱包签名确认，无需 Gas 费。 |
| Cancel | 取消 |
| Confirm & Sign | 确认并签名 |

### 签名中

| 英文原文 | 中文翻译 |
| --- | --- |
| Waiting for Signature | 等待签名 |
| Please confirm the transaction in your TronLink wallet… | 请在 TronLink 钱包中确认交易。 |
| Simulate Success | 模拟成功 |
| 原型模拟：点击右侧按钮跳至成功态 | 原型模拟：点击右侧按钮跳至成功态 |

### 成功态

| 英文原文 | 中文翻译 |
| --- | --- |
| Claimed Successfully | 领取成功 |
| USDD sent to | USDD 已发送至 |
| Tx Hash | 交易哈希 |
| Done | 完成 |

## 页面主内容

### Hero：活动进行中

| 英文原文 | 中文翻译 |
| --- | --- |
| Live · TRON Exclusive | 进行中 · TRON 专属 |
| USDD Hold & Earn Season | USDD 持币生息季 |
| Hold USDD and earn 4% APY automatically — no staking, no locking, no minimum | 持有 USDD 即可自动获得 4% 年化收益，无需质押、无需锁仓、无最低门槛。 |
| Swap via PSM and start earning automatically — no staking required | 通过 PSM 兑换即可自动开始生息，无需质押。 |
| Join Now | 立即参与 |
| 12,847 addresses joined | 12,847 个地址已参与 |
| 1:1 PSM | 1:1 PSM 兑换 |
| Zero fees | 0 手续费 |
| Zero slippage | 0 滑点 |
| Campaign Ends In | 距活动结束还剩 |
| Days | 天 |
| Hrs | 小时 |
| Mins | 分钟 |
| Secs | 秒 |

### Hero：活动已结束

| 英文原文 | 中文翻译 |
| --- | --- |
| Campaign Ended | 活动已结束 |
| Thank you for participating. This campaign has concluded. | 感谢参与，本次活动已结束。 |
| Rewards will be airdropped to your TRON wallet within 7 days. | 奖励将在 7 天内空投至你的 TRON 钱包。 |
| Campaign ended on 2026-09-30 00:00 UTC | 活动已于 2026-09-30 00:00 UTC 结束 |

## 我的收益看板

### 地址不符合资格

| 英文原文 | 中文翻译 |
| --- | --- |
| This address is not eligible | 当前地址不符合活动资格 |
| This address has been identified as a CEX aggregator or contract address and is excluded from reward calculation. Please use a personal TRON address to participate. | 当前地址被识别为 CEX 归集地址或合约地址，已被排除在奖励计算之外。请使用个人 TRON 地址参与活动。 |

### 数据加载失败

| 英文原文 | 中文翻译 |
| --- | --- |
| USDD Holdings | USDD 持仓 |
| Claimable Rewards | 可领取收益 |
| Total Earned | 累计收益 |
| Failed to load data. Please refresh and try again. | 数据加载失败，请刷新后重试。 |

### 持仓卡片

| 英文原文 | 中文翻译 |
| --- | --- |
| USDD Holdings | USDD 持仓 |
| No USDD held yet. Swap USDT via PSM to start earning rewards. | 当前暂无 USDD 持仓。通过 PSM 将 USDT 兑换为 USDD 后即可开始获得收益。 |
| Active | 生效中 |
| Campaign ended · Data locked | 活动已结束 · 数据已锁定 |

### 可领取收益卡片

| 英文原文 | 中文翻译 |
| --- | --- |
| Claimable Rewards | 可领取收益 |
| Settled rewards ready to claim. Updates daily at 00:00 UTC. | 已结算且可领取的收益。每日 00:00 UTC 更新。 |
| Claim {amount} USDD | 领取 {amount} USDD |

### 累计收益卡片

| 英文原文 | 中文翻译 |
| --- | --- |
| Total Earned | 累计收益 |
| Cumulative settled rewards only. Excludes rewards currently in settlement (not yet claimable). | 仅统计已结算收益，不包含正在结算中且暂不可领取的收益。 |

### 领取记录

| 英文原文 | 中文翻译 |
| --- | --- |
| Claim History | 领取记录 |
| Date | 日期 |
| Amount | 金额 |
| Tx Hash | 交易哈希 |
| No claims yet | 暂无领取记录 |

## 三个核心卖点

| 英文原文 | 中文翻译 |
| --- | --- |
| Only Hold | 只需持有 |
| Hold USDD for any continuous 1-hour window and rewards accrue automatically — no staking, no locking, no minimum amount. | 任意连续 1 小时持有 USDD 即可自动累计收益，无需质押、无需锁仓、无最低金额要求。 |
| 0 Fees | 0 费用 |
| Swap USDT → USDD via PSM at exactly 1:1 — zero protocol fees, zero slippage, zero price impact. Swap back anytime. | 通过 PSM 以 1:1 将 USDT 兑换为 USDD，0 协议费用、0 滑点、0 价格影响，并可随时换回。 |
| 4% APY | 4% 年化收益 |
| Hold USDD continuously for 1+ hour and earn 4% annual yield — calculated by the hour, paid on your actual holdings. | 连续持有 USDD 超过 1 小时即可获得 4% 年化收益，按小时计算，并基于实际持仓发放。 |

## Why USDD 对比模块

| 英文原文 | 中文翻译 |
| --- | --- |
| Why USDD? | 为什么选择 USDD？ |
| Not all stablecoins are equal | 并非所有稳定币都一样 |
| Freeze risk | 冻结风险 |
| Cannot be frozen | 不可被冻结 |
| Yield on holdings | 持仓收益 |
| Fully decentralized | 完全去中心化 |
| On-chain collateral | 链上抵押 |
| On-chain exit | 链上退出 |
| DEX only | 仅支持 DEX |
| fees + slippage | 费用 + 滑点 |
| PSM · 1:1 · Zero fees | PSM · 1:1 · 0 费用 |
| Issuer blacklist | 发行方黑名单 |
| Tether can blacklist | Tether 可加入黑名单 |
| Circle can blacklist | Circle 可加入黑名单 |
| No issuer | 无中心化发行方 |

## 兑换条

| 英文原文 | 中文翻译 |
| --- | --- |
| Bal | 余额 |
| Swap Now | 立即兑换 |
| Connect Wallet | 连接钱包 |
| 1:1 · Zero fees · Zero slippage · Available: 530,664,235.79 USDD | 1:1 · 0 费用 · 0 滑点 · 可用额度：530,664,235.79 USDD |

## 活动数据

| 英文原文 | 中文翻译 |
| --- | --- |
| Live Campaign Stats | 实时活动数据 |
| Participating Addresses | 参与地址数 |
| Net USDD Minted via PSM | 通过 PSM 净铸造的 USDD |

## 活动规则

### 规则 1：奖励计算

奖励按固定的 1 小时时间片结算（整点结算）。
奖励基数 = `min(累计 PSM 净兑换金额, 该时间片内最低 USDD 余额)`。
年化收益率为 4%，按小时折算。如果某个时间片内余额降为 0，则该时间片不产生收益。

### 规则 2：奖励更新

系统每日 `00:00 UTC` 结算前一日所有已完成的 1 小时时间片收益。
你的 `可领取收益` 和 `累计收益` 会在结算后 2 小时内更新。
结算中的收益在确认前不会展示。

### 规则 3：参与资格

仅限 TRON 链个人地址参与。
USDD 必须在活动期间通过 PSM 兑换获得，只有用户自行兑换得到的 USDD 会计入奖励基数。
CEX 归集地址、合约地址和机器人地址将自动排除。

### 规则 4：奖励领取

已结算奖励会展示在 `可领取收益` 中，并可在活动期间或活动结束后随时领取。
领取将在链上处理，需要钱包签名。可领取奖励不会过期。

### 规则 5：活动周期

活动周期待定，建议大于 2 个月。请以页面倒计时为准。

## 底部 CTA

### 活动进行中

| 英文原文 | 中文翻译 |
| --- | --- |
| Hold USDD, Start Earning | 持有 USDD，开始生息 |
| Swap USDT → USDD via PSM at 1:1, zero fees — earn 4% APY from the first hour | 通过 PSM 以 1:1 将 USDT 兑换为 USDD，0 费用，从第 1 小时开始获得 4% 年化收益。 |
| Join Now | 立即参与 |

### 活动已结束

| 英文原文 | 中文翻译 |
| --- | --- |
| Campaign Complete | 活动已完成 |
| Thanks for participating — claim your rewards above or check your Claim History | 感谢参与。你可以在上方领取奖励，或查看领取记录。 |
| View My Rewards | 查看我的收益 |

## 页脚

| 英文原文 | 中文翻译 |
| --- | --- |
| Docs | 文档 |
| GitHub | GitHub |
| Discord | Discord |
| Privacy | 隐私 |

## 右侧规范面板

规范面板中的业务规则、联动条件、埋点和待确认项已经是中文。以下是按场景整理后的中文稿。

### S1：未连接钱包（营销态）

i18n 文案：

| Key | 中文文案 |
| --- | --- |
| campaign.hero.title | USDT 零冻结收益季 |
| campaign.hero.subtitle | 持有 USDD，年化 4% 收益，0 冻结风险 |
| campaign.cta.swap | 立即兑换 |
| campaign.cta.connect | 连接钱包查看收益 |

业务规则：

- `BR-02`：未连接钱包时展示营销态，Hero、钩子和规则均可见，看板替换为连接引导卡片。
- `BR-04`：点击立即兑换跳转到 `/psm?from=USDT&to=USDD&chain=tron`，在新窗口内导航。
- `BR-05`：倒计时由前端本地计时，活动截止时间由后端配置下发。
- `BR-08`：全局统计数据（参与地址数 / 净铸造量）无需连接钱包即可显示。

子状态联动：

- S1 未连接 → 触发全局钱包弹窗：点击「立即兑换」或「连接钱包」。
- 连接成功（无持仓）→ S2 无持仓：钱包地址 USDD 余额 = 0。
- 连接成功（有持仓）→ S3 有收益：钱包地址有 PSM 净铸造记录。

埋点：

- `campaign_page_view · src=tronscan`
- `campaign_connect_wallet_click · location=hero`
- `campaign_swap_cta_click · wallet_connected=false`

待确认项：

- 活动周期，建议大于 2 个月，待领导决策。
- 活动预算归属，建议运营组 Shelock 申请。

### S2：已连接，暂无持仓

i18n 文案：

| Key | 中文文案 |
| --- | --- |
| campaign.dashboard.held | 当前持有 USDD |
| campaign.dashboard.accrued | 累计收益 |
| campaign.dashboard.airdrop_hint | 活动结束后自动空投至钱包 |

业务规则：

- `BR-03`：连接成功后展示「我的收益」看板，初始数值为 0。
- `BR-06`：收益数据刷新时机为进入页面时 1 次、回到 Tab 时 1 次、每 5 分钟自动刷新。
- `E-06`：USDD 余额 = 0 时，看板显示 0，并展示「立即兑换开始生息」引导按钮。

子状态联动：

- S2 → PSM 兑换页：点击「立即兑换开始生息」。
- PSM 兑换完成返回 → S3 有收益：接口返回持仓 > 0。

埋点：

- `campaign_dashboard_view · held_usdd=0, accrued=0`
- `campaign_swap_cta_click · wallet_connected=true`

### S3：已连接，有收益（可领取）

i18n 文案：

| Key | 中文文案 |
| --- | --- |
| campaign.dashboard.held | 当前持有 USDD |
| campaign.dashboard.accrued | 累计收益 |
| campaign.dashboard.airdrop_hint | 活动结束后自动空投至钱包 |

业务规则：

- `F-05`：看板三列为当前持有量、累计收益、收益发放方式（空投或 Claim）。
- `BR-06`：收益数据刷新时机为进入页面、回到 Tab、每 5 分钟自动刷新。
- `BR-07`：待确认：空投模式无 Claim 按钮，仅展示「自动发放」提示文案。

子状态联动：

- S3 → S4 活动已结束：当前时间 > 活动截止时间。
- S3 → S5 不符合资格：API 返回 `notEligible=true`。
- S3 → S6 加载失败：API 超时或报错。

埋点：

- `campaign_dashboard_view · held_usdd=5200, accrued=18.37`

待确认项：

- 收益领取方式：空投 vs Claim，待领导决策，影响第三列展示。

### S4：活动已结束

i18n 文案：

| Key | 中文文案 |
| --- | --- |
| campaign.dashboard.held | 当前持有 USDD |
| campaign.dashboard.accrued | 累计收益（最终值） |

业务规则：

- `E-02`：Hero 替换为「活动已结束」Banner，CTA 改为「查看历史收益」。
- `E-02`：看板继续展示最终数据，但不再自动刷新，只读态。
- `BR-07`：空投模式展示「活动结束后将自动空投至钱包」说明文案。

子状态联动：

- S4 → 历史收益详情（TBD）：点击「查看历史收益」。

埋点：

- `campaign_page_view · status=ended`

待确认项：

- 空投发放时间线，建议活动结束 7 天内。
- 「查看历史收益」跳转目标页待规划。

### S5：地址不符合资格

i18n 文案：

| Key | 中文文案 |
| --- | --- |
| campaign.error.not_eligible | 当前地址不符合活动资格 |

业务规则：

- `E-05`：地址命中黑名单（CEX 归集 / 合约 / 机器人）时，看板替换为「不符合资格」提示卡。
- `BR-02`：营销内容（Hero / 钩子 / 规则）仍正常展示，仅替换看板区域。

子状态联动：

- S5 → S2 或 S3：用户断开当前地址，并连接合规普通地址。

埋点：

- `campaign_dashboard_view · status=not_eligible`

待确认项：

- 反女巫黑名单来源与更新频率，详见 REQ-02。

### S6：数据加载失败

i18n 文案：

| Key | 中文文案 |
| --- | --- |
| campaign.error.load_failed | 数据加载失败，请刷新重试 |

业务规则：

- `E-04`：API 超时或报错时，看板数值显示 `--`，底部展示红色错误文案。
- `BR-06`：不展示空态，使用骨架屏 Skeleton（`--color-bg-elevated shimmer`）。

子状态联动：

- S6 → S2 或 S3：用户手动刷新，或 5 分钟自动重试成功。

埋点：

- `api_error · module=campaign_dashboard, type=timeout`

待确认项：

- API 超时阈值建议 10s，重试次数建议 3 次。
