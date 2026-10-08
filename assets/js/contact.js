/* =========================================================
   contact.js — Contact Tab Engine
   Semua konten di-render dari contact-data.js
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var D = window.contactData;
  var C = D.companyInfo;

  var nav = $("#nav"), burger = $("#burger");
  burger.addEventListener("click", function () { burger.setAttribute("aria-expanded", String(nav.classList.toggle("is-open"))); });
  window.addEventListener("scroll", function () { $("#hdr").classList.toggle("is-scrolled", window.scrollY > 20); }, { passive: true });

  function deptById(id) { return D.departments.filter(function (d) { return d.id === id; })[0]; }

  /* ---------- 2.1 Contact Routing: quick department cards ---------- */
  function deptCardHTML(d) {
    return '<a class="deptcard" href="https://wa.me/' + d.whatsappNumber + '" target="_blank" rel="noopener" data-ev="whatsapp_click">' +
      '<span class="ico">' + d.icon + "</span><h3>" + d.name + "</h3><p>" + d.description + '</p><span class="num">Chat WhatsApp →</span></a>';
  }

  /* ---------- Real-time office hours status (Section 3: Status Jam Operasional) ---------- */
  function isOpenNow() {
    var now = new Date();
    var day = now.getDay(), hm = now.getHours() * 60 + now.getMinutes();
    function toMin(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }
    var sch = C.workingHours.schedule;
    var slot = [sch.weekday, sch.saturday, sch.sunday].filter(function (s) { return s.days.indexOf(day) > -1; })[0];
    if (!slot || !slot.open) return { open: false, next: nextOpenText(day) };
    var openMin = toMin(slot.open), closeMin = toMin(slot.close);
    if (hm >= openMin && hm < closeMin) return { open: true };
    return { open: false, next: hm < openMin ? "Buka hari ini jam " + slot.open + " WIB" : nextOpenText(day) };
  }
  function nextOpenText(day) {
    var order = [1, 2, 3, 4, 5, 6, 0], names = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    for (var i = 1; i <= 7; i++) {
      var d = (day + i) % 7;
      var sch = C.workingHours.schedule;
      var slot = [sch.weekday, sch.saturday, sch.sunday].filter(function (s) { return s.days.indexOf(d) > -1; })[0];
      if (slot && slot.open) return "Buka " + (i === 1 ? "besok" : names[d]) + " jam " + slot.open + " WIB";
    }
    return "Hubungi Hotline WhatsApp";
  }

  /* ---------- Render halaman ---------- */
  $("#contactRoot").innerHTML =
  '<section class="chero"><div class="wrap">' +
    '<nav class="crumb"><a href="index.html">Home</a> › <span>Contact</span></nav>' +
    "<h1>" + D.header.title + "</h1><p>" + D.header.subtitle + "</p>" +
  "</div></section>" +

  '<section class="pdpsec"><div class="wrap">' +
    "<h2>Saluran Komunikasi Resmi</h2>" +
    '<p class="pdpsec__lead">Pilih departemen yang paling sesuai dengan kebutuhan Anda agar respon lebih cepat dan tepat sasaran.</p>' +
    '<div class="deptgrid">' + D.departments.map(deptCardHTML).join("") + "</div>" +
  "</div></section>" +

  '<section class="pdpsec pdpsec--alt" id="quote"><div class="wrap"><div class="contactgrid">' +

    /* Left column */
    '<div><h2>Kantor &amp; Showroom</h2>' +
      '<div class="infoblock">' +
        "<p><b>🏢 Kantor Pusat</b>" + C.headOffice + "</p>" +
        "<p><b>🖥️ Showroom Uji Coba Display</b>" + C.showroomAddress + "</p>" +
        "<p><b>📞 Telepon</b><a href=\"tel:" + C.phone.replace(/[^\d+]/g, "") + "\">" + C.phone + "</a></p>" +
        "<p><b>✉️ Email</b><a href=\"mailto:" + C.email + "\">" + C.email + "</a></p>" +
      "</div>" +

      '<div class="hoursbox" id="hoursBox">' +
        "<h4>🕒 Jam Operasional</h4>" +
        '<div id="statusPill"></div>' +
        "<p>" + C.workingHours.days + "</p><p>" + C.workingHours.saturday + "</p>" +
        '<p class="muted">' + C.workingHours.sunday + "</p>" +
      "</div>" +

      '<button class="btn btn--accent" id="bookBtn" type="button" style="width:100%;margin-bottom:20px">📅 Jadwalkan Kunjungan ke Showroom</button>' +

      '<div class="mapbox"><iframe title="Lokasi Showroom" src="' + C.googleMapsEmbedUrl + '" loading="lazy" allowfullscreen></iframe></div>' +
      '<div class="mapbtns"><a class="btn btn--line" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(C.googleMapsDirectionQuery) + '" target="_blank" rel="noopener">Buka di Google Maps</a></div>' +

      '<div class="socialrow">' + D.socialChannels.map(function (s) {
        return '<a class="socialitem" href="' + s.url + '" target="_blank" rel="noopener"><span class="ico2">' +
          (s.key === "youtube" ? "▶️" : s.key === "instagram" ? "📷" : "🔗") + "</span><span><b>" + s.label + " — " + s.handle + "</b><span>" + s.desc + "</span></span></a>";
      }).join("") + "</div>" +

      '<div class="callbackbox"><h4>📲 Request Call Back</h4><p>Sedang buru-buru? Tim sales kami akan menelepon balik dalam 15–30 menit.</p>' +
        '<form class="callbackrow" id="callbackForm"><input type="text" id="cbName" placeholder="Nama" required>' +
        '<input type="tel" id="cbPhone" placeholder="Nomor HP" required>' +
        '<button class="btn btn--accent" type="submit">Minta Ditelepon</button></form>' +
        '<div id="callbackMsg"></div>' +
      "</div>" +
    "</div>" +

    /* Right column: WA form */
    '<div class="waformbox"><h2>Kirim Pesan via WhatsApp</h2>' +
      '<p class="lead">Pilih departemen dan isi form di bawah untuk tersambung langsung dengan tim kami di WhatsApp.</p>' +
      '<form id="waForm">' +
        "<label>Kategori Keperluan</label><select id=\"waCategory\">" +
          D.categories.map(function (c) { return "<option>" + c + "</option>"; }).join("") + "</select>" +
        '<label>Departemen Tujuan</label><div class="deptpicker" id="deptPicker">' +
          D.departments.map(function (d, i) {
            return '<label data-active="' + (i === 0) + '"><input type="radio" name="deptChoice" value="' + d.id + '"' + (i === 0 ? " checked" : "") + "><span><b>" + d.icon + " " + d.name + "</b><span>" + d.description + "</span></span></label>";
          }).join("") + "</div>" +
        '<label for="waName">Nama Lengkap *</label><input id="waName" placeholder="Contoh: Budi Santoso" required>' +
        '<label for="waCompany">Nama Perusahaan / Instansi</label><input id="waCompany" placeholder="Contoh: PT Maju Bersama / Dinas Perhubungan">' +
        '<label for="waMsg">Pesan / Detail Kebutuhan *</label><textarea id="waMsg" placeholder="Sebutkan jenis videotron (Indoor/Outdoor), perkiraan ukuran (misal: 3x2 meter), atau pertanyaan lainnya..." required></textarea>' +
        '<button class="btn--wa2" type="submit" style="margin-top:20px">💬 Kirim Pesan via WhatsApp</button>' +
      "</form></div>" +

  "</div></div></section>";

  /* ---------- Paint real-time status ---------- */
  var st = isOpenNow();
  $("#statusPill").innerHTML = '<span class="statuspill ' + (st.open ? "open" : "closed") + '"><span class="dot"></span>' +
    (st.open ? "Buka Sekarang" : "Tutup — " + st.next) + "</span>";

  /* ---------- Category → department auto-suggest ---------- */
  function syncDeptPicker() {
    var cat = $("#waCategory").value;
    var suggested = D.categoryDeptMap[cat];
    if (suggested) {
      var radio = $('input[name="deptChoice"][value="' + suggested + '"]');
      if (radio) radio.checked = true;
    }
    $$("#deptPicker label").forEach(function (l) {
      l.setAttribute("data-active", String(l.querySelector("input").checked));
    });
  }
  $("#waCategory").addEventListener("change", syncDeptPicker);
  $("#deptPicker").addEventListener("change", function () {
    $$("#deptPicker label").forEach(function (l) { l.setAttribute("data-active", String(l.querySelector("input").checked)); });
  });

  /* ---------- WA Form submit (Section 5: handleSendWhatsApp) ---------- */
  $("#waForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var deptId = $('input[name="deptChoice"]:checked').value;
    var dept = deptById(deptId);
    var name = $("#waName").value.trim(), company = $("#waCompany").value.trim(), category = $("#waCategory").value, msg = $("#waMsg").value.trim();
    var text = "Halo Tim " + dept.name + ",\nSaya ingin berkonsultasi mengenai Videotron:\n\n" +
      "- *Nama:* " + name + "\n- *Perusahaan/Instansi:* " + (company || "-") + "\n" +
      "- *Kategori Keperluan:* " + category + "\n- *Pesan / Detail Kebutuhan:*\n" + msg + "\n\n" +
      "Mohon dapat direspon. Terima kasih.";
    (window.dataLayer = window.dataLayer || []).push({ event: "contact_form_submit", department: deptId });
    window.open("https://wa.me/" + dept.whatsappNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
  });

  /* ---------- Request Call Back ---------- */
  $("#callbackForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#cbName").value.trim(), phone = $("#cbPhone").value.trim();
    var sales = deptById("sales");
    var text = "Halo Tim " + sales.name + ",\nSaya ingin diminta *Call Back*:\n\n- *Nama:* " + name + "\n- *Nomor HP:* " + phone + "\n\nMohon ditelepon balik dalam 15–30 menit. Terima kasih.";
    window.open("https://wa.me/" + sales.whatsappNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    $("#callbackMsg").innerHTML = '<p style="color:#166A45;font-size:.85rem;margin:10px 0 0">✓ Permintaan terkirim. Tim kami akan menghubungi Anda sesegera mungkin.</p>';
    e.target.reset();
  });

  /* ---------- Book a Showroom Visit modal ---------- */
  $("#bookBtn").addEventListener("click", function () {
    var box = document.createElement("div");
    box.className = "modal2";
    var today = new Date().toISOString().split("T")[0];
    box.innerHTML = '<div class="modal2__box"><button class="modal2__close" type="button" aria-label="Tutup">×</button>' +
      "<h3>Jadwalkan Kunjungan Showroom</h3>" +
      "<p>Pilih tanggal kedatangan Anda untuk melihat demo unit videotron secara langsung bersama tim spesialis kami.</p>" +
      '<input type="date" id="bookDate" min="' + today + '">' +
      '<input type="text" id="bookName" placeholder="Nama Lengkap">' +
      '<div class="modal2__acts"><button class="btn btn--line" type="button" id="bookCancel">Batal</button>' +
      '<button class="btn btn--accent" type="button" id="bookConfirm">Konfirmasi Kunjungan</button></div></div>';
    document.body.appendChild(box);
    document.body.classList.add("no-scroll");
    function close() { box.remove(); document.body.classList.remove("no-scroll"); }
    box.querySelector(".modal2__close").addEventListener("click", close);
    box.addEventListener("click", function (ev) { if (ev.target === box) close(); });
    box.querySelector("#bookCancel").addEventListener("click", close);
    box.querySelector("#bookConfirm").addEventListener("click", function () {
      var date = $("#bookDate", box).value, name = $("#bookName", box).value.trim();
      if (!date) { alert("Mohon pilih tanggal kunjungan terlebih dahulu."); return; }
      var sales = deptById("sales");
      var text = "Halo Tim " + sales.name + ",\nSaya ingin *Menjadwalkan Kunjungan Showroom*:\n\n" +
        "- *Nama:* " + (name || "-") + "\n- *Tanggal Kunjungan:* " + date + "\n- *Lokasi:* " + C.showroomAddress + "\n\n" +
        "Mohon dikonfirmasi ketersediaan tim spesialis pada tanggal tersebut. Terima kasih.";
      window.open("https://wa.me/" + sales.whatsappNumber + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      close();
    });
  });

  /* ---------- Schema.org LocalBusiness ---------- */
  var ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "LocalBusiness",
    name: C.name, telephone: C.phone, email: C.email,
    address: { "@type": "PostalAddress", streetAddress: C.headOffice, addressCountry: "ID" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "17:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:30", closes: "14:00" }
    ]
  });
  document.head.appendChild(ld);
})();
