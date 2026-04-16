# USDD — 项目总览

## 品牌概览

USDD 是 TRON 生态的去中心化超额抵押稳定币协议，产品线涵盖官网（Web）和 DeFi 操作界面（App）。

## 子端列表

| 子端 | 路径 | 说明 |
| --- | --- | --- |
| Web（官网） | `web/` | 品牌展示 + 数据看板，1440px 基准 |
| App（DeFi 操作） | `app/` | PSM / Vault / Earn 等链上操作界面，1440px 基准 |

## 设计规范说明

**Web 与 App 使用同一套设计系统**，Token、字体、间距、圆角、阴影完全一致，各端各维护一份 `design-spec.md`（内容相同）。  
各端差异体现在 Header / Footer 规格和页面布局，详见各端的 `component-catalog.md`。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `web/design-spec.md` | Web 端设计 Token + 基础组件规范 |
| `app/design-spec.md` | App 端设计 Token + 基础组件规范 |
| `web/` | Web 端 Figma 索引 & 组件 Catalog |
| `app/` | App 端 Figma 索引 & 组件 Catalog |

## AI 使用规则

1. 先读 `design-spec.md` 获取颜色 / 字体 / 间距 Token
2. 再读对应端的 `CLAUDE.md` 和 `component-catalog.md`
3. Web 与 App 共用 Token，但 Header / Footer 规格不同，注意区分
