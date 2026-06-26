/**
 * @file app.js
 * @description Portfolio website interactivity — filter engine, GitHub API integration,
 *              mobile navigation, and smooth scrolling for carlose119.github.io
 * @author Carlos Carrillo
 */

(function () {
  'use strict';

  /* ── Module Constants ────────────────────────────────────────────────── */

  const GH_API = 'https://api.github.com/users/carlose119/repos?sort=updated&per_page=30';
  const CACHE_KEY = 'gh_repos_v2';
  const CACHE_TTL = 3600000; // 1 hour in ms
  const LANG_COLORS = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    Python: '#3572A5',
    Go: '#00ADD8',
    Java: '#b07219',
    Ruby: '#701516',
    'C#': '#178600',
    Shell: '#89e051',
  };

  /* ── Filter Engine ───────────────────────────────────────────────────── */

  /**
   * @description Initialises project filter buttons via event delegation.
   * Reads `data-filter` from clicked button, toggles `.active` on buttons,
   * and shows/hides `.project-card` elements by matching `data-category`.
   * Hidden cards receive `aria-hidden="true"` for screen readers.
   */
  function initFilters() {
    const container = document.querySelector('.filter-buttons');
    if (!container) return;

    container.addEventListener('click', function (e) {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const filter = btn.getAttribute('data-filter');

      // Toggle active state on buttons
      container.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Filter project cards
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(function (card) {
        const category = card.getAttribute('data-category');
        const show = filter === 'all' || category === filter;
        card.classList.toggle('hidden', !show);
        card.setAttribute('aria-hidden', String(!show));
      });
    });
  }

  /* ── GitHub API Fetch — Carousel ─────────────────────────────────────── */

  /**
   * @description Fetches ALL public GitHub repos, caches in sessionStorage for 1 hour,
   * and renders them as cards inside the carousel track.
   * Shows a spinner while loading and an error message on failure.
   */
  async function fetchRepos() {
    const track = document.getElementById('github-repos');
    if (!track) return;

    // Check cache first
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TTL) {
          renderRepos(track, data);
          return;
        }
      }
    } catch {
      // Corrupt cache — ignore and fetch fresh
    }

    try {
      const res = await fetch(GH_API);
      if (!res.ok) throw new Error('GitHub API ' + res.status);

      const repos = await res.json();

      // Sort by most recently updated
      repos.sort(function (a, b) {
        return new Date(b.updated_at) - new Date(a.updated_at);
      });

      // Cache the result
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        data: repos,
        timestamp: Date.now(),
      }));

      renderRepos(track, repos);
    } catch (err) {
      track.innerHTML =
        '<p class="repo-error">No se pudieron cargar los repositorios</p>';
    }
  }

  /**
   * @description Renders an array of repo objects as HTML cards inside the carousel track.
   * @param {HTMLElement} track - The `.carousel-track` element.
   * @param {Array<Object>} repos - Array of GitHub repo objects.
   */
  function renderRepos(track, repos) {
    if (!repos || repos.length === 0) {
      track.innerHTML =
        '<p class="repo-error">No se encontraron repositorios públicos.</p>';
      return;
    }

    const html = repos.map(function (repo) {
      const lang = repo.language || 'N/A';
      const dotColor = LANG_COLORS[lang] || '#ccc';
      const desc = repo.description || 'Sin descripción';

      return (
        '<a href="' + repo.html_url + '" target="_blank" rel="noopener noreferrer" ' +
        'class="github-repo-card">' +
        '  <h3 class="repo-name">' + escapeHtml(repo.name) + '</h3>' +
        '  <p class="repo-description">' + escapeHtml(desc) + '</p>' +
        '  <div class="repo-meta">' +
        '    <span class="repo-language">' +
        '      <span class="language-dot" style="background:' + dotColor + '"></span>' +
        '      ' + escapeHtml(lang) +
        '    </span>' +
        '    <span class="repo-stars">&#9733; ' + repo.stargazers_count + '</span>' +
        '  </div>' +
        '</a>'
      );
    }).join('');

    track.innerHTML = html;
    initCarousel();

    // Show repo counter
    var counter = document.getElementById('gh-counter');
    if (counter) {
      counter.textContent = repos.length + ' repositorios públicos';
    }
  }

  /**
   * @description Initializes carousel navigation (prev/next buttons + dots).
   * Calculates the number of pages based on visible cards and viewport width.
   */
  function initCarousel() {
    const track = document.getElementById('github-repos');
    const prevBtn = document.getElementById('gh-prev');
    const nextBtn = document.getElementById('gh-next');
    const dotsContainer = document.getElementById('gh-dots');
    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    const cards = track.querySelectorAll('.github-repo-card');
    if (cards.length === 0) return;

    var currentPage = 0;

    function getCardWidth() {
      if (cards.length === 0) return 320;
      var style = window.getComputedStyle(cards[0]);
      return cards[0].offsetWidth + parseFloat(style.marginRight || 0) + 24; // gap
    }

    function getVisibleCards() {
      var cardW = getCardWidth();
      return Math.max(1, Math.floor(track.clientWidth / cardW));
    }

    function getTotalPages() {
      var visible = getVisibleCards();
      return Math.max(1, Math.ceil(cards.length / visible));
    }

    function buildDots() {
      var total = getTotalPages();
      dotsContainer.innerHTML = '';
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Página ' + (i + 1));
        dot.dataset.page = i;
        dot.addEventListener('click', function () {
          goToPage(parseInt(this.dataset.page));
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goToPage(page) {
      var total = getTotalPages();
      currentPage = Math.max(0, Math.min(page, total - 1));
      var cardW = getCardWidth();
      var visible = getVisibleCards();
      track.scrollTo({ left: currentPage * visible * cardW, behavior: 'smooth' });
      updateDots();
    }

    function updateDots() {
      var dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === currentPage);
      });
    }

    prevBtn.addEventListener('click', function () {
      goToPage(currentPage - 1);
    });

    nextBtn.addEventListener('click', function () {
      goToPage(currentPage + 1);
    });

    // Recalculate on resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        goToPage(0);
      }, 200);
    });

    buildDots();
  }

  /**
   * @description Escapes HTML special characters to prevent XSS.
   * @param {string} str - Raw string to escape.
   * @returns {string} Escaped string safe for innerHTML.
   */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ── Hamburger Menu Toggle ───────────────────────────────────────────── */

  /**
   * @description Toggles the mobile navigation menu.
   * Sets `aria-expanded` on the toggle button and `.active` on `.nav-menu`.
   * Automatically closes the menu when a nav link is clicked.
   */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('active');
      });
    });
  }

  /* ── Smooth Scroll ───────────────────────────────────────────────────── */

  /**
   * @description Intercepts anchor clicks starting with `#` and smoothly
   * scrolls to the target element. Closes the mobile menu if open.
   */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;

      // Close mobile menu if open
      var menu = document.querySelector('.nav-menu');
      var toggle = document.querySelector('.nav-toggle');
      if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
      // Smooth scroll is handled by CSS: html { scroll-behavior: smooth }
    });
  }

  /* ── Initialise ──────────────────────────────────────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    initFilters();
    fetchRepos();
    initMobileNav();
    initSmoothScroll();
  });
})();
