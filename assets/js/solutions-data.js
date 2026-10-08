/* =========================================================
   solutions-data.js — Data 8 Industry Solutions
   Terpisah dari solutions.js agar konten mudah diperbarui
   tanpa menyentuh logika halaman. Product ID merujuk ke
   PRODUCT_CATALOG pada products-data.js.
   ========================================================= */

window.SOLUTIONS = [
  {
    key: "advertising", icon: "📣", label: "Advertising",
    title: "Advertising & DOOH Billboard Solution",
    tagline: "Videotron outdoor untuk bisnis DOOH dan billboard iklan dengan brightness tinggi dan kontrol jarak jauh.",
    audience: ["DOOH Operator", "Advertising Agency", "Billboard Owner", "Media Owner"],
    pain_points: [
      "Visibilitas rendah di bawah terik matahari langsung",
      "Konsumsi listrik membengkak untuk operasional 24 jam",
      "Ketahanan terhadap hujan deras dan petir",
      "Kebutuhan remote content management dari jarak jauh"
    ],
    products: ["mod-12", "mod-16"],
    controller: "Asynchronous Controller (Novastar TB50/TB60 atau Colorlight A200) + Cloud CMS untuk penjadwalan iklan jarak jauh via 4G/5G.",
    extra_hw: "Auto-Brightness Light Sensor, Multi-Functional Card (Power Remote Control & Temperature Monitoring).",
    structure: "Struktur Pole Monopole / Frame Gedung dengan sertifikasi beban angin.",
    special: { key: "dooh-roi", label: "DOOH Revenue & ROI Estimator", desc: "Menghitung potensi pendapatan iklan berdasarkan jumlah spot slot tayang per hari." },
    matrix: { env: "Outdoor", pitch: "P3.91 – P10", bright: "6.500 – 10.000 Nits", reg: "Izin Billboard", edge: "Weatherproof IP68", controller_short: "Asynchronous / Cloud" },
    meta: { title: "Solusi Videotron Outdoor Billboard & DOOH Media | Pasang LED Display Iklan",
      desc: "Solusi lengkap videotron outdoor untuk bisnis DOOH dan billboard iklan. High brightness 10.000 nits, weatherproof IP68, & cloud CMS controller." }
  },
  {
    key: "corporate", icon: "🏢", label: "Corporate",
    title: "Corporate Boardroom & Lobby Solution",
    tagline: "Video wall indoor senyap dan rapi untuk meeting room, lobby dan ruang eksekutif.",
    audience: ["Perusahaan Swasta", "Holding Company", "Coworking Space", "Hotel", "Luxury Office"],
    pain_points: [
      "Pantulan cahaya lampu kantor (glare) pada layar",
      "Tingkat kebisingan fan/kipas mengganggu meeting",
      "Kerapian instalasi seamless tanpa kabel berantakan"
    ],
    products: ["mod-6", "mod-5", "mod-4"],
    controller: "Video Processor All-in-One dengan fitur Wireless Screen Mirroring (AirPlay, Miracast) & Multi-Window Picture-in-Picture (PiP) untuk Zoom/Teams Meeting.",
    extra_hw: "Ambient light sensor untuk auto brightness ruangan.",
    structure: "Ultra-thin Wall Mount Bracket dengan akses Front Magnetic Maintenance.",
    special: { key: "boardroom-guide", label: "Boardroom Screen Size & Viewing Distance Guide", desc: "Rekomendasi rasio ukuran layar sesuai kapasitas tempat duduk ruang rapat." },
    matrix: { env: "Indoor", pitch: "P1.86 – P2.5", bright: "800 – 1.200 Nits", reg: "Standar K3", edge: "Silent Operation", controller_short: "All-in-One Switcher" },
    meta: { title: "Solusi Videotron Indoor Corporate & Boardroom | LED Display Kantor Senyap",
      desc: "Video wall indoor fanless silent untuk meeting room dan lobby korporat, lengkap wireless screen mirroring dan front maintenance." }
  },
  {
    key: "government", icon: "🏛️", label: "Government",
    title: "Government & Public Institution Solution",
    tagline: "Solusi LED Display bersertifikat TKDN untuk kementerian, BUMN dan instansi pemerintah.",
    audience: ["Kementerian", "BUMN", "Lembaga Negara", "Pemprov / Pemkab", "Rumah Sakit Daerah"],
    pain_points: [
      "Kepatuhan regulasi pengadaan barang/jasa pemerintah",
      "Persyaratan nilai TKDN minimum",
      "Keandalan operasional jangka panjang",
      "Transparansi anggaran & dokumentasi teknis"
    ],
    products: ["mod-12", "mod-6", "mod-8"],
    controller: "Certified Controller dengan dokumentasi lengkap untuk keperluan audit pengadaan.",
    extra_hw: "Sertifikat TKDN, ISO 9001, ISO 14001, CE, RoHS.",
    structure: "Struktur mengikuti spesifikasi teknis pengadaan, mendukung e-Katalog / LPSE.",
    special: { key: "tkdn-doc", label: "TKDN & Procurement Document Generator", desc: "Membuat draft spesifikasi teknis pengadaan mencakup sertifikasi TKDN, garansi dan syarat teknis, siap diunduh PDF/Word." },
    matrix: { env: "Indoor / Outdoor", pitch: "P2.5 – P3.91", bright: "1.200 – 6.500 Nits", reg: "Wajib TKDN", edge: "Legal Compliance", controller_short: "Certified Controller" },
    meta: { title: "Solusi Videotron TKDN Pemerintah & Instansi | Pengadaan e-Katalog LPSE",
      desc: "Penyedia solusi LED Display terpercaya untuk instansi pemerintah & BUMN. Lulus sertifikasi TKDN, ISO, & siap pengadaan via e-Katalog." }
  },
  {
    key: "retail", icon: "🛍️", label: "Retail",
    title: "Retail & Mall Showcase Solution",
    tagline: "LED Display transparan dan indoor untuk etalase mall, showroom dan chain store.",
    audience: ["Department Store", "Luxury Brand Showroom", "Supermarket", "Chain Store", "Cafe / Restaurant"],
    pain_points: [
      "Estetika arsitektur toko harus tetap terjaga",
      "Pencahayaan alami kaca depan mall yang terhalangi",
      "Impresi visual pelanggan yang kurang maksimal"
    ],
    products: ["mod-9", "mod-8"],
    controller: "Retail Cloud CMS — Centralized Retail Content Scheduler untuk mengubah konten di seluruh cabang secara serentak.",
    extra_hw: "Frame lightweight untuk instalasi pada kaca etalase.",
    structure: "Mounting kaca (glass mounting) dengan beban ringan, tidak menutup pandangan dari luar.",
    special: { key: "glass-visualizer", label: "Interactive Glass Window Transparency Visualizer", desc: "Simulasi tampilan toko sebelum dan sesudah dipasang Transparent LED." },
    matrix: { env: "Indoor Glass / Shop", pitch: "P3.91 Trans – P7.8", bright: "4.000 – 5.000 Nits", reg: "Izin Mall", edge: "High Transparency", controller_short: "Retail Cloud CMS" },
    meta: { title: "Solusi Videotron Transparent Retail & Mall | LED Display Etalase Kaca",
      desc: "Transparent LED hingga 85% untuk etalase mall dan showroom retail, lengkap Centralized Retail Content Scheduler." }
  },
  {
    key: "education", icon: "🎓", label: "Education",
    title: "Education & Auditorium Solution",
    tagline: "LED Display untuk auditorium kampus dan gedung serbaguna dengan jarak pandang bervariasi.",
    audience: ["Universitas", "Sekolah Internasional", "Gedung Serbaguna", "Yayasan Pendidikan"],
    pain_points: [
      "Ruangan auditorium luas dengan jarak pandang sangat bervariasi",
      "Penggunaan multi-sumber (laptop dosen, kamera panggung, dokumen presentasi)"
    ],
    products: ["mod-6", "mod-8"],
    controller: "Seamless integration dengan Sound System Auditorium, Wireless Podium Presentation System, & PTZ Tracking Camera.",
    extra_hw: "Dukungan multi-input untuk presentasi dan siaran panggung.",
    structure: "Kabinet panggung dengan opsi curved installation atau hanging structure.",
    special: { key: "distance-calc", label: "Auditorium Distance-to-Pitch Calculator", desc: "Menentukan pixel pitch ideal berdasarkan baris kursi paling depan hingga paling belakang." },
    matrix: { env: "Indoor", pitch: "P2.5 – P3.91", bright: "1.200 – 1.500 Nits", reg: "Standar Aula", edge: "Multi-Source Input", controller_short: "AV Integration" },
    meta: { title: "Solusi Videotron Indoor Auditorium & Kampus | LED Display Pendidikan",
      desc: "LED Display untuk auditorium dan gedung serbaguna pendidikan, dengan kalkulator jarak pandang dan integrasi sistem AV." }
  },
  {
    key: "event", icon: "🎪", label: "Event",
    title: "Event & Stage Rental Solution",
    tagline: "Panel LED rental ringan dan cepat pasang untuk konser, panggung dan pameran.",
    audience: ["Event Organizer (EO)", "Concert Promoter", "Wedding Organizer", "Rental House"],
    pain_points: [
      "Waktu setup panggung sangat terbatas",
      "Daya tahan panel akibat sering bongkar-pasang",
      "Proteksi sudut panel dari benturan saat mobilisasi"
    ],
    products: ["mod-7", "mod-12"],
    controller: "Seamless LED Video Switcher dengan fade-in/fade-out, freeze, dan blackout button.",
    extra_hw: "Fast-Lock Mechanism, Corner Protection, Interlock Curve (-10° hingga +10°), Flight Case Packaging.",
    structure: "Rangka truss panggung dengan rigging point terukur.",
    special: { key: "assembly-calc", label: "Fast Assembly Time & Rigging Load Calculator", desc: "Estimasi waktu pemasangan dan beban gantung rangka panggung." },
    matrix: { env: "Indoor / Outdoor", pitch: "P2.9 – P3.91", bright: "4.500 – 5.500 Nits", reg: "Standar Safety", edge: "Fast Assembly", controller_short: "Live Event Switcher" },
    meta: { title: "Solusi Videotron Rental Event & Panggung | Sewa LED Display Konser",
      desc: "Panel LED rental fast-lock untuk konser, panggung dan pameran, lengkap kalkulator waktu pemasangan dan beban rigging." }
  },
  {
    key: "stadium", icon: "🏟️", label: "Stadium",
    title: "Stadium & Sports Arena Solution",
    tagline: "LED perimeter dan scoreboard tahan benturan untuk stadion dan arena olahraga.",
    audience: ["Pengelola Stadion Sepak Bola", "Gelanggang Olahraga (GOR)", "Arena Basket", "Lapangan Tenis"],
    pain_points: [
      "Keamanan atlet saat terbentur papan skor",
      "Rekaman siaran langsung TV yang bergaris (flicker)",
      "Paparan hujan dan debu pada instalasi outdoor"
    ],
    products: ["mod-16", "mod-9"],
    controller: "High-Cap Matrix Switch yang menangani banyak input kamera siaran secara simultan.",
    extra_hw: "Soft Rubber Mask Protection, Soft Top Protection Cushion, Adjustable Footing (75°–90°). Dual Power & Signal Backup Loop System.",
    structure: "Rangka perimeter lapangan dengan proteksi benturan penuh.",
    special: { key: "safety-diagram", label: "Stadium Perimeter Safety & Signal Redundancy Diagram", desc: "Diagram interaktif jalur redundansi daya dan sinyal agar layar tetap menyala jika satu jalur kabel putus." },
    matrix: { env: "Indoor / Outdoor", pitch: "P0.9 – P1.25", bright: "4.500 – 5.500 Nits", reg: "Standar Safety", edge: "Fast Assembly", controller_short: "High-Cap Matrix Switch" },
    meta: { title: "Solusi Videotron Perimeter Stadion & Arena Olahraga | LED Anti Flicker 7680Hz",
      desc: "LED perimeter dan scoreboard tahan benturan atlet, refresh rate 7.680 Hz bebas flicker untuk siaran TV slow-motion." }
  },
  {
    key: "control-room", icon: "🖥️", label: "Control Room",
    title: "Control Room & Command Center Solution",
    tagline: "Video wall fine pitch seamless untuk command center dan monitoring 24/7.",
    audience: ["Command Center Kepolisian/Militer", "Traffic Control (ATCS)", "Monitoring Tambang/Energi", "Data Center BUMN"],
    pain_points: [
      "Operasional nonstop 24 jam × 7 hari tanpa henti",
      "Kelelahan mata operator akibat brightness tidak sesuai",
      "Garis penyambung (bezel) yang memotong data peta/grafik"
    ],
    products: ["mod-1", "mod-2", "mod-4"],
    controller: "Video Wall Processor skala besar (Matrix Switcher) yang mampu menangani puluhan CCTV input, GIS mapping, dan dashboard analytics.",
    extra_hw: "Hot-swappable Redundant Power Supply & Redundant Controller Card.",
    structure: "Teknologi panel COB (Chip on Board) / GOB (Glue on Board) anti-benturan & anti-debu.",
    special: { key: "redundancy-viz", label: "24/7 Redundancy & Mission-Critical Architecture Visualizer", desc: "Visualisasi arsitektur redundansi daya dan controller untuk operasional mission-critical tanpa downtime." },
    matrix: { env: "Indoor", pitch: "P0.9 – P1.25", bright: "600 – 800 Nits", reg: "Sertifikasi 24/7", edge: "Zero Seamless & COB", controller_short: "High-Cap Matrix Switch" },
    meta: { title: "Solusi Video Wall Command Center & Control Room 24/7 | Fine Pitch COB LED",
      desc: "Solusi video wall ultra-fine pitch tanpa garis sekat (seamless) untuk command center, CCTV monitoring & control room operasional 24/7." }
  }
];

/* ---------- Wizard: opsi & aturan rekomendasi (PRD Section 5.1) ---------- */
window.WIZARD_STEPS = {
  step1: [
    { v: "advertising", l: "Advertising" }, { v: "corporate", l: "Corporate" },
    { v: "government", l: "Government" }, { v: "retail", l: "Retail" },
    { v: "education", l: "Education" }, { v: "event", l: "Event" },
    { v: "stadium", l: "Stadium" }, { v: "control-room", l: "Control Room" }
  ],
  step2: [
    { v: "indoor-close", l: "Indoor < 2 meter" },
    { v: "indoor-far", l: "Indoor 2–5 meter" },
    { v: "outdoor", l: "Outdoor Roadside" },
    { v: "perimeter", l: "Stadium Perimeter" },
    { v: "glass", l: "Glass Window" }
  ],
  step3: [
    { v: "tkdn", l: "Wajib Sertifikat TKDN" },
    { v: "fast", l: "Kemudahan Bongkar Pasang" },
    { v: "glassfeat", l: "Transparan Kaca" },
    { v: "silent", l: "Operasi 24/7 Silent" },
    { v: "ip68", l: "Tahan Hujan IP68" }
  ]
};

/* Peta id produk representatif per kombinasi env+feature, dipakai wizard sebagai fallback
   ketika solusi industri terpilih tidak memiliki produk paling cocok dengan preferensi fitur. */
window.WIZARD_FEATURE_PRODUCT = {
  tkdn: "mod-12", fast: "mod-7", glassfeat: "mod-9",
  silent: "mod-5", ip68: "mod-12"
};
