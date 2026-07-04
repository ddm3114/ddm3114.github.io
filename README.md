# qianhong 的博客

我的个人博客，记录日常随笔与思考。

## 技术栈

- **Hexo 7** — 静态站点生成器
- **Fluid** — Hexo 主题（Material Design 风格）
- **GitHub Pages** — 托管
- **GitHub Actions** — 自动部署

## 本地开发

```bash
# 安装依赖
npm install

# 本地预览（http://localhost:4000）
npm run server

# 新建文章
npx hexo new "文章标题"

# 生成静态文件
npm run build

# 部署（推到 GitHub 后自动 Actions 部署）
```

## 目录结构

```
.
├── _config.yml           # Hexo 主配置
├── _config.fluid.yml     # Fluid 主题配置（修改这个，不要动 themes/fluid/）
├── source/
│   ├── _posts/           # 博客文章（Markdown）
│   ├── about/            # 关于页
│   ├── links/            # 友链页
│   ├── tags/             # 标签页
│   └── categories/       # 分类页
├── themes/               # 主题（通过 npm 安装，不在 git 跟踪）
└── .github/workflows/    # GitHub Actions 配置
```

## 部署到 GitHub Pages 步骤

1. 在 GitHub 创建仓库 `qianhong.github.io`（Public）
2. 本地初始化并推送：
   ```bash
   cd ~/blog
   git init
   git checkout -b main
   git add .
   git commit -m "chore: initial blog setup"
   git remote add origin git@github.com:qianhong/qianhong.github.io.git
   git push -u origin main
   ```
3. 仓库 **Settings → Pages → Source** 选 **GitHub Actions**
4. 仓库 **Settings → Actions → General → Workflow permissions** 选 **Read and write permissions**
5. 推送触发后等 1–2 分钟部署完成

## 写作流程

```bash
npx hexo new "新文章标题"
# 编辑 source/_posts/<file>.md
npm run server   # 本地预览
git add . && git commit -m "post: 新文章标题" && git push
# 等 Actions 自动部署
```

## 许可

博客内容采用 CC BY-NC-SA 4.0 协议。