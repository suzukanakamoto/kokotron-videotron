/* =========================================================
   about.js — About Us Tab Engine
   Semua konten di-render dari about-data.js
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () { burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))); });
  window.addEventListener("scroll", function () { $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });

  var C = window.COMPANY_INFO;

  /* ---------- Render halaman ---------- */
  $("#aboutRoot").innerHTML =

  /* Hero */
  '<section class="ahero"><div class="wrap">' +
    '<nav class="crumb"><a href="index.html">Home</a> › <span>About Us</span></nav>' +
    "<h1>Pelopor Solusi Visual LED Display &amp; Videotron Terintegrasi di Indonesia</h1>" +
    '<p class="sub">' + C.description + "</p>" +
    '<div class="statrow">' + window.HERO_STATS.map(function (s) {
      return "<div><b>" + s.value + "</b><span>" + s.label + "</span></div>";
    }).join("") + "</div>" +
  "</div></section>" +

  /* Section 1: Timeline */
  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Sejarah &amp; Milestone Perusahaan</h2>" +
    '<p class="pdpsec__lead">Rekam jejak pertumbuhan perusahaan dari pendirian hingga era teknologi MicroLED terkini.</p>' +
    '<div class="timeline" id="timeline">' +
      window.MILESTONES.map(function (m, i) {
        return '<div class="tl-item' + (i === window.MILESTONES.length - 1 ? " is-active" : "") + '">' +
          '<span class="tl-year">' + m.year + "</span><h3>" + m.title + "</h3><p>" + m.desc + "</p></div>";
      }).join("") +
    "</div></div></section>" +

  /* Section 2: Evolusi Teknologi Modul */
  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Dari DIP ke COB: Evolusi Teknologi Modul LED Display</h2>" +
    '<p class="pdpsec__lead">Mengapa modul LED modern jauh lebih efisien, tajam, dan tahan lama.</p>' +
    '<div class="gentabs" id="genTabs">' +
      window.MODULE_GENERATIONS.map(function (g, i) {
        return '<button type="button" data-g="' + g.key + '" aria-selected="' + (i === window.MODULE_GENERATIONS.length - 1) + '">' + g.label + " · " + g.years + "</button>";
      }).join("") +
    "</div>" +
    '<div id="genPanel"></div>' +
    "<h3 style=\"margin-top:36px\">Pitch Progression Chart</h3>" +
    '<p class="pdpsec__lead" style="margin-bottom:14px">Pixel pitch mengecil dari 20 mm (tahun 2000) hingga 0,6 mm (2026) — jarak pandang bisa jauh lebih dekat tanpa terlihat pecah.</p>' +
    '<div class="pitchchart" id="pitchChart"></div>' +
  "</div></section>" +

  /* 4.1 Interactive Module Tech Comparison Tool */
  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Alat Komparasi Generasi Teknologi Modul LED</h2>" +
    '<p class="pdpsec__lead">Bandingkan dua generasi teknologi modul secara langsung.</p>' +
    '<div class="compare-tool"><div class="compare-tool__sel">' +
      '<div><label for="cmpA">Pilih Teknologi A</label><select id="cmpA"></select></div>' +
      '<div><label for="cmpB">Pilih Teknologi B</label><select id="cmpB"></select></div>' +
    "</div><div class=\"comparerows\" id=\"cmpRows\"></div></div>" +
  "</div></section>" +

  /* Section 3: QC Standards */
  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Quality Control &amp; Testing Standards</h2>" +
    '<p class="pdpsec__lead">Standar pengujian kualitas panel sebelum dikirim ke lokasi proyek.</p>' +
    '<div class="qcgrid">' + window.QC_STANDARDS.map(function (q) {
      return '<div class="qcbox"><span class="ico">' + q.icon + "</span><h3>" + q.title + "</h3><p>" + q.desc + "</p></div>";
    }).join("") + "</div>" +
  "</div></section>" +

  /* Section 4: Certification Vault */
  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Certification &amp; Compliance Vault</h2>" +
    '<p class="pdpsec__lead">Pusat dokumentasi resmi yang dapat diunduh langsung oleh tim pengadaan instansi atau kontraktor.</p>' +
    '<div id="certVault"></div>' +
    '<div class="doc-pack"><h3>Automated Company Profile &amp; Document Pack Builder</h3>' +
      '<p class="qnote">Pilih dokumen yang ingin diunduh dalam satu file ZIP terkompresi.</p>' +
      '<div class="doc-pack__opts" id="docPackOpts">' +
        window.DOC_PACK_OPTIONS.map(function (d) {
          return '<label><input type="checkbox" value="' + d.key + '"' + (d.checked ? " checked" : "") + ">" + d.label + "</label>";
        }).join("") +
      "</div>" +
      '<div class="doc-pack__form">' +
        '<input type="text" id="dpName" placeholder="Nama Lengkap" required>' +
        '<input type="email" id="dpEmail" placeholder="Email Bisnis" required>' +
        '<input type="text" id="dpCompany" placeholder="Nama Perusahaan" required>' +
      "</div>" +
      '<button class="btn btn--accent" id="dpSubmit" type="button" style="margin-top:16px">Download Document Pack (.ZIP)</button>' +
    "</div>" +
  "</div></section>" +

  /* Section 5: Leadership & Engineering Team */
  '<section class="pdpsec pdpsec--alt"><div class="wrap">' +
    "<h2>Certified Engineering Team &amp; Leadership</h2>" +
    '<p class="pdpsec__lead">Profil jajaran manajemen dan teknisi bersertifikat Novastar / Colorlight.</p>' +
    '<div class="leadgrid">' + window.LEADERSHIP.map(function (l) {
      var initials = l.name.split(" ").map(function (w) { return w[0]; }).slice(0, 2).join("");
      return '<div class="leadcard"><div class="leadcard__ava">' + initials + "</div><h3>" + l.name + '</h3><p class="role">' + l.role + "</p><p>" + l.bio + "</p></div>";
    }).join("") + "</div>" +
    '<div class="techcert-list">' + window.TECH_CERTIFICATIONS.map(function (t) {
      return "<div><b>" + t.name + "</b><span>" + t.desc + "</span></div>";
    }).join("") + "</div>" +
  "</div></section>" +

  /* Section 6: 360 Showroom */
  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Interactive 360° Showroom &amp; Workshop Tour</h2>" +
    '<p class="pdpsec__lead">Klik titik interaktif untuk melihat demonstrasi area experience center dan workshop assembly kami.</p>' +
    '<div class="showroom" id="showroom"><span class="showroom__label">360° Virtual Tour Preview</span></div>' +
    '<div class="hotspot-desc" id="hotspotDesc"></div>' +
  "</div></section>" +

  /* CTA / Inquiry */
  '<section class="cta" id="quote"><div class="wrap">' +
    "<h2>Ingin Berkunjung atau Berdiskusi Langsung?</h2>" +
    "<p>Tim kami siap menerima kunjungan showroom atau konsultasi kebutuhan proyek Anda.</p>" +
    '<p class="cta__btns">' +
      '<a class="btn btn--accent" href="https://wa.me/' + C.waNumber + '?text=' + encodeURIComponent("Halo, saya ingin berkunjung / berdiskusi dengan tim LumeniX.") + '" target="_blank" rel="noopener">Hubungi via WhatsApp</a>' +
      '<a class="btn btn--ghost" href="contact.html">Isi Form Kontak</a>' +
    "</p></div></section>";

  /* ---------- Timeline scroll reveal ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("is-active"); });
    }, { threshold: .3 });
    $$(".tl-item").forEach(function (el) { io.observe(el); });
  }

  /* ---------- Module Generation Tabs ---------- */
  function genById(k) { return window.MODULE_GENERATIONS.filter(function (g) { return g.key === k; })[0]; }
  function paintGen(key) {
    var g = genById(key);
    $$("#genTabs button").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.g === key)); });
    $("#genPanel").innerHTML = '<div class="genpanel">' +
      '<div class="genpanel__visual"><b>' + g.label + "</b><span>" + g.years + "</span></div>" +
      "<ul>" + g.points.map(function (p) { return "<li>" + p + "</li>"; }).join("") + "</ul></div>";
  }
  $("#genTabs").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; paintGen(b.dataset.g);
  });
  paintGen(window.MODULE_GENERATIONS[window.MODULE_GENERATIONS.length - 1].key);

  /* ---------- Pitch Progression Chart ---------- */
  var maxPitch = Math.max.apply(null, window.PITCH_PROGRESSION.map(function (p) { return p.pitch; }));
  $("#pitchChart").innerHTML = window.PITCH_PROGRESSION.map(function (p) {
    var h = Math.max(6, (p.pitch / maxPitch) * 150);
    return '<div class="pitchbar"><b>P' + p.pitch + '</b><div class="pitchbar__fill" style="height:' + h + 'px"></div><span>' + p.year + "</span></div>";
  }).join("");

  /* ---------- Tech Comparison Tool ---------- */
  var optsHTML = window.MODULE_GENERATIONS.map(function (g) { return '<option value="' + g.key + '">' + g.label + "</option>"; }).join("");
  $("#cmpA").innerHTML = optsHTML; $("#cmpB").innerHTML = optsHTML;
  $("#cmpA").value = "smd"; $("#cmpB").value = "cob";

  var CMP_FIELDS = [["Structure", "structure"], ["Protection", "protection"], ["Pitch Minimum", "pitch_min"], ["Touchability", "touchability"], ["Energy Efficiency", "energy"]];
  function paintCompare() {
    var a = genById($("#cmpA").value), b = genById($("#cmpB").value);
    $("#cmpRows").innerHTML = CMP_FIELDS.map(function (f) {
      return '<div class="comparerow"><span class="lbl">' + f[0] + "</span>" +
        '<span class="a">' + a[f[1]] + '</span><span class="vs">VS</span><span class="b">' + b[f[1]] + "</span></div>";
    }).join("");
  }
  $("#cmpA").addEventListener("change", paintCompare);
  $("#cmpB").addEventListener("change", paintCompare);
  paintCompare();

  /* ---------- Certification Vault (grouped + lightbox) ---------- */
  var groups = {};
  window.CERTIFICATIONS.forEach(function (c) { (groups[c.group] = groups[c.group] || []).push(c); });
  $("#certVault").innerHTML = Object.keys(groups).map(function (g) {
    return '<p class="certgroup-title">' + g + '</p><div class="certgrid">' +
      groups[g].map(function (c) {
        return '<div class="certcard" data-cert="' + c.code + '"><b>' + c.code + "</b><span>" + c.name + "</span></div>";
      }).join("") + "</div>";
  }).join("");

  $("#certVault").addEventListener("click", function (e) {
    var card = e.target.closest("[data-cert]"); if (!card) return;
    var c = window.CERTIFICATIONS.filter(function (x) { return x.code === card.dataset.cert; })[0];
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<div class="lightbox__box"><button class="lightbox__close" type="button" aria-label="Tutup">×</button>' +
      '<div class="lightbox__badge">' + c.code + "</div><h3>" + c.name + "</h3><p>" + c.desc + "</p>" +
      '<a class="btn btn--accent" href="#" id="certDl" style="width:100%">Download Sertifikat PDF</a></div>';
    document.body.appendChild(box);
    document.body.classList.add("no-scroll");
    function close() { box.remove(); document.body.classList.remove("no-scroll"); }
    box.querySelector(".lightbox__close").addEventListener("click", close);
    box.addEventListener("click", function (ev) { if (ev.target === box) close(); });
    box.querySelector("#certDl").addEventListener("click", function (ev) {
      ev.preventDefault();
      alert("Berkas " + c.file + " akan tersedia setelah dokumen diunggah ke CMS. Hubungi tim sales untuk salinan resmi saat ini.");
    });
  });

  /* ---------- Document Pack Builder (ZIP) ---------- */
  $("#dpSubmit").addEventListener("click", function () {
    var name = $("#dpName").value.trim(), email = $("#dpEmail").value.trim(), company = $("#dpCompany").value.trim();
    if (!name || !/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email) || !company) {
      alert("Mohon lengkapi Nama, Email Bisnis (format valid), dan Nama Perusahaan terlebih dahulu.");
      return;
    }
    var selected = $$('#docPackOpts input:checked').map(function (i) { return i.value; });
    if (!selected.length) { alert("Pilih minimal satu dokumen untuk diunduh."); return; }
    (window.dataLayer = window.dataLayer || []).push({ event: "document_pack_download", docs: selected });
    alert("Terima kasih, " + name + "! Tautan unduhan Document Pack (.ZIP) berisi " + selected.length + " dokumen telah dikirim ke " + email + ". (Berkas aktual akan tersedia setelah aset diunggah ke CMS.)");
  });

  /* ---------- 360 Showroom hotspots ---------- */
  var positions = [{ top: "30%", left: "20%" }, { top: "60%", left: "45%" }, { top: "25%", left: "70%" }, { top: "65%", left: "85%" }];
  var showroom = $("#showroom");
  window.SHOWROOM_HOTSPOTS.forEach(function (h, i) {
    var dot = document.createElement("button");
    dot.type = "button"; dot.className = "hotspot";
    dot.style.top = positions[i % positions.length].top;
    dot.style.left = positions[i % positions.length].left;
    dot.setAttribute("aria-label", h.label);
    dot.dataset.h = h.key;
    showroom.appendChild(dot);
  });
  showroom.addEventListener("click", function (e) {
    var dot = e.target.closest(".hotspot"); if (!dot) return;
    var h = window.SHOWROOM_HOTSPOTS.filter(function (x) { return x.key === dot.dataset.h; })[0];
    var d = $("#hotspotDesc");
    d.innerHTML = "<h4>" + h.label + "</h4><p>" + h.desc + "</p>";
    d.classList.add("is-open");
  });

  /* ---------- Schema.org Organization (PRD Section 5) ---------- */
  var ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "Organization",
    name: C.name, alternateName: C.altName, url: "https://example.com",
    logo: "https://example.com/images/logo.png", foundingDate: C.founded, description: C.description,
    address: { "@type": "PostalAddress", streetAddress: C.address.street, addressLocality: C.address.city, addressRegion: C.address.region, postalCode: C.address.postal, addressCountry: C.address.country },
    contactPoint: { "@type": "ContactPoint", telephone: C.phone, contactType: "customer service", areaServed: "ID", availableLanguage: "Indonesian" },
    hasCredential: window.CERTIFICATIONS.filter(function (c) { return ["TKDN", "ISO 9001", "ISO 14001"].indexOf(c.code) > -1; })
      .map(function (c) { return { "@type": "EducationalOccupationalCredential", credentialCategory: c.code + " Certified" }; })
  });
  document.head.appendChild(ld);
})();
