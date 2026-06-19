const contentMap = {
  site: "https://siteweb-hth.com.cn",
  sections: [
    {
      id: "sports",
      title: "体育赛事",
      keywords: ["华体会", "足球", "篮球", "网球", "比分"],
      pages: [
        { path: "/sports/football", label: "足球", tags: ["英超", "欧冠"] },
        { path: "/sports/basketball", label: "篮球", tags: ["NBA", "CBA"] },
        { path: "/sports/tennis", label: "网球", tags: ["大满贯", "ATP"] }
      ]
    },
    {
      id: "live",
      title: "直播",
      keywords: ["华体会", "直播", "高清", "实时"],
      pages: [
        { path: "/live/featured", label: "精选直播", tags: ["热门", "推荐"] },
        { path: "/live/schedule", label: "直播日程", tags: ["赛程", "时间表"] }
      ]
    },
    {
      id: "esports",
      title: "电竞赛事",
      keywords: ["华体会", "电竞", "英雄联盟", "DOTA2", "CSGO"],
      pages: [
        { path: "/esports/lol", label: "英雄联盟", tags: ["LPL", "世界赛"] },
        { path: "/esports/dota2", label: "DOTA2", tags: ["TI", "Major"] },
        { path: "/esports/csgo", label: "CSGO", tags: ["Major", "ESL"] }
      ]
    }
  ],
  globalKeywords: ["华体会", "体育", "电竞", "娱乐", "竞猜"]
};

function searchContent(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results = [];

  contentMap.sections.forEach(section => {
    const matchSection =
      section.title.toLowerCase().includes(q) ||
      section.keywords.some(k => k.toLowerCase().includes(q));

    if (matchSection) {
      results.push({
        type: "section",
        id: section.id,
        title: section.title,
        url: `${contentMap.site}${section.id}`
      });
    }

    section.pages.forEach(page => {
      const matchPage =
        page.label.toLowerCase().includes(q) ||
        page.tags.some(t => t.toLowerCase().includes(q));

      if (matchPage) {
        results.push({
          type: "page",
          section: section.id,
          label: page.label,
          path: page.path,
          url: `${contentMap.site}${page.path}`,
          tags: page.tags
        });
      }
    });
  });

  // Also search in global keywords
  const globalMatch = contentMap.globalKeywords.some(k =>
    k.toLowerCase().includes(q)
  );
  if (globalMatch && !results.some(r => r.type === "section" && r.id === "global")) {
    results.unshift({
      type: "global",
      description: `匹配站点全局关键词：${contentMap.globalKeywords.join(", ")}`,
      url: contentMap.site
    });
  }

  return results;
}

function listSections() {
  return contentMap.sections.map(s => ({
    id: s.id,
    title: s.title,
    pageCount: s.pages.length,
    url: `${contentMap.site}${s.id}`
  }));
}

function getTagsBySection(sectionId) {
  const section = contentMap.sections.find(s => s.id === sectionId);
  if (!section) return [];

  const tagSet = new Set();
  section.pages.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet);
}

// Example usage:
// console.log(searchContent("华体会"));
// console.log(listSections());
// console.log(getTagsBySection("sports"));