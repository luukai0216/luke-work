# USDD App Staging 审计结论

> **审计对象：** https://v2-app-staging.usdd.network/tron/（全站 4 个页面）
> **审计日期：** 2026-05-12
> **色彩规范来源：** Figma USDD Design System Color System（node 448-2）

---

## 总览

| 问题 | 优先级 | 状态 |
| --- | --- | --- |
| Mint 按钮白字 + 渐变背景对比度不足 | P0 | ❌ 全站存在 |
| Stability Fee 旧费率文字对比度 | P1 | ❌ /tron/ 页 |
| Footer 版权 + 链接文字对比度 | P1 | ❌ /tron/ 页 |
| App Banner / Get App badge 图片 src 为空 | P1 | ❌ 移动端 |
| AntD Tooltip 深色主题未适配 | P2 | ❌ /tron/ 页 |
| 移动端横向溢出 | — | ✅ 无 |
| 移动端卡片堆叠布局 | — | ✅ 正常 |

---

## WCAG 对比度 · 各页面合规率

| 页面 | 合规率 | 说明 |
| --- | --- | --- |
| `/tron/`（Vault 列表） | 92% | 有 4 类失败项，见下方详细 |
| `/tron/swap`（Swap PSM） | ✅ 100% | 全部通过 |
| `/tron/migrate`（Migrate） | ✅ 100% | 全部通过 |
| `/tron/earn`（Earn） | ✅ 100% | 全部通过 |

> 注：合规率计算对渐变背景按纯色估算，Mint 按钮渐变问题属人工发现，未计入百分比但已列为 P0。

---

## WCAG 不合规问题 · 详细清单

### `/tron/`（Vault 列表）—— 全站共用元素

#### P0：Mint 按钮

| 元素 | 当前文字色 | 当前背景 | 估算对比度 | 标准 | 解决方案 |
| --- | --- | --- | --- | --- | --- |
| **"Mint" 按钮**（全部 Vault 行） | `#FFFFFF` 白色 | `linear-gradient(182deg, rgb(229,214,75) → rgb(62,204,166))` 黄绿渐变 | ~1.85:1（渐变中点估算） | 4.5:1 | 将文字改为深色 `#0F1A19`，渐变背景在浅色段对比度可达 14:1；或将整体渐变调暗约 40% |

> 渐变最亮处 `rgb(229,214,75)` 配白字对比度仅 **1.47:1**，最暗处 `rgb(62,204,166)` 配白字也仅 **1.95:1**，全段均不合规。

---

#### P1：旧 Stability Fee 文字

| 元素 | 当前文字色 | 当前背景色 | 对比度 | 标准 | 解决方案 |
| --- | --- | --- | --- | --- | --- |
| **旧费率删除线文字**（5% / 7% / 3%） | `rgb(109,109,110)` | `rgb(20,23,26)` 深灰 | 3.48:1 | 4.5:1 | 文字换为 `text-secondary` **#CECECF**，对比度可达 9.8:1；或改用 `text-tertiary` **#9E9E9F**，对比度可达 6.5:1 |

---

#### P1：Footer 文字

| 元素 | 当前文字色 | 当前背景色 | 对比度 | 标准 | 解决方案 |
| --- | --- | --- | --- | --- | --- |
| **版权文字**（Copyright © 2026 USDD） | `rgb(109,109,110)` | `rgb(8,11,14)` 近黑 | 3.82:1 | 4.5:1 | 同上，换为 `text-secondary` **#CECECF** 即可 |
| **Footer 链接**（Docs / MCP Server / FAQs / Terms / Privacy / Support） | `rgb(109,109,110)` | `rgb(8,11,14)` 近黑 | 3.82:1 | 4.5:1 | 同上 |

---

#### P2：AntD Tooltip（深色主题未适配）

| 元素 | 当前文字色 | 当前背景色 | 对比度 | 标准 | 解决方案 |
| --- | --- | --- | --- | --- | --- |
| **倒计时 Tooltip**（"33 days 21 hours"） | `rgba(0,0,0,0.88)` 近黑 | `rgb(8,11,14)` 近黑 | 1.06:1 | 4.5:1 | AntD Tooltip 默认用浅色背景，深色主题需覆盖：`background: #FFFFFF`（或 `bg-card #181A1C` + 白色文字） |

---

## 移动端 · 验证结果（390px 视口）

| 检测项 | 状态 | 详情 |
| --- | --- | --- |
| 横向溢出 | ✅ 无 | `bodyScrollWidth = 390px = viewportWidth` |
| Vault 卡片堆叠 | ✅ 正常 | 桌面表格 → 移动端卡片，布局无错位 |
| 汉堡菜单 | ✅ 正常 | 导航正确折叠 |
| 图片加载（22 张） | ❌ 2 张裂图 | 见下方说明 |
| 轮播广告条 | ✅ 正常裁切 | `activity-container` overflow hidden 正确 |

### 裂图详情

| 位置 | 问题描述 | 修复方式 |
| --- | --- | --- |
| **App Banner（header）** | `<img alt="" src="">` — src 为空，是"Tap 'Open' to continue"提示条里的 App 图标 | 补填正确的 App 图标 URL（如 `/icon-192.png` 或对应资源路径） |
| **"Get App" footer 链接** | `<img alt="" src="">` — src 为空，是应用商店下载 badge 图片 | 补填 App Store / Google Play badge 图片 URL |

---

## 规范色彩 Token 速查（来自 node 448-2）

| Token | 色值 | 用途 |
| --- | --- | --- |
| `brand-default` | #216C58 | 主按钮填充 |
| `bg-card` | #181A1C | 卡片背景 |
| `text-primary` | #FFFFFF | 主要文字 |
| `text-secondary` | #CECECF | 正文 / footer 链接推荐用色 |
| `text-tertiary` | #9E9E9F | 次要文字 |
