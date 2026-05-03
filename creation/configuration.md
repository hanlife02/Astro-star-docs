---
order: 20
---

# 配置入口

Astro-star 的业务配置集中在 `src/config/`。替换个人站点时，优先改配置和内容，不要把个人文案硬写进组件。

## 核心配置

| 文件                   | 用途                                     |
| ---------------------- | ---------------------------------------- |
| `src/config/site.ts`   | 个人信息、站点信息、导航、备案、监控链接 |
| `src/config/about.ts`  | 关于页介绍、社交入口、工具列表和时间线   |
| `src/config/links.ts`  | 友链页、申请规则、友链和失联链接         |
| `src/config/search.ts` | Algolia 前端搜索配置                     |
| `astro.config.mjs`     | Astro SSR、Node adapter、环境变量 schema |

## 站点 URL

最关键的是 `site.site.url`。它会影响 canonical URL、RSS、Sitemap 和 Algolia 索引中的文章地址，部署前需要改成最终域名。

## 导航配置

导航建议保留核心入口：

```ts
nav: [
  { name: 'Blog', href: '/blog/' },
  { name: 'Note', href: '/note/' },
  { name: 'Project', href: '/project/' },
  { name: 'Links', href: '/links/' }
]
```

路径建议保留末尾 `/`，避免和部署环境的 URL 规范冲突。
