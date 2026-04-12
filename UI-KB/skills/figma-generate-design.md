---
name: figma-generate-design
source: ~/.claude/skills/figma-generate-design/SKILL.md
---
# figma-generate-design

**在 Figma 中创建或更新完整的页面设计，优先复用设计系统组件和变量。**

## 使用场景

- 需要在 Figma 中从零搭建一个新页面
- 更新已有页面的某个区块
- 根据需求描述自动生成页面设计稿

## 触发方式

```
/figma-generate-design
目标文件: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON
需求描述: 创建一个钱包列表页，包含 Tab 筛选和 4 列卡片网格
```

## 工作流程

1. 读取源码或需求，理解页面结构
2. 发现设计系统中已有的组件、变量和样式
3. 创建页面容器 Frame
4. 逐 Section 构建内容（每次一个区块）
5. 每步截图验证，避免布局错位

## 注意

- 优先复用 TRON Design System 中的组件，不硬编码色值
- 颜色使用 Token（如 `Brand/Red`），间距使用 Spacing 变量
- 每个 Section 独立调用，不一次性构建整页
