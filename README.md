# 产品项目模板

> 新项目初始化时复制此模板，填充占位符即可开始工作。
> 配套规范：`pm-ai-workflow-standard.md`

## 快速开始

### 手动初始化

```bash
# 1. 复制模板，重命名为你的产品名
cp -r project-template/ my-product/
cd my-product/

# 2. 重命名产品端目录
mv USDD2.0/ extension/      # 改为你的端名（extension / mobile / web 等）

# 3. 全局替换占位符（重要！模板中有 40+ 处 USDD2.0 引用）
# macOS:
grep -rl 'USDD2.0' . --include="*.md" | xargs sed -i '' 's/USDD2.0/extension/g'
# Linux:
grep -rl 'USDD2.0' . --include="*.md" | xargs sed -i 's/USDD2.0/extension/g'

# 4. 进入 Claude Code
claude
```

### 用 Claude Code 初始化（推荐）

```bash
cd my-product/
claude

# 然后告诉 AI：
> "请帮我初始化这个知识库：
>  - 产品名称：TronLink
>  - 产品端目录 USDD2.0/ 重命名为 extension/
>  - 将所有文件中的 USDD2.0 替换为 extension
>  - 填充 CLAUDE.md 和 shared/product-overview.md 的产品信息
>  - 填充 shared/glossary.md 的核心术语"
```

AI 会自动完成目录重命名、占位符替换和产品信息填充。

### 初始化后检查

- [ ] `USDD2.0/` 已重命名为实际端名
- [ ] 所有文件中的 `USDD2.0` 已替换（`grep -r 'USDD2.0' .` 应无结果）
- [ ] `CLAUDE.md` 产品信息已填充
- [ ] `shared/product-overview.md` 已填充
- [ ] `shared/glossary.md` 至少有 5 个核心术语
- [ ] `design/USDD-component-guidelines.md` 设计 token 已填充（可后续补）

## 占位符说明

模板中使用以下占位符，初始化时需要替换：

| 占位符 | 含义 | 替换示例 |
|--------|------|---------|
| `USDD2.0` | 产品端目录名 | `extension`、`mobile`、`web` |
| `{project-name}` | 项目名称 | `tronlink-knowledge-base` |
| `[中文描述]` | 需要填充的内容 | 根据实际情况填写 |
| `[日期]` | 日期占位 | `2026-03-27` |
| `⚠️ 待确认` | 需要与相关方确认 | 确认后替换为实际内容 |

## 多端产品

如果产品有多个端（如 Extension + Mobile），复制 `USDD2.0/` 目录创建多个端：

```bash
cp -r extension/ mobile/
# 修改 mobile/CLAUDE.md 和 mobile/README.md 中的端级信息
# 在根 CLAUDE.md 中添加 mobile 的导航入口
```

## 目录结构

```
{project-name}/
├── CLAUDE.md                      # 项目级 AI 指引
├── rules.md                       # 协作规则
├── shared/                        # 跨端共享资源
│   ├── product-overview.md        #   产品介绍（含业务背景）
│   ├── glossary.md                #   术语表
│   ├── api-reference.md           #   API 参考
│   ├── user-personas.md           #   用户画像
│   └── tech-constraints.md        #   技术约束
├── USDD2.0/                     # 产品端目录（可多个）
│   ├── CLAUDE.md                  #   端级 AI 指引
│   ├── design.md                  #   设计规范
│   ├── figma-design-index.md      #   Figma 索引
│   ├── modules/                   #   基线 PRD
│   ├── iterations/                #   版本迭代
│   └── prototype/screenshots/     #   截图
├── design/                        # UI/UX 知识库
├── research/                      # 竞品分析 + 数据洞察
├── docs/                          # 文档索引 + 新人引导 + 健康检查
├── skills/                        # AI Skill 定义（12 个）
├── templates/                     # 模板 + AI Prompt
└── meeting-notes/                 # 会议纪要
```
