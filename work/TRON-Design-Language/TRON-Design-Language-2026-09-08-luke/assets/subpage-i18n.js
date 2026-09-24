(()=>{
  const language=localStorage.getItem('tron-design-language')==='zh-CN'?'zh-CN':'en';
  const common={
    'Visual Concept':'视觉概念','Glyph Features':'字形特征','Typography System':'字体系统','Character Set':'字符集'
  };
  const glyph={
    'Glyph':'字形','Features':'特征',
    'Balanced proportions and rigorous forms give the typeface a stable, trustworthy character. Clear distinctions between characters support direct communication and precise expression in digital environments.':'均衡的比例与严谨的造型赋予字体稳定、可信的特质。清晰的字符区分支持数字环境中的直接沟通与准确表达。',
    'Signature':'标志性','Glyphs':'字形',
    'Structured terminals, clear counters and a stable baseline create a unified glyph language with strong recognition across weights and sizes.':'结构化端点、清晰字腔与稳定基线构成统一的字形语言，在不同字重和字号下都保持高度识别。',
    'Directional Terminals':'方向性端点','The diagonal cuts at the upper-left and lower-right of N introduce a clear forward direction. Used with restraint, they create a recognizable TRON signature without interrupting continuous reading.':'N 左上与右下的斜切形成明确的前进方向。克制使用时，它能建立可识别的 TRON 特征，同时不干扰连续阅读。',
    'Balanced Curves':'均衡曲线','The outer and inner contours of O follow a controlled oval rhythm. Even stroke distribution and generous counter space keep the form open, stable and legible across weights.':'O 的内外轮廓遵循受控的椭圆节奏。均匀的笔画分布与充足的字腔空间，使其在不同字重下保持开放、稳定且清晰。',
    'Balanced Counters':'均衡字腔','The straight stem and curved bowl of D frame an open counter. Controlled transitions between straight and curved strokes give the glyph a stable, balanced structure.':'D 的直立主干与弧形字碗围合出开放字腔。直线与曲线之间受控的过渡，使字形结构稳定而均衡。',
    'Vertical Metrics':'垂直度量','Ascender, cap height, x-height, baseline and descender establish a consistent vertical framework. These shared proportions create reliable alignment and rhythm across characters.':'上升部、大写高度、x 高度、基线与下降部共同建立一致的垂直框架。这些共享比例为字符带来可靠的对齐与节奏。',
    'Type Tester':'字体测试器','Enter custom content and adjust size, weight and tracking to experience the typeface under different typographic conditions in real time.':'输入自定义内容并调整字号、字重与字距，实时体验字体在不同排版条件下的表现。',
    'Bold':'粗体','Semi Bold':'半粗体','Regular':'常规体','Light':'细体','Size':'字号','Tracking':'字距',
    'Applications':'应用场景','The typeface supports three essential roles across web experiences: brand expression, content reading and data-rich interaction.':'字体在网页体验中承担三类核心角色：品牌表达、内容阅读与数据交互。',
    'Brand & Display':'品牌与展示','Used for homepage headlines, core messages and featured content to build brand recognition and visual memory.':'用于首页标题、核心主张与重点内容，以鲜明的字形建立品牌识别和视觉记忆。',
    'Content & Reading':'内容与阅读','Used for body copy, descriptions, navigation and information hierarchy to maintain clear reading across pages and screen sizes.':'用于正文、说明、导航与信息层级，在不同页面和屏幕尺寸下保持清晰、连贯的阅读体验。',
    'Data & Interaction':'数据与交互','Used for forms, buttons, states, values and feedback to support accurate recognition and efficient action.':'用于表单、按钮、状态、数值和反馈信息，在高密度与动态场景中保证准确识别和操作效率。'
  };
  const type={
    'From expressive headlines to compact data, maintain one consistent visual voice. Four weights, type scale, and tokens create a flexible system for brand and product experiences.':'从富有表现力的标题到紧凑的数据，始终保持一致的视觉声音。四档字重、字体层级与 Token 共同构成适用于品牌和产品体验的灵活系统。',
    'Four weights—Regular 400, Medium 500, SemiBold 600, and Bold 700—support clear reading, considered emphasis, and distinctive headlines. Use these defined weights consistently across design and implementation.':'常规体 400、中等体 500、半粗体 600 与粗体 700，四档字重分别支持清晰阅读、适度强调与鲜明标题。设计与开发应统一使用这四档字重。',
    'Weight options':'字重选项','Count · Default':'数量 · 默认','Body and supporting copy':'正文与辅助文案','Labels and emphasis':'标签与强调',
    'Typography':'字体','System':'系统',
    'From expressive headlines to compact data, maintain one consistent visual voice. Variable axes, weights, type scale, and tokens create a flexible system for brand and product experiences.':'从富有表现力的标题到紧凑的数据，始终保持一致的视觉声音。可变轴、字重、字体层级与 Token 共同构成适用于品牌和产品体验的灵活系统。',
    'Design Space':'设计空间','The Variable Font covers a continuous spectrum from lightweight information to high-impact display typography. Designers may explore continuous values, while handoff should prioritize the recommended nodes.':'可变字体覆盖从轻量信息到高冲击力展示字体的连续范围。设计阶段可探索连续数值，交付时应优先采用推荐节点。',
    'Thin':'极细体','Light':'细体','Regular':'常规体','Medium':'中等体','SemiBold':'半粗体','Bold':'粗体','Black':'特粗体',
    'Axis':'轴','Range · Default':'范围 · 默认','Recommended':'推荐值','Supporting information':'辅助信息','Headlines and actions':'标题与操作','Display and emphasis':'展示与强调',
    'Weights & Usage':'字重与用途','Each weight has a clear responsibility—from supporting copy and body text to interaction labels, critical data, and expressive display headlines.':'每个字重承担明确职责，从辅助文案和正文，到交互标签、关键数据与富有表现力的展示标题。',
    'Brand Headlines':'品牌标题','Product UI':'产品界面','Data':'数据',
    'Type Scale':'字体层级','Display, Headline, Title, Body, and Label define five semantic roles. Large, Medium, and Small create fifteen levels; every level specifies size, line height, weight, tracking, and intended use.':'Display、Headline、Title、Body 与 Label 定义五种语义角色；Large、Medium 与 Small 组成十五个层级，每一级均明确字号、行高、字重、字距和使用场景。',
    'Display Large':'展示型 · 大','Display Medium':'展示型 · 中','Display Small':'展示型 · 小','Headline Large':'主标题 · 大','Headline Medium':'主标题 · 中','Headline Small':'主标题 · 小','Title Large':'标题 · 大','Title Medium':'标题 · 中','Title Small':'标题 · 小','Body Large':'正文 · 大','Body Medium':'正文 · 中','Body Small':'正文 · 小','Label Large':'标签 · 大','Label Medium':'标签 · 中','Label Small':'标签 · 小',
    'Brand hero':'品牌主视觉','Campaign theme':'传播主题','Focus headline':'焦点标题','Page title':'页面标题','Section title':'章节标题','Content heading':'内容标题','Module title':'模块标题','Card title':'卡片标题','List title':'列表标题','Lead and key body':'引导及重点正文','Default body':'默认正文','Supporting copy':'辅助文案','Primary action':'主要操作','Navigation and tag':'导航与标签','Status and note':'状态与注释',
    'Clear information across products and communications.':'在产品与传播中清晰呈现信息。','A consistent type system supports clear reading.':'一致的字体系统支持清晰阅读。','Supporting information and secondary descriptions.':'辅助信息与次级说明。',
    'Type Tokens':'字体 Token','Semantic naming connects visual parameters to intended use. The default family is TRON Variable; each token contains size, line height, weight, and tracking.':'语义化命名将视觉参数与使用目的连接。默认字体家族为 TRON Variable；每个 Token 包含字号、行高、字重与字距。',
    'Style':'样式','Size / Line':'字号 / 行高','Weight':'字重','Tracking':'字距','Primary use':'主要用途',
    'Usage & Readability':'使用与可读性','Size, line height, weight, and line length must work together. These boundaries keep English content readable across brand communications and product interfaces.':'字号、行高、字重与行长需要协同工作。以下边界确保内容在品牌传播和产品界面中保持良好可读性。',
    'Use at least 14px for product body copy; default to 16px / 24px.':'产品正文至少使用 14px，默认采用 16px / 24px。',
    'Keep body line height between 1.4× and 1.6× the font size.':'正文行高保持在字号的 1.4 至 1.6 倍。',
    'Limit continuous text to 45–75 English characters per line.':'连续正文每行建议控制在 45–75 个英文字符的等效长度。',
    'Reserve all caps for buttons, navigation, and short status labels.':'全大写仅用于按钮、导航与简短状态标签。',
    'Do not use body text below 14px in product interfaces.':'产品界面中的正文字号不得低于 14px。',
    'Avoid line heights below 1.2× or above 1.8× the font size.':'避免使用低于字号 1.2 倍或高于 1.8 倍的行高。',
    'Do not set long paragraphs in all caps or heavy weights.':'不要使用全大写或高字重排版长段落。',
    'Avoid overly long lines, extreme tracking, or centered body copy.':'避免过长行宽、极端字距或正文居中排版。'
  };
  const charset={
    'Character':'字符','Set':'集','Character Set':'字符集',
    'Designed for English information and digital contexts.':'面向英文信息与数字场景设计。',
    'Letters, numerals, essential symbols and OpenType features demonstrate the typeface’s core capabilities in brand communications and digital products.':'字母、数字、常用符号与 OpenType 特性，展示字体在品牌传播与数字产品中的核心能力。',
    'Capability overview':'能力总览',
    'A focused, clearly defined character set supports English communications, numerical information and product interfaces—maintaining one coherent visual expression across core use cases.':'精简而明确的字符集支持英文传播、数值信息与产品界面，在核心使用场景中保持一致的视觉表达。',
    'CHARACTERS':'字符','SUPPORTED LANGUAGE':'支持语言','FONT FORMAT':'字体格式','1 Axis':'1 轴','VARIABLE CONTROL':'可变控制',
    'These representative characters cover letters, numerals, common punctuation, currency signs and essential symbols, demonstrating consistent structure and visual rhythm across categories.':'这些代表性字符覆盖字母、数字、常用标点、货币符号与基础符号，展示各类字形在结构与节奏上的一致性。',
    'Numeral System':'数字系统',
    'Numerals are central to blockchain experiences. From asset values and transaction records to network data, high distinction and reliable alignment make complex information easier to scan, compare and trust.':'数字是区块链体验的核心。从资产数值、交易记录到网络数据，高区分度与可靠对齐让复杂信息更易扫描、比较与信任。',
    'Every numeral occupies the same width, keeping tables, transactions, asset prices and code aligned in stable columns.':'每个数字占用相同宽度，使表格、交易、资产价格与代码保持稳定的列对齐。',
    'Each numeral uses a natural width based on its form, creating a smoother rhythm for headlines, body copy and brand communication.':'每个数字依据字形使用自然宽度，为标题、正文与品牌传播带来更顺畅的节奏。',
    'OpenType':'OpenType','features':'特性','OpenType features':'OpenType 特性',
    'OpenType features let the system adapt numeral forms and character styles to body copy, data-heavy interfaces and moments of emphasis.':'OpenType 特性让数字形态与字符样式可以适配正文、数据界面与强调场景。',
    'Tabular Figures':'表格数字','Proportional Figures':'比例数字','Slashed Zero':'斜杠零','Fractions':'分数','Subscript':'下标','Superscript':'上标','Case-sensitive Forms':'大小写敏感形式','Stylistic Alternates':'风格替换',
    'ASCENDER':'上伸线','CAP-HEIGHT':'大写高度线','X-HEIGHT':'x 高度线','BASE':'基线','DESCENDER':'下伸线'
  };
  const isGlyph=/Glyph-Features\.html$/i.test(location.pathname);
  const isCharset=/Character-Set\.html$/i.test(location.pathname);
  const page=isGlyph?glyph:isCharset?charset:type;
  const translations={...common,...page};
  if(language==='zh-CN'){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{if(node.parentElement?.closest('.weight-control,.numeral-title,.numeral-zh-title,.glyph,.preview-char,.tabular-row,.proportional-num,.align-row,.ot-card .sample,.ot-card .tag,.hero-title'))return;const key=node.nodeValue.trim();if(translations[key])node.nodeValue=node.nodeValue.replace(key,translations[key])});
    document.title=isGlyph?'字形特征 — TRON 设计语言':isCharset?'字符集 — TRON 设计语言':'字体系统 — TRON 设计语言';
    const search=document.getElementById('searchInput');if(search)search.placeholder='搜索';
  }
  document.documentElement.lang=language;
  window.currentSiteLanguage=language;
  window.setSiteLanguage=next=>{localStorage.setItem('tron-design-language',next);location.reload()};
  const topButton=document.querySelector('.lang');if(topButton){topButton.setAttribute('aria-label',language==='zh-CN'?'切换至英文':'Switch to Chinese');topButton.addEventListener('click',()=>window.setSiteLanguage(language==='zh-CN'?'en':'zh-CN'))}
  document.querySelectorAll('.footer-language button').forEach(button=>{const active=button.dataset.language===language;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));button.addEventListener('click',()=>window.setSiteLanguage(button.dataset.language))});
})();
