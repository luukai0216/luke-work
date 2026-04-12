# JustLend — 项目总览

## 品牌概览

JustLend 是 TRON 生态的去中心化借贷协议，产品线包含 Portal、App（V1 / V2 模块）和管理后台。

## 子端列表

| 子端 | 路径 | 说明 |
| --- | --- | --- |
| Portal | `portal/` | 官方入口门户页面 |
| App | `app/` | DeFi 借贷操作界面，内含 V1 / V2 模块 |
| 管理后台 | `admin/` | 内部运营管理界面 |

## 模块说明

App 内分 **V1** 和 **V2** 两个模块，各有独立设计规范：
- V1 差异：`app/V1/design-spec.md`
- V2 差异：`app/V2/design-spec.md`

## 品牌一致性要求

- Portal / App 对外用户端保持品牌视觉一致
- 管理后台（admin）可使用更简洁的内部工具风格

## AI 使用规则

- 明确指定端（portal / app / admin）和模块（V1 / V2）后再执行
- 再读对应子目录下的 `CLAUDE.md`
