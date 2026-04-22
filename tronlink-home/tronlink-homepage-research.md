# TronLink 官网首页调研报告

**调研时间：** 2026-04-22
**调研网址：** https://www.tronlink.org

---

## 一、这个网站是什么

TronLink 是 **TRON（波场）区块链的官方推荐钱包**，类似于以太坊生态里的 MetaMask。它是一个去中心化的自托管钱包（Self-custody Wallet），意味着用户自己掌控私钥，没有中间机构参与资产管理。

产品形态覆盖：
- **手机 App**（Android / iOS）
- **浏览器插件**（Chrome Web Store）
- **Android APK**（直接安装包）

运营主体：**Helix Tech Company Limited**（注册于 2026）

---

## 二、首页主要表达什么

首页的核心信息只有一件事：**"TronLink 是最值得信任的 TRON 钱包，请安装它。"**

整体内容逻辑是：先用数据建立信任 → 再逐一拆解安全、网络、资产、体验四个维度的能力 → 最终让用户放心下载。

### 品牌数据背书（Hero 区）
| 数据 | 含义 |
|------|------|
| 100,000+ Tokens | 支持代币种类多 |
| 5 Years | 品牌有历史，不是新项目 |
| 200+ Countries | 全球化覆盖 |
| 10,000,000+ Users | 千万用户，规模背书 |

### 四大核心卖点（各占一屏）

**Section 2 — Wallet Security Protection（钱包安全保护）**
- 从环境到交易数据全链路安全防护
- 运行环境多维度安全测试
- 私钥双重加密技术

**Section 3 — Network Coverage（网络覆盖）**
- 深度支持 TRON：TRX、TRC-10、TRC-20、TRC-721 代币及质押机制
- 支持 EVM 异构链：Ethereum、BSC、BTTC
- 多链 HD 钱包结构（一个助记词管理多链资产）

**Section 4 — Asset Management（资产管理）**
- 去中心化本地存储私钥 + 多层算法加密
- 热钱包 / 冷钱包分离，双重保护
- 节点稳定性与自动重连

**Section 5 — User Experience（用户体验）**
- 一键创建 / 导入钱包，支持 Ledger 硬件钱包蓝牙连接
- 多签功能（多账户共同管理一组资产）
- 内置 Web3 浏览器，直接访问 DeFi / 游戏 / 社交 DApp

---

## 三、技术栈

> 注：TronLink 官网是一个**传统前端项目**，没有使用任何现代前端框架。

### 前端核心库

| 库 | 版本 / 说明 |
|----|------------|
| **jQuery** | 3.5.0 — 主要逻辑库 |
| **fullpage.js** | 实现全屏滚动翻页交互 |
| **jquery.qrcode** | 生成下载二维码 |
| **clipboard.min.js** | 一键复制功能 |
| **jquery.toast** | 轻量提示通知 |
| **jquery.confirm** | 弹窗确认组件 |
| **crypto-js** | 前端加密 |
| **rem.js** | 响应式 rem 单位适配 |
| **Bootstrap** | CSS 框架（通过 Glyphicons 图标字体检测到） |

### 数据分析 / 追踪

| 服务 | 说明 |
|------|------|
| Google Analytics 4 | 多个 GA4 实例（G-1B5Z25JBZ5 / G-D5NR1H6STK / G-75NCH26EH8） |
| Google Tag Manager | 事件追踪管理 |
| Universal Analytics | UA-117929022-17（旧版 GA） |

### 字体

- **HelveticaNeue** — 正文主字体（西文）
- **PingFang SC** — 中文字体
- **Avenir** — 部分标题备用字体
- 降级顺序：Arial → Helvetica → sans-serif

### SEO / Social 配置

- 完整 Open Graph 标签（og:title / og:description / og:image）
- Twitter Card 配置（summary 类型）
- Meta description 双语（中文 + 英文）
- Keywords：tronlink / trx wallet / tron wallet

---

## 四、设计风格总结

### 整体风格关键词

> **科技感 · 专业可信 · 沉浸式全屏 · 3D 轻插画**

### 页面结构

首页共 **5 屏**，采用 fullpage.js 的滚动翻页方式，每一屏占满整个视口，像 PPT 一样翻动。

```
屏 1  Hero          蓝色背景  产品截图 + 下载 CTA
屏 2  安全保护       白色背景  3D 盾牌插图
屏 3  网络覆盖       白色背景  3D 行星 / 轨道插图
屏 4  资产管理       白色背景  3D 锁头插图
屏 5  用户体验       白色背景  3D 闪电插图 + Footer
```

### 配色方案

| 色彩 | 色值（近似） | 使用场景 |
|------|-------------|---------|
| 品牌蓝 | `#3C7CF3` | 标题高亮、按钮、图标、强调色 |
| 深海蓝 | `#021C31` / `#1B4FD8` 渐变 | Hero 背景渐变 |
| 纯白 | `#FFFFFF` | Feature sections 背景 |
| 浅灰蓝 | `rgba(60,124,243,0.08)` | 特性页背景纹理、圆形装饰 |
| 橙色点缀 | 橙 / 红渐变 | 局部动效高亮（盾牌、锁头上的小点） |

### 视觉语言

**Hero 区（第 1 屏）**
- 深蓝渐变背景（左深右亮的蓝色）
- 左侧文字区 + 右侧产品 Mockup（手机 + 插件截图叠加）
- 浮动 3D 球体装饰（大蓝球 + 小白球），带轻微阴影，营造空间感
- 底部统计数字用竖线分隔，白色字体

**Feature 区（第 2–5 屏）**
- 纯白背景 + 极淡蓝色几何线条纹理
- 布局：左文字 / 右插图（两栏对称）
- 每个 Section 的右侧都有一个**大型 3D 插画**（盾牌 / 行星 / 锁 / 闪电），风格一致
- 插图风格：渐变蓝色 3D 图标 + 浅灰圆形/线性背景框
- 左侧文字区：灰色小标题（副标题）+ 蓝色加粗主标题
- 每条功能前配一个线条风格蓝色小图标（outline icon）

**导航栏**
- 第 1 屏：透明背景，白色文字（融入 Hero）
- 第 2 屏起：白色背景，深色文字 + 蓝色「Install」按钮（出现在右上角）
- 页面顶部有一条黑色细条提示官网地址（防钓鱼）

**Footer**
- 深蓝色背景（与 Hero 呼应）
- 社交图标：Twitter / Telegram / Email（圆形白色描边按钮）
- 版权：©Helix Tech Company Limited 2026

### 动效特征

- fullpage.js 翻页：垂直滑动，带缓动动画
- 3D 球体有轻微浮动效果（CSS 动画）
- 左侧导航点（竖向小圆点）指示当前所在 Section
- 导航栏 Install 按钮在离开第 1 屏后出现（滚动触发显现）

---

## 五、总结

TronLink 官网首页是一个**目标非常明确的产品落地页**，所有设计决策都服务于一个转化目标：让用户信任并下载这个钱包。

设计风格介于 **Web3 科技品牌** 和 **传统金融产品** 之间——既有蓝色渐变、3D 插图这些 Web3 常见视觉语言，又保持了克制简洁的排版，不像某些加密项目那样过度华丽。

从技术角度看，它用的是 jQuery + fullpage.js 这套老牌组合，没有现代框架，说明这是一个**维护已久、技术债较重的项目**，但对于纯展示型落地页来说，功能上完全够用。
