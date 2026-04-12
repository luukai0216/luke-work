# USDD-Figma 文件结构说明

> 说明产品在 Figma 中的文件组织方式，方便新人快速找到所需设计稿。

---

## 文件组织

| Figma 文件 | 内容 | 链接 |
| --- | --- | --- |
| USDD Design System | 组件库 + Token + 样式 + 图标 | https://www.figma.com/design/R2TQ0Ve55k6UHh4K3sBqv7/USDD-Design-System |
| USDD 官网 | 官网所有页面设计（PC + Mobile） | https://www.figma.com/design/ZsstNkZcZL0CJ4TgA7ErvP/USDD_%E5%AE%98%E7%BD%91 |
| USDD APP | APP 所有页面设计（PC + Mobile） | https://www.figma.com/design/aRW7JHtGfisbnpwPeNisfi/USDD_APP |

## Page 命名规范

**USDD Design System** 内 Pages 组织方式：

```
├── 🗂 Overview                    # 封面 / 文件总览
├── 🎨  Color                      # 色彩 Token
├── ✏️  Typography                 # 字体规范
├── 📐  Spacing & Grid             # 间距与栅格
├── 🔲  Border & Radius            # 描边与圆角
├── 🌫  Shadow & Elevation         # 阴影与层级
├── — Components —                 # 分隔线
├── 🔘  Button
├── 📝  Input
├── 🏷  Tag & Badge
├── 🃏  Card
├── 💬  Modal & Dialog
├── 🧭  Navigation & Tab
├── 🦶 Footer
├── 📋  Dropdown
├── 📄  Pagination
├── 🔔  Toast & Notification
├── 💡  Tooltip
├── 📊  Table
├── 📄  Form
├── ⏳  Progress
├── — Patterns —                   # 分隔线
├── 📈  Data Display
├── 🖼  Icons
├── 🗺  Page Patterns
└── 🎨 illustration
```

**USDD 官网** 内 Pages 组织方式：

```
├── Overview                       # 封面
├── Home                           # 首页
├── Data                           # 数据页
├── Smart Allocator                # 智能分配器
├── Treasury                       # 国库
├── FAQs                           # 常见问题
└── NEWs                           # 新闻
```

**USDD APP** 内 Pages 组织方式：

```
├── Overview                       # 封面
├── Header                         # 顶部导航
├── PSM                            # PSM 模块
├── Migrate                        # 迁移
├── Vault                          # 金库
├── Liquidations                   # 清算
├── Collateral Auctions            # 抵押品拍卖
├── Portfolio                      # 资产组合
├── Earn                           # 收益
├── Savings                        # 储蓄
├── Risk Alert                     # 风险提醒
├── ↓ Faucet_已下线                 # 已下线功能（存档）
└── Other                          # 其他
```

## Frame 命名规范

每个 Page 内以 **Section** 为单位组织设计稿，命名规则如下：

```
{模块名}                           # 当前主版本
{模块名}_改版                      # 改版方案（评审中或待上线）
{模块名}_当前线上版本               # 已上线版本存档
{模块名}_增加模块                   # 新增模块的设计方案
{链名}_上线活动                    # 特定链的活动版本（如 BNB Chain_上线活动）
未开发                             # 已设计但尚未开发的方案
{模块名}_已下线                    # 已下线功能存档（Page 名前加 ↓）

示例：
Vault
Vault_改版（未开发）
Migrate_当前线上版本
BNB Chain_上线活动
```

## 


## 

