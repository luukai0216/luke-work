# Figma 文件结构说明

> 说明产品在 Figma 中的文件组织方式，方便新人快速找到所需设计稿。

---

## 文件组织

| Figma 文件 | 内容 | 链接 |
|-----------|------|------|
| [产品名] Design System | 组件库 + Token + 样式 | [待补充] |
| [产品名] [端A] | [端A] 所有页面设计 | [待补充] |
| [产品名] [端B] | [端B] 所有页面设计 | [待补充] |

## Page 命名规范

每个 Figma 文件内按以下方式组织 Pages：

```
├── 📐 Cover                    # 封面
├── 🧩 Components              # 本文件使用的局部组件
├── 📱 1-[模块A]                # 按模块分页面
├── 📱 2-[模块B]
├── 📱 3-[模块C]
├── ...
├── 🗑 Archive                  # 废弃的旧设计
└── 📝 Changelog               # 设计变更记录
```

## Frame 命名规范

```
{版本号}/{页面名}/{状态}

示例：
v1.0.0/Settings/Default
v1.0.0/Settings/EditMode
v1.0.0/Settings/ConfirmDialog
```

## 版本管理

| 规则 | 说明 |
|------|------|
| 使用 Figma Branch | 大版本使用 Branch，评审通过后 Merge 到 Main |
| Frame 前缀版本号 | 每个设计 Frame 以版本号开头 |
| 旧设计移入 Archive | 上线后旧版本设计移入 Archive Page，不删除 |
| Changelog Page | 每次设计变更在 Changelog Page 记录摘要 |

## 与知识库的映射

```
Figma Frame                         知识库文件
───────────                         ──────────
v1.0.0/Settings/Default          →  {product}/iterations/v1.0.0/figma-mapping.md
                                    {product}/figma-design-index.md（上线后合并）
```
