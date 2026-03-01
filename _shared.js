(function () {
  'use strict';

  var path = window.location.pathname;
  var isHome = (path === '/newlanding.html' || path === '/' || path === '/index.html');

  /* ── Load navbar + footer partials ── */
  var navbarEl = document.getElementById('navbar-root');
  var footerEl = document.getElementById('footer-root');

  var navLoaded = false;
  var footLoaded = false;

  function onBothLoaded() {
    if (!navLoaded || !footLoaded) return;

    /* On home page: make logo scroll to top instead of navigating */
    var logo = document.getElementById('logo-link');
    if (logo) {
      if (isHome) {
        logo.setAttribute('href', '#');
        logo.setAttribute('aria-label', 'חזרה לראש הדף');
        logo.addEventListener('click', function (e) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }

    /* On home page: mobile links use local anchors */
    if (isHome) {
      var homeLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding.html"]');
      if (homeLink) homeLink.setAttribute('href', '#home');
      var howLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding.html#how-it-works"]');
      if (howLink) howLink.setAttribute('href', '#how-it-works');
      var featLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding.html#features"]');
      if (featLink) featLink.setAttribute('href', '#features');
      var aboutLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding.html#about"]');
      if (aboutLink) aboutLink.setAttribute('href', '#about');
    }

    /* Highlight active nav item */
    if (path.indexOf('/pricing.html') !== -1) {
      var pricingLink = document.getElementById('nav-pricing');
      if (pricingLink) pricingLink.classList.add('active');
      var mobPricing = document.getElementById('mob-pricing');
      if (mobPricing) mobPricing.style.color = 'var(--pink)';
    }

    initShared();
  }

  if (navbarEl) {
    fetch('/_navbar.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        navbarEl.innerHTML = html;
        navLoaded = true;
        onBothLoaded();
      })
      .catch(function () { navLoaded = true; onBothLoaded(); });
  } else {
    navLoaded = true;
  }

  if (footerEl) {
    fetch('/_footer.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        footerEl.innerHTML = html;
        footLoaded = true;
        onBothLoaded();
      })
      .catch(function () { footLoaded = true; onBothLoaded(); });
  } else {
    footLoaded = true;
  }

  /* ── All shared init (runs after both partials inserted) ── */
  function initShared() {

    /* Hamburger / Mobile menu */
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    var mobileBack = document.getElementById('mobile-backdrop');
    var mobileClose = document.getElementById('mobile-close');

    function openMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.add('open');
      if (hamburger) { hamburger.classList.add('open'); hamburger.setAttribute('aria-expanded', 'true'); }
      document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
      if (!mobileMenu) return;
      mobileMenu.classList.remove('open');
      if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
      document.body.style.overflow = '';
    }

    if (hamburger) hamburger.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    if (mobileBack) mobileBack.addEventListener('click', closeMenu);
    if (mobileClose) mobileClose.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });
    if (mobileMenu) mobileMenu.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* ── Smooth anchor scrolling (mobile menu + footer nav) ── */
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a[href]');
      if (!anchor) return;

      var href = anchor.getAttribute('href');
      if (!href) return;

      var hash = '';

      /* Pure hash: #section */
      if (href.charAt(0) === '#') {
        hash = href;
      } else {
        /* Absolute/relative path on same page: /newlanding.html#section */
        try {
          var url = new URL(href, window.location.href);
          if (url.pathname === window.location.pathname && url.hash) {
            hash = url.hash;
          }
        } catch (err) { return; }
      }

      if (!hash || hash === '#') return;

      var target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      /* Small delay so menu close animation doesn't fight scroll */
      setTimeout(function () {
        var navH = 0;
        var nav = document.querySelector('.navbar');
        if (nav) navH = nav.getBoundingClientRect().height;
        var top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }, 80);
    });

    /* Footer a11y buttons */
    var footerA11y = document.getElementById('footer-a11y-btn');
    if (footerA11y) footerA11y.addEventListener('click', function () { openPanel(); });
    var footerA11yDesktop = document.getElementById('footer-a11y-btn-desktop');
    if (footerA11yDesktop) footerA11yDesktop.addEventListener('click', function () { openPanel(); });

    /* Back to top */
    var topBtn = document.getElementById('back-to-top');
    if (topBtn) {
      window.addEventListener('scroll', function () {
        topBtn.classList.toggle('visible', window.scrollY > 400);
      });
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      /* Lift when footer visible on mobile */
      var footerSection = document.querySelector('footer.footer');
      if (footerSection && window.matchMedia('(max-width: 768px)').matches) {
        var footerObserver = new IntersectionObserver(
          function (entries) { topBtn.classList.toggle('lift-for-footer', entries[0].isIntersecting); },
          { threshold: 0.05 }
        );
        footerObserver.observe(footerSection);
      }
    }

    /* ══ Accessibility Widget ══ */
    var STORAGE_KEY = 'accessibility-settings';
    var fontSizes = ['', '118%', '136%'];

    var defaults = {
      fontSize: 0, highContrast: false, grayscale: false,
      highlightLinks: false, readableFont: false, textSpacing: false,
      stopAnimations: false, largeCursor: false, readingGuide: false
    };

    var settings = Object.assign({}, defaults);
    try { var s = localStorage.getItem(STORAGE_KEY); if (s) settings = JSON.parse(s); } catch (e) { }

    var fab = document.getElementById('a11y-fab');
    var backdrop = document.getElementById('a11y-backdrop');
    var panel = document.getElementById('a11y-panel');
    var dot = document.getElementById('a11y-dot');
    var guide = document.getElementById('a11y-reading-guide');

    function openPanel() {
      if (!panel) return;
      panel.classList.add('open');
      if (backdrop) backdrop.classList.add('show');
      if (fab) fab.setAttribute('aria-expanded', 'true');
    }
    function closePanel() {
      if (!panel) return;
      panel.classList.remove('open');
      if (backdrop) backdrop.classList.remove('show');
      if (fab) fab.setAttribute('aria-expanded', 'false');
    }

    if (fab) {
      fab.addEventListener('click', function () {
        if (fab.classList.contains('collapsed')) { fab.classList.remove('collapsed'); return; }
        panel && panel.classList.contains('open') ? closePanel() : openPanel();
      });
    }
    if (backdrop) backdrop.addEventListener('click', closePanel);
    var closeBtn = document.getElementById('a11y-close');
    if (closeBtn) closeBtn.addEventListener('click', closePanel);

    /* Collapse on mobile scroll */
    var lastScrollY = 0;
    window.addEventListener('scroll', function () {
      if (!fab) return;
      if (window.innerWidth >= 1024) { fab.classList.remove('collapsed'); return; }
      var cur = window.scrollY;
      if (cur > lastScrollY && cur > 200) fab.classList.add('collapsed');
      else if (cur < lastScrollY || cur < 100) fab.classList.remove('collapsed');
      lastScrollY = cur;
    }, { passive: true });

    /* Reading guide */
    window.addEventListener('mousemove', function (e) {
      if (guide && settings.readingGuide) guide.style.top = (e.clientY - 24) + 'px';
    });

    /* Apply all settings to DOM */
    function applySettings() {
      var b = document.body;
      var html = document.documentElement;

      html.style.fontSize = fontSizes[settings.fontSize] || '';

      b.classList.toggle('accessibility-high-contrast', settings.highContrast);
      b.classList.toggle('accessibility-grayscale', settings.grayscale);
      b.classList.toggle('accessibility-highlight-links', settings.highlightLinks);
      b.classList.toggle('accessibility-readable-font', settings.readableFont);
      b.classList.toggle('accessibility-text-spacing', settings.textSpacing);
      b.classList.toggle('accessibility-stop-animations', settings.stopAnimations);
      b.classList.toggle('accessibility-large-cursor', settings.largeCursor);

      document.querySelectorAll('video').forEach(function (v) {
        if (settings.stopAnimations) { v.pause(); v.dataset.a11yPaused = '1'; }
        else if (v.dataset.a11yPaused) { v.play(); delete v.dataset.a11yPaused; }
      });

      if (guide) guide.classList.toggle('show', settings.readingGuide);

      [0, 1, 2].forEach(function (i) {
        var btn = document.getElementById('fs-' + i);
        if (btn) btn.classList.toggle('fs-active', settings.fontSize === i);
      });
      var dec = document.getElementById('fs-dec'); if (dec) dec.disabled = settings.fontSize === 0;
      var inc = document.getElementById('fs-inc'); if (inc) inc.disabled = settings.fontSize === 2;

      updateToggle('t-contrast', 'sw-contrast', settings.highContrast);
      updateToggle('t-gray', 'sw-gray', settings.grayscale);
      updateToggle('t-links', 'sw-links', settings.highlightLinks);
      updateToggle('t-font', 'sw-font', settings.readableFont);
      updateToggle('t-spacing', 'sw-spacing', settings.textSpacing);
      updateToggle('t-anim', 'sw-anim', settings.stopAnimations);
      updateToggle('t-cursor', 'sw-cursor', settings.largeCursor);
      updateToggle('t-guide', 'sw-guide', settings.readingGuide);

      var hasActive = settings.fontSize !== 0 || Object.entries(settings).some(function (kv) { return kv[0] !== 'fontSize' && kv[1]; });
      if (dot) dot.classList.toggle('show', hasActive);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }

    function updateToggle(rowId, swId, active) {
      var row = document.getElementById(rowId);
      var sw = document.getElementById(swId);
      if (row) { row.classList.toggle('on', active); row.setAttribute('aria-checked', active); }
      if (sw) sw.classList.toggle('on', active);
    }

    function makeToggle(id, key) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', function () { settings[key] = !settings[key]; applySettings(); });
    }
    makeToggle('t-contrast', 'highContrast');
    makeToggle('t-gray', 'grayscale');
    makeToggle('t-links', 'highlightLinks');
    makeToggle('t-font', 'readableFont');
    makeToggle('t-spacing', 'textSpacing');
    makeToggle('t-anim', 'stopAnimations');
    makeToggle('t-cursor', 'largeCursor');
    makeToggle('t-guide', 'readingGuide');

    var fsDec = document.getElementById('fs-dec');
    var fsInc = document.getElementById('fs-inc');
    if (fsDec) fsDec.addEventListener('click', function () { settings.fontSize = Math.max(0, settings.fontSize - 1); applySettings(); });
    if (fsInc) fsInc.addEventListener('click', function () { settings.fontSize = Math.min(2, settings.fontSize + 1); applySettings(); });
    [0, 1, 2].forEach(function (i) {
      var btn = document.getElementById('fs-' + i);
      if (btn) btn.addEventListener('click', function () { settings.fontSize = i; applySettings(); });
    });

    var resetBtn = document.getElementById('a11y-reset');
    if (resetBtn) resetBtn.addEventListener('click', function () { settings = Object.assign({}, defaults); applySettings(); });

    /* Apply saved settings immediately */
    applySettings();
  }

})();
