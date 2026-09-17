"""Restore the exported site as eight portable, self-contained HTML pages."""
from pathlib import Path
import base64
import mimetypes
import re

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "dist"
OUTPUT = ROOT / "HTML还原"
PAGES = {
    "": "index.html",
    "glyph-features/": "glyph-features.html",
    "typography/": "typography.html",
    "character-set/": "character-set.html",
    "zh/": "index-zh.html",
    "zh/glyph-features/": "glyph-features-zh.html",
    "zh/typography/": "typography-zh.html",
    "zh/character-set/": "character-set-zh.html",
}
ASSET = re.compile(r"/design/(?:assets|_assets)/[^\s\"'<>`\\)]+")


def source_path(url):
    return SOURCE / url.removeprefix("/design/").split("?", 1)[0].split("#", 1)[0]


def embed_asset(match):
    path = source_path(match.group())
    if not path.is_file():
        raise FileNotFoundError(path)
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime};base64,{encoded}"


def restore(source):
    html = source.read_text()
    # Styles and scripts stay in their original order to preserve the design.
    html = re.sub(
        r'<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>',
        lambda m: "<style>\n" + source_path(m[1]).read_text() + "\n</style>",
        html,
    )
    html = re.sub(
        r'<script\b[^>]*src="([^"]+)"[^>]*>\s*</script>',
        lambda m: "<script>\n" + source_path(m[1]).read_text().replace("</script", "<\\/script") + "\n</script>",
        html,
    )
    # Data URLs allow fonts, videos and canvas artwork to work over file:// too.
    html = ASSET.sub(embed_asset, html)
    # Metadata retains its original public URLs; navigation becomes local.
    for route, filename in sorted(PAGES.items(), key=lambda pair: -len(pair[0])):
        html = re.sub(
            r'(?<=["\'])/design/' + re.escape(route) + r'(?=["\'#?])',
            filename,
            html,
        )
    return html


if __name__ == "__main__":
    OUTPUT.mkdir(exist_ok=True)
    for route, filename in PAGES.items():
        destination = OUTPUT / filename
        destination.write_text(restore(SOURCE / route / "index.html"))
        print(f"{filename}: {destination.stat().st_size / 1024 / 1024:.2f} MB")
    (OUTPUT / "使用说明.txt").write_text(
        "TRON Design Language · HTML 还原版\n\n"
        "双击 index-zh.html 打开中文首页，index.html 为英文首页。\n"
        "通过顶部目录或页脚进入字形特征、字体系统、字符集。\n"
        "每个 HTML 均已内嵌图片、字体、视频、样式与交互脚本，无需安装开发工具。\n"
        "单页可独立打开；若要保留页面跳转和中英文切换，请将 8 个 HTML 放在同一文件夹。\n"
        "保留原导出的布局、内容、缩放行为和动效。原始 dist 文件夹未修改。\n"
    )
