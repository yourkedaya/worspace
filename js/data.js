// 平台导航数据
const PLATFORMS = [
  {
    "name": "任务代办问卷",
    "desc": "日常代办",
    "cat": "office",
    "color": "#54569c",
    "letter": "代办",
    "url": "https://acn4cnro08sq.feishu.cn/share/base/form/shrcnkVBC1YYOOhhZExlg3glVec"
  },
  {
    "name": "代办查询入口",
    "desc": "代办查询",
    "cat": "office",
    "color": "#28c342",
    "letter": "查询",
    "url": "https://acn4cnro08sq.feishu.cn/share/base/query/shrcnbbo0CRY0j252vyx1PIul8f"
  },
  {
    "name": "钉钉",
    "desc": "企业沟通工具",
    "cat": "office",
    "color": "#1989fa",
    "letter": "D",
    "url": "https://dingtalk.com"
  },
  {
    "name": "知乎",
    "desc": "问答社区",
    "cat": "edu",
    "color": "#0084ff",
    "letter": "知",
    "url": "https://zhihu.com"
  },
  {
    "name": "Bilibili",
    "desc": "学习视频平台",
    "cat": "edu",
    "color": "#fb7299",
    "letter": "B",
    "url": "https://bilibili.com"
  },
  {
    "name": "腾讯文档",
    "desc": "在线协作文档",
    "cat": "office",
    "color": "#1e88e5",
    "letter": "T",
    "url": "https://docs.qq.com"
  }
];

// 模板数据
const TEMPLATES = {
  "recommend": [
    {
      "title": "2026报白名单",
      "type": "xlsx",
      "size": "1",
      "rating": 5,
      "gradient": "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%)",
      "cover": "2026商务汇报",
      "url": "https://workdrive.zohopublic.com.cn/external/f9ce3ee64012f44e068a84c59a9201729e35b94e75fc17368364b560702f450a/download"
    }
  ],
  "ppt": [
    {
      "title": "教学课件模板",
      "type": "ppt",
      "size": "2.2k",
      "rating": 4.8,
      "gradient": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "cover": "教学\n课件",
      "url": ""
    }
  ],
  "word": [],
  "excel": [],
  "resume": [],
  "ops": [],
  "design": []
};

// 工具数据
const TOOLS = [
  {
    "name": "表格匹配器",
    "desc": "VLOOKUP 一键完成，自动数据清洗",
    "icon": "table",
    "color": "linear-gradient(135deg, #667eea, #764ba2)",
    "featured": true,
    "action": "openMatcher"
  }
];

// 工具图标 SVG
const TOOL_ICONS = {
  "table": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"/><line x1=\"9\" y1=\"21\" x2=\"9\" y2=\"9\"/></svg>",
  "pdf": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/></svg>",
  "image": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>",
  "ocr": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"8\" y1=\"13\" x2=\"16\" y2=\"13\"/><line x1=\"8\" y1=\"17\" x2=\"16\" y2=\"17\"/></svg>",
  "convert": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polyline points=\"16 3 21 3 21 8\"/><line x1=\"4\" y1=\"20\" x2=\"21\" y2=\"3\"/><polyline points=\"21 16 21 21 16 21\"/><line x1=\"15\" y1=\"15\" x2=\"21\" y2=\"21\"/><line x1=\"4\" y1=\"4\" x2=\"9\" y2=\"9\"/></svg>",
  "mind": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"3\"/><circle cx=\"5\" cy=\"5\" r=\"2\"/><circle cx=\"19\" cy=\"5\" r=\"2\"/><circle cx=\"5\" cy=\"19\" r=\"2\"/><circle cx=\"19\" cy=\"19\" r=\"2\"/><line x1=\"12\" y1=\"12\" x2=\"5\" y2=\"5\"/><line x1=\"12\" y1=\"12\" x2=\"19\" y2=\"5\"/><line x1=\"12\" y1=\"12\" x2=\"5\" y2=\"19\"/><line x1=\"12\" y1=\"12\" x2=\"19\" y2=\"19\"/></svg>",
  "qr": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"3\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\"/><line x1=\"14\" y1=\"14\" x2=\"14\" y2=\"17\"/><line x1=\"17\" y1=\"14\" x2=\"20\" y2=\"14\"/><line x1=\"14\" y1=\"20\" x2=\"17\" y2=\"20\"/><line x1=\"20\" y1=\"17\" x2=\"20\" y2=\"20\"/></svg>",
  "write": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 19l7-7 3 3-7 7-3-3z\"/><path d=\"M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z\"/><path d=\"M2 2l7.586 7.586\"/><circle cx=\"11\" cy=\"11\" r=\"2\"/></svg>",
  "translate": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M5 8h6m-3-3v3m-3 6h12M9 14l3 7 3-7M4 21h16\"/></svg>",
  "url": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>",
  "ip": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"2\" y1=\"12\" x2=\"22\" y2=\"12\"/><path d=\"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"/></svg>",
  "screenshot": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 7V5a2 2 0 0 1 2-2h2M21 7V5a2 2 0 0 0-2-2h-2M3 17v2a2 2 0 0 0 2 2h2M21 17v2a2 2 0 0 1-2 2h-2\"/><rect x=\"7\" y=\"7\" width=\"10\" height=\"10\" rx=\"1\"/></svg>",
  "json": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M8 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1\"/></svg>",
  "base64": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 7h16M4 12h16M4 17h10\"/></svg>",
  "time": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>",
  "color": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"13.5\" cy=\"6.5\" r=\"1.5\"/><circle cx=\"17.5\" cy=\"10.5\" r=\"1.5\"/><circle cx=\"8.5\" cy=\"7.5\" r=\"1.5\"/><circle cx=\"6.5\" cy=\"12.5\" r=\"1.5\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z\"/></svg>",
  "md": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><path d=\"M9 18V9l3 3 3-3v9\"/></svg>",
  "more": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"5\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"19\" cy=\"12\" r=\"1\"/></svg>"
};
