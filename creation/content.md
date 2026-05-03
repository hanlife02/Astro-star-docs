---
order: 10
---

# 内容集合

Astro-star 使用 Astro Content Collections 管理内容。三类集合分别是 `blog`、`note` 和 `project`。

## 目录位置

```text
src/content/
├── blog/
├── note/
└── project/
```

`blog` 用于博客文章，`note` 用于笔记内容，`project` 用于项目展示。

## 博客和笔记

`blog` 和 `note` 推荐 frontmatter：

```md
---
routeSlug: 'deploy-astro-star'
title: 'Astro-star 部署记录'
description: '记录一次从构建到服务器上线的流程。'
createdAt: '2026-05-03'
updatedAt: '2026-05-03 20:30'
type: 'Building'
archiveSlug: 'building'
---
```

`routeSlug` 会进入文章 URL，`title` 和 `description` 会用于列表、SEO 和搜索索引。

## 项目内容

`project` 需要额外提供 `projectUrl` 和 `avatar`，用于项目卡片展示。项目正文适合写背景、技术栈、链接和维护状态。
