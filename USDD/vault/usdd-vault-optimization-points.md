# USDD Vault 优化点

**审计页面**：[https://app.usdd.io/tron/](https://app.usdd.io/tron/) + /tron/vault?token=TRX-A
**审计日期**：2026-04-13
**审计视口**：1920px · 1440px · 768px · 390px
**分析方式**：Playwright 自动化截图 + DOM/CSS 分析 + 运行时状态检测

---

## 问题列表

---

### 问题 01：骨架屏使用不统一，各区块缺少独立占位

- **位置**：All Vaults 列表页 + Vault 详情页全区域
- **问题描述**：页面已引入 Ant Design 骨架屏组件，但实际挂载情况不一致——部分区块有占位动画，部分区块数据到达前直接空白，缺少统一的加载反馈规范。
- **技术证据**：
  - CSS keyframe `ant-skeleton-loading` 已定义在样式表中 ✓
  - 扫描全页 DOM：`.ant-skeleton` 元素数量 = **0**
  - 唯一的加载容器 `ant-spin-nested-loading` 内部 `.ant-spin` 元素在数据返回前**从不挂载**

```
实际加载时序（问题）：页面空白 → 数据直接渲染（无过渡）

理想加载时序：页面框架 → Skeleton 骨架行（3-4 行）→ 数据渲染完成 → 骨架淡出
```

- **影响**：网络慢时用户面对空白区域无法判断页面状态，容易误判页面崩溃，跳出率上升。
- **优化建议**：按区块拆分骨架屏，各区域独立加载、独立占位：

```
列表页骨架屏分区：
┌─────────────────────────────────────────┐
│ [████ Hero 文字占位 ████████████████]   │
├─────────────────────────────────────────┤
│ [▓▓▓▓▓▓] [▓▓▓▓▓▓▓▓▓▓] [▓▓▓] [▓▓▓] [▓] │ ← 表头行
│ [▓▓▓▓▓▓] [▓▓▓▓▓▓▓▓▓▓] [▓▓▓] [▓▓▓] [▓] │ ← 数据行 ×4
│ [▓▓▓▓▓▓] [▓▓▓▓▓▓▓▓▓▓] [▓▓▓] [▓▓▓] [▓] │
└─────────────────────────────────────────┘

详情页骨架屏分区：
┌──────────────┬──────────────────────────┐
│ 左侧资产列表  │ 顶部参数卡片（4格）       │
│ [▓▓▓▓▓▓]    │ [▓▓▓][▓▓▓][▓▓▓][▓▓▓]    │
│ [▓▓▓▓▓▓]    ├──────────────────────────┤
│ [▓▓▓▓▓▓]    │ 输入区 [▓▓▓▓▓▓▓▓▓▓▓]    │
│              ├──────────────────────────┤
│              │ My Position              │
│              │ [▓▓▓▓] [▓▓▓▓] [▓▓▓▓]   │
└──────────────┴──────────────────────────┘
```

各区域骨架屏独立响应数据到达，优先渲染完成的部分，避免整页等待。

---

### 问题 02：名词解释 info icon 交互方式不统一，应改为下划线 + Hover Tooltip

- **位置**：All Vaults 表格列标题（USDD Limit、Min. Collateral Ratio、Stability Fee、Dust Limit）；Vault 详情页左侧参数列表同类标签
- **问题描述**：当前名词解释统一使用 `ⓘ` 图标，鼠标 hover 触发 Tooltip。规则需调整为：
  - **列表页 / 详情页参数区的名词标签**：去掉 icon，改为对术语文字加虚线下划线（`border-bottom: 1px dashed`），鼠标移入显示 Tooltip
  - **Vault 详情页顶部数据卡片区**（Stability Fee / Liquidation Fee / Min. Collateral Ratio / Dust Limit 四项）：保留现有 `ⓘ` icon，不做改动
- **影响**：图标与文字并排时视觉噪音较多；下划线暗示「可查看解释」的交互更符合 Web 通用认知，且不占额外空间。

```
交互规则：
列表页表头 / 详情页参数区  →  文字下划线 + hover Tooltip  （去掉 icon）
详情页顶部四项数据卡片     →  保留 ⓘ icon，不变
```

---

### 问题 03：ETH 链 Vault 新手引导缺失，链图标未随链切换更新

- **位置**：Vault 详情页左侧「Welcome to USDD」引导区；导航栏 / 链标识区域
- **问题描述**：
  1. 当前 Vault 引导步骤（Choose a Collateral → Deposit Collateral → Mint USDD → Monitor Your Position）中的图示和文案均以 TRON 链为背景，未针对 ETH 链做差异化处理。新上线的 ETH 链 Vault 进入后显示的引导与 TRON 完全相同，包括链图标仍为 TRON logo。
  2. 链图标应随当前链环境切换：TRON 链显示 TRX logo，ETH 链显示 ETH logo。
- **影响**：ETH 链用户看到 TRON logo 会产生「是否走错链」的疑虑，降低信任感；引导步骤中若出现与 ETH 不符的操作细节（如 Gas 费、钱包类型），会直接造成操作错误。
- **优化建议**：
  - 引导区的链图标、钱包说明、Gas 费描述根据当前 URL（`/tron/` 或 `/eth/`）动态切换
  - ETH 链引导中将链图标替换为 ETH logo，钱包建议改为 MetaMask / WalletConnect

```
/tron/vault  →  引导图标：TRX logo，钱包：TronLink
/eth/vault   →  引导图标：ETH logo，钱包：MetaMask / WalletConnect
```

---

### 问题 04：详情页左侧 All Assets 列表缺少滚动条

- **位置**：Vault 详情页 → 左侧 All Assets 资产列表
- **问题描述**：左侧 Vault 列表（TRX-A / TRX-B / TRX-C / USDT-A / sTRX-A / WBTC-A / WBTC-B 共 7 条）在视口高度不足时会被截断，且无任何滚动条或滚动提示，用户无法感知下方还有更多选项。
- **影响**：用户只能看到视口内的 Vault 选项，无法发现被截断的条目，选择覆盖不全；随着后续链增加更多 Vault，问题会进一步放大。
- **优化建议**：

```css
/* 左侧资产列表容器 */
.all-assets-list {
  overflow-y: auto;
  max-height: calc(100vh - 180px); /* 减去导航栏和顶部信息高度 */
  scrollbar-width: thin;           /* Firefox */
  scrollbar-color: rgba(255,255,255,0.2) transparent;
}

/* Webkit 滚动条样式 */
.all-assets-list::-webkit-scrollbar { width: 4px; }
.all-assets-list::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 2px;
}
```

滚动条建议采用细线样式（4px），与深色背景融合，仅在 hover 时加深显示，避免视觉干扰。

---

*报告由 Claude Code + Playwright 自动化审计生成*