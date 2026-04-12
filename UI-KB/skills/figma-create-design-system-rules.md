---
name: figma-create-design-system-rules
source: ~/.claude/skills/figma-create-design-system-rules/SKILL.md
---
# figma-create-design-system-rules

**分析项目代码库，生成标准化的设计系统规范文件，让 AI 实现设计时保持一致性。**

## 使用场景

- 项目初期，需要让 AI 理解代码约定（组件位置、命名规则、样式方案）
- 更新项目规范后，需要同步更新 AI 的指引文件
- 新成员接入，需要快速生成项目规范文档

## 触发方式

```
/figma-create-design-system-rules
```

## 输出文件

生成的规范会写入以下文件之一（根据 AI 工具选择）：

| 工具 | 文件 |
| --- | --- |
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/figma-design-system.mdc` |
| Codex | `AGENTS.md` |

## 规范内容涵盖

- 组件目录结构和命名规范
- 设计 Token 使用规则（颜色、间距不可硬编码）
- 样式方案（CSS 框架、Token 引用方式）
- Figma MCP 调用流程
- 图片和 SVG 资产处理方式

## 注意

TRON Web 项目已有 `../web/design.md` 和 `CLAUDE.md`，运行前先确认是追加还是覆盖。
