'use strict';

hexo.extend.generator.register('papers', function (locals) {
  var category = locals.categories.findOne({ name: '论文笔记' });
  // Use the category's posts Query if it exists, otherwise use an empty filter
  var posts = category
    ? category.posts.sort('-date')
    : locals.posts.filter(function () { return false; });

  return {
    path: 'papers/index.html',
    layout: ['index'],
    data: {
      __index: true,
      posts: posts,
      category: '论文笔记',
      title: 'papers'
    }
  };
});
