# 协作规则

## 写作规范

- 文档使用中文撰写，技术术语保留英文原文
- 标题层级最多三级
- 每个文档顶部注明「最后更新时间」和「负责人」
- 截图统一存放在 `projects/{项目}/prototype/screenshots/`，使用相对路径引用

## 设计协作流程

1. **需求阶段**：了解功能需求 → 拉取对应项目 Figma 文件
2. **设计阶段**：在 Figma 完成设计 → 更新 `projects/{项目}/figma-index.md`
3. **迭代记录**：按 `templates/iteration-overview.md` 格式记录到 `projects/{项目}/iterations/v{x}.{y}/`

## 维护规则

- `projects/{项目}/figma-index.md` 每次设计稿变更后同步更新版本号与 Node ID
- `projects/{项目}/iterations/` 按版本号建立子目录，格式：`v{major}.{minor}/`
- `meeting-notes/` 按 `YYYY-MM-DD-{项目}-{主题}.md` 命名

## AI 交互规则

- 每次对话前，AI 应先读 `CLAUDE.md` 和对应项目的 `projects/{项目}/CLAUDE.md`
- AI 生成内容需标注「AI 生成，需人工审核」
- 禁止 AI 直接覆盖 `projects/{项目}/design-spec.md` 基线文件，需人工确认
