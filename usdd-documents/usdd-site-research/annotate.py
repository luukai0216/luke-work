from PIL import Image, ImageDraw, ImageFont
import os

BASE = 'usdd-documents/usdd-site-research/screenshots'
OUT  = 'usdd-documents/usdd-site-research/screenshots/annotated'
os.makedirs(OUT, exist_ok=True)

TEAL   = (0, 229, 180)
ORANGE = (255, 160, 40)

def get_font(size):
    for path in [
        '/System/Library/Fonts/PingFang.ttc',
        '/System/Library/Fonts/STHeiti Medium.ttc',
        '/System/Library/Fonts/Hiragino Sans GB.ttc',
    ]:
        try:
            return ImageFont.truetype(path, size)
        except:
            pass
    return ImageFont.load_default()

def draw_box(draw, x1, y1, x2, y2, color, bw=6):
    r, g, b = color
    draw.rectangle([x1, y1, x2, y2], fill=(r, g, b, 30))
    for i in range(bw):
        draw.rectangle([x1+i, y1+i, x2-i, y2-i], outline=(r, g, b, 240))

def draw_label(draw, x1, y1, label, color, font):
    r, g, b = color
    try:
        bb = font.getbbox(label)
        tw, th = bb[2]-bb[0], bb[3]-bb[1]
    except:
        tw, th = len(label)*17, 28
    pad = 14
    lx1, ly1 = x1, max(y1 - th - pad*2 - 4, 2)
    lx2, ly2 = lx1 + tw + pad*2, ly1 + th + pad*2
    # If label clips top, draw inside box
    if ly1 <= 2:
        ly1 = y1 + 10
        ly2 = ly1 + th + pad*2
    draw.rectangle([lx1, ly1, lx2, ly2], fill=(r, g, b, 220))
    draw.text((lx1+pad, ly1+pad), label, fill=(10,10,10,255), font=font)

def annotate(filename, regions):
    path = f'{BASE}/{filename}'
    img = Image.open(path).convert('RGBA')
    W, H = img.size
    overlay = Image.new('RGBA', (W, H), (0,0,0,0))
    draw = ImageDraw.Draw(overlay)
    font = get_font(34)

    for (x1, y1, x2, y2, label, color) in regions:
        draw_box(draw, x1, y1, x2, y2, color)
        draw_label(draw, x1, y1, label, color, font)

    out = Image.alpha_composite(img, overlay).convert('RGB')
    out_name = filename.replace('.png', '-annotated.png')
    out.save(f'{OUT}/{out_name}')
    print(f'  saved → {out_name}  ({W}×{H})')

print('Annotating screenshots...')

# ── HOME (2000 × 6915) ──────────────────────────────────────────────────────
annotate('usdd-home.png', [
    (75,  540, 1950,  730, 'JS加载：Total Supply / Protocol TVL / Savings TVL', TEAL),
    (75,  840, 1010, 2340, 'JS加载：USDD APY 趋势折线图', TEAL),
    (1025, 840, 1950, 2340, 'JS加载：Yield Simulator 估算结果', TEAL),
    (75, 5500, 1950, 6090, 'JS加载：最新文章列表（API拉取）', TEAL),
    (75, 6180, 1950, 6620, 'JS加载：交易所 Markets 跑马灯', TEAL),
])

# ── DATA (2000 × 2422) ───────────────────────────────────────────────────────
annotate('usdd-data.png', [
    (75,  360, 1950,  625, 'JS加载：4个核心指标（Supply / TVL / Collateral / SA Earnings）', TEAL),
    (75,  635, 1950, 1185, 'JS加载：Total Supply / sUSDD Supply 图表', TEAL),
    (75, 1195,  965, 1765, 'JS加载：Collateral Value 折线图', TEAL),
    (985, 1195, 1950, 1765, 'JS加载：Allocated Asset Distribution 饼图', TEAL),
    (75, 1775, 1950, 2265, 'JS加载：Tron / ETH / BNB Chain APY 图表', TEAL),
])

# ── SMART ALLOCATOR (2000 × 3797) ────────────────────────────────────────────
annotate('usdd-sa.png', [
    (75,  395,  730,  875, 'JS加载：Debt / Invested / Earnings / APY', TEAL),
    (745,  395, 1950,  875, 'JS加载：Debt vs 总投资额对比图', TEAL),
    (75,  895, 1950, 1770, 'JS加载：Assets Breakdown（By Protocol/Network/Asset）', TEAL),
    (75, 1790, 1950, 2880, 'JS加载：Proof of Reserve 明细表格', TEAL),
    (75, 3160, 1950, 3660, 'JS加载：Debt Overview 表格（Tron/ETH/BNB）', TEAL),
])

# ── TREASURY (2000 × 2201) ───────────────────────────────────────────────────
annotate('usdd-treasury.png', [
    (1330, 490, 1950,  600, 'JS加载：Total Treasury Balance', TEAL),
    (75,   545, 1950, 1455, 'JS加载：USDD Key Financial Metrics（3季度数据）', TEAL),
    (75,  1560, 1950, 1870, 'JS加载：JST Buyback & Burn 数字', TEAL),
])

# ── NEWS (2000 × 1777) ───────────────────────────────────────────────────────
annotate('usdd-news.png', [
    (75, 440, 1950, 1420, 'JS加载：文章列表（API分页，共15页）', TEAL),
])

# ── FAQ (2000 × 1989) ────────────────────────────────────────────────────────
annotate('usdd-faq.png', [
    (75, 375, 1950, 1540, 'JS加载：Q&A 条目列表（共3页约24条）', TEAL),
])

# ── SA VAULT DETAIL (2000 × 1856) ────────────────────────────────────────────
annotate('usdd-data-sa-detail.png', [
    (75,  280, 1950,  510, 'JS加载：Total Collateral Value / Total Debt / 超额抵押率', TEAL),
    (75,  520, 1950, 1570, 'JS加载：链上 Activities 操作记录（Borrow/Repay，分页）', TEAL),
])

print('Done! All annotated files in screenshots/annotated/')
