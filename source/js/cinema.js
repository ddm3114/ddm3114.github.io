/**
 * cinema.js — route detection, nav highlighting, blog slogan injection.
 * Content (quotes) comes from source/_data/quotes.yml via the DOM.
 */
(function () {
  var p = window.location.pathname.replace(/\/$/, '') || '/';

  /* ---- route classes ---- */
  if (p === '' || p === '/' || p === '/blog' || p === '/blog.html') {
    document.body.classList.add('route-blog');
  }
  if (p.indexOf('/about') === 0 || p === '/me' || p === '/me.html') {
    document.body.classList.add('route-me');
  }
  if (p.indexOf('/diary') === 0)  document.body.classList.add('route-diary');
  if (p.indexOf('/papers') === 0) document.body.classList.add('route-papers');

  /* ---- active nav highlight ---- */
  document.querySelectorAll('.cinema-nav-item').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\/$/, '');
    if (!href) return;
    if (href === p || (href === '' && p === '/index.html')) {
      a.classList.add('is-active');
    } else if (href !== '/' && p.indexOf(href) === 0) {
      a.classList.add('is-active');
    }
  });

  /* ---- diary page header ---- */
  if (document.body.classList.contains('route-diary')) {
    var board = document.getElementById('board');
    if (board) {
      var header = document.createElement('div');
      header.className = 'page-hero';
      header.innerHTML = '<h1 class="page-hero-title">diary</h1><p class="page-hero-subtitle">随手写，不讲究。</p>';
      board.parentNode.insertBefore(header, board);
    }
  }

  /* ---- slogan (random quote above post list, blog + papers) ---- */
  if (document.body.classList.contains('route-blog') || document.body.classList.contains('route-papers')) {
    var el = document.getElementById('cinema-quotes');
    var quotes = [];
    try { quotes = JSON.parse(el.textContent); } catch (e) {}
    if (quotes.length) {
      var quote = quotes[Math.floor(Math.random() * quotes.length)];
      var board = document.getElementById('board');
      if (board) {
        var slogan = document.createElement('div');
        slogan.className = 'blog-slogan';
        slogan.innerHTML = '<p class="blog-slogan-text">' + quote + '</p>';
        board.parentNode.insertBefore(slogan, board);
      }
    }
  }
  /* ---- video continuity across page navigations ---- */
  var vid = document.querySelector('.bg-video');
  if (vid) {
    var saved = sessionStorage.getItem('heroTime');
    if (saved) {
      vid.currentTime = parseFloat(saved);
    }
    vid.addEventListener('timeupdate', function () {
      sessionStorage.setItem('heroTime', vid.currentTime);
    });

    /* ---- video pause/play toggle ---- */
    var paused = sessionStorage.getItem('videoPaused') === '1';
    var btn = document.getElementById('video-toggle');
    var icon = document.getElementById('video-toggle-icon');

    if (paused) {
      vid.pause();
      icon.textContent = '▶';
    }

    if (btn) {
      btn.addEventListener('click', function () {
        if (vid.paused) {
          vid.play();
          icon.textContent = '⏸';
          sessionStorage.setItem('videoPaused', '0');
        } else {
          vid.pause();
          icon.textContent = '▶';
          sessionStorage.setItem('videoPaused', '1');
        }
      });
    }
  }
})();
