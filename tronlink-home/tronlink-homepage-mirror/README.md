# TronLink Homepage Local Mirror

这个目录里的 `index.html` 是按线上 `https://www.tronlink.org/` 首页源码生成的本地镜像页。

**Figma 设计稿：** [Tronlink](https://www.figma.com/design/Ja2E8TLhNECfgG9txkjfOk/Tronlink?node-id=0-1)

**从本页同步到 Figma（1920 宽）**

Figma / Figma MCP **不能**把 HTML 一键变成可编辑矢量稿；通常做法是 **1920 视口全页截图** 拖进 Figma 当底图，再建 `1920` 宽 Frame 对齐重绘。

在仓库本目录执行（首次会安装 `puppeteer` 与 Chromium，需网络）：

```bash
cd /Users/luke/luke-usdd/tronlink-home/tronlink-homepage-mirror
npm install
npm run figma:png
```

生成 `figma-export/tronlink-mirror-1920-full.png`（目录已加入 `.gitignore`，大文件不提交）。在 Figma 中：新建 Frame 宽度 **1920**，将 PNG 拖入画布，按设计规范描组件即可。

特点：

- 保留原站的 `fullpage` 布局和首页脚本。
- 把相对资源路径统一改成线上绝对地址，方便本地预览时直接加载。
- 默认行为应尽量和线上首页一致，而不是展开后的长页面快照。

重新生成：

```bash
curl -L https://www.tronlink.org/ -o /tmp/tronlink-home.html
cd /Users/luke/luke-usdd/tronlink-home/tronlink-homepage-mirror
node generate-live-index.mjs /tmp/tronlink-home.html
```

本地预览：

```bash
cd /Users/luke/luke-usdd/tronlink-home/tronlink-homepage-mirror
python3 -m http.server 4173
```
