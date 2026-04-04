# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 仓库用途

这是 USDD 产品组设计师的知识库与原型工作区，包含：
- HTML 原型文件（供开发参考和设计评审）
- 设计规范文档（补充 Figma 中不便管理的知识）
- 各功能模块的 PRD 文档

## 两个站点

| 站点 | 背景色 | 适用场景 |
|------|--------|----------|
| **usdd.io**（官网） | `#0C0C0E` | 营销/介绍页，无需钱包，阅读为主 |
| **app.usdd.io**（APP） | `#080B0E` | 功能/操作页，需连接钱包，按链分路由 |

## 生成 HTML 原型的核心规则

详见 `usdd-prototype-guide.md`，关键约束：

1. **以对应站点模板为起点**（营销页用官网模板，功能页用 APP 模板）
2. **颜色必须用 CSS 变量**，禁止硬编码色值
3. **禁止白色背景**，严格遵守深色主题
4. **圆角嵌套原则**：父 `radius-xl(24px)` → 子 `radius-lg(16px)` → 孙 `radius-md(8px)`
5. **容器宽度**：默认 1200px，≥1472px 扩至 1440px，≤1199px 改为 `width:auto; padding:0 20px`
6. **输出完整单文件 HTML**，所有样式写在 `<style>` 内
7. APP 默认不生成左侧 Sidebar，除非 PRD 明确要求

## 设计 Token（CSS 变量）

```css
/* 品牌色 */
--brand-default: #216C58;   /* 主按钮填充 */
--brand-hover: #2A8C6C;
--brand-light: #5FC693;     /* 文字高亮、次级强调 */
--brand-highlight: #81DEB0;
--brand-bg: rgba(33,108,88,0.15);  /* 选中态背景 */

/* 背景层级 */
--bg-page: #080B0E;         /* APP 页面底 */
--bg-section: #141615;
--bg-card: #131416;         /* APP 卡片 */
--bg-elevated: #212426;     /* 弹窗/输入框 */

/* 文字 */
--text-primary: rgba(255,255,255,1.00);
--text-secondary: rgba(255,255,255,0.80);
--text-tertiary: rgba(255,255,255,0.60);
--text-quaternary: rgba(255,255,255,0.40);
--text-disabled: rgba(255,255,255,0.20);

/* 描边 */
--border-strong: rgba(255,255,255,0.25);
--border-default: rgba(255,255,255,0.15);
--border-subtle: rgba(255,255,255,0.08);

/* 填充 */
--fill-hover: rgba(255,255,255,0.04);
--fill-overlay: rgba(0,0,0,0.60);

/* 状态色 */
--success-default: #448F6A;
--warning-default: #FF8F0B;
--danger-default: #D73133;
--info-default: #0D9488;
```

## Figma 文件

| 文件 | 链接 |
|------|------|
| USDD Design System | https://www.figma.com/design/R2TQ0Ve55k6UHh4K3sBqv7/USDD-Design-System |
| USDD 官网 | https://www.figma.com/design/ZsstNkZcZL0CJ4TgA7ErvP/USDD_%E5%AE%98%E7%BD%91 |
| USDD APP | https://www.figma.com/design/aRW7JHtGfisbnpwPeNisfi/USDD_APP |

## 目录结构

```
USDD-design/          # 设计系统补充文档（组件规范、走查清单、设计决策）
USDD-Earn/            # Earn 模块 PRD + 原型
USDD-loading/         # Loading 方案研究
USDD-PSM/             # PSM 竞品分析
usdd-prototype-guide.md  # 生成 HTML 原型的完整规范（首要参考）
```

## 已定稿的设计决策

写 PRD 或原型涉及相关功能前，先查 `USDD-design/USDD-design-decisions.md`：

- **DD-001**：全站首次加载采用「品牌加载壳 + 真实布局骨架」方案（已定稿，不再讨论其他方案）
