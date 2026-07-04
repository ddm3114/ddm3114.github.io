# CLAUDE.md — 博客维护指南

这是一个基于 Hexo + Fluid 主题的个人博客，使用了自定义的"电影感"视觉层（全屏视频背景 + 透明侧边栏）。所有自定义代码覆盖在 Fluid 主题之上，不修改 Fluid 源码。

## 架构概览

```
博客主需要编辑的文件：
  source/_data/quotes.yml           ← 首页/论文页顶部随机段子
  source/_posts/blog/*.md           ← 博客文章
  source/_posts/papers/*.md         ← 论文笔记
  source/diary/index.md             ← 日记（单页 markdown）
  source/about/index.md             ← 个人介绍 (me)
  source/video/hero.mp4             ← 背景视频
  source/video/candidates/          ← 备选视频

框架/样式文件（一般不需要动）：
  _config.yml                       ← Hexo 主配置
  _config.fluid.yml                 ← Fluid 主题配置（导航栏在这里）
  source/css/minimal.css            ← 全部自定义样式（覆盖 Fluid）
  source/js/cinema.js               ← 路由检测 + 导航高亮 + 段子注入
  source/_includes/cinema-shell.ejs ← 侧边栏 + 视频背景 HTML 模板
  scripts/cinema-inject.js          ← 把 cinema-shell.ejs 注入 Fluid
  scripts/papers-generator.js       ← 生成 /papers/ 列表页
  scripts/exclude-papers.js         ← 从博客首页过滤掉论文笔记
  scaffolds/paper.md                ← hexo new paper 的模板
```

## 内容操作

### 1. 新建博客文章

```bash
npx hexo new "文章标题"
```

生成的文件在 `source/_posts/文章标题.md`，把它移到 `source/_posts/blog/` 文件夹：

```bash
mv source/_posts/文章标题.md source/_posts/blog/
```

编辑 front-matter 和正文：

```markdown
---
title: 文章标题
date: 2026-07-04 12:00:00
description: 一句话摘要，显示在卡片列表上
---

正文内容...
```

如果文章需要图片：在 `source/_posts/blog/` 下创建同名文件夹放图片，markdown 中用 `![](图片名.png)` 引用。Hexo 的 `postAsset: true` 配置会自动处理路径。

### 2. 新建论文笔记

```bash
npx hexo new paper "论文名称"
```

自动生成带模板的文件（基本信息、方法、实验、思考），移到 papers 文件夹：

```bash
mv source/_posts/论文名称.md source/_posts/papers/
```

论文笔记的 front-matter 已自动包含 `categories: [论文笔记]`。这使得：
- 论文笔记出现在 `/papers/` 页面
- 论文笔记**不会**出现在博客首页（`scripts/exclude-papers.js` 负责过滤）

图片处理同博客文章：在 `source/_posts/papers/` 下建同名文件夹。

### 3. 写日记

编辑 `source/diary/index.md`。新日期写在文件靠上方（最新的在最前面）：

```markdown
---
title: diary
layout: page
---

## 2026.07.05

今天的内容...

---

## 2026.07.04

昨天的内容...
```

格式规则：
- 日期用 `## YYYY.MM.DD` 作为二级标题（会被 CSS 渲染为小号无衬线日期标签）
- 不同日期之间用 `---` 分隔（会渲染为 `· · ·` 三点分隔符）
- front-matter 中的 `layout: page` 不要改

### 4. 修改个人介绍

编辑 `source/about/index.md`。这是 `/about/` 页面（侧边栏的 "me"）。

front-matter 中的 `layout: about` 不要改。

### 页面顶部标题/副标题

about 和 diary 页面顶部各有一行标题和副标题，修改方式不同：

**about 页面**（"qianhong" + "记录、随笔与思考。"）：
在 `_config.fluid.yml` 约第 1004-1005 行，修改 Fluid 的 about 配置：

```yaml
name: "qianhong"
intro: "记录、随笔与思考。"
```

**diary 页面**（"diary" + "随手写，不讲究。"）：
在 `source/js/cinema.js` 中搜索 `page-hero`，找到这一行：

```javascript
header.innerHTML = '<h1 class="page-hero-title">diary</h1><p class="page-hero-subtitle">随手写，不讲究。</p>';
```

直接改引号里的文字即可。样式在 `source/css/minimal.css` 的 `.page-hero` 相关规则中。

### 5. 修改首页段子/slogan

编辑 `source/_data/quotes.yml`，一行一条，YAML 列表格式：

```yaml
- 你的第一条段子。
- 你的第二条段子。
- 新加的段子写在这里。
```

段子会在博客首页和论文页顶部随机显示一条，刷新页面会换。

### 6. 更换背景视频

把新视频文件命名为 `hero.mp4`，替换 `source/video/hero.mp4`。

视频要求：
- 横屏（宽 > 高）
- 画面整体偏暗（文字是白色/米白色，太亮的视频会看不清）
- 适合循环播放（无明显开头结尾）
- 格式 mp4，大小不限

备选视频在 `source/video/candidates/`：
- `02-city-night-aerial.mp4` — 城市夜景航拍 (104M)
- `14-rain-windshield-night-1080p.mp4` — 雨滴挡风玻璃夜晚 (18M) ← 当前使用
- `22-cars-road-timelapse.mp4` — 马路车流延时 (21M)
- `23-empty-road-night-traffic.mp4` — 深夜马路车流 (80M)

切换方法：

```bash
cp source/video/candidates/22-cars-road-timelapse.mp4 source/video/hero.mp4
```

换视频后需要额外做两件事：

1. **更新封面图**（否则页面打开的第一帧会闪旧视频画面）：
   ```bash
   ffmpeg -i source/video/hero.mp4 -ss 2 -frames:v 1 -q:v 2 source/img/hero-poster.jpg -y
   ```
   这会截取视频第 2 秒的画面作为封面。

2. **更新缓存版本号**（否则浏览器/CDN 缓存会继续播放旧视频）：
   编辑 `source/_includes/cinema-shell.ejs`，把 `?v=3` 的数字加一：
   ```javascript
   var video = '/video/hero.mp4?v=4'   // 每次换视频加 1
   ```

## 导航栏配置

在 `_config.fluid.yml` 第 385-389 行，当前四个栏目：

```yaml
menu:
  - { key: "about",    link: "/about/",   name: "me",     icon: "iconfont icon-user-fill" }
  - { key: "home",     link: "/",         name: "blog",   icon: "iconfont icon-home-fill" }
  - { key: "papers",   link: "/papers/",  name: "papers", icon: "iconfont icon-books" }
  - { key: "diary",    link: "/diary/",   name: "diary",  icon: "iconfont icon-pen" }
```

修改方法：
- 改显示名称：改 `name` 字段
- 改顺序：调整行的顺序
- 新增栏目：加一行，创建对应的 `source/xxx/index.md`
- 删除栏目：删掉对应行

新增栏目后，如果需要页面特定样式，在 `cinema.js` 中添加路由检测，在 `minimal.css` 中添加 `body.route-xxx` 样式。

## 样式修改

所有样式在 `source/css/minimal.css` 一个文件里，顶部有目录：

| 章节 | 内容 | 改什么时候找这里 |
|---|---|---|
| 1. Tokens | CSS 变量：颜色、字体 | 改全局配色、字体 |
| 2-3. Reset / Kill Fluid | 重置和隐藏 Fluid 原生 UI | 一般不动 |
| 4. Background video | 视频、遮罩、letterbox | 改视频动画、暗角效果 |
| 5. Sidebar nav | 侧边栏导航 | 改导航样式、间距 |
| 6. Main content | 内容区域布局 | 改内容区宽度、边距 |
| 7. Blog slogan | 段子/引言样式 | 改段子字体、分隔线 |
| 8. Blog post list | 首页卡片列表 | 改卡片间距、hover 效果 |
| 9. Page hero | 页面顶部标题（diary） | 改 diary 标题/副标题样式 |
| 10. Page: diary | 日记页 | 改日期标签、日记排版 |
| 11. Page: papers | 论文列表页 | 改论文卡片样式 |
| 12. Page: about/me | 个人介绍页 | 改介绍页排版 |
| 13. Hide Fluid TOC | 隐藏侧边目录 | 一般不动 |
| 14. Post typography | 文章正文排版 | 改标题、段落、引用、列表样式 |
| 15. Code blocks | 代码块（终端风格） | 改代码块配色、语法高亮 |
| 16. Tables | 表格 | 改表格样式 |
| 17. Footer | 页脚 | 改页脚样式 |
| 18. Mobile responsive | 移动端适配 | 改手机端布局 |

### 常见样式修改

**改全局配色**：修改 `:root` 中的 CSS 变量：
- `--ink`: 主文字色（当前 `#f5f3ec` 米白色）
- `--ink-dim`: 次要文字色
- `--accent`: 强调色（当前 `#d8c98a` 金色，用于导航高亮、段子左边线）
- `--serif` / `--sans`: 字体栈

**改卡片间距**：找 `.index-card` 和 `.index-info` 的 `margin` / `padding`

**改视频暗角**：找 `.bg-scrim` 的 `background` 渐变

## 构建与部署

```bash
npx hexo clean && npx hexo generate   # 清理并重新生成
npx hexo server                        # 本地预览 http://localhost:4000
npx hexo server -p 4001               # 指定端口
```

### 部署到线上

推到 main 分支即可，GitHub Actions 会自动构建并部署到 GitHub Pages：

```bash
git add .
git commit -m "描述改了什么"
git push origin main
```

推送后 1-2 分钟自动部署完成，访问 https://ddm3114.github.io 查看。

### 部署原理

```
git push origin main
    ↓
GitHub Actions 自动触发（.github/workflows/deploy.yml）
    ↓
在云端执行 npm ci + npx hexo generate
    ↓
生成的 public/ 通过 actions/deploy-pages 部署到 GitHub Pages
    ↓
https://ddm3114.github.io 更新
```

**关键配置**：
- `.github/workflows/deploy.yml` — CI/CD 工作流脚本，定义构建和部署步骤
- GitHub 仓库 Settings → Pages → Source 必须设为 **"GitHub Actions"**（不是 "Deploy from a branch"）

### 部署失败怎么办

1. 去 https://github.com/ddm3114/ddm3114.github.io/actions 查看日志
2. 如果是 "Deployment failed, try again later"（GitHub 瞬时错误），推一个空提交重试：
   ```bash
   git commit --allow-empty -m "chore: re-trigger deploy" && git push origin main
   ```
3. 如果是构建错误（npm/hexo 报错），看日志修代码再推

## 注意事项

- `_config.yml` 中 `post_asset_folder: true` 和 `marked.postAsset: true` 确保文章图片路径正确，不要关掉
- `scripts/exclude-papers.js` 通过检查 `page.category` 字段区分博客首页和论文页，papers-generator 设置了 `category: '论文笔记'`，如果改了分类名需要同步改这两个文件
- `source/video/candidates/` 文件夹会被 Hexo 复制到 public，如果不想部署备选视频，在 `_config.yml` 的 `exclude` 里加 `video/candidates/**`
- Fluid 的 `main.css` 经常和自定义样式冲突，自定义样式里大量使用 `!important` 是有意为之
