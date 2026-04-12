---
name: figma-generate-library
source: ~/.claude/skills/figma-generate-library/SKILL.md
---
# figma-generate-library

**从代码库自动生成完整的 Figma 设计系统组件库。**

## 使用场景

- 代码组件已经完善，需要同步生成对应的 Figma 组件库
- 设计系统从零搭建，需要批量创建组件、Token、样式

## 触发方式

```
/figma-generate-library
目标文件: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON
```

## 工作阶段（需逐阶段确认）

| 阶段 | 内容 |
| --- | --- |
| Phase 0 | 发现：分析代码库，锁定范围 |
| Phase 1 | 基础：创建 Token 变量集、文字样式、效果样式 |
| Phase 2 | 结构：建立页面骨架和基础文档 |
| Phase 3 | 组件：逐个创建带 Variants 的组件 |
| Phase 4 | 集成：Code Connect 映射 + 无障碍审查 |

## 注意

- 这是一个**重型任务**，需要 20–100+ 次 API 调用
- 每个阶段完成后需人工确认才进入下一阶段
- 不可并行执行 `use_figma` 调用，必须严格顺序执行
