---
name: figma-componentize
source: ~/.claude/skills/figma-componentize/SKILL.md
---
# figma-componentize（TRON Web 版）

扫描 Figma 页面图层，识别可复用元素，批量转为 Component 并按 TRON 命名规范整理。

## 使用方式

```
/figma-componentize

Figma URL: https://www.figma.com/design/Y6aCELT09PrPFQkiZVqESm/TRON?node-id=xxx-xxx
扫描范围: 整页 / 指定 Frame 名称
目标位置: 🎨 Design System 页面
```

---

## TRON 命名规范（执行时必须遵守）

参考 `../design/figma-structure.md`，核心规则：

**组件分组与命名格式：**

```
{Category}/{ComponentName}
{Category}/{ComponentName}/{Variant}
```

| Category | 适用场景 |
| --- | --- |
| `Button` | 主按钮、次要按钮、Dropdown、Arrow Link |
| `Card` | 卡片容器（钱包卡片、功能卡片等） |
| `Navigation` | Header 导航项、Footer 链接、Tab |
| `Form` | 输入框、搜索框 |
| `Tag` | Badge、标签、状态标记 |
| `Modal` | 弹窗（含各状态：Empty/Results/NoResults） |
| `Icon` | 图标容器（含尺寸后缀） |
| `List` | 列表项、表格行 |

**Variant 命名（首字母大写）：**

```
State: Default / Hover / Active / Disabled / Loading
Size:  SM / MD / LG
Type:  Primary / Secondary / Ghost
```

**TRON 典型组件名示例：**

```
Button/Primary/Default
Button/Primary/Hover
Button/Secondary/Default
Button/Arrow                    # 箭头链接
Button/Dropdown
Card/Wallet                     # 钱包卡片
Card/Feature                    # 功能卡片
Navigation/Header/Item
Navigation/Tab/Default
Navigation/Tab/Active
Form/Search/Empty
Form/Search/Focused
Modal/Search/Empty
Modal/Search/Results
Modal/Search/NoResults
Icon/Arrow/16px
Icon/Social/20px
Tag/Badge/Default
Tag/Status/Success
Tag/Status/Warning
```

---

## TRON 组件整理规则

**目标页面：** `🎨 Design System`

**分区摆放（纵向分区，同组横向排列）：**

```
Y=0      Button 分组
Y=400    Card 分组
Y=800    Navigation 分组
Y=1200   Form 分组
Y=1600   Modal 分组
Y=2000   Icon 分组
Y=2400   Tag 分组
```

- 同组件间距：48px
- 每个分组前加灰色文字标签标注 Category 名

---

## 注意事项

- 组件化后原位置自动替换为 Instance，**不影响已有设计稿视觉**
- 每创建一个组件截图验证一次
- Phase 4 确认清单**必须等待确认**，不自动执行
- 完整流程见：`~/.claude/skills/figma-componentize/SKILL.md`
