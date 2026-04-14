# USDD 站点性能测试报告

> 测试日期：2026-04-14  
> 测试工具：Playwright（Chrome CDP 模拟网络限速）  
> 测试地点：本地网络（macOS）  
> 说明：每次测试均使用独立浏览器上下文（无缓存），模拟真实首次访问

---

## 1. 测试站点

| 站点 | 地址 | 用途 |
|------|------|------|
| 官网 | https://usdd.io | 品牌主页 |
| 应用 | https://app.usdd.io | DeFi Vault 操作页 |

---

## 2. 首屏渲染速度（First Paint）

> First Paint = 浏览器绘制出第一个像素的时间，代表用户"看到东西"的时刻

| 网络条件 | usdd.io | app.usdd.io |
|----------|---------|-------------|
| Slow 3G（500 Kbps / 400ms 延迟） | 20,260 ms ⚠️ | 26,008 ms ⚠️ |
| Fast 3G（1.5 Mbps / 40ms 延迟） | 7,888 ms 🔶 | 9,920 ms 🔶 |
| 4G / LTE（20 Mbps / 20ms 延迟） | 3,640 ms 🔶 | 3,948 ms 🔶 |
| WiFi（不限速） | 3,448 ms 🔶 | 3,728 ms 🔶 |

**行业参考基准（Google Core Web Vitals）**
- ✅ 良好：< 1,800 ms
- 🔶 待改善：1,800 ~ 3,000 ms  
- ⚠️ 较差：> 3,000 ms

---

## 3. JS 加载完成时间（DOM Interactive）

> DOM Interactive = JS 脚本全部解析执行完毕，页面可以响应交互的时间

| 网络条件 | usdd.io | app.usdd.io |
|----------|---------|-------------|
| Slow 3G | 20,227 ms ⚠️ | 25,971 ms ⚠️ |
| Fast 3G | 7,851 ms ⚠️ | 9,881 ms ⚠️ |
| 4G / LTE | 3,602 ms 🔶 | 3,910 ms 🔶 |
| WiFi | 3,424 ms 🔶 | 3,703 ms 🔶 |

---

## 4. 页面完全加载时间（DCL）

> DOM Content Loaded = HTML + 全部 JS/CSS 下载并执行完成

| 网络条件 | usdd.io | app.usdd.io |
|----------|---------|-------------|
| Slow 3G | **31,951 ms** ⚠️ | **38,460 ms** ⚠️ |
| Fast 3G | 13,660 ms ⚠️ | 14,764 ms ⚠️ |
| 4G / LTE | 5,175 ms 🔶 | 5,405 ms 🔶 |
| WiFi | 8,640 ms ⚠️ | 5,115 ms 🔶 |

---

## 5. JS 文件构成分析

### usdd.io（7 个 JS 文件）

| 文件 | 说明 | 大小（压缩后） |
|------|------|---------------|
| main.8941c64c.js | 业务主包 | **813 KB**（解压 1.6 MB） |
| antd.min_5.21.6.js | Ant Design UI 库 | CDN（未暴露大小） |
| react.production.min_18.js | React 框架 | CDN |
| react-dom.production.min_18.js | React DOM | CDN |
| echarts.min_5.6.0.js | 图表库 | CDN |
| dayjs.min_1.11.10.js | 时间处理 | CDN |
| Google Analytics | 统计脚本 | CDN |

### app.usdd.io（9 个 JS 文件，比 usdd.io 多 2 个）

| 新增文件 | 说明 | 体量估算 |
|----------|------|----------|
| Tronweb_6.0.3.js | Tron 链交互 SDK | ~800 KB+ |
| ethers.umd.min_6.14.4.js | EVM 链交互 SDK | ~400 KB+ |

> app.usdd.io 因为多加载了 Web3 SDK，整体 JS 负载更重，导致在各网速下均比 usdd.io 慢 **0.3 ~ 6 秒**

---

## 6. TTFB（服务器响应时间）

> TTFB = Time to First Byte，从发请求到收到第一个字节，反映服务器 / CDN 性能

| 站点 | TTFB（模拟测试均值） |
|------|---------------------|
| usdd.io | ~1,300 ms |
| app.usdd.io | ~1,330 ms |

两个站点服务器响应速度接近，均约 1.3 秒，属于中等偏慢水平（良好应 < 600 ms）。

---

## 7. 总结与问题诊断

### 主要瓶颈

1. **JS 包体积过大**  
   usdd.io 主包 813 KB（压缩）/ 1.6 MB（原始）——这是导致低速网络极慢的核心原因。  
   行业建议首屏 JS < 200 KB。

2. **app.usdd.io 额外引入 Web3 SDK**  
   TronWeb + ethers.js 合计估算 1.2 MB+，在 3G 环境下加载耗时超 30 秒，严重影响用户体验。

3. **服务器 TTFB 偏高**  
   ~1.3 s 的服务器响应时间说明 CDN 节点覆盖或服务器配置有优化空间（目标 < 600 ms）。

4. **首屏无有效 Loading 状态**  
   在 JS 全部加载前，用户看到的是空白或未渲染完成的骨架，体感等待时间更长。

### 改善方向（按优先级）

| 优先级 | 方向 | 预期收益 |
|--------|------|----------|
| 🔴 高 | 代码分包（Code Splitting）——按路由懒加载 | 首屏 JS 减少 50~70% |
| 🔴 高 | Web3 SDK 按需引入，或延迟加载 | app 端减少 1~2s |
| 🟡 中 | CDN 节点优化 / 启用 HTTP/2 Push | TTFB 降至 < 600ms |
| 🟡 中 | 增加骨架屏 / Loading 占位 | 体感等待降低 |
| 🟢 低 | 开启 Brotli 压缩 | JS 包额外减少 15% |

---

*测试环境：macOS / Playwright Chrome，网络限速通过 Chrome DevTools Protocol 模拟*
