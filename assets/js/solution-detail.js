/* =========================================================
   solution-detail.js — Industry Solution Detail Page
   Template tunggal untuk 8 industri, digerakkan solutions-data.js
   Routing: solution-detail.html?id=<key>
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var WA = "6281234567890";
  var nf = function (n) { return Number(n).toLocaleString("id-ID"); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () { burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))); });
  window.addEventListener("scroll", function () { $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });

  var key = new URLSearchParams(location.search).get("id") || "";
  var S = window.SOLUTIONS.filter(function (s) { return s.key === key; })[0];

  if (!S) {
    $("#solRoot").innerHTML = '<div class="wrap" style="padding:100px 0;text-align:center">' +
      "<h1>Solusi tidak ditemukan</h1><p>Silakan kembali ke halaman Solutions.</p>" +
      '<p><a class="btn btn--accent" href="solutions.html">Kembali ke Solutions</a></p></div>';
    return;
  }

  function byId(id) { return window.PRODUCT_CATALOG.filter(function (p) { return p.product_id === id; })[0]; }
  var recProducts = S.products.map(byId).filter(Boolean);

  /* ---------- WhatsApp payload (PRD Section 7) ---------- */
  function waLink(userInputs) {
    var text = "Halo Admin Solution Specialist, saya ingin berkonsultasi mengenai Solusi Videotron untuk Sektor Industri.\n\n" +
      "*SEKTOR INDUSTRI:* " + S.label.toUpperCase() + "\n\n" +
      "*DETAIL KEBUTUHAN PROYEK:*\n" +
      "• Nama Kontak: " + userInputs.name + "\n" +
      "• Perusahaan / Instansi: " + userInputs.company + "\n" +
      "• Lokasi Proyek: " + userInputs.city + "\n" +
      "• Estimasi Ukuran Area: " + (userInputs.width || "-") + " m x " + (userInputs.height || "-") + " m\n" +
      "• Spesifikasi Khusus: " + (userInputs.specialRequirement || "Sesuai Rekomendasi Standard") + "\n\n" +
      "Mohon hubungi saya kembali untuk penjadwalan konsultasi teknis / survey lokasi. Terima kasih.";
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
  }

  /* ---------- Architecture diagram (PRD Section 5.2) ---------- */
  var ARCHI = {
    input: { l: "Input Sources", items: ["CCTV / Camera", "PC / Laptop", "Media Player"], d: "Sumber konten: kamera pengawas, komputer presentasi, atau media player pemutar iklan/informasi." },
    proc:  { l: "Processing & Control", items: [S.controller.split("—")[0].split("(")[0].trim() || "Video Wall Processor"], d: S.controller },
    out:   { l: "Output Display", items: [recProducts[0] ? recProducts[0].product_name : "LED Display"], d: "Panel LED yang menampilkan hasil olahan sinyal — " + (recProducts[0] ? recProducts[0].tagline : "") },
    loop:  { l: "Signal & Power Loop", items: ["Redundancy Loop"], d: "Jalur cadangan daya dan sinyal agar tampilan tetap berjalan meski satu jalur bermasalah." }
  };

  function archiHTML() {
    function col(key, block) {
      return '<div class="archi__col"><p class="archi__label">' + block.l + "</p>" +
        block.items.map(function (i) { return '<button type="button" class="archi__block" data-d="' + key + '">' + i + "</button>"; }).join("") + "</div>";
    }
    return '<div class="archi">' + col("input", ARCHI.input) + '<span class="archi__arrow">→</span>' +
      col("proc", ARCHI.proc) + '<span class="archi__arrow">→</span>' + col("out", ARCHI.out) + "</div>" +
      '<div class="archi" style="margin-top:6px">' + col("loop", ARCHI.loop) + "</div>" +
      '<div class="archi__desc" id="archiDesc"></div>';
  }

  /* ---------- Special module per industry (PRD Section 5.3 / 5.4 / lainnya) ---------- */
  function specialHTML() {
    var sp = S.special;
    if (sp.key === "dooh-roi") {
      return '<div class="special"><h3>' + sp.label + "</h3><p>" + sp.desc + "</p>" +
        '<div class="calcgrid">' +
          '<div><label for="rW">Lebar Layar (m)</label><input type="number" id="rW" value="6" step="0.1" min="0.5"></div>' +
          '<div><label for="rH">Tinggi Layar (m)</label><input type="number" id="rH" value="3" step="0.1" min="0.5"></div>' +
          '<div><label for="rSlots">Jumlah Slot Iklan / Hari</label><input type="number" id="rSlots" value="10" min="1"></div>' +
          '<div><label for="rDur">Durasi per Slot (detik)</label><input type="number" id="rDur" value="15" min="1"></div>' +
          '<div><label for="rRate">Tarif Sewa / Slot / Bulan (Rp)</label><input type="number" id="rRate" value="3000000" step="100000" min="0"></div>' +
          '<div><label for="rPower">Estimasi Watt/m² (default dari produk)</label><input type="number" id="rPower" value="' + (recProducts[0] ? recProducts[0].specs.avg_power_watts_sqm : 280) + '"></div>' +
        "</div>" +
        '<div class="calcout" id="rOut"></div></div>';
    }
    if (sp.key === "tkdn-doc") {
      return '<div class="special"><h3>' + sp.label + "</h3><p>" + sp.desc + "</p>" +
        '<div class="calcgrid">' +
          '<div><label for="tInst">Nama Instansi</label><input type="text" id="tInst" placeholder="mis. Dinas Kominfo Provinsi..."></div>' +
          '<div><label for="tVal">Nilai Proyek Estimasi (Rp)</label><input type="number" id="tVal" placeholder="500000000"></div>' +
        "</div>" +
        '<button class="btn btn--accent" type="button" id="tGen">Generate Draft Spesifikasi Teknis</button>' +
        '<div class="calcout" id="tOut" style="display:none;grid-template-columns:1fr;margin-top:18px"></div></div>';
    }
    if (sp.key === "assembly-calc") {
      return '<div class="special"><h3>' + sp.label + "</h3><p>" + sp.desc + "</p>" +
        '<div class="calcgrid">' +
          '<div><label for="aPanels">Jumlah Panel</label><input type="number" id="aPanels" value="48" min="1"></div>' +
          '<div><label for="aCrew">Jumlah Kru Teknisi</label><input type="number" id="aCrew" value="4" min="1"></div>' +
        "</div><div class=\"calcout\" id=\"aOut\"></div></div>";
    }
    if (sp.key === "distance-calc") {
      return '<div class="special"><h3>' + sp.label + "</h3><p>" + sp.desc + "</p>" +
        '<div class="calcgrid">' +
          '<div><label for="dBack">Jarak Kursi Terjauh (meter)</label><input type="number" id="dBack" value="25" min="1"></div>' +
        "</div><div class=\"calcout\" id=\"dOut\"></div></div>";
    }
    if (sp.key === "glass-visualizer") {
      return '<div class="special"><h3>' + sp.label + "</h3><p>" + sp.desc + "</p>" +
        '<div class="slider-row" style="display:flex;align-items:center;gap:14px;margin-top:10px">' +
        '<label for="gTrans">Transparansi</label><input type="range" id="gTrans" min="0" max="85" value="60" style="flex:1"><b id="gTransVal">60%</b></div>' +
        '<div class="transbox" id="gBox" style="height:130px;border-radius:8px;margin-top:14px;background-image:linear-gradient(120deg,#2d3f55,#5b7fa3);position:relative"></div></div>';
    }
    return '<div class="special"><h3>' + sp.label + "</h3><p>" + sp.desc + "</p>" +
      '<p class="qnote">Konsultasikan kebutuhan spesifik Anda dengan tim solution specialist kami melalui form di bawah.</p></div>';
  }

  /* ---------- Render page ---------- */
  document.title = S.meta.title;
  $("#metaDesc").setAttribute("content", S.meta.desc);
  $("#waFloat").href = "https://wa.me/" + WA + "?text=" + encodeURIComponent("Halo, saya ingin konsultasi solusi " + S.label + ".");

  $("#solRoot").innerHTML =
  '<section class="ihero"><div class="wrap">' +
    '<nav class="crumb"><a href="index.html">Home</a> › <a href="solutions.html">Solutions</a> › <span>' + esc(S.label) + "</span></nav>" +
    '<div class="ihero__grid"><div>' +
      '<span class="ihero__ico">' + S.icon + "</span>" +
      "<h1>" + esc(S.title) + "</h1>" +
      '<p class="tag">' + esc(S.tagline) + "</p>" +
      '<ul class="audience">' + S.audience.map(function (a) { return "<li>" + a + "</li>"; }).join("") + "</ul>" +
      '<a class="btn btn--accent" href="#quote">Konsultasi Sektor ' + S.label + "</a>" +
    "</div>" +
    '<div class="ihero__panel"><h3>Ringkasan Parameter Solusi</h3><dl>' +
      "<dt>Environment</dt><dd>" + S.matrix.env + "</dd>" +
      "<dt>Pixel Pitch</dt><dd>" + S.matrix.pitch + "</dd>" +
      "<dt>Brightness</dt><dd>" + S.matrix.bright + "</dd>" +
      "<dt>Regulasi</dt><dd>" + S.matrix.reg + "</dd>" +
      "<dt>Keunggulan</dt><dd>" + S.matrix.edge + "</dd>" +
      "<dt>Controller</dt><dd>" + S.matrix.controller_short + "</dd>" +
    "</dl></div></div></div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Pain Points & Tantangan Industri</h2>" +
    '<p class="pdpsec__lead">Tantangan spesifik yang paling sering dihadapi sektor ' + S.label + ".</p>" +
    '<ul class="painlist">' + S.pain_points.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul>" +
  "</div></section>" +

  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Recommended Hardware & Software Ecosystem</h2>" +
    '<p class="pdpsec__lead">Videotron adalah satu kesatuan sistem — bukan sekadar panel LED.</p>' +
    '<div class="ecogrid">' +
      '<div class="ecobox"><h4>LED Panel Rekomendasi</h4><div class="prodlinks">' +
        recProducts.map(function (p) {
          return '<a href="product-detail.html?id=' + p.slug + '">' + p.product_name + "<span>P" + p.specs.pixel_pitch_mm + " · " + nf(p.specs.brightness_nits) + " Nits</span></a>";
        }).join("") +
      "</div></div>" +
      '<div class="ecobox"><h4>Controller & Software</h4><p>' + S.controller + "</p></div>" +
      '<div class="ecobox"><h4>Hardware & Sensor Tambahan</h4><p>' + S.extra_hw + "</p></div>" +
      '<div class="ecobox"><h4>Struktur & Konstruksi</h4><p>' + S.structure + "</p></div>" +
    "</div></div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    "<h2>System Architecture Diagram</h2>" +
    '<p class="pdpsec__lead">Klik setiap blok untuk membaca peran komponen dalam alur sistem.</p>' +
    archiHTML() +
  "</div></section>" +

  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Fitur Interaktif Khusus " + S.label + "</h2>" +
    specialHTML() +
  "</div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Matrix Perbandingan Cepat</h2>" +
    '<div class="tablewrap"><table class="cmp">' +
      "<tbody>" +
      "<tr><th scope=\"row\">Primary Environment</th><td>" + S.matrix.env + "</td></tr>" +
      "<tr><th scope=\"row\">Pixel Pitch Range</th><td>" + S.matrix.pitch + "</td></tr>" +
      "<tr><th scope=\"row\">Brightness Rating</th><td>" + S.matrix.bright + "</td></tr>" +
      "<tr><th scope=\"row\">Regulasi / TKDN</th><td>" + S.matrix.reg + "</td></tr>" +
      "<tr><th scope=\"row\">Keunggulan Utama</th><td>" + S.matrix.edge + "</td></tr>" +
      "<tr><th scope=\"row\">Main Controller</th><td>" + S.matrix.controller_short + "</td></tr>" +
      "</tbody></table></div>" +
  "</div></section>" +

  '<section class="pdpsec pdpsec--alt" id="quote"><div class="wrap">' +
    "<h2>Inquiry & Consultation Form</h2>" +
    '<p class="pdpsec__lead">Data akan dikirim sebagai draf pesan WhatsApp ke tim solution specialist kami.</p>' +
    '<form class="qform" id="iForm">' +
      '<div><label for="iName">Nama Kontak <span class="req">*</span></label><input id="iName" name="name" required></div>' +
      '<div><label for="iCompany">Perusahaan / Instansi <span class="req">*</span></label><input id="iCompany" name="company" required></div>' +
      '<div><label for="iCity">Lokasi Proyek <span class="req">*</span></label><input id="iCity" name="city" required></div>' +
      '<div><label for="iW">Estimasi Lebar (m)</label><input type="number" id="iW" name="width" step="0.1" min="0"></div>' +
      '<div><label for="iH">Estimasi Tinggi (m)</label><input type="number" id="iH" name="height" step="0.1" min="0"></div>' +
      '<div class="full"><label for="iReq">Spesifikasi Khusus</label><textarea id="iReq" name="req" placeholder="Sesuai Rekomendasi Standard"></textarea></div>' +
      '<div class="full"><button class="btn btn--accent" type="submit">Konsultasikan via WhatsApp</button></div>' +
    "</form></div></section>";

  /* ---------- Architecture block click ---------- */
  $$(".archi__block").forEach(function (b) {
    b.addEventListener("click", function () {
      var d = $("#archiDesc");
      d.textContent = ARCHI[b.dataset.d].d;
      d.classList.add("is-open");
    });
  });

  /* ---------- DOOH ROI Calculator (PRD Section 5.3) ---------- */
  function calcROI() {
    var w = parseFloat($("#rW").value) || 0, h = parseFloat($("#rH").value) || 0;
    var slots = parseInt($("#rSlots").value, 10) || 0, dur = parseInt($("#rDur").value, 10) || 0;
    var rate = parseFloat($("#rRate").value) || 0, watt = parseFloat($("#rPower").value) || 0;
    var area = w * h;
    var revMonth = slots * rate;
    var revYear = revMonth * 12;
    var kWhMonth = (area * watt / 1000) * 12 * 30; // 12 jam operasional/hari asumsi
    var costMonth = kWhMonth * 1500; // asumsi tarif listrik Rp1.500/kWh
    var investEst = area * 25000000; // asumsi harga instalasi Rp25 juta/m² sebagai basis estimasi payback
    var payback = revMonth > costMonth ? (investEst / (revMonth - costMonth)) : 0;

    $("#rOut").innerHTML =
      "<div><span>Revenue / Bulan</span><b>Rp " + nf(Math.round(revMonth)) + "</b></div>" +
      "<div><span>Revenue / Tahun</span><b>Rp " + nf(Math.round(revYear)) + "</b></div>" +
      "<div><span>Konsumsi Listrik / Bulan</span><b>" + nf(Math.round(kWhMonth)) + " kWh</b></div>" +
      "<div><span>Estimasi Biaya Listrik</span><b>Rp " + nf(Math.round(costMonth)) + "</b></div>" +
      "<div><span>Estimasi Payback Period</span><b>" + (payback ? Math.ceil(payback) + " bulan" : "—") + "</b></div>" +
      "<div><span>Total Luas Layar</span><b>" + area.toFixed(1) + " m²</b></div>";
  }
  if ($("#rW")) { $$(".special input").forEach(function (i) { i.addEventListener("input", calcROI); }); calcROI(); }

  /* ---------- TKDN Document Generator (PRD Section 5.4) ---------- */
  var tGen = $("#tGen");
  if (tGen) {
    tGen.addEventListener("click", function () {
      var inst = $("#tInst").value.trim() || "[Nama Instansi]";
      var val = $("#tVal").value ? "Rp " + nf($("#tVal").value) : "[Nilai Proyek]";
      var out = $("#tOut");
      out.style.display = "grid";
      out.innerHTML = '<div style="text-align:left;padding:18px">' +
        "<p><strong>DRAFT SPESIFIKASI TEKNIS PENGADAAN</strong></p>" +
        "<p>Instansi: " + esc(inst) + "<br>Estimasi Nilai Proyek: " + val + "</p>" +
        "<ul style=\"margin:10px 0;padding-left:20px;color:var(--muted)\">" +
        "<li>Sertifikasi TKDN minimum sesuai ketentuan Kemenperin</li>" +
        "<li>Sertifikasi mutu: ISO 9001, ISO 14001, CE, RoHS</li>" +
        "<li>Garansi resmi minimum 2 tahun untuk panel dan 1 tahun untuk controller</li>" +
        "<li>Dukungan purna jual & spare part selama masa garansi</li>" +
        "<li>Dokumen pendukung siap untuk proses e-Katalog / LPSE</li></ul>" +
        '<a class="btn btn--accent" href="' + waLink({ name: "-", company: inst, city: "-", specialRequirement: "Minta dokumen pendukung lelang untuk nilai proyek " + val }) + '" target="_blank" rel="noopener">Minta Dokumen Lengkap via WhatsApp</a></div>';
    });
  }

  /* ---------- Assembly & Rigging Calculator (Event) ---------- */
  function calcAssembly() {
    var panels = parseInt($("#aPanels").value, 10) || 0, crew = parseInt($("#aCrew").value, 10) || 1;
    var minutesPerPanel = 6;
    var totalMinutes = (panels * minutesPerPanel) / crew;
    var weight = panels * (recProducts[0] && recProducts[0].specs.cabinet_weight_kg ? recProducts[0].specs.cabinet_weight_kg : 7.5);
    $("#aOut").innerHTML =
      "<div><span>Estimasi Waktu Pemasangan</span><b>" + Math.ceil(totalMinutes) + " menit</b></div>" +
      "<div><span>Setara</span><b>" + (totalMinutes / 60).toFixed(1) + " jam</b></div>" +
      "<div><span>Estimasi Beban Gantung Total</span><b>" + nf(Math.round(weight)) + " kg</b></div>";
  }
  if ($("#aPanels")) { $$(".special input").forEach(function (i) { i.addEventListener("input", calcAssembly); }); calcAssembly(); }

  /* ---------- Distance-to-Pitch Calculator (Education) ---------- */
  function calcDistance() {
    var d = parseFloat($("#dBack").value) || 0;
    var pitch = (d * 1000 / 3000).toFixed(2); // aturan umum: viewing distance optimal = pitch(mm) x 3
    $("#dOut").innerHTML =
      "<div><span>Rekomendasi Pixel Pitch Maks.</span><b>P" + pitch + "</b></div>" +
      "<div><span>Jarak Kursi Terjauh</span><b>" + d + " m</b></div>" +
      "<div><span>Catatan</span><b style=\"font-size:.85rem\">Gunakan pitch ≤ nilai ini agar tetap jelas dari baris belakang</b></div>";
  }
  if ($("#dBack")) { $("#dBack").addEventListener("input", calcDistance); calcDistance(); }

  /* ---------- Glass transparency visualizer (Retail) ---------- */
  var gT = $("#gTrans");
  if (gT) {
    gT.addEventListener("input", function () {
      $("#gTransVal").textContent = gT.value + "%";
      $("#gBox").style.background = "linear-gradient(120deg, rgba(45,63,85," + (1 - gT.value / 100) + "), rgba(91,127,163," + (1 - gT.value / 100) + "))";
    });
    gT.dispatchEvent(new Event("input"));
  }

  /* ---------- Inquiry form submit ---------- */
  $("#iForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target.elements;
    window.open(waLink({ name: f.name.value, company: f.company.value, city: f.city.value, width: f.width.value, height: f.height.value, specialRequirement: f.req.value }), "_blank", "noopener");
  });
})();
