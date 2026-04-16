# Skills 快速浏览

> UI-KB 全项目可用的 AI Skill 索引

---

## 设计稿 → 代码

### `/figma-implement-design`
给一个 Figma 链接，生成对应的前端代码，像素级还原。
**用法**：提供 Figma node URL → 自动读取设计数据 → 输出代码
→ 详见 [figma-implement-design.md](./figma-implement-design.md)

---

## 在 Figma 里设计

### `/figma-generate-design`
根据需求描述，在 Figma 中自动创建或更新完整页面设计，复用设计系统组件。
**用法**：描述页面需求 → AI 逐 Section 构建 → 截图验证
→ 详见 [figma-generate-design.md](./figma-generate-design.md)

### `/figma-create-new-file`
在 Figma 草稿里新建文件，支持 design（设计稿）和 figjam（白板）。
**用法**：说明文件类型和名称 → 返回文件链接
→ 详见 [figma-create-new-file.md](./figma-create-new-file.md)

### `/figma-use`
直接操作 Figma 画布的底层 API，其他 Figma skill 的底层支撑。通常无需手动触发。
**用法**：描述画布操作 → AI 执行并返回节点 ID
→ 详见 [figma-use.md](./figma-use.md)

### `/figma-componentize`
扫描 Figma 页面图层，识别重复可复用的元素，批量转为 Component 并按 TRON 命名规范整理到 Design System 页面。
**用法**：提供 Figma 页面链接 → AI 识别候选组件 → 确认后批量创建，原位置自动替换为 Instance
→ 详见 [figma-componentize.md](./figma-componentize.md)

---

## 设计系统

### `/figma-generate-library`
从代码库批量生成 Figma 设计系统组件库（Token、组件、变体等）。重型任务，分阶段执行。
**用法**：提供目标 Figma 文件 → 分 4 个阶段逐步构建，每阶段需人工确认
→ 详见 [figma-generate-library.md](./figma-generate-library.md)

### `/figma-create-design-system-rules`
分析项目代码库，生成供 AI 使用的设计系统规范文件（写入 CLAUDE.md 等）。
**用法**：直接触发 → AI 分析代码约定 → 输出规范文件
→ 详见 [figma-create-design-system-rules.md](./figma-create-design-system-rules.md)

### `/figma-code-connect-components`
将 Figma 组件与代码实现关联，让开发者在 Dev Mode 中直接看到代码。需 Org/Enterprise 套餐。
**用法**：提供 Figma 文件链接 → AI 识别未映射组件 → 确认后建立映射
→ 详见 [figma-code-connect-components.md](./figma-code-connect-components.md)

---

## 验收测试

### `/ui-acceptance`
对比 Figma 设计稿与实现页面，结合 TRON 设计规范，输出四维度 HTML 验收报告。
**用法**：提供 Figma URL + 实现截图（可选）→ 生成报告到桌面
→ 详见 [ui-acceptance.md](./ui-acceptance.md)

### `/usdd-ui-acceptance`
对比 Figma 设计稿与实现页面，结合 USDD 设计规范（品牌绿 `#216C58`、深色主题），覆盖 Web / App 两端，输出四维度 HTML 验收报告。
**用法**：指定端（web/app）+ 提供 Figma URL + 实现截图（可选）→ 生成报告到桌面
→ 详见 [usdd-ui-acceptance.md](./usdd-ui-acceptance.md)

---

## 选用速查

| 我想做… | 用哪个 skill |
| --- | --- |
| 把设计稿变成代码 | `/figma-implement-design` |
| 在 Figma 里画页面 | `/figma-generate-design` |
| 新建一个 Figma 文件 | `/figma-create-new-file` |
| 从代码生成组件库 | `/figma-generate-library` |
| 生成 AI 设计规范文件 | `/figma-create-design-system-rules` |
| 关联 Figma 组件和代码 | `/figma-code-connect-components` |
| 验收设计还原度（TRON） | `/ui-acceptance` |
| 验收设计还原度（USDD） | `/usdd-ui-acceptance` |
| 直接操作 Figma 画布 | `/figma-use` |
| 批量整理图层为组件 | `/figma-componentize` |

