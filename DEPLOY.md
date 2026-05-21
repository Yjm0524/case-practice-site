# 永久在线说明

现在的 `loca.lt` 链接是临时隧道：它依赖这台电脑上的本地服务。电脑关机、断网或隧道进程停止后，链接就会失效。

要让所有人一直能打开，需要把本文件夹作为静态网站部署到云端。推荐用 GitHub Pages，部署后链接通常是：

```text
https://你的GitHub用户名.github.io/case-practice-site/
```

## 最短流程

1. 安装并登录 GitHub CLI：`gh auth login`
2. 在本文件夹运行：`.\deploy-github-pages.ps1`
3. 等 GitHub Actions 跑完，打开脚本输出的 Pages 链接。

如果命令行不能连上 GitHub 的登录或 git 端口，但 `api.github.com` 可访问，可以改用 REST 发布：

1. 打开 https://github.com/settings/tokens/new?description=case-practice-site-deploy&scopes=repo,workflow
2. 生成 token 后，在本文件夹运行：`.\deploy-github-rest.ps1`
3. 按提示粘贴 token，脚本会创建公开仓库、上传文件并输出 Pages 链接。

如果已经有 GitHub 仓库，也可以直接把本文件夹上传到仓库，并在仓库设置中把 Pages 的 Source 选为 `GitHub Actions`。

## 为什么不能保留原来的 loca.lt 链接

`https://witty-ideas-post.loca.lt/index.html` 只是公网访问你本机 `127.0.0.1:8766` 的临时入口，不是云端托管。关机后没有服务器响应，所以无法从原地址继续访问。永久方案必须换成 GitHub Pages、Vercel、Netlify 或 Cloudflare Pages 这类托管地址。
