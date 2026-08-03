// 平台导航数据
const PLATFORMS = [
    { name: 'ChatGPT', desc: 'AI 对话助手', cat: 'ai', color: '#10a37f', letter: 'C', url: 'https://chat.openai.com' },
    { name: 'Notion', desc: '笔记与知识管理', cat: 'office', color: '#000000', letter: 'N', url: 'https://notion.so' },
    { name: 'Midjourney', desc: 'AI 绘画工具', cat: 'ai', color: '#1a1a2e', letter: 'M', url: 'https://midjourney.com' },
    { name: 'Canva', desc: '在线设计平台', cat: 'design', color: '#00c4cc', letter: 'C', url: 'https://canva.cn' },
    { name: '飞书', desc: '团队协作平台', cat: 'office', color: '#3370ff', letter: 'F', url: 'https://feishu.cn' },
    { name: '淘宝卖家中心', desc: '电商运营管理', cat: 'ecom', color: '#ff5000', letter: '淘', url: 'https://sell.taobao.com' },
    { name: 'Claude', desc: 'AI 智能助手', cat: 'ai', color: '#d97757', letter: 'C', url: 'https://claude.ai' },
    { name: 'Figma', desc: 'UI 设计协作', cat: 'design', color: '#f24e1e', letter: 'F', url: 'https://figma.com' },
    { name: 'GitHub', desc: '代码托管平台', cat: 'dev', color: '#181717', letter: 'G', url: 'https://github.com' },
    { name: '钉钉', desc: '企业沟通工具', cat: 'office', color: '#1989fa', letter: 'D', url: 'https://dingtalk.com' },
    { name: '文心一言', desc: '百度 AI 助手', cat: 'ai', color: '#2932e1', letter: '文', url: 'https://yiyan.baidu.com' },
    { name: 'WPS 365', desc: '办公套件', cat: 'office', color: '#0058d4', letter: 'W', url: 'https://365.wps.cn' },
    { name: 'Stack Overflow', desc: '开发者社区', cat: 'dev', color: '#f48024', letter: 'S', url: 'https://stackoverflow.com' },
    { name: '知乎', desc: '问答社区', cat: 'edu', color: '#0084ff', letter: '知', url: 'https://zhihu.com' },
    { name: '抖音电商', desc: '直播带货平台', cat: 'ecom', color: '#000000', letter: 'D', url: 'https://douyin.com' },
    { name: 'Bilibili', desc: '学习视频平台', cat: 'edu', color: '#fb7299', letter: 'B', url: 'https://bilibili.com' },
    { name: '腾讯文档', desc: '在线协作文档', cat: 'office', color: '#1e88e5', letter: 'T', url: 'https://docs.qq.com' },
    { name: 'Grok', desc: 'xAI 智能助手', cat: 'ai', color: '#000000', letter: 'G', url: 'https://grok.com' },
    { name: 'StackBlitz', desc: '在线代码编辑', cat: 'dev', color: '#126ee4', letter: 'S', url: 'https://stackblitz.com' },
    { name: 'Coupang', desc: '韩国电商平台', cat: 'ecom', color: '#e60012', letter: 'C', url: 'https://coupang.com' },
    { name: '慕课网', desc: '在线编程学习', cat: 'edu', color: '#5fb733', letter: '慕', url: 'https://imooc.com' },
    { name: 'Gamma', desc: 'AI PPT 生成', cat: 'ai', color: '#8b5cf6', letter: 'G', url: 'https://gamma.app' },
    { name: 'MasterGo', desc: '产品设计协作', cat: 'design', color: '#5e60ce', letter: 'M', url: 'https://mastergo.com' },
    { name: 'ProcessOn', desc: '在线思维导图', cat: 'design', color: '#0080ff', letter: 'P', url: 'https://processon.com' },
];

// 模板数据
const TEMPLATES = {
    recommend: [
        { title: '2026 商务汇报模板', type: 'ppt', size: '2.5k', rating: 4.9, gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', cover: '2026\n商务汇报' },
        { title: '财务报表分析模板', type: 'xlsx', size: '1.8k', rating: 4.8, gradient: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)', cover: '财务报表\n分析模板' },
        { title: '个人简历模板', type: 'word', size: '3.2k', rating: 4.9, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', cover: '个人简历\n模板' },
        { title: '小红书运营方案', type: 'ppt', size: '1.2k', rating: 4.7, gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', cover: '小红书\n运营方案' },
        { title: '电商数据分析模板', type: 'xlsx', size: '2.1k', rating: 4.8, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', cover: '电商数据\n分析模板' },
        { title: '项目进度管理表', type: 'xlsx', size: '1.5k', rating: 4.9, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', cover: '项目进度\n管理表' },
        { title: '合同协议模板', type: 'word', size: '2.3k', rating: 4.6, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', cover: '合同协议\n标准模板' },
        { title: '产品发布会 PPT', type: 'ppt', size: '1.9k', rating: 4.8, gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', cover: '产品发布会\n主题模板' },
    ],
    ppt: [
        { title: '极简商务汇报', type: 'ppt', size: '3.5k', rating: 4.9, gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', cover: '极简\n商务汇报' },
        { title: '年终总结模板', type: 'ppt', size: '2.8k', rating: 4.8, gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)', cover: '年终\n总结' },
        { title: '产品介绍路演', type: 'ppt', size: '1.6k', rating: 4.7, gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', cover: '产品\n路演' },
        { title: '教学课件模板', type: 'ppt', size: '2.2k', rating: 4.8, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', cover: '教学\n课件' },
    ],
    word: [
        { title: '工作周报模板', type: 'word', size: '4.5k', rating: 4.9, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', cover: '工作\n周报' },
        { title: '劳动合同范本', type: 'word', size: '2.1k', rating: 4.7, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', cover: '劳动\n合同' },
        { title: '会议纪要模板', type: 'word', size: '1.8k', rating: 4.6, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', cover: '会议\n纪要' },
    ],
    excel: [
        { title: '财务记账模板', type: 'xlsx', size: '3.2k', rating: 4.9, gradient: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)', cover: '财务\n记账' },
        { title: '销售业绩看板', type: 'xlsx', size: '1.5k', rating: 4.8, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', cover: '销售\n看板' },
        { title: '库存管理表格', type: 'xlsx', size: '2.4k', rating: 4.7, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', cover: '库存\n管理' },
    ],
    resume: [
        { title: '互联网简历模板', type: 'word', size: '5.2k', rating: 4.9, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', cover: '互联网\n简历' },
        { title: '设计岗简历模板', type: 'word', size: '2.8k', rating: 4.8, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', cover: '设计岗\n简历' },
        { title: '通用简历模板', type: 'word', size: '3.6k', rating: 4.7, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', cover: '通用\n简历' },
    ],
    ops: [
        { title: '私域运营 SOP', type: 'ppt', size: '1.2k', rating: 4.7, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', cover: '私域\n运营' },
        { title: '新媒体周计划', type: 'xlsx', size: '1.8k', rating: 4.8, gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', cover: '新媒体\n周计划' },
    ],
    design: [
        { title: '海报设计素材', type: 'png', size: '6.5k', rating: 4.9, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', cover: '海报\n设计' },
        { title: 'ICON 图标包', type: 'svg', size: '4.2k', rating: 4.8, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', cover: 'ICON\n图标' },
    ],
};

// 工具数据
const TOOLS = [
    { name: '表格匹配器', desc: 'VLOOKUP 一键完成，自动数据清洗', icon: 'table', color: 'linear-gradient(135deg, #667eea, #764ba2)', featured: true, action: 'openMatcher' },
    { name: 'PDF 转换', desc: 'PDF 转 Word/PPT/Excel', icon: 'pdf', color: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)' },
    { name: '图片压缩', desc: '压缩图片大小', icon: 'image', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
    { name: 'OCR 识别', desc: '图片文字识别', icon: 'ocr', color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
    { name: '格式转换', desc: '多种格式互转', icon: 'convert', color: 'linear-gradient(135deg, #fa709a, #fee140)' },
    { name: '思维导图', desc: '在线思维导图', icon: 'mind', color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
    { name: '二维码生成', desc: '生成个性二维码', icon: 'qr', color: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
    { name: 'AI 写作', desc: '智能写作助手', icon: 'write', color: 'linear-gradient(135deg, #89f7fe, #66a6ff)' },
    { name: 'AI 翻译', desc: '多语言翻译', icon: 'translate', color: 'linear-gradient(135deg, #fddb92, #d1fdff)' },
    { name: 'URL 解析', desc: '解析网址信息', icon: 'url', color: 'linear-gradient(135deg, #9890e3, #b1f4cf)' },
    { name: 'IP 查询', desc: '查询 IP 地址信息', icon: 'ip', color: 'linear-gradient(135deg, #ebc0fd, #d9ded8)' },
    { name: '网页截图', desc: '网页完整截图', icon: 'screenshot', color: 'linear-gradient(135deg, #fdcbf1, #e6dee9)' },
    { name: 'JSON 格式化', desc: 'JSON 美化压缩', icon: 'json', color: 'linear-gradient(135deg, #c2e9fb, #fbc2eb)' },
    { name: 'Base64 编解码', desc: '文本与编码互转', icon: 'base64', color: 'linear-gradient(135deg, #d4fc79, #96e6a1)' },
    { name: '时间戳转换', desc: 'Unix 时间戳工具', icon: 'time', color: 'linear-gradient(135deg, #84fab0, #8fd3f4)' },
    { name: '颜色取色器', desc: '图片颜色提取', icon: 'color', color: 'linear-gradient(135deg, #ff9a9e, #fecfef)' },
    { name: 'Markdown 编辑', desc: '在线 MD 编辑器', icon: 'md', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { name: '更多工具', desc: '探索更多工具', icon: 'more', color: 'linear-gradient(135deg, #86868b, #b8b8be)' },
];

// 工具图标 SVG
const TOOL_ICONS = {
    table: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
    image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    ocr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/></svg>',
    convert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
    mind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><line x1="12" y1="12" x2="5" y2="5"/><line x1="12" y1="12" x2="19" y2="5"/><line x1="12" y1="12" x2="5" y2="19"/><line x1="12" y1="12" x2="19" y2="19"/></svg>',
    qr: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="17"/><line x1="17" y1="14" x2="20" y2="14"/><line x1="14" y1="20" x2="17" y2="20"/><line x1="20" y1="17" x2="20" y2="20"/></svg>',
    write: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    translate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8h6m-3-3v3m-3 6h12M9 14l3 7 3-7M4 21h16"/></svg>',
    url: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    ip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    screenshot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7V5a2 2 0 0 1 2-2h2M21 7V5a2 2 0 0 0-2-2h-2M3 17v2a2 2 0 0 0 2 2h2M21 17v2a2 2 0 0 1-2 2h-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>',
    json: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1"/></svg>',
    base64: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    time: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    color: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
    md: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 18V9l3 3 3-3v9"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></svg>',
};
