# USDD 2.0 官网 — 设计规范

> 该端的设计约束和规范。生成原型时 AI 必须遵循此文件。
> 完整 Token 定义见 `../design/USDD-component-guidelines.md`，此处仅列端级摘要和补充。

## 视觉规范摘要

### 色彩（摘自 Figma Design System Variables）

| 类别 | Token | 色值 | 用途 |
|------|-------|------|------|
| Brand | `--color-brand-default` | `#216c58` | 主操作按钮、主要强调色 |
| Brand | `--color-brand-hover` | `#2a8c6c` | 主操作按钮 hover 态 |
| Brand | `--color-brand-light` | `#5fc693` | 品牌色浅色变体 |
| Brand | `--color-brand-highlight` | `#81deb0` | 高亮文字、标签 |
| Background | `--color-bg-page` | `#0c0c0e` | 页面底层背景 |
| Background | `--color-bg-section` | `#141615` | 区块背景 |
| Background | `--color-bg-card` | `#181a1c` | 卡片背景 |
| Background | `--color-bg-elevated` | `#212426` | 悬浮层（下拉、弹出） |
| Text | `--color-text-primary` | `#ffffff` | 主文字 |
| Text | `--color-text-secondary` | `#ffffff / 80%` | 次要文字 |
| Text | `--color-text-tertiary` | `#ffffff / 60%` | 辅助说明 |
| Status | `--color-success-default` | `#448f6a` | 成功 |
| Status | `--color-warning-default` | `#ff8f0b` | 警告 |
| Status | `--color-danger-default` | `#d73133` | 错误 / 危险 |
| Status | `--color-info-default` | `#0d9488` | 信息提示 |

> **规则**：原型中禁止使用裸色值，必须引用 Token。

### 字体

- **字体族**：Inter（全局唯一，Regular / Semi Bold）
- **降级**：Inter 不可用时降级为系统 sans-serif

| 字阶 | Token | 字号 | 行高 | 字重 | 用途 |
|------|-------|------|------|------|------|
| Heading 1 | `heading-1` | 56px | 78px | Semi Bold | 超大页面标题 |
| Heading 3 | `heading-3` | 40px | 56px | Semi Bold | 模块主标题 |
| Heading 5 | `heading-5` | 24px | 34px | Semi Bold | 卡片标题 |
| Body MD | `body-md` | 16px | 22px | Regular | 正文 |
| Body SM | `body-sm` | 14px | 20px | Regular | 次要正文 |
| Label MD | `label-md` | 16px | 22px | Semi Bold | 按钮、标签 |
| Caption | `caption` | 12px | 16px | Regular | 辅助说明 |

> 完整 12 级字阶见 `../design/USDD-component-guidelines.md`

### 圆角

| Token | 值 | 适用 |
|-------|----|------|
| `radius-sm` | 6px | 输入框、选择器 |
| `radius-md` | 8px | 卡片、按钮 |
| `radius-lg` | 16px | 大卡片、弹窗 |
| `radius-full` | 999px | 头像、胶囊按钮 |

### 间距

| Token | 值 | 场景 |
|-------|----|------|
| `space-2` | 8px | 组件内紧凑间距 |
| `space-4` | 16px | 卡片内 padding |
| `space-5` | 24px | 模块间距 |
| `space-6` | 32px | 区块间距 |
| `space-7` | 48px | 页面区段间距 |
| `space-9` | 80px | 页面顶部/底部留白 |

---

## 屏幕尺寸

| 平台 | 设计稿宽度 | 说明 |
|------|-----------|------|
| Desktop | 1440px | 主设计稿基准宽度 |
| Mobile | 375px | 移动端适配（响应式） |

## 端特有组件

| 组件 | 样式描述 | 备注 |
|------|---------|------|
| 链切换 Tab | Tron / Ethereum / BNB Chain 三选一 Tab | Data、APY 等多处复用 |
| 指标卡片 | 深色卡片 + 大字号数值 + 辅助说明 | Homepage、Data 页核心组件 |
| 时序图表 | ECharts 暗色主题，带时间范围切换 | Data、SA 页复用 |
| Collateral 表格 | 行内展示 Vault 数据 + Actions 跳转 | Data 页核心表格 |

## 交互规范

- **主题**：全站暗色，不支持亮色 / 自动切换
- **导航**：顶部固定导航栏，hover 触发下拉菜单，平滑过渡
- **加载态**：优先使用 Skeleton 骨架屏（`--color-bg-elevated` 填充 + shimmer），次选 Spinner
- **空态**：插画 + 说明文字（`body-sm`）+ 可选操作按钮
- **错误态**：图标（`--color-danger-default`）+ 错误文案 + 重试按钮
- **首屏 Loading**：品牌加载壳 + 真实布局骨架（DD-001 决策）

## 导航模式

- **Desktop**：顶部水平导航栏，Logo 左侧 + 菜单项居中/右侧 + CTA 最右
- **Mobile**：待确认（汉堡菜单方案）

## Figma 资源

| 文件 | 链接 |
|------|------|
| USDD Design System | https://www.figma.com/design/R2TQ0Ve55k6UHh4K3sBqv7/USDD-Design-System |
| USDD 官网 | https://www.figma.com/design/ZsstNkZcZL0CJ4TgA7ErvP/USDD_%E5%AE%98%E7%BD%91 |
| USDD APP | https://www.figma.com/design/aRW7JHtGfisbnpwPeNisfi/USDD_APP |
