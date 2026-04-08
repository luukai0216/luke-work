# AI Skills

> 项目级 Skill 定义。每个 Skill 一个子目录，包含 `SKILL.md` 定义文件。

## 可用 Skill 列表

| Skill | 用途 | 触发示例 |
|-------|------|---------|
| `prd-generate` | 生成新功能 PRD | "帮我生成 XX 功能的 PRD" |
| `prd-reverse` | 从现有产品逆向生成基线 PRD | "帮我逆向还原 XX 模块的 PRD" |
| `prd-review-all` | 多角色并行预评审 | "请对这个 PRD 做全角色评审" |
| `prd-review-dev` | 开发视角评审 | "请从开发角度评审" |
| `prd-review-qa` | QA 视角评审 | "请从 QA 角度评审" |
| `prd-review-ux` | UX 视角评审 | "请从 UX 角度评审" |
| `prototype-generate` | 生成 HTML 原型 | "帮我生成原型" |
| `review-prep` | 评审准备 | "帮我准备评审" |
| `competitive-analysis` | 竞品分析 | "帮我分析 XX 的 XX 功能" |
| `data-driven-iteration` | 数据驱动迭代 | "帮我复盘 vX.Y.Z 的效果" |
| `baseline-merge` | 版本上线后合并基线 | "帮我合并 vX.Y.Z 到基线" |
| `sync-drive` | 同步文档到 Google Drive | "帮我同步到 Drive" |

## 添加新 Skill

1. 创建目录 `skills/{skill-name}/`
2. 创建 `SKILL.md` 定义文件
3. 在此 README 中添加条目

## Skill 使用原则

- 安装 Skill 不等于生效，Prompt 中必须显式引用
- 公共 Skill 由团队统一维护，个人不修改公共 Skill
- 可建个人 Skill，但不能替代公共标准
