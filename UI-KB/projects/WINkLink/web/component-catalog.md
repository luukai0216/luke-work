# WINkLink 官网 · 组件 Catalog

> 来源：`design-spec.md` · 提取日期：2026-04-09
> 视口：1440px Desktop | 深海军蓝底 + 品牌黄强调

---

## 使用规则

1. **颜色只使用** design-spec.md 中定义的 Token
2. 所有组件视觉按本 catalog 实现，不得自创风格
3. 生成输出须附**组件使用清单**
4. 找不到合适组件须标注 **"catalog 缺失"**

---

## 01 · Button 按钮

| 变体 | 背景 | 文字 | 圆角 |
|------|------|------|------|
| `Primary Default` | `#F5C100` | `#080E1C` | 50px |
| `Primary Hover` | `#FFD000` + scale(1.02) | `#080E1C` | 50px |
| `Primary Disabled` | `#F5C100` opacity 35% | — | 50px |
| `Secondary Default` | `#131E33` + border `#1E3050` | `#FFFFFF` | 50px |
| `Secondary Hover` | border → `#F5C100`，文字 → `#F5C100` | — | 50px |
| `Ghost / Text` | 无背景无边框 | `#F5C100` | — |

**尺寸：**

| 尺寸 | 高度 | 字号 | 内边距 |
|------|------|------|--------|
| Large | 52px | 18px | 0 32px |
| Default | 44px | 16px | 0 24px |
| Small | 36px | 14px | 0 16px |
| XSmall | 28px | 12px | 0 12px |

**状态规则：** Hover scale(1.02) + yellow glow；Active scale(0.98)；Focus outline `2px solid #F5C100`

---

## 02 · 导航栏（NavBar）

| 属性 | 值 |
|------|-----|
| 高度 | 64px（sticky） |
| 背景 | `#080E1C` + `backdrop-filter: blur(12px)` |
| Logo | **WIN**（`#F5C100`）+ **kLink**（`#FFFFFF`），Inter Bold 18px |
| 链接文字 | Inter Medium 14px，默认 `#8899B2` |
| Hover/Active | `#F5C100` + 2px 黄色底部线 |
| CTA | Primary Button（黄底深色字，胶囊，约 120×36px） |

---

## 03 · Card 卡片

| 类型 | 尺寸 | 圆角 | 边框 | Hover |
|------|------|------|------|-------|
| Feature Card | 280×220px+ | 16px | `#1E3050` | translateY(-4px) + 边框 `#F5C100` |
| Stats Card | 240×96px | 12px | `#1E3050` | yellow glow 阴影 |
| Highlight Card | 280×220px+ | 20px | `#F5C100` | — |
| Data Row Card | 400×56px | 8px | `#162340` | 背景加深 |

- Feature Card 内边距：24px；Stats Card 内边距：20px 24px
- Hover 动效：250ms ease-out

---

## 04 · Table 数据表格

| 属性 | 值 |
|------|-----|
| 容器背景 | `#131E33`，圆角 12px |
| 表头背景 | `#1A2744`，高度 48px |
| 表头文字 | Inter SemiBold 13px，`#8899B2` |
| 数据行高 | 48px |
| Pair 列文字 | `#FFFFFF` |
| 其余列文字 | `#8899B2` |
| 交替行背景 | `#131E33` / `#0F1828` |
| Action 按钮 | 文字 `#F5C100`，背景 `rgba(245,193,0,.15)`，圆角 6px |

---

## 05 · Badge / Tag 标签

| 变体 | 背景 | 文字 | 用途 |
|------|------|------|------|
| Brand | `rgba(245,193,0,.15)` | `#F5C100` | 品牌/生态标签 |
| New | `#F5C100` | `#080E1C` | 新功能 |
| Success | `rgba(2,192,118,.15)` | `#02C076` | 成功状态 |
| Warning | `rgba(240,165,0,.15)` | `#F0A500` | 警告 |
| Error | `rgba(246,70,93,.15)` | `#F6465D` | 错误 |
| Info | `rgba(74,144,217,.15)` | `#4A90D9` | 信息 |
| Neutral | `#1A2744` | `#8899B2` | 中性 |

- 高度：SM 20px / MD 24px / LG 28px，内边距：0 8px ~ 0 12px，圆角 4px

---

## 06 · Footer 页脚

- 背景：`#080E1C`（最深色）
- 顶部分割线：`1px solid rgba(255,255,255,.08)`
- Logo + 链接列 + 社交图标 + 版权

---

## 附：组件选择决策树

```
用户行动引导？
├── 主要操作 → Button Primary（黄底，50px 圆角）
├── 次要操作 → Button Secondary（深底）
└── 文字链接 → Ghost/Text Button（黄色文字）

展示数据卡片？
├── 统计指标 → Stats Card（240×96px，12px 圆角）
├── 功能介绍 → Feature Card（16px 圆角，hover 上移+黄色边框）
└── 高亮内容 → Highlight Card（20px 圆角，黄色边框）

列表数据？
└── 价格/数据表 → Table（#131E33 底，48px 行高）

状态标注？
├── 新功能 → New Badge（黄底深字）
├── 品牌关联 → Brand Badge（黄色文字）
└── 其他状态 → 对应语义 Badge

页面框架？
├── 顶部 → NavBar（64px sticky，blur 背景）
└── 底部 → Footer（#080E1C 背景）
```
