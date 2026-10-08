/* =========================================================
   projects.js — Projects Main Hub Engine
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var PAGE = 9;
  var state = { q: "", industry: "all", product: "all", location: "all", view: "grid", shown: PAGE };
  var filtered = [];
  var map, markers = [];

  /* ---------- Header mobile ---------- */
  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () { burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))); });
  window.addEventListener("scroll", function () { $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });

  function byId(id) { return window.PRODUCT_CATALOG.filter(function (p) { return p.product_id === id; })[0]; }

  /* ---------- Populate filter dropdowns from data ---------- */
  var industries = Array.from(new Set(window.PROJECT_CATALOG.map(function (p) { return p.industry_segment; })));
  $("#fIndustry").innerHTML += industries.map(function (i) {
    return '<option value="' + i + '">' + (window.INDUSTRY_LABEL[i] || i) + "</option>";
  }).join("");

  var productTypes = Array.from(new Set(window.PRODUCT_CATALOG.map(function (p) { return p.category_segment[0]; })));
  $("#fProduct").innerHTML += productTypes.map(function (t) {
    return '<option value="' + t + '">' + (window.SEGMENT_INFO[t] ? window.SEGMENT_INFO[t].title.replace(" Display", "") : t) + "</option>";
  }).join("");

  var locations = Array.from(new Set(window.PROJECT_CATALOG.map(function (p) { return p.location.city; }))).sort();
  $("#fLocation").innerHTML += locations.map(function (c) { return '<option value="' + c + '">' + c + "</option>"; }).join("");

  /* ---------- Compute filtered list ---------- */
  function productTypesOf(project) {
    return project.products_used.map(byId).filter(Boolean).reduce(function (acc, p) { return acc.concat(p.category_segment); }, []);
  }

  function compute() {
    var q = state.q.trim().toLowerCase();
    filtered = window.PROJECT_CATALOG.filter(function (p) {
      if (state.industry !== "all" && p.industry_segment !== state.industry) return false;
      if (state.location !== "all" && p.location.city !== state.location) return false;
      if (state.product !== "all" && productTypesOf(p).indexOf(state.product) === -1) return false;
      if (q) {
        var hay = (p.title + " " + p.client_name + " " + p.location.city).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  /* ---------- Render grid ---------- */
  function cardHTML(p) {
    var prods = p.products_used.map(byId).filter(Boolean);
    return '<a class="pjcard" href="project-detail.html?id=' + p.slug + '">' +
      '<div class="pjcard__img"><span class="pjcard__cat">' + (window.INDUSTRY_LABEL[p.industry_segment] || p.industry_segment) + "</span>" +
      "<span>" + p.metrics.screen_size_m + "</span></div>" +
      '<div class="pjcard__body">' +
        "<h3>" + p.title + "</h3>" +
        '<p class="pjcard__loc">📍 ' + p.location.city + ", " + p.location.province + "</p>" +
        '<div class="pjcard__prod">' + prods.map(function (pr) { return '<span class="chip-prod">' + pr.product_name + "</span>"; }).join("") + "</div>" +
        '<span class="pjcard__cta">Lihat Detail Case →</span>' +
      "</div></a>";
  }

  function renderGrid() {
    var list = filtered.slice(0, state.shown);
    var empty = filtered.length === 0;
    $("#resultCount").textContent = empty ? "" : "Menampilkan " + list.length + " dari " + filtered.length + " proyek";
    $("#emptyState").hidden = !empty;
    $("#pjGrid").hidden = empty;
    $("#moreWrap").hidden = empty || state.shown >= filtered.length;
    $("#pjGrid").innerHTML = list.map(cardHTML).join("");
  }

  /* ---------- Map view (Leaflet) ---------- */
  var mapIndustryFilter = "all";
  function initMap() {
    if (map) return;
    map = L.map("projectMap").setView([-2.5, 118], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors", maxZoom: 18
    }).addTo(map);
  }

  function paintMap() {
    initMap();
    markers.forEach(function (m) { map.removeLayer(m); });
    markers = [];
    var list = window.PROJECT_CATALOG.filter(function (p) { return mapIndustryFilter === "all" || p.industry_segment === mapIndustryFilter; });
    list.forEach(function (p) {
      var prod = byId(p.products_used[0]);
      var mk = L.marker([p.location.coordinates.lat, p.location.coordinates.lng]).addTo(map);
      mk.bindPopup(
        '<div class="mappop"><b>' + p.title + "</b>" +
        p.client_name + "<br>" + (prod ? prod.product_name : "") + "<br>" +
        '<a href="project-detail.html?id=' + p.slug + '">Lihat Detail →</a></div>'
      );
      markers.push(mk);
    });
    setTimeout(function () { map.invalidateSize(); }, 50);
  }

  $("#mapIndustryQuick").innerHTML = '<button type="button" data-i="all" aria-selected="true">Semua Industri</button>' +
    Array.from(new Set(window.PROJECT_CATALOG.map(function (p) { return p.industry_segment; }))).map(function (i) {
      return '<button type="button" data-i="' + i + '" aria-selected="false">' + (window.INDUSTRY_LABEL[i] || i) + "</button>";
    }).join("");
  $("#mapIndustryQuick").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    $$("#mapIndustryQuick button").forEach(function (x) { x.setAttribute("aria-selected", "false"); });
    b.setAttribute("aria-selected", "true");
    mapIndustryFilter = b.dataset.i;
    paintMap();
  });

  /* ---------- View toggle ---------- */
  function setView(v) {
    state.view = v;
    $("#viewGrid").setAttribute("aria-pressed", String(v === "grid"));
    $("#viewMap").setAttribute("aria-pressed", String(v === "map"));
    $("#pjGrid").hidden = v !== "grid" || filtered.length === 0;
    $("#resultCount").hidden = v !== "grid";
    $("#moreWrap").hidden = v !== "grid" || filtered.length === 0 || state.shown >= filtered.length;
    $("#mapWrap").hidden = v !== "map";
    if (v === "map") paintMap();
  }
  $("#viewGrid").addEventListener("click", function () { setView("grid"); });
  $("#viewMap").addEventListener("click", function () { setView("map"); });

  /* ---------- Controls ---------- */
  var t;
  $("#searchInput").addEventListener("input", function (e) {
    clearTimeout(t);
    var v = e.target.value;
    t = setTimeout(function () { state.q = v; state.shown = PAGE; apply(); }, 300);
  });
  $("#fIndustry").addEventListener("change", function (e) { state.industry = e.target.value; state.shown = PAGE; apply(); });
  $("#fProduct").addEventListener("change", function (e) { state.product = e.target.value; state.shown = PAGE; apply(); });
  $("#fLocation").addEventListener("change", function (e) { state.location = e.target.value; state.shown = PAGE; apply(); });
  $("#loadMore").addEventListener("click", function () { state.shown += PAGE; renderGrid(); });
  $("#resetFilter").addEventListener("click", function () {
    state = { q: "", industry: "all", product: "all", location: "all", view: state.view, shown: PAGE };
    $("#searchInput").value = ""; $("#fIndustry").value = "all"; $("#fProduct").value = "all"; $("#fLocation").value = "all";
    apply();
  });

  function apply() { compute(); renderGrid(); }
  apply();
})();
