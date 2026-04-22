# TronLink 首页改版 PRD

**文档版本：** v1.2
**创建日期：** 2026-04-22
**产品：** TronLink 官网首页 [https://www.tronlink.org](https://www.tronlink.org)
**文档状态：** 待评审

---

## 改版总览

以 **CTA 转化链路补足**为核心，辅以 Hero 区内容改写与全站视觉打磨。保留现有 fullpage.js 全屏翻页结构，共 14 项需求。

---

## 一、改版目标


| 目标          | 说明                                   |
| ----------- | ------------------------------------ |
| 提升安装转化率     | 补足 CTA 断点，让用户在每个功能屏和 Footer 都能找到下载入口 |
| 增强 Hero 表达力 | 标题与 Bullet 从功能描述转向用户利益，提升说服力         |
| 提升功能屏视觉质感   | 文案、间距、布局细节打磨，在保留现有风格下提升精致度           |
| 优化首屏引导      | 向下滚动提示 + 导航 CTA 始终可见，降低首屏跳出率         |


---

## 二、需求清单索引

**Hero 区 & 导航**

- **REQ-01** Hero 主标题改写为用户利益句
- **REQ-02** Hero 区精简为单一主 CTA 按钮
- **REQ-04** Hero 区增加向下滚动引导
- **REQ-05** 导航栏首屏即显示 Install 按钮 & 弱化语言切换
- **REQ-06** 顶部公告条样式减重
- **REQ-14** Hero Bullet 改写为用户利益视角

**功能区块 · 结构优化**

- **REQ-10** 功能区块交替左右布局
- **REQ-11** 功能区块内容垂直居中
- **REQ-12** 每个功能区块底部增加次级 CTA

**功能区块 · 细节优化**

- **REQ-20** 功能区标题文案重写（四屏）
- **REQ-22** 功能区 Bullet 行高与间距优化
- **REQ-23** 功能区副标签样式统一

**Footer**

- **REQ-13** Footer 增加安装 CTA 与邮件订阅

**基础质量**

- **REQ-18** 导航点点击区域扩大

---

## 三、页面结构（改版后）

> 保留 fullpage.js 全屏翻页模式，共 5 屏，结构与现有一致，仅在 Footer 前新增尾部 CTA 区块。

```
┌─────────────────────────────────────┐
│  顶部公告条（品牌蓝底，高度 32px）      │
│  导航栏（Install 按钮首屏起始终显示）   │
├─────────────────────────────────────┤
│  屏 1 · Hero                        │
│  深蓝渐变背景 · 利益型标题 · 单一CTA   │
│  底部：Stats 数据栏 + 向下引导箭头     │
├─────────────────────────────────────┤
│  屏 2 · Wallet Security Protection  │
│  白色背景 · 左文右图（3D 盾牌）        │
│  底部：次级 CTA "Install Now →"      │
├─────────────────────────────────────┤
│  屏 3 · Network Coverage            │
│  白色背景 · 右文左图（3D 行星，镜像）   │
│  底部：次级 CTA "Install Now →"      │
├─────────────────────────────────────┤
│  屏 4 · Asset Management            │
│  白色背景 · 左文右图（3D 锁头）        │
│  底部：次级 CTA "Install Now →"      │
├─────────────────────────────────────┤
│  屏 5 · User Experience             │
│  白色背景 · 右文左图（3D 闪电，镜像）   │
│  底部：次级 CTA "Install Now →"      │
├─────────────────────────────────────┤
│  尾部 CTA 区块（深蓝背景）                  │
│  "Ready to explore TRON?" + Install TronLink  │
├─────────────────────────────────────┤
│  Footer（多栏链接 + 版权）             │
└─────────────────────────────────────┘
```

---

## 四、详细需求

---

### ▌Hero 区 & 导航

---

#### REQ-01｜Hero 主标题改写为用户利益句

**所在位置：** 屏 1 · Hero
**问题：** 现状标题 "TronLink Wallet" 是产品名称，不传达用户价值；竞品 MetaMask 用"您的链上之家"，Phantom 用场景句"Your home for trading crypto"

**当前状态**

> "TronLink Wallet"（产品名称型标题，不传达用户价值）

**改版要求**
主标题确定为：

> **TronLink — Secure, Connected, and Truly Yours**
> **TronLink — 安全无忧，随处互联，真正属于你**

**验收标准**

- 英文版与中文版均按上述文案执行
- 标题视觉规格维持现有大小与字重

---

#### REQ-02｜Hero 区精简为单一主 CTA

**所在位置：** 屏 1 · Hero
**问题：** 当前有"Install Now"按钮 + 未标注 QR 图标按钮并排，注意力分散；竞品均为单一 CTA

**当前状态**

> "Install Now" 按钮 + QR 图标并排，下方 Android / iOS / Chrome 三个图标无说明文字，三者功能指向相同，用户无法判断区别

**改版要求**

主 CTA 按钮文案改为 **"Install TronLink"**。

按钮下方图标区重新分为两组，中间用竖线或留白做视觉分隔：

```
[ Install TronLink ]

[Chrome 图标]      |    [QR 码]  [Android 图标]  [iOS 图标]
Browser Extension  |              Mobile App
```

- **左组 — Browser Extension**：Chrome 图标 + 下方文字标签"Browser Extension"，点击跳转 Chrome Web Store
- **右组 — Mobile App**：QR 码常驻显示（不做 hover 隐藏）+ Android / iOS 图标并排 + 下方文字标签"Mobile App"，各图标分别跳转对应商店
- QR 码归入 Mobile App 组，不再独立存在，组标签即为其说明，无需额外文字

**验收标准**

- 主 CTA 按钮仅有 1 个
- 图标区明确分为 Browser Extension 和 Mobile App 两组
- QR 码与手机平台图标同组，始终可见
- 每组有文字标签，用户一眼能判断自己该用哪组

---

#### REQ-04｜Hero 区增加向下滚动引导

**所在位置：** 屏 1 · Hero 底部
**问题：** 首屏无任何向下滚动提示，用户可能以为这是静态单页

**改版要求**

- Stats 数据栏下方增加向下箭头图标（↓）
- 箭头有**轻微上下浮动动效**，节奏感要柔和，不要跳跃
- 点击后触发翻页至屏 2
- 样式：白色，低透明度，整体要克制，不抢 CTA 的注意力

**验收标准**

- Hero 底部有向下引导箭头且有浮动动效
- 点击后触发翻页至下一屏

---

#### REQ-05｜导航栏首屏即显示 Install 按钮 & 弱化语言切换

**所在位置：** 全局导航栏
**问题：** 当前 Install 按钮在首屏隐藏，用户离开 Hero 后才出现；语言切换入口视觉权重与导航主项相当，占据了不必要的注意力

**改版要求**

**① Install 按钮**

- 从第 1 屏开始就在导航栏右侧显示
- 屏 1（Hero 深蓝背景）：按钮样式需在深色背景上清晰可见，可以是白色描边或其他适配方式
- 屏 2–5（白色背景）：品牌蓝填充 + 白色文字
- 两种状态之间切换要顺滑，不要突兀

**② 语言切换弱化**

- 样式降级，不再与导航主项并列，改为小字或图标形式（如地球图标）
- 视觉上退到导航栏靠边的次要位置，不抢主导航的注意力

**验收标准**

- 首屏导航即有 Install 按钮，两种状态切换顺滑
- 语言切换在视觉上明显弱于导航主项和 Install 按钮

---

#### REQ-06｜顶部公告条样式减重

**所在位置：** 页面最顶部
**问题：** 纯黑背景公告条视觉权重超过品牌导航栏，第一眼是警告感而非品牌感

**当前状态**

> 黑色背景 + 白色文字，高度偏大，视觉上像警告横幅

**改版要求**

- 背景色改为品牌深蓝方向，不用纯黑，让它更融入品牌感
- 高度和字号适当压缩，减轻存在感，让导航栏更突出
- 文字内容不变（防钓鱼提示）
- 可选：右侧增加关闭（×）按钮，当天不再显示

**验收标准**

- 公告条背景色不再是纯黑
- 整体感觉比现在轻一些，不再像警告条

---

#### REQ-14｜Hero Bullet 改写为用户利益视角

**所在位置：** 屏 1 · Hero 文字区
**问题：** 当前 4 条 Bullet 全是功能描述，没有说明用户能得到什么

**当前内容**

1. A decentralized self-custody wallet that is secure, transparent, and stable
2. Fully supports the TRON network and deeply supports its staking mechanisms
3. TronLink Extension now supports EVM networks including Ethereum, BSC, and BTTC
4. Offers seamless access to DApps and smooth on-chain operations

**改版要求**
将 4 条 Bullet 改写为**用户利益声明**：


| 原文（功能描述）                   | 改写方向（利益声明）                                      |
| -------------------------- | ----------------------------------------------- |
| Decentralized self-custody | Your private keys stay on your device — always. |
| Supports TRON staking      | Earn staking rewards directly from your wallet. |
| Supports EVM networks      | Manage TRON, ETH, and BSC assets in one place.  |
| Access to DApps            | One-tap access to DeFi, games, and Web3 apps.   |


规格：每条不超过 12 个英文单词，语气积极，以用户视角表达

**验收标准**

- 4 条 Bullet 全部改写
- 无一条以技术功能为主语

---

### ▌功能区块 · 结构优化

---

#### REQ-10｜功能区块交替左右布局

**所在位置：** 屏 2–5（四个功能屏）
**问题：** 四屏布局完全相同（左文字右插图），视觉疲劳

**改版要求**

- 屏 2（安全）/ 屏 4（资产）：左文字 / 右插图（保持现有）
- 屏 3（网络）/ 屏 5（体验）：**右文字 / 左插图**（镜像翻转）
- 图文各占均等空间，两侧留白适当收窄，让内容更充实

**验收标准**

- 奇偶屏图文位置交替
- 文字区不再感觉被挤压，与插图平衡

---

#### REQ-11｜功能区块内容垂直居中

**所在位置：** 屏 2–5（四个功能屏）
**问题：** 内容集中在屏上方 40–50% 区域，下方约一半面积为空白

**改版要求**

- 内容区（文字 + 插图）在每屏内**垂直居中**，上下留白均衡
- 不再让内容扎堆在屏幕上方，下方大片空白消失

**验收标准**

- 内容在屏幕内视觉上居中
- 下方不再出现大面积空白

---

#### REQ-12｜每个功能区块底部增加次级 CTA

**所在位置：** 屏 2–5 各功能区块文字列底部
**问题：** Playwright 检测确认 dlDetails 链接仅在屏 1 出现，屏 2–5 完全没有安装入口

**改版要求**

- 最后一条 Bullet 下方增加次级 CTA 链接
- 样式：文字链接 + 右箭头，"Install Now →"，低调但可见
- 颜色：品牌蓝，字号略小于正文
- 点击跳转下载页

**验收标准**

- 屏 2–5 各有一个次级 CTA
- 链接跳转正确

---

### ▌功能区块 · 细节优化

> 以下四项针对屏 2–5 的内容细节，在不改变布局结构和插图的前提下，通过文案、间距、样式的精细化打磨提升整体质感。

---

#### REQ-20｜功能区标题文案重写

**所在位置：** 屏 2–5，每屏顶部双行标题
**问题：** 副标签文字（如 "Top-Notch & Full-Coverage"）过长且信息模糊，与主标题的层级引导效果弱

**当前 vs 改写建议**


| 屏      | 当前副标签                     | 当前主标题                      | 建议副标签                   | 建议主标题            |
| ------ | ------------------------- | -------------------------- | ----------------------- | ---------------- |
| 屏 2 安全 | Top-Notch & Full-Coverage | Wallet Security Protection | End-to-End Protection   | Wallet Security  |
| 屏 3 网络 | More Inclusive            | Network Coverage           | Multichain Ready        | Network Coverage |
| 屏 4 资产 | More Secure               | Asset Management           | Your Assets, Your Rules | Asset Management |
| 屏 5 体验 | More Convenient           | User Experience            | Built for Everyone      | User Experience  |


副标签方向（改版后）：

- 字号比现在小一点，不要和主标题抢重量
- 全大写，字间距略宽，有标签感
- 颜色往品牌蓝走，不再是灰色，让它有点睛感而不是注脚感

**验收标准**

- 四屏副标签样式统一，有明显标签感
- 主标题文案按上表或评审后版本更新

---

#### REQ-22｜功能区 Bullet 行高与间距优化

**所在位置：** 屏 2–5，Bullet 列表区域

**当前问题**

- 行高偏紧，折行文字读起来有点憋
- 三条 Bullet 之间没有呼吸感，堆在一起
- 图标和文字靠得有点近

**改版要求**

- 行高适当放开，让折行阅读舒服一些
- 每条 Bullet 之间留出可感知的间距，不要堆叠感
- 图标与文字的间距略微加宽，对齐更整洁
- 图标视觉上可以稍微大一点点，但不要过

**验收标准**

- 行高比现在宽松，折行不觉得挤
- 三条 Bullet 之间有明显的呼吸感
- 图标与文字对齐整洁

---

#### REQ-23｜功能区副标签样式统一（配合 REQ-20）

**所在位置：** 屏 2–5，每屏顶部副标签文字
**问题：** 当前副标签为灰色（约 #999）、字号与正文接近，层级区分度低

**改版要求**
四屏副标签方向一致：字号比现在略小，颜色换成品牌蓝，全大写，字间距略宽，与主标题之间留出稍多一点的空间。整体感觉像一个低调的蓝色小标签，在主标题之前起引导作用，而不是注脚。

**验收标准**

- 四屏副标签样式统一
- 与主标题层级对比明显，一眼能分出先后

---

### ▌Footer

---

#### REQ-13｜Footer 增加安装 CTA 与邮件订阅

**所在位置：** 页面 Footer 及 Footer 前尾部区块
**问题：** 当前 Footer 只有社交图标和版权，是完整的转化断点

**改版要求**

**① Footer 前新增尾部 CTA 区块**

- 深蓝背景，与 Hero 的颜色调性呼应
- 左侧文案："Ready to explore TRON?"
- 右侧：**Install TronLink** 按钮 + Android / iOS / Chrome 图标

**② Footer 本体扩充为多栏布局（3 列）**

- 列 1：产品（Features / Security / Download）
- 列 2：开发者（Developer Docs / TronWeb / Integration）
- 列 3：支持（Help Center / Privacy Policy / Twitter / Telegram）

**③ 邮件订阅（可选）**

- 在尾部 CTA 区块增加邮件输入框："Stay updated → [email input] [Subscribe]"

**验收标准**

- Footer 前有独立尾部 CTA 区块
- Footer 为多栏布局，链接数量 ≥ 8 个

---

### ▌基础质量

---

#### REQ-18｜导航点点击区域扩大

**所在位置：** 左侧 fullpage.js 导航点（Section 指示器）
**问题：** Playwright 实测每个导航点 li 元素尺寸仅 **10×10px**，WCAG 2.5.5 建议最小 44×44px

**改版要求**

- 导航点视觉圆点尺寸不变（8–10px）
- 可点击热区扩大至 **44×44px**（通过 CSS padding 或 ::before 伪元素实现）
- hover 时展示 Tooltip，标注当前屏名称：
  - 点 1：Home · 点 2：Security · 点 3：Network · 点 4：Assets · 点 5：Experience

**验收标准**

- 每个导航点热区 ≥ 44×44px
- hover 有 Tooltip 标注

---

## 五、设计规范（本次不变）

以下元素维持现状，不纳入本次改版范围：


| 元素      | 现状                               |
| ------- | -------------------------------- |
| 品牌主色    | #3C7CF3 品牌蓝                      |
| Hero 背景 | 深蓝渐变（#021C31 → #1B4FD8）          |
| 字体体系    | HelveticaNeue + PingFang SC      |
| Logo    | 现有品牌图标 + 文字                      |
| 页面滚动方式  | fullpage.js 全屏翻页，保留              |
| 功能区插图   | 现有 3D 图形（盾牌/行星/锁/闪电），保留        |
| 导航结构    | AI Support / Developer / Help，保留 |
| 社交链接    | Twitter / Telegram / Email       |
| 多语言切换   | 下拉选择                             |


---

## 六、优先级排序

> P0 = 本次必须完成 · P1 = 强烈建议同期完成 · P2 = 有条件做 · P3 = 后续迭代


| 优先级    | 需求     | 名称                | 预期影响        |
| ------ | ------ | ----------------- | ----------- |
| **P0** | REQ-12 | 功能区块增加次级 CTA      | 直接修复转化断点    |
| **P0** | REQ-13 | Footer 增加安装 CTA   | 补足页面最后的转化出口 |
| **P0** | REQ-05 | 导航首屏显示 Install 按钮 | 全程可见主 CTA   |
| **P1** | REQ-01 | Hero 主标题改写        | 提升用户共鸣感     |
| **P1** | REQ-14 | Hero Bullet 改写    | 提升转化说服力     |
| **P1** | REQ-04 | 增加向下滚动引导          | 降低首屏跳出率     |
| **P1** | REQ-02 | Hero CTA 精简为单一按钮  | 提升按钮点击率     |
| **P2** | REQ-10 | 功能区块交替布局          | 减少视觉疲劳      |
| **P2** | REQ-11 | 功能区块内容垂直居中        | 消除下方大面积空白   |
| **P2** | REQ-20 | 功能区标题文案重写         | 提升标题层级感     |
| **P2** | REQ-22 | Bullet 行高与间距优化    | 提升阅读舒适度     |
| **P2** | REQ-23 | 副标签样式统一           | 提升视觉精致度     |
| **P2** | REQ-06 | 顶部公告条减重           | 视觉层级清晰      |
| **P3** | REQ-18 | 导航点点击区域扩大         | 可访问性合规      |


---

*数据来源：Playwright 自动化检测（2026-04-22）· 视觉截图审查 · MetaMask / Phantom 竞品对比*

*相关文档：`tronlink-homepage-research.md` · `tronlink-ux-optimization.md` · `tronlink-competitor-analysis.md`*