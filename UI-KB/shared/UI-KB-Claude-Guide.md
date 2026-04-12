# AI 设计工作流指南

> TRON-ECO-UI 设计组 · 使用 Claude Code + UI-KB 知识库，让 AI 生成设计稿时自动参考项目规范、Figma 文件索引和历史迭代记录。

---

## 01 · 系统结构：三层工具链

```
💬 你的指令
   "帮我按 JustLend Admin 规范生成弹窗"
         ↓
⚡ Skill 自动加载                    +    📁 UI-KB 主动读取
~/.claude/skills/justlend-admin/         UI-KB/projects/JustLend/admin/
颜色、字体、组件速查（精简版）              完整规范 · Figma 索引 · 迭代记录
         ↓
🎨 Figma 输出
   像素级还原设计规范的设计稿
```

| 层级 | 说明 |
| --- | --- |
| **⚡ Skill（速查层）** | 关键字触发后自动注入上下文，包含颜色 Token、字体规范、组件速查表。**自动加载 · 精简** |
| **📁 UI-KB（规范层）** | 完整设计规范 + Figma 文件索引 + 历史迭代。Claude 在执行任务前主动读取。**权威来源 · 详细** |
| **🔗 Figma MCP** | Claude 直接读取 Figma 文件内容、截图，并通过 Plugin API 写入设计稿。**实时 · 双向** |

---

## 02 · 前提条件：初次配置步骤

2 个步骤，第 1 步手动安装插件，**第 2 步（全局配置）可以让 Claude 帮你自动生成**。

### Step 1 · 安装 Figma MCP 插件（手动）

让 Claude 能读取并写入 Figma 文件。在 Figma 社区搜索 **Claude for Figma** 并安装，或在 Claude Code 设置 → MCP Servers 中添加 Figma 服务。

### Step 2 · 生成全局配置 CLAUDE.md（可自动生成）

这一步 Claude 可以帮你自动完成。只需要告诉它你本地的 Google Drive 路径，它会扫描 UI-KB 目录结构，自动生成 `~/.claude/CLAUDE.md`。

**复制这条 Prompt 发给 Claude：**

```
帮我生成 ~/.claude/CLAUDE.md 全局配置文件。
我的 UI-KB 根路径是：【填入你的路径，见下方说明】
请扫描该目录下的 projects/ 文件夹，识别所有项目和子端，自动生成 Skill → KB 路径映射表。
```

**如何找到你的路径：**

打开 Finder → 前往 Google Drive → 共享云端硬盘 → TRON-ECO-UI 组内 → UI-KB，按住 `Option` 并右键点击 → 拷贝路径，粘贴到上方 Prompt 中替换【填入你的路径】。

> 全局配置生成后，以后不需要重复配置。Skills 有更新时，从同事处重新复制 `~/.claude/skills/` 覆盖即可，CLAUDE.md 不需要改动。

---

## 03 · 配置文件说明

### `~/.claude/CLAUDE.md` · 全局配置（可自动生成）

每次对话自动加载，告诉 Claude UI-KB 的位置和读取规则。**这个文件由 Claude 扫描你的 UI-KB 目录后自动生成**，你只需要提供本地路径。

```
# 声明 KB 根路径（你的本地 Google Drive 挂载路径）
KB_ROOT = /Users/你的用户名/Library/CloudStorage/.../UI-KB/

# Skill → KB 映射表（Claude 自动扫描 projects/ 生成）
justlend-admin  → projects/JustLend/admin/
justlend-portal → projects/JustLend/portal/
tronlink-chrome → projects/TronLink/chrome/
winklink-web    → projects/WINkLink/web/
... （根据你的 UI-KB 实际目录自动补全）
```

> ⚡ 如果 UI-KB 新增了项目，重新把上方 Prompt 发给 Claude 即可重新生成，覆盖旧的配置文件。

### `~/.claude/skills/{项目}/SKILL.md` · 设计规范速查

关键字触发后注入上下文，包含颜色 Token、组件规格，末尾标注对应 KB 路径。

```yaml
---
name: justlend-admin
description: JustLend Admin 设计规范 — 品牌紫 #6840FF
---

# 颜色、字体、组件速查...

## 📁 完整 KB 路径
路径: UI-KB/projects/JustLend/admin/
```

### `UI-KB/projects/{项目}/{端}/` · 完整规范

权威设计规范来源，比 Skill 更详细，Figma 文件索引也在这里。

| 文件 | 内容 |
| --- | --- |
| `CLAUDE.md` | AI 使用规则、设计风格概览 |
| `design-spec.md` | 完整 Token + 组件规范（权威来源） |
| `figma-index.md` | Figma 文件 Key、页面 Node ID、直达链接 |
| `figma-structure.md` | Figma 图层命名与组织规范 |
| `iterations/` | 版本迭代记录 |

---

## 04 · 日常使用：如何触发 AI 调用规范

在 Claude Code 中，**直接用自然语言描述任务**，带上项目名即可。Claude 会自动加载对应 Skill 并读取 KB。

### 🎨 生成 / 更新 Figma 设计稿

```
帮我按照 JustLend Admin 的设计规范，在 Figma 里生成一个「提现确认弹窗」组件，包含标题、金额输入框、确认/取消双按钮。
```

```
按照 WINkLink 的设计规范，更新首页 Hero 区域的 Figma 设计稿，把 CTA 按钮改成最新的胶囊形样式。
```

### ✅ UI 验收测试

```
帮我验收这个页面 http://localhost:3000/admin/withdraw，对比 JustLend Admin 的 Figma 设计稿，检查颜色、间距、字体是否符合规范，输出 HTML 报告。
```

### 💻 前端实现

```
按照 TronLink Chrome 插件的设计规范，实现这个 Figma 设计稿的资产列表组件：https://www.figma.com/design/xxx?node-id=1-23
```

### ❓ 查询规范

```
JustLend Portal 的主品牌色是什么？按钮圆角多少？
```

```
TronLink Chrome 插件的余额展示用什么字体和字号？
```

---

## 05 · 当前已有规范的项目

| 项目 | 品牌色 | 风格 |
| --- | --- | --- |
| JustLend Admin | `#6840FF` 品牌紫 | 后台管理 |
| JustLend Portal | `#01C1AE` 品牌 Teal | 深色科技风 |
| JustLend App | `#3554F5` 品牌蓝 | V1 移动端 |
| WINkLink Web | `#F5C100` 品牌黄 | 深海军蓝底 |
| TronLink Chrome | `#0D1FFF` 品牌蓝 | 白底浅色系 |
| TronLink App | `#1A79FF` 品牌蓝 | 移动端钱包 |
| TRON Web | `#FF3B3B` 品牌红 | 纯黑暗色主题 |
| TronWallet Adapter | `#8B5CF6` | 简约 · 3D C4D 风格 |

---

## 06 · 维护规范：如何更新设计规范

**A · 更新 UI-KB（完整规范）**

编辑 Google Drive 中对应项目的 `design-spec.md`，这是权威来源。
路径示例：`UI-KB/projects/JustLend/admin/design-spec.md`

**B · 同步更新 Skill（速查表）**

同步修改 `~/.claude/skills/{项目}/SKILL.md` 中的关键 Token，保持与 KB 一致。
直接告诉 Claude：*"帮我把 JustLend Admin 的主色改为 xxx，同步到 KB 和 Skill"*

**C · 新增项目**

直接告诉 Claude：*"帮我把这份设计规范 [文件路径] 同步到 UI-KB 对应项目里"*
Claude 会自动整理到 UI-KB 并创建 Skill。

> ⚡ **优先级规则：** UI-KB `design-spec.md` > Skill。如果两者有冲突，KB 为准（KB 更新更及时）。

> ⚠️ `~/.claude/CLAUDE.md` 里的 KB 根路径是你本地的 Google Drive 挂载路径，每台电脑不同，**不能直接复制同事的文件**，需要用上方 Prompt 重新生成一份。

---

## 07 · FAQ

**Q：Claude 没有读取 KB，只用了 Skill 里的信息怎么办？**

在 Prompt 里明确说："先读取 JustLend Admin 的 KB design-spec.md"，或者说 "以 UI-KB 里的规范为准"。Claude 会主动去读对应目录。

**Q：Figma MCP 工具报错 "nothing selected" 怎么办？**

需要在 Figma 中打开目标文件并选中一个图层，或者改用 `get_metadata` 工具代替 `get_design_context`。

**Q：Google Drive 路径在 Windows 上不一样？**

Windows 上 Google Drive 挂载路径通常是 `G:\共享云端硬盘\...`，需要更新 `~/.claude/CLAUDE.md` 中的 KB_ROOT 路径。

**Q：我新做了一个项目的规范，怎么让 Claude 认识它？**

① 把规范文件放到 `UI-KB/projects/{新项目}/`
② 在 `~/.claude/CLAUDE.md` 的映射表里加一行
③ 创建对应的 `~/.claude/skills/{新项目}/SKILL.md`

或者直接告诉 Claude 让它帮你完成这三步。

---

*TRON-ECO-UI 设计组 · AI 设计工作流指南 v1.0 · 2026-04-03*
