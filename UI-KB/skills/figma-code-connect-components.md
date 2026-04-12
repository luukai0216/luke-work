---
name: figma-code-connect-components
source: ~/.claude/skills/figma-code-connect-components/SKILL.md
---
# figma-code-connect-components

**将 Figma 设计组件与代码实现建立 Code Connect 映射关系。**

## 使用场景

- Figma 组件已发布到团队库，需要与代码组件关联
- 开发者在 Figma Dev Mode 查看设计时，希望直接看到对应的代码实现

## 触发方式

```
/figma-code-connect-components
Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=xxx-xxx
```

## 工作流程

1. 调用 `get_code_connect_suggestions` 识别未映射的组件
2. 在代码库中搜索匹配的组件实现
3. 展示匹配结果，等待人工确认
4. 调用 `send_code_connect_mappings` 建立映射

## 前提条件

- Figma 组件必须已发布到团队库
- 需要 **Organization 或 Enterprise 套餐**
- Node ID 格式：URL 中 `1-2` → 工具中 `1:2`
