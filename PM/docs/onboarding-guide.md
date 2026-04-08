# 新人引导

> 新 PM 加入项目后的上手指南。按顺序完成以下步骤，预计 2-3 小时可具备独立工作的上下文。

## 第一步：了解产品（30 分钟）

1. 阅读 `shared/product-overview.md` — 了解产品定位、业务背景和功能矩阵
2. 阅读 `shared/glossary.md` — 熟悉领域术语
3. 阅读 `shared/user-personas.md` — 了解目标用户
4. 阅读 `shared/tech-constraints.md` — 了解技术约束

## 第二步：了解知识库结构（15 分钟）

1. 阅读根目录 `CLAUDE.md` — 了解工作流和执行规则
2. 阅读 `docs/index.md` — 了解全部文档的索引
3. 浏览 `templates/` — 了解可用模板

## 第三步：了解你负责的端（30 分钟）

1. 进入对应端目录（如 `cd extension/`）
2. 阅读端级 `CLAUDE.md`
3. 阅读 `modules/README.md` — 了解模块全景
4. 阅读 `design.md` — 了解设计规范
5. 浏览 `iterations/` — 了解历史版本

## 第四步：体验 AI 工作流（1 小时）

1. 启动 Claude Code，进入项目目录
2. 让 AI 读取 Phase 0 的文件，确认上下文
3. 尝试用 `prd-review-all` Skill 对一个现有 PRD 做预评审
4. 尝试用 `competitive-analysis` Skill 做一次快速竞品对标

## 第五步：了解团队规范（15 分钟）

1. 阅读 `pm-ai-workflow-standard.md` — 团队工作流规范
2. 重点关注：文件命名规范、交付物标准、质量 Checklist

---

## 常见问题

**Q：文档太多，不知道从哪里开始读？**
A：先读 `docs/index.md`，它是全部文档的索引。

**Q：Claude Code 对话中 AI 似乎不了解产品？**
A：确认 CLAUDE.md 在项目根目录，且当前工作目录正确。每次新对话 AI 会自动加载 CLAUDE.md。

**Q：我需要修改基线 PRD 吗？**
A：不需要直接修改。在版本迭代目录（iterations/）中工作，版本上线后通过 baseline-merge Skill 合并。
