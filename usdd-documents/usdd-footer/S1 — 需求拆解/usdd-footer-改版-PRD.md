# 新增MCP入口 & Footer改版

## 1. Summary

在 `http://USDD.io` 官网及 App app.usdd.io 页面新增 MCP Server 文档入口，用户点击后跳转至对应的 GitBook 文档页面。

本次同步对页脚进行全面改版：

- 将顶部导航栏的 `Developer`、`Transparency`、`Community` 各下拉菜单内容，以及 GitBook 中的法律文档链接（`Terms of Use`、`Privacy Policy`）整合至页脚
- 形成结构完整的导航型 Footer
- 对所有页脚链接新增点击埋点

---

## 2. 变更日志


| 时间   | 变更人     | 主要内容 |
| ---- | ------- | ---- |
| 3.23 | Blackey | 新建需求 |


---

## 3. 背景

Model Context Protocol（MCP）是由 Anthropic 推出的开放协议，旨在让 AI 应用能够安全、标准化地与外部数据源和工具交互。随着 AI Agent 应用的快速普及，越来越多的开发者需要通过 MCP Server 的方式接入 DeFi 协议、稳定币数据等链上能力。

USDD 作为去中心化稳定币协议，若能为开发者提供标准化的 MCP Server 接入文档，将大幅降低开发者集成门槛，扩大协议的开发者生态。

### 为什么是现在？

- MCP 协议在 2025 年获得主流 AI 工具（Cursor、Claude、Windsurf 等）的广泛采纳，开发者社区需求旺盛
- 竞品协议已开始提供 MCP 接入文档，USDD 需要及时跟进以保持生态竞争力
- 现有页脚结构极简，不承载任何导航功能，趁此次改动机会一并提升整体信息架构

---

## 4. 需求详情

**参考竞品：**

1. [Tether](https://tether.to/en/)
2. [Coinbase](https://www.coinbase.com/)

### 4.1 官网首页改版方案

在保留现有所有页脚元素的基础上，新增四列导航区：`Developer`、`Transparency`、`Community`、`Legal`，将顶部导航各下拉菜单内容同步至页脚，同时在 `Developer` 列新增 `MCP Server Docs` 入口。

#### 改版后页脚结构示意

```text
[Logo] USDD · Decentralized USD
USDD is a fully Decentralized stablecoin pegged to the US Dollar
through crypto reserves.
support@usdd.io

Developer        Transparency      Community      Legal           Legacy
Developer Doc    Data              News           Terms of Use    USDD Legacy
Audit Report     Smart Allocator   FAQs           Privacy Policy
MCP Server Docs  USDD Treasury

[X]  [Telegram▼]  [Discord]    Copyright © 2026 USDD. All rights reserved
```

#### Footer 入口链接


| 栏目           | 链接名称                                       | URL                                                                                      | 备注      |
| ------------ | ------------------------------------------ | ---------------------------------------------------------------------------------------- | ------- |
| Developer    | Developer Doc                              | [https://docs.usdd.io/](https://docs.usdd.io/)                                           |         |
| Developer    | Audit Report                               | [https://docs.usdd.io/security/audits](https://docs.usdd.io/security/audits)             |         |
| Developer    | USDD Legacy                                | [https://legacy.usdd.io/](https://legacy.usdd.io/)                                       |         |
| Developer    | **MCP Server Docs**                        | **GitBook URL（待更新 URL）**                                                                 | **新增**  |
| Transparency | Data                                       | [https://usdd.io/data](https://usdd.io/data)                                             |         |
| Transparency | Smart Allocator                            | [https://usdd.io/sa](https://usdd.io/sa)                                                 |         |
| Transparency | USDD Treasury                              | [https://usdd.io/treasury](https://usdd.io/treasury)                                     |         |
| Community    | News                                       | [https://usdd.io/news](https://usdd.io/news)                                             |         |
| Community    | FAQs                                       | [https://usdd.io/faq](https://usdd.io/faq)                                               |         |
| Legal        | Terms of Use                               | [https://docs.usdd.io/lrgals/terms-of-use](https://docs.usdd.io/lrgals/terms-of-use)     | GitBook |
| Legal        | Privacy Policy                             | [https://docs.usdd.io/lrgals/privacy-policy](https://docs.usdd.io/lrgals/privacy-policy) | GitBook |
| Legacy       | USDD Legacy                                | [https://legacy.usdd.io/](https://legacy.usdd.io/)                                       |         |
| Legacy       | USDDOLD PSM                                | [https://legacy.usdd.io/#/psm](https://legacy.usdd.io/#/psm)                             |         |
| 社交           | X (Twitter)                                | [https://x.com/usddio](https://x.com/usddio)                                             | 保留      |
| 社交           | Telegram                                   | 保持下拉                                                                                     | 保留      |
| 社交           | Discord                                    | [https://discord.com/invite/NurKn6KEqx](https://discord.com/invite/NurKn6KEqx)           | 保留      |
| 联系           | [support@usdd.io](mailto:support@usdd.io)  | mailto:[support@usdd.io](mailto:support@usdd.io)                                         | 保留      |
| 版权           | Copyright © 2026 USDD. All rights reserved | 无                                                                                        | 保留      |


### 4.2 APP 页面改版方案

- 直接在页脚左侧增加 `Terms`、`Privacy`、`Docs`、`MCP Server`、`FAQs` 入口，点击对应链接见上表
- `support@usdd.io` 入口文案改为 `Support`
- 点击后与现在交互方式相同，打开邮箱
- 支持右键复制邮箱地址

---

## 5. 埋点方案

对页脚所有可点击入口新增点击事件埋点，覆盖导航链接、社交图标及联系邮箱。

**埋点优先级：** `P0`（与页脚改版同步上线）


| 事件名称                           | 触发逻辑                                        | 备注   |
| ------------------------------ | ------------------------------------------- | ---- |
| `footer_developer_doc_click`   | 点击页脚 `Developer` 栏的 `Developer Doc` 链接      |      |
| `footer_audit_report_click`    | 点击页脚 `Developer` 栏的 `Audit Report` 链接       |      |
| `footer_usdd_legacy_click`     | 点击页脚 `Developer` 栏的 `USDD Legacy` 链接        |      |
| `footer_mcp_server_docs_click` | 点击页脚 `Developer` 栏的 `MCP Server Docs` 链接    | 新增入口 |
| `footer_data_click`            | 点击页脚 `Transparency` 栏的 `Data` 链接            |      |
| `footer_smart_allocator_click` | 点击页脚 `Transparency` 栏的 `Smart Allocator` 链接 |      |
| `footer_usdd_treasury_click`   | 点击页脚 `Transparency` 栏的 `USDD Treasury` 链接   |      |
| `footer_news_click`            | 点击页脚 `Community` 栏的 `News` 链接               |      |
| `footer_faqs_click`            | 点击页脚 `Community` 栏的 `FAQs` 链接               |      |
| `footer_terms_click`           | 点击页脚 `Legal` 栏的 `Terms of Use` 链接           |      |
| `footer_privacy_click`         | 点击页脚 `Legal` 栏的 `Privacy Policy` 链接         |      |
| `footer_x_click`               | 点击页脚 `X (Twitter)` 社交图标                     |      |
| `footer_telegram_click`        | 点击页脚 `Telegram` 社交图标（触发下拉）                  |      |
| `footer_discord_click`         | 点击页脚 `Discord` 社交图标                         |      |
| `footer_email_click`           | 点击页脚 `support@usdd.io` 邮箱链接                 |      |


