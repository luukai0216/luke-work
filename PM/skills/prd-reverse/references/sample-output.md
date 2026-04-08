# 样板参考

## 已有参考

TronLink 项目已完成的模块 PRD 可作为新项目生成的参考样板：

- **钱包创建/导入/管理**：`tronlink-prd/modules/wallet-creation-import-management.md`

生成新项目的模块 PRD 时，参照该文件的结构、详细程度和语言风格。

## 快速开始示例

### 示例 1：电商项目 — 购物车模块

```
/reverse-prd 项目：MyShop电商平台 源码：/code/myshop/ 模块：购物车 代码范围：src/pages/cart/
```

预期输出：`./prd/modules/shopping-cart.md`

### 示例 2：SaaS 项目 — 用户权限模块

```
/reverse-prd 项目：TeamFlow协作平台 源码：/code/teamflow/ 模块：用户权限管理 代码范围：src/modules/permission/
```

### 示例 3：基于现有资料整理

```
/reverse-prd 项目：FinApp 模块：交易记录 资料来源：./legacy-docs/transaction-spec.docx 源码：/code/finapp/src/transaction/
```

### 示例 4：更新已有 PRD 中的功能

```
/reverse-prd 更新模块：购物车 功能：F05 优惠券应用
```
