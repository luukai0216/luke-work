# USDDOLD · Exit Paths 文案优化稿（对照 Figma 设计稿）

> 版本：v4
> 日期：2026-06-11
> 设计稿：USDD_old / `usddold-home`（node 2042-8273）
> 范围：`SUNSET PLAN · EXIT PATHS` 模块，5 条链 × Exit Path 卡片
> 本版重点：在 v3 基础上**补回 PRD 要求但设计稿缺失的信息**（步骤数 + 预计耗时），并按设计侧建议同步优化文案。

---

## 0. v4 改了什么（相对 v3）

v3 只是"贴着设计稿优化文字"。但对照原型 + PRD 后发现设计稿丢了 PRD 目标②要求的「步骤数 + 预计耗时一眼可见」。v4 据此做 5 处实质优化：

1. **🔴 每张卡新增 meta 行**：`步骤数 · 预计耗时 · holders`。把原来独占右上角的 holders 降级并入，补回步骤数和耗时——直接满足 PRD 目标②。
2. **intro 补"为什么必须回 Tron"**：非 Tron 用户最大困惑是"PSM 在哪、要不要跨链"。这句因果只在 intro 讲一次，卡片不重复。
3. **CTA 分两类**：站内终点 `Swap on Tron PSM` = 实心品牌绿；外部桥 `Open ... ↗` = 描边 + 箭头。
4. **底部加 Sunset 截止行**：不催促，只告知（符合 PRD 4.7）。
5. **H2 大小写修正**：`Choose Your Chain to Exit`（介词 `to` 小写，修掉设计稿里 `To` 大写）。

v3 已完成的基础优化继续保留：holders 按链分填、句子式大小写、统一术语、统一兑换句、统一标点。

---

## 1. 设计稿结构 + v4 新增节点

每个链选中态结构（★ = v4 需新增/调整的节点）：

```text
SUNSET PLAN · EXIT PATHS                       ← Eyebrow
Choose Your Chain to Exit                       ← H2（to 小写）
USDDOLD's PSM lives only on Tron, so every...  ← Intro ★补因果

[TRON] [Ethereum] [BSC] [Arbitrum] [Polygon]   ← Chain Tabs

┌────────────────────────── Exit Path 卡 ──────────────────────────┐
│ [icon] [Chain] Exit Path  [BADGE]                                │
│ 2 steps · ~10–30 min · 1,213 holders         ← ★新增 meta 行     │
│ [summary 一句话]                                                  │
│                                                                  │
│  ①──────────────      ②──────────────      ③──────────────       │
│  Step 1               Step 2               Step 3                │
│  [说明]                [说明]                [说明]                 │
│  [外链 CTA ↗]         [外链 CTA ↗]         [Swap on Tron PSM]     │
│   描边                  描边                  ★实心品牌绿          │
└──────────────────────────────────────────────────────────────────┘
```

> 说明：原右上角的「holders / 132,372」独立信息块**取消**，holders 并入 meta 行。这样头部更清爽，且步骤数/耗时/持有人三个信息一行讲完。

---

## 2. 通用规则

| 类型 | 大小写 | 示例 |
|---|---|---|
| Eyebrow | 全大写 | `SUNSET PLAN · EXIT PATHS` |
| H2 | Title Case（介词 to 小写）| `Choose Your Chain to Exit` |
| 卡片大标题 | Title Case | `Ethereum Exit Path` |
| Badge | 全大写 | `RECOMMENDED`、`7-DAY CHALLENGE` |
| meta 行 | 句子式，`·` 分隔 | `2 steps · ~10–30 min · 1,213 holders` |
| Summary / Step 说明 | 句子式 + 句号 | `Bridge from Ethereum to Tron via BTTC Bridge.` |
| 外链 CTA | Title Case + `↗`（描边）| `Open BTTC Bridge ↗` |
| 终点 CTA | Title Case（实心绿）| `Swap on Tron PSM` |

固定复用句式：
- **最后一步永远是**：`Connect TronLink and swap USDDOLD to USDT at 1:1 through the PSM.`
- **BTTC 跨链步永远是**：`Bridge from {源链} to Tron via BTTC Bridge.`
- **meta 行格式**：`{步骤数} · {预计耗时} · {holders} holders`

---

## 3. 顶部通用文案

| 节点 | v3 | v4 优化 |
|---|---|---|
| Eyebrow | `SUNSET PLAN · EXIT PATHS` | 保持 |
| H2 | `Choose Your Chain To Exit` | `Choose Your Chain to Exit`（介词 `to` 小写）|
| Intro | `Select the chain where you hold USDDOLD. Every path ends on the Tron PSM...` | `Select where you hold USDDOLD. Every path ends on Tron, where you swap USDDOLD to USDT at 1:1 — no fee.` |

> H2 说明：以设计稿为准保留此标题，仅把 `To` 改回小写 `to`（标准标题式介词不大写）。
> Intro 优化点：`ends on Tron`（链）后半句交代在哪兑换，干净顺口；`you swap`（去掉 can）更直接；`— no fee` 用破折号比逗号利落。
> Intro 备选（想强调"为什么必须回 Tron"时用）：`USDDOLD's PSM lives only on Tron, so every path ends there — swap to USDT at 1:1, no fee.`

## 4. Chain Tabs

5 个 tab 只放 icon + 链名，不加 badge：`TRON` · `Ethereum` · `BSC` · `Arbitrum` · `Polygon`

---

## 5. TRON Exit Path（单步 · 推荐）

| 节点 | 文案 |
|---|---|
| Title | `TRON Exit Path` |
| Badge | `RECOMMENDED` |
| ★ meta 行 | `Just 1 step · Instant · 132,372 holders` |
| Summary | `Swap directly through the Tron PSM — no bridge required.` |
| Step 标签 | `Just 1 step` |
| Step 说明 | `Connect TronLink and swap USDDOLD to USDT at 1:1 through the PSM.` |
| CTA（终点）| `Swap on Tron PSM` |

成稿：
```text
TRON Exit Path   RECOMMENDED
Just 1 step · Instant · 132,372 holders
Swap directly through the Tron PSM — no bridge required.

Just 1 step
Connect TronLink and swap USDDOLD to USDT at 1:1 through the PSM.
[ Swap on Tron PSM ]   ← 实心品牌绿
```

> `Instant` 找回原型里 "Instant settlement" 的速度信号，强化 Tron 是最优解。

---

## 6. Ethereum Exit Path（2 步）

| 节点 | 文案 |
|---|---|
| Title | `Ethereum Exit Path` |
| ★ meta 行 | `2 steps · ~10–30 min · 1,213 holders` |
| Summary | `Bridge USDDOLD from Ethereum to Tron via BTTC, then swap through the Tron PSM.` |
| Step 1 | `Step 1` ／ `Bridge from Ethereum to Tron via BTTC Bridge.` ／ CTA `Open BTTC Bridge ↗`（描边）|
| Step 2 | `Step 2` ／ `Connect TronLink and swap USDDOLD to USDT at 1:1 through the PSM.` ／ CTA `Swap on Tron PSM`（实心绿）|

成稿：
```text
Ethereum Exit Path
2 steps · ~10–30 min · 1,213 holders
Bridge USDDOLD from Ethereum to Tron via BTTC, then swap through the Tron PSM.

① Step 1                          ② Step 2
Bridge from Ethereum to Tron      Connect TronLink and swap USDDOLD
via BTTC Bridge.                  to USDT at 1:1 through the PSM.
[ Open BTTC Bridge ↗ ]            [ Swap on Tron PSM ]
   描边                              实心绿
```

---

## 7. BSC Exit Path（2 步）

| 节点 | 文案 |
|---|---|
| Title | `BSC Exit Path` |
| ★ meta 行 | `2 steps · ~10–30 min · 5,765 holders` |
| Summary | `Bridge USDDOLD from BSC to Tron via BTTC, then swap through the Tron PSM.` |
| Step 1 | `Step 1` ／ `Bridge from BSC to Tron via BTTC Bridge.` ／ CTA `Open BTTC Bridge ↗`（描边）|
| Step 2 | `Step 2` ／ `Connect TronLink and swap USDDOLD to USDT at 1:1 through the PSM.` ／ CTA `Swap on Tron PSM`（实心绿）|

成稿：
```text
BSC Exit Path
2 steps · ~10–30 min · 5,765 holders
Bridge USDDOLD from BSC to Tron via BTTC, then swap through the Tron PSM.

① Step 1                          ② Step 2
Bridge from BSC to Tron           Connect TronLink and swap USDDOLD
via BTTC Bridge.                  to USDT at 1:1 through the PSM.
[ Open BTTC Bridge ↗ ]            [ Swap on Tron PSM ]
```

---

## 8. Arbitrum Exit Path（3 步 · 含 7 天挑战期）

| 节点 | 文案 |
|---|---|
| Title | `Arbitrum Exit Path` |
| Badge | `7-DAY CHALLENGE` |
| ★ meta 行 | `3 steps · ~7–8 days · 1,373 holders` |
| Summary | `Withdraw USDDOLD to Ethereum via the official Arbitrum Bridge, then bridge to Tron via BTTC and swap through the Tron PSM.` |
| Step 1 | `Step 1` ／ `Withdraw from Arbitrum to Ethereum via the official bridge.` ／ `Time: ~7 days` ／ CTA `Open Arbitrum Bridge ↗`（描边）|
| Step 2 | `Step 2` ／ `Bridge from Ethereum to Tron via BTTC Bridge.` ／ `Time: 10–30 min` ／ CTA `Open BTTC Bridge ↗`（描边）|
| Step 3 | `Step 3` ／ `Connect TronLink and swap USDDOLD to USDT at 1:1 through the PSM.` ／ CTA `Swap on Tron PSM`（实心绿）|

成稿：
```text
Arbitrum Exit Path   7-DAY CHALLENGE
3 steps · ~7–8 days · 1,373 holders
Withdraw USDDOLD to Ethereum via the official Arbitrum Bridge,
then bridge to Tron via BTTC and swap through the Tron PSM.

① Step 1                  ② Step 2                  ③ Step 3
Withdraw from Arbitrum    Bridge from Ethereum       Connect TronLink and
to Ethereum via the       to Tron via BTTC Bridge.   swap USDDOLD to USDT
official bridge.          Time: 10–30 min            at 1:1 through the PSM.
Time: ~7 days
[ Open Arbitrum Bridge ↗ ][ Open BTTC Bridge ↗ ]    [ Swap on Tron PSM ]
```

> 7 天挑战期由「`7-DAY CHALLENGE` badge + meta 行 `~7–8 days` + Step 1 `Time: ~7 days`」三处共同承载，不再单独加 Warning 框。meta 行的长耗时本身就是最直接的预警。

---

## 9. Polygon Exit Path（3 步）

| 节点 | 文案 |
|---|---|
| Title | `Polygon Exit Path` |
| ★ meta 行 | `3 steps · ~1–4 hrs · 780 holders` |
| Summary | `Withdraw USDDOLD to Ethereum via the Polygon PoS Bridge, then bridge to Tron via BTTC and swap through the Tron PSM.` |
| Step 1 | `Step 1` ／ `Withdraw from Polygon to Ethereum via the Polygon PoS Bridge.` ／ CTA `Open Polygon Portal ↗`（描边）|
| Step 2 | `Step 2` ／ `Bridge from Ethereum to Tron via BTTC Bridge.` ／ CTA `Open BTTC Bridge ↗`（描边）|
| Step 3 | `Step 3` ／ `Connect TronLink and swap USDDOLD to USDT at 1:1 through the PSM.` ／ CTA `Swap on Tron PSM`（实心绿）|

成稿：
```text
Polygon Exit Path
3 steps · ~1–4 hrs · 780 holders
Withdraw USDDOLD to Ethereum via the Polygon PoS Bridge,
then bridge to Tron via BTTC and swap through the Tron PSM.

① Step 1                  ② Step 2                  ③ Step 3
Withdraw from Polygon     Bridge from Ethereum       Connect TronLink and
to Ethereum via the       to Tron via BTTC Bridge.   swap USDDOLD to USDT
Polygon PoS Bridge.                                  at 1:1 through the PSM.
[ Open Polygon Portal ↗ ][ Open BTTC Bridge ↗ ]     [ Swap on Tron PSM ]
```

---

## 10. 模块底部（v4 新增）

居中、低对比度小字，放在 5 张卡之后：

```text
Self-service exit closes September 30, 2026 (UTC+8).
```

> 不催促、不倒计时，只客观告知截止日（符合 PRD 4.7 文案规范）。

---

## 11. meta 行 / holders 汇总（务必逐卡核对）

设计稿当前 holders 5 张卡全部误填 `132,372`，且缺步骤数/耗时。按下表逐张补齐 meta 行：

| 链 | meta 行 | 说明 |
|---|---|---|
| TRON | `Just 1 step · Instant · 132,372 holders` | 本链直兑 |
| Ethereum | `2 steps · ~10–30 min · 1,213 holders` | |
| BSC | `2 steps · ~10–30 min · 5,765 holders` | |
| Arbitrum | `3 steps · ~7–8 days · 1,373 holders` | 含 7 天挑战期 |
| Polygon | `3 steps · ~1–4 hrs · 780 holders` | |

---

## 12. CTA 链接 + 样式

| CTA | 样式 | 链接 | 位置 |
|---|---|---|---|
| `Swap on Tron PSM` | **实心品牌绿**（终点）| legacy 站 Tron PSM 页 | 每条链最后一步 |
| `Open BTTC Bridge ↗` | 描边 + ↗ | `app.bt.io/bridge` | ETH/BSC Step 1，ARB/POL Step 2 |
| `Open Arbitrum Bridge ↗` | 描边 + ↗ | `portal.arbitrum.io/bridge/?destinationChain=ethereum&sourceChain=arbitrum-one&token=0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6` | ARB Step 1 |
| `Open Polygon Portal ↗` | 描边 + ↗ | `portal.polygon.technology/bridge` | POL Step 1 |

---

## 13. 待确认 / 工程提醒

| 项 | 处理 | 需确认 |
|---|---|---|
| meta 行耗时（`~10–30 min`/`~7–8 days`/`~1–4 hrs`）| 用约数 | BTTC、Arbitrum、Polygon 实际耗时范围 |
| holders 数字 | 沿用原型/PRD | 是否更新到最新快照 |
| Arbitrum / Polygon 链接 | 见上 | 上线前再测；Polygon 是否支持预填 token/方向 |
| Sunset 截止日 | `September 30, 2026 (UTC+8)` | 运营最终确认 |
| **Tab 组件** | — | 设计稿头部+Tab 重复 5 次仅为展示 5 个状态，交付须说明是**一个 Tab 组件** |
| **移动端** | — | 横向 3 步在手机放不下，需补移动端 frame（步骤竖排、Tab 横滑），满足 PRD AC-14 |
</content>
