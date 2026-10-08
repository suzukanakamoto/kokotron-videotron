/* =========================================================
   solutions.js — Solutions Hub Engine
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var WA = "6281234567890";

  /* ---------- Header mobile ---------- */
  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () {
    burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open")));
  });
  window.addEventListener("scroll", function () { $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });

  /* ---------- Quick nav dropdown ---------- */
  $("#quickSolNav").innerHTML = window.SOLUTIONS.map(function (s) {
    return '<li><a href="solution-detail.html?id=' + s.key + '">' + s.icon + " " + s.label + "</a></li>";
  }).join("");

  /* ---------- Industry selector grid ---------- */
  $("#industryGrid").innerHTML = window.SOLUTIONS.map(function (s) {
    return '<a class="icard" href="solution-detail.html?id=' + s.key + '">' +
      '<span class="icard__ico" aria-hidden="true">' + s.icon + "</span>" +
      "<h3>" + s.label + "</h3><p>" + s.tagline + "</p></a>";
  }).join("");

  /* ---------- WhatsApp payload generator (PRD Section 7) ---------- */
  function waLink(solutionType, userInputs) {
    var text = "Halo Admin Solution Specialist, saya ingin berkonsultasi mengenai Solusi Videotron untuk Sektor Industri.\n\n" +
      "*SEKTOR INDUSTRI:* " + String(solutionType).toUpperCase() + "\n\n" +
      "*DETAIL KEBUTUHAN PROYEK:*\n" +
      "• Nama Kontak: " + userInputs.name + "\n" +
      "• Perusahaan / Instansi: " + userInputs.company + "\n" +
      "• Lokasi Proyek: " + userInputs.city + "\n" +
      "• Estimasi Ukuran Area: " + (userInputs.width || "-") + " m x " + (userInputs.height || "-") + " m\n" +
      "• Spesifikasi Khusus: " + (userInputs.specialRequirement || "Sesuai Rekomendasi Standard") + "\n\n" +
      "Mohon hubungi saya kembali untuk penjadwalan konsultasi teknis / survey lokasi. Terima kasih.";
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
  }
  window.generateSolutionWhatsAppLink = waLink;

  /* ---------- Comparison matrix table (PRD Section 6) ---------- */
  var ROWS = [
    ["Primary Environment", "env"], ["Pixel Pitch Range", "pitch"], ["Brightness Rating", "bright"],
    ["Regulasi / TKDN", "reg"], ["Keunggulan Utama", "edge"], ["Main Controller", "controller_short"]
  ];
  $("#matrixTable").innerHTML =
    "<thead><tr><th scope=\"col\">Parameter Solusi</th>" +
      window.SOLUTIONS.map(function (s) { return "<th scope=\"col\">" + s.label + "</th>"; }).join("") +
    "</tr></thead><tbody>" +
    ROWS.map(function (r) {
      return "<tr><th scope=\"row\">" + r[0] + "</th>" +
        window.SOLUTIONS.map(function (s) { return "<td>" + s.matrix[r[1]] + "</td>"; }).join("") + "</tr>";
    }).join("") + "</tbody>";

  /* ---------- Solution Matching Wizard (3 steps) ---------- */
  var wz = { step1: null, step2: null, step3: null };

  function renderOpts(boxId, list, key, next) {
    $(boxId).innerHTML = list.map(function (o) {
      return '<button type="button" data-v="' + o.v + '">' + o.l + "</button>";
    }).join("");
    $$(boxId + " button").forEach(function (b) {
      b.addEventListener("click", function () {
        wz[key] = b.dataset.v;
        goStep(next);
      });
    });
  }
  renderOpts("#w1opts", window.WIZARD_STEPS.step1, "step1", 2);
  renderOpts("#w2opts", window.WIZARD_STEPS.step2, "step2", 3);
  renderOpts("#w3opts", window.WIZARD_STEPS.step3, "step3", 4);

  function goStep(n) {
    [1, 2, 3, 4].forEach(function (i) { $("#wPanel" + i).hidden = i !== n; });
    $$(".wstep").forEach(function (s) { s.classList.toggle("is-active", Number(s.dataset.s) === n || (n === 4 && s.dataset.s === "4")); });
    if (n === 4) buildResult();
  }
  $$(".wback").forEach(function (b) { b.addEventListener("click", function () { goStep(Number(b.dataset.back)); }); });
  $("#wRestart").addEventListener("click", function () { wz = { step1: null, step2: null, step3: null }; goStep(1); });

  var ENV_LABEL = { "indoor-close": "Indoor jarak dekat (<2m)", "indoor-far": "Indoor jarak menengah (2–5m)", outdoor: "Outdoor Roadside", perimeter: "Stadium Perimeter", glass: "Glass Window" };
  var FEAT_LABEL = { tkdn: "Wajib Sertifikat TKDN", fast: "Kemudahan Bongkar Pasang", glassfeat: "Transparan Kaca", silent: "Operasi 24/7 Silent", ip68: "Tahan Hujan IP68" };

  function byId(id) { return window.PRODUCT_CATALOG.filter(function (p) { return p.product_id === id; })[0]; }
  function solutionOf(key) { return window.SOLUTIONS.filter(function (s) { return s.key === key; })[0]; }

  function buildResult() {
    var sol = solutionOf(wz.step1);
    var featProd = byId(window.WIZARD_FEATURE_PRODUCT[wz.step3]);
    var mainProd = byId(sol.products[0]);
    var recommended = (featProd && sol.products.indexOf(featProd.product_id) === -1) ? [mainProd, featProd] : sol.products.map(byId).slice(0, 2);

    var estArea = { "indoor-close": "3 – 10 m²", "indoor-far": "10 – 30 m²", outdoor: "20 – 100 m²", perimeter: "50 – 200 m²", glass: "5 – 20 m²" }[wz.step2];
    var estBudget = { "indoor-close": "Rp 60 – 180 juta", "indoor-far": "Rp 150 – 450 juta", outdoor: "Rp 300 juta – 1,5 miliar", perimeter: "Rp 800 juta – 3 miliar", glass: "Rp 100 – 350 juta" }[wz.step2];

    $("#wResult").innerHTML =
      '<div class="wresult"><h3>Rekomendasi Paket Solusi: ' + sol.label + "</h3>" +
      "<p>Lingkungan: <strong>" + ENV_LABEL[wz.step2] + "</strong> · Fitur prioritas: <strong>" + FEAT_LABEL[wz.step3] + "</strong></p>" +
      "<ul>" +
        "<li><strong>Rekomendasi Layar:</strong> " + recommended.map(function (p) { return p.product_name; }).join(" atau ") + "</li>" +
        "<li><strong>Controller:</strong> " + sol.controller + "</li>" +
        "<li><strong>Tipe Maintenance:</strong> " + (recommended[0] ? recommended[0].specs.maintenance_access : "Front & Rear") + "</li>" +
        "<li><strong>Estimasi Luas Area:</strong> " + estArea + "</li>" +
        "<li><strong>Estimasi Anggaran:</strong> " + estBudget + " (indikatif, tergantung spesifikasi akhir)</li>" +
      "</ul>" +
      '<a class="btn btn--accent" id="wWaBtn" target="_blank" rel="noopener">Konsultasikan Paket Solusi Ini via WhatsApp</a></div>';

    $("#wWaBtn").href = waLink(sol.label, {
      name: "-", company: "-", city: "-",
      specialRequirement: FEAT_LABEL[wz.step3] + " — " + ENV_LABEL[wz.step2] + " — Rekomendasi: " + recommended.map(function (p) { return p.product_name; }).join(", ")
    });
  }

  /* ---------- Consultation form (bottom CTA) ---------- */
  $("#cSector").innerHTML = window.SOLUTIONS.map(function (s) { return '<option value="' + s.key + '">' + s.label + "</option>"; }).join("");
  $("#consultForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target.elements;
    var link = waLink(f.sector.value, { name: f.name.value, company: f.company.value, city: f.city.value, specialRequirement: f.req.value });
    window.open(link, "_blank", "noopener");
  });
})();
