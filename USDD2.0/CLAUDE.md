# USDD 2.0 官网 — AI 协作指引

## 端级概述

USDD 2.0 官网（usdd.io）是协议的对外门户，面向 DeFi 用户、投资者和分析师，承担品牌展示、数据透明和用户引导三大职责。Web 端，暗色主题，多链数据展示（TRON / Ethereum / BNB Chain）。

## 模块全景

| 模块 | 基线 PRD | 描述 | 最近更新 |
|------|---------|------|---------|
| 全局组件 | modules/website-global.md | 导航栏、页脚、通用交互 | 2026-04-02 |
| 首页 | modules/website-homepage.md | Hero、指标、APY、模拟器、代币、Markets | 2026-04-02 |
| 数据透明 | modules/website-data.md | 多链指标、图表、Collateral List、Vault 详情 | 2026-04-02 |
| Smart Allocator | modules/website-smart-allocator.md | 投资总览、资产分布、Proof of Reserve | 2026-04-02 |
| 国库 | modules/website-treasury.md | 季度财报、JST Buyback & Burn | 2026-04-02 |
| News | modules/website-news.md | 新闻列表、分类、分页 | 2026-04-02 |
| FAQ | modules/website-faq-page.md | 手风琴式 Q&A、分页 | 2026-04-02 |

## 设计约束

- 设计规范详见 `design.md`，完整 Token 详见 `../design/USDD-component-guidelines.md`
- Figma 文件结构见 `../design/USDD-figma-structure.md`
- 品牌主色：`#216c58`（`--color-brand-default`），高亮 `#81deb0`，浅色 `#5fc693`
- 字体：Inter（全局唯一，Regular / Semi Bold）
- 主题：暗色（bg `#0c0c0e` / section `#141615` / card `#181a1c`）
- 状态色：success `#448f6a` / warning `#ff8f0b` / danger `#d73133` / info `#0d9488`

## 版本记录

详见 `iterations/README.md`

## 端级特有规则

- 官网为纯展示型站点，无需钱包连接即可访问所有数据
- 多链 Tab 切换是核心交互模式，切换后所有数据区域同步刷新
- 数据均来自链上 API，需考虑加载态和错误态
- Collateral List Actions 跳转到站内二级页，非外部链接
- 合约地址点击跳转到对应链的区块链浏览器（tronscan / etherscan / bscscan）
