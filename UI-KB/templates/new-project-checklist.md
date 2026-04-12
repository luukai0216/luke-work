# 新项目接入清单

> 新项目启动时按序执行，确保 KB 与 Figma 同步就位

---

## 一、KB 文件建立

- [ ] 复制 `templates/project/` → `projects/{新项目名}/`
- [ ] 填写项目根目录 `CLAUDE.md`（产品简介、设计风格、主色调）
- [ ] 为每个子端建立对应目录并填写 `CLAUDE.md`
- [ ] 填写 `design-spec.md`（可用 `templates/prompts/spec-gen.md` 生成）
- [ ] 填写 `figma-index.md`（Figma 文件链接 + 页面 Node ID）
- [ ] 填写 `figma-structure.md`（Frame 尺寸、命名规范）
- [ ] 更新 `CLAUDE.md`（根目录）项目列表
- [ ] 更新 `docs/index.md` 项目索引

## 二、Figma 文件准备

- [ ] 新建或确认 Figma 项目文件
- [ ] 建立 Design System 页面（组件库 & Token）
- [ ] 按 `figma-structure.md` 规范整理页面结构与命名
- [ ] 发布组件库供团队使用

## 三、AI Skill 配置

- [ ] 使用 `/figma-create-design-system-rules` 生成项目 Skill
- [ ] 将 Skill 文件保存到 `~/.claude/skills/{项目名}/SKILL.md`
- [ ] 在 `skills/README.md` 补充对应 Skill 条目
- [ ] 重启 Claude Code 验证 Skill 可正常调用

## 四、验收

- [ ] 用 `/ui-acceptance` 跑一次验收，确认规范与实现对齐
- [ ] 通知团队新项目 KB 已就绪
