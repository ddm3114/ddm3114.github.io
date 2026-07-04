'use strict';

// Exclude "论文笔记" posts from the blog homepage index.
// They only appear on /papers/ (via papers-generator.js).

hexo.extend.filter.register('template_locals', function (locals) {
  if (locals.page && locals.page.__index && !locals.page.category) {
    // This is the blog homepage (not the papers page which has page.category set)
    var filtered = locals.page.posts.filter(function (post) {
      var cats = post.categories.map(function (cat) { return cat.name; });
      return cats.indexOf('论文笔记') === -1;
    });
    locals.page.posts = filtered;
  }
  return locals;
});
