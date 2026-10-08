/* ===== LED Display Solution — main.js ===== */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Header: scroll state + mobile menu ---------- */
  var hdr = $("#hdr"), nav = $("#nav"), burger = $("#burger");
  window.addEventListener("scroll", function () {
    hdr.classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });

  // Dropdown accordion di mobile
  Array.prototype.forEach.call(document.querySelectorAll(".has-sub > a"), function (a) {
    a.addEventListener("click", function (e) {
      if (window.innerWidth > 991) return;
      e.preventDefault();
      a.parentNode.classList.toggle("is-open");
    });
  });
  document.addEventListener("click", function (e) {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && e.target !== burger && !burger.contains(e.target)) {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 2. Hero slider ---------- */
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var dotsBox = $("#heroDots"), hero = $(".hero"), idx = 0, timer = null, DELAY = 6500;

  slides.forEach(function (s, i) {
    var b = document.createElement("button");
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", "Slide " + (i + 1));
    b.addEventListener("click", function () { go(i); play(); });
    dotsBox.appendChild(b);
  });
  var dots = Array.prototype.slice.call(dotsBox.children);

  function go(n) {
    idx = (n + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle("is-active", i === idx); });
    dots.forEach(function (d, i) { d.setAttribute("aria-selected", String(i === idx)); });
  }
  function play() { stop(); if (!reduce) timer = setInterval(function () { go(idx + 1); }, DELAY); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }

  $("#heroNext").addEventListener("click", function () { go(idx + 1); play(); });
  $("#heroPrev").addEventListener("click", function () { go(idx - 1); play(); });
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", play);
  document.addEventListener("visibilitychange", function () { document.hidden ? stop() : play(); });

  // Swipe untuk mobile
  var x0 = null;
  hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
  hero.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) go(idx + (dx < 0 ? 1 : -1));
    x0 = null; play();
  }, { passive: true });

  go(0); play();

  /* ---------- 3. Featured products ---------- */
  var pg = $("#productGrid");
  (window.PRODUCTS || []).forEach(function (p) {
    var el = document.createElement("article");
    el.className = "pcard";
    el.innerHTML =
      '<div class="pcard__img' + (p.image ? " has-photo" : "") + '"' +
        (p.image ? ' style="background-image:url(\'' + p.image + '\')"' : "") + ">" +
        '<span>' + p.pitch + "</span></div>" +
      '<div class="pcard__body">' +
        '<p class="pcard__cat">' + p.cat + "</p>" +
        "<h3>" + p.name + "</h3>" +
        "<dl>" +
          "<dt>Brightness</dt><dd>" + p.brightness + "</dd>" +
          "<dt>Refresh Rate</dt><dd>" + p.refresh + "</dd>" +
          "<dt>Application</dt><dd>" + p.app + "</dd>" +
        "</dl>" +
        '<a class="link" href="product-detail.html?id=' + p.id + '" data-ev="product_view">View Details</a>' +
      "</div>";
    pg.appendChild(el);
  });

  /* ---------- 4. Projects + filter (data nyata dari projects-data.js) ---------- */
  var fBox = $("#projFilter"), grid = $("#projectGrid");
  var PROJECTS_SRC = window.PROJECT_CATALOG || [];
  var FILTERS_SRC = [{ key: "all", label: "All" }].concat(
    Array.from(new Set(PROJECTS_SRC.map(function (p) { return p.industry_segment; })))
      .map(function (k) { return { key: k, label: (window.INDUSTRY_LABEL && window.INDUSTRY_LABEL[k]) || k }; })
  );

  function renderProjects(key) {
    grid.innerHTML = "";
    PROJECTS_SRC
      .filter(function (p) { return key === "all" || p.industry_segment === key; })
      .slice(0, 6)
      .forEach(function (p) {
        var el = document.createElement("article");
        el.className = "prj";
        el.innerHTML =
          '<div class="prj__img" role="img" aria-label="' + p.title + '"></div>' +
          '<div class="prj__body"><h3>' + p.title + "</h3>" +
          "<p>" + p.location.city + " · " + p.metrics.screen_size_m + "</p>" +
          '<a class="link" href="project-detail.html?id=' + p.slug + '">View Project</a></div>';
        grid.appendChild(el);
      });
  }

  FILTERS_SRC.forEach(function (f, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = f.label;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", String(i === 0));
    b.addEventListener("click", function () {
      Array.prototype.forEach.call(fBox.children, function (c) { c.setAttribute("aria-selected", "false"); });
      b.setAttribute("aria-selected", "true");
      renderProjects(f.key);
    });
    fBox.appendChild(b);
  });
  renderProjects("all");

  /* ---------- 5. Counter statistik ---------- */
  var stats = document.querySelectorAll(".stats dd[data-count]");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var dd = en.target, target = parseInt(dd.dataset.count, 10), t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1200, 1);
          dd.firstChild.nodeValue = String(Math.round(target * p));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(dd);
      });
    }, { threshold: .4 });
    stats.forEach(function (s) { io.observe(s); });
  }

  /* ---------- 6. Event tracking (PRD Section 31) ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-ev]");
    if (!el) return;
    if (typeof window.gtag === "function") {
      window.gtag("event", el.dataset.ev, { link_text: el.textContent.trim(), link_url: el.href || "" });
    } else {
      (window.dataLayer = window.dataLayer || []).push({ event: el.dataset.ev });
    }
  });
})();
