# UI-KB — UI 设计知识库

## 知识库定位

本知识库专为 UI 设计工作服务，涵盖设计规范、Figma 索引、AI Skill、工作流模板等，供设计师与 AI 协同使用。

## 项目列表

| 项目 | 路径 | 子端 |
| --- | --- | --- |
| TRON Web | `projects/TRON-Web/` | 单端（官网） |
| TronWallet Adapter | `projects/TronWallet-Adapter/` | 单端（官网） |
| TronLink | `projects/TronLink/` | app · chrome |
| JustLend | `projects/JustLend/` | portal · app（V1/V2）· admin |
| WINkLink | `projects/WINkLink/` | web |
| USDD | `projects/USDD/` | web · app |

## 目录结构

```
UI-KB/
├── shared/                         # 跨项目共享资源
├── skills/                         # AI Skill 索引
├── templates/                      # 模板 + AI Prompts
│   ├── project/                    # 新项目脚手架
│   │   └── _platform/              # 端模板（复制并改名使用）
│   ├── prompts/                    # AI 提示词
│   ├── iteration-overview.md       # 版本概要模板
│   ├── meeting-note.md             # 会议纪要模板
│   └── new-project-checklist.md   # 新项目接入清单
├── docs/                           # 文档索引
├── meeting-notes/                  # 会议纪要
└── projects/
    ├── TRON-Web/                   # 单端项目
    │   └── web/                    # 官网规范
    ├── TronWallet-Adapter/         # 单端项目
    │   └── web/                    # 官网规范
    ├── TronLink/                   # 多端项目
    │   ├── app/                    # App 端规范
    │   └── chrome/                 # Chrome 插件端规范
    ├── JustLend/                   # 多端项目（含子模块）
    │   ├── portal/                 # 官网规范
    │   ├── app/                    # App 规范
    │   │   ├── V1/                 # V1 模块规范
    │   │   └── V2/                 # V2 模块规范
    │   └── admin/                  # 后台规范
    ├── WINkLink/                   # 多端结构（当前仅官网）
    │   └── web/                    # 官网规范
    └── USDD/                       # 多端项目（Web + App 共享规范）
        ├── design-spec.md          # 共享设计规范（唯一来源）
        ├── web/                    # 官网规范
        └── app/                    # DeFi 操作界面规范
```

## AI 使用规则

- 处理具体项目前，先读 `projects/{项目}/CLAUDE.md`
- 设计走查 AI Prompt 见 `templates/prompts/design-review.md`

## 新增项目流程

1. 复制 `templates/project/` → `projects/{新项目名}/`
2. 逐项填写各模板文件
3. 更新本文件项目列表
4. 更新 `docs/index.md`
