# TronLink Homepage Local Mirror

这个目录里的 `index.html` 是按线上 `https://www.tronlink.org/` 首页源码生成的本地镜像页。

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
