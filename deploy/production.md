---
order: 30
---

# 生产部署

Astro-star 当前是 SSR 项目，不是纯静态站。生产构建使用 `@astrojs/node` 的 `standalone` 模式，构建产物由 Node.js 进程运行，再通过 Nginx 或 Caddy 反向代理到公网域名。

## 部署模型

```text
用户浏览器
    |
HTTPS
    |
Nginx / Caddy
    |
http://127.0.0.1:4321
    |
PM2 管理的 Node 进程
    |
server/entry.mjs
```

## GitHub Actions

GitHub Actions 是推荐路径。仓库内置的部署流程会安装依赖、执行构建、同步 Algolia 索引、用 rsync 发布产物，并在服务器上重启 PM2。

必填 GitHub Secrets：

| Secret            | 说明                 |
| ----------------- | -------------------- |
| `SSH_HOST`        | 服务器公网 IP 或域名 |
| `SSH_PRIVATE_KEY` | 部署用 SSH 私钥      |

常用可选 Secrets：

| Secret                     | 默认值         | 说明                             |
| -------------------------- | -------------- | -------------------------------- |
| `SSH_USER`                 | `ubuntu`       | SSH 用户                         |
| `SSH_PORT`                 | `22`           | SSH 端口                         |
| `DEPLOY_PATH`              | `~/Astro-star` | 部署目录                         |
| `PM2_APP_NAME`             | `Astro-star`   | PM2 应用名称                     |
| `APP_PORT`                 | `4321`         | Node 服务端口                    |
| `PUBLIC_WALINE_SERVER_URL` | 空             | 写入服务器 `.env` 的 Waline 地址 |

## 手动启动

服务器上可以用 PM2 启动构建产物：

```bash
PM2_APP_NAME=Astro-star PORT=4321 pm2 start ecosystem.config.cjs
pm2 save
```
