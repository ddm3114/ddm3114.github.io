(function () {
  // Highlight current nav item based on current path
  var path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.cinema-nav-item').forEach(function (a) {
    var href = (a.getAttribute('href') || '').replace(/\/$/, '');
    if (!href) return;
    if (href === path || (href === '' && path === '/index.html')) {
      a.classList.add('is-active');
    } else if (href !== '/' && path.indexOf(href) === 0) {
      a.classList.add('is-active');
    }
  });

  // Manual theme toggle — switches data-user-color-scheme on <html>
  var btn = document.getElementById('cinema-mode-toggle');
  if (!btn) return;
  function apply() {
    var mode = localStorage.getItem('cinema-mode') || 'dark';
    if (mode === 'light') {
      document.documentElement.setAttribute('data-user-color-scheme', 'light');
    } else {
      document.documentElement.removeAttribute('data-user-color-scheme');
    }
  }
  apply();
  btn.addEventListener('click', function () {
    var cur = localStorage.getItem('cinema-mode') || 'dark';
    var next = cur === 'dark' ? 'light' : 'dark';
    localStorage.setItem('cinema-mode', next);
    apply();
  });
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
  });
})();
