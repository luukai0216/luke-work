import fs from 'node:fs';
import path from 'node:path';

const sourcePath = '/Users/luke/luke-usdd/tronlink-home/tronlink-homepage-mirror/index.html';
const outputDir = '/Users/luke/luke-usdd/11';

const sectionMeta = {
  section0: { order: 1, slug: 'home-hero', label: 'Home Hero', bodyClass: 'vo-on-hero' },
  section1: { order: 2, slug: 'wallet-security', label: 'Wallet Security' },
  section2: { order: 3, slug: 'network-coverage', label: 'Network Coverage' },
  section5: { order: 4, slug: 'asset-management', label: 'Asset Management' },
  section3: { order: 5, slug: 'user-experience', label: 'User Experience' },
  sectionFooterCta: { order: 6, slug: 'get-started', label: 'Get Started' },
};

const exportStyles = `
<style id="single-screen-export-overrides">
html, body {
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: #081224;
}

body.single-screen-export {
  margin: 0;
}

body.single-screen-export .pc {
  display: block !important;
}

body.single-screen-export .mobile,
body.single-screen-export .page-footer,
body.single-screen-export .scroll-cue-arrow,
body.single-screen-export #fp-nav,
body.single-screen-export #fp-nav.fp-right,
body.single-screen-export .fp-slidesNav,
body.single-screen-export .hide {
  display: none !important;
}

body.single-screen-export .header-container {
  position: relative !important;
  z-index: 20;
}

body.single-screen-export #fullpage.single-export {
  display: block !important;
  height: auto !important;
  transform: none !important;
}

body.single-screen-export #fullpage.single-export > .section {
  display: block !important;
  position: relative !important;
  min-height: 100vh !important;
  height: auto !important;
  overflow: hidden !important;
}

body.single-screen-export #fullpage.single-export > .section > div {
  min-height: inherit;
}

body.single-screen-export .opacity,
body.single-screen-export [class*="opacity"] {
  opacity: 1 !important;
}

body.single-screen-export .page0-line {
  display: none !important;
}

body.single-screen-export .footer-cta-section {
  min-height: 100vh !important;
  box-sizing: border-box !important;
}
</style>`;

const exportScript = `
<script id="single-screen-export-script">
(function () {
  var section = document.querySelector('#fullpage > .section');
  if (!section) return;
  var header = document.querySelector('.header-container');
  if (header) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }

  if (section.id === 'section0' && window.$ && $.fn && $.fn.qrcode) {
    var container = document.getElementById('heroQrCode');
    if (container && !container.childNodes.length) {
      try {
        $(container).qrcode({ width: 32, height: 32, text: 'https://www.tronlink.org/dlDetails/' });
      } catch (e) {}
    }
  }
})();
</script>`;

function findMatchingDivEnd(html, startIndex) {
  const tokenRegex = /<div\b[^>]*>|<\/div>/gi;
  tokenRegex.lastIndex = startIndex;
  let depth = 0;
  let match;

  while ((match = tokenRegex.exec(html))) {
    if (match[0].startsWith('</div')) {
      depth -= 1;
      if (depth === 0) {
        return tokenRegex.lastIndex;
      }
      continue;
    }
    depth += 1;
  }

  throw new Error(`Unable to find matching </div> for block at index ${startIndex}`);
}

function extractTopLevelSections(fullpageInner) {
  const cleaned = fullpageInner.replace(/<!--[\s\S]*?-->/g, '');
  const sections = [];
  const sectionStartRegex = /<div class="section\b[^"]*" id="([^"]+)">/g;
  let match;

  while ((match = sectionStartRegex.exec(cleaned))) {
    const start = match.index;
    const end = findMatchingDivEnd(cleaned, start);
    sections.push({
      id: match[1],
      html: cleaned.slice(start, end),
    });
    sectionStartRegex.lastIndex = end;
  }

  return sections;
}

function buildHtml({ headMarkup, prefixMarkup, sectionHtml, meta }) {
  const title = `TronLink Wallet | ${meta.label}`;
  const bodyClass = ['single-screen-export', meta.bodyClass || ''].filter(Boolean).join(' ');
  const headWithTitle = headMarkup.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${title}</title>`
  );

  const finalHead = headWithTitle.replace('</head>', `${exportStyles}\n</head>`);

  return `<!DOCTYPE html>
<html lang="en">
${finalHead}
<body class="${bodyClass}">
${prefixMarkup}
<div id="fullpage" class="pc single-export">
${sectionHtml}
</div>
<script src="https://www.tronlink.org/lib/jquery/jquery-3.5.0.min.js"></script>
<script src="https://www.tronlink.org/lib/jquery/jquery.qrcode.min.js"></script>
${exportScript}
</body>
</html>
`;
}

function main() {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const headMatch = source.match(/<head id="head">[\s\S]*?<\/head>/i);
  const bodyMatch = source.match(/<body>[\s\S]*<\/body>/i);

  if (!headMatch || !bodyMatch) {
    throw new Error('Unable to locate <head> or <body> in source file.');
  }

  const headMarkup = headMatch[0];
  const bodyMarkup = bodyMatch[0];
  const fullpageMarker = '<div id="fullpage" class="pc">';
  const fullpageStart = bodyMarkup.indexOf(fullpageMarker);

  if (fullpageStart === -1) {
    throw new Error('Unable to locate #fullpage container.');
  }

  const fullpageOpenEnd = fullpageStart + fullpageMarker.length;
  const fullpageClose = findMatchingDivEnd(bodyMarkup, fullpageStart);
  const prefixMarkup = bodyMarkup
    .slice(bodyMarkup.indexOf('>') + 1, fullpageStart)
    .trim();
  const fullpageInner = bodyMarkup.slice(fullpageOpenEnd, fullpageClose - '</div>'.length);
  const sections = extractTopLevelSections(fullpageInner);

  fs.mkdirSync(outputDir, { recursive: true });

  const exported = [];
  for (const section of sections) {
    const meta = sectionMeta[section.id];
    if (!meta) continue;
    const fileName = `${String(meta.order).padStart(2, '0')}-${meta.slug}.html`;
    const filePath = path.join(outputDir, fileName);
    const html = buildHtml({
      headMarkup,
      prefixMarkup,
      sectionHtml: section.html,
      meta,
    });

    fs.writeFileSync(filePath, html, 'utf8');
    exported.push({ ...meta, fileName });
  }

  const indexMarkup = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TronLink Fullpage Export</title>
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #081224;
      color: #fff;
      padding: 40px 24px;
    }
    .wrap {
      max-width: 960px;
      margin: 0 auto;
    }
    h1 {
      margin: 0 0 12px;
      font-size: 32px;
    }
    p {
      margin: 0 0 24px;
      color: rgba(255, 255, 255, 0.7);
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 12px;
    }
    a {
      display: block;
      padding: 16px 18px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.06);
      color: #fff;
      text-decoration: none;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    a:hover {
      background: rgba(60, 124, 243, 0.18);
      border-color: rgba(60, 124, 243, 0.45);
    }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>TronLink Fullpage Export</h1>
    <p>Each file below contains one desktop fullpage section exported from the mirror source.</p>
    <ul>
      ${exported
        .map((item) => `<li><a href="./${item.fileName}">${String(item.order).padStart(2, '0')} · ${item.label}</a></li>`)
        .join('\n      ')}
    </ul>
  </div>
</body>
</html>
`;

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexMarkup, 'utf8');

  console.log(`Exported ${exported.length} files to ${outputDir}`);
  for (const item of exported) {
    console.log(`- ${item.fileName}`);
  }
}

main();
