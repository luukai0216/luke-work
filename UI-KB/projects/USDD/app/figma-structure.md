# USDD · App — Figma 文件结构规范

> 最后更新：2026-04-16

## 文件组织

### USDD_APP（`aRW7JHtGfisbnpwPeNisfi`）

```
USDD_APP
├── Overview                   # 封面 + 文件索引
├── Header                     # 顶部导航组件
├── PSM                        # Peg Stability Module
├── Migrate                    # 迁移
├── Vault                      # 金库（ETH / TRX / BTC 等）
├── app-eth+vault              # ETH Vault 备用（空）
├── Liquidations               # 清算
├── Collateral Auctions        # 抵押品拍卖
├── Portfolio                  # 投资组合
├── Earn                       # 收益
├── Savings                    # 储蓄
├── Risk Alert                 # 风险提示
├── → Points_暂未上线          # 积分（未发布）
├── ↓ Faucet_已下线            # 水龙头（已下线）
└── Other                      # 其他
```

## 命名约定

| 层级 | 规则 | 示例 |
| --- | --- | --- |
| Page | 功能模块名，首字母大写 | `Vault`、`Earn` |
| 前缀 `→` | 设计完成但暂未上线 | `→ Points_暂未上线` |
| 前缀 `↓` | 已下线功能，仅供参考 | `↓ Faucet_已下线` |
| Frame | 描述性命名，Desktop/Mobile 用 `/` 区分 | `Vault/Desktop`、`Vault/Mobile` |

## Header 组件层级（`Header` 页面）

| 组件名 | 类型 | 尺寸 | 用途 |
| --- | --- | --- | --- |
| `App-nav/Dark` | Component Set | 1960×220px | App 桌面端顶栏（含子菜单） |
| `App-nav_M-new` | Component Set | 430×204px | App 移动端顶栏 |
| `.menu/Dark` | Component Set | 158×160px | 导航子菜单项 |
| `.Risk/Dark` | Component Set | 80×160px | 风险指标组件 |
| `.set/Dark` | Component Set | 80×160px | 设置组件 |
