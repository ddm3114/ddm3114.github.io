# qianhong 的博客

基于 Hexo + Fluid 的个人博客，电影感视觉风格（全屏视频背景 + 透明侧边栏）。

## 快速开始

```bash
npm install          # 安装依赖
npx hexo server      # 本地预览 http://localhost:4000
```

## 日常维护

### 写博客

```bash
npx hexo new "文章标题"
```

然后编辑 `source/_posts/blog/文章标题.md`，写完后：

```bash
git add . && git commit -m "post: 文章标题" && git push
```

### 写论文笔记

```bash
npx hexo new paper "论文名称"
```

会自动生成带 `categories: [论文笔记]` 的模板（基本信息、方法、实验、思考）。把生成的文件移到 `source/_posts/papers/` 文件夹。

论文笔记只出现在 `/papers/` 页面，不会出现在博客首页。

如果论文笔记需要图片，在 `source/_posts/papers/` 下创建同名文件夹放图片，markdown 中直接用 `![](图片名.png)` 引用。

### 写日记

编辑 `source/diary/index.md`，在顶部添加新日期：

```markdown
## 2026.07.05

今天的内容...

---

## 2026.07.04

昨天的内容...
```

### 修改个人介绍（me 页面）

编辑 `source/about/index.md`。

### 修改首页段子/slogan

编辑 `source/_data/quotes.yml`，一行一条：

```yaml
- 写代码如写诗，bug 是押错的韵。
- 你的新段子写在这里。
```

### 更换背景视频

替换 `source/video/hero.mp4`。备选视频在 `source/video/candidates/` 文件夹。

视频要求：横屏、循环友好、画面不要太亮（文字是白色的）。

## 项目结构

```
source/
├── _data/quotes.yml              ← 首页 & papers 页随机段子
├── _posts/
│   ├── blog/                     ← 博客文章
│   │   └── hello-world.md
│   └── papers/                   ← 论文笔记
│       ├── Attention-Is-All-You-Need-论文笔记.md
│       └── Attention-Is-All-You-Need-论文笔记/
│           └── transformer-arch.png
├── diary/index.md                ← 日记（单页 markdown）
├── about/index.md                ← 个人介绍
├── css/minimal.css               ← 全部自定义样式
├── js/cinema.js                  ← 路由检测 + 导航高亮 + 段子注入
├── _includes/cinema-shell.ejs    ← 侧边栏 + 视频背景模板
└── video/
    ├── hero.mp4                  ← 当前背景视频
    └── candidates/               ← 备选视频

scripts/
├── cinema-inject.js              ← 注入 cinema-shell.ejs 到 Fluid
├── papers-generator.js           ← 生成 /papers/ 列表页
└── exclude-papers.js             ← 从博客首页排除论文笔记

scaffolds/
├── post.md                       ← 博客文章模板
└── paper.md                      ← 论文笔记模板
```

## 导航栏

四个栏目，在 `_config.fluid.yml` 的 `navbar.menu` 配置：

| 栏目 | 路径 | 说明 |
|---|---|---|
| me | `/about/` | 个人介绍页 |
| blog | `/` | 博客文章列表 |
| papers | `/papers/` | 论文笔记列表 |
| diary | `/diary/` | 日记本 |

## 部署

推送到 `main` 分支后 GitHub Actions 自动部署到 GitHub Pages。

```bash
git push origin main
# 等 1-2 分钟自动部署完成
```

## 样式修改

所有自定义样式在 `source/css/minimal.css` 一个文件里，顶部有目录注释：

1. Tokens (CSS 变量) — 颜色、字体
2. 背景视频 + 遮罩
3. 侧边栏导航
4. 博客卡片列表
5. 日记页样式
6. 论文页样式
7. 文章正文排版
8. 代码块
9. 移动端适配

## 许可

博客内容采用 CC BY-NC-SA 4.0 协议。
