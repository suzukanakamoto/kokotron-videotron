/* =========================================================
   hwref.js — Database Referensi Modul & Hardware (Products Tab)
   Membaca data dari window.BOM_REFERENCE (assets/js/bom-reference-data.js,
   diekstrak dari Draft_Format_Penawaran_LED Excel internal).

   Tujuan: menyediakan referensi teknis modul LED, receiving card,
   controller/sending box, power supply, box power dan cabinet yang
   kami dukung — supaya tim procurement/engineering klien bisa
   mengecek kompatibilitas hardware langsung dari Products Tab.
   Untuk estimasi harga dinamis berdasarkan jumlah cabinet, lihat
   Simulator pada halaman Detail Produk (product-detail.js).

   Catatan: TIDAK memuat harga satuan — lihat disclaimer pada UI.
   ========================================================= */
(function () {
  "use strict";
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var on = function (el, evt, fn) { if (el) el.addEventListener(evt, fn); };

  var BOMREF = window.BOM_REFERENCE;
  var tableWrap = $("#hwrefTableWrap");
  var tabBox = $("#hwrefTabs");
  var searchInput = $("#hwrefSearch");
  var countEl = $("#hwrefCount");

  // Jika data referensi atau markup-nya tidak ada, section ini no-op
  // dengan aman (tidak boleh mengganggu render katalog produk utama).
  if (!BOMREF || !tableWrap || !tabBox) return;

  var TABS = [
    {
      key: "modules", label: "Modul LED", list: BOMREF.modules || [],
      cols: ["Brand", "Model", "Pixel Pitch", "Resolusi Modul", "Refresh Rate", "Environment"],
      row: function (m) { return [m.brand, m.name, m.pitch, m.widthPx + "×" + m.heightPx + " px", m.refreshHz.toLocaleString("id-ID") + " Hz", m.environment]; },
      search: function (m, q) { return (m.brand + " " + m.name + " " + m.pitch).toLowerCase().indexOf(q) > -1; }
    },
    {
      key: "receivingCards", label: "Receiving Card", list: BOMREF.receivingCards || [],
      cols: ["Brand", "Model", "Kapasitas Maksimum"],
      row: function (r) { return [r.brand, r.name, r.maxW + "×" + r.maxH + " px"]; },
      search: function (r, q) { return (r.brand + " " + r.name).toLowerCase().indexOf(q) > -1; }
    },
    {
      key: "controllers", label: "Controller / Sending Box", list: BOMREF.controllers || [],
      cols: ["Brand", "Model", "Jumlah Port"],
      row: function (c) { return [c.brand, c.name, c.ports + " port"]; },
      search: function (c, q) { return (c.brand + " " + c.name).toLowerCase().indexOf(q) > -1; }
    },
    {
      key: "powerSupplies", label: "Power Supply", list: BOMREF.powerSupplies || [],
      cols: ["Model", "Voltage", "Ampere", "Watt"],
      row: function (p) { return [p.name, p.voltage + " V", p.amps + " A", p.watt + " W"]; },
      search: function (p, q) { return p.name.toLowerCase().indexOf(q) > -1; }
    },
    {
      key: "boxPower", label: "Box Power", list: BOMREF.boxPower || [],
      cols: ["Model", "Environment", "Daya", "Luas Maksimum"],
      row: function (b) { return [b.name, b.environment, b.kw + " kW", b.maxSqm + " m²"]; },
      search: function (b, q) { return (b.name + " " + b.environment).toLowerCase().indexOf(q) > -1; }
    },
    {
      key: "cabinets", label: "Cabinet", list: BOMREF.cabinets || [],
      cols: ["Model"],
      row: function (c) { return [c.name]; },
      search: function (c, q) { return c.name.toLowerCase().indexOf(q) > -1; }
    }
  ];

  var state = { tab: "modules", q: "" };

  function currentTab() {
    var t = TABS.filter(function (t) { return t.key === state.tab; })[0];
    return t || TABS[0];
  }

  function paintTabs() {
    tabBox.innerHTML = TABS.map(function (t) {
      return '<button type="button" class="chip hwref__tab" role="tab" data-tab="' + t.key +
        '" aria-selected="' + (t.key === state.tab) + '">' + t.label + " (" + t.list.length + ")</button>";
    }).join("");
  }

  function renderTable() {
    var tab = currentTab();
    var q = state.q.trim().toLowerCase();
    var filteredList = q ? tab.list.filter(function (item) { return tab.search(item, q); }) : tab.list;

    if (countEl) {
      countEl.textContent = "Menampilkan " + filteredList.length + " dari " + tab.list.length + " item";
    }

    if (!filteredList.length) {
      tableWrap.innerHTML = '<div class="hwref__empty">Tidak ada item yang cocok dengan pencarian Anda.</div>';
      return;
    }

    var bodyRows = filteredList.map(function (item) {
      var cells = tab.row(item);
      return "<tr>" + cells.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
    }).join("");

    var head = "<tr>" + tab.cols.map(function (c) { return "<th scope=\"col\">" + c + "</th>"; }).join("") + "</tr>";
    tableWrap.innerHTML = '<div class="hwref__scroll"><table class="spectable hwref__table"><thead>' + head + "</thead><tbody>" + bodyRows + "</tbody></table></div>";
  }

  on(tabBox, "click", function (e) {
    var b = e.target.closest("[data-tab]");
    if (!b) return;
    state.tab = b.dataset.tab;
    state.q = "";
    if (searchInput) searchInput.value = "";
    paintTabs();
    renderTable();
  });

  var searchTimer;
  on(searchInput, "input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.q = searchInput.value;
      renderTable();
    }, 250);
  });

  /* ---------- Init ---------- */
  paintTabs();
  renderTable();
})();
