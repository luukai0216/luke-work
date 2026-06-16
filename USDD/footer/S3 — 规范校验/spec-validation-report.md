# Footer 规范校验报告 — usdd.io

> 稿件：`S3 — 规范校验/usdd-io-footer.html`
> 参考规范：`design-ai/design/USDD-component-guidelines.md`
> 校验日期：2026-04-12

---

## 一、色彩 Token（满分 20 分）

**得分：7 / 20**

| # | 问题类型 | 问题位置（CSS 行） | 问题描述 | 修复建议 |
|---|---------|-----------------|---------|---------|
| C1 | Token 命名不符规范 | `:root` 第 12–18 行，全局 | 所有 token 缺少 `--color-` 前缀。规范体系为 `--color-bg-*`、`--color-text-*`、`--color-border-*`，实际使用 `--bg-*`、`--text-*`、`--border-*`，共 12 个变量命名错误 | 按规范重命名，并全局替换所有引用 |
| C2 | Token 色值偏离规范 | `:root` 第 13–15 行 | Background / Text / Border 色值均与规范不符：`--bg-page:#0F0F0F`（规范 `#0c0c0e`）、`--text-primary:#EBEBEB`（规范 `#ffffff`）、`--text-secondary:#999999`（规范 `rgba(255,255,255,.8)`）等，共 10 处色值偏差 | 对照规范重新定义色值；Text / Border 系列改为白色 + 透明度写法 |
| C3 | 使用规范外 token | `:root` 第 16 行；第 71、74、197、198 行 | `--accent:#4ECFA8` 不在规范 token 表内，且色值与规范品牌色（`--color-brand-highlight:#81deb0`）不匹配 | 删除 `--accent`，改用 `--color-brand-highlight` |
| C4 | 裸色值（mobile 断点） | 第 167、176、215、244、266、282 行 | 移动端大量使用裸色值：`background:#141615`、`background:rgba(255,255,255,.1)`、`color:rgba(255,255,255,.6)`（2处）、`color:rgba(255,255,255,.4)`；`radial-gradient` 使用未在规范内定义的品牌衍生色 | 替换为对应规范 token：`var(--color-bg-section)`、`var(--color-border-subtle)`、`var(--color-text-tertiary)`、`var(--color-text-quaternary)` |
| C5 | 裸色值（桌面） | 第 80 行 | `.footer-brand-name em{color:rgba(255,255,255,1)}` 使用裸色值 | 改为 `var(--color-text-primary)` |

---

## 二、字体字阶（满分 20 分）

**得分：9 / 20**

规范字阶档位：56 / 48 / 40 / 32 / 24 / 20 / 16 / 14 / 12 px

| # | 问题位置 | 实际字号 | 问题描述 | 修复建议 |
|---|---------|---------|---------|---------|
| F1 | `.footer-brand-name`（第 77 行） | 28px | 28px 不在规范字阶（最近档：heading-4 32px / heading-5 24px） | 改为 `32px`（heading-4） |
| F2 | `.footer-brand-desc`（第 82 行） | 13px | 13px 不在规范字阶 | 改为 `14px`（body-sm） |
| F3 | `.footer-contact-link`（第 93 行） | 13px | 同 F2 | 改为 `14px`（body-sm） |
| F4 | `.footer-col-title`（第 112 行） | 11px | 低于规范最小字号 caption 12px | 改为 `12px`（caption-sb，font-weight:600） |
| F5 | `.footer-link`（第 120 行） | 13.5px | 13.5px 不在规范字阶 | 改为 `14px`（body-sm） |
| F6 | `.footer-link-ext`（第 125 行） | 11px | 低于规范最小字号 12px | 改为 `12px` |
| F7 | `.footer-link-badge`（第 132 行） | 10px | 低于规范最小字号 12px | 改为 `12px`（caption） |
| F8 | `.tg-item`（第 60 行） | 13px | 13px 不在规范字阶 | 改为 `14px`（body-sm） |
| F9 | `.tg-item i`（第 62 行） | 15px | 15px 不在规范字阶 | 改为 `16px`（body-md） |
| F10 | `<i style="font-size:13px">`（第 339 行，内联样式） | 13px | 内联样式使用规范外字号 | 移至 CSS class，改为 `14px` 或 `12px` |
| ✓ | 合规项 | — | `body:14px`、`caption:12px`、mobile `brand-name:24px`、mobile `footer-link:14px` 均符合规范 | — |

---

## 三、圆角（满分 20 分）

**得分：14 / 20**

| # | 问题位置 | 问题描述 | 修复建议 |
|---|---------|---------|---------|
| R1 | `:root` 第 17 行及全局引用 | 圆角 token 命名不符规范：`--r-xs/sm/md/lg/xl` 应为 `--radius-xs/sm/md/lg/xl`（或遵循项目统一前缀约定） | 重命名 `:root` 变量，全局替换引用 |
| R2 | `.footer-contact-link`（第 96 行） | `border-radius:999px` 使用硬编码值，未引用 token | 改为 `var(--radius-full)` 并在 `:root` 补充 `--radius-full:999px` |
| ✓ | 合规项 | `--r-xs:4px`、`--r-md:8px`、`--r-lg:16px` 实际数值均与规范一致；`border-radius:50%` 用于圆形图标按钮，合理 | — |

---

## 四、间距（满分 20 分）

**得分：8 / 20**

规范 4px 网格：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 px

| # | 问题位置 | 实际值 | 问题描述 | 修复建议 |
|---|---------|-------|---------|---------|
| S1 | `.footer{padding:56px 0 0}`（第 27 行） | 56px | 不在 space token 表（介于 space-7:48 与 space-8:64 之间） | 改为 `48px`（space-7） |
| S2 | `.tg-tooltip{padding:6px}`（第 55 行） | 6px | 6px 不在 space token 表 | 改为 `8px`（space-2） |
| S3 | `.tg-item{padding:10px 12px}`（第 60 行） | 10px | 垂直 padding 10px 不在表 | 改为 `12px 12px`（space-3） |
| S4 | `.footer-brand-center{gap:14px}`（第 66 行） | 14px | 14px 不在 space token 表 | 改为 `12px`（space-3）或 `16px`（space-4） |
| S5 | `.footer-col-title{margin-bottom:14px}`（第 115 行） | 14px | 同 S4 | 改为 `12px` 或 `16px` |
| S6 | `.footer-links{gap:10px}`（第 117 行） | 10px | 10px 不在 space token 表 | 改为 `8px`（space-2）或 `12px`（space-3） |
| S7 | `.footer-link{gap:5px}`（第 119 行） | 5px | 5px 不在 space token 表 | 改为 `4px`（space-1） |
| S8 | `.footer-link-disabled{gap:6px}`（第 129 行） | 6px | 6px 不在 space token 表 | 改为 `4px`（space-1）或 `8px`（space-2） |
| S9 | `.footer-link-badge{padding:1px 6px}`（第 132 行） | 1px / 6px | 均不在 space token 表 | 改为 `2px 8px`（垂直 2px 为合理容差，水平 space-2） |
| S10 | `.footer-contact-link{padding:0 14px; gap:7px}`（第 92 行） | 14px / 7px | 均不在 space token 表 | 改为 `padding:0 12px; gap:8px` |
| S11 | `.footer{padding:47px 0 0}`（mobile，第 168 行） | 47px | 不在 space token 表（最近档 48px） | 改为 `48px`（space-7） |
| S12 | `.footer-socials{margin-top:49px}`（mobile，第 220 行） | 49px | 不在 space token 表（最近档 48px） | 改为 `48px`（space-7） |
| S13 | `.footer-contact{margin-top:31px}`（mobile，第 233 行） | 31px | 不在 space token 表（最近档 32px） | 改为 `32px`（space-6） |
| S14 | `.footer-bottom{padding:0 0 45px}`（mobile，第 273 行） | 45px | 不在 space token 表（最近档 44px 或 48px） | 改为 `48px`（space-7） |
| ✓ | 合规项 | — | `.footer-hero{gap:32px; padding-bottom:48px}`、`.footer-nav{gap:24px; margin-bottom:48px}`、`.footer-divider{margin-bottom:40px}=10×4`、mobile `hero padding-bottom:64px`、mobile `footer-nav row-gap:32px` 均符合 4px 网格 | — |

---

## 五、触控尺寸 ≥ 44px（满分 20 分）

**得分：4 / 20**

| # | 元素 | 实际触控尺寸 | 问题描述 | 修复建议 |
|---|------|-----------|---------|---------|
| T1 | `.social-btn`（第 41 行，桌面+移动） | 36×36px | 宽高均低于 44px 最小触控要求 | 改为 `width:44px;height:44px` |
| T2 | `.footer-contact-link`（第 92 行） | height:36px | 高度低于 44px | 改为 `height:44px` |
| T3 | `.tg-item`（第 60 行） | 约 39px（13px×1.5+20px） | 估算总高度 < 44px | 增大 padding 使高度 ≥ 44px（如改 `padding:12px`） |
| T4 | `.footer-link`（第 118–123 行） | 约 20px（无 min-height） | 文字链接无点击区保障，高度 ≈ 20px | 添加 `min-height:44px; align-items:center` |
| T5 | `.back-to-top`（第 146 行） | 36×36px | 宽高均低于 44px | 改为 `width:44px;height:44px` |

---

## 汇总评分

| 校验项目 | 满分 | 得分 | 状态 |
|---------|------|------|------|
| 色彩 Token | 20 | 7 | ❌ 不通过 |
| 字体字阶 | 20 | 9 | ❌ 不通过 |
| 圆角 | 20 | 14 | ⚠️ 部分问题 |
| 间距 | 20 | 8 | ❌ 不通过 |
| 触控尺寸 ≥ 44px | 20 | 4 | ❌ 不通过 |
| **总分** | **100** | **42** | — |

---

## 高优先级修复清单

1. **色彩（C1+C2）**：统一 token 命名前缀为 `--color-*`，色值全面对齐规范，消除所有裸色值
2. **触控尺寸（T1–T5）**：全部可交互元素触控区扩展至 ≥ 44px
3. **字体字阶（F1–F10）**：清理所有非规范档位（28 / 13 / 13.5 / 11 / 10 / 15px），统一使用 12 / 14 / 16 / 24 / 32px
4. **间距（S1–S14）**：14 处 off-grid 数值全部对齐 4px 网格
5. **圆角（R1–R2）**：token 命名加规范前缀，补充 `--radius-full:999px`

---

## 结论

> **结论：不通过，需修复后重新校验**
>
> 总分 42/100，低于建议通过线（80 分）。主要问题集中于：色彩 Token 体系与规范命名及色值体系全面脱节（7/20）、全局触控尺寸不达标（4/20）、桌面端存在大量规范外字号（9/20）、间距数值大量偏离 4px 网格（8/20）。建议按高优先级清单修复后重新提交校验。
