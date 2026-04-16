# USDD · Web — Figma 文件结构规范

> 最后更新：2026-04-16

## 文件组织

### USDD_Web（`ZsstNkZcZL0CJ4TgA7ErvP`）

```
USDD_Web
├── Overview          # 封面 + 文件索引
├── Home              # 官网首页（含多状态帧）
├── Data              # 数据看板
├── Smart Allocator   # 智能配置器
├── Treasury          # 国库
├── FAQs              # 常见问题
└── NEWs              # 新闻 / 公告
```

### USDD Design System（`R2TQ0Ve55k6UHh4K3sBqv7`）

```
USDD Design System
├── Overview
├── — Tokens —        # 分隔符（非工作页）
│   ├── Color
│   ├── Typography
│   ├── Spacing & Grid
│   ├── Border & Radius
│   └── Shadow & Elevation
├── — Components —    # 分隔符（非工作页）
│   ├── Button
│   ├── Input
│   ├── Select / Dropdown
│   ├── Checkbox / Radio / Switch
│   ├── Tag / Badge
│   ├── Tooltip
│   ├── Pagination
│   ├── Alert
│   ├── Tabs
│   ├── Toast / Notification
│   ├── Empty State
│   ├── Step Indicator
│   └── Accordion
└── — Organisms —     # 分隔符（非工作页）
    ├── Header
    ├── Footer
    ├── Icons
    └── Web3 logos
```

## 命名约定

| 层级 | 规则 | 示例 |
| --- | --- | --- |
| Page | 功能名，首字母大写 | `Home`、`Data` |
| Section | 用 `—` 前缀标注分组分隔符 | `— Tokens —` |
| Frame | 描述性命名，Desktop/Mobile 用斜杠区分 | `Home/Desktop`、`Home/Mobile` |
| Component Set | 组件英文名 | `Button`、`Tag` |
| Variant | 属性=值格式 | `Type=Primary, Size=Large, State=Default` |
