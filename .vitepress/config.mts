import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { basename, extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, withBase } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

type SectionConfig = {
  text: string
  dir: string
}

type PageMeta = {
  order: number
  text: string
  link: string
}

const docsRoot = dirname(dirname(fileURLToPath(import.meta.url)))

const sections: SectionConfig[] = [
  { text: '主题', dir: 'theme' },
  { text: '部署', dir: 'deploy' },
  { text: '创作', dir: 'creation' },
  { text: '开发', dir: 'develop' }
]

function buildSidebar(): DefaultTheme.Sidebar {
  return {
    '/': sections.map((section) => ({
      text: section.text,
      items: getSectionItems(section.dir)
    }))
  }
}

function getSectionItems(sectionDir: string): DefaultTheme.SidebarItem[] {
  const absoluteDir = join(docsRoot, sectionDir)

  if (!existsSync(absoluteDir)) {
    return []
  }

  return readdirSync(absoluteDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md')
    .map((entry) => getPageMeta(sectionDir, entry.name))
    .sort((a, b) => a.order - b.order || a.text.localeCompare(b.text, 'zh-CN'))
    .map(({ text, link }) => ({ text, link }))
}

function getPageMeta(sectionDir: string, fileName: string): PageMeta {
  const absolutePath = join(docsRoot, sectionDir, fileName)
  const source = readFileSync(absolutePath, 'utf8')
  const frontmatter = parseFrontmatter(source)
  const h1 = source.match(/^#\s+(.+)$/m)?.[1]?.trim()
  const fallbackTitle = basename(fileName, extname(fileName))
  const order = Number(frontmatter.order)

  return {
    order: Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER,
    text: frontmatter.title ?? h1 ?? fallbackTitle,
    link: `/${sectionDir}/${basename(fileName, extname(fileName))}`
  }
}

function parseFrontmatter(source: string): Record<string, string> {
  const match = source.match(/^---\n([\s\S]*?)\n---/)

  if (!match) {
    return {}
  }

  return Object.fromEntries(
    match[1]
      .split('\n')
      .map((line) => line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/))
      .filter((match): match is RegExpMatchArray => Boolean(match))
      .map((match) => [match[1], match[2].trim().replace(/^['"]|['"]$/g, '')])
  )
}

export default defineConfig({
  base: '/Astro-star-docs/',
  lang: 'zh-CN',
  title: 'Astro-star 文档',
  description: 'Astro-star 开源 Astro 个人站点主题文档',
  lastUpdated: true,
  cleanUrls: true,
  srcExclude: ['README.md', 'CONTRIBUTING.md'],
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },
    math: true
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ff5d01' }],
    ['link', { rel: 'icon', type: 'image/png', href: withBase('/astro-star.png') }],
    ['link', { rel: 'apple-touch-icon', href: withBase('/astro-star.png') }]
  ],
  themeConfig: {
    i18nRouting: false,
    logo: withBase('/astro-star.png'),
    nav: [
      { text: 'Astro-star', link: 'https://github.com/hanlife02/Astro-star' },
      { text: '文档', link: '/theme/overview' }
    ],
    sidebar: buildSidebar(),
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/hanlife02/Astro-star' }],
    footer: {
      message: 'Astro-star documentation site.',
      copyright: 'Astro-star source code uses Apache-2.0.'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium',
        forceLocale: true
      }
    },
    editLink: {
      pattern: 'https://github.com/hanlife02/Astro-star-docs/edit/main/:path',
      text: '在 GitHub 上编辑本页'
    },
    darkModeSwitchLabel: '颜色选择',
    lightModeSwitchTitle: '切换至亮色模式',
    darkModeSwitchTitle: '切换至暗色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    externalLinkIcon: true,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    }
  }
})
