# API 参考

> PM 视角的接口总览。用于写 PRD 时判断「哪些能力已有、哪些需要新增」。不需要写请求/响应的完整字段，只需了解能力边界。
>
> 数据来源：Network 面板抓取，采集日期 2026-04-02

## 后端 API（app-api.usdd.io）

Base URL: `https://app-api.usdd.io`

### 全局 / 首页

| 接口名称 | 方法 | 端点 | 主要参数 | 能力描述 | 调用页面 |
| --- | --- | --- | --- | --- | --- |
| 全网总览 | GET | `/market-site/overview` | — | 返回 Total Supply、Protocol TVL、Savings TVL 等全网聚合指标 | 首页 |
| 各链 APY | GET | `/market-site/overview/apy` | chain=ALL | 返回各链的 APY 历史数据，用于 APY 图表和收益模拟器 | 首页 |
| Vault 抵押品列表 | GET | `/vault/collaterals` | — | 返回全部 Vault 类型的基本信息 | 首页 |
| 代币最高价格 | GET | `/liquid/highestprice` | — | 返回代币最高价格信息 | 首页、Earn |

### Data 透明页

| 接口名称 | 方法 | 端点 | 主要参数 | 能力描述 | 调用页面 |
| --- | --- | --- | --- | --- | --- |
| 最新抵押品数据（列表） | GET | `/data-platform/latest-collateral` | chain=tron | 返回指定链所有 Vault 的 Collateral Value、Debt、Debt Ceiling、Stability Fee、Min CR | Data 列表页 |
| 最新抵押品数据（单个） | GET | `/data-platform/latest-collateral` | ilk=TRX-A&chain=tron | 返回单个 Vault 的详细数据（Collateral Value、Debt、Overcollateralization） | Vault 详情页 |
| 抵押品历史走势 | GET | `/data-platform/collateral-history` | interval=WEEKLY&chain=tron | 返回 Collateral Value / Supply APY / USDD Supply 的时间序列数据 | Data 列表页图表 |
| 抵押品风险分布 | GET | `/data-platform/collateral-normal/collateral-at-risk` | ilk=TRX-A&chain=tron | 返回指定 Vault 的抵押品清算风险分布数据 | Vault 详情页图表 |

### Smart Allocator

| 接口名称 | 方法 | 端点 | 主要参数 | 能力描述 | 调用页面 |
| --- | --- | --- | --- | --- | --- |
| SA 投资总览 | GET | `/smart-allocator/detail-overview` | — | 返回 Debt、Invested、Earnings、APY、资产分布（按协议/网络/资产）、Proof of Reserve 表格数据 | SA 页 |

### Treasury

| 接口名称 | 方法 | 端点 | 主要参数 | 能力描述 | 调用页面 |
| --- | --- | --- | --- | --- | --- |
| JST 销毁信息 | GET | `/data-platform/treasury/jst-burned-info` | — | 返回 JST 总销毁量、销毁记录、销毁来源 | Treasury 页 |

### Earn

| 接口名称 | 方法 | 端点 | 主要参数 | 能力描述 | 调用页面 |
| --- | --- | --- | --- | --- | --- |
| Earn APY | GET | `/earn/apy` | — | 返回各链各平台的 Earn APY 数据 | Earn 页 |

### News / FAQ

| 接口名称 | 方法 | 端点 | 主要参数 | 能力描述 | 调用页面 |
| --- | --- | --- | --- | --- | --- |
| 新闻列表 | GET | `/news/list` | pageNo、pageSize、keyword、category(ALL/Educational/Activities/News) | 返回新闻列表，支持分页和分类筛选 | News 页、首页（pageSize=2） |
| FAQ 列表 | GET | `/market-site/faq/list` | keyword、pageNo、pageSize | 返回 FAQ 列表，支持关键词搜索和分页 | FAQ 页 |

## 第三方服务

| 服务 | 端点 | 用途 | 调用页面 | 备注 |
| --- | --- | --- | --- | --- |
| JustLend — 借贷代币 | GET `https://openapi.just.network/lend/jtoken` | 获取 JustLend 借贷代币数据 | Earn | 第三方 API |
| JustLend — 挖矿 APY | GET `https://openapi.just.network/mining/apy` | 获取 JustLend 挖矿年化收益 | Earn | 第三方 API |
| TronGrid — 合约调用 | POST `https://api.trongrid.io/wallet/triggerconstantcontract` | TRON 链上智能合约只读调用（查询余额、汇率等） | PSM、Earn、Vault | 链上 RPC，无需后端 |
| TronGrid — 账户信息 | POST `https://api.trongrid.io/wallet/getaccount` | 获取 TRON 账户信息（余额、资源） | PSM、Earn | 链上 RPC |

## 静态资源 CDN

| 域名 | 用途 |
| --- | --- |
| `prod-app-cdn-new.usdd.io` | App 端 JS/CSS/图片/字体等静态资源 |
| `app-api.usdd.io/static/images/` | 新闻封面图 |

## 技术栈速览

| 维度 | 技术 | 版本 |
| --- | --- | --- |
| 前端框架 | React | 18 |
| UI 库 | Ant Design | 5.21.6 |
| 图表 | ECharts | 5.6.0 |
| 日期处理 | Day.js | 1.11.10 |
| TRON SDK | TronWeb | 6.0.3 |
| EVM SDK | Ethers.js | 6.14.4 |
| 字体 | Inter (Google Fonts) | — |

---

> **维护规则**：技术评审中确认需要新接口时，在此补充。由开发同步接口能力描述。
