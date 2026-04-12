---
name: figma-create-new-file
source: ~/.claude/skills/figma-create-new-file/SKILL.md
---
# figma-create-new-file

**在 Figma 草稿中创建新文件，支持 design 和 figjam 两种类型。**

## 使用场景

- 需要新建一个 Figma 设计文件
- 需要新建一个 FigJam 白板文件（用于流程图、思维导图等）

## 触发方式

```
/figma-create-new-file
类型: design
文件名: TRON Web — 新模块名
```

## 参数说明

| 参数 | 可选值 | 说明 |
| --- | --- | --- |
| editorType | `design`（默认）/ `figjam` | 文件类型 |
| fileName | 任意字符串 | 文件名，建议格式：`TRON Web — {模块名}` |

## 输出

返回新文件的 `file_key` 和 `file_url`，可直接用于后续操作。
创建后记得在 `../web/figma-design-index.md` 中登记。
