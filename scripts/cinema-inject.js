'use strict';

// Register our partial into the Fluid `theme_inject` filter.
// Must run AFTER the default-injects.js (priority -99) so we can put our content
// into bodyBegin alongside the default header partial.

hexo.extend.filter.register('theme_inject', function (injects) {
  // sidebar + hero shell
  injects.bodyBegin.file(
    'cinema-shell',
    'source/_includes/cinema-shell.ejs',
    {},                // locals
    {},                // options
    0                  // order 0 = renders first
  )
}, 1) // priority 1 > default's -99, so we run after
