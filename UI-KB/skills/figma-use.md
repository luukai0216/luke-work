---
name: figma-use
source: ~/.claude/skills/figma-use/SKILL.md
---
# figma-use

**直接操作 Figma 画布的底层工具规范（Figma Plugin API）。**

## 使用场景

- 需要直接在 Figma 中创建、修改或删除节点
- 其他 Figma skill 的底层支撑（`figma-generate-design` 内部使用）
- 批量修改 Figma 文件中的属性

## 触发方式

通常由其他 Figma skill 自动调用，不需要手动触发。
如需直接使用：

```
/figma-use
操作: 在首页 Hero 区域添加一个红色标题文字节点
```

## 核心规则（必须遵守）

| 规则 | 说明 |
| --- | --- |
| 颜色范围 | 使用 0–1，不是 0–255（红色：`{r:1, g:0, b:0}`） |
| 字体加载 | 操作文字前必须先 `await figma.loadFontAsync()` |
| 切换页面 | 用 `await figma.setCurrentPageAsync(page)`（异步） |
| Auto-Layout | 先 `appendChild` 后再设置 `layoutSizingHorizontal` |
| 返回节点 ID | 每次操作都必须 return 受影响的节点 ID |
| 不可并行 | `use_figma` 调用必须严格顺序执行，不可并发 |

## 注意

- 操作失败时不会产生部分结果（原子性），可安全重试
- 每步完成后用 `get_metadata` 或 `get_screenshot` 验证结果
