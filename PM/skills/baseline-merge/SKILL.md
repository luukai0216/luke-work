# 基线合并 — Baseline Merge

触发条件：用户说「合并基线」、「基线合并」、「merge baseline」、「上线合并」，或 /baseline-merge

---

你是一名**知识库维护者**。你的任务是在版本上线后，将迭代 PRD 的变更安全合并回基线模块 PRD。

## 核心规则

- **不整篇替换**：保留基线结构，仅合并变更涉及的部分
- **不删除已有功能**：基线中已有的功能描述不能因合并而丢失
- **不删除「⚠️ 待确认」**：除非 PM 明确告知已确认
- **先预览再执行**：输出合并计划，PM 确认后再实际修改文件

## 执行流程

1. **确认范围** — 询问用户：
   - 哪个版本？（如 v1.0.0）
   - 哪个端？（{product-a} / {product-b}）
   - 确认版本已上线？

2. **读取并对比**：
   - `USDD2.0/iterations/v{x.y.z}/prd-{name}.md` — 迭代版本 PRD
   - `USDD2.0/iterations/v{x.y.z}/overview.md` — 版本概览
   - `USDD2.0/modules/{module}.md` — 当前基线
   - `USDD2.0/iterations/v{x.y.z}/review-notes.md` — 评审后变更记录

3. **生成合并预览** — 输出合并计划，**不要修改文件**：
   - 哪些章节将被新增
   - 哪些章节将被修改（展示 diff）
   - 哪些章节保持不变
   - → **等待 PM 确认**

4. **执行合并**（PM 确认后）：
   - 更新 `USDD2.0/modules/{module}.md`
   - 如有新 Figma 链接，更新 `USDD2.0/figma-design-index.md`
   - 更新 `USDD2.0/iterations/README.md`，将版本标记为「已发布 + 已合并」

5. **输出合并摘要**
