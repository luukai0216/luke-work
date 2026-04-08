# Earn 改版

  * 一、版本信息：
  * 二、变更日志：
  * 三、需求介绍
    * 设计稿：https://www.figma.com/design/I11Sl9Thm9iqdmEvyCUoFj/USDD-v2.0?node-id=15780-25108&t=5c7KGbxhuijmpxNd-1
    * 3.1 需求背景
    * 3.2 需求概括：
    * 3.3 需求详述
      * 3.3.1 Home页面Earn入口调整
      * 3.3.2 App的导航栏更新
      * 3.3.3 Earn--Rewards页面
      * 3.3.4 数据埋点
      * 3.3.5 web3管理后台配置Rewards页面前端数据
      * 原型地址：https://axhub.im/ax9/3d8061893d7ec44e/#g=1&id=rzt76l&p=app-earn__



## 一、版本信息：

版本号：1.0.0 创建日期：2025.10.22 审核人：roby/Rain

## 二、变更日志：

时间 |  变更人 |  主要变更内容  
---|---|---  
2026.1.8 |  Rain |  修改App导航栏展示规则，增加关于web3管理后台的需求描述  
2026.1.13 |  Rain |  增加home页入口调整需求描述，更新earn list配置规则，支持动态apy和活动状态动态调整，增加数据埋点需求描述  
2026.1.29 |  Rain |  补充埋点的string事件名  
  
## 三、需求介绍

### 设计稿：[https://www.figma.com/design/I11Sl9Thm9iqdmEvyCUoFj/USDD-v2.0?node-id=15780-25108&t=5c7KGbxhuijmpxNd-1](https://www.figma.com/design/I11Sl9Thm9iqdmEvyCUoFj/USDD-v2.0?node-id=15780-25108&t=5c7KGbxhuijmpxNd-1)

### 3.1 需求背景

由于earn页面tron链和其他链的页面内容差别过大，而且一些存款usdd的活动是支持多链的。所以把USDD Savings 作为独立入口，增加rewards页面 展示所有第三方的投资机会展示。

### 3.2 需求概括：

  * Home页面earn的入口调整

  * App的导航栏更新

  * 新增Rewards页面

  * 在web3管理后台配置Rewards页面前端数据，配置完成点击launch按钮，app前端页面同步更新的配置数据




### 3.3 需求详述

#### 3.3.1 Home页面Earn入口调整

1、home页面banner位的Earn按钮点击跳转至Earn页面,悬浮选链效果取消。

2、home页卡片栏该按钮点击跳转至Savings页面，按钮文案更改为Savings

#### 3.3.2 App的导航栏更新

  * ~~Vault （仅tron）~~ （已上线）

    * ~~Borrow USDD：之前的vault页面~~

      * ~~Borrow USDD using your collateral~~

    * ~~Liquidation~~

      * ~~View positions close to liquidation~~

    * ~~Auction~~

      * ~~Bid on collateral from liquidations~~

    * ~~Portfolio~~

      * ~~Track your vault positions~~

  * PSM （该页面所有链可见）

  * Savings （eth和bsc链可见，将之前的Earn页面改名为Savings）

  * Earn （新页面，所有链可见，也是本次需求新增的Rewards页面）

  * Migrate （仅tron可见）




#### 3.3.3 Earn--Rewards页面

**页面分为4个部分:顶部banner位，卡片栏，Earn platform list, Supported Projects.**

  * 页面顶部Banner位：Where to Earn USDD，View active platforms offering APY rewards for USDD.

  * 卡片栏：展示目前tron-earn页面的第三方平台：币安活动、pancake活动（2个池子）、uniswap（2个池子），**具体内容由web3管理后台配置** ，数据字段含义同Earn platform list。

  * Earn platform list：展示存款usdd的活动。<https://docs.google.com/spreadsheets/d/1yqhzlpfiCXzKlZ3-biyHaJEV_nW99jFlD-Yfi2oaM3o/edit?gid=0#gid=0> （活动列表）




默认展示规则：第一规则：进行中--即将到来--已结束，第二规则：APY高--低，第三规则：按照平台名称首字母顺序A-- Z展示。

**字段** |  **说明**  
---|---  
Platform |  投资平台名称，鼠标悬浮展示描述文案 具体数据读取web3管理后台的配置  
Property |  活动属性，比如Provid liquild usdd-usdt,具体数据读取web3管理后台的配置  
Logo |  web3后台配置图片  
Network |  展示该平台Earn活动支持的网络，可同时支持多个链, 可筛选。 具体数据读取web3管理后台的配置  
Status | 

  * Active (进行中)
  * Ended（已结束，活动按钮置灰）
  * Upcoming（即将到来，活动按钮置灰）
  * 支持按状态筛选活动
  * 具体数据读取web3管理后台的配置的活动执行时间，按照执行时间进行逻辑判断活动的状态展示

  
APY |  可按数据高低排序，支持正序和倒序。具体数据读取web3管理后台的配置，支持静态apy和动态apy获取展示  
Action |  按钮，展示文案和lock状态读取web3管理后台的配置（按钮默认为unlock状态，lock则按钮置灰，用户无法点击）  
跳转链接 |  点击按钮跳转至对应的链接，具体链接读取web3管理后台的配置  
Type |  Lending/CEX/DEX/Wallet，具体数据读取web3管理后台的配置  
Rule |  活动参与方式，运营在web3管理后台配置，鼠标点击可查看详情  
  
  * Supported Projects：支持按照标签筛选查看，默认展示所有合作的项目列表。Explore all DeFi and CeFi projects that have integrated USDD.

    * List Your Platform：点击跳转到google form（运营提供），填写项目信息，人工审核后手动添加。

    * 默认展示：默认展示所有标签项目，排序按照web3管理后台配置的排序（排序数字越大，条目越靠前展示，排序数字相同则按项目名称A-Z的顺序展示）。

    * 点击load more: 把所有数据全部展示，不需要进一步点击。先点击type标签，如果筛选结果<8条，则不展示load more按钮。

    * 展示字段：以下数据均在web3管理后台配置

      * 项目logo

      * 项目名称

      * 标签：每个项目只有一个标签

      * 项目描述

      * 点击跳转到项目链接




#### 3.3.4 数据埋点

  * 点击home页Earn按钮：click_homebanner_earn

  * 点击home页卡片savings按钮: click_homecard_savings

  * 点击某平台活动跳转按钮: click_earnactivity_jump

  * 进入平台后有下一步点击动作: event_jumpafter_click

  * 新会话开始（首次页面触发即可）: event_earnpage_open

  * 在 Earn 页点击 Connect Wallet: click_connect_wallet

  * 点击连接钱包后钱包连接成功: wallet_connect_success

  * App 导航栏点击: click_app_navigationbar

  * 同一 user_pseudo_id 或钱包在 N 天内回访: earn_return_visit_qualified

  * 用户离开 Earn 页或切页时上报停留时长: earn_page_duration

  * 点击各筛选标签: click_filter_laber

  * 点击list your project: click_list_project

  * 点击load more: click_loadmore

  * 点击projects卡片跳转: click_projects_cards




#### **3.3.5 web3管理后台配置Rewards页面前端数据**

#### 原型地址：[https://axhub.im/ax9/3d8061893d7ec44e/#g=1&id=rzt76l&p=app-earn__](https://axhub.im/ax9/3d8061893d7ec44e/#g=1&id=rzt76l&p=app-earn__)

  * **web3后台一级导航栏更新：**

    * 新增前端页面配置category

      * 官网FAQ

      * App-Earn页面

  * **点击App-Earn页面** ：顶部tab栏Cards/Opportunities/Supported Projects，点击切换表单

  * **Cards/Opportunities的tab栏页面：支持配置Earn-Rewards页面的卡片栏和platform list数据，支持新增，编辑和删除，删除需要二次确认。任一操作完成，前端抛出操作成功toast**




**字段** |  **说明**  
---|---  
Platform |  投资平台名称，输入限制24字符，必填  
Property |  活动属性，针对同一dex下多个代币对池子参与活动需使用该字段做额外说明，非必填，限制32字符，输入格式不作限制。  
Logo |  web3后台配置图片  
Network |  展示该平台Earn活动支持的网络，多选必选。 选项：Ethereum/Tron/BNB Chain  
Valid Period |  选择活动生效时间段和时区， ~~选择该时间段内活动生效逻辑（Every Day/Weekdays/Weekend，单选必选）~~  
APY |  先选择APY类型，单选，必选（Static APY/Dynamic APY） Static APY：填入APY数值，数值>=0，支持小数点，百分号，+号。限制长度16字符 Dynamic APY：选择获取动态apy的接口（接口列表由研发提供，pm提供动态Apy活动列表），单选必选  
描述 |  必填，不做输入格式校验，仅限制长度1028字符  
Action |  必填，按钮文案限制16字符，按钮状态默认为unlock状态，点击可切换状态，支持按状态筛选查看  
跳转链接 |  必填  
Type |  Lending/CEX/DEX/Wallet，单选必选  
排序（仅卡片栏） |  限制输入自然数0～1000，前端校验输入格式不符合则文本框下方标红提示：请输入0～1000整数  
Rule |  活动参与方式，必填，不做输入格式校验，仅限制长度1024字符  
  
  * **支持配置Supported Projects栏目内容：支持新增，编辑和删除，删除需要二次确认。任一操作完成，前端抛出操作成功toast**




**字段** |  **说明**  
---|---  
项目名称 |  输入限制24字符，必填  
Logo |  web3后台配置图片  
链接 |  用户在App页面点击该项目的跳转链接  
描述 |  必填，不做输入格式校验，仅限制长度1028字符  
标签 |  Lending/CEX/DEX/Wallet，单选必选  
排序 |  限制输入自然数0～1000，前端校验输入格式不符合则文本框下方标红提示：请输入0～1000整数(建议运营从500开始输入)  
  
  * **支持发布：** 用户点击Launch按钮，进行二次确认，确认通过则把当前App-Earn页面最新配置同步到App前端页面，刷新最新同步时间戳，前端抛出操作成功toast。web3管理后台保存用户操作草稿（未发布但是已保存的修改内容，草稿只保留最新的已保存未发布的内容）

  * **支持回退：** 操作员点击Recover按钮，则web3管理后台的数据回退至与当前线上app-earn页面的数据一致。

  * **操作日志：** 在web3管理后台增加app-earn页面操作记录，增加非合约操作日志记录页面。包含操作人，操作时间，修改的内容详情。




**时间** |  **动作** |  **操作人账号**  
---|---|---  
2026-1-12 14:45:38 |  新增/编辑/删除Card，Cards id:XXXX 新增/编辑/删除opportunity, opportunity id:XXX 新增/编辑/删除projects，projects id:XXX  
确认发布 确认回退 |  XXX@tron.network  
  
  * **Preview功能：** 用户点击preview按钮，可预览当前web3管理后台保存的内容在前端页面的渲染效果。



