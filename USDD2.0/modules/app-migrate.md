# 迁移模块 — Migrate

---

## 一、文档元数据

| 字段 | 说明 |
|------|------|
| **项目名称** | USDD 2.0 / Decentralized USD |
| **模块名称** | 迁移 / Migrate |
| **适用链** | Tron（仅限）|
| **关联模块** | PSM（迁移结束后的替代路径：USDDOLD → USDT → USDD）、Wallet（连接后读取 USDDOLD 余额） |
| **外部依赖** | USDDOLD 合约（旧版 USDD 合约）、USDD 新合约、Legacy Site PSM（旧站稳定币兑换） |

> **模块背景**：Migrate 用于将旧版 USDDOLD 以 1:1 比例兑换为新版 USDD。目前直接迁移通道已关闭，用户须通过 2 步替代路径完成转换。

### 截图/原型参考

| 页面 | 截图 | 说明 |
|------|------|------|
| Migrate 主页（迁移已结束） | [tron-main.png](../prototype/screenshots/migrate/tron-main.png) | 当前唯一页面状态，展示 USDD Available + 迁移结束提示 + 替代路径 |

> ⚠️ 待补充：迁移活跃期（Migration Active）的页面截图，目前仅有迁移结束态。

### 设计稿

> 本模块的设计稿统一维护在 [figma-design-index.md](../figma-design-index.md) 的「Migrate 模块」部分。
>
> 开发实现时以设计稿为**视觉标准**，本文档为**功能与逻辑标准**。如二者不一致，以设计稿最新版为准并同步更新本文档。

### 源码索引（供 Dev 参考）

<details>
<summary>点击展开关键文件清单</summary>

> ⚠️ 待补充：本模块为逆向生成，暂无源码路径。前端同学补充后更新此表。

| 类别 | 文件路径 | 说明 |
|------|---------|------|
| 页面 | `src/pages/migrate/` | Migrate 主页面 |
| 业务逻辑 | `src/hooks/useMigrate.ts` | 迁移状态判断、余额读取 |
| 服务层 | `src/services/migrateService.ts` | 合约调用封装 |

</details>

---

## 二、功能清单（Feature Inventory）

| # | 功能名称 | 功能描述 | 入口/触发方式 | 用户角色 | 优先级 | 状态 |
|---|---------|---------|-------------|---------|-------|------|
| F01 | USDD 可用量展示 | 展示当前迁移合约中可供兑换的 USDD 余量 | 进入页面自动加载 | 所有用户 | P0 | 已实现 |
| F02 | 迁移操作面板 | 用户输入 USDDOLD 数量，一键迁移为 USDD（1:1） | 主操作区 | 持有 USDDOLD 的已连接用户 | P0 | 已结束（通道关闭） |
| F03 | 迁移结束提示 & 替代路径引导 | 迁移通道关闭后，展示结束状态 + 2 步替代路径 | 迁移通道关闭后自动展示 | 所有用户 | P0 | 已实现 |
| F04 | FAQ 说明区 | 解答「为何迁移」「USDDOLD 去向」「是否有截止时间」三个核心问题 | 页面右侧，常驻展示 | 所有用户 | P1 | 已实现 |
| F05 | 合约地址入口 | 提供 USDD 和 USDDOLD 的合约查询外链 | 页面底部两个按钮 | 所有用户 | P2 | 已实现 |

---

## 三、功能详细 Spec

---

### F01: USDD 可用量展示

> **截图参考**：[tron-main.png](../prototype/screenshots/migrate/tron-main.png)

#### 用户故事
> 作为**持有 USDDOLD 的用户**，我希望在迁移前看到当前协议可兑换的 USDD 余量，以便确认能否完成迁移。

#### 主流程（Happy Path）
1. 用户进入 `/tron/migrate` 页面
2. 系统展示 **Migrate 主页**，左侧操作区顶部显示：
   - 标签：「USDD Available」
   - 数值：当前合约中剩余可供迁移的 USDD 总量（如 `0`）

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E01-01 | 合约数据加载中 | 显示数据占位态 | 数值显示「--」或骨架屏 |
| E01-02 | USDD Available = 0 | 展示迁移结束状态（见 F03） | 操作区替换为迁移结束提示 |
| E01-03 | 合约数据加载失败 | ⚠️ 待确认：是否有错误提示 | ⚠️ 待确认 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-MIG-01 | USDD Available = 迁移合约中锁定的可兑换 USDD 总量，非用户余额 | 页面加载时从链上读取 | 加载失败显示「--」 |

---

### F02: 迁移操作面板（已结束）

> ⚠️ **注意**：此功能当前已关闭，直接迁移通道不再可用。以下 Spec 描述迁移活跃期的预期行为，供历史归档和后续潜在重开时参考。

#### 用户故事
> 作为**持有 USDDOLD 的用户**，我希望将 USDDOLD 以 1:1 比例直接换成新 USDD，无需任何损耗。

#### 主流程（迁移活跃期 Happy Path）
1. 用户进入 Migrate 页面，已连接 Tron 钱包
2. 操作区展示内容：
   - USDD Available：当前可兑换余量
   - 输入框：输入 USDDOLD 数量 + MAX 按钮 + 余额显示
   - 兑换比例说明：1 USDDOLD = 1 USDD
   - CTA 按钮：「Migrate」（绿色）
3. 用户输入数量，点击「Migrate」
4. 系统唤起钱包签名请求
5. 用户确认，交易上链
6. 迁移完成：USDDOLD 减少，钱包收到等量新 USDD

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-MIG-02 | 迁移比例固定为 1:1，无手续费、无滑点 | 迁移时 | N/A |
| BR-MIG-03 | 迁移数量不得超过用户 USDDOLD 余额 | 点击 Migrate 前 | 按钮置灰 |
| BR-MIG-04 | 迁移数量不得超过合约 USDD Available | 点击 Migrate 前 | 按钮置灰，提示余量不足 |
| BR-MIG-05 | 无迁移截止时间（「There is no fixed deadline」） | 不适用 | N/A |

---

### F03: 迁移结束提示 & 替代路径引导

> **截图参考**：[tron-main.png](../prototype/screenshots/migrate/tron-main.png)

#### 用户故事
> 作为**持有 USDDOLD 的用户**，在直接迁移通道关闭后，我希望看到明确的替代路径，以便仍能将 USDDOLD 转为 USDD。

#### 主流程（Happy Path）

1. 用户进入 Migrate 页面，操作区展示**迁移结束状态**：
   - 橙色警告图标（!）
   - 标题：「USDDOLD Migration Has Ended」
   - 说明文案：「Direct conversion from USDDOLD to USDD is no longer supported.」
   - 副标题：「2-Step Quick Swap for USDDOLD」
   - 替代步骤列表：
     1. 「Swap USDDOLD to USDT on the **Legacy Site PSM**」（「Legacy Site PSM」为可点击链接）
     2. 「Swap USDT to USDD on **Swap(PSM)**」（「Swap(PSM)」为可点击链接，跳转至 App 内 PSM 页面）

#### 分支流程与异常处理

| 场景编号 | 触发条件 | 系统行为 | UI 表现 |
|---------|---------|---------|--------|
| E03-01 | 用户点击「Legacy Site PSM」链接 | 跳转至旧版 USDD 站点的 PSM 页面 | 在新标签页打开 |
| E03-02 | 用户点击「Swap(PSM)」链接 | 跳转至当前 App 的 PSM 模块 | ⚠️ 待确认：新标签页还是当前页跳转 |

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-MIG-06 | 迁移通道关闭后，操作区完全替换为迁移结束提示，不保留任何输入框或操作按钮 | 页面加载时判断迁移状态 | N/A |
| BR-MIG-07 | 替代路径第 1 步（Legacy Site PSM）跳转至外部旧站，第 2 步跳转至 App 内 PSM | 用户点击时 | N/A |

---

### F04: FAQ 说明区

> **截图参考**：[tron-main.png](../prototype/screenshots/migrate/tron-main.png)

#### 用户故事
> 作为**对迁移有疑问的用户**，我希望在页面上直接看到常见问题的解答，无需跳转外部文档。

#### 主流程（Happy Path）

页面右侧常驻展示 FAQ 区域，包含 3 个问答条目（展开/折叠 ⚠️ 待确认，目前看均为展开态）：

| 问题 | 回答 |
|------|------|
| Why is there a migration? | The new USDD migration enhances security, improves decentralization, and introduces community-focused features, creating a stronger and more adaptable stablecoin. |
| What happens to USDDOLD? | Users can easily convert their USDDOLD to the new contract without any loss or disruption, ensuring a seamless transition. |
| Is migration time-limited? | There is no fixed deadline, users can swap at their convenience according to their needs. |

---

### F05: 合约地址入口

#### 用户故事
> 作为**希望核实合约真实性的用户**，我希望直接从 Migrate 页面跳转到链上浏览器查看合约代码，以便自行验证安全性。

#### 主流程（Happy Path）

FAQ 区域下方展示两个外链按钮：
- 「USDD Contracts」+ 外链图标 → 跳转至新版 USDD 合约地址（Tronscan）
- 「USDDOLD Contracts」+ 外链图标 → 跳转至旧版 USDDOLD 合约地址（Tronscan）

#### 业务规则

| 规则编号 | 规则描述 | 校验时机 | 失败处理 |
|---------|---------|---------|---------|
| BR-MIG-08 | 两个合约链接均在新标签页打开 Tronscan | 点击时 | N/A |

---

## 四、模块级总览

### 4.1 页面流程

**当前状态（迁移已结束）：**
- 用户访问 `/tron/migrate`
  - 页面自动加载 USDD Available（当前为 0）
  - 操作区展示**迁移结束状态**（「USDDOLD Migration Has Ended」）
  - 用户查看替代路径：
    - 点击「Legacy Site PSM」→ 新标签页打开旧站 PSM
    - 点击「Swap(PSM)」→ 跳转至 App 内 PSM 页面

**历史状态（迁移活跃期，已归档）：**
- 用户访问 `/tron/migrate`
  - 未连接钱包 → 展示只读态，CTA 显示「Connect Wallet」
  - 已连接钱包 → 展示输入框 + USDDOLD 余额 + Migrate 按钮
    - 输入数量 → 点击 Migrate → 钱包签名 → 完成

### 4.2 模块依赖关系

**本模块仅在 Tron 链可用，无 ETH / BSC 对应页面。**

**与其他模块的关系：**
- **PSM**：迁移结束后的替代路径第 2 步跳转至 PSM；共享钱包连接状态
- **Wallet**：连接态下读取用户 USDDOLD 余额（迁移活跃期）

### 4.3 已知待优化项

| # | 描述 | 影响 | 建议优先级 |
|---|------|------|----------|
| 1 | 迁移结束后导航栏仍保留「Migrate」入口，用户点击后看到的是已结束状态，可能产生困惑 | 用户预期落差 | P2 |
| 2 | 替代路径第 1 步（Legacy Site PSM）跳转至外部旧站，用户可能不信任该链接的安全性 | 信任风险，用户可能放弃操作 | P1 |
| 3 | FAQ 内容为纯文本，无法区分「迁移活跃期」和「迁移结束后」的不同场景，对当前用户实际意义有限 | 信息价值低 | P3 |

### 4.4 迭代建议

| 优先级 | 建议 | 原因 |
|-------|------|------|
| P1 | 替代路径中「Legacy Site PSM」链接旁增加官方认证标注（如「Official」标签），减少用户对外链的信任顾虑 | 降低用户操作中断率 |
| P2 | 迁移结束后，考虑将导航栏「Migrate」入口隐藏或置灰，避免用户无谓点击 | 降低用户困惑 |
| P2 | 为替代路径增加更清晰的视觉引导（如步骤按钮而非纯文本链接），提升可操作性 | 替代路径转化率偏低 |

---

## 质量自检清单

- [x] 主流程步骤描述以用户视角和页面内容为主，无代码级实现描述
- [x] 异常流程覆盖了至少 3 种以上场景（模块较简单，当前功能点有限）
- [x] 业务规则有明确的校验时机和失败处理方式
- [x] 截图有引用，历史状态截图标记为待补充
- [x] 标注了所有不确定的点（⚠️ 待确认）
- [x] 迁移活跃期与已结束状态已显式区分说明
- [x] 待优化项从产品和用户体验角度提出
- [x] 源码索引折叠展示，不干扰产品阅读
