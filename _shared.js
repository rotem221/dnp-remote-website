(function () {
  'use strict';

  var path = window.location.pathname.replace(/\/+$/, '') || '/';
  var isHome = (path === '/newlanding' || path === '/newlanding.html' || path === '/' || path === '/index.html');

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
      var homeLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding"]');
      if (homeLink) homeLink.setAttribute('href', '#home');
      var howLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding#how-it-works"]');
      if (howLink) howLink.setAttribute('href', '#how-it-works');
      var featLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding#features"]');
      if (featLink) featLink.setAttribute('href', '#features');
      var aboutLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding#about"]');
      if (aboutLink) aboutLink.setAttribute('href', '#about');
    }

    /* Highlight active nav item */
    updateActiveNav();

    initShared();
    wrapPageContent();
    setupSPANavigation();
  }

  function updateActiveNav() {
    var p = window.location.pathname.replace(/\/+$/, '').replace('.html', '') || '/';
    /* Reset */
    var aboutLink = document.getElementById('nav-about');
    var mobAbout = document.getElementById('mob-about');
    var pricingLink = document.getElementById('nav-pricing');
    var mobPricing = document.getElementById('mob-pricing');
    if (aboutLink) aboutLink.classList.remove('active');
    if (mobAbout) mobAbout.style.color = '';
    if (pricingLink) pricingLink.classList.remove('active');
    if (mobPricing) mobPricing.style.color = '';

    if (p === '/about') {
      if (aboutLink) aboutLink.classList.add('active');
      if (mobAbout) mobAbout.style.color = 'var(--pink)';
    }

    if (p === '/pricing') {
      if (pricingLink) pricingLink.classList.add('active');
      if (mobPricing) mobPricing.style.color = 'var(--pink)';
    }
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

  /* ── Wrap page content in <main id="page-content"> ── */
  function wrapPageContent() {
    if (document.getElementById('page-content')) return;
    var navRoot = document.getElementById('navbar-root');
    var footRoot = document.getElementById('footer-root');
    if (!navRoot || !footRoot) return;

    var main = document.createElement('main');
    main.id = 'page-content';
    main.style.opacity = '1';
    main.style.transform = 'translateY(0)';
    main.style.transition = 'opacity 280ms ease, transform 280ms ease';
    main.style.willChange = 'opacity, transform';
    var sibling = navRoot.nextSibling;
    while (sibling && sibling !== footRoot) {
      var next = sibling.nextSibling;
      main.appendChild(sibling);
      sibling = next;
    }
    footRoot.parentNode.insertBefore(main, footRoot);

    /* Ensure header/footer are never affected by content transitions */
    if (navbarEl) {
      navbarEl.style.opacity = '1';
      navbarEl.style.transform = 'none';
      navbarEl.style.transition = 'none';
    }
    if (footerEl) {
      footerEl.style.opacity = '1';
      footerEl.style.transform = 'none';
      footerEl.style.transition = 'none';
    }
  }

  function ensureChromeOutsideContent() {
    var content = document.getElementById('page-content');
    var navRoot = document.getElementById('navbar-root');
    var footRoot = document.getElementById('footer-root');
    if (!content || !navRoot || !footRoot) return;

    /* If footer/nav were accidentally moved into content, extract them back out */
    if (content.contains(navRoot) && content.parentNode) {
      content.parentNode.insertBefore(navRoot, content);
    }
    if (content.contains(footRoot) && content.parentNode) {
      content.parentNode.insertBefore(footRoot, content.nextSibling);
    }
  }

  /* ── SPA Navigation ── */
  function setupSPANavigation() {
    /* Collect initial page styles from <head> */
    var initialStyles = '';
    document.querySelectorAll('head style:not(#page-styles)').forEach(function (s) {
      initialStyles += s.textContent;
    });
    var pageStyleEl = document.getElementById('page-styles');
    if (!pageStyleEl) {
      pageStyleEl = document.createElement('style');
      pageStyleEl.id = 'page-styles';
      document.head.appendChild(pageStyleEl);
    }
    pageStyleEl.textContent = initialStyles;
    /* Remove original inline styles to avoid duplication */
    document.querySelectorAll('head style:not(#page-styles)').forEach(function (s) {
      s.remove();
    });

    /* Click handler for internal navigation */
    document.addEventListener('click', function (e) {
      var anchor = e.target.closest('a[href]');
      if (!anchor) return;
      if (anchor.target === '_blank') return;

      var href = anchor.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return;

      /* Pure hash on same page — let default smooth scroll handler work */
      if (href.charAt(0) === '#') return;

      var url;
      try { url = new URL(href, window.location.href); } catch (err) { return; }
      if (url.origin !== window.location.origin) return;

      /* Only handle known static pages */
      var cleanPath = url.pathname.replace(/\/+$/, '').replace('.html', '').replace('/index', '') || '/';
      var knownPages = ['/', '/newlanding', '/about', '/pricing', '/privacy', '/terms', '/accessibility'];
      if (knownPages.indexOf(cleanPath) === -1) return;

      /* If navigating to same page with hash, just scroll */
      var currentClean = window.location.pathname.replace(/\/+$/, '').replace('.html', '').replace('/index', '') || '/';
      if (cleanPath === currentClean && url.hash) return; /* Let hash handler deal with it */

      e.preventDefault();
      e.stopPropagation();
      closeMenuGlobal();
      navigateToPage(cleanPath, url.hash, false);
    }, true); /* Use capture to intercept before other handlers */

    /* Handle back/forward */
    window.addEventListener('popstate', function () {
      var cleanPath = window.location.pathname.replace(/\/+$/, '').replace('.html', '').replace('/index', '') || '/';
      navigateToPage(cleanPath, window.location.hash, true);
    });
  }

  var closeMenuGlobal = function () { };

  function navigateToPage(cleanPath, hash, isPopState) {
    ensureChromeOutsideContent();
    var pageContent = document.getElementById('page-content');
    if (!pageContent) { window.location.href = cleanPath; return; }
    pageContent.style.transition = 'opacity 280ms ease, transform 280ms ease';

    /* Map clean path to possible static HTML outputs (dev + production) */
    var candidates = [];
    if (cleanPath === '/' || cleanPath === '/newlanding') {
      candidates = ['/newlanding/index.html', '/newlanding.html', '/index.html'];
    } else {
      candidates = [cleanPath + '/index.html', cleanPath + '.html'];
    }

    function fetchFirstAvailable(list, idx) {
      if (idx >= list.length) throw new Error('Page not found');
      return fetch(list[idx]).then(function (r) {
        if (!r.ok) return fetchFirstAvailable(list, idx + 1);
        return r.text();
      });
    }

    /* Fade out */
    pageContent.style.opacity = '0';
    pageContent.style.transform = 'translateY(6px)';

    fetchFirstAvailable(candidates, 0)
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        /* Extract content between navbar-root and footer-root */
        var newNav = doc.getElementById('navbar-root');
        var newFoot = doc.getElementById('footer-root');
        if (!newNav || !newFoot) {
          window.location.href = cleanPath;
          return;
        }

        var fragment = document.createDocumentFragment();
        var sibling = newNav.nextSibling;
        while (sibling && sibling !== newFoot) {
          var next = sibling.nextSibling;
          fragment.appendChild(sibling);
          sibling = next;
        }

        /* Extract page-specific styles */
        var newStyles = '';
        doc.querySelectorAll('head style').forEach(function (s) {
          newStyles += s.textContent;
        });

        /* Extract inline scripts from body (not src scripts) */
        var newScripts = [];
        doc.querySelectorAll('body script:not([src])').forEach(function (s) {
          newScripts.push(s.textContent);
        });

        /* Update title */
        document.title = doc.title;

        /* Update page styles */
        var pageStyleEl = document.getElementById('page-styles');
        if (pageStyleEl) pageStyleEl.textContent = newStyles;

        /* Swap content */
        pageContent.innerHTML = '';
        pageContent.appendChild(fragment);

        /* Update URL */
        var displayPath = cleanPath === '/' ? '/' : cleanPath;
        if (!isPopState) {
          history.pushState(null, '', displayPath + (hash || ''));
        }

        /* Update path variable for home detection */
        path = cleanPath;
        isHome = (cleanPath === '/' || cleanPath === '/newlanding');

        /* Update logo behavior */
        var logo = document.getElementById('logo-link');
        if (logo) {
          if (isHome) {
            logo.setAttribute('href', '#');
            logo.setAttribute('aria-label', 'חזרה לראש הדף');
          } else {
            logo.setAttribute('href', '/');
            logo.setAttribute('aria-label', 'דף הבית');
          }
        }

        /* Update mobile menu links for home */
        if (isHome) {
          var homeLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding"]');
          if (homeLink) homeLink.setAttribute('href', '#home');
          var howLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding#how-it-works"]');
          if (howLink) howLink.setAttribute('href', '#how-it-works');
          var featLink = document.querySelector('#mobile-menu .mobile-links-list a[href="/newlanding#features"]');
          if (featLink) featLink.setAttribute('href', '#features');
        } else {
          /* Reset mobile links to absolute paths */
          var homeLink2 = document.querySelector('#mobile-menu .mobile-links-list a[href="#home"]');
          if (homeLink2) homeLink2.setAttribute('href', '/newlanding');
          var howLink2 = document.querySelector('#mobile-menu .mobile-links-list a[href="#how-it-works"]');
          if (howLink2) howLink2.setAttribute('href', '/newlanding#how-it-works');
          var featLink2 = document.querySelector('#mobile-menu .mobile-links-list a[href="#features"]');
          if (featLink2) featLink2.setAttribute('href', '/newlanding#features');
        }

        /* Highlight active nav */
        updateActiveNav();

        /* Scroll */
        if (hash) {
          setTimeout(function () {
            var target = document.querySelector(hash);
            if (target) {
              var navH = 0;
              var nav = document.querySelector('.navbar');
              if (nav) navH = nav.getBoundingClientRect().height;
              window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navH, behavior: 'smooth' });
            }
          }, 50);
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }

        /* Fade in */
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            pageContent.style.opacity = '1';
            pageContent.style.transform = 'translateY(0)';
          });
        });

        /* Execute page-specific scripts */
        newScripts.forEach(function (code) {
          try { new Function(code)(); } catch (err) { console.warn('Page script error:', err); }
        });

        /* Re-apply accessibility settings */
        if (window.__applyA11y) window.__applyA11y();
      })
      .catch(function () {
        window.location.href = cleanPath;
      });
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

    /* Expose closeMenu for SPA navigation */
    closeMenuGlobal = closeMenu;

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
        /* Absolute/relative path on same page */
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

    /* Expose for SPA re-apply */
    window.__applyA11y = applySettings;

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
