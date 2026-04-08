# Slack 通知系统 — Slack Notification System

---

## 一、文档元数据

| 字段 | 说明 |
|------|------|
| **项目名称** | USDD 后端服务（base-server-java） |
| **模块名称** | Slack 通知系统 / Slack Notification System |
| **受众** | 运营团队、风控团队、开发 On-Call |
| **关联模块** | Smart Allocator、清算系统、PSM、预言机、黑名单监控、Pause 合约 |
| **外部依赖** | Slack Webhook API；AIOps 电话告警服务（冻结事件触发） |

### 源码索引（供 Dev 参考）

<details>
<summary>点击展开关键文件清单</summary>

| 类别 | 文件路径 | 说明 |
|------|---------|------|
| 服务接口 | `src/main/java/org/tron/defi/service/SlackService.java` | 定义所有发送方法 |
| 服务实现 | `src/main/java/org/tron/defi/service/impl/SlackServiceImpl.java` | HTTP POST Slack Webhook |
| 告警基类 | `src/main/java/org/tron/defi/scheduler/Notification.java` | 支持去重（sendAlertOnce）、@成员、转发 |
| 日报基类 | `src/main/java/org/tron/defi/scheduler/DailyUpdate.java` | 默认发往 dailyDetails，子类可覆盖 |
| 池子监控基类 | `src/main/java/org/tron/defi/scheduler/PoolMonitor.java` | 发往 pool channel |
| 大额交易基类 | `src/main/java/org/tron/defi/scheduler/LargeTransaction.java` | 发往 trading/largeTransaction channel |
| 配置 | `src/main/resources/application-prod.properties` | Webhook URL 及成员 ID 配置 |

**Alert 类任务（共 12 个）**

| 文件 | 说明 |
|------|------|
| `scheduler/tasks/AlertRiskyVault.java` | 高/中风险仓位告警 |
| `scheduler/tasks/AlertLiquidation.java` | 待清算 + 清算额度告警 |
| `scheduler/tasks/AlertAuction.java` | 拍卖监控告警 |
| `scheduler/tasks/AlertPsm.java` | PSM 流动性告警 |
| `scheduler/tasks/AlertPsmLiquidity.java` | PSM V2 分级流动性告警 |
| `scheduler/tasks/AlertVault.java` | Vault 债务额度告警 |
| `scheduler/tasks/AlertRate.java` | ilk.rate 超期告警 |
| `scheduler/tasks/AlertOracle.java` | 预言机价格异常告警 |
| `scheduler/tasks/AlertTransaction.java` | 非 Proxy 操作告警 |
| `scheduler/tasks/AlertSUSDD.java` | sUSDD 净盈余告警 |
| `scheduler/tasks/AlertBttc.java` | BTTC 跨链流动性告警 |
| `scheduler/tasks/AlertMigration.java` | USDDv2 兑换额度告警 |

**Daily 类任务（共 10 个）**

| 文件 | 说明 |
|------|------|
| `scheduler/tasks/DailyRwaSummary.java` | SA 每日收益统计 |
| `scheduler/tasks/DailySummary.java` | 每日系统总结（发往 daily） |
| `scheduler/tasks/DailyAuction.java` | 每日拍卖汇总 |
| `scheduler/tasks/DailyLiquidation.java` | 每日清算汇总 |
| `scheduler/tasks/DailyVault.java` | 每日 Vault 监控汇总 |
| `scheduler/tasks/DailyMigrate.java` | 每日迁移汇总 |
| `scheduler/tasks/DailyPsm.java` | 每日 PSM 汇总 |
| `scheduler/tasks/DailySUSDD.java` | 每日 sUSDD 汇总 |
| `scheduler/tasks/DailyVolatility.java` | 每日价格波动率汇总 |
| `scheduler/tasks/Overview.java` | 每日系统概览 |

**Pool / Trading 类任务（共 7 个）**

| 文件 | 说明 |
|------|------|
| `scheduler/tasks/DailyRiskyVault.java` | 每日风险仓位池报告 |
| `scheduler/tasks/DailyPsmLiquidity.java` | 每日 PSM 流动性池报告 |
| `scheduler/tasks/AmountTransaction.java` | 大额交易监控 |
| `scheduler/tasks/AmountMigrate.java` | 大额迁移监控 |
| `scheduler/tasks/AmountPSM.java` | PSM 大额交易监控 |
| `scheduler/tasks/AmountLiquidation.java` | 清算大额交易监控 |
| `scheduler/tasks/AmountDsrPie.java` | DSR-Pie 大额交易监控 |

**其他任务**

| 文件 | 说明 |
|------|------|
| `scheduler/tasks/WeeklyBlacklistSummary.java` | 每周黑名单汇总 |
| `scheduler/tasks/HtxSummary.java` | HTX 数据汇总（每 2 小时） |
| `service/impl/BlacklistServiceImpl.java` | Token 冻结 / 解冻实时告警 |
| `service/impl/PauseRelatedServiceImpl.java` | Pause 合约 exec 实时告警 |

</details>

---

## 二、Channel 总览

| Channel | 用途定位 | 消息类型 |
|---------|---------|---------|
| **alert / notification** | 实时风控告警，需即时响应 | 仓位风险、清算、PSM、预言机、黑名单冻结、Pause 合约 |
| **dailyDetails** | 每日详细运营数据播报 | SA 收益、拍卖、清算、Vault、PSM、sUSDD、迁移、概览 |
| **daily** | 每日精简汇总，高层概览 | 系统总结（SA 投资 + PSM 数据与前日对比） |
| **pool** | 风险仓位 + 池子日报 | 高风险仓位列表、PSM 流动性日报、HTX 汇总 |
| **trading / largeTransaction** | 大额交易实时播报 | 大额 CDP、PSM、清算、迁移、DSR 交易 |

---

## 三、各 Channel 通知详细 Spec

---

## Channel：alert / notification（实时风控告警）

> 高优先级、事件驱动或高频轮询，需相关成员即时响应。

---

### A1：高风险仓位告警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时（每小时第 6 分钟，cron: `0 6 * * * ?`） |
| **触发条件** | 仓位抵押率低于高风险阈值 |
| **@成员** | `RiskySlackMembers.getMembers(true)`（高风险成员组） |

**消息内容：**
```
>*{emoji} {chain} 质押物 {ilk} 高风险仓位提醒*
表格：User Address | CDP Index | Ink | Art | Debt | Collateral Ratio | Liquid Price | Next Price
```

---

### A2：中等风险仓位告警

| 项 | 说明 |
|----|------|
| **触发方式** | 每日定时（每天 10:00，cron: `0 0 10 * * ?`） |
| **触发条件** | 仓位抵押率低于中风险阈值（高于高风险阈值） |
| **@成员** | `RiskySlackMembers.getMembers(false)`（中风险成员组） |

**消息内容：**
```
>*{emoji} {chain} 质押物 {ilk} 中风险仓位提醒*
表格：User Address | CDP Index | Ink | Art | Debt | Collateral Ratio | Liquid Price | Next Price
```

---

### A3：待清算仓位告警

| 项 | 说明 |
|----|------|
| **触发方式** | 事件驱动（LiquidationAlertEvent 触发） |
| **触发条件** | 仓位达到可清算状态 |
| **@成员** | chris, alice, tabu, bamboo |

**消息内容：**
```
>*{emoji} 质押物 {ilk} 待清算仓位提醒*
表格：清算 ID | vault | debt | 清算比率 | 抵押率
```

---

### A4：清算成功确认

| 项 | 说明 |
|----|------|
| **触发方式** | 事件驱动（清算完成后） |
| **@成员** | chris, alice, tabu, bamboo |

**消息内容：**
```
>*{emoji} 质押物 {ilk} 清算成功仓位*
表格：清算后仓位数据
```

---

### A5：清算监控（5 分钟轮询）

| 项 | 说明 |
|----|------|
| **触发方式** | 定时（每 5 分钟，cron: `0 */5 * * * ?`）；5 分钟内有新清算时触发 |
| **@成员** | chris, alice, tabu, bamboo |

**消息内容：**
```
>*🔗 清算监控-Tron*
表格：清算 ID | vault | debt | 清算比率 | 抵押率
```

---

### A6：清算可用额度不足告警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送（`sendAlertOnce`） |
| **触发条件** | 单个 ilk 清算可用额度 < 阈值 |
| **@成员** | yuki, roby |

**消息内容：**
```
`{ilk}` 的清算可用额度剩余: `{available}`，小于 `{threshold}`
建议：提高 dog.ilk.hole
```

---

### A7：全局清算额度不足告警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送（`sendAlertOnce`） |
| **触发条件** | 全局清算可用额度 < 阈值 |
| **@成员** | yuki, roby |

**消息内容：**
```
全局清算可用额度剩余 `{available}` USDD，小于 `{threshold}`
建议：提高 dog.Hole
```

---

### A8：拍卖监控

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询；5 分钟内有新拍卖 或 40 分钟内有进行中拍卖时触发 |
| **@成员** | chris, alice, tabu, bamboo |

**消息内容：**
```
>*🔗 拍卖监控-Tron*
表格：拍卖 ID | 状态 | vault | 债务
```

---

### A9：PSM 流动性不足告警（V1）

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送（`sendAlertOnce`） |
| **触发条件** | PSM 可兑换额度 < 阈值 |
| **@成员** | yuki, roby, chris, jasmine, darren |

**消息内容：**
```
>*{emoji} PSM监控-{chain}*
`{desc}` 剩余可兑换额度为 `{available}` USDD，小于 `{threshold}`
建议：提高抵押品债务上限
```

---

### A10：PSM V2 分级流动性告警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，多级告警（标准告警 + 高风险转发） |
| **触发条件** | 余额低于对应链/资产的阈值（分多档） |
| **@成员（标准）** | peggy, yuki, roby, chris, jasmine, darren, bella |
| **@成员（高风险转发至 pool）** | 标准成员 + PSM Finance 成员 |

**消息内容：**
```
>*{emoji} PSM监控-{chain}*
`{desc}` 剩余可兑换额度: `{available}` `{symbol}`，小于: `{upper}`
```

---

### A11：Vault 债务额度不足告警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送（`sendAlertOnce`） |
| **触发条件** | 单个 ilk / 全局债务可用额度 < 阈值 |
| **@成员** | yuki, roby |

**消息内容：**
```
>*{emoji} Vault 监控-{chain}*
`{ilk}` 的债务可用额度剩余 `{available}` USDD，小于 `{threshold}` USDD
（或：全局债务可用额度剩余 `{available}` USDD，小于 `{threshold}` USDD）
```

---

### A12：ilk.rate 超期未更新告警

| 项 | 说明 |
|----|------|
| **触发方式** | 每小时整点（cron: `0 0 * * * ?`） |
| **触发条件** | rate 超过 24 小时未更新 |
| **@成员** | chris, alice, tabu, bamboo |

**消息内容：**
```
>*{emoji} Vault 监控-{chain}*
质押物 `{ilks}` 的 ilk.rate 超过 1 天未更新参数
```

---

### A13：预言机价格波动告警

| 项 | 说明 |
|----|------|
| **触发方式** | 每小时第 5 分钟（cron: `0 5 * * * ?`） |
| **触发条件** | 1 小时内价格波动超过 5%（可配置） |
| **@成员** | `BusinessConstants.RD_PD_RECEIVERS` |

**消息内容：**
```
>*{emoji} 预言机监控-{chain}*
质押物 `{ilk}` 1h 内预言机价格 `{direction}` 超过 `{percentage}`
本次价格 `{nextPrice}`，上次价格 `{currentPrice}`
```

---

### A14：预言机喂价缺失告警

| 项 | 说明 |
|----|------|
| **触发方式** | 每小时整点（cron: `0 0 * * * ?`） |
| **触发条件** | Feed / Median / Pip(Spot) 喂价未检测到 |
| **@成员** | `BusinessConstants.RD_RECEIVERS` |

**消息内容（三种类型）：**
```
>*{emoji} 预言机监控-{chain}*
质押物 `{collaterals}` 未监控到 `Feed` 喂价
（或 Median / Spot）
```

---

### A15：预言机 Bot 余额不足告警

| 项 | 说明 |
|----|------|
| **触发方式** | 每小时第 5 分钟 |
| **触发条件** | Bot TRX 余额 < 阈值 |
| **@成员** | chris, terrance |

**消息内容：**
```
`{chain}` 预言机喂价 Bot `{bot}` 的余额 `{balance}` 低于阈值
```

---

### A16：非 Proxy 操作检测

| 项 | 说明 |
|----|------|
| **触发方式** | 每 5 分钟扫描过去 5~10 分钟的交易 |
| **触发条件** | 检测到非通过 Proxy 合约发起的操作 |
| **@成员** | chris, yuki, alice |

**消息内容：**
```
>*{chain}-非Proxy操作*
表格：Ilk | Operation | Amount | Time | Urn
```

---

### A17：sUSDD 净盈余跑道预警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送（`sendAlertOnce`） |
| **触发条件** | 净盈余不足以覆盖 N 天挖矿成本 |
| **@成员** | peggy, yuki, roby, chris, jasmine, darren |

**消息内容：**
```
>*{emoji} sUSDD监控-{chain}*
当前净盈余为 `{surplus}` USDD 不足以覆盖 `{days}` 天的挖矿成本
现 TVL 每日挖矿成本为 `{dailyCost}`
```

---

### A18：sUSDD 净盈余阈值告警（含转发）

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送 + 转发 pool channel |
| **触发条件** | 净盈余低于绝对阈值 |
| **@成员（alert）** | peggy, yuki, roby, chris, jasmine, darren |
| **@成员（转发 pool）** | + payment 成员 |

**消息内容：**
```
>*{emoji} sUSDD监控-{chain}*
当前净盈余为 `{surplus}` USDD，小于 `{threshold}`
现 TVL 每日挖矿成本为 `{dailyCost}`
```

---

### A19：BTTC 跨链流动性告警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送 + 转发 |
| **触发条件** | BTTC 某链 USDD 跨链流动性 < 阈值 |
| **@成员** | peggy, yuki, roby, chris, jasmine, darren, cc, payment |

**消息内容：**
```
>*BTTC 流动性监控*
BTTC 跨链中 {chain}-USDD 流动性为 `{available}`，不足 `{threshold}`
```

---

### A20：USDDv2 兑换额度不足告警

| 项 | 说明 |
|----|------|
| **触发方式** | 定时轮询，去重发送（`sendAlertOnce`） |
| **触发条件** | USDDv2 剩余可兑换额度低于阈值 |
| **@成员** | yuki, roby |

**消息内容：**
```
{timestamp}
USDDv2 剩余可兑换额度 {available}
```

---

### A21：Token 冻结 / 解冻实时告警

| 项 | 说明 |
|----|------|
| **触发方式** | 事件驱动（链上 BLACKLISTED / UNBLACKLISTED 事件实时监听） |
| **额外动作** | 冻结事件同时触发 **AIOps 电话告警** |
| **@成员** | jasmine, darren, yuki, roby, chris, alice, bamboo, tabu |
| **监控链** | Ethereum（USDT/USDC）、Tron（USDT）、Base（USDC）、Plasma（USDT0） |
| **监控地址** | PSM gemjoin、CDP gemjoin、SA 操作地址 |

**消息内容（冻结）：**
```
>*🚨 Token 冻结报警 - {chain}*
`{TOKEN}` `{TOKEN合约地址}` `{地址描述}` 触发冻结
建议：请立即查看，转移 token
```

---

### A22：web3 Pause 合约 exec 告警

| 项 | 说明 |
|----|------|
| **触发方式** | 事件驱动（链上 Pause 合约 Exec 事件实时监听） |
| **@成员** | `BusinessConstants.WEB3_ADMIN_RECEIVERS` |

**消息内容：**
```
>*{emoji} {chain} web3 Pause合约 exec事件 - {chain}*
交易：`{tx hash链接}`
usr：`{用户地址}`
tag：`{标签}`
eta：`{时间戳}`
fax：`{fax数据}`
```

---

## Channel：dailyDetails（每日详细数据播报）

> 每日 10:00（GMT+8）定时发送，cron: `0 0 10 * * ?`

---

### D1：SA 每日收益统计

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 09:55 由 `DailyOverviewSummaryStatisticTask` 生成数据后触发 |
| **Channel** | dailyDetails |

**消息内容：**
```
>*{YYYY-MM-DD} USDD收益统计*
>   多链汇总数据
>   总债务数量: `{值}` USDD
>   总投资价值（包含收益）: `{值}` USDT
>   总投资收益(不包含今日): `{值}` USDT，当前投资APY: `{百分比}`%
>   总挖矿成本(不包含今日): `{值}` USDD
>   总挖矿成本覆盖率(不包含今日): `{百分比}`%

>   `SA-{平台名}` 投资收益: `{值}` {币种}；APY: `{百分比}`%
>   （每个投资平台单独一行）

>   HTX投资收益: `{值}` USDT，实际APY: `{百分比}`%
>   ETH funding rate APY（近7天均值）: `{百分比}`%
>   BTC funding rate APY（近7天均值）: `{百分比}`%

>   昨日总投资收益: `{值}` USDT
>   预计昨日总挖矿成本: `{值}` USDD
>   预计昨日成本覆盖率: `{百分比}`%
>   备注: `{日期}` 后其他交易所为估算数据；JustLend更新时间-昨天20:00

>   🟢 Tron数据
>   总债务数量: `{值}` USDD | 总挖矿成本(不含今日): `{值}` USDD

>   🟦 Ethereum数据
>   总债务数量: `{值}` USDD | 总挖矿成本(不含今日): `{值}` USDD

>   🟡 BSC数据
>   总债务数量: `{值}` USDD | 总挖矿成本(不含今日): `{值}` USDD
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| 总债务 | `sum(vaultInfos[].debt)` |
| 总投资价值 | `DailyRwaSummaryVO.totalHoldingAmount` |
| 总投资收益 | `DailyRwaSummaryVO.allIncome`（不含今日） |
| 当前APY | `DailyRwaSummaryVO.apyAfterAdjust` |
| 总挖矿成本 | `tronAllCost + ethAllCost + bscAllCost` |
| 覆盖率 | `allCoverPercent = allIncome / allCost × 100%` |
| 各平台收益 | `RwaPlatformVO.currentIncome / platformApy` |
| HTX 数据 | `HtxAccountLedgerHistory` + `HtxFundingRate` |

---

### D2：每日拍卖汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00，cron: `0 0 10 * * ?` |
| **Channel** | dailyDetails |

**消息内容：**
```
>*🔗 {date} 拍卖-Tron*
已完成拍卖统计：总数量、总盈余
今日拍卖统计
表格（已完成）：拍卖 ID | vault | debt | 拍卖收益 | 完成时间
表格（进行中）：拍卖 ID | vault | debt | 状态
```

---

### D3：每日清算汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | dailyDetails |

**消息内容：**
```
>*{TRON_EMOJI}{date} 清算-Tron*
>   总清算的CDP数量: `{totalCount}` ;总清算的债务数量: `{totalDebt}`
>   今日清算的CDP数量: `{dailyCount}` ;债务: `{dailyDebt}`

表格（今日清算明细）：
ilk | CDP count | Debt amount | Collateral amount
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| totalCount | `liquidationHistoryService.getTotalLiquidationCdpiCountExclusiveRedo()` |
| totalDebt | Redis 累计 + 今日新增（`TOTAL_LIQUIDATION_DEBT`） |
| dailyCount | 今日 LiquidationHistory 去重 CDP 数量 |
| dailyDebt | 今日 `debtExclusiveChop` 之和 |
| 明细表格 | 按 ilk 分组：CDP 去重数、Debt 之和、Collateral（ink）之和 |

---

### D4：每日 Vault 监控汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | dailyDetails |

**消息内容（每条链单独一条消息）：**
```
>*{emoji}{date} Vault-{chain}*
>   `USDD`总抵押品价值: ${totalCollateralValue}
>   `USDD`总抵押品债务: `{totalDebt}`USDD

表格（{emoji}质押物明细）：
Ilk | Collateral Amount | Collateral Value($) | Debt(USDD) | CDP Count | Liq. Collateral Ratio | Min. Collateral Ratio

>   非Proxy操作的地址数量: `{noProxyAddressCount}`
>   当前非proxy抵押物总价值: `{noProxyCollateralValue}`
>   当前非proxy mint USDD总数量: `{noProxyMintedUsdd}`

表格（{emoji}非proxy创建的仓位明细）：
Ilk | Collateral Amount | Collateral Value($) | Debt(USDD) | Address Amount
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| totalCollateralValue | 所有 `CollateralInfo.currentPrice × ink` 之和 |
| totalDebt | `VatInfo.debt` |
| 质押物明细 | 按 ilk 排序（普通质押物在前，RWA 在后），mat×100 为清算抵押率 |
| Min. Collateral Ratio | 当前最低抵押率仓位的抵押率（`SolMath.calcCollateralRatio`） |
| noProxy 数据 | 过滤 PSM/RWA 等特殊 ilk 后，直接使用 EOA 地址创建的仓位统计 |

---

### D5：每日 PSM 汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | dailyDetails |

**消息内容（每条链单独一条消息）：**
```
>*{emoji}{date} PSM-{chain}*

（每个 Gem 循环输出：）
>   `PSM（USDD-{symbol}）` 中 `{symbol}` 的额度 `{gemAvailable}`
>   `PSM（USDD-{symbol}）` 中 `USDD` 的额度 `{usddAvailable}`
>   `{symbol}-USDD` 今日交易额: `{sellAmount}` 今日交易地址数量: `{sellAddressCount}`
>   `USDD-{symbol}` 今日交易额: `{buyAmount}` 今日交易地址数量: `{buyAddressCount}`

>   手续费总额: `{totalFee}` 今日手续费: `{dailyFee}`

（Tron 链额外追加：）
>   `USDDv1 PSM` 中 `USDT` 的额度 `{v1UsdtAvailable}`
>   PSM 能量剩余 Available: `{remaining}`/`{limit}`， 剩余占比 `{percent}%`
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| gemAvailable | `commonContractTrigger.getGemAvailable(gemContractInfo)` |
| usddAvailable | `commonContractTrigger.getUSDDAvailable(gemContractInfo)` |
| sellAmount | 当日 `SELL_GEM` 类型 `gemAmount` 之和（stablecoin → USDD） |
| buyAmount | 当日 `BUY_GEM` 类型 `gemAmount` 之和（USDD → stablecoin） |
| totalFee / dailyFee | `GemPsmHistory.fee` 全量/当日 之和 |
| v1UsdtAvailable | USDDv1 PSM 合约中 USDT 余额（Tron 链独有） |
| 能量剩余 | TronScan API 查询 PSM 合约创建者能量（Tron 链独有） |

> **注意：** BSC 链跳过 USDC Gem（代码中 `continue`）

---

### D6：每日 sUSDD 汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | dailyDetails |

**消息内容（仅 ETH / BSC 链，Tron 链跳过）：**
```
>*{emoji}{date} sUSDD数据-{chain}*
>   Total Supply: `{sUsddTotalSupply}`sUSDD; APY: `{dsrApy}`%
>   当前质押USDD的地址数量: `{susddHolderCount}`
>   当前质押的USDD（包含利息）: `{stakeUSDD}`USDD
>   总利息（包含用户未提取的USDD）: `{totalInvest}`USDD
>   昨日利息: `{yesterdayInvest}`USDD
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| sUsddTotalSupply | `UsddInfo.susddTotalSupply` |
| dsrApy | `UsddInfo.dsrApy × 100%` |
| susddHolderCount | `susddHolderService.countHolderByChain(chain)` |
| stakeUSDD | `usddInfo.getStakeUSDD(timestamp)`（含利息） |
| totalInvest | `stakeUSDD + dsrWithdrawAmount − dsrDepositAmount` |
| yesterdayInvest | `UsddStats[0].totalInvest − UsddStats[1].totalInvest`（最近 2 条） |

---

### D7：每日迁移汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | dailyDetails |

**消息内容（仅 Tron 链）：**
```
>*{TRON_EMOJI}{date} Migration-Tron*
>   已经从V1兑换到v2的数量: `{v1ToV2Amount}`
>   流通的总V1数量: `{remainingV1Amount}`
>   今日V1兑换到V2的数量: `{dailyAmount}`
>   今日交易的地址数量: `{dailyAddressCount}`
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| v1ToV2Amount | Exchange 合约中 USDDv1 余额（`contractTrigger.getGemBalance`） |
| remainingV1Amount | `USDDv1.totalSupply − v1ToV2Amount` |
| dailyAmount | 当日 `ExchangeHistory.oldAmount` 之和 |
| dailyAddressCount | 当日 `ExchangeHistory.userAddress` 去重数 |

---

### D8：每日价格波动率

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:30，cron: `0 30 10 * * ?` |
| **触发条件** | TRX 波动率 > 0.65 或 STRX > 0.696 |
| **Channel** | dailyDetails → alert channel（`sendAlert`） |
| **@成员** | yuki, roby, jasmine, darren, chris |

**消息内容：**
```
>*🔗 清算监控-Tron*
`{symbol}-{quota}` 价格近 25 天波动率 `{volatility}`，超过: `{threshold}`
```

---

### D9：每日系统概览

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | dailyDetails |

**消息内容：**
```
>*{date} 概览数据*
>   所有链汇总数据
>   Total Supply: `{usddTotalSupply}` USDD; 系统净盈余: `{systemNetSurplus}` USDD

>   {TRON_EMOJI}Tron链数据
>   Total Supply: `{tronTotalSupply}` USDD; 系统净盈余: `{tronNetSurplus}` USDD; 系统中USDD收入: `{tronSurplus}` USDD; 系统中USDD欠款: `{tronDebt}` USDD; 总用户地址数量: `{tronTotalUsers}` ; 今日新增: `{tronDailyUsers}` ;

>   {ETH_EMOJI}Ethereum链数据
>   Total Supply: `{ethTotalSupply}` USDD; 系统净盈余: `{ethNetSurplus}` USDD; 系统中USDD收入: `{ethSurplus}` USDD; 系统中USDD欠款: `{ethDebt}` USDD; 总用户地址数量: `{ethTotalUsers}` ; 今日新增: `{ethDailyUsers}` ;

>   {BSC_EMOJI}Bsc链数据
>   Total Supply: `{bscTotalSupply}` USDD; 系统净盈余: `{bscNetSurplus}` USDD; 系统中USDD收入: `{bscSurplus}` USDD; 系统中USDD欠款: `{bscDebt}` USDD; 总用户地址数量: `{bscTotalUsers}` ; 今日新增: `{bscDailyUsers}` ;
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| usddTotalSupply | `DailySummaryInfo.usddTotalSupply`（优先快照，其次 UsddInfo 实时值） |
| systemNetSurplus | `(eth + tron + bsc) 各链 (surplus - debt)` 之和 |
| surplus / debt | `commonContractTrigger.getUsddFromVat(chain, isSin)`，失败时取 Redis 缓存 |
| totalUsers / dailyUsers | Redis `TOTAL_USER_ADDRESSES` 中累计地址数 / 今日首次出现的地址数 |
| 用户地址来源 | ProxyInfo（CDP）、GemPsmHistory（PSM）、LiquidationHistory（清算）、SusddTransaction（sUSDD 质押/赎回） |

---

## Channel：daily（每日精简汇总）

> 面向高层的每日摘要，发往独立的 `daily` channel（由 `DailySummary.resolveChannel()` 覆盖默认）。

---

### S1：每日系统总结

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | daily（非 dailyDetails） |

**消息内容（含与前日对比，单位 M = 百万）：**
```
>*{YYYY-MM-DD} Summary*
>   总发行量: `{totalSupplyValue M}`，24H `{±}{change M}`
>   总投资: `{totalInvestValue M}`，未投资: `{psmUnInvestedUsdt M}`

>   总投资收益: `${allIncome M}`，24H `{±}${24hIncome}`（含SPK/XPL）
>   总挖矿成本: `${allCost M}`，24H `{±}${24hCostChange}`
>   总成本覆盖率: `{coverRate%}`（不含SPK/XPL）/ `{coverRateWithSPK%}`（含SPK/XPL）

>   24H 投资综合利率: `{apy%}`（不含SPK/XPL）/ `{apyWithSPK%}`（含SPK/XPL）
>   24H 成本覆盖率: `{24hCoverRate%}`（不含SPK/XPL）/ `{24hCoverRateWithSPK%}`（含SPK/XPL）
>   24H 盈亏: `{±}${netProfit}`（不含SPK/XPL）/ `{±}${netProfitWithSPK}`（含SPK/XPL）

>   共持有 `{spkAmount M}`SPK，总价值 `${spkValue}` （价格 `${spkPrice}`，`{±}%`）[>$0.25 建议卖出]
>   共持有 `{wxplAmount M}`XPL，总价值 `${wxplValue}` （价格 `${wxplPrice}`，`{±}%`）
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| totalSupplyValue | `DailySummaryInfo.totalSupplyValue` |
| totalInvestValue | `DailySummaryInfo.totalInvestValueForSA` − SparkFarm 持仓 SPK 价值（排除浮动收益） |
| psmUnInvestedUsdt | PSM 中未投资的 USDT（Tron + ETH） |
| allIncome | 复利收益 + SparkFarm 已兑现 + AaveXpl 已兑现 + AaveXpl 持仓价值 |
| 24hIncome | 今日 − 昨日 allIncome（含浮动：新增 SPK + 新增 XPL 当前价值） |
| allCost | `DailySummaryInfo.allCostForSA` |
| apy | `24hIncome × 365 / totalInvestValue × 100%` |
| SPK / XPL | `DailySummaryInfo.sparkFarmRewardInfoForSA / aaveXplRewardInfoForSA` |
| SPK 卖出建议 | 当前 SPK 价格 > $0.25 时附加提示 |

---

## Channel：pool（风险仓位 + 池子日报）

---

### P1：每日高风险仓位池报告

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 10:00 |
| **Channel** | pool |

**消息内容：**
```
表格（各 Ilk 前 10 个风险仓位）：
User Address | CDP Index | Ink | Art | Debt | Collateral Ratio | Liquid Price
```

---

### P2：每日 PSM 流动性池报告

| 项 | 说明 |
|----|------|
| **触发方式** | 每日 20:20，cron: `0 20 20 * * ?` |
| **Channel** | pool |

**消息内容（共 3 条消息，分别对应 Tron / ETH / BSC）：**

**消息 1 — PSM流动性监控-Tron：**
```
>*{date} PSM流动性监控-Tron*
>   PSM 昨日USDD- USDT净流动额 `{tronOneDayNetAmount}`
>   PSM 近7日USDD- USDT平均净每日流动额 `{tronSevenDayNetAvg}`
>   USDD Holder（Top10 ）总持有量 `{tronUsddTopAmount}`
>   JUSDD Holder（Top10 ）总持有量价值 `{jusddTopValue}`
（按 RwaPlatformMonitor 配置，输出各平台 gem 余额）
>   {platformStr} 当前{gemSymbol}余额 `{monitorValue}`
```

**消息 2 — PSM流动性监控-Ethereum：**
```
>*{date} PSM流动性监控-Ethereum*
>   PSM 昨日USDD- USDT净流动额 `{ethUsdtOneDayNetAmount}`
>   PSM 昨日USDD- USDC净流动额 `{ethUsdcOneDayNetAmount}`
>   PSM 近7日USDD- USDT平均净每日流动额 `{ethUsdtSevenDayNetAvg}`
>   PSM 近7日USDD- USDC平均净每日流动额 `{ethUsdcSevenDayNetAvg}`
>   USDD Holder（Top10 ）总持有量 `{ethUsddTopAmount}`
```

**消息 3 — PSM流动性监控-BSC：**
```
>*{date} PSM流动性监控-BSC*
>   PSM 昨日USDD- USDT净流动额 `{bscUsdtOneDayNetAmount}`
>   PSM 近7日USDD- USDT平均净每日流动额 `{bscUsdtSevenDayNetAvg}`
>   USDD Holder（Top10 ）总持有量 `{bscUsddTopAmount}`
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| 净流动额 | `BUY_GEM` 为正（gem 流出），`SELL_GEM` 为负（USDD 流出） |
| 近 7 日均值 | 近 7 天净流动总额 ÷ 7 |
| USDD Holder Top10 | Tron：`StatisticInfoService`；ETH/BSC：`UsddHolderService.getTopN(chain, 10)` |
| JUSDD Top10 价值 | `jusddTopAmount × exchangeRate`（jUSDDExchangeRate） |
| 平台余额 | `RwaPlatformMonitorService`，仅展示 `isAlert=true` 且 `totalInvestValue > 0` 的平台 |
| BSC USDC | 代码注释掉，当前不展示 |

---

### P3：HTX 数据汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每 2 小时，cron: `0 0 */2 * * *` |
| **Channel** | pool |

**消息内容：**
```
>*{TRON_EMOJI}HTX资金费率数据播报{date}*
>   实际到账营收: $ `{actualReceivedRevenue}` 最新结算日期：{latestSettlementDate}
>   总资金费率收益: $ `{totalFundingRateIncome}`
>   操作账户总价值: $ `{totalAccountValue}`
>   保证金权益总值: $ `{totalEquity}` 可用余额总值: $ `{totalAvailableMargin}`

表格（持仓详情）：
pair | uid | lever rate | volume(USDT) | liquidation price(USDT) | open avg price(USDT) | latest price(USDT) | initial margin(USDT) | margin rate | profit
```

**字段说明：**

| 字段 | 来源 |
|------|------|
| actualReceivedRevenue | `htxAccountLedgerHistoryService.getEarnings()`（实际入账营收） |
| latestSettlementDate | `htxAccountLedgerHistoryService.getLastTime(spotId)` 转日期 |
| totalFundingRateIncome | 所有 position UID 账户 `totalFundingRate` 之和 |
| totalAccountValue | `htxAccountInfoService.getTotalInvestValue()` |
| totalEquity / totalAvailableMargin | 所有账户 `totalEquity / totalAvailableMargin` 之和 |
| 持仓表格 | 每账户 ETH/USDT 永续合约：杠杆率、持仓量、强平价、均价、最新价、初始保证金、保证金率、浮动盈亏 |
| 监控范围 | 仅 `tronDefiConfigurer.getHtxProperties().getPositionUids()` 配置的 UID |

---

## Channel：trading / largeTransaction（大额交易实时播报）

> 定时轮询（每 5 分钟），检测到大额交易时立即发送表格消息。

---

### T1：CDP 大额交易

| 项 | 说明 |
|----|------|
| **触发方式** | 每 5 分钟，条件：交易金额 > 阈值 |
| **Channel** | trading |

**消息内容：** 表格：交易详情（Ilk、Operation、Amount、地址、时间、TX Hash）

---

### T2：大额迁移交易

| 项 | 说明 |
|----|------|
| **触发方式** | 每 5 分钟，条件：迁移金额 > 阈值 |
| **Channel** | trading |

**消息内容：** 表格：迁移交易详情

---

### T3：PSM 大额交易

| 项 | 说明 |
|----|------|
| **触发方式** | 每 5 分钟，条件：PSM 交易 > 阈值 |
| **Channel** | trading |

**消息内容：** 表格：PSM 交易详情（链、方向、金额、地址、TX Hash）

---

### T4：清算大额交易

| 项 | 说明 |
|----|------|
| **触发方式** | 每 5 分钟，条件：单笔清算 > 阈值 |
| **Channel** | trading |

**消息内容：** 表格：清算交易详情

---

### T5：DSR-Pie 大额交易

| 项 | 说明 |
|----|------|
| **触发方式** | 每 5 分钟，条件：DSR 操作金额 > 阈值 |
| **Channel** | trading |

**消息内容：** 表格：DSR 交易详情

---

## 四、周期性通知（跨 Channel）

---

### W1：Token 冻结周汇总

| 项 | 说明 |
|----|------|
| **触发方式** | 每周一 10:00，cron: `0 0 10 ? * MON` |
| **Channel** | notification |

**消息内容：**
```
>*Token 冻结报警总结*
上周报警条数: `{数值}`
补充：触发冻结报警后会立即播报
```

---

## 五、Cron 表达式汇总

| 频率 | Cron | 对应任务 |
|------|------|---------|
| 每 5 分钟 | `0 */5 * * * ?` | 大额交易、清算监控、PSM 告警等轮询任务 |
| 每小时第 5 分钟 | `0 5 * * * ?` | 预言机告警 |
| 每小时第 6 分钟 | `0 6 * * * ?` | 高风险仓位告警 |
| 每小时整点 | `0 0 * * * ?` | ilk.rate 超期、预言机喂价缺失 |
| 每 2 小时 | `0 0 */2 * * *` | HTX 汇总 |
| 每日 09:55/57/59 | `0 55,57,59 9 * * ?` | 数据统计生成 |
| 每日 10:00 | `0 0 10 * * ?` | 所有 Daily 类任务 |
| 每日 10:30 | `0 30 10 * * ?` | 价格波动率 |
| 每日 20:20 | `0 20 20 * * ?` | PSM 流动性池日报 |
| 每周一 10:00 | `0 0 10 ? * MON` | 黑名单周汇总 |

---

## 六、已知待优化项

| # | 描述 | 影响 | 建议优先级 |
|---|------|------|----------|
| 1 | Slack Webhook 调用失败时无重试，消息可能丢失 | 风控告警静默 | P1 |
| 2 | 链上事件监听（黑名单、Pause 合约）中断时无健康检查告警 | 冻结/治理事件漏报 | P1 |
| 3 | @成员列表硬编码在代码中，人员变动需发版 | 运维成本高 | P2 |
| 4 | DailyVolatility 继承 `Notification` 并调用 `sendAlert`，实际发往 alert channel 而非 dailyDetails；D8 所在章节分类有偏差 | 文档分类有误 | P2 |
| 5 | DailySummary 中 `getActualTotalInvestValueForSA()` 已减去 SparkFarm 持仓 SPK 价值，与 SA 页面展示的 totalHoldingAmount 有细微差异 | 口径对齐 | P2 |
| 6 | N5 每日池子信息（`DailyPool.java`）已全部注释，原因和恢复计划不明确 | 池子可见性缺失 | P2 |
| 7 | 大额交易阈值（T1~T5）当前值未在本文档中明确 | QA 无法验证触发条件 | P2 |

---

## 质量自检清单

- [x] 所有通知按 Channel 分组，结构清晰
- [x] 每条通知的触发方式、内容、@成员均已描述
- [x] Cron 表达式汇总完整
- [x] 已暂停的通知（DailyPool）标注状态
- [x] D3~D9（清算、Vault、PSM、sUSDD、迁移、波动率、概览）完整消息格式已补充
- [x] P2（PSM 流动性池）、P3（HTX 汇总）消息格式已补充
- [x] S1（DailySummary）完整消息格式已补充
- [ ] 大额交易监控（T1~T5）的金额阈值待确认
- [ ] Monitor 系列任务（JustLendMonitor、AaveMonitor 等）是否有 Slack 发送尚未确认
