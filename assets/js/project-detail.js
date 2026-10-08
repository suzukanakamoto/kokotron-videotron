/* =========================================================
   project-detail.js — Project Detail Page (Case Study)
   Template tunggal untuk seluruh proyek di PROJECT_CATALOG
   Routing: project-detail.html?id=<slug>
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var WA = "6281234567890";
  var SITE = "https://example.com";
  var nf = function (n) { return Number(n).toLocaleString("id-ID"); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] || c; }); };

  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () { burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))); });
  window.addEventListener("scroll", function () { $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });

  var slug = new URLSearchParams(location.search).get("id") || "";
  var P = window.PROJECT_CATALOG.filter(function (p) { return p.slug === slug || p.project_id === slug; })[0];

  if (!P) {
    $("#pjRoot").innerHTML = '<div class="wrap" style="padding:100px 0;text-align:center">' +
      "<h1>Proyek tidak ditemukan</h1><p>Silakan kembali ke halaman Projects.</p>" +
      '<p><a class="btn btn--accent" href="projects.html">Kembali ke Projects</a></p></div>';
    return;
  }

  function byId(id) { return window.PRODUCT_CATALOG.filter(function (p) { return p.product_id === id; })[0]; }
  var prods = P.products_used.map(byId).filter(Boolean);

  /* ---------- WhatsApp payload (PRD Section 5.5) ---------- */
  function generateProjectQuoteWALink(project, productData) {
    var text = "Halo Admin Sales, saya melihat portofolio proyek berikut di website:\n\n" +
      "*REFERENSI PROYEK:*\n" +
      "• Nama Proyek: " + project.title + "\n" +
      "• Lokasi: " + project.location.city + "\n" +
      "• Industri: " + project.industry_segment.toUpperCase() + "\n" +
      "• Produk Digunakan: " + productData.product_name + " (" + productData.product_id + ")\n" +
      "• Ukuran Referensi: " + project.metrics.screen_size_m + "\n\n" +
      "*KEBUTUHAN SAYA:*\n" +
      "Saya memiliki rencana proyek serupa. Mohon info estimasi biaya dan konsultasi teknis untuk lokasi saya.";
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
  }
  var waMain = generateProjectQuoteWALink(P, prods[0] || { product_name: "-", product_id: "-" });
  $("#waFloat").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent("Halo, saya ingin bertanya mengenai proyek " + P.title + ".");

  /* ---------- Cabinet count estimate (BOM item 1) ---------- */
  function nums(str) { var m = String(str).match(/[\d.]+/g); return m ? m.map(Number) : []; }
  function cabinetEstimate(prod) {
    var d = nums(prod.specs.cabinet_size_mm);
    if (d.length < 2) return null;
    var areaM2 = P.metrics.total_area_sqm;
    var cabAreaM2 = (d[0] / 1000) * (d[1] / 1000);
    return Math.round(areaM2 / cabAreaM2);
  }

  /* ---------- BOM breakdown grouped by type ---------- */
  function bomHTML() {
    var groups = { controller: [], structure: [], software: [], support: [] };
    P.system_components.forEach(function (c) { (groups[c.type] || groups.support).push(c.name); });
    var rows = [];
    rows.push(["Tipe Layar LED & Jumlah Cabinet", prods.map(function (pr) {
      var n = cabinetEstimate(pr);
      return pr.product_name + (n ? " — ± " + nf(n) + " cabinet" : "");
    }).join(" · ")]);
    if (groups.controller.length) rows.push([window.BOM_TYPE_LABEL.controller, groups.controller.join(", ")]);
    rows.push(["Jenis Sistem Konstruksi", P.structure_type]);
    if (groups.support.length) rows.push([window.BOM_TYPE_LABEL.support, groups.support.join(", ")]);
    if (groups.software.length) rows.push([window.BOM_TYPE_LABEL.software, groups.software.join(", ")]);
    return '<div class="bomlist">' + rows.map(function (r) {
      return '<div class="bomrow"><b>' + r[0] + "</b><span>" + r[1] + "</span></div>";
    }).join("") + "</div>";
  }

  /* ---------- Related projects for reverse-linking on PDP ---------- */
  window.getRelatedProjectsForProduct = function (productId) {
    return window.PROJECT_CATALOG.filter(function (p) { return p.products_used.indexOf(productId) > -1; });
  };

  /* ---------- Render page ---------- */
  document.title = "Studi Kasus: " + P.title + " | LumeniX LED Display";
  $("#metaDesc").setAttribute("content", "Studi kasus instalasi " + P.title + " di " + P.location.city + " untuk klien " + P.client_name + ". Ukuran layar " + P.metrics.screen_size_m + ".");

  var industryLabel = window.INDUSTRY_LABEL[P.industry_segment] || P.industry_segment;

  $("#pjRoot").innerHTML =
  '<section class="pjhero"><div class="wrap">' +
    '<nav class="crumb"><a href="index.html">Home</a> › <a href="projects.html">Projects</a> › ' +
      '<a href="projects.html?industry=' + P.industry_segment + '">' + industryLabel + "</a> › <span>" + esc(P.title) + "</span></nav>" +
    "<h1>" + esc(P.title) + "</h1>" +
    '<p class="pjhero__meta">' +
      "<span>Client: <b>" + esc(P.client_name) + "</b></span>" +
      "<span>Lokasi: <b>" + P.location.city + ", " + P.location.province + "</b></span>" +
      "<span>Selesai: <b>" + P.completion_date + "</b></span>" +
    "</p>" +
  "</div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    '<div class="mediaview" id="mediaView"><span>Foto Utama — ' + esc(P.title) + "</span></div>" +
    '<div class="mediatabs">' +
      '<button type="button" aria-pressed="true" data-m="photo">Foto</button>' +
      '<button type="button" aria-pressed="false" data-m="video">Video</button>' +
      '<button type="button" aria-pressed="false" data-m="360">360° View</button>' +
    "</div>" +
  "</div></section>" +

  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Ringkasan Proyek</h2>" +
    '<div class="metricrow">' +
      "<div><span>Ukuran Layar</span><b>" + P.metrics.screen_size_m + "</b></div>" +
      "<div><span>Luas Total</span><b>" + P.metrics.total_area_sqm + " m²</b></div>" +
      "<div><span>Resolusi Total</span><b>" + P.metrics.total_resolution + "</b></div>" +
      "<div><span>Waktu Pengerjaan</span><b>" + P.metrics.installation_time_days + " Hari Kerja</b></div>" +
    "</div></div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Produk & Komponen Utama yang Digunakan</h2>" +
    '<p class="pdpsec__lead">Setiap produk terhubung langsung ke halaman spesifikasi lengkap.</p>' +
    prods.map(function (pr) {
      return '<div class="hlprod"><div class="hlprod__img">P' + pr.specs.pixel_pitch_mm + "</div>" +
        '<div class="hlprod__body"><h4>' + pr.product_name + "</h4><p>" + pr.tagline + "</p>" +
        '<div class="hlprod__tags"><span>' + pr.specs.environment + "</span><span>" + nf(pr.specs.brightness_nits) + " Nits</span><span>" + pr.specs.ip_rating + "</span></div>" +
        '<a class="mini" href="product-detail.html?id=' + pr.slug + '">Lihat Detail Spesifikasi Produk →</a></div></div>';
    }).join("") +
  "</div></section>" +

  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Full Bill of Materials (BOM) Breakdown</h2>" +
    '<p class="pdpsec__lead">Daftar rinci seluruh ekosistem hardware yang dipasang pada proyek ini.</p>' +
    bomHTML() +
  "</div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Challenges &amp; Engineering Solutions</h2>" +
    '<div class="cs-grid">' +
      '<div class="cs-box challenge"><h4>⚠ Tantangan Lapangan</h4><p>' + P.challenge + "</p></div>" +
      '<div class="cs-box solution"><h4>✓ Solusi Rekayasa Teknis</h4><p>' + P.solution + "</p></div>" +
    "</div></div></section>" +

  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Before vs. After</h2>" +
    '<p class="pdpsec__lead">Geser slider untuk membandingkan kondisi sebelum dan sesudah pemasangan.</p>' +
    '<div class="bawrap" id="baWrap">' +
      '<div class="balayer ba-before"><span>Sebelum Pemasangan</span></div>' +
      '<div class="balayer ba-after" id="baAfter"><span>Setelah Videotron Menyala</span></div>' +
      '<span class="balabel l">BEFORE</span><span class="balabel r">AFTER</span>' +
      '<div class="ba-handle" id="baHandle"></div>' +
    "</div></div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Client Testimonial</h2>" +
    '<div class="testibox"><p class="q">“' + P.testimonial.quote + '”</p><p class="a">' + P.testimonial.author +
      '<span>' + P.testimonial.position + "</span></p></div>" +
  "</div></section>" +

  '<section class="pdpsec pdpsec--alt" id="action"><div class="wrap">' +
    "<h2>Tertarik dengan Proyek Serupa?</h2>" +
    '<p class="pdpsec__lead">Tim sales kami siap membahas kebutuhan spesifik lokasi Anda.</p>' +
    '<div class="actionrow">' +
      '<a class="btn btn--accent" href="' + waMain + '" target="_blank" rel="noopener">Minta Penawaran Proyek Serupa via WA</a>' +
      '<button class="btn btn--line" type="button" id="gateBtn">Download Case Study PDF</button>' +
    "</div></div></section>";

  /* ---------- Media tabs ---------- */
  $$(".mediatabs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".mediatabs button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      var label = b.dataset.m === "photo" ? "Foto Utama" : b.dataset.m === "video" ? "Video Dokumentasi" : "360° Virtual Tour";
      $("#mediaView").querySelector("span").textContent = label + (P.media.video_embed_url || P.media.virtual_tour_360 ? "" : " (segera hadir)") + " — " + P.title;
    });
  });

  /* ---------- Before/After slider (mouse + touch) ---------- */
  var wrapEl = $("#baWrap"), handle = $("#baHandle"), after = $("#baAfter");
  function setPos(pct) {
    pct = Math.max(0, Math.min(100, pct));
    after.style.clipPath = "inset(0 " + (100 - pct) + "% 0 0)";
    handle.style.left = pct + "%";
  }
  function fromEvent(clientX) {
    var r = wrapEl.getBoundingClientRect();
    setPos(((clientX - r.left) / r.width) * 100);
  }
  var dragging = false;
  handle.addEventListener("mousedown", function () { dragging = true; });
  window.addEventListener("mouseup", function () { dragging = false; });
  window.addEventListener("mousemove", function (e) { if (dragging) fromEvent(e.clientX); });
  wrapEl.addEventListener("click", function (e) { fromEvent(e.clientX); });
  handle.addEventListener("touchstart", function () { dragging = true; }, { passive: true });
  window.addEventListener("touchend", function () { dragging = false; });
  wrapEl.addEventListener("touchmove", function (e) { fromEvent(e.touches[0].clientX); }, { passive: true });
  setPos(50);

  /* ---------- Gated PDF download (PRD Section 5.6) ---------- */
  $("#gateBtn").addEventListener("click", function () {
    var box = document.createElement("div");
    box.className = "gate";
    box.innerHTML = '<div class="gate__box"><button class="gate__close" type="button" aria-label="Tutup">×</button>' +
      "<h3>Download Case Study PDF</h3>" +
      '<p class="qnote">Lengkapi data berikut untuk mengaktifkan tautan unduhan berkas laporan kasus (skema teknis, gambar struktur CAD, dan analisis daya).</p>' +
      '<form id="gateForm">' +
        '<label for="gName">Nama</label><input id="gName" required>' +
        '<label for="gEmail">Email Bisnis</label><input id="gEmail" type="email" required>' +
        '<label for="gPhone">No. WhatsApp</label><input id="gPhone" required>' +
        '<button class="btn btn--accent" type="submit" style="width:100%;margin-top:18px">Unduh Case Study PDF</button>' +
      "</form></div>";
    document.body.appendChild(box);
    document.body.classList.add("no-scroll");
    box.querySelector(".gate__close").addEventListener("click", function () { box.remove(); document.body.classList.remove("no-scroll"); });
    box.addEventListener("click", function (e) { if (e.target === box) { box.remove(); document.body.classList.remove("no-scroll"); } });
    box.querySelector("#gateForm").addEventListener("submit", function (e) {
      e.preventDefault();
      (window.dataLayer = window.dataLayer || []).push({ event: "case_study_download", project: P.project_id });
      alert("Terima kasih! Tautan unduhan Case Study PDF telah dikirim ke email Anda. (Berkas PDF aktual akan tersedia setelah aset CAD/teknis diunggah ke CMS.)");
      box.remove();
      document.body.classList.remove("no-scroll");
    });
  });

  /* ---------- Schema.org CreativeWork (PRD Section 7) ---------- */
  var ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "CreativeWork",
    name: P.title, headline: "Studi Kasus Pemasangan Videotron di " + P.location.city,
    image: SITE + P.media.hero_image,
    author: { "@type": "Organization", name: "LumeniX LED Display" },
    locationCreated: { "@type": "Place", name: P.location.city, address: { "@type": "PostalAddress", addressLocality: P.location.city, addressRegion: P.location.province, addressCountry: "ID" } },
    about: prods.map(function (pr) { return { "@type": "Product", name: pr.product_name, sku: pr.product_id }; })
  });
  document.head.appendChild(ld);
})();
