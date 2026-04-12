---
name: figma-implement-design
source: ~/.claude/skills/figma-implement-design/SKILL.md
---
# figma-implement-design

**将 Figma 设计稿转换为生产级前端代码，像素级还原设计。**

## 使用场景

- 拿到 Figma 链接，需要生成对应的前端代码
- 实现某个组件或页面区块，要求与设计稿视觉一致

## 触发方式

```
/figma-implement-design
Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=xxx-xxx
```

## 工作流程

1. 从 URL 提取 fileKey 和 nodeId
2. 调用 `get_design_context()` 获取布局、排版、色彩数据
3. 调用 `get_screenshot()` 截取视觉参考图
4. 结合项目已有组件和设计系统转换为代码
5. 与截图对比验证还原度

## 注意

- 始终先读取设计数据，不猜测实现细节
- 输出代码需适配项目已有的组件和规范，参考 `../web/design.md`
