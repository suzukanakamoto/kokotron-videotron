/* =========================================================
   products.js — Catalog Engine (filter, sort, view, compare)
   Semua state disimpan di URL search params (PRD Section 8.1)

   FIX LOG:
   - Semua addEventListener pada elemen yang sifatnya opsional
     dibungkus helper on(el, evt, fn) yang mengecek null lebih
     dulu. Sebelumnya, satu elemen (mis. modal compare) yang
     hilang dari HTML membuat addEventListener dipanggil pada
     null dan melempar error, yang MENGHENTIKAN seluruh sisa
     script (termasuk apply() yang merender grid produk) karena
     JS berhenti total begitu ada exception tak tertangani di
     kode level atas.
   - apply()/paintDock() (render katalog) sekarang dijalankan
     SEBELUM listener modal compare dipasang, agar katalog tetap
     tampil walau ada masalah pada bagian modal di kemudian hari.
   - Pagination default dihapus: begitu masuk ke tab Products,
     seluruh produk yang cocok filter langsung ditampilkan tanpa
     perlu klik "Muat Produk Lainnya".
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var on = function (el, evt, fn) { if (el) el.addEventListener(evt, fn); };
  var WA = "628110000000";

  var state = { seg: "all", q: "", sort: "popular", pitch: [], env: [], inst: [], bright: [], badge: [], view: "grid", shown: Infinity };
  var compare = [];
  var filtered = [];

  /* ---------- Header mobile ---------- */
  var nav = $("#nav"), burger = $("#burger");
  on(burger, "click", function () {
    var open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  window.addEventListener("scroll", function () {
    var hdr = $("#hdr");
    if (hdr) hdr.classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });

  /* ---------- URL state ---------- */
  function readURL() {
    var p = new URLSearchParams(location.search);
    state.seg = p.get("cat") || p.get("seg") || "all";
    state.q = p.get("q") || "";
    state.sort = p.get("sort") || "popular";
    state.view = p.get("view") === "table" ? "table" : "grid";
    ["pitch", "env", "inst", "bright", "badge"].forEach(function (k) {
      state[k] = p.get(k) ? p.get(k).split(",") : [];
    });
  }
  function writeURL() {
    var p = new URLSearchParams();
    if (state.seg !== "all") p.set("cat", state.seg);
    if (state.q) p.set("q", state.q);
    if (state.sort !== "popular") p.set("sort", state.sort);
    if (state.view !== "grid") p.set("view", state.view);
    ["pitch", "env", "inst", "bright", "badge"].forEach(function (k) {
      if (state[k].length) p.set(k, state[k].join(","));
    });
    var qs = p.toString();
    history.replaceState(null, "", qs ? "?" + qs : location.pathname);
  }

  /* ---------- Segment chips ---------- */
  var chipBox = $("#segChips");
  if (chipBox) {
    window.SEGMENTS.forEach(function (s) {
      var b = document.createElement("button");
      b.className = "chip"; b.type = "button"; b.setAttribute("role", "tab");
      b.dataset.seg = s.key;
      b.innerHTML = '<i aria-hidden="true">' + s.icon + "</i>" + s.label;
      b.addEventListener("click", function () { state.seg = s.key; apply(); });
      chipBox.appendChild(b);
    });
  }

  function paintSegment() {
    $$(".chip").forEach(function (c) { c.setAttribute("aria-selected", String(c.dataset.seg === state.seg)); });
    var info = window.SEGMENT_INFO[state.seg] || window.SEGMENT_INFO.all;
    if ($("#pageTitle")) $("#pageTitle").textContent = info.title;
    if ($("#pageDesc")) $("#pageDesc").textContent = info.desc;
    if ($("#crumbSeg")) $("#crumbSeg").textContent = state.seg === "all" ? "Products" : info.title;
    // Dynamic meta title (PRD 8.2)
    document.title = (state.seg === "all" ? "Katalog Videotron & LED Display" : "Jual " + info.title) +
      " | Spesifikasi & Harga — LumeniX";
  }

  /* ---------- Filter helpers ---------- */
  function pitchBucket(mm) {
    if (mm < 1.5) return "ultra";
    if (mm <= 2.0) return "fine";
    if (mm <= 3.0) return "standard";
    if (mm <= 5.0) return "medium";
    return "long";
  }
  function brightBucket(n) { return n < 1000 ? "std" : n <= 3500 ? "high" : "ultra"; }

  function hasBadge(p, key) {
    var txt = p.badges.join(" ") + " " + p.specs.maintenance_access + " " + p.specs.ip_rating;
    if (key === "TKDN")    return /TKDN/i.test(txt);
    if (key === "Front")   return /Front/i.test(txt);
    if (key === "Refresh") return p.specs.refresh_rate_hz >= 3840;
    if (key === "Energy")  return /Energy|Saving|Common Cathode/i.test(txt);
    if (key === "IP68")    return /IP68/i.test(txt);
    return false;
  }

  function compute() {
    var q = state.q.trim().toLowerCase();
    filtered = window.PRODUCT_CATALOG.filter(function (p) {
      if (p.status !== "active") return false;
      if (state.seg !== "all" && p.category_segment.indexOf(state.seg) === -1) return false;
      if (q) {
        var hay = (p.product_name + " " + p.tagline + " " + p.badges.join(" ") + " P" + p.specs.pixel_pitch_mm).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      if (state.pitch.length && state.pitch.indexOf(pitchBucket(p.specs.pixel_pitch_mm)) === -1) return false;
      if (state.env.length && state.env.indexOf(p.specs.environment) === -1) return false;
      if (state.inst.length && state.inst.indexOf(p.install_type) === -1) return false;
      if (state.bright.length && state.bright.indexOf(brightBucket(p.specs.brightness_nits)) === -1) return false;
      if (state.badge.length && !state.badge.every(function (b) { return hasBadge(p, b); })) return false;
      return true;
    });

    filtered.sort(function (a, b) {
      if (state.sort === "pitch-asc")   return a.specs.pixel_pitch_mm - b.specs.pixel_pitch_mm;
      if (state.sort === "bright-desc") return b.specs.brightness_nits - a.specs.brightness_nits;
      if (state.sort === "newest")      return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
      return b.popularity - a.popularity;
    });
  }

  /* ---------- WhatsApp payload (PRD 13.2) ---------- */
  function waLink(p) {
    var t = "Halo Admin Sales, saya ingin mengajukan Permintaan Penawaran Harga (Quotation):\n\n" +
      "*DETAIL PRODUK:*\n" +
      "• Produk: " + p.product_name + "\n" +
      "• Segmen: " + (window.SEGMENT_INFO[p.category_segment[0]] || {}).title + "\n" +
      "• Pixel Pitch: " + p.specs.pixel_pitch_mm + " mm\n" +
      "• Brightness: " + p.specs.brightness_nits.toLocaleString("id-ID") + " Nits\n" +
      "• IP Rating: " + p.specs.ip_rating + "\n\n" +
      "Mohon info estimasi harga dan ketersediaan stok. Terima kasih!";
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
  }

  /* ---------- Render ---------- */
  function cardHTML(p) {
    var checked = compare.indexOf(p.product_id) > -1 ? " checked" : "";
    return '<article class="card">' +
      '<div class="card__img' + (p.image ? " has-photo" : "") + '"' +
        (p.image ? ' style="background-image:url(\'' + p.image + '\')"' : "") + ">" +
        '<span class="card__env">' + p.specs.environment + "</span>" +
        (p.is_featured ? '<span class="card__flag">Featured</span>' : "") +
        '<span class="card__pitch">P' + p.specs.pixel_pitch_mm + "</span>" +
      "</div>" +
      '<div class="card__body">' +
        "<h3>" + p.product_name + "</h3>" +
        '<p class="card__sub">' + p.tagline + "</p>" +
        '<ul class="card__badges">' + p.badges.slice(0, 3).map(function (b) { return "<li>" + b + "</li>"; }).join("") + "</ul>" +
        '<div class="matrix">' +
          "<div><b>" + p.specs.brightness_nits.toLocaleString("id-ID") + "</b><span>Nits</span></div>" +
          "<div><b>" + p.specs.refresh_rate_hz.toLocaleString("id-ID") + "</b><span>Hz Refresh</span></div>" +
          "<div><b>" + p.specs.maintenance_access + "</b><span>Maintenance</span></div>" +
        "</div>" +
        '<div class="card__act">' +
          '<label class="cmpbox"><input type="checkbox" data-cmp="' + p.product_id + '"' + checked + '> Bandingkan produk ini</label>' +
          '<div class="card__act-btns">' +
            '<a class="mini" href="product-detail.html?id=' + p.slug + '" data-ev="product_view">View Detail</a>' +
            '<a class="mini mini--q" href="' + waLink(p) + '" target="_blank" rel="noopener" data-ev="quote_click">Minta Penawaran</a>' +
          "</div>" +
        "</div>" +
      "</div></article>";
  }

  function rowHTML(p) {
    return "<tr><td><strong>" + p.product_name + "</strong></td>" +
      "<td>" + (window.SEGMENT_INFO[p.category_segment[0]] || {}).title + "</td>" +
      "<td>P" + p.specs.pixel_pitch_mm + "</td>" +
      "<td>" + p.specs.brightness_nits.toLocaleString("id-ID") + " Nits</td>" +
      "<td>" + p.specs.refresh_rate_hz.toLocaleString("id-ID") + " Hz</td>" +
      "<td>" + p.specs.cabinet_size_mm + "</td>" +
      "<td>" + (p.specs.cabinet_weight_kg || "—") + " kg</td>" +
      "<td>" + p.specs.ip_rating + "</td>" +
      '<td><a class="mini" href="' + waLink(p) + '" target="_blank" rel="noopener" data-ev="quote_click">Get Quote</a></td></tr>';
  }

  function render() {
    var list = filtered.slice(0, state.shown);
    var empty = filtered.length === 0;

    if ($("#resultCount")) {
      $("#resultCount").textContent = empty ? "Tidak ada produk ditemukan"
        : "Menampilkan seluruh " + list.length + " produk";
    }
    if ($("#emptyState")) $("#emptyState").hidden = !empty;
    if ($("#pgrid")) $("#pgrid").hidden = empty || state.view !== "grid";
    if ($("#ptableWrap")) $("#ptableWrap").hidden = empty || state.view !== "table";
    if ($("#moreWrap")) $("#moreWrap").hidden = true; // seluruh produk selalu tampil, tombol ini tidak lagi diperlukan

    if ($("#pgrid")) $("#pgrid").innerHTML = list.map(cardHTML).join("");
    if ($("#ptableBody")) $("#ptableBody").innerHTML = list.map(rowHTML).join("");

    if ($("#viewGrid")) $("#viewGrid").setAttribute("aria-pressed", String(state.view === "grid"));
    if ($("#viewTable")) $("#viewTable").setAttribute("aria-pressed", String(state.view === "table"));
  }

  function apply() { paintSegment(); compute(); render(); writeURL(); }

  /* ---------- Controls ---------- */
  var searchInput = $("#searchInput"), t;
  on(searchInput, "input", function () {           // debounce 300ms
    clearTimeout(t);
    t = setTimeout(function () { state.q = searchInput.value; apply(); }, 300);
  });

  on($("#sortSelect"), "change", function (e) { state.sort = e.target.value; apply(); });
  on($("#viewGrid"), "click", function () { state.view = "grid"; apply(); });
  on($("#viewTable"), "click", function () { state.view = "table"; apply(); });

  $$(".fgroup input").forEach(function (inp) {
    inp.addEventListener("change", function () {
      var key = inp.name === "pitch" ? "pitch" : inp.name;
      state[key] = $$('input[name="' + inp.name + '"]:checked').map(function (i) { return i.value; });
      apply();
    });
  });

  function resetAll() {
    state.q = ""; if (searchInput) searchInput.value = "";
    ["pitch", "env", "inst", "bright", "badge"].forEach(function (k) { state[k] = []; });
    $$(".fgroup input").forEach(function (i) { i.checked = false; });
    state.seg = "all"; apply();
  }
  on($("#resetFilter"), "click", resetAll);
  on($("#resetFilter2"), "click", resetAll);

  /* ---------- Mobile drawer ---------- */
  var fpanel = $("#fpanel"), backdrop = $("#fbackdrop");
  function drawer(open) {
    if (fpanel) fpanel.classList.toggle("is-open", open);
    if (backdrop) backdrop.hidden = !open;
    document.body.classList.toggle("no-scroll", open);
    if ($("#openFilter")) $("#openFilter").setAttribute("aria-expanded", String(open));
  }
  on($("#openFilter"), "click", function () { drawer(true); });
  on($("#closeFilter"), "click", function () { drawer(false); });
  on($("#applyFilter"), "click", function () { drawer(false); });
  on(backdrop, "click", function () { drawer(false); });

  /* ---------- Comparison dock (max 4) ---------- */
  document.addEventListener("change", function (e) {
    var cb = e.target.closest("[data-cmp]");
    if (!cb) return;
    var id = cb.dataset.cmp;
    if (cb.checked) {
      if (compare.length >= 4) { cb.checked = false; alert("Maksimal 4 produk untuk dibandingkan."); return; }
      compare.push(id);
    } else {
      compare = compare.filter(function (x) { return x !== id; });
    }
    paintDock();
  });

  function byId(id) { return window.PRODUCT_CATALOG.filter(function (p) { return p.product_id === id; })[0]; }

  function paintDock() {
    var dock = $("#dock");
    if (dock) dock.hidden = compare.length === 0;
    document.body.classList.toggle("has-dock", compare.length > 0);
    if ($("#dockCompare")) $("#dockCompare").disabled = compare.length < 2;
    if ($("#dockSlots")) {
      $("#dockSlots").innerHTML = compare.map(function (id) {
        var p = byId(id);
        return p ? '<span class="slot">' + p.product_name + ' <button type="button" data-rm="' + id + '" aria-label="Hapus">×</button></span>' : "";
      }).join("") + (compare.length < 2 ? '<span class="slot slot--empty">Pilih minimal 2 produk</span>' : "");
    }
  }

  on($("#dockSlots"), "click", function (e) {
    var b = e.target.closest("[data-rm]");
    if (!b) return;
    compare = compare.filter(function (x) { return x !== b.dataset.rm; });
    var cb = document.querySelector('[data-cmp="' + b.dataset.rm + '"]');
    if (cb) cb.checked = false;
    paintDock();
  });
  on($("#dockClear"), "click", function () {
    compare = []; $$("[data-cmp]").forEach(function (c) { c.checked = false; }); paintDock();
  });

  /* ---------- Render inti terlebih dahulu ----------
     Katalog/grid harus tampil walau ada masalah di bagian
     modal compare di bawah ini (lihat FIX LOG di atas). */
  readURL();
  if (searchInput) searchInput.value = state.q;
  if ($("#sortSelect")) $("#sortSelect").value = state.sort;
  ["pitch", "env", "inst", "bright", "badge"].forEach(function (k) {
    $$('input[name="' + k + '"]').forEach(function (i) { i.checked = state[k].indexOf(i.value) > -1; });
  });
  apply();
  paintDock();

  /* ---------- Comparison modal ---------- */
  var ROWS = [
    ["Environment", function (p) { return p.specs.environment; }],
    ["Pixel Pitch", function (p) { return p.specs.pixel_pitch_mm + " mm"; }],
    ["Brightness", function (p) { return p.specs.brightness_nits.toLocaleString("id-ID") + " Nits"; }],
    ["Refresh Rate", function (p) { return p.specs.refresh_rate_hz.toLocaleString("id-ID") + " Hz"; }],
    ["IP Protection", function (p) { return p.specs.ip_rating; }],
    ["Maintenance", function (p) { return p.specs.maintenance_access; }],
    ["Cabinet Size (mm)", function (p) { return p.specs.cabinet_size_mm; }],
    ["Cabinet Resolution", function (p) { return p.specs.cabinet_px + " px"; }],
    ["Cabinet Weight", function (p) { return (p.specs.cabinet_weight_kg || "—") + " kg"; }],
    ["Material", function (p) { return p.specs.cabinet_material; }],
    ["Max Power", function (p) { return p.specs.max_power_watts_sqm + " W/m²"; }],
    ["Avg Power", function (p) { return p.specs.avg_power_watts_sqm + " W/m²"; }],
    ["Viewing Angle", function (p) { return p.specs.viewing_angle; }],
    ["Lifespan", function (p) { return p.specs.lifespan_hours.toLocaleString("id-ID") + " jam"; }]
  ];

  function openModal() {
    var cmpModal = $("#cmpModal"), cmpBody = $("#cmpBody");
    if (!cmpModal || !cmpBody || compare.length < 2) return;
    var items = compare.map(byId).filter(Boolean);
    if (items.length < 2) return;
    var head = "<tr><th>Spec Parameter</th>" + items.map(function (p) { return "<th>" + p.product_name + "</th>"; }).join("") + "</tr>";
    var body = ROWS.map(function (r) {
      var vals = items.map(r[1]);
      var diff = vals.some(function (v) { return v !== vals[0]; });   // highlight baris berbeda
      return '<tr class="' + (diff ? "diff" : "") + '"><th scope="row">' + r[0] + "</th>" +
        vals.map(function (v) { return "<td>" + v + "</td>"; }).join("") + "</tr>";
    }).join("");
    var act = '<tr><th scope="row">Action</th>' + items.map(function (p) {
      return '<td><a class="mini" href="' + waLink(p) + '" target="_blank" rel="noopener">Get Quote</a></td>';
    }).join("") + "</tr>";

    cmpBody.innerHTML = '<table class="cmptable"><thead>' + head + "</thead><tbody>" + body + act + "</tbody></table>";
    cmpModal.hidden = false;
    document.body.classList.add("no-scroll");
  }
  on($("#dockCompare"), "click", openModal);

  function closeModal() {
    var cmpModal = $("#cmpModal");
    if (!cmpModal) return;
    cmpModal.hidden = true;
    document.body.classList.remove("no-scroll");
  }
  on($("#cmpClose"), "click", closeModal);
  on($("#cmpModal"), "click", function (e) { if (e.target === $("#cmpModal")) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var cmpModal = $("#cmpModal");
    if (cmpModal && !cmpModal.hidden) closeModal();
    else if (fpanel && fpanel.classList.contains("is-open")) drawer(false);
  });

  /* ---------- Tracking ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-ev]");
    if (el) (window.dataLayer = window.dataLayer || []).push({ event: el.dataset.ev });
  });
})();
