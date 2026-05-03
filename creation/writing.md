---
order: 30
---

# 写作格式

正文默认支持 Markdown 和 MDX。多数内容用 Markdown 即可，复杂交互或自定义展示再使用 MDX。

## Markdown

Markdown 适合常规文章和笔记：

- 标题、段落、列表和表格。
- 代码块和行内代码。
- 图片和链接。
- 数学公式。

代码块应标注语言：

````md
```bash
pnpm build
```
````

## MDX

MDX 适合在正文中使用组件。它可以让文章混合 Markdown 内容和可复用 UI，但也会提高维护成本，普通文章不需要优先使用。

## GitHub 仓库卡片

文章正文中的单独 GitHub 仓库链接会转换成仓库卡片，并在浏览器端补全描述、Star 数和头像。

```md
[Astro-star](https://github.com/hanlife02/Astro-star)
```

## 评论和访问量

文章页会在运行时接入 Waline 评论、访问量和评论数。只要配置了 `WALINE_SERVER_URL`，对应区域就会显示。
