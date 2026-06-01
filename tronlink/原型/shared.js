/* TronLink v4.0.0 改版原型 — 共享脚本（i18n / 主题 / 导航） */

/* === i18n 文案表（M1 §9 + M2 §14 + M5 §14 + M3 §17）=== */
const i18n = {
  'en': {
    'nav.features': 'Features',
    'nav.ecosystem': 'Ecosystem',
    'nav.ai': 'AI Support',
    'nav.ai.mcp_server': 'MCP Server',
    'nav.ai.mcp_core': 'MCP Core',
    'nav.ai.skills': 'Skills',
    'nav.ai.signer': 'TronLink Signer',
    'nav.ai.cli': 'TronLink CLI',
    'nav.developers': 'Developers',
    'nav.security': 'Security',
    'nav.support': 'Help',
    'nav.company': 'About',
    'nav.cta': 'Get TronLink',
    'nav.lang': 'English',

    'hero.badge': "★ TRON's #1 Preferred Wallet",
    'hero.h1.lead': "TRON's ",
    'hero.h1.accent': 'Preferred',
    'hero.h1.tail': ' Wallet,',
    'hero.h1.line2': 'your easy gateway to Web3',
    'hero.sub.prefix': 'Trusted by ',
    'hero.sub.users': '10,000,000+',
    'hero.sub.suffix': ' users — secure, simple, and yours',
    'hero.platform.label': 'Now available on',

    'data.users': 'Users',
    'data.countries': 'Countries',
    'data.tokens': 'Tokens',
    'data.years': 'of trust',
    'data.years.value': '7+ Years',

    'alert.prefix': 'Verify TronLink official domain:',
    'alert.copy': 'Copy',
    'alert.copied': 'Copied',
    'alert.more': 'Learn more →',

    'footer.col.product': 'Product',
    'footer.col.resources': 'Resources',
    'footer.col.developers': 'Developers',
    'footer.col.company': 'About',
    'footer.copy': '©Helix Tech Company Limited 2026 · All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.tagline': 'Built for TRON — secure, simple, and yours.',
  },
  'zh-CN': {
    'nav.features': '功能',
    'nav.ecosystem': '生态',
    'nav.ai': 'AI 支持',
    'nav.ai.mcp_server': 'MCP Server',
    'nav.ai.mcp_core': 'MCP Core',
    'nav.ai.skills': 'Skills',
    'nav.ai.signer': 'TronLink Signer',
    'nav.ai.cli': 'TronLink CLI',
    'nav.developers': '开发者',
    'nav.security': '安全中心',
    'nav.support': '帮助',
    'nav.company': '关于',
    'nav.cta': '下载 TronLink',
    'nav.lang': '简体中文',

    'hero.badge': '★ TRON 用户首选钱包',
    'hero.h1.lead': 'TRON ',
    'hero.h1.accent': '首选',
    'hero.h1.tail': '钱包，',
    'hero.h1.line2': '轻松进入 Web3',
    'hero.sub.prefix': '',
    'hero.sub.users': '1000W+',
    'hero.sub.suffix': ' 用户的选择 — 安全、简单、属于你自己',
    'hero.platform.label': '现已支持',

    'data.users': '全球用户',
    'data.countries': '国家',
    'data.tokens': '通证',
    'data.years': '信任沉淀',
    'data.years.value': '7+ 年',

    'alert.prefix': '请认准 TronLink 唯一官网：',
    'alert.copy': '复制',
    'alert.copied': '已复制',
    'alert.more': '了解更多 →',

    'footer.col.product': '产品',
    'footer.col.resources': '资源',
    'footer.col.developers': '开发者',
    'footer.col.company': '关于',
    'footer.copy': '©Helix Tech Company Limited 2026 · 版权所有',
    'footer.privacy': '隐私政策',
    'footer.tagline': '为 TRON 而生 — 安全、简单、属于你自己。',
  },
  'zh-TW': {
    'nav.features': '功能',
    'nav.ecosystem': '生態',
    'nav.ai': 'AI 支援',
    'nav.ai.mcp_server': 'MCP Server',
    'nav.ai.mcp_core': 'MCP Core',
    'nav.ai.skills': 'Skills',
    'nav.ai.signer': 'TronLink Signer',
    'nav.ai.cli': 'TronLink CLI',
    'nav.developers': '開發者',
    'nav.security': '安全中心',
    'nav.support': '幫助',
    'nav.company': '關於',
    'nav.cta': '下載 TronLink',
    'nav.lang': '繁體中文',

    'hero.badge': '★ TRON 用戶首選錢包',
    'hero.h1.lead': 'TRON ',
    'hero.h1.accent': '首選',
    'hero.h1.tail': '錢包，',
    'hero.h1.line2': '輕鬆進入 Web3',
    'hero.sub.prefix': '',
    'hero.sub.users': '1000W+',
    'hero.sub.suffix': ' 用戶的選擇 — 安全、簡單、屬於你自己',
    'hero.platform.label': '現已支援',

    'data.users': '全球用戶',
    'data.countries': '國家',
    'data.tokens': '通證',
    'data.years': '信任沉澱',
    'data.years.value': '7+ 年',

    'alert.prefix': '請認準 TronLink 唯一官網：',
    'alert.copy': '複製',
    'alert.copied': '已複製',
    'alert.more': '瞭解更多 →',

    'footer.col.product': '產品',
    'footer.col.resources': '資源',
    'footer.col.developers': '開發者',
    'footer.col.company': '關於',
    'footer.copy': '©Helix Tech Company Limited 2026 · 版權所有',
    'footer.privacy': '隱私政策',
    'footer.tagline': '為 TRON 而生 — 安全、簡單、屬於你自己。',
  }
};

/* === 主题与语言切换 === */
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('tronlink_theme', theme);
  document.querySelectorAll('[data-theme-btn]').forEach(b =>
    b.classList.toggle('active', b.dataset.themeBtn === theme));
}

function setLang(lang) {
  document.body.setAttribute('data-lang', lang);
  document.documentElement.lang = lang;
  localStorage.setItem('tronlink_lang', lang);
  const dict = i18n[lang] || i18n['en'];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.textContent = dict[key];
  });
  document.querySelectorAll('[data-lang-btn]').forEach(b =>
    b.classList.toggle('active', b.dataset.langBtn === lang));
}

function cycleLang() {
  const cur = document.body.getAttribute('data-lang') || 'en';
  const next = cur === 'en' ? 'zh-CN' : cur === 'zh-CN' ? 'zh-TW' : 'en';
  setLang(next);
}

/* === 顶部控制条 HTML 注入 === */
function injectControlBar(currentPage) {
  const pages = [
    { id: 'index', name: '🏠 总览', href: 'index.html' },
    { id: 'home', name: '首页', href: 'home.html' },
    { id: 'features', name: '功能', href: 'features.html' },
    { id: 'ai-support', name: 'AI 支持', href: 'ai-support.html' },
    { id: 'developers', name: '开发者', href: 'developers.html' },
    { id: 'company', name: '关于', href: 'company.html' },
    { id: 'security', name: '安全', href: 'security.html' },
    { id: 'download', name: '下载', href: 'download.html' },
    { id: 'privacy', name: '隐私政策', href: 'legal-privacy.html' },
    { id: '404', name: '404', href: '404.html' },
  ];
  const html = `
    <div class="proto-controls">
      <div class="pages">
        ${pages.map(p => `<a href="${p.href}" class="${p.id === currentPage ? 'active' : ''}">${p.name}</a>`).join('')}
      </div>
      <div class="group">
        <span class="label">主题</span>
        <button data-theme-btn="dark" onclick="setTheme('dark')">暗</button>
        <button data-theme-btn="light" onclick="setTheme('light')">亮</button>
      </div>
      <div class="group">
        <span class="label">语言</span>
        <button data-lang-btn="en" onclick="setLang('en')">EN</button>
        <button data-lang-btn="zh-CN" onclick="setLang('zh-CN')">简</button>
        <button data-lang-btn="zh-TW" onclick="setLang('zh-TW')">繁</button>
      </div>
      <div style="margin-left:auto;color:#8088A0;font-size:11px;">
        TronLink v4.0.0 改版原型 · ${currentPage.toUpperCase()}
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);
}

/* === Header 通知铃铛 + 公告抽屉（B 方案）=== */
const announcements = [
  { id: 1, tag: '产品更新', time: '2 小时前', title: 'v4.19.5 Android 版本上线 — 修复 USDT 显示问题，建议立即更新', url: 'https://support.tronlink.org/' },
  { id: 2, tag: '安全提醒', time: '昨天', title: '警惕仿冒 TronLink Android APK，请仅从 Google Play 下载', url: 'https://support.tronlink.org/' },
  { id: 3, tag: '功能上线', time: '3 天前', title: 'GasFree 升级：支持更多 TRC20 通证零 Gas 转账', url: 'https://support.tronlink.org/' },
  { id: 4, tag: '生态合作', time: '上周', title: 'SUN.io 流动性接入完成，Swap 深度提升 30%', url: 'https://support.tronlink.org/' },
];

function getReadAnnouncements() {
  try { return JSON.parse(localStorage.getItem('tronlink_read_announcements') || '[]'); }
  catch (e) { return []; }
}
function setReadAnnouncements(arr) {
  localStorage.setItem('tronlink_read_announcements', JSON.stringify(arr));
}
function getUnreadCount() {
  const read = getReadAnnouncements();
  return announcements.filter(a => !read.includes(a.id)).length;
}

function buildNotifPanelHtml() {
  const read = getReadAnnouncements();
  const items = announcements.map(a => {
    const isUnread = !read.includes(a.id);
    return `
      <a href="${a.url}" target="_blank" rel="noopener" class="notif-item ${isUnread ? 'unread' : ''}" data-id="${a.id}">
        <div class="meta">
          <span class="tag">${a.tag}</span>
          <span class="time">${a.time}</span>
        </div>
        <div class="title">${a.title}</div>
      </a>
    `;
  }).join('');
  const unread = getUnreadCount();
  return `
    <div class="panel-head">
      <h4>📣 公告 <span class="count">${announcements.length}</span></h4>
      <button class="mark-all" onclick="markAllAnnouncementsRead()" type="button">全部标记已读</button>
    </div>
    <div class="notif-list">${items}</div>
    <div class="panel-foot">
      <a href="https://support.tronlink.org" target="_blank" rel="noopener">查看更多公告 ↗</a>
    </div>
  `;
}

function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  const btn = document.getElementById('notif-btn');
  if (!panel || !btn) return;
  const willOpen = !panel.classList.contains('open');
  panel.classList.toggle('open', willOpen);
  btn.classList.toggle('open', willOpen);
  if (willOpen) {
    panel.innerHTML = buildNotifPanelHtml();
    // 打开即把"显示出来的"全部标记已读
    setTimeout(() => {
      setReadAnnouncements(announcements.map(a => a.id));
      updateNotifBadge();
    }, 800);
  }
}

function markAllAnnouncementsRead() {
  setReadAnnouncements(announcements.map(a => a.id));
  updateNotifBadge();
  // 更新 panel 内 unread 状态
  const panel = document.getElementById('notif-panel');
  if (panel && panel.classList.contains('open')) {
    panel.innerHTML = buildNotifPanelHtml();
  }
}

function updateNotifBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const count = getUnreadCount();
  badge.textContent = count;
  badge.classList.toggle('empty', count === 0);
}

// 点击外部关闭抽屉
document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.notif-wrap');
  const panel = document.getElementById('notif-panel');
  if (!wrap || !panel) return;
  if (!wrap.contains(e.target)) {
    panel.classList.remove('open');
    const btn = document.getElementById('notif-btn');
    if (btn) btn.classList.remove('open');
  }
});

/* === 顶部反钓鱼提示条（常驻显示，不可关闭）=== */
function injectTopAlert() {
  return `
    <div class="top-alert" id="top-alert">
      <span class="icon">⚠️</span>
      <span class="msg">
        <span data-i18n="alert.prefix">请认准 TronLink 唯一官网：</span>
        <span class="url-pill" id="alert-url">https://tronlink.org</span>
        <button class="copy-btn" onclick="copyOfficialUrl(this)" type="button"><span>📋</span><span data-i18n="alert.copy" class="copy-label">复制</span></button>
      </span>
      <a href="security.html" class="more-link" data-i18n="alert.more">了解更多 →</a>
    </div>
  `;
}
function copyOfficialUrl(btn) {
  const url = 'https://tronlink.org';
  const label = btn.querySelector('.copy-label');
  const original = label.textContent;
  const lang = document.body.getAttribute('data-lang') || 'en';
  const copiedText = (i18n[lang] && i18n[lang]['alert.copied']) || '已复制';
  const finish = () => {
    btn.classList.add('copied');
    label.textContent = copiedText;
    setTimeout(() => {
      btn.classList.remove('copied');
      label.textContent = original;
    }, 1600);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(finish, finish);
  } else {
    const ta = document.createElement('textarea');
    ta.value = url; document.body.appendChild(ta);
    ta.select(); try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    finish();
  }
}

/* === 顶部站点 Nav HTML（M2 §4）=== */
function injectSiteNav(activePage) {
  const cls = (p) => activePage === p ? 'class="active"' : '';
  return `
    <nav class="nav">
      <a href="home.html" class="nav-logo" aria-label="TronLink 首页">
        <img class="logo-img logo-dark" src="assets/logo-dark.png" alt="TronLink">
        <img class="logo-img logo-light" src="assets/logo-light.png" alt="TronLink">
      </a>
      <div class="nav-items">
        <a href="features.html" data-i18n="nav.features" ${cls('features')}>功能</a>
        <a href="ai-support.html" data-i18n="nav.ai" ${cls('ai-support')}>AI 支持</a>
        <a href="developers.html" data-i18n="nav.developers" ${cls('developers')}>开发者</a>
        <a href="security.html" data-i18n="nav.security" ${cls('security')}>安全中心</a>
        <a href="company.html" data-i18n="nav.company" ${cls('company')}>关于</a>
        <a href="https://support.tronlink.org" target="_blank" rel="noopener" class="nav-ext"><span data-i18n="nav.support">帮助</span><svg class="ext-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3.5 8.5 L8.5 3.5 M4.5 3.5 H8.5 V7.5"/></svg></a>
      </div>
      <div class="nav-right">
        <div class="notif-wrap">
          <button class="notif-btn" id="notif-btn" type="button" aria-label="公告" onclick="toggleNotifPanel()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span class="notif-badge" id="notif-badge"></span>
          </button>
          <div class="notif-panel" id="notif-panel"></div>
        </div>
        <button class="lang-switch" onclick="cycleLang()">
          <span data-i18n="nav.lang">简体中文</span>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" fill="currentColor"/></svg>
        </button>
        <a href="download.html" class="btn btn-primary btn-small" data-i18n="nav.cta">下载 TronLink</a>
      </div>
    </nav>
  `;
}

/* === Footer HTML（M2 §5）=== */
function injectSiteFooter() {
  return `
    <footer class="footer">
      <div class="container" style="padding:0;">
        <div class="footer-main">
          <!-- 品牌区 -->
          <div class="footer-brand">
            <a href="home.html" class="footer-logo" aria-label="TronLink 首页">
              <img class="logo-img logo-dark" src="assets/logo-dark.png" alt="TronLink">
              <img class="logo-img logo-light" src="assets/logo-light.png" alt="TronLink">
            </a>
            <p class="footer-tagline" data-i18n="footer.tagline">为 TRON 而生 — 安全、简单、属于你自己。</p>
            <div class="footer-socials">
              <a href="https://x.com/TronLinkWallet" target="_blank" rel="noopener" title="X (formerly Twitter)"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <a href="https://t.me/TronLink" target="_blank" rel="noopener" title="Telegram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/></svg></a>
              <a href="https://github.com/TronLink" target="_blank" rel="noopener" title="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            </div>
          </div>

          <!-- 链接列 -->
          <div class="footer-cols">
            <div class="footer-col">
              <h4 data-i18n="footer.col.product">产品</h4>
              <ul>
                <li><a href="download.html">下载 TronLink</a></li>
                <li><a href="download.html?platform=android">Android</a></li>
                <li><a href="download.html?platform=ios">iOS</a></li>
                <li><a href="download.html?platform=extension">浏览器插件</a></li>
                <li><a href="features.html">功能介绍</a></li>
                <li><a href="ai-support.html">AI 支持</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4 data-i18n="footer.col.developers">开发者</h4>
              <ul>
                <li><a href="https://docs.tronlink.org/zh/" target="_blank" rel="noopener">开发者文档 ↗</a></li>
                <li><a href="https://developers.tron.network/docs/tronlink-integration" target="_blank" rel="noopener">DApp 集成 ↗</a></li>
                <li><a href="https://tronweb.network/docu/docs/intro/" target="_blank" rel="noopener">TronWeb ↗</a></li>
                <li><a href="https://tronprotocol.github.io/documentation-zh/mechanism-algorithm/dpos/" target="_blank" rel="noopener">TRON 协议 ↗</a></li>
                <li><a href="https://github.com/TronLink" target="_blank" rel="noopener">GitHub ↗</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4 data-i18n="footer.col.resources">资源</h4>
              <ul>
                <li><a href="https://support.tronlink.org" target="_blank" rel="noopener">帮助中心 ↗</a></li>
                <li><a href="security.html">安全中心</a></li>
                <li><a href="security.html#domains">官方域名</a></li>
                <li><a href="security.html#phishing">反钓鱼指南</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4 data-i18n="footer.col.company">关于</h4>
              <ul>
                <li><a href="company.html">关于 TronLink</a></li>
                <li><a href="mailto:tronlink@tronlink.org">联系我们</a></li>
                <li><a href="https://x.com/TronLinkWallet" target="_blank" rel="noopener">X ↗</a></li>
                <li><a href="https://t.me/TronLink" target="_blank" rel="noopener">Telegram ↗</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span class="footer-copy" data-i18n="footer.copy">©Helix Tech Company Limited 2026 · 版权所有</span>
          <span class="footer-sep">·</span>
          <a class="footer-link" href="legal-privacy.html" data-i18n="footer.privacy">隐私政策</a>
        </div>
      </div>
    </footer>
  `;
}

/* === 启动初始化 === */
window.addEventListener('DOMContentLoaded', () => {
  // 1. 注入顶部反钓鱼提示条（常驻不可关）
  const alertHtml = injectTopAlert();
  if (alertHtml) {
    const ctrl = document.querySelector('.proto-controls');
    if (ctrl) ctrl.insertAdjacentHTML('afterend', alertHtml);
    else document.body.insertAdjacentHTML('afterbegin', alertHtml);
  }

  // 2. 恢复主题与语言偏好
  const savedTheme = localStorage.getItem('tronlink_theme') || 'light';
  const savedLang = localStorage.getItem('tronlink_lang') || 'zh-CN';
  setTheme(savedTheme);
  setLang(savedLang);

  // 3. 初始化通知铃铛 badge（公告未读数）
  updateNotifBadge();
});
