# Figma 文件组织与命名规范

> 最后更新：2026-04-02 | 负责人：待填写

## 文件组织结构

```
JustLend Admin/
├── 🎨 Design System          # 组件库 & 设计 Token
├── 🖥 Admin — {模块名}       # 各模块设计稿
│   ├── Cover                 # 文件封面
│   ├── Changelog             # 变更记录
│   ├── ✅ Specs              # 开发交付稿
│   ├── 🔄 Review             # 评审稿
│   └── 🗂 Archive            # 历史版本归档
└── 📋 Templates              # 模板文件
```

## Frame 规范

| 场景 | 尺寸 | 说明 |
| --- | --- | --- |
| Desktop XL | 1440 × 900 | 主设计尺寸 |
| Desktop | 1280 × 900 | 常规桌面 |

> 管理后台为纯桌面端，不设计移动端断点。

## 页面命名规范

- 格式：`{序号} {页面名} — {状态}`
- 状态标记：`Default` / `Empty` / `Loading` / `Error`
- 示例：`01 用户列表 — Default`、`02 用户详情 — Loading`

## 图层命名规范

- 组件实例：直接使用组件名，不重命名
- 页面容器：`Page/{页面名}`
- 区块：`Section/{区块名}`
- 表格行：`Row/{业务名}`
- 图标：`Icon/{图标名}/{尺寸}px`

## 变体命名

- Property 名：首字母大写，如 `State`、`Size`、`Type`
- 值：首字母大写，如 `Default`、`Hover`、`Disabled`、`Active`

## 组件发布规则

- 组件修改后需发布（Publish）才能同步到其他文件
- 发布前在 Changelog 页面记录变更内容
- 破坏性变更需提前告知开发团队

## 设计交付规范

- 使用 Figma Dev Mode 交付
- 标注单位统一使用 px
- 颜色使用 Token 名称，而非色值
- 动效在 Prototype 面板中标注时长和缓动函数
