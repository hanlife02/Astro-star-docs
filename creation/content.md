---
order: 10
---

# 创作内容

## 目录位置

```text
src/content/
├── blog/
├── note/
└── project/
```

`blog` 用于博文，`note` 用于手记，`project` 用于项目。

## 分类

在 blog/ 或 note/ 下新建目录，目录名即为分类的`routeslug`，不建议使用中文。

后续`type`可以使用中文作为分类名，同一目录下`type`值一定要保持一致，不然会随机选取其中的一个`type`值作为分类名。

如果直接将文章置于 blog/ 或 note/ 下，则是`uncategorized`类

## 文章

支持`md`或`mdx`格式的文件

`blog` 和 `note` 推荐 frontmatter：

```md
---
routeSlug: 'deploy-astro-star'
title: 'Astro-star 部署记录'
description: '记录一次从构建到服务器上线的流程。'
createdAt: '2026-05-03 20:30'
updatedAt: '2026-05-03 20:30'
type: 'Building'
---
```

| Variables                  | 说明                             |
| -------------------------- | -------------------------------- |
| routeSlug                  | 命名文章 URL 的末尾              |
| title                      | 文章标题                         |
| description                | 文章描述                         |
| createdAt                  | 创建日期，不存在时会根据 git 自动生成，一般不需要设置|
| updatedAt                  | 更新日期，同理 createdAt ,一般不需要设置|
| type                       | 文章分类 (project 暂时不支持 type 分类)|