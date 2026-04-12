# 设计师知识库

> 本目录存放 Figma 中不便管理的设计知识：组件使用指南、设计决策记录、走查标准。
> 设计系统本体在 Figma 中维护，这里是**补充文档**，不重复 Figma 中已有的内容。

---

## 目录结构

```
design/
├── README.md                    # 本文件
├── component-guidelines.md      # 组件使用指南（何时用/不用/变体选择）
├── design-decisions.md          # 设计决策记录（为什么这样设计）
├── review-checklist.md          # 设计走查清单（开发还原度验收）
├── asset-inventory.md           # 设计资产清单（图标库、插图、动效）
└── figma-structure.md           # Figma 文件结构说明（文件组织/命名规范）
```

## 与 PM 知识库的关系

```
PM 知识库                          设计师知识库
─────────                         ──────────
{product}/design.md      ←引用→   design/component-guidelines.md
  （设计规范数值）                    （组件使用场景和决策）

{product}/figma-design-index.md   design/figma-structure.md
  （页面 → Figma 链接）              （Figma 文件怎么组织的）

iterations/review-notes.md        design/design-decisions.md
  （评审反馈）                       （为什么这么设计）

开发提测后                         design/review-checklist.md
                                   （走查验收标准）
```

## 维护职责

| 文件 | 主要维护者 | 频率 |
|------|-----------|------|
| component-guidelines.md | 设计师 | 新增/修改组件时 |
| design-decisions.md | 设计师 + PM | 设计评审后 |
| review-checklist.md | 设计师 | 发现新的走查问题时 |
| asset-inventory.md | 设计师 | 资产更新时 |
| figma-structure.md | 设计师 | Figma 文件结构调整时 |
