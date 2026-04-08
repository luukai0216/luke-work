# Treasury 页 — Treasury Page

---

## 一、文档元数据

| 字段 | 说明 |
| --- | --- |
| **项目名称** | USDD 官网（usdd.io） |
| **模块名称** | Treasury 页 / Treasury Page |
| **页面路径** | `/treasury` |
| **关联模块** | 全局导航栏（Transparency 下拉菜单）、Smart Allocator 页 |
| **外部依赖** | JUST Lend 外部 API（JST 销毁数据来源）；Redis 缓存服务（后端缓存层） |

### 截图/原型参考

| 页面区块 | 截图 | 说明 |
| --- | --- | --- |
| Banner 区块 | ⚠️ 待补充 | 页面顶部标题 + 描述 + 横幅图 |
| Key Financial Metrics | ⚠️ 待补充 | 财务数据卡片列表（折叠态 + 展开态） |
| JST Buyback & Burn | ⚠️ 待补充 | 三张指标卡 + 说明文案 |

### 设计稿

> 本模块的设计稿统一维护在 [figma-design-index.md](./../figma-design-index.md) 的「Treasury 页」部分。
>
> 开发实现时以设计稿为**视觉标准**，本文档为**功能与逻辑标准**。如二者不一致，以设计稿最新版为准并同步更新本文档。

### 源码索引（供 Dev 参考）

<details>
<summary>点击展开关键文件清单</summary>

| 类别 | 文件路径 | 说明 |
|------|---------|------|
| 页面主组件 | `src/pages/Treasury/index.tsx` | Treasury 页面完整实现，含三个 Section 和 Item 子组件 |
| 页面样式 | `src/pages/Treasury/index.scss` | Treasury 页面全部样式，含 PC/Mobile 响应式 |
| 静态财务数据 | `src/pages/Treasury/data.json` | 各年度季度财务数据（Revenue、Expenditure、JST Buyback） |
| API 调用层 | `src/network/treasury/index.ts` | 封装 getJstBurnedInfo() 调用后端接口 |
| 路由配置 | `src/App.tsx` | `<Route path="/treasury" element={<Treasury />} />` |
| 导航菜单 | `src/components/Header/index.tsx` | Transparency 下拉中的「USDD Treasury」入口 |
| 后端控制器 | `src/main/java/org/tron/defi/web/DataPlatformController.java` | 提供 `/data-platform/treasury/jst-burned-info` 端点 |
| 后端缓存服务 | `src/main/java/org/tron/defi/service/impl/RedisCacheServiceImpl.java` | Redis 缓存 + 异步更新 + JUST Lend API 调用 |
</details>

---

## 二、功能清单（Feature Inventory）

| # | 功能名称 | 功能描述 | 入口/触发方式 | 用户角色 | 优先级 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| F01 | Banner 区块 | 展示页面标题「USDD Treasury Dashboard」、介绍文案及横幅图片 | 访问 /treasury 页面时直接呈现 | 访客 | P1 | 已实现 |
| F02 | Key Financial Metrics 财务指标 | 展示 USDD Treasury 各年度季度的收入、支出、净利润、余额汇总，支持展开查看明细 | 页面加载时自动展示；点击展开/收起按钮切换详情 | 访客 / 投资人 | P0 | 已实现 |
| F03 | JST Buyback & Burn 销毁区块 | 展示 JST 总销毁金额、通过 USDD 收入销毁金额、销毁记录条数，并说明回购销毁机制 | 页面滚动至该区块；数据于页面加载时自动请求 | 访客 / 投资人 | P0 | 已实现 |

---

## 三、功能详细 Spec

### F01：Banner 区块

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**访客**，我希望进入 Treasury 页时立刻了解这个页面的主题与价值，以便决定是否继续阅读。

#### 前置条件
- 用户访问 `usdd.io/treasury`，浏览器 JavaScript 正常加载。

#### 主流程（Happy Path）
1. 用户打开 `/treasury` 页面。
2. 系统展示 **Banner 区块**，包含以下内容：
  - **主标题**：「USDD Treasury Dashboard」（绿色渐变大字）；
  - **介绍文案**：描述 Treasury Dashboard 的用途，说明财务透明度与生态计划（PC 端完整展示；Mobile 端截断，底部展示「Read More」按钮）；
  - **横幅图片**：PC 端显示 `banner-image-pc.png`，Mobile 端显示 `banner-image-mobile.png`（纯展示，无交互）；
  - **背景装饰**：PC 端显示网格点背景图（`HeaderBg` 组件），Mobile 端不显示。
3. 用户在 Mobile 端点击「Read More」，系统展开完整介绍文案。
4. 页面继续向下渲染 Key Financial Metrics 区块。

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E01-01 | JavaScript 未启用 | 页面无法渲染 | 显示「You need to enable JavaScript to run this app」 |
| E01-02 | 横幅图片资源加载失败 | 图片区域空白 | 不影响标题和文案展示 |
| E01-03 | Mobile 端用户点击「Read More」 | 文案展开为完整内容 | 按钮消失，完整文案显示 |
| E01-04 | PC 端访问 | 背景网格装饰正常展示 | 与 Mobile 端布局不同 |
| E01-05 | 移动端窄屏访问 | 布局响应式调整 | 标题文字换行，图片切换为 Mobile 版本 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F01-01 | Banner 区块为纯静态内容，无数据接口依赖 | 不适用 | 不适用 |
| BR-F01-02 | Mobile 端文案默认折叠，点击「Read More」展开；PC 端文案始终完整展示 | 渲染时根据屏幕宽度判断 | 不适用 |

---

### F02：Key Financial Metrics 财务指标

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**投资人或审计人员**，我希望查看 USDD Treasury 各季度的收入、支出与净利润明细，以便评估 USDD 的财务健康状况和透明度。

#### 前置条件
- 页面静态财务数据（`data.json`）正常加载。

#### 主流程（Happy Path）
1. 用户进入页面，系统加载静态财务数据并渲染 **Key Financial Metrics 区块**，包含：
  - **区块标题**：「USDD Key Financial Metrics」（⚠️ 需确认文案）；
  - **Total Treasury Balance (USD)**：展示所有季度净利润的累计总和（大字突出显示，绿色渐变）。
2. 系统按年度季度从新到旧（倒序）排列财务卡片，当前包含：
  - 2025 年 Q1–Q3 卡片
  - 2025 年 Q4 卡片
3. 每张卡片默认显示**摘要行（Summary）**，包含：
  - USDD Logo + 年份 + 季度范围徽章（如「Q1-Q3」）；
  - 四项财务指标：**Revenue (USD)**、**Expenditure (USD)**、**Profit and Loss (USD)**、**Treasury Balance (USD)**；
  - 右侧「展开」箭头按钮（↓）。
4. 用户点击卡片的展开按钮，系统展开**详细数据表格（Details）**，包含：
  - **Revenue 收入明细**：
    - Interest Revenues（利息收入）
    - Smart Allocator Investments（智能分配器投资收益）
    - Liquidations Revenues（清算收入）
    - Total（合计）
  - **Expenditure 支出明细**：
    - Third Party Expenses（第三方费用）
    - Mining Expenses（挖矿费用，备注「Subsidized by TRON DAO」）
    - Operating Expenses（运营费用）
    - Total（合计，**不含** Mining Expenses）
  - **Profit and Loss**：Revenue Total − Expenditure Total（不含 Mining Expenses）
  - **JST Buyback**：JST 回购销毁金额明细（来源：data.json 中 jstBuyback 字段）
  - **Treasury Balance**：本季度净利润（即 P&L 值）
5. 用户点击收起按钮（↑），详细表格折叠，卡片回到摘要状态。

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E02-01 | 静态 data.json 加载失败 | 无数据可渲染 | ⚠️ 需确认：是否有错误提示或空状态展示 |
| E02-02 | 某季度所有收入项均为 0 | 正常展示，Revenue 合计显示 $0 | 不隐藏该卡片 |
| E02-03 | 某季度无 jstBuyback 数据 | JST Buyback 行不展示（字段为空时跳过） | 详情表格中无 JST Buyback 行 |
| E02-04 | 用户连续点击展开/收起 | 切换展开折叠状态 | 箭头图标随状态切换（↓ / ↑） |
| E02-05 | Mining Expenses 计算排除 | Expenditure Total 和 P&L 均不含 Mining Expenses | Mining Expenses 行仅展示数字，不计入合计 |
| E02-06 | Treasury Balance 累计计算 | Total Treasury Balance = 所有季度 P&L 之和 | 顶部大字展示累计余额 |
| E02-07 | 移动端展示 | 卡片单列竖向堆叠 | 各数字完整显示，不截断 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F02-01 | 财务数据来源为静态文件 `data.json`，不调用实时接口 | 页面加载时 | data.json 加载失败时无数据展示 |
| BR-F02-02 | Revenue = 所有收入项（Interest + Smart Allocator + Liquidations）之和 | 渲染时计算 | 计算异常时显示「--」 |
| BR-F02-03 | Expenditure = Third Party Expenses + Operating Expenses（**不含** Mining Expenses） | 渲染时计算 | 计算异常时显示「--」 |
| BR-F02-04 | Profit and Loss = Revenue − Expenditure | 渲染时计算 | 计算异常时显示「--」 |
| BR-F02-05 | Treasury Balance（卡片级）= 本季度 P&L | 渲染时计算 | 计算异常时显示「--」 |
| BR-F02-06 | Total Treasury Balance（页面顶部）= 所有季度 P&L 的累计总和 | 渲染时计算 | 计算异常时显示「--」 |
| BR-F02-07 | Mining Expenses 单独展示但不计入 Expenditure 合计，其备注文案为「Subsidized by TRON DAO」 | 渲染时 | 不适用 |
| BR-F02-08 | 所有金额使用 BigNumber.js 精确计算，避免浮点误差；展示时格式化为千分位带美元符号（如 $4,721,734） | 渲染时 | 格式化失败时显示原始数值 |
| BR-F02-09 | 卡片排列顺序为倒序（最新季度在最上方） | 渲染时对数组进行 reverse() | 不适用 |

---

### F03：JST Buyback & Burn 销毁区块

> **截图参考**：⚠️ 待补充

#### 用户故事
> 作为**投资人或代币持有者**，我希望看到 JST 的销毁数据和回购机制说明，以便了解 USDD 收益如何回馈生态并影响 JST 代币价值。

#### 前置条件
- 页面 JavaScript 正常加载。
- 后端 API 可正常连接（或 Redis 中有有效缓存）。

#### 主流程（Happy Path）
1. 用户进入页面，系统自动请求 JST 销毁数据，并展示 **JST Buyback & Burn 区块**，包含：
  - **区块标题**：「JST Buyback & Burn」；
  - **区块描述**：「The JST buyback and burn program is directly tied to USDD revenues.」
2. 系统展示**三张指标卡片**（横向排列，Mobile 端竖向堆叠）：
  - **Total JST Burned**（JST 总销毁金额）
    - 图标：total-jst-burned.svg
    - 数值：来自后端 API，`totalBurnedUsd` 字段，格式为 `$XXX,XXX.XX`
    - 「Details」链接：点击在新标签页跳转至 JUST Lend Grants DAO 页面
  - **JST Burned via USDD Revenues**（通过 USDD 收入销毁的 JST）
    - 图标：jst-burned-via-usdd-revenues.svg
    - 数值：来自 `data.json` 中各季度 jstBuyback 数据的累计总和，格式为 `$XXX,XXX.XX`
    - 无跳转链接
  - **Burning Records**（销毁记录条数）
    - 图标：burning-records.svg
    - 数值：来自后端 API，`burnedCount` 字段，展示整数条数
    - 「Details」链接：点击在新标签页跳转至 JUST Lend Grants DAO 页面
3. 用户点击「Details」链接，系统在新标签页打开 JUST Lend Grants DAO 页面。
4. 系统在指标卡下方展示**回购机制说明**（三条要点说明），描述：
  - 回购资金来源（USDD Treasury 收益）
  - 数据公开透明（链上可查）
  - 对 JST 代币经济学的影响

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
| --- | --- | --- | --- |
| E03-01 | 页面加载时 Redis 缓存为空，后端同步调用外部 API | 等待外部 API 返回后展示数据 | Total JST Burned 和 Burning Records 显示加载态或「--」 |
| E03-02 | Redis 缓存存在但已超过 1 小时（过期） | 返回旧缓存数据，异步触发后端更新 | 展示上一次缓存数据，用户无感知 |
| E03-03 | 后端 API 请求超时或失败 | 数据无法获取 | Total JST Burned 和 Burning Records 显示「--」，JST Burned via USDD Revenues 不受影响（数据来自 data.json） |
| E03-04 | JUST Lend 外部 API 不可用 | 后端缓存未更新，返回最后一次有效缓存 | 展示旧数据，无明确「数据未更新」提示（⚠️ 需确认是否添加提示） |
| E03-05 | burnedCount 为 0（无销毁记录） | 正常展示 0 | Burning Records: 0，不隐藏卡片 |
| E03-06 | totalBurnedUsd 为 0 | 正常展示 $0.00 | Total JST Burned 卡片显示 $0.00 |
| E03-07 | 用户点击「Details」链接 | 在新标签页打开 JUST Lend Grants DAO 页面 | 当前页面无跳转，不刷新 |
| E03-08 | 移动端展示 | 三张卡片竖向堆叠展示 | 卡片全宽，数字完整显示不截断 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
| --- | --- | --- | --- |
| BR-F03-01 | Total JST Burned = 后端 API 返回的 `totalBurnedUsd`，数据来源为 JUST Lend，后端以 BigNumber 精度返回 | 页面加载时请求 API | 请求失败时显示「--」 |
| BR-F03-02 | JST Burned via USDD Revenues = data.json 中所有季度 jstBuyback 数据的累计总和 | 渲染时本地计算 | 计算失败时显示「--」 |
| BR-F03-03 | Burning Records = 后端 API 返回的 `burnedCount`，整数 | 页面加载时请求 API | 请求失败时显示「--」 |
| BR-F03-04 | 「Details」链接在新标签页打开（target="_blank"） | 用户点击时 | 不适用 |
| BR-F03-05 | 后端 API 数据缓存于 Redis，TTL 为 1 小时；缓存过期时异步刷新，不阻塞前端请求 | 每次 API 请求时 | 缓存失效时降级返回旧数据 |
| BR-F03-06 | 金额字段使用 BigNumber.js 计算，展示时格式化为千分位带美元符号 | 渲染时 | 格式化失败时展示原始字符串 |

#### 数据依赖与接口清单

| 接口名称 | 请求方式 | 端点 | 主要参数 | 返回内容 | 调用时机 | 缓存策略 |
| --- | --- | --- | --- | --- | --- | --- |
| 获取 JST 销毁信息 | GET | `/data-platform/treasury/jst-burned-info` | 无 | `{ burnedCount: number, totalBurnedUsd: BigNumber }` | 页面初始化（useEffect） | 后端 Redis 缓存 TTL 1 小时；前端无本地缓存 |

---

## 四、模块级总览

### 4.1 页面流程

**访问入口：**
- 用户直接访问 `usdd.io/treasury`
- 或通过全局导航栏「Transparency」下拉菜单中的「USDD Treasury」入口进入（描述：「Reserve and treasury data」）

**页面内浏览流程：**
- 进入页面 → **Banner 区块**（标题「USDD Treasury Dashboard」+ 介绍文案 + 横幅图）
  - Mobile 端：文案默认折叠 → 点击「Read More」展开
  → 向下滚动 → **Key Financial Metrics 区块**（Total Treasury Balance + 各季度财务卡片）
    - 点击卡片「展开」按钮 → 展示 Revenue / Expenditure / P&L / JST Buyback / Treasury Balance 明细表
    - 点击「收起」按钮 → 折叠回摘要状态
  → 向下滚动 → **JST Buyback & Burn 区块**（三张指标卡 + 回购机制说明）
    - 点击「Details」链接 → 新标签页打开 JUST Lend Grants DAO 页面

**数据加载流程：**
- 页面加载时自动请求 `/data-platform/treasury/jst-burned-info`
  → 后端查 Redis 缓存 → 命中则返回；未命中或过期则调用 JUST Lend API 后返回
  → 前端更新 Total JST Burned 和 Burning Records 显示值
- Key Financial Metrics 数据来自静态 `data.json`，无网络请求

### 4.2 模块依赖关系

**本模块包含 3 个功能区块：**

1. **Banner 区块**：纯静态内容，无数据依赖，Mobile/PC 响应式布局。
2. **Key Financial Metrics**：数据完全来自静态文件 `data.json`，前端本地计算所有财务指标，无接口依赖。
3. **JST Buyback & Burn**：Total JST Burned 和 Burning Records 依赖后端实时 API；JST Burned via USDD Revenues 来自 data.json 本地计算。

**与其他模块的关系：**
- **全局导航栏**：在「Transparency」下拉菜单中提供 Treasury 入口，点击埋点事件为 `data_click / header_treasury`；
- **Smart Allocator 页**：同属 Transparency 系列页面，数据源不同，用户路径相邻；
- **JUST Lend**（外部）：JST 销毁数据的上游数据源，由后端 RedisCacheServiceImpl 调用其 `/jst/burn/dashboard` 接口获取。

### 4.3 已知待优化项

| # | 描述 | 影响 | 建议优先级 |
| --- | --- | --- | --- |
| 1 | 财务数据存储在静态 `data.json` 中，新增季度数据需要前端发版才能更新 | 每次更新财务数据都需要走发布流程，运营效率低 | P1 |
| 2 | JST 销毁数据缓存 1 小时，用户看到旧数据时无时效性说明（无「最后更新时间」展示） | 投资人无法判断数据是否实时，影响可信度 | P2 |
| 3 | Mining Expenses 不计入 Expenditure 合计，但该规则未在页面上向用户说明，仅靠「Subsidized by TRON DAO」备注提示 | 用户可能对支出合计与各行数字不符感到困惑 | P2 |
| 4 | 当前 data.json 仅有 2025 年数据，历史年度数据（2024 年及之前）缺失，页面信息完整性不足 | 投资人无法查看完整财务历史，影响分析价值 | P1 |
| 5 | Mobile 端三张 JST 指标卡竖向堆叠，需验证实际展示效果是否清晰 | 移动端用户需要更多滚动，体验待验证 | P2 |

### 4.4 迭代建议

| 优先级 | 建议 | 原因 |
| --- | --- | --- |
| P1 | 将财务数据迁移至后端 CMS 或数据库，支持运营直接更新，无需前端发版 | 当前 data.json 每次新增季度数据都需走完整发布流程，效率低 |
| P1 | 补充历史年度财务数据（2024 年及以前各季度） | 页面当前仅有 2025 年数据，历史透明度不足 |
| P2 | 在 JST 指标卡增加「数据更新时间」标注 | 提升数据可信度，缓解投资人对时效性的疑虑 |
| P2 | 在 Expenditure 合计旁增加说明：「不含 Mining Expenses（由 TRON DAO 补贴）」 | 消除用户对数字不符的困惑，提升数据可读性 |

---

## 质量自检清单

- [x] 主流程步骤描述以用户视角和页面内容为主，无代码级实现描述
- [x] 异常流程覆盖了至少 5 种以上场景（F01 覆盖 5 条，F02 覆盖 7 条，F03 覆盖 8 条）
- [x] 业务规则有明确的校验时机和失败处理方式
- [ ] 截图/设计稿有引用 — ⚠️ 所有截图均标注为「待补充」，需补充页面截图
- [x] 标注了所有不确定的点（⚠️ 需确认）
- [x] 待优化项从产品和用户体验角度提出
- [x] 源码索引折叠展示，不干扰产品阅读
