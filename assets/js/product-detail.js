/* =========================================================
   product-detail.js — Product Detail Page (PDP) Engine
   Seluruh konten di-render dari PRODUCT_CATALOG (products-data.js)
   Routing: product-detail.html?id=<slug>  (setara /products/[slug])
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var WA = "628110000000";
  var SITE = "https://example.com";
  var nf = function (n) { return Number(n).toLocaleString("id-ID"); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  /* ---------- Header mobile ---------- */
  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () {
    burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open")));
  });
  window.addEventListener("scroll", function () {
    $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20);
  }, { passive: true });

  /* ---------- Ambil produk dari dataset ---------- */
  var params = new URLSearchParams(location.search);
  var key = params.get("id") || params.get("slug") || "";
  var P = window.PRODUCT_CATALOG.filter(function (p) {
    return p.slug === key || p.product_id === key;
  })[0];

  if (!P) { $("#notFound").hidden = false; return; }

  var S = P.specs;
  var segKey = P.category_segment[0];
  var segInfo = window.SEGMENT_INFO[segKey] || {};
  var segLabel = (window.SEGMENTS.filter(function (s) { return s.key === segKey; })[0] || {}).label || "Products";

  var INSTALL = { fixed: "Instalasi Tetap", rental: "Sewa / Bongkar Pasang", glass: "Glass Mounting", creative: "Creative / Custom", perimeter: "Perimeter Lapangan" };

  /* ---------- Parser dimensi cabinet (PRD 6.1) ---------- */
  function nums(str) {
    var m = String(str).match(/[\d.]+/g);
    return m ? m.map(Number) : [];
  }
  var cabDim = nums(S.cabinet_size_mm);          // [W, H, D] mm
  var cabPx  = nums(S.cabinet_px);               // [Wpx, Hpx]
  var canSim = cabDim.length >= 2 && cabPx.length >= 2;
  var CW = cabDim[0], CH = cabDim[1], PXW = cabPx[0], PXH = cabPx[1];

  /* ---------- WhatsApp payload (PRD Section 7) ---------- */
  function waLink(form) {
    var t = "Halo Admin Sales, saya tertarik dengan produk berikut:\n\n" +
      "*INFORMASI PRODUK:*\n" +
      "• Nama Produk: " + P.product_name + "\n" +
      "• Model ID: " + P.product_id + "\n" +
      "• Segmen: " + P.category_segment.join(", ") + "\n" +
      "• Pixel Pitch: " + S.pixel_pitch_mm + " mm\n" +
      "• Brightness: " + S.brightness_nits + " Nits\n" +
      "• URL PDP: " + SITE + "/products/" + P.slug + "\n";

    if (form) {
      t += "\n*DETAIL PEMOHON & PROYEK:*\n" +
        "• Nama: " + form.name + "\n" +
        "• Perusahaan: " + form.company + "\n" +
        "• Lokasi Proyek: " + form.city + "\n" +
        "• Lingkungan Instalasi: " + form.env + "\n" +
        "• Estimasi Ukuran: " + form.width + "m x " + form.height + "m\n" +
        "• Timeline: " + form.timeline + "\n" +
        (form.notes ? "• Catatan: " + form.notes + "\n" : "");
    }
    if (form && form.sim) {
      t += "\n*HASIL SIMULASI CABINET:*\n" + form.sim + "\n";
    }
    t += "\nMohon kirimkan surat penawaran harga resmi (Quotation) untuk proyek ini. Terima kasih.";
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(t);
  }

  /* ---------- Modul adaptif per segmen (PRD Section 5) ---------- */
  function segmentModule() {
    var m = {
      "indoor-led": {
        t: "Quiet Operation & Low-Gray Visualizer",
        d: "Modul indoor dioptimalkan untuk kenyamanan mata pada ruang rapat dan auditorium.",
        li: ["Low Brightness High Gray — detail gelap tetap terbaca saat brightness diturunkan.",
             "Grayscale 16 bit untuk gradasi warna halus tanpa banding.",
             "Opsi Fanless Silent Design, nyaman untuk ruangan dengan tingkat kebisingan rendah.",
             "Viewing angle " + S.viewing_angle + " untuk audiens yang duduk menyebar."]
      },
      "outdoor-led": {
        t: "Sunlight Visibility & Waterproof Rating",
        d: "Simulasi keterbacaan di bawah terik matahari dan penjelasan tingkat proteksi cuaca.",
        li: ["Brightness " + nf(S.brightness_nits) + " Nits — tetap terbaca pada siang hari terik.",
             "Auto-Brightness Sensor menyesuaikan kecerahan otomatis & menghemat daya.",
             "Proteksi " + S.ip_rating + " terhadap hujan deras dan debu jalan raya.",
             "Common Cathode power saving menekan konsumsi listrik harian."]
      },
      "rental-led": {
        t: "Rental Rigging & Flightcase Estimator",
        d: "Perhitungan kebutuhan flightcase dan mekanisme perakitan cepat di lapangan.",
        li: ["Fast-Lock System — satu panel terkunci dalam hitungan detik.",
             "Curve interlock -10° s/d +10° untuk panggung melengkung.",
             "Corner protector & flight case packaging untuk mobilitas touring.",
             "Berat " + S.cabinet_weight_kg + " kg/panel, 1 flightcase = 8 panel (± " + (S.cabinet_weight_kg * 8).toFixed(1) + " kg)."],
        flight: true
      },
      "fine-pitch-led": {
        t: "Native 16:9 Full HD / 4K Screen Builder",
        d: "Cabinet berasio 16:9 memudahkan membentuk resolusi standar broadcast.",
        li: ["Teknologi COB/GOB — permukaan terlindung, aman untuk area lalu lalang.",
             "Pixel-to-pixel calibration untuk keseragaman warna antar cabinet.",
             "Resolusi per cabinet " + S.cabinet_px + " pixels.",
             "Cocok untuk command center, boardroom eksekutif dan TV studio."],
        builder: true
      },
      "transparent-led": {
        t: "Translucency & Natural Light Simulator",
        d: "Atur tingkat transparansi untuk melihat pengaruhnya terhadap cahaya alami ruangan.",
        li: ["Transparansi hingga 85% — cahaya matahari tetap masuk ke dalam gedung.",
             "Ketebalan PCB tipis, beban struktur kaca minimal (" + S.cabinet_weight_kg + " kg/panel).",
             "Brightness " + nf(S.brightness_nits) + " Nits untuk day-view di balik kaca.",
             "Instalasi tanpa menutup etalase atau curtain wall."],
        slider: true
      },
      "flexible-led": {
        t: "Curved Surface & Pillar Wrapper Tool",
        d: "Simulasi pembentukan pilar melingkar berdasarkan ukuran modul " + S.cabinet_size_mm + " mm.",
        li: ["Modul silikon lunak, dapat dibengkokkan mengikuti desain organik.",
             "Magnetic front service — perawatan tanpa membongkar struktur.",
             "Seamless wave / cylinder assembly tanpa garis sambungan kasar.",
             "Ideal untuk pillar display, wave ceiling dan curved wall."],
        pillar: true
      },
      "creative-led": {
        t: "3D Naked-Eye & Geometric Form Selector",
        d: "Pilih bentuk instalasi kustom yang ingin dibangun bersama tim engineer kami.",
        li: ["Bentuk tersedia: Sphere, Cube, Tunnel, Hexagon, Right-Angle 3D Corner.",
             "Custom frame fitting mengikuti desain arsitektur.",
             "Synchronized mapping controller untuk konten multi-permukaan.",
             "Cocok untuk museum, flagship store, theme park dan entertainment center."],
        shapes: true
      },
      "sport-led": {
        t: "Broadcast Camera & Athlete Safety Rating",
        d: "Standar keamanan atlet dan kualitas siaran langsung televisi.",
        li: ["Soft Rubber Mask & Soft Top Cushion — aman saat terjadi benturan pemain.",
             "Refresh rate " + nf(S.refresh_rate_hz) + " Hz, bebas flicker pada kamera siaran.",
             "Adjustable angle footing 75°–90° mengikuti regulasi lapangan.",
             "Dual power & signal backup loop, tayangan tetap aman saat satu jalur gagal."]
      },
      "custom-led": {
        t: "Engineering Blueprint & CAD Request",
        d: "Layanan turnkey dari perancangan struktur hingga integrasi sistem penuh.",
        li: ["CAD design & structural engineering oleh tim internal.",
             "Fabrikasi cabinet kustom mengikuti dimensi dan bentuk lokasi.",
             "Integrasi API control untuk sistem manajemen konten milik klien.",
             "Pendampingan mulai survey lokasi hingga commissioning."]
      }
    }[segKey];

    if (!m) return "";
    var extra = "";
    if (m.builder && canSim) {
      extra = '<div class="presets"><button type="button" data-build="2">Build Full HD Screen (2 × 2 Cabinet)</button>' +
              '<button type="button" data-build="4">Build 4K UHD Screen (4 × 4 Cabinet)</button></div>';
    }
    if (m.flight) {
      extra = '<div class="presets"><button type="button" data-build="4">Hitung Layar 4 × 4 Panel</button>' +
              '<button type="button" data-build="8">Hitung Layar 8 × 8 Panel</button></div>';
    }
    if (m.slider) {
      extra = '<div class="slider-row"><label for="transRange">Transparansi</label>' +
              '<input type="range" id="transRange" min="0" max="85" value="60"><b id="transVal">60%</b></div>' +
              '<div class="transbox" id="transBox"></div>';
    }
    if (m.pillar) {
      extra = '<div class="slider-row"><label for="pillarRange">Diameter pilar</label>' +
              '<input type="range" id="pillarRange" min="40" max="200" step="10" value="80"><b id="pillarVal">80 cm</b></div>' +
              '<p class="qnote" id="pillarOut"></p>';
    }
    if (m.shapes) {
      extra = '<div class="presets">' + ["Sphere", "Cube", "Tunnel", "Hexagon", "3D Corner"].map(function (s) {
        return '<button type="button" data-shape="' + s + '">' + s + "</button>";
      }).join("") + '</div><p class="qnote" id="shapeOut">Pilih bentuk untuk disertakan pada permintaan penawaran.</p>';
    }

    return '<div class="segmod"><h3>' + m.t + "</h3><p>" + m.d + "</p><ul>" +
      m.li.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>" + extra + "</div>";
  }

  /* ---------- Spec matrix 14 parameter (PRD Section 4) ---------- */
  var SPEC_ROWS = [
    ["Pixel Pitch", S.pixel_pitch_mm + " mm", "Jarak antar pusat LED"],
    ["Lingkungan (Environment)", S.environment, "Indoor / Outdoor / Semi-Outdoor"],
    ["Tingkat Kecerahan", nf(S.brightness_nits) + " Nits", "Kecerahan maksimum layar"],
    ["Refresh Rate", nf(S.refresh_rate_hz) + " Hz", "Kecepatan pembaruan gambar, bebas flicker di kamera"],
    ["Proteksi Ingress (IP)", S.ip_rating, "Rating ketahanan terhadap air & debu"],
    ["Akses Maintenance", S.maintenance_access, "Front / Rear / Both"],
    ["Material Cabinet", S.cabinet_material, "Material struktur rangka"],
    ["Dimensi Cabinet", S.cabinet_size_mm + " mm", "Panjang × Tinggi × Tebal"],
    ["Resolusi Cabinet", S.cabinet_px + " pixels", "Lebar × Tinggi pixel per cabinet"],
    ["Berat Cabinet", (S.cabinet_weight_kg ? S.cabinet_weight_kg + " kg" : "Sesuai desain"), "Berat per panel cabinet"],
    ["Konsumsi Daya Rata-rata", S.avg_power_watts_sqm + " W/m²", "Watt per meter persegi"],
    ["Konsumsi Daya Maksimum", S.max_power_watts_sqm + " W/m²", "Peak watt per m²"],
    ["Sudut Pandang (H/V)", S.viewing_angle, "Horisontal / Vertikal"],
    ["Umur Pakai (Lifespan)", nf(S.lifespan_hours) + " jam", "Standar pada 50% brightness"]
  ];

  /* ---------- Related products ---------- */
  var related = window.PRODUCT_CATALOG.filter(function (p) {
    return p.product_id !== P.product_id && p.category_segment.some(function (s) { return P.category_segment.indexOf(s) > -1; });
  }).sort(function (a, b) { return b.popularity - a.popularity; }).slice(0, 3);

  /* ---------- Reverse Linking (PRD Projects Section 5.1) ----------
     "Proyek Terkait yang Menggunakan Produk Ini" — diambil otomatis
     dari PROJECT_CATALOG (projects-data.js) jika file tersebut dimuat. */
  var usedInProjects = (window.PROJECT_CATALOG || []).filter(function (pj) {
    return pj.products_used.indexOf(P.product_id) > -1;
  });
  function projCard(pj) {
    return '<a class="card" href="project-detail.html?id=' + pj.slug + '" style="text-decoration:none;color:inherit">' +
      '<div class="card__img"><span class="card__env">' + (window.INDUSTRY_LABEL ? window.INDUSTRY_LABEL[pj.industry_segment] : pj.industry_segment) + "</span>" +
      '<span class="card__pitch" style="font-size:1.1rem">' + pj.metrics.screen_size_m + "</span></div>" +
      '<div class="card__body"><h3>' + pj.title + "</h3>" +
      '<p class="card__sub">' + pj.location.city + ", " + pj.location.province + " · " + pj.client_name + "</p>" +
      '<span class="link" style="margin-top:auto;padding-top:12px;border:0">Lihat Studi Kasus →</span></div></a>';
  }

  function relCard(p) {
    return '<a class="card" href="product-detail.html?id=' + p.slug + '" style="text-decoration:none;color:inherit">' +
      '<div class="card__img"><span class="card__env">' + p.specs.environment + "</span>" +
      '<span class="card__pitch">P' + p.specs.pixel_pitch_mm + "</span></div>" +
      '<div class="card__body"><h3>' + p.product_name + "</h3>" +
      '<p class="card__sub">' + p.tagline + "</p>" +
      '<div class="matrix"><div><b>' + nf(p.specs.brightness_nits) + "</b><span>Nits</span></div>" +
      "<div><b>" + nf(p.specs.refresh_rate_hz) + "</b><span>Hz</span></div>" +
      "<div><b>" + p.specs.maintenance_access + "</b><span>Maintenance</span></div></div>" +
      '<span class="link" style="margin-top:auto;padding-top:12px;border:0">Lihat Detail →</span></div></a>';
  }

  /* ---------- Render halaman ---------- */
  $("#pdpRoot").innerHTML =
  '<section class="phero"><div class="wrap">' +
    '<nav class="crumb" aria-label="Breadcrumb"><a href="index.html">Home</a> › <a href="products.html">Products</a> › ' +
      '<a href="products.html?cat=' + segKey + '">' + segLabel + "</a> › <span>" + esc(P.product_name) + "</span></nav>" +
    '<div class="phero__in">' +
      '<div class="viewer">' +
        '<div class="viewer__main' + (P.image ? " has-photo" : "") + '" id="viewerMain"' +
          (P.image ? ' style="background-image:url(\'' + P.image + '\')"' : "") + ">" +
          (P.image ? '<span class="viewer__pitch">P' + S.pixel_pitch_mm + "</span>" : "<b>P" + S.pixel_pitch_mm + "</b>") +
          "<i>Cabinet " + S.cabinet_size_mm + " mm</i></div>" +
        '<div class="thumbs">' +
          '<button type="button" aria-pressed="true" data-v="Cabinet">Cabinet</button>' +
          '<button type="button" aria-pressed="false" data-v="Modul">Modul</button>' +
          '<button type="button" aria-pressed="false" data-v="Instalasi">Instalasi</button>' +
          '<button type="button" aria-pressed="false" data-v="Video">Video</button>' +
        "</div></div>" +
      "<div>" +
        "<h1>" + esc(P.product_name) + "</h1>" +
        '<p class="phero__tag">' + esc(P.tagline) + "</p>" +
        '<ul class="pillrow">' + P.badges.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("") +
          '<li class="inst">' + (INSTALL[P.install_type] || P.install_type) + "</li></ul>" +
        '<div class="qspecs">' +
          "<div><b>" + S.pixel_pitch_mm + " mm</b><span>Pixel Pitch</span></div>" +
          "<div><b>" + nf(S.brightness_nits) + "</b><span>Nits Brightness</span></div>" +
          "<div><b>" + nf(S.refresh_rate_hz) + "</b><span>Hz Refresh</span></div>" +
          "<div><b>" + S.ip_rating + "</b><span>Proteksi IP</span></div>" +
        "</div>" +
        '<div class="hero__acts">' +
          '<a class="btn btn--accent" href="#quote" data-ev="quote_click">Minta Penawaran Harga</a>' +
          '<a class="btn btn--ghost" href="#quote" id="dsBtn">Download Datasheet PDF</a>' +
          '<a class="btn btn--ghost" href="products.html?cat=' + segKey + '">Bandingkan Spesifikasi</a>' +
        "</div>" +
      "</div></div></div></section>" +

  '<div class="subnav"><div class="wrap subnav__in" id="subnav">' +
    '<a href="#overview" class="is-active">Ikhtisar</a><a href="#specs">Spesifikasi</a>' +
    (canSim ? '<a href="#simulator">Simulator</a>' : "") +
    '<a href="#segment">Solusi Segmen</a><a href="#related">Produk Terkait</a><a href="#quote">Quote</a>' +
  "</div></div>" +

  '<section class="pdpsec" id="overview"><div class="wrap">' +
    "<h2>Ikhtisar Produk & Keunggulan</h2>" +
    '<p class="pdpsec__lead">' + esc(P.tagline) + " — dirancang untuk aplikasi " + segLabel.toLowerCase() + " dengan parameter teknis yang dapat dipertanggungjawabkan pada tahap perencanaan proyek.</p>" +
    '<div class="hlbanner"><div><b>Highlight Produk</b><p>' + esc(P.highlight) + "</p></div></div>" +
    '<div class="ctxcard"><h3>' + segInfo.title + "</h3><p>" + segInfo.desc + "</p></div>" +
    '<div class="fgrid">' +
      "<div><h4>Maintenance</h4><b>" + S.maintenance_access + '</b><p>Menentukan kebutuhan ruang servis di belakang layar saat instalasi.</p></div>' +
      "<div><h4>Material Cabinet</h4><b>" + S.cabinet_material + "</b><p>Memengaruhi bobot struktur, presisi sambungan, dan ketahanan jangka panjang.</p></div>" +
      "<div><h4>Efisiensi Daya</h4><b>" + S.avg_power_watts_sqm + " W/m²</b><p>Konsumsi rata-rata; puncak " + S.max_power_watts_sqm + " W/m² saat konten full white.</p></div>" +
    "</div></div></section>" +

  '<section class="pdpsec pdpsec--alt" id="specs"><div class="wrap">' +
    "<h2>Matriks Spesifikasi Teknis</h2>" +
    '<p class="pdpsec__lead">14 parameter teknis lengkap untuk kebutuhan System Integrator dan tim engineering.</p>' +
    '<div class="tablewrap"><table class="specmatrix"><thead><tr><th scope="col">Parameter Teknis</th><th scope="col">Nilai Spesifikasi</th><th scope="col">Catatan Penggunaan</th></tr></thead><tbody>' +
      SPEC_ROWS.map(function (r) {
        return '<tr><th scope="row">' + r[0] + '</th><td class="val">' + r[1] + '</td><td class="note">' + r[2] + "</td></tr>";
      }).join("") +
    "</tbody></table></div></div></section>" +

  (canSim ?
  '<section class="pdpsec" id="simulator"><div class="wrap">' +
    "<h2>Interactive Cabinet Array Simulator</h2>" +
    '<p class="pdpsec__lead">Masukkan target ukuran layar, sistem menghitung kebutuhan cabinet, resolusi, berat dan daya listrik berdasarkan datasheet produk ini.</p>' +
    '<div class="sim"><div class="simform">' +
      '<label for="simW">Target Lebar (meter)</label><input type="number" id="simW" min="0.5" step="0.1" value="4.8">' +
      '<label for="simH">Target Tinggi (meter)</label><input type="number" id="simH" min="0.5" step="0.1" value="2.88">' +
      '<div class="presets"><button type="button" data-build="2">2 × 2 Cabinet</button><button type="button" data-build="4">4 × 4 Cabinet</button><button type="button" data-build="8">8 × 8 Cabinet</button></div>' +
      '<p class="qnote">Jumlah cabinet dibulatkan ke atas, sehingga ukuran aktual bisa sedikit lebih besar dari target.</p>' +
      '<a class="btn btn--accent" id="simWA" href="#" target="_blank" rel="noopener" style="width:100%;text-align:center;margin-top:8px" data-ev="quote_click">Kirim Hasil Simulasi ke WhatsApp</a>' +
    "</div><div>" +
      '<div class="simout" id="simOut"></div>' +
      '<div class="gridviz"><div class="gridviz__in" id="gridViz"></div><p id="gridNote"></p></div>' +
    "</div></div>" +

    (window.BOM_REFERENCE ?
    '<div class="bomest" id="bomEstimator">' +
      "<h3>Bill of Materials &amp; Estimasi Harga</h3>" +
      '<p class="pdpsec__lead">Dihitung otomatis dari jumlah cabinet di atas, mengikuti metode perhitungan BOQ (Bill of Quantity) standar engineering.</p>' +
      '<div class="bomest__grid">' +

        '<div class="bomest__hw">' +
          '<label for="bomRC">Receiving Card</label><select id="bomRC"></select>' +
          '<label for="bomCtrl">Controller / Sending Box</label><select id="bomCtrl"></select>' +
          '<label for="bomPsu">Power Supply</label><select id="bomPsu"></select>' +
        "</div>" +

        '<div class="bomest__list" id="bomList"></div>' +
      "</div>" +

      '<h4 class="bomest__pricehead">Estimasi Harga <span class="qnote">— isi harga satuan untuk mendapatkan estimasi real-time</span></h4>' +
      '<div class="priceform" id="priceForm">' +
        '<div><label for="prMod">Harga Cabinet/Modul (Rp/pcs)</label><input type="number" id="prMod" min="0" step="10000" value="' + window.PRICE_DEFAULTS.modulePerPcs + '"></div>' +
        '<div><label for="prRC">Harga Receiving Card (Rp/pcs)</label><input type="number" id="prRC" min="0" step="10000" value="' + window.PRICE_DEFAULTS.receivingCardPerPcs + '"></div>' +
        '<div><label for="prPsu">Harga Power Supply (Rp/pcs)</label><input type="number" id="prPsu" min="0" step="10000" value="' + window.PRICE_DEFAULTS.powerSupplyPerPcs + '"></div>' +
        '<div><label for="prCtrl">Harga Controller (Rp/unit)</label><input type="number" id="prCtrl" min="0" step="50000" value="' + window.PRICE_DEFAULTS.controllerPerUnit + '"></div>' +
        '<div><label for="prStruct">Jasa Struktur (Rp/m²)</label><input type="number" id="prStruct" min="0" step="10000" value="' + window.PRICE_DEFAULTS.structurePerSqm + '"></div>' +
        '<div><label for="prInstall">Jasa Instalasi (Rp/m²)</label><input type="number" id="prInstall" min="0" step="10000" value="' + window.PRICE_DEFAULTS.installationPerSqm + '"></div>' +
        '<div><label for="prAcc">Aksesoris &amp; Spare (% dari Hardware)</label><input type="number" id="prAcc" min="0" max="50" step="1" value="' + (window.PRICE_DEFAULTS.accessoryRate * 100) + '"></div>' +
      "</div>" +
      '<div class="pricetotal" id="priceTotal"></div>' +
      '<p class="qnote">* Estimasi internal berbasis harga satuan yang Anda masukkan sendiri — bukan daftar harga resmi. Harga final mengikuti penawaran tertulis dari tim sales.</p>' +
    "</div>" : "") +

    "</div></section>" : "") +

  '<section class="pdpsec pdpsec--alt" id="segment"><div class="wrap">' +
    "<h2>Fitur Khusus Segmen " + segLabel + "</h2>" +
    '<p class="pdpsec__lead">Modul di bawah ini muncul menyesuaikan segmen dan tipe instalasi produk.</p>' +
    segmentModule() +
  "</div></section>" +

  '<section class="pdpsec" id="related"><div class="wrap">' +
    "<h2>Produk Terkait</h2>" +
    '<p class="pdpsec__lead">Seri lain dalam segmen yang sama, diurutkan berdasarkan popularitas.</p>' +
    '<div class="related">' + related.map(relCard).join("") + "</div>" +
  "</div></section>" +

  (usedInProjects.length ?
  '<section class="pdpsec pdpsec--alt" id="case-studies"><div class="wrap">' +
    "<h2>Proyek Terkait yang Menggunakan Produk Ini</h2>" +
    '<p class="pdpsec__lead">Studi kasus instalasi nyata di lapangan menggunakan ' + esc(P.product_name) + ".</p>" +
    '<div class="related">' + usedInProjects.map(projCard).join("") + "</div>" +
  "</div></section>" : "") +

  '<section class="pdpsec pdpsec--alt" id="quote"><div class="wrap">' +
    "<h2>Permintaan Penawaran Harga</h2>" +
    '<p class="pdpsec__lead">Data produk terisi otomatis. Setelah dikirim, Anda akan diarahkan ke WhatsApp sales dengan pesan yang sudah tersusun rapi.</p>' +
    '<form class="qform" id="quoteForm" novalidate>' +
      '<div class="full"><label>Produk Dipilih</label><input type="text" value="' + esc(P.product_name) + " (" + P.product_id + ')" readonly></div>' +
      '<div><label for="qName">Nama Lengkap <span class="req">*</span></label><input id="qName" name="name" required><p class="err">Nama wajib diisi.</p></div>' +
      '<div><label for="qCompany">Perusahaan / Instansi <span class="req">*</span></label><input id="qCompany" name="company" required><p class="err">Perusahaan wajib diisi.</p></div>' +
      '<div><label for="qPhone">No. WhatsApp <span class="req">*</span></label><input id="qPhone" name="phone" inputmode="tel" placeholder="+62812xxxxxxx" required><p class="err">Gunakan format +62 atau 08.</p></div>' +
      '<div><label for="qEmail">Email <span class="req">*</span></label><input id="qEmail" name="email" type="email" required><p class="err">Format email belum benar.</p></div>' +
      '<div><label for="qCity">Kota / Lokasi Instalasi <span class="req">*</span></label><input id="qCity" name="city" required><p class="err">Lokasi wajib diisi.</p></div>' +
      '<div><label for="qTime">Timeline Proyek</label><select id="qTime" name="timeline"><option>Immediate (&lt; 1 bulan)</option><option selected>1–3 bulan</option><option>Planning phase</option></select></div>' +
      '<div class="full"><label>Lingkungan Instalasi</label><div class="radios">' +
        '<label><input type="radio" name="env" value="Indoor"' + (S.environment === "Indoor" ? " checked" : "") + "> Indoor</label>" +
        '<label><input type="radio" name="env" value="Outdoor"' + (S.environment === "Outdoor" ? " checked" : "") + "> Outdoor</label>" +
        '<label><input type="radio" name="env" value="Semi-Outdoor"' + (S.environment === "Semi-Outdoor" ? " checked" : "") + "> Semi-Outdoor</label>" +
      "</div></div>" +
      '<div><label for="qW">Estimasi Lebar Layar (m)</label><input type="number" id="qW" name="width" step="0.1" min="0" value="4.8"></div>' +
      '<div><label for="qH">Estimasi Tinggi Layar (m)</label><input type="number" id="qH" name="height" step="0.1" min="0" value="2.88"></div>' +
      '<div class="full"><label for="qNotes">Catatan / Kebutuhan Tambahan</label><textarea id="qNotes" name="notes"></textarea></div>' +
      '<div class="full"><button class="btn btn--accent" type="submit" data-ev="quote_submit">Kirim & Lanjut ke WhatsApp</button></div>' +
      '<p class="qnote">Data Anda hanya digunakan untuk keperluan penawaran harga dan tidak dibagikan ke pihak ketiga.</p>' +
    "</form>" +
  "</div></section>";

  /* ---------- Meta & Schema.org (PRD Section 8) ---------- */
  document.title = "Jual " + P.product_name + " — " + P.tagline + " | LumeniX";
  $("#metaDesc").setAttribute("content",
    P.tagline + " dengan kecerahan " + nf(S.brightness_nits) + " Nits, proteksi " + S.ip_rating +
    ", dan refresh rate " + nf(S.refresh_rate_hz) + " Hz. Minta penawaran harga resmi.");
  $("#waFloat").href = waLink(null);

  var ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org/", "@type": "Product",
    name: P.product_name, sku: P.product_id,
    image: SITE + "/images/products/" + P.slug + ".webp",
    description: P.tagline + " dengan kecerahan " + S.brightness_nits + " Nits, " + S.ip_rating + ", refresh rate " + S.refresh_rate_hz + " Hz.",
    brand: { "@type": "Brand", name: "LumeniX" },
    offers: { "@type": "AggregateOffer", priceCurrency: "IDR", availability: "https://schema.org/InStock" },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Pixel Pitch", value: S.pixel_pitch_mm + " mm" },
      { "@type": "PropertyValue", name: "Brightness", value: S.brightness_nits + " Nits" },
      { "@type": "PropertyValue", name: "IP Rating", value: S.ip_rating }
    ]
  });
  document.head.appendChild(ld);

  /* ---------- Viewer thumbnails ---------- */
  $$(".thumbs button").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".thumbs button").forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      $("#viewerMain").querySelector("i").textContent = b.dataset.v + " — " + P.product_name;
    });
  });

  /* ---------- Sticky subnav highlight ---------- */
  var links = $$("#subnav a");
  var secs = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { io.observe(s); });
  }

  /* ---------- BOM & Price Estimator (data: bom-reference-data.js) ----------
     "Cabinet" pada katalog produk ini diperlakukan setara dengan satuan
     "Module" pada sheet BOQ sumber — keduanya unit terkecil yang punya
     resolusi piksel sendiri — sehingga rumus ROUNDUP dari sheet asli bisa
     dipakai langsung tanpa mengarang lapisan data yang tidak kita punya. */
  var BOMREF = window.BOM_REFERENCE;
  var bomState = { rcId: null, ctrlId: null, psuId: null };
  var lastBOM = null;

  function populateBomSelects() {
    if (!BOMREF) return;
    var rcSel = $("#bomRC"), ctrlSel = $("#bomCtrl"), psuSel = $("#bomPsu");

    // Receiving Card: utamakan brand yang cocok dengan environment produk bila ada, else semua.
    rcSel.innerHTML = BOMREF.receivingCards.map(function (r) {
      return '<option value="' + r.id + '">' + r.name + " (" + r.maxW + "×" + r.maxH + " px)</option>";
    }).join("");
    var defaultRC = BOMREF.receivingCards.filter(function (r) { return /MRV416/i.test(r.name); })[0] || BOMREF.receivingCards[0];
    rcSel.value = defaultRC.id; bomState.rcId = defaultRC.id;

    // Controller: grouped by brand via optgroup.
    var byBrand = {};
    BOMREF.controllers.forEach(function (c) { (byBrand[c.brand] = byBrand[c.brand] || []).push(c); });
    ctrlSel.innerHTML = Object.keys(byBrand).map(function (brand) {
      return '<optgroup label="' + brand + '">' + byBrand[brand].map(function (c) {
        return '<option value="' + c.id + '">' + c.name + " (" + c.ports + " port)</option>";
      }).join("") + "</optgroup>";
    }).join("");
    var defaultCtrl = BOMREF.controllers.filter(function (c) { return /VX1000/i.test(c.name); })[0] || BOMREF.controllers[0];
    ctrlSel.value = defaultCtrl.id; bomState.ctrlId = defaultCtrl.id;

    psuSel.innerHTML = BOMREF.powerSupplies.map(function (p) {
      return '<option value="' + p.id + '">' + p.name + " (" + p.watt + "W)</option>";
    }).join("");
    var defaultPsu = BOMREF.powerSupplies.filter(function (p) { return p.watt === 200; })[0] || BOMREF.powerSupplies[0];
    psuSel.value = defaultPsu.id; bomState.psuId = defaultPsu.id;

    rcSel.addEventListener("change", function () { bomState.rcId = rcSel.value; simulate(); });
    ctrlSel.addEventListener("change", function () { bomState.ctrlId = ctrlSel.value; simulate(); });
    psuSel.addEventListener("change", function () { bomState.psuId = psuSel.value; simulate(); });

    $$("#priceForm input").forEach(function (i) { i.addEventListener("input", simulate); });
  }

  function byRef(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }

  function computeBOM(cols, rows, area, resW, resH, maxKW) {
    if (!BOMREF) return null;
    var rc = byRef(BOMREF.receivingCards, bomState.rcId);
    var ctrl = byRef(BOMREF.controllers, bomState.ctrlId);
    var psu = byRef(BOMREF.powerSupplies, bomState.psuId);
    if (!rc || !ctrl || !psu) return null;

    var rcCapW = Math.max(1, Math.floor(rc.maxW / PXW));
    var rcCapH = Math.max(1, Math.floor(rc.maxH / PXH));
    var rcUnits = Math.ceil(cols / rcCapW) * Math.ceil(rows / rcCapH);

    var portsNeeded = Math.ceil((resW * resH) / BOMREF.PIXELS_PER_PORT);
    var ctrlUnits = Math.ceil(portsNeeded / ctrl.ports);

    var psuUnits = Math.ceil((maxKW * 1000) / (psu.watt * 0.8)); // derating 80% beban kontinu

    var cabinetUnits = cols * rows;
    var spare = BOMREF.SPARE_RATE;
    var spareCabinet = Math.ceil(cabinetUnits * spare);
    var spareRC = Math.ceil(rcUnits * spare);
    var sparePsu = Math.ceil(psuUnits * spare);

    var cablePower5m = Math.ceil(psuUnits / 12);
    var cablePower1m = Math.max(0, psuUnits - cablePower5m);
    var cablePower25m = Math.ceil((maxKW * 1000) / 3000);
    var cableLan1m = Math.max(0, rcUnits - portsNeeded);
    var cableLan10m = portsNeeded;

    return {
      rc: rc, ctrl: ctrl, psu: psu,
      cabinetUnits: cabinetUnits, rcUnits: rcUnits, ctrlUnits: ctrlUnits, psuUnits: psuUnits,
      spareCabinet: spareCabinet, spareRC: spareRC, sparePsu: sparePsu,
      portsNeeded: portsNeeded,
      cablePower5m: cablePower5m, cablePower1m: cablePower1m, cablePower25m: cablePower25m,
      cableLan1m: cableLan1m, cableLan10m: cableLan10m
    };
  }

  function renderBOM(bom, area) {
    if (!bom) return;
    var rows2 = [
      [P.product_name + " (Cabinet)", bom.cabinetUnits + " pcs"],
      ["Spare Cabinet (5%)", bom.spareCabinet + " pcs"],
      [bom.rc.name, bom.rcUnits + " pcs"],
      ["Spare Receiving Card (5%)", bom.spareRC + " pcs"],
      [bom.ctrl.name, bom.ctrlUnits + " unit"],
      [bom.psu.name, bom.psuUnits + " pcs"],
      ["Spare Power Supply (5%)", bom.sparePsu + " pcs"],
      ["Kabel Power 3×2.5mm 25m (ke panel)", bom.cablePower25m + " roll"],
      ["Kabel Power 3×2.5mm 5m (main power)", bom.cablePower5m + " pcs"],
      ["Kabel Power 3×2.5mm 1m (jumper PSU)", bom.cablePower1m + " pcs"],
      ["Kabel LAN CAT6 10m (ke controller)", bom.cableLan10m + " pcs"],
      ["Kabel LAN CAT6 1m (jumper RC)", bom.cableLan1m + " pcs"]
    ];
    $("#bomList").innerHTML = '<table class="bomtable"><tbody>' +
      rows2.map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td></tr>"; }).join("") +
      "</tbody></table>";
  }

  function computePrice(bom, area) {
    var g = function (id) { return parseFloat($(id).value) || 0; };
    var priceModule = g("#prMod"), priceRC = g("#prRC"), pricePsu = g("#prPsu"), priceCtrl = g("#prCtrl");
    var priceStruct = g("#prStruct"), priceInstall = g("#prInstall"), accRate = g("#prAcc") / 100;

    var hwModule = (bom.cabinetUnits + bom.spareCabinet) * priceModule;
    var hwRC = (bom.rcUnits + bom.spareRC) * priceRC;
    var hwPsu = (bom.psuUnits + bom.sparePsu) * pricePsu;
    var hwCtrl = bom.ctrlUnits * priceCtrl;
    var subtotalHW = hwModule + hwRC + hwPsu + hwCtrl;
    var accessoryCost = subtotalHW * accRate;
    var structCost = area * priceStruct;
    var installCost = area * priceInstall;
    var grandTotal = subtotalHW + accessoryCost + structCost + installCost;

    var allZero = priceModule === 0 && priceRC === 0 && pricePsu === 0 && priceCtrl === 0 && priceStruct === 0 && priceInstall === 0;

    $("#priceTotal").innerHTML = allZero
      ? '<p class="pricetotal__empty">Masukkan harga satuan di atas untuk melihat estimasi total harga proyek ini.</p>'
      : "<div class=\"pricetotal__row\"><span>Subtotal Hardware</span><b>Rp " + nf(Math.round(subtotalHW)) + "</b></div>" +
        "<div class=\"pricetotal__row\"><span>Aksesoris &amp; Spare (" + (accRate * 100).toFixed(0) + "%)</span><b>Rp " + nf(Math.round(accessoryCost)) + "</b></div>" +
        "<div class=\"pricetotal__row\"><span>Jasa Struktur (" + area.toFixed(1) + " m²)</span><b>Rp " + nf(Math.round(structCost)) + "</b></div>" +
        "<div class=\"pricetotal__row\"><span>Jasa Instalasi (" + area.toFixed(1) + " m²)</span><b>Rp " + nf(Math.round(installCost)) + "</b></div>" +
        '<div class="pricetotal__grand"><span>Estimasi Total Harga</span><b>Rp ' + nf(Math.round(grandTotal)) + "</b></div>";

    return { subtotalHW: subtotalHW, accessoryCost: accessoryCost, structCost: structCost, installCost: installCost, grandTotal: grandTotal, allZero: allZero };
  }

  /* ---------- Cabinet Array Simulator (PRD Section 6.1) ---------- */
  var lastSim = "";
  function simulate() {
    if (!canSim) return;
    var tw = Math.max(parseFloat($("#simW").value) || 0, 0.1);
    var th = Math.max(parseFloat($("#simH").value) || 0, 0.1);
    var cols = Math.ceil(tw / (CW / 1000));
    var rows = Math.ceil(th / (CH / 1000));
    var total = cols * rows;
    var aw = cols * CW / 1000, ah = rows * CH / 1000;
    var area = aw * ah;
    var resW = cols * PXW, resH = rows * PXH;
    var weight = S.cabinet_weight_kg ? total * S.cabinet_weight_kg : 0;
    var maxKW = area * S.max_power_watts_sqm / 1000;
    var avgKW = area * S.avg_power_watts_sqm / 1000;
    var vmin = S.pixel_pitch_mm * 1.0, vopt = S.pixel_pitch_mm * 3.0;

    $("#simOut").innerHTML =
      "<div><span>Matriks Grid Cabinet</span><b>" + cols + " × " + rows + "</b><small>Total " + total + " unit cabinet</small></div>" +
      "<div><span>Dimensi Layar Presisi</span><b>" + aw.toFixed(2) + " × " + ah.toFixed(2) + " m</b><small>Luas " + area.toFixed(2) + " m²</small></div>" +
      "<div><span>Resolusi Layar Total</span><b>" + nf(resW) + " × " + nf(resH) + "</b><small>" + (resW * resH / 1e6).toFixed(2) + " MPx</small></div>" +
      "<div><span>Total Berat Panel</span><b>" + (weight ? nf(Math.round(weight)) + " kg" : "Custom") + "</b><small>Belum termasuk struktur</small></div>" +
      "<div><span>Daya Maksimum</span><b>" + maxKW.toFixed(2) + " kW</b><small>Rata-rata " + avgKW.toFixed(2) + " kW</small></div>" +
      "<div><span>Jarak Pandang Optimal</span><b>" + vmin.toFixed(1) + " – " + vopt.toFixed(1) + " m</b><small>Berdasarkan pitch " + S.pixel_pitch_mm + " mm</small></div>";

    var viz = $("#gridViz");
    var maxC = Math.min(cols, 24), maxR = Math.min(rows, 14);
    viz.style.gridTemplateColumns = "repeat(" + maxC + ",1fr)";
    viz.style.maxWidth = Math.min(maxC * 30, 560) + "px";
    viz.innerHTML = new Array(maxC * maxR).join(".").split(".").map(function () { return "<i></i>"; }).join("");
    $("#gridNote").textContent = (cols > maxC || rows > maxR)
      ? "Pratinjau grid dipotong (" + maxC + " × " + maxR + " dari " + cols + " × " + rows + " cabinet)."
      : "Susunan " + cols + " kolom × " + rows + " baris cabinet.";

    lastSim = "• Target: " + tw + "m x " + th + "m\n• Grid: " + cols + " x " + rows + " (" + total + " cabinet)\n" +
      "• Ukuran aktual: " + aw.toFixed(2) + "m x " + ah.toFixed(2) + "m (" + area.toFixed(2) + " m²)\n" +
      "• Resolusi: " + resW + " x " + resH + " px\n• Daya maks: " + maxKW.toFixed(2) + " kW";

    /* ---- BOM & Price (jika referensi hardware tersedia) ---- */
    if (BOMREF && $("#bomList")) {
      var bom = computeBOM(cols, rows, area, resW, resH, maxKW);
      lastBOM = bom;
      if (bom) {
        renderBOM(bom, area);
        var price = computePrice(bom, area);
        lastSim += "\n\n*BILL OF MATERIALS:*\n" +
          "• " + P.product_name + ": " + bom.cabinetUnits + " + " + bom.spareCabinet + " spare pcs\n" +
          "• " + bom.rc.name + ": " + bom.rcUnits + " + " + bom.spareRC + " spare pcs\n" +
          "• " + bom.ctrl.name + ": " + bom.ctrlUnits + " unit\n" +
          "• " + bom.psu.name + ": " + bom.psuUnits + " + " + bom.sparePsu + " spare pcs";
        if (!price.allZero) {
          lastSim += "\n\n*ESTIMASI HARGA:*\n" +
            "• Subtotal Hardware: Rp " + nf(Math.round(price.subtotalHW)) + "\n" +
            "• Aksesoris & Spare: Rp " + nf(Math.round(price.accessoryCost)) + "\n" +
            "• Jasa Struktur: Rp " + nf(Math.round(price.structCost)) + "\n" +
            "• Jasa Instalasi: Rp " + nf(Math.round(price.installCost)) + "\n" +
            "• *Estimasi Total: Rp " + nf(Math.round(price.grandTotal)) + "*\n" +
            "_(Estimasi internal, bukan harga resmi — mohon konfirmasi penawaran final)_";
        }
      }
    }

    $("#simWA").href = waLink({ name: "-", company: "-", city: "-", env: S.environment, width: tw, height: th, timeline: "-", notes: "", sim: lastSim });
  }

  if (canSim) {
    populateBomSelects();
    $("#simW").addEventListener("input", simulate);
    $("#simH").addEventListener("input", simulate);
    simulate();
  }

  /* Preset grid builder (Fine Pitch 16:9 / Rental flightcase / simulator presets) */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-build]");
    if (!b || !canSim) return;
    var n = parseInt(b.dataset.build, 10);
    $("#simW").value = (n * CW / 1000).toFixed(2);
    $("#simH").value = (n * CH / 1000).toFixed(2);
    simulate();
    $("#simulator").scrollIntoView({ behavior: "smooth" });
  });

  /* Transparency slider */
  var tr = $("#transRange");
  if (tr) {
    tr.addEventListener("input", function () {
      $("#transVal").textContent = tr.value + "%";
      $("#transBox").style.setProperty("--op", (1 - tr.value / 100).toFixed(2));
    });
    tr.dispatchEvent(new Event("input"));
  }

  /* Pillar wrapper */
  var pr = $("#pillarRange");
  if (pr) {
    pr.addEventListener("input", function () {
      var d = parseInt(pr.value, 10);                     // cm
      var circ = Math.PI * d * 10;                        // mm
      var perRow = Math.ceil(circ / (CW || 320));
      $("#pillarVal").textContent = d + " cm";
      $("#pillarOut").textContent = "Keliling pilar ± " + (circ / 1000).toFixed(2) + " m — membutuhkan sekitar " +
        perRow + " modul per baris melingkar (modul " + S.cabinet_size_mm + " mm).";
    });
    pr.dispatchEvent(new Event("input"));
  }

  /* Shape selector */
  var shapeSel = "";
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-shape]");
    if (!b) return;
    shapeSel = b.dataset.shape;
    $("#shapeOut").textContent = "Bentuk dipilih: " + shapeSel + ". Sertakan pada catatan form penawaran di bawah.";
    var notes = $("#qNotes");
    if (notes) notes.value = "Bentuk instalasi yang diinginkan: " + shapeSel;
  });

  /* Datasheet lead-gate */
  $("#dsBtn").addEventListener("click", function (e) {
    e.preventDefault();
    alert("Silakan lengkapi form permintaan penawaran di bawah. Link datasheet PDF akan dikirimkan bersama penawaran harga.");
    $("#quote").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- Form validation + WhatsApp redirect (PRD Section 7 & 13) ---------- */
  var form = $("#quoteForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements, ok = true;
    function mark(el, valid) {
      el.closest("div").classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    }
    mark(f.name, f.name.value.trim().length > 1);
    mark(f.company, f.company.value.trim().length > 1);
    mark(f.phone, /^(\+62|62|0)8[0-9]{7,12}$/.test(f.phone.value.replace(/[\s-]/g, "")));
    mark(f.email, /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(f.email.value.trim()));
    mark(f.city, f.city.value.trim().length > 1);
    if (!ok) { form.querySelector(".is-invalid input").focus(); return; }

    var data = {
      name: f.name.value.trim(), company: f.company.value.trim(), city: f.city.value.trim(),
      env: (form.querySelector('input[name=env]:checked') || {}).value || S.environment,
      width: f.width.value || "-", height: f.height.value || "-",
      timeline: f.timeline.value, notes: f.notes.value.trim(), sim: lastSim
    };
    (window.dataLayer = window.dataLayer || []).push({ event: "quote_submit", product: P.product_id });
    window.open(waLink(data), "_blank", "noopener");
  });
})();
