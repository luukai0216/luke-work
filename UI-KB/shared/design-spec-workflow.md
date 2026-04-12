# 从 Figma 设计稿到规范同步

> UI-KB · 设计规范工作流 · 设计师操作步骤说明，AI 自动处理部分已简化概括。

---

## Step 1 · 准备 Figma 链接

提供两类 Figma 文件链接，AI 将从中读取设计数据。

| 字段 | 填写内容 |
|------|----------|
| 设计稿文件 | `figma.com/design/<fileKey>/<文件名>` |
| 规范 / 组件库 | `figma.com/design/<fileKey>/设计规范` |
| 页面范围 | 所有页面 / 指定页面名称（如「首页、列表页」） |

> **💡 提示：** 在 Figma 中选中 Frame → 右键 → Copy link，链接包含 `node-id` 参数时定位更精准。

---

## Step 2 · 确认 UI-KB 本地路径

每个人登录 Google Drive 的邮箱账号不同，导致本地挂载路径也不同。在发出指令前，需要先找到自己机器上的 UI-KB 目录绝对路径。

**路径结构模板（macOS）：**

```
/Users/{你的系统用户名}/Library/CloudStorage/
  GoogleDrive-{你的Google邮箱}/
  共享云端硬盘/TRON-ECO-UI 组内/UI-KB/

# 示例（lucas.wang）
/Users/wangyongxing/Library/CloudStorage/
  GoogleDrive-lucas.wang@tron.network/
  共享云端硬盘/TRON-ECO-UI 组内/UI-KB/
```

**找到路径的方法：**

**a. 找到你的系统用户名：** 打开终端，输入 `whoami`，返回值即为 `{你的系统用户名}`。

**b. 找到你的 Google Drive 账号名：** 打开终端，输入 `ls ~/Library/CloudStorage/`，会列出形如 `GoogleDrive-yourname@tron.network` 的目录名，这就是你的 Drive 挂载名。

**c. 验证路径是否存在：** 在终端输入以下命令，能列出文件说明路径正确：
```
ls ~/Library/CloudStorage/GoogleDrive-你的邮箱/共享云端硬盘/TRON-ECO-UI\ 组内/UI-KB/
```

**d. （最简方式）用 Finder 复制路径：** 打开 Finder → 前往 *共享云端硬盘 → TRON-ECO-UI 组内 → UI-KB*，右键点击 UI-KB 文件夹 → 按住 `⌥ Option` 键 → 选择「将 "UI-KB" 拷贝为路径名称」，即可得到完整绝对路径。

> **💡 提示：** 路径中含有空格（如「TRON-ECO-UI 组内」），在指令中粘贴时用引号包裹，或使用反斜杠转义：`TRON-ECO-UI\ 组内`。

---

## Step 3 · 发出生成指令

将 Figma 链接、项目信息和你的 UI-KB 路径一起告诉 Claude Code，触发规范生成与同步。

**发送给 Claude Code 的指令模板：**

```
帮我生成 [项目名] [端/平台] 的设计规范，并同步到 UI-KB 和 Skill。

设计稿：[设计稿 Figma 链接]
规范文件：[组件库 Figma 链接]
UI-KB 路径：[你在第 2 步确认的本地绝对路径]

# 示例
# 帮我生成 JustLend 管理后台 的设计规范，并同步到 UI-KB 和 Skill。
# 设计稿：figma.com/design/eXrKOo.../...
# UI-KB 路径：/Users/yourname/Library/CloudStorage/
#   GoogleDrive-yourname@tron.network/共享云端硬盘/TRON-ECO-UI 组内/UI-KB/
```

> **💡 提示：** 第一次使用后可告诉 Claude Code「记住这个路径」，后续对话中无需重复填写。

---

## ⚙ AI 自动处理（无需操作）

读取 Figma → 提取色彩 / 字体 / 布局 / 组件规范 → 生成 `design-spec.md` · `figma-index.md` · `CLAUDE.md` → 写入 UI-KB 对应目录 → 创建 **Skill** → 更新全局配置映射。

---

## Step 4 · 确认规范内容

AI 输出后，重点核对以下项目，有问题直接告知 AI 修正即可。

**设计师检查清单：**

- [ ] 品牌色 HEX 值是否正确
- [ ] 组件尺寸（高度、圆角、间距）是否与设计稿一致
- [ ] 字体族名称是否准确（中文 / 英文 / 等宽）
- [ ] 视觉风格描述是否符合设计意图
- [ ] Figma 文件 Key 和页面 Node ID 是否填写完整

---

## Step 5 · 验证 Skill 可用（可选）

在 Claude Code 输入框输入 Skill 名称，确认规范已正确加载。

```
/[skill-name]

# 例如：/justlend-admin
# 能看到完整规范内容即表示同步成功
```

**✓ Skill 加载正常 + UI-KB 文件已更新 → 本次同步完成。**

---

*UI-KB 工作流 · 2026-04-03 · Claude Code*
