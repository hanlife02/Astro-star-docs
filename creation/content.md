---
order: 10
---

# Creating Content

## Directory Structure

```text
src/content/
├── blog/
├── note/
└── project/
```

`blog` is for blog posts, `note` is for notes, and `project` is for projects.

## Categories

Create a new directory under `blog/` or `note/`. The directory name becomes the category `routeSlug`. Using Chinese characters is not recommended.

The `type` field can use Chinese as the category name. Within the same directory, the `type` value must remain consistent; otherwise, one of the values will be randomly selected as the category name.

If articles are placed directly under `blog/` or `note/`, they will be classified as `uncategorized`.

## Articles

Files in `md` or `mdx` format are supported.

Recommended frontmatter for `blog` and `note`:

```md
---
routeSlug: 'deploy-astro-star'
title: 'Astro-star Deployment Log'
description: 'A record of the process from build to server launch.'
createdAt: '2026-05-03 20:30'
updatedAt: '2026-05-03 20:30'
type: 'Building'
---
```

| Variables   | Description                                                                     |
| ----------- | ------------------------------------------------------------------------------- |
| routeSlug   | Defines the end of the article URL                                              |
| title       | Article title                                                                   |
| description | Article description                                                             |
| createdAt   | Creation date. Auto-generated from git if absent; generally not needed          |
| updatedAt   | Update date. Same as `createdAt`; generally not needed                          |
| type        | Article category (`project` does not currently support `type`-based categories) |
