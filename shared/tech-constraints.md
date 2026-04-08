# 技术约束

> PM 写 PRD 时需要了解的技术限制，避免提出技术上不可行的需求。
>
> 数据来源：线上 Network 面板 + CDN 分析，采集日期 2026-04-02

## 前端约束

| 约束 | 说明 | 对产品的影响 |
|------|------|-------------|
| React 18 SPA | 官网和 App 均为 Create React App 单页应用 | 首屏加载依赖 JS 执行，SEO 不友好；搜索引擎爬虫可能无法抓取动态内容 |
| Ant Design 5.x | UI 组件库，提供标准组件样式 | 自定义组件需覆盖 Antd 默认样式；暗色主题需全局配置 Token |
| ECharts 5.x | 图表渲染库 | 移动端大数据量图表可能有性能瓶颈；图表交互（悬停/缩放）在触屏设备体验有限 |
| 字体 Inter (Google Fonts) | 外部字体依赖 | 中国大陆访问可能受 GFW 影响导致字体加载失败，需要 fallback 方案 |
| CDN 域名 | 静态资源托管在 `prod-app-cdn-new.usdd.io` | 全球 CDN 分发，但需关注不同地区的延迟表现 |

## 后端约束

| 约束 | 说明 | 对产品的影响 |
|------|------|-------------|
| 统一 API 网关 | 所有后端接口走 `app-api.usdd.io` | 单点故障风险；接口挂掉影响官网 + App 全部页面 |
| 数据实时性 | 链上数据通过后端聚合，非直接 RPC 调用（Data / SA / Treasury） | 数据可能有秒级~分钟级延迟，不代表链上最终状态 |
| 分页限制 | News 和 FAQ 接口支持 pageNo + pageSize 分页 | 大量内容时需考虑加载策略（分页 vs 无限滚动） |

## 链上约束（Web3 产品特有）

| 约束 | 说明 | 对产品的影响 |
|------|------|-------------|
| 合约不可变 | 核心合约部署后无法修改，参数调整需走治理流程 | 功能设计必须一次到位；新功能可能需要部署新合约 |
| Gas 费用 | 用户执行链上操作（Mint、Redeem、Stake、PSM Swap）需支付 Gas | TRON Gas 极低（通常 < $1）；ETH Gas 波动大，高峰期可能达数十美元 |
| 确认时间 | TRON ~3s、Ethereum ~12s、BNB Chain ~3s | 需设计交易等待状态（pending → confirmed）；用户感知延迟 |
| 预言机喂价 | 价格数据每 5 分钟更新一次（Data 页面显示 "Next Price in 5 min"） | 抵押率和清算阈值基于预言机价格，非实时市场价；极端行情下可能滞后 |
| 多链部署差异 | TRON 功能最全（Vault/PSM/Earn/Liquidation/Auction），ETH 和 BSC 仅支持 PSM + Earn | 不同链的产品能力不同，需在 UI 中明确展示各链可用功能 |
| 钱包兼容性 | TRON: TronLink、Binance Wallet、OKX、TokenPocket、imToken、WalletConnect；EVM: MetaMask、Binance Wallet、OKX、Bitget、WalletConnect | 每种钱包的连接流程和错误处理不同；移动端 DApp 浏览器行为差异大 |
| 链上数据公开 | 所有交易、持仓、合约状态链上透明可查 | 竞品可实时监控协议状态；不应在产品中暗示任何信息是私密的 |

## 第三方依赖

| 依赖 | 限制 | 备选方案 |
|------|------|---------|
| TronGrid RPC | TRON 链上 RPC 服务；PSM/Earn 直接调用合约读取链上状态 | 可切换到其他 TRON 节点提供商 |
| JustLend OpenAPI | Earn 页依赖 JustLend 的 jtoken 和 mining APY 接口 | 无直接替代；若不可用影响 Earn 页 APY 展示 |
| Google Fonts | Inter 字体加载 | 本地化字体文件作为 fallback |
| Google Analytics | 用户行为追踪（GA4: G-SH993QTJ1E） | 可替换为自建分析或其他服务 |

---

> **维护规则**：技术评审中发现新约束时，由开发同步更新此文件。PM 在写 PRD 时应先阅读此文件避免提不可行的需求。
