# PRD（轻量版）：USDD Brand Kit 页面 + 导航 Resources 改名

> **版本**：v1 | **作者**：Yuki | **日期**：2026-05-28 | **状态**：草稿
> **原型**：[brand-kit.html](./prototype/brand-kit.html)

---

## 1. 背景与目标

**背景**：BD / 市场组对接 CEX、钱包、媒体时,频繁被外部索要 USDD logo / 配色 / token icon,每次靠邮件解释,重复工作量大且品牌使用不可控。

**目标**：上线 `usdd.io/brand-kit` 中性资源中心,外部合作方一键自助拿到合规品牌资产,降低 BD 解释成本 + 减少品牌误用。

---

## 2. 目标用户与场景

**目标用户**：媒体/KOL（写文章要 logo + 品牌描述）+ CEX/钱包/DeFi 集成方（上线集成要 token icon + 链信息）。

**核心场景**:当前外部找 logo 资源需要邮件 BD,品牌资产口径不统一,误用风险大。

---

## 3. 方案描述

### 3.1 功能说明

新建 `usdd.io/brand-kit` 页面（EN only,深色主题,8 个 section2）。

**页面入口**（3 个,全局生效）：


| 入口位置             | 路径 / 触发                              | 备注                                       |
| ---------------- | ------------------------------------ | ---------------------------------------- |
| **Topbar 主导航**   | `Resources` dropdown ▾ → `Brand Kit` | 全站 Topbar,所有页面均可达;`Brand Kit` 加 `NEW` 角标 |
| **Footer 第 3 列** | `Resources` 列 → `Brand Kit`          | 全站 Footer,Brand Kit 加 `NEW` 角标           |
| **直接 URL**       | `usdd.io/brand-kit`                  | 媒体 / BD 引用时一键发链接                         |


**导航结构改造**（全站生效）：Topbar 主导航 + Footer 第 3 列的 `Community` 同步改名为 `Resources`,二级菜单新增 `Brand Kit` 链接（需同步基线 `modules/website/global.md` F02 / F04 / BR-G15）。

**页面内容**（8 个 section）：

**01 · USDD Wordmark**

- 4 张 canvas 展示 wordmark 4 种背景变体:White on Dark / Black on Light / Brand Green Background / Highlight Monochrome
- 每张卡支持 SVG / PNG 单独下载;右上 `Download Logo Pack (.zip)` 一键打包
- ⚠️ 待 Luke 交付真实 USDD wordmark 矢量源文件,prototype 当前用 Inter 文字占位

**02 · USDD & sUSDD Symbols**

- 2 张大卡展示双 token 圆形 symbol(纯品牌识别,不带链标识)
- 使用场景:editorial / 新闻 / 社媒 / 二创等 chain-agnostic 内容
- 每张支持 SVG / PNG;右上 `Download Symbol Pack (.zip)` 一键打包

**03 · USDD & sUSDD Icons**

- 5 张卡展示 token × chain 组合:USDD × {TRON / Ethereum / BNB Chain} + sUSDD × {Ethereum / BNB Chain}
- sUSDD 在 TRON 实际承载为 jUSDD,故不展示 `sUSDD/TRON` 卡(避免误导)
- 每张卡 = 中心 token symbol + 右下角链 logo badge;支持 SVG / PNG
- 使用场景:CEX listing / 钱包 / DeFi 协议 UI 等需要明示链的多链上下文
- 卡片下方 contract bar:`Need contract addresses? → docs.usdd.io`(B1 方案,集成方拿合约地址走文档跳出)

**04 · Brand Colors**

- 4 张色板卡:USDD Green `#216C58` / sUSDD Green `#36B364` / Black `#000000` / White `#FFFFFF`
- 每色提供 HEX / RGB / CMYK 三组数据(对齐 WBTC 标准,覆盖屏幕 + 印刷场景)
- 交互:点击色块复制 HEX 到剪贴板 + Toast `Copied #XXXXXX`
- 双绿色卡左上角加 micro-tag(USDD / sUSDD)避免视觉混淆

**05 · Typography**

- 一张字体卡:大字 `Aa` + 字体名 `Inter` + 字重 `Regular 400 · Semi Bold 600`
- 外链:`Get Inter ↗` → `rsms.me/inter/`(新标签页)

**06 · Common Mistakes**

- 8 张 `DON'T` 卡,演示常见误用(对齐 WBTC 标准):
Recolor · Crop · Delete elements · Shadows · Rotate · Mirror · Opacity · Squeeze
- 每张用 CSS filter / transform 即时演示错误效果,原 logo 文件本身不被修改

**07 · Press & Media**

- 简洁联系入口,一句话引导 + 主 CTA 邮箱按钮
- 跳转:`mailto:press@usdd.io`

**08 · Legal Notice**

- 4 条法律声明:Ownership & Trademarks / Permitted Use / Prohibited Use / Commercial Licensing & Contact
- 当前含 `Draft · Pending legal review` 警示标,法务定稿后移除
- 段尾 footer:左 `This notice supplements the USDD Terms of Use` 内链 + 右 `Read full Brand Usage Terms ↗` 外链
- ⚠️ `docs.usdd.io/legals/brand-usage` 页面待法务建页

### 3.2 用户流程

```
访问 usdd.io → 点 Topbar Resources ▾ → Brand Kit
→ 浏览 8 section → 下载 zip / 复制色值 → 完成
```

### 3.3 业务规则


| 编号    | 规则                                   | 说明                           |
| ----- | ------------------------------------ | ---------------------------- |
| BR-01 | 静态 zip 直下,零后端,无邮箱收集                  | CDN 静态                       |
| BR-02 | 色卡可点击复制 HEX                          | 含 `execCommand` fallback     |
| BR-03 | EN only,不做多语言                        | —                            |
| BR-04 | Symbols 用于 editorial,Icons 用于多链集成    | section-desc 用 `Use for:` 区分 |
| BR-05 | Legal Notice 必须法务定稿后上线               | 当前 Draft 占位                  |
| BR-06 | Hero 动效必须支持 `prefers-reduced-motion` | a11y                         |


---

## 4. UI / 交互说明

视觉与交互详见 [brand-kit.html](./prototype/brand-kit.html)。

### 4.1 关键交互

- **Hero 生成动效**:页面加载时 USDD 外圈 stroke 描边(1.2s)→ clip-path circle reveal(0.6-1.6s)→ 连接线生长 → sUSDD 重复,~3.5s 完成后进入 ambient 浮动
- **色卡复制**:hover 显示 copy icon,点击触发 clipboard 复制 HEX,Toast 显示 `Copied #XXXXXX`
- **死链反馈**:prototype 阶段所有 `href="#"` 点击 prevent default + Toast `Coming soon · {label}`,并 fire 埋点

### 4.2 按钮跳转清单


| #   | 按钮                                    | 位置                           | 跳转目标                                                                                            | 行为                                                      |
| --- | ------------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 1   | Download Full Kit (.zip)              | Hero 主 CTA                   | `cdn.usdd.io/brand-kit/usdd-brand-kit-v1.0.zip` ⚠️ 待 CDN                                        | 直接下载 + fire `brand_kit_download_click`                  |
| 2   | Read usage guidelines                 | Hero 次 CTA                   | `#guidelines`(页内锚点)                                                                             | 平滑滚动到 06 Common Mistakes                                |
| 3   | Download Logo Pack (.zip)             | Section 01 右上                | `cdn.usdd.io/brand-kit/usdd-logo-pack-v1.0.zip` ⚠️ 待 CDN                                        | 直接下载 + 埋点                                               |
| 4   | Download Symbol Pack (.zip)           | Section 02 右上                | `cdn.usdd.io/brand-kit/usdd-symbol-pack-v1.0.zip` ⚠️ 待 CDN                                      | 直接下载 + 埋点                                               |
| 5   | Download Icon Pack (.zip)             | Section 03 右上                | `cdn.usdd.io/brand-kit/usdd-icon-pack-v1.0.zip` ⚠️ 待 CDN                                        | 直接下载 + 埋点                                               |
| 6   | SVG / PNG(单资产按钮)                      | 01/02/03 各卡内                 | `cdn.usdd.io/brand-kit/{type}/{name}.{ext}`(如 `symbol/usdd.svg` / `icon/usdd-tron.png`)⚠️ 待 CDN | 直接下载 + 埋点                                               |
| 7   | Color swatch                          | Section 04 4 张色卡             | 点击复制 HEX 到剪贴板                                                                                   | clipboard.writeText + Toast + 埋点 `brand_kit_color_copy` |
| 8   | Get Inter ↗                           | Section 05 字体卡               | `https://rsms.me/inter/`                                                                        | 新标签页打开 + 埋点 `brand_kit_outbound`                        |
| 9   | Open docs.usdd.io ↗                   | Section 06 contract bar      | `https://docs.usdd.io/`                                                                         | 新标签页打开 + 埋点                                             |
| 10  | [press@usdd.io](mailto:press@usdd.io) | Section 07 主 CTA             | `mailto:press@usdd.io`                                                                          | 触发邮件客户端 + 埋点                                            |
| 11  | [legal@usdd.io](mailto:legal@usdd.io) | Section 08 第 4 条 inline link | `mailto:legal@usdd.io`                                                                          | 触发邮件客户端 + 埋点                                            |
| 12  | Terms of Use                          | Section 08 footnote          | `https://docs.usdd.io/legals/terms-of-use`                                                      | 新标签页打开 + 埋点                                             |
| 13  | Read full Brand Usage Terms ↗         | Section 08 footer 右侧         | `https://docs.usdd.io/legals/brand-usage` ⚠️ 待法务建页                                              | 新标签页打开 + 埋点                                             |


> 全局 Topbar / Footer 跳转链路与基线 `modules/website/global.md` F01-F04 一致,本 PRD 不重复列;仅追加 `Resources` dropdown / 列内的 `Brand Kit` 链接指向 `/brand-kit`。

### 4.3 埋点


| 事件                         | 触发                      | props                                                 |
| -------------------------- | ----------------------- | ----------------------------------------------------- |
| `brand_kit_download_click` | 点击任意 zip / SVG / PNG 按钮 | asset_type, format, asset_name, chain, section, label |
| `brand_kit_color_copy`     | 点击色卡复制 HEX              | hex                                                   |
| `brand_kit_outbound`       | 点击外链或 mailto            | href, label, section                                  |


事件推到 `window.dataLayer`(GA4 兼容)。

---

## 5. 验收标准


| 编号    | 验收项                                              | 验收方式             | 通过条件                               |
| ----- | ------------------------------------------------ | ---------------- | ---------------------------------- |
| AC-01 | 8 section 顺序 / 内容渲染                              | 视觉走查             | 与 prototype 一致                     |
| AC-02 | Topbar + Footer `Community` → `Resources` 改名全站同步 | 视觉走查             | 跨所有页面一致                            |
| AC-03 | 4 色板复制 HEX 工作                                    | 手动测试             | Chrome / Safari / Firefox 通过       |
| AC-04 | 响应式 1280 / 768 / 375 三档无断裂                       | 手动测试             | 无布局错乱                              |
| AC-05 | Hero 动效在 reduced-motion 下禁用                      | a11y 测试          | macOS / iOS 系统偏好生效                 |
| AC-06 | 3 类埋点正确 fire                                     | DevTools console | `[track]` 日志可见 + dataLayer 有 event |
| AC-07 | Logo / Token icon 显示锐利                           | 视觉走查             | 无放大模糊                              |
| AC-08 | Legal Notice 法务定稿,移除 Draft badge                 | 法务签字             | —                                  |


---

## 上线硬门禁（外部依赖）


| 依赖                                   | Owner        |
| ------------------------------------ | ------------ |
| USDD / sUSDD wordmark SVG 矢量源        | Luke / Daivd |
| 5 个 zip 资产包打包上 CDN                   | 前端 + 设计组     |
| Legal Notice 法务定稿                    | 法务           |
| `docs.usdd.io/legals/brand-usage` 上线 | 法务 + DevOps  |
| `press@usdd.io` 邮箱可路由                | 市场组          |
| GA4 SDK 接入 `window.dataLayer`        | 前端           |
| 基线 `global.md` F02 / F04 / BR-G15 同步 | 前端           |


---

## 不做（显式排除）

多语言 / 邮箱收集 / 后端动态打包 / Click-through 弹窗 / Banner / Slide 模板 / Contract Address 完整表（仅文字外链引导 docs.usdd.io）/ 产品叙事。

---

## 变更记录


| 版本  | 日期         | 变更内容                                     | 变更人  |
| --- | ---------- | ---------------------------------------- | ---- |
| v1  | 2026-05-28 | 初稿（基于 v2.6.0 prototype 9 轮迭代 + 5 角色评审沉淀） | Yuki |


