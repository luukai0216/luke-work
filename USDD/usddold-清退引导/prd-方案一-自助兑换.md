# PRD（轻量版）：USDDOLD 清退引导 · 方案一（自助兑换）legacy 前端改版

> **版本**：v2 | **作者**：blackey | **日期**：2026-05-26 | **状态**：草稿
> **范围**：legacy.usdd.io 前端改版（在现有页面基础上增量改造，不含合约改动）
> **关联**：`prototype-方案一/prototype.html`（最新原型）、`prd-方案二-人工SOP.md`（后续阶段）

---

## 0. 与 v1 的关键变化（PM 已确认）

1. **双阶段清退**：方案一自助运行约 3 个月（Sunset 截止 **2026-09-30 UTC+8**），之后关停 PSM 与 BTTC 桥，切换至方案二人工 SOP。
2. **仅兑换为 USDT**——取消 USDD 2.0 出口（如需 USDD 2.0 用户自行二次兑换）。
3. **PSM 仅部署在 Tron**——所有非 Tron 链都需先跨回 Tron 才能兑换。
4. **钱包仅连接 Tron（TronLink）**——不做「连接钱包自动扫 5 链余额」。
5. **视觉在现有 legacy.usdd.io 基础上增量**——保留太空背景、品牌色、Hero，新增 Sunset 公告横幅 + Exit Paths 链选择器，不推翻重建。

---

## 1. 背景与目标

**背景**：USDDOLD 已停止增发并进入清退期，社区持仓 659 万、141,503 holders，分布在 Tron / ETH / BSC / Arbitrum / Polygon 5 条链。当前 legacy.usdd.io 仍是正常运营 UI，无清退公告、无路径指引。PSM 仅部署在 Tron，所有资产最终需回到 Tron 通过 PSM 兑换为 USDT。

**目标**：
1. 用户进入 legacy.usdd.io 后，**首屏即可看到清退公告（Sunset Plan）与截止日期**。
2. 用户**能在 30 秒内找到自己所在链对应的退出路径**，并知道步骤数与预计耗时。
3. Tron 用户可在站内**一步**完成 USDDOLD → USDT 兑换；其他链获得清晰的「跨链回 Tron → PSM 兑换」指引。
4. 全程纯链上自助，资产不脱离用户钱包。

---

## 2. 目标用户与场景

**目标用户**：持有 USDDOLD 的 141,503 holders。优先级：Tron（93.5% holders）> BSC（人多额小）> ETH（额大人少）> ARB > Polygon。

**核心场景**：
- 用户进入 legacy.usdd.io，需要立刻明白「这是清退期」「我该怎么退出」「截止前要做什么」。
- 非 Tron 用户最大困惑是「PSM 在哪、我要不要跨链、怎么跨」。

---

## 3. 方案描述

### 3.1 功能说明

在现有 legacy.usdd.io 视觉基础上做**增量改造**：

- **保留**：太空背景、「Decentralized USD」Hero、`PSM` / `USDDOLD Token Addresses` / `Audit Report` 三个 pill、品牌色与字体
- **导航精简**为：`Home` / `PSM` / `Governance`
- **新增 Sunset 公告横幅**（Hero 下方，绿色）：说明清退计划 + 截止日期 + 「Click For More Details」
- **新增 Exit Paths 区**：5 链选择卡片（Tron 标记 RECOMMENDED），点击进入对应链的退出步骤页
- **分链退出页**：
  - Tron：PSM Swap Widget（About PSM 介绍 + 兑换面板，沿用现有 PSM 页布局）
  - ETH / BSC：2 步跨链引导（BTTC → Tron PSM）
  - ARB / Polygon：3 步跨链引导（官方桥 → ETH → BTTC → Tron PSM）
- **USDDOLD Token Addresses 弹窗**：展示 6 链官方合约地址，供防钓鱼校验
- **官方联系方式**：Header 社交图标（Twitter / Telegram / Discord）+ Footer

### 3.2 用户流程

```javascript
// Tron 用户（1 步）
进入 legacy → 看到 Sunset 公告 → 选 Tron → 连接 TronLink → PSM 一键兑换 USDDOLD→USDT → 完成

// ETH / BSC 用户（2 步）
选对应链 → 用 BTTC 桥跨回 Tron → 接 Tron PSM 兑换 → 完成

// ARB / Polygon 用户（3 步）
选对应链 → 官方桥跨回 ETH → BTTC 桥跨回 Tron → 接 Tron PSM 兑换 → 完成
```

### 3.3 业务规则

| 编号 | 规则 | 说明 |
| --- | --- | --- |
| BR-01 | 兑换汇率 1:1 | USDDOLD → USDT 固定 1:1 |
| BR-02 | 无手续费 | 仅产生链上 gas，无平台费、无滑点 |
| BR-03 | 目标资产仅 USDT | 不提供 USDD 2.0 出口；如需 USDD 2.0 用户收到 USDT 后自行二次兑换 |
| BR-04 | PSM 仅在 Tron | PSM 合约只部署在 Tron，所有链资产最终须回到 Tron 兑换 |
| BR-05 | 兑换不可逆 | USDDOLD 已停止增发，兑换后无法回退 |
| BR-06 | Sunset 截止日期 | 2026-09-30 (UTC+8) 后关停 PSM 与 BTTC 桥，切换至方案二人工 SOP |
| BR-07 | Tron 路径 | USDDOLD →(Tron PSM)→ USDT，本链 1 步 |
| BR-08 | ETH / BSC 路径 | USDDOLD →(BTTC 桥)→ Tron → PSM 兑换，2 步 |
| BR-09 | ARB 路径 | USDDOLD →(Arbitrum 官方桥)→ ETH →(BTTC 桥)→ Tron → PSM，3 步，含 7 天挑战期 |
| BR-10 | Polygon 路径 | USDDOLD →(Polygon Portal 桥)→ ETH →(BTTC 桥)→ Tron → PSM，3 步 |
| BR-11 | 仅连 Tron 钱包 | 钱包连接仅支持 TronLink（用于 PSM 兑换），不做多链余额扫描 |
| BR-12 | 禁用第三方桥 | ARB/Polygon 跨链仅推荐官方桥，禁止 Across/Stargate 等第三方桥（可能改变合约属性致 BTTC 无法识别）|
| BR-13 | 不做激励 | 不发任何 bonus、空投、收益加成 |
| BR-14 | 后续引导（Next Step）| Tron PSM 页 Swap 面板下方展示「Next Step · 收到 USDT 后」卡片，提供 3 个后续动作入口：① USDT → USDD 2.0（新版 PSM）② Earn sUSDD（储蓄获取收益）③ 质押 / 流动性（生态）。全部外链到 `app.usdd.io`，不强推、不阻塞主流程 |

### 3.4 官方跨链桥地址（已确认）

| 链 | 官方桥 | 地址 |
|---|---|---|
| Arbitrum → Ethereum | Arbitrum Bridge | `portal.arbitrum.io/bridge/?destinationChain=ethereum&sourceChain=arbitrum-one&token=0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6`（预填 USDDOLD 合约 + 方向）|
| Polygon → Ethereum | Polygon Portal | `portal.polygon.technology/bridge` |
| ETH / BSC ↔ Tron | BTTC Bridge | `app.bt.io/bridge` |

---

## 4. UI / 交互说明

### 4.1 整体视觉

- 基线：复刻现有 legacy.usdd.io（太空背景：土星 + 星空 + 紫色 glow；薄荷绿品牌色 `#5fc693`；Inter 字体）
- 导航：`Home` / `PSM` / `Governance` + 右上社交图标
- 所有页面共享太空背景

### 4.2 首页

```
┌────────────────────────────────────────────────────┐
│ USDD/Legacy   Home  PSM  Governance      [社交图标] │
├────────────────────────────────────────────────────┤
│  [太空背景]                                          │
│  Decentralized USD                                  │
│  The TRON DAO Reserve is the custodian of USDDOLD…  │
│  [PSM] [USDDOLD Token Addresses] [Audit Report ▾]   │
│                                                      │
│  ╔════════════ Sunset 公告横幅（绿色）═══════════╗   │
│  ║ 🚀 We are implementing a Sunset plan...        ║   │
│  ║    Completed by 2026-09-30 (UTC+8)             ║   │
│  ║                        [Click For More Details]║   │
│  ╚════════════════════════════════════════════════╝   │
│                                                      │
│  SUNSET PLAN · EXIT PATHS                           │
│  Choose Your Chain to Exit                          │
│  ┌─────┐┌─────┐┌─────┐┌─────┐┌─────┐               │
│  │Tron ││ ETH ││ BSC ││ ARB ││ POL │               │
│  │推荐 ││2 步 ││2 步 ││3 步 ││3 步 │               │
│  │1 步 ││跨链 ││跨链 ││⚠️7天││跨链 │               │
│  └─────┘└─────┘└─────┘└─────┘└─────┘               │
└────────────────────────────────────────────────────┘
```

- Sunset 横幅「Click For More Details」→ 平滑滚动到 Exit Paths 区
- 每张链卡片显示：链 icon、名称、holders 数、步骤数 pill、路径简述、CTA
- Tron 卡片带 RECOMMENDED badge + 渐变背景

### 4.3 Tron 退出页（PSM Swap + Next Step）

沿用现有 PSM 页布局：左侧「About PSM」介绍卡（What/Why/How + Mechanism/PSM Contracts/Audit Report 链接），右侧 Swap 面板：

```
┌─── About PSM ───┐   ┌─────── PSM ───────┐
│ What is PSM?    │   │ Swap USDDOLD→USDT  │
│ Why PSM?        │   │ From: [金额] USDDOLD│
│ How does it work?│  │      ↓ 1:1         │
│ [Mechanism]     │   │ To:  [金额] USDT   │
│ [PSM Contracts] │   │ Available -- USDT  │
│ [Audit Report]  │   │ [Connect Wallet]   │
└─────────────────┘   └────────────────────┘

┌───────── Next Step · 收到 USDT 后 ─────────┐
│ 让你的稳定币继续工作                          │
│                                              │
│ ┌─────────┐ ┌──────────────┐ ┌─────────┐  │
│ │💱USDT→  │ │📈Earn sUSDD  │ │🔒 质押/  │  │
│ │ USDD 2.0│ │  [12% APY]   │ │ 流动性    │  │
│ │新版 PSM │ │ Earn 模块    │ │ 生态参与  │  │
│ └─────────┘ └──────────────┘ └─────────┘  │
│ 全部外链到 app.usdd.io                       │
└──────────────────────────────────────────────┘
```

- Swap 面板：From 锁定 USDDOLD，To 锁定 USDT（不可切换其他目标资产）
- 显示 Balance / MAX、Available（PSM 可兑额度）
- 主按钮「Connect Wallet」（TronLink）
- **Next Step 卡片**：Swap 下方固定展示（无论用户是否完成兑换），3 个外链入口，鼓励用户进入 USDD 2.0 生态
- 顶部「← Back」返回首页

### 4.4 ETH / BSC 退出页（2 步）

- 跨链横幅：「跨链一次回到 Tron」+ BTTC 桥卡片（`app.bt.io/bridge`）
- 步骤卡：① BTTC 桥跨回 Tron → ② Tron PSM 兑换（跳转 Tron 页）
- Sunset 截止提示 alert
- FAQ

### 4.5 ARB / Polygon 退出页（3 步）

- 跨链横幅：「两次跨链：源链 → ETH → Tron」+ 官方桥卡片
  - ARB：`portal.arbitrum.io`（预填 USDDOLD 合约 + 方向），标注 7 天挑战期
  - Polygon：`portal.polygon.technology/bridge`
- 步骤卡：① 官方桥跨回 ETH → ② BTTC 桥跨回 Tron → ③ Tron PSM 兑换
- ARB：7 天挑战期提示（建议尽早开始走完自助流程；如错过 Sunset 仍可通过方案二人工 SOP 兑换 USDT，只是时间更长）
- FAQ（含「禁用第三方快速桥」说明）

### 4.6 USDDOLD Token Addresses 弹窗

点击 Hero 的「USDDOLD Token Addresses」pill 弹出，展示 6 链官方合约地址（Tron / ETH / BSC / BTTC 三种 / Polygon / Arbitrum）+ 复制 + 区块浏览器跳转，顶部防钓鱼校验提示。

### 4.7 文案规范

| 项 | 处理 |
|---|---|
| Sunset Plan / 清退计划 | 推荐用语 |
| Swap / 兑换 | 可用 |
| USDDOLD | 保留原名 |
| 第三方桥（Across/Stargate）| 仅出现在「禁止使用」语境 |
| 倒计时 / 抓紧 | 不出现催促，但明确告知 2026-09-30 截止日期 |

---

## 5. 异常与边界

| 场景 | 触发条件 | 预期表现 |
| --- | --- | --- |
| 钱包未连接 | Tron 页未连 TronLink | Swap 面板可浏览，主按钮显示「Connect Wallet」，余额显示「--」 |
| 钱包非 Tron 网络 | 连了非 TronLink 钱包 | 提示「请使用 TronLink 连接 Tron 网络」 |
| 无 USDDOLD 余额 | Tron 钱包该资产为 0 | Swap 面板提示「未检测到 USDDOLD」 |
| TRX gas 不足 | 钱包 TRX 不够 | 提示「需要约 30 TRX 作为 gas」 |
| PSM 可兑额度不足 | Available < 兑换金额 | 提示「当前可兑额度 X，请分批或稍后再试」 |
| 跨链桥拥堵 | 桥服务繁忙 | 引导用户稍后重试，不在本站处理桥逻辑 |
| ARB 7 天挑战期 | 用户发起 Arbitrum 提现 | 明确告知需等待 7 天后手动 claim |
| 第三方桥误用 | 用户询问快速桥 | FAQ 明确「禁止使用，可能致合约属性变化」 |
| Sunset 临近 | 接近 2026-09-30 | 公告横幅强调截止日期，引导尽早完成 |

---

## 6. 验收标准

| 编号 | 验收项 | 验收方式 | 通过条件 |
| --- | --- | --- | --- |
| AC-01 | 保留现有视觉 | 视觉走查 | 太空背景、Hero、三 pill、品牌色与现 legacy 一致 |
| AC-02 | 导航精简 | 视觉走查 | 仅 Home / PSM / Governance 三项 |
| AC-03 | Sunset 公告横幅 | 视觉走查 | Hero 下方绿色横幅，含截止日期 2026-09-30 + Click For More Details |
| AC-04 | More Details 跳转 | 手动测试 | 点击平滑滚动到 Exit Paths 区 |
| AC-05 | Exit Paths 链卡片 | 手动测试 | 5 链卡片，Tron 带 RECOMMENDED，点击进入对应退出页 |
| AC-06 | Tron PSM 兑换 | 手动测试 | About PSM + Swap 面板；From=USDDOLD / To=USDT 锁定；连 TronLink 后可兑换 |
| AC-06a | Next Step 引导卡 | 视觉走查 | Swap 面板下方展示 3 个引导卡：USDT→USDD 2.0 / Earn sUSDD / 质押流动性；全部外链 app.usdd.io |
| AC-07 | ETH/BSC 2 步引导 | 手动测试 | BTTC 桥（app.bt.io/bridge）卡片 + 2 步骤；跳 Tron 页链接可用 |
| AC-08 | ARB 3 步引导 | 手动测试 | portal.arbitrum.io（预填合约）+ 7 天挑战期提示 + 3 步骤 |
| AC-09 | Polygon 3 步引导 | 手动测试 | portal.polygon.technology/bridge + 3 步骤 |
| AC-10 | 仅连 Tron 钱包 | 手动测试 | 无「自动扫 5 链余额」逻辑；钱包连接仅 TronLink |
| AC-11 | 禁用第三方桥 | 视觉走查 | ARB/Polygon 页明确「禁止第三方快速桥」 |
| AC-12 | Token Addresses 弹窗 | 手动测试 | 弹窗展示 6 链合约地址 + 复制 + 浏览器跳转 + 防钓鱼提示 |
| AC-13 | 官方联系方式 | 视觉走查 | Header 社交图标 + Footer 显示官方渠道 |
| AC-14 | 响应式适配 | 视觉走查 | 桌面 / 移动 / 钱包内置浏览器正常 |
| AC-15 | 多语言 | 视觉走查 | 至少中英双语 |

---

## 7. 变更记录

| 版本 | 日期 | 变更内容 | 变更人 |
| --- | --- | --- | --- |
| v1 | 2026-05-26 | 初稿（ETH/BSC 本链直兑、双出口逻辑）| blackey |
| v2 | 2026-05-26 | 按最新原型重写：双阶段清退、仅 USDT、PSM 仅 Tron、保留 legacy 视觉、官方桥地址确认 | blackey |

---

## 8. ⚠️ 待确认

1. **Sunset 截止日期 2026-09-30** —— 待运营/管理层最终敲定
2. **Tron PSM 当前 USDT 储备额度** —— 待数据/财务确认是否覆盖 Tron 链 USDDOLD 总量
3. **Polygon Portal 桥是否支持 URL 预填 USDDOLD** —— 待工程（Arbitrum 已确认支持）
4. **官方联系渠道最终地址**（Twitter / Telegram / Discord / Governance）—— 待运营
