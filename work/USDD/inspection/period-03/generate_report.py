#!/usr/bin/env python3
"""Generate USDD period 03 UI inspection HTML from local screenshots."""

from __future__ import annotations

import base64
import io
from pathlib import Path

from PIL import Image

ROOT = Path("/Users/luke/luke-work/USDD/inspection/period-03")
ASSETS = ROOT / "assets"
OUT_WORKSPACE = ROOT / "【USDD】第 03 期UI问题巡检｜09.07–09.11.html"
OUT_DESKTOP = Path("/Users/luke/Desktop/【USDD】第 03 期UI问题巡检｜09.07–09.11.html")

FIGMA_FILE = "https://www.figma.com/design/fPge5QxWZ8YhpzYbBkkQjz/USDD-%E5%B7%A1%E6%A3%80%E6%AF%8F%E6%9C%9F%E4%BC%98%E5%8C%96%E6%B1%87%E6%80%BB"
CHARLIE_PAGE = "https://troneco.atlassian.net/wiki/spaces/TRONECOQA/pages/2451996828/Charlie+09.07+09.11"


def node_url(node_id: str) -> str:
    return f"{FIGMA_FILE}?node-id={node_id.replace(':', '-')}"


def encode_image(path: str | Path, max_side: int = 1400, quality: int = 78, crop_dark: bool = False) -> str:
    img = Image.open(ASSETS / path).convert("RGB")
    if crop_dark:
        img = crop_letterbox(img)
    w, h = img.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        img = img.resize((round(w * scale), round(h * scale)), Image.Resampling.LANCZOS)
    buf = io.BytesIO()
    img.save(buf, format="JPEG", quality=quality, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode("ascii")


def crop_letterbox(img: Image.Image) -> Image.Image:
    """Trim near-black padding around a viewer screenshot."""
    gray = img.convert("L")
    w, h = gray.size
    px = gray.load()
    top = 0
    bottom = h - 1
    left = 0
    right = w - 1
    threshold = 28
    while top < h - 1 and sum(px[x, top] for x in range(0, w, 8)) / (w / 8) < threshold:
        top += 1
    while bottom > top and sum(px[x, bottom] for x in range(0, w, 8)) / (w / 8) < threshold:
        bottom -= 1
    while left < w - 1 and sum(px[left, y] for y in range(top, bottom, 8)) / max(1, (bottom - top) / 8) < threshold:
        left += 1
    while right > left and sum(px[right, y] for y in range(top, bottom, 8)) / max(1, (bottom - top) / 8) < threshold:
        right -= 1
    pad = 8
    box = (
        max(0, left - pad),
        max(0, top - pad),
        min(w, right + 1 + pad),
        min(h, bottom + 1 + pad),
    )
    if box[2] - box[0] < 80 or box[3] - box[1] < 40:
        return img
    return img.crop(box)


def shot(path: str, alt: str, kind: str, crop_dark: bool = False) -> dict:
    return {"src": encode_image(path, crop_dark=crop_dark), "alt": alt, "kind": kind}


ISSUES = [
    {
        "date": "2026.9.7",
        "number": "1",
        "type": "优化",
        "owner": "UI",
        "source": "Charlie",
        "remark": "UI优化",
        "fileId": "ceeb3e2a-f1d9-42a4-aea4-af767eef75bd",
        "projectUrl": node_url("142:50857"),
        "description": "页面 banner 对齐问题",
        "solution": "官网banner 调整，需要替换\napp-banner 调整，需要替换",
        "images": [
            shot("conf_01a.png", "问题：页面 banner 对齐问题", "问题", True),
        ],
    },
    {
        "date": "2026.9.7",
        "number": "2",
        "type": "BUG",
        "owner": "技术",
        "source": "Charlie",
        "remark": "技术调整",
        "fileId": "7d265acc-0bc1-4188-9c38-267e8446e01b",
        "projectUrl": node_url("142:50860"),
        "description": "同时出现3个highlight",
        "solution": "banner 在切换时，只显示一个选中点",
        "images": [
            shot("figma_02.png", "问题：同时出现3个highlight", "问题"),
        ],
    },
    {
        "date": "2026.9.8",
        "number": "3",
        "type": "优化",
        "owner": "产品沟通",
        "source": "Charlie",
        "remark": "与运营沟通，修改 Medium 源文章标题与 banner 标题一致，网页会自动引用新的标题。",
        "fileId": "703fcb34-adf1-4f13-9c0f-2812b8d3de52",
        "projectUrl": "",
        "description": "图与文对不上,内容生产/审核规范上有缺口，内容是否需要统一？",
        "solution": "与运营沟通，修改 Medium 源文章标题与 banner 标题一致，网页会自动引用新的标题。",
        "images": [
            shot("conf_03.png", "问题：图与文对不上", "问题"),
        ],
    },
    {
        "date": "2026.9.8",
        "number": "4",
        "type": "优化",
        "owner": "UI",
        "source": "Charlie",
        "remark": "UI调整",
        "fileId": "c20747d1-a961-40ed-bdf2-50705c6d888b",
        "projectUrl": node_url("142:50859"),
        "description": "框选 Hover 样式均不统一",
        "solution": "只修改 分页 hover 样式优化\nhover 样式 参考设计稿调整",
        "images": [
            shot("conf_04.png", "问题：框选 Hover 样式均不统一", "问题"),
        ],
    },
    {
        "date": "2026.9.8",
        "number": "5",
        "type": "优化",
        "owner": "UI",
        "source": "Charlie",
        "remark": "UI调整",
        "fileId": "cfb2e455-8de7-448d-8521-499e929ce83d",
        "projectUrl": node_url("142:50862"),
        "description": "导航毛玻璃状态视觉干扰",
        "solution": "问题5:\n导航的背景模糊 改为 50px， app 导航也同步修改。\n\n另外有一个问题需要关注，背景模糊的区域好像只在页面中间，两侧没有",
        "images": [
            shot("conf_05.png", "问题：导航毛玻璃状态视觉干扰", "问题"),
        ],
    },
    {
        "date": "2026.9.9",
        "number": "6",
        "type": "优化",
        "owner": "UI",
        "source": "Charlie",
        "remark": "UI调整",
        "fileId": "b2f1056b-5347-4c8e-a9f9-66ddcd2ded87",
        "projectUrl": node_url("142:50862"),
        "description": "无当前页面索引，无常驻的顶部导航栏，增加一次额外点击成本，网站整体均如此",
        "solution": "问题6 ：tab 需要增加 当前页面的 状态，文字改颜色为 #81DEB0",
        "images": [
            shot("conf_06.png", "问题：无当前页面索引，无常驻顶部导航", "问题"),
        ],
    },
    {
        "date": "2026.9.10",
        "number": "7",
        "type": "BUG",
        "owner": "技术",
        "source": "Charlie",
        "remark": "技术调整",
        "fileId": "e8edce63-6d49-4828-aa58-b9638e20acb1",
        "projectUrl": node_url("142:50861"),
        "description": "出现效果卡顿闪烁",
        "solution": "导航下拉卡片，背景模糊效果出现的很慢，像卡顿，需要技术优化",
        "images": [
            shot("conf_07.png", "问题：出现效果卡顿闪烁", "问题"),
        ],
    },
    {
        "date": "2026.9.11",
        "number": "8",
        "type": "BUG",
        "owner": "UI",
        "source": "Charlie",
        "remark": "UI调整",
        "fileId": "3ef79ddb-6d9a-4ef5-959b-93c9abd16662",
        "projectUrl": node_url("142:50863"),
        "description": "圆角被切",
        "solution": "这里线上的三个 卡片 ，移入以后，圆角被切，有问题",
        "images": [
            shot("conf_08.png", "问题：圆角被切", "问题"),
        ],
    },
]


HTML_HEAD = """<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>【USDD】第 03 期UI问题巡检｜09.07–09.11</title>
  <style>
    :root { color-scheme: dark; --bg:#0c0c0e; --panel:#161619; --panel-2:#1d1d21; --text:#f4f4f5; --muted:#a5a5ad; --line:#313137; --accent:#216c58; --accent-soft:#16483c; --link:#92d3bd; }
    * { box-sizing:border-box; }
    body { margin:0; background:var(--bg); color:var(--text); font-family:Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
    main { max-width:1180px; margin:0 auto; padding:44px 28px 72px; }
    h1 { font-size:28px; margin:0; letter-spacing:-.02em; }
    h2 { font-size:19px; margin:38px 0 10px; }
    .lead { color:var(--muted); line-height:1.65; margin:10px 0 0; }
    .note { color:var(--muted); font-size:13px; margin:8px 0 0; }
    .stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin:30px 0; }
    .stat { background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:16px; }
    .stat strong { display:block; font-size:26px; line-height:1.1; }
    .stat span { display:block; color:var(--muted); font-size:13px; margin-top:7px; }
    .filters { display:flex; flex-wrap:wrap; align-items:center; gap:8px; padding:14px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line); }
    .filter-label { color:var(--muted); font-size:13px; margin-right:4px; }
    button { font:inherit; }
    .filter { cursor:pointer; border:1px solid var(--line); color:var(--muted); background:transparent; padding:7px 12px; border-radius:999px; font-size:13px; }
    .filter.active { color:#e8fff6; background:var(--accent-soft); border-color:var(--accent); }
    .section-count { color:var(--muted); font-size:14px; font-weight:400; }
    .issues { border-top:1px solid var(--line); }
    .issue { display:grid; grid-template-columns:210px minmax(0,1fr); gap:18px; padding:18px 0; border-bottom:1px solid var(--line); }
    .media-stack { display:grid; gap:8px; align-self:start; }
    .thumb { height:128px; width:210px; background:var(--panel-2); border:1px solid var(--line); border-radius:8px; display:block; overflow:hidden; padding:0; cursor:zoom-in; position:relative; }
    .thumb img { display:block; width:100%; height:100%; object-fit:cover; }
    .thumb .kind { position:absolute; left:8px; top:8px; font-size:11px; line-height:1; padding:4px 6px; border-radius:999px; background:rgba(12,12,14,.78); color:#e8fff6; border:1px solid var(--accent); }
    .thumb.kind-problem .kind { color:#f4f4f5; border-color:var(--line); }
    .meta { display:flex; flex-wrap:wrap; align-items:center; gap:7px; }
    .tag { border:1px solid var(--line); border-radius:999px; padding:4px 8px; color:var(--muted); font-size:12px; }
    .tag.owner { color:#e8fff6; background:var(--accent-soft); border-color:var(--accent); }
    .date { color:var(--muted); font-size:12px; }
    .description { font-size:15px; line-height:1.7; margin:10px 0 8px; white-space:pre-line; }
    .solution { font-size:15px; line-height:1.7; margin:0 0 11px; white-space:pre-line; color:#d7efe6; }
    .links { display:flex; flex-wrap:wrap; gap:14px; align-items:center; font-size:13px; }
    a { color:var(--link); text-decoration:none; }
    a:hover { text-decoration:underline; }
    .remark { color:var(--muted); }
    dialog { border:1px solid var(--line); border-radius:12px; padding:0; background:var(--panel); color:var(--text); width:min(880px,calc(100vw - 32px)); }
    dialog::backdrop { background:rgba(0,0,0,.76); }
    .modal-body { padding:18px; }
    .modal-head { display:flex; justify-content:space-between; gap:20px; align-items:center; margin-bottom:14px; }
    .close { cursor:pointer; background:var(--panel-2); border:1px solid var(--line); border-radius:7px; color:var(--text); padding:7px 10px; }
    #modal-image { display:block; max-width:100%; max-height:72vh; margin:auto; object-fit:contain; }
    #modal-title { color:var(--muted); font-size:13px; }
    @media (max-width:720px) { main { padding:28px 16px 48px; } .stats { grid-template-columns:repeat(2,minmax(0,1fr)); } .issue { grid-template-columns:1fr; } .thumb { width:100%; } }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>【USDD】第 03 期UI问题巡检｜09.07–09.11</h1>
      <p class="lead">来源：Charlie（09.07–09.11）。按文档序号 1–8 排列。问题描述用巡检原文，解决方案用 Figma 标注原文。</p>
      <p class="note">左边是文档里的问题图，方案用文字说明。点击缩略图可放大；也可打开原始记录或对应 Figma 方案稿。</p>
    </header>
    <section class="stats" id="stats"></section>
    <section class="filters" aria-label="筛选条件">
      <span class="filter-label">处理归属</span>
      <button class="filter active" data-owner="全部">全部</button>
      <button class="filter" data-owner="技术">技术</button>
      <button class="filter" data-owner="UI">UI</button>
      <button class="filter" data-owner="产品沟通">产品沟通</button>
    </section>
    <section id="content"></section>
  </main>
  <dialog id="preview"><div class="modal-body"><div class="modal-head"><span id="modal-title"></span><button class="close" id="close-preview">关闭</button></div><img id="modal-image" alt="问题截图"></div></dialog>
  <script>
"""

HTML_TAIL = f"""
    const sourcePages = {{
      Charlie: "{CHARLIE_PAGE}"
    }};
    const state = {{ owner: "全部" }};
    const stats = document.querySelector("#stats");
    const content = document.querySelector("#content");
    const preview = document.querySelector("#preview");
    const modalImage = document.querySelector("#modal-image");
    const modalTitle = document.querySelector("#modal-title");

    function link(href, label) {{
      const a = document.createElement("a"); a.href = href; a.target = "_blank"; a.rel = "noreferrer"; a.textContent = label; return a;
    }}
    function tag(label, owner) {{
      const el = document.createElement("span"); el.className = "tag" + (owner ? " owner" : ""); el.textContent = label; return el;
    }}
    function renderStats() {{
      const summary = [
        [issues.length, "待处理总数"],
        [issues.filter(x => x.owner === "技术").length, "技术处理"],
        [issues.filter(x => x.owner === "UI").length, "UI 处理"],
        [issues.filter(x => x.owner === "产品沟通").length, "产品沟通"]
      ];
      stats.replaceChildren(...summary.map(([value, label]) => {{ const item=document.createElement("div"); item.className="stat"; const strong=document.createElement("strong"); strong.textContent=value; const span=document.createElement("span"); span.textContent=label; item.append(strong,span); return item; }}));
    }}
    function issueImages(issue) {{ return issue.images?.length ? issue.images : [{{ src:issue.image, alt:issue.screenshotAlt, kind:"问题" }}]; }}
    function openPreview(issue, shot) {{ modalImage.src = shot.src; modalTitle.textContent = issue.source + " #" + issue.number + " · " + shot.alt; preview.showModal(); }}
    function issueRow(issue) {{
      const row = document.createElement("article"); row.className = "issue";
      const media = document.createElement("div"); media.className = "media-stack";
      issueImages(issue).forEach(shot => {{
        const thumb = document.createElement("button");
        thumb.className = "thumb" + (shot.kind === "问题" ? " kind-problem" : "");
        thumb.type = "button";
        thumb.title = "查看截图";
        const image = document.createElement("img");
        image.src = shot.src;
        image.alt = shot.alt;
        const kind = document.createElement("span");
        kind.className = "kind";
        kind.textContent = shot.kind || "方案";
        thumb.append(image, kind);
        thumb.addEventListener("click", () => openPreview(issue,shot));
        media.append(thumb);
      }});
      const body = document.createElement("div");
      const meta = document.createElement("div"); meta.className = "meta"; meta.append(tag(issue.owner,true),tag(issue.source + " #" + issue.number),tag(issue.type)); const date=document.createElement("span"); date.className="date"; date.textContent=issue.date; meta.append(date);
      const description = document.createElement("p"); description.className = "description"; description.textContent = "问题：" + issue.description;
      const solution = document.createElement("p"); solution.className = "solution"; solution.textContent = "方案：" + (issue.solution || "");
      const links = document.createElement("div"); links.className="links"; if (issue.projectUrl) links.append(link(issue.projectUrl,"查看 Figma 方案")); links.append(link(sourcePages[issue.source],"打开原始记录")); const remark=document.createElement("span"); remark.className="remark"; remark.textContent="备注："+issue.remark; links.append(remark);
      body.append(meta,description,solution,links); row.append(media,body); return row;
    }}
    function render() {{
      const selected = issues.filter(x => state.owner === "全部" || x.owner === state.owner).sort((a,b) => Number(a.number) - Number(b.number));
      content.replaceChildren();
      const title = document.createElement("h2"); title.textContent="问题列表 "; const count=document.createElement("span"); count.className="section-count"; count.textContent=selected.length+" 条"; title.append(count);
      const list = document.createElement("div"); list.className="issues"; selected.forEach(x => list.append(issueRow(x))); content.append(title,list);
    }}
    document.querySelectorAll("[data-owner]").forEach(button => button.addEventListener("click", () => {{ state.owner=button.dataset.owner; document.querySelectorAll("[data-owner]").forEach(x => x.classList.toggle("active",x.dataset.owner===state.owner)); render(); }}));
    document.querySelector("#close-preview").addEventListener("click", () => preview.close());
    preview.addEventListener("click", event => {{ if (event.target === preview) preview.close(); }});
    renderStats(); render();
  </script>
</body>
</html>
"""


def main() -> None:
    import json

    payload = json.dumps(ISSUES, ensure_ascii=False)
    html = HTML_HEAD + "    const issues = " + payload + ";" + HTML_TAIL
    OUT_WORKSPACE.write_text(html, encoding="utf-8")
    try:
        OUT_DESKTOP.write_text(html, encoding="utf-8")
        desktop_ok = True
    except OSError:
        desktop_ok = False
    print("workspace", OUT_WORKSPACE, OUT_WORKSPACE.stat().st_size)
    print("desktop", desktop_ok, OUT_DESKTOP if desktop_ok else "skipped")
    print("issues", len(ISSUES))
    for item in ISSUES:
        print(item["number"], item["owner"], item["type"], len(item["images"]))


if __name__ == "__main__":
    main()
