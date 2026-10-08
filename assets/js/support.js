/* =========================================================
   support.js — Support Tab Engine
   Sub-tab: FAQ, Installation, Maintenance, Warranty, Downloads
   Semua konten di-render dari support-data.js
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var D = window.supportData;
  var WA = D.emergency.waNumber;

  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () { burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))); });
  window.addEventListener("scroll", function () { $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });

  var TABS = [
    { key: "faq", label: "FAQ" },
    { key: "installation", label: "Installation" },
    { key: "maintenance", label: "Maintenance" },
    { key: "warranty", label: "Warranty" },
    { key: "downloads", label: "Download Center" }
  ];

  /* ---------- Render shell ---------- */
  $("#supportRoot").innerHTML =
  '<section class="shero2"><div class="wrap">' +
    '<nav class="crumb"><a href="index.html">Home</a> › <span>Support</span></nav>' +
    "<h1>" + D.hero.title + "</h1><p class=\"sub\">" + D.hero.subtitle + "</p>" +
    '<div class="masterSearch"><input type="search" id="masterSearch" placeholder="Cari masalah, driver, atau topik FAQ..." aria-label="Cari bantuan"></div>' +
  "</div></section>" +

  '<section class="sec"><div class="wrap">' +
    '<div class="qagrid" id="qaGrid"></div>' +
  "</div></section>" +

  '<div class="subnav2"><div class="wrap subnav2__in" id="subnav2"></div></div>' +

  '<section class="sec"><div class="wrap">' +
    '<div class="subpanel" id="panel-faq"><h2>Pertanyaan Sering Diajukan (FAQ)</h2>' +
      '<div class="faqtoolbar"><input type="search" id="faqSearch" placeholder="Cari kata kunci (contoh: TKDN, P2.5, Garansi)...">' +
      '<select id="faqCategory"><option value="Semua">Semua Kategori</option></select></div>' +
      '<div class="faqlist" id="faqList"></div></div>' +

    '<div class="subpanel" id="panel-installation"><h2>Layanan Pemasangan &amp; Konstruksi</h2>' +
      '<p class="pdpsec__lead">Alur pemesanan jasa pemasangan videotron dari tahap perencanaan hingga commissioning test.</p>' +
      '<div class="instwrap"><div>' +
        "<h3>Tahapan Layanan</h3><div id=\"instStages\"></div>" +
        "<h3 style=\"margin-top:24px\">Katalog Layanan Instalasi</h3><div class=\"catalog3\" id=\"instCatalog\"></div>" +
        '<div class="k3note" id="k3Note"></div>' +
      "</div><div>" +
        '<div class="surveyform"><h3>Form Request Survei Lokasi</h3><div id="surveyFormWrap"></div></div>' +
      "</div></div></div>" +

    '<div class="subpanel" id="panel-maintenance"><h2>Pemeliharaan &amp; Laporan Kerusakan</h2>' +
      '<p class="pdpsec__lead">Jika unit videotron Anda mengalami kendala visual atau mati total, silakan buat tiket laporan di bawah ini.</p>' +
      '<div class="mtypegrid" id="mtypeGrid"></div>' +
      "<h3>Paket Service Level Agreement (SLA)</h3>" +
      '<div class="slagrid" id="slaGrid"></div>' +
      '<div class="surveyform" style="max-width:640px"><h3>Formulir Tiket Perbaikan (Trouble Ticket)</h3><div id="ticketFormWrap"></div></div>' +
    "</div>" +

    '<div class="subpanel" id="panel-warranty"><h2>Cek Status Garansi</h2>' +
      '<form class="warrantycheck" id="warrantyForm"><input type="text" id="serialInput" placeholder="Masukkan Serial Number (contoh: SN-VDT-2024-001)">' +
      '<button class="btn btn--accent" type="submit">Cek Garansi</button></form>' +
      '<div id="warrantyResult"></div>' +
      "<h3>Cakupan Garansi per Komponen</h3>" +
      '<table class="scopetable"><thead><tr><th>Komponen</th><th>Masa Garansi</th></tr></thead><tbody id="scopeBody"></tbody></table>' +
      "<h3>Ketentuan Garansi</h3><ul id=\"warrantyTerms\"></ul>" +
      '<div class="surveyform" style="max-width:640px;margin-top:24px"><h3>Formulir Klaim Garansi</h3><div id="claimFormWrap"></div></div>' +
    "</div>" +

    '<div class="subpanel" id="panel-downloads"><h2>Pusat Unduhan &amp; Dokumen</h2>' +
      '<div class="tkdnhub"><div><h3>TKDN &amp; Certificate Hub</h3><p>Verifikasi dan unduh sertifikat resmi TKDN, ISO 9001, ISO 14001, CE, RoHS, dan laporan uji IP65/IP68.</p></div>' +
        '<a class="btn btn--accent" href="about.html#certVault">Buka Certificate Vault →</a></div>' +
      "<h3>Software, Datasheet &amp; Manual Book</h3>" +
      '<div class="dltoolbar"><input type="search" id="dlSearch" placeholder="Cari nama file...">' +
      '<select id="dlCategory"><option value="Semua">Semua Kategori</option></select></div>' +
      '<table class="dltable"><thead><tr><th>Kategori</th><th>Nama File</th><th>Ukuran</th><th>Aksi</th></tr></thead><tbody id="dlBody"></tbody></table>' +
      "<h3>Spare Parts Directory</h3>" +
      '<p class="pdpsec__lead">Katalog komponen pengganti yang kompatibel dengan unit videotron Anda.</p>' +
      '<table class="sparetable"><thead><tr><th>Nama Komponen</th><th>Kompatibel Dengan</th><th>Stok</th><th>Harga</th></tr></thead><tbody id="spareBody"></tbody></table>' +
    "</div>" +
  "</div></section>";

  $("#supportFooter").innerHTML =
  '<div class="support-ftr"><div class="wrap support-ftr__in">' +
    '<div><h3>Emergency Helpdesk</h3><div class="emergency-box">' +
      '<span class="num">' + D.emergency.phone + "</span>" +
      "<p>" + D.emergency.hours + "</p>" +
      '<a class="btn btn--accent" style="margin-top:14px;width:100%;text-align:center" href="https://wa.me/' + WA + '?text=' + encodeURIComponent("Halo, saya butuh bantuan darurat terkait unit videotron saya.") + '" target="_blank" rel="noopener">Chat Emergency Helpdesk</a>' +
    "</div></div>" +
    '<div><h3>Lokasi Service Center</h3><div class="centerlist">' +
      D.serviceCenters.map(function (c) { return '<div class="centeritem"><b>' + c.city + "</b><span>" + c.address + "</span><span>" + c.phone + "</span></div>"; }).join("") +
    "</div></div>" +
  "</div></div>" +
  '<div class="wrap ftr__bottom"><p>© 2026 LumeniX LED Display. All Rights Reserved.</p>' +
  "<p><a href=\"index.html\">Home</a> · <a href=\"about.html\">About Us</a> · <a href=\"contact.html\">Contact</a></p></div>";

  /* ---------- Quick Action Grid ---------- */
  $("#qaGrid").innerHTML = D.quickActions.map(function (q) {
    return '<div class="qacard" data-tab="' + q.tab + '"><span class="ico">' + q.icon + "</span><h3>" + q.title + "</h3><p>" + q.desc + '</p><span class="cta">' + q.cta + " →</span></div>";
  }).join("");
  $("#qaGrid").addEventListener("click", function (e) {
    var c = e.target.closest("[data-tab]"); if (!c) return;
    setTab(c.dataset.tab);
    document.querySelector(".subnav2").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  /* ---------- Sub-nav tabs ---------- */
  $("#subnav2").innerHTML = TABS.map(function (t, i) {
    return '<button type="button" data-t="' + t.key + '" aria-selected="' + (i === 0) + '">' + t.label + "</button>";
  }).join("");
  function setTab(key) {
    $$("#subnav2 button").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.t === key)); });
    $$(".subpanel").forEach(function (p) { p.classList.toggle("is-active", p.id === "panel-" + key); });
    if (history.replaceState) history.replaceState(null, "", "#" + key);
  }
  $("#subnav2").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    setTab(b.dataset.t);
    document.querySelector(".subnav2").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  var initialTab = location.hash.replace("#", "");
  var validTab = TABS.some(function (t) { return t.key === initialTab; });
  $("#panel-" + (validTab ? initialTab : "faq")).classList.add("is-active");
  if (validTab) {
    $$("#subnav2 button").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.t === initialTab)); });
  }

  /* ---------- Master Search (hero) → jump to FAQ + prefill ---------- */
  $("#masterSearch").addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    setTab("faq");
    document.querySelector(".subnav2").scrollIntoView({ behavior: "smooth", block: "start" });
    $("#faqSearch").value = e.target.value;
    $("#faqSearch").dispatchEvent(new Event("input"));
  });

  /* ================= FAQ ================= */
  var faqCategories = Array.from(new Set(D.faqs.map(function (f) { return f.category; })));
  $("#faqCategory").innerHTML += faqCategories.map(function (c) { return '<option value="' + c + '">' + c + "</option>"; }).join("");

  function renderFAQ() {
    var q = $("#faqSearch").value.trim().toLowerCase();
    var cat = $("#faqCategory").value;
    var list = D.faqs.filter(function (f) {
      var matchQ = !q || f.question.toLowerCase().indexOf(q) > -1 || f.answer.toLowerCase().indexOf(q) > -1;
      var matchC = cat === "Semua" || f.category === cat;
      return matchQ && matchC;
    });
    $("#faqList").innerHTML = list.length ? list.map(function (f, i) {
      return '<div class="faqitem" data-i="' + i + '"><button type="button" class="faqitem__q">' +
        '<span><span class="cat">' + f.category + "</span><h3>" + f.question + "</h3></span><span class=\"plus\">+</span></button>" +
        '<div class="faqitem__a"><p>' + f.answer + "</p></div></div>";
    }).join("") : '<p class="faq-empty">Tidak ada hasil yang sesuai dengan pencarian Anda.</p>';
  }
  $("#faqSearch").addEventListener("input", renderFAQ);
  $("#faqCategory").addEventListener("change", renderFAQ);
  $("#faqList").addEventListener("click", function (e) {
    var q = e.target.closest(".faqitem__q"); if (!q) return;
    q.parentElement.classList.toggle("is-open");
  });
  renderFAQ();

  /* ================= INSTALLATION ================= */
  $("#instStages").innerHTML = D.installationServices.map(function (s) {
    return '<div class="inststage"><h4>' + s.title + "</h4><p>" + s.description + "</p></div>";
  }).join("");
  $("#instCatalog").innerHTML = D.installationCatalog.map(function (c) {
    return "<div><b>" + c.title + "</b><span>" + c.desc + "</span></div>";
  }).join("");
  $("#k3Note").textContent = "⚠ Prosedur K3: " + D.k3Note;

  $("#surveyFormWrap").innerHTML =
    '<form id="surveyForm">' +
      '<label for="svName">Nama Lengkap</label><input id="svName" required>' +
      '<label for="svCompany">Nama Perusahaan / Instansi</label><input id="svCompany" required>' +
      '<label for="svPhone">Nomor WhatsApp/HP</label><input id="svPhone" type="tel" required>' +
      '<label for="svLoc">Alamat Lokasi</label><input id="svLoc" required>' +
      '<label for="svType">Jenis Ruang</label><select id="svType">' +
        '<option value="Indoor">Indoor Videotron</option><option value="Outdoor">Outdoor Videotron</option>' +
        '<option value="Semi-Outdoor">Semi-Outdoor Videotron</option><option value="Custom">Custom Rigging / Cube LED</option></select>' +
      '<label for="svDim">Perkiraan Dimensi LED (opsional)</label><input id="svDim" placeholder="mis. 6m x 3m">' +
      '<label for="svNotes">Catatan Khusus</label><textarea id="svNotes" rows="3"></textarea>' +
      '<label>Unggah Foto/Video Kondisi Lapangan (opsional)</label>' +
      '<div class="filedrop" id="svFileDrop">Klik atau seret berkas ke sini</div>' +
      '<input type="file" id="svFile" accept="image/*,video/*" multiple style="display:none">' +
      '<button class="btn btn--accent" type="submit" style="width:100%;margin-top:18px">Kirim Permintaan Survei</button>' +
    "</form>";
  $("#svFileDrop").addEventListener("click", function () { $("#svFile").click(); });
  $("#svFile").addEventListener("change", function () {
    $("#svFileDrop").textContent = this.files.length ? this.files.length + " berkas dipilih" : "Klik atau seret berkas ke sini";
  });
  $("#surveyForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#svName").value, company = $("#svCompany").value, phone = $("#svPhone").value, loc = $("#svLoc").value, type = $("#svType").value, dim = $("#svDim").value, notes = $("#svNotes").value;
    var text = "Halo Admin Support, saya ingin mengajukan *Request Survei Lokasi*:\n\n" +
      "• Nama: " + name + "\n• Perusahaan: " + company + "\n• No. HP/WA: " + phone + "\n" +
      "• Lokasi: " + loc + "\n• Jenis Ruang: " + type + (dim ? "\n• Perkiraan Dimensi: " + dim : "") +
      (notes ? "\n• Catatan: " + notes : "") + "\n\nMohon dijadwalkan survei teknis. Terima kasih.";
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    $("#surveyFormWrap").innerHTML = '<div class="success-msg">✓ Permintaan survei berhasil dikirim! Tim teknis kami akan menghubungi Anda dalam 1×24 jam.</div>';
  });

  /* ================= MAINTENANCE ================= */
  $("#mtypeGrid").innerHTML = D.maintenanceTypes.map(function (m) {
    return '<div class="mtypebox"><h4>' + m.title + "</h4><ul>" + m.items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul></div>";
  }).join("");

  var slaSelected = D.slaPackages[0].key;
  $("#slaGrid").innerHTML = D.slaPackages.map(function (s) {
    return '<div class="slacard" data-sla="' + s.key + '" aria-pressed="' + (s.key === slaSelected) + '"><span class="tag">' + s.tag + "</span><h4>" + s.name + "</h4><p>" + s.desc + "</p></div>";
  }).join("");
  $("#slaGrid").addEventListener("click", function (e) {
    var c = e.target.closest("[data-sla]"); if (!c) return;
    slaSelected = c.dataset.sla;
    $$("#slaGrid .slacard").forEach(function (x) { x.setAttribute("aria-pressed", String(x.dataset.sla === slaSelected)); });
  });

  $("#ticketFormWrap").innerHTML =
    '<form id="ticketForm">' +
      '<label for="tkSerial">Nomor Serial Unit / ID Kontrak</label><input id="tkSerial" required>' +
      '<label for="tkLoc">Lokasi Videotron</label><input id="tkLoc" required>' +
      '<label for="tkIssue">Pilih Kendala</label><select id="tkIssue">' + D.maintenanceIssues.map(function (i) { return "<option>" + i + "</option>"; }).join("") + "</select>" +
      '<label for="tkDesc">Deskripsi Detail Kendala</label><textarea id="tkDesc" rows="4" required></textarea>' +
      "<label>Jenis Penanganan</label>" +
      '<div class="onsite-toggle" id="onsiteToggle">' +
        '<button type="button" data-v="onsite" aria-pressed="true">On-Site Support</button>' +
        '<button type="button" data-v="service-center" aria-pressed="false">Send-to-Service Center</button>' +
      "</div>" +
      '<button class="btn btn--accent" type="submit" style="width:100%;margin-top:6px">Kirim Laporan Kerusakan (Trouble Ticket)</button>' +
    "</form>";
  var onsiteVal = "onsite";
  $("#onsiteToggle").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    onsiteVal = b.dataset.v;
    $$("#onsiteToggle button").forEach(function (x) { x.setAttribute("aria-pressed", String(x.dataset.v === onsiteVal)); });
  });
  $("#ticketForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var sla = D.slaPackages.filter(function (s) { return s.key === slaSelected; })[0];
    var text = "Halo Admin Support, saya ingin melaporkan *Trouble Ticket*:\n\n" +
      "• Serial/ID Kontrak: " + $("#tkSerial").value + "\n• Lokasi: " + $("#tkLoc").value +
      "\n• Kendala: " + $("#tkIssue").value + "\n• Deskripsi: " + $("#tkDesc").value +
      "\n• Penanganan: " + (onsiteVal === "onsite" ? "On-Site Support" : "Send-to-Service Center") +
      "\n• Paket SLA: " + sla.name + "\n\nMohon segera ditindaklanjuti. Terima kasih.";
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    $("#ticketFormWrap").innerHTML = '<div class="success-msg">✓ Tiket berhasil dikirim! Tim teknis akan merespons sesuai SLA yang dipilih (' + sla.name + ").</div>";
  });

  /* ================= WARRANTY ================= */
  $("#scopeBody").innerHTML = D.warrantyScope.map(function (s) { return "<tr><td>" + s.part + "</td><td>" + s.period + "</td></tr>"; }).join("");
  $("#warrantyTerms").innerHTML = D.warrantyRules.coverageTerms.map(function (t) { return "<li>" + t + "</li>"; }).join("");

  $("#warrantyForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var sn = $("#serialInput").value.trim();
    if (!sn) return;
    var found = D.warrantyDemo.filter(function (w) { return w.serialNumber.toLowerCase() === sn.toLowerCase(); })[0];
    var box = $("#warrantyResult");
    if (!found) {
      box.innerHTML = '<div class="wresultbox expired"><h3>Serial Number Tidak Ditemukan</h3>' +
        '<p>Pastikan format Serial Number benar (contoh: SN-VDT-2024-001), atau hubungi tim Support kami untuk verifikasi manual.</p>' +
        '<a class="btn btn--accent" href="https://wa.me/' + WA + '?text=' + encodeURIComponent("Halo, saya ingin verifikasi manual status garansi Serial Number: " + sn) + '" target="_blank" rel="noopener">Verifikasi via WhatsApp</a></div>';
      return;
    }
    var isActive = found.status === "Aktif";
    box.innerHTML = '<div class="wresultbox' + (isActive ? "" : " expired") + '"><h3>Detail Garansi Unit</h3><dl>' +
      "<dt>Serial Number</dt><dd>" + found.serialNumber + "</dd>" +
      "<dt>Produk</dt><dd>" + found.productName + "</dd>" +
      "<dt>Status</dt><dd class=\"" + (isActive ? "status-active" : "status-expired") + "\">" + found.status + "</dd>" +
      "<dt>Tanggal Pembelian</dt><dd>" + found.purchaseDate + "</dd>" +
      "<dt>Masa Berlaku S/D</dt><dd>" + found.warrantyExpiry + "</dd>" +
      "<dt>Cakupan</dt><dd>" + found.coverage + "</dd>" +
      "</dl></div>";
  });

  $("#claimFormWrap").innerHTML =
    '<form id="claimForm">' +
      '<label for="clSerial">Serial Number</label><input id="clSerial" required>' +
      '<label for="clName">Nama Pemohon</label><input id="clName" required>' +
      '<label for="clIssue">Gejala Kerusakan</label><textarea id="clIssue" rows="3" required></textarea>' +
      '<button class="btn btn--accent" type="submit" style="width:100%;margin-top:6px">Ajukan Klaim Garansi</button>' +
    "</form>";
  $("#claimForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var text = "Halo Admin Support, saya ingin mengajukan *Klaim Garansi*:\n\n" +
      "• Serial Number: " + $("#clSerial").value + "\n• Nama Pemohon: " + $("#clName").value +
      "\n• Gejala Kerusakan: " + $("#clIssue").value + "\n\nMohon proses pengiriman modul pengganti / penjadwalan teknisi. Terima kasih.";
    window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    $("#claimFormWrap").innerHTML = '<div class="success-msg">✓ Klaim garansi berhasil diajukan! Tim kami akan memverifikasi dan menghubungi Anda segera.</div>';
  });

  /* ================= DOWNLOADS ================= */
  var dlCategories = Array.from(new Set(D.downloadCenter.map(function (d) { return d.category; })));
  $("#dlCategory").innerHTML += dlCategories.map(function (c) { return '<option value="' + c + '">' + c + "</option>"; }).join("");

  function renderDownloads() {
    var q = $("#dlSearch").value.trim().toLowerCase();
    var cat = $("#dlCategory").value;
    var list = D.downloadCenter.filter(function (d) {
      var matchQ = !q || d.name.toLowerCase().indexOf(q) > -1;
      var matchC = cat === "Semua" || d.category === cat;
      return matchQ && matchC;
    });
    $("#dlBody").innerHTML = list.length ? list.map(function (d) {
      return "<tr><td><span class=\"catpill\">" + d.category + "</span></td><td><strong>" + d.name + "</strong></td><td>" + d.fileSize + "</td>" +
        '<td><a class="dlbtn" href="' + d.downloadUrl + '" download>Download ⬇</a></td></tr>';
    }).join("") : '<tr><td colspan="4" style="text-align:center;color:var(--muted);padding:24px">Tidak ada berkas yang sesuai.</td></tr>';
  }
  $("#dlSearch").addEventListener("input", renderDownloads);
  $("#dlCategory").addEventListener("change", renderDownloads);
  renderDownloads();

  $("#spareBody").innerHTML = D.spareParts.map(function (s) {
    var ready = s.stock === "Ready Stock";
    return "<tr><td><strong>" + s.name + "</strong></td><td>" + s.compatible + "</td>" +
      '<td><span class="stockbadge ' + (ready ? "ready" : "indent") + '">' + s.stock + "</span></td><td>" + s.price + "</td></tr>";
  }).join("");

  /* ---------- Downloads link intercept: real files not yet uploaded ---------- */
  $("#dlBody").addEventListener("click", function (e) {
    var a = e.target.closest("a.dlbtn"); if (!a) return;
    e.preventDefault();
    alert("Berkas ini akan tersedia setelah diunggah ke server unduhan. Hubungi tim Support jika membutuhkan segera.");
  });
})();
