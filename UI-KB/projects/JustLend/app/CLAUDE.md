# JustLend · App — AI 指引

## 概览

App 分为 **V1** 和 **V2** 两个独立模块，各自有完整的设计规范，无共用的 App 层规范。

| 模块 | 路径 | 说明 |
| --- | --- | --- |
| V1 | `V1/` | 原版借贷市场，深色/亮色双主题，品牌蓝 `#4D54FF` |
| V2 | `V2/` | Supply & Borrow Market V2，隔离保证金借贷协议 |

## AI 使用规则

- 明确模块（V1 / V2）后再读对应子目录的规范文件
- Figma 规范：`V1/figma-structure.md` / `V2/figma-structure.md`

### 组件使用约束（强制）

进入 V1 或 V2 子目录后：
1. 必须先读 `design-spec.md` 和 `component-catalog.md`
2. **禁止自行创建组件**，所有 UI 元素按 catalog 实现
3. 生成页面须附**组件使用清单**
4. catalog 中找不到的须标注 **"catalog 缺失：[描述]"**
