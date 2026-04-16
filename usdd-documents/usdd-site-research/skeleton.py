"""
Skeleton screen generator — v2
Color: pure white at 6% opacity (rgba 255,255,255,15)
Blocks are drawn via RGBA overlay composite, one block per content element, no overlap.
Coordinates sourced from Playwright JS bounding-box queries on live page.
"""
from PIL import Image, ImageDraw
import os

SRC = 'usdd-documents/usdd-site-research/screenshots/dynamic-regions'
OUT = 'usdd-documents/usdd-site-research/screenshots/skeleton'
R  = 8
# Skeleton block = dark background (~#1a1b1e) + pure white @ 6%
# Result: solid rgba(40, 41, 45, 255) — hides content, looks like a subtle raised block
SK = (40, 41, 45, 255)


def rr(draw, x1, y1, x2, y2):
    try:
        draw.rounded_rectangle([x1, y1, x2, y2], radius=R, fill=SK)
    except AttributeError:
        draw.rectangle([x1, y1, x2, y2], fill=SK)


def save(src_rel, blocks_fn):
    src = f'{SRC}/{src_rel}'
    dst = f'{OUT}/{src_rel}'
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    img  = Image.open(src).convert('RGBA')
    over = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(over)
    blocks_fn(draw, img.width, img.height)
    Image.alpha_composite(img, over).convert('RGB').save(dst)
    print(f'  ✓  {src_rel}')


print('Generating skeleton screens...\n')

# ── HOME ──────────────────────────────────────────────────────

def home_stats(d, W, H):
    # 3 stat cards — exact positions from JS (banner-data items, 1440-wide screenshot)
    # container page(120,661) → items relative: x=33,y=76,w=318,h=64
    for img_x in [153, 561, 969]:
        rr(d, img_x, 76, img_x + 318, 140)

save('home/home-01-stats-cards.png', home_stats)


def home_apy(d, W, H):
    # Left: APY values + chart
    rr(d, 18, 148, 348, 178)      # "4.25%" current APY
    rr(d, 360, 148, 560, 178)     # "7.74%" avg APY
    rr(d, 18, 308, 703, 688)      # APY line chart
    # Right: Yield Simulator results
    rr(d, 775, 346, 895, 375)     # "4.25 USDD" earn result
    rr(d, 815, 430, 968, 460)     # "4.25%" current APY in simulator
    rr(d, 735, 470, 1428, 688)    # Yield chart

save('home/home-02-apy-yield.png', home_apy)


def home_news(d, W, H):
    # 2 news cards — image block + title block + date block each
    for ox in [0, 612]:
        rr(d, ox + 33,  33, ox + 282, 173)   # cover image
        rr(d, ox + 306, 33, ox + 555,  89)   # title
        rr(d, ox + 306, 154, ox + 416, 174)  # date

save('home/home-03-news.png', home_news)


def home_markets(d, W, H):
    # Exchange logo grid (carousel, visible items only)
    for x in [87, 353, 619, 885, 1151]:
        rr(d, x, 207, x + 232, 297)   # row 1 logos

save('home/home-04-markets.png', home_markets)


# ── DATA ──────────────────────────────────────────────────────

def data_cards(d, W, H):
    # 4 metric cards — from JS: data-stats-board page(120,318), items rel(40,32,280,78)
    for img_x in [160, 440, 720, 1000]:
        rr(d, img_x, 32, img_x + 280, 110)

save('data/data-01-metric-cards.png', data_cards)


def data_supply(d, W, H):
    rr(d, 48, 78, 1392, 450)    # Total Supply line chart
    rr(d, 48, 462, 1392, 488)   # x-axis date labels

save('data/data-02-total-supply-chart.png', data_supply)


def data_collateral(d, W, H):
    rr(d, 28,  98, 700, 438)    # Collateral Value line chart
    rr(d, 28, 450, 700, 478)    # x-axis labels
    rr(d, 736, 98, 1286, 438)   # Pie / donut chart

save('data/data-03-collateral-pie.png', data_collateral)


def data_apy(d, W, H):
    # 3 mini APY charts side by side
    rr(d, 8,   62, 465, 295)
    rr(d, 480, 62, 948, 295)
    rr(d, 963, 62, 1432, 295)

save('data/data-04-apy-charts.png', data_apy)


# ── SMART ALLOCATOR ───────────────────────────────────────────

def sa_overview(d, W, H):
    # Left panel: 3 metric rows
    rr(d, 30, 115, 672, 222)    # Debt
    rr(d, 30, 258, 672, 362)    # Invested
    rr(d, 30, 405, 672, 505)    # Earnings + APY badge
    # Right: transparency bar chart
    rr(d, 718, 88, 1400, 515)

save('smart-allocator/sa-01-overview.png', sa_overview)


def sa_breakdown(d, W, H):
    # Protocol breakdown rows
    for y in [114, 193, 268, 348]:
        rr(d, 55, y, 900, y + 50)
    # Right: pie chart
    rr(d, 988, 48, 1428, 440)

save('smart-allocator/sa-02-assets-breakdown.png', sa_breakdown)


def sa_reserve(d, W, H):
    # Proof of Reserve table rows — 4 data columns per row
    for y in [88, 203, 316, 423, 528, 633, 730, 828, 926, 1020, 1115]:
        rr(d, 248, y + 8,  478,  y + 46)   # Invested
        rr(d, 525, y + 8,  698,  y + 46)   # Earnings
        rr(d, 735, y + 8,  818,  y + 46)   # APY
        rr(d, 872, y + 8, 1430,  y + 46)   # Address

save('smart-allocator/sa-03-proof-of-reserve.png', sa_reserve)


def sa_debt(d, W, H):
    # 3 debt rows
    for y in [118, 205, 283]:
        rr(d, 535, y + 5,  755, y + 38)    # Total Debt
        rr(d, 808, y + 5, 1362, y + 38)    # Contract address

save('smart-allocator/sa-04-debt-overview.png', sa_debt)


# ── TREASURY ──────────────────────────────────────────────────

def treasury_metrics(d, W, H):
    # Total Treasury Balance (top right)
    rr(d, 1085, 125, 1410, 148)
    # 4 financial columns × 3 year rows — exact positions from pixel scan
    cols = [(55, 195), (378, 540), (703, 885), (1013, 1163)]
    for y1, y2 in [(230, 290), (394, 454), (556, 618)]:
        for x1, x2 in cols:
            rr(d, x1, y1, x2, y2)

save('treasury/treasury-01-financial-metrics.png', treasury_metrics)


def treasury_buyback(d, W, H):
    # 3 buyback metric values
    rr(d,  55, 245, 468, 315)
    rr(d, 510, 245, 938, 315)
    rr(d, 978, 245, 1138, 315)

save('treasury/treasury-02-jst-buyback.png', treasury_buyback)


# ── NEWS ──────────────────────────────────────────────────────

def news_list(d, W, H):
    cw, gap = 273, 18
    for row in range(2):
        for col in range(4):
            x = col * (cw + gap)
            y = row * 306
            rr(d, x,    y,        x + cw,      y + 168)   # cover image
            rr(d, x,    y + 178,  x + cw - 10, y + 205)   # title line 1
            rr(d, x,    y + 210,  x + cw - 50, y + 232)   # title line 2
            rr(d, x,    y + 258,  x + 110,     y + 278)   # date

save('news/news-01-article-list.png', news_list)


# ── FAQ ───────────────────────────────────────────────────────

def faq_list(d, W, H):
    # Q1 expanded answer lines
    for y in range(106, 268, 32):
        end_x = W - 55 if y < 240 else W - 210
        rr(d, 18, y, end_x, y + 22)
    # Q2-Q8 collapsed question titles
    for y, w in [(293, 720), (375, 665), (456, 745), (537, 705), (618, 665), (698, 685), (778, 645)]:
        rr(d, 18, y, w, y + 26)

save('faq/faq-01-qa-list.png', faq_list)


# ── VAULT DETAIL ──────────────────────────────────────────────

def vault_metrics(d, W, H):
    rr(d, 18,   68, 462, 155)
    rr(d, 480,  68, 958, 155)
    rr(d, 978,  68, 1425, 155)

save('vault/vault-01-metrics.png', vault_metrics)


def vault_activities(d, W, H):
    for i in range(10):
        y = 100 + i * 70
        rr(d,  38,  y + 8,  425, y + 38)   # Date
        rr(d, 445,  y + 8,  570, y + 38)   # Action
        rr(d, 703,  y + 8,  810, y + 38)   # Asset
        rr(d, 955,  y + 8, 1100, y + 38)   # Amount
        rr(d, 1295, y + 8, 1420, y + 38)   # TX Hash

save('vault/vault-02-activities.png', vault_activities)


print(f'\nDone — 18 skeleton screens → {OUT}')
