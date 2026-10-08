/* =========================================================
   projects-data.js — Portofolio Proyek Videotron
   Struktur mengikuti Data Schema PRD Section 3 (project-item).
   products_used[] adalah foreign key ke PRODUCT_CATALOG
   pada products-data.js.
   system_components[] diberi field "type" (controller / structure /
   software / support) agar BOM Breakdown (Section 5.4) bisa
   dikelompokkan otomatis tanpa hardcode per proyek.
   ========================================================= */

window.PROJECT_CATALOG = [
  {
    project_id: "proj-jakarta-dooh-01",
    slug: "videotron-3d-naked-eye-plaza-senayan",
    title: "Instalasi Curved 3D Naked-Eye Outdoor LED Plaza Senayan",
    client_name: "PT Nusa Media Advertising",
    industry_segment: "advertising",
    location: { city: "Jakarta Selatan", province: "DKI Jakarta", coordinates: { lat: -6.2253, lng: 106.7992 } },
    completion_date: "2025-10",
    products_used: ["mod-12"],
    system_components: [
      { type: "controller", name: "Novastar VX1000 All-In-One Controller" },
      { type: "structure", name: "Custom Curve Waterproof Steel Frame Structure" },
      { type: "software", name: "Cloud Content Management System (4G)" },
      { type: "support", name: "Auto-Brightness Light Sensor" }
    ],
    structure_type: "Custom Curved Facade Mount",
    metrics: { screen_size_m: "12m x 6m", total_area_sqm: 72, total_resolution: "3072 x 1536 Pixels", installation_time_days: 14 },
    challenge: "Pemasangan di sudut gedung melengkung dengan tantangan paparan angin kencang dan batasan bobot struktur lama.",
    solution: "Menggunakan cabinet aluminium die-cast LumeniX Titan P3.91 yang berbobot ringan dengan sudut melengkung kustom +15° serta proteksi IP68.",
    media: { hero_image: "/images/projects/senayan-3d-hero.webp", before_image: "/images/projects/senayan-before.webp",
      after_image: "/images/projects/senayan-after.webp", gallery: ["/images/projects/senayan-night.webp", "/images/projects/senayan-structure.webp"],
      video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Kualitas tampilan 3D sangat tajam bahkan saat siang terik. Proses instalasi selesai 3 hari lebih cepat dari jadwal.",
      author: "Budi Santoso", position: "Chief Technical Officer, PT Nusa Media Advertising" }
  },
  {
    project_id: "proj-semarang-dooh-02",
    slug: "billboard-dooh-tol-semarang",
    title: "Digital Billboard DOOH Gerbang Tol Semarang",
    client_name: "CV Cipta Media Reklame",
    industry_segment: "advertising",
    location: { city: "Semarang", province: "Jawa Tengah", coordinates: { lat: -6.9932, lng: 110.4203 } },
    completion_date: "2025-06",
    products_used: ["mod-16"],
    system_components: [
      { type: "controller", name: "Novastar Asynchronous Cloud Controller" },
      { type: "structure", name: "Monopole Steel Structure 12 Meter" },
      { type: "software", name: "Cloud CMS Multi-Site Scheduler" },
      { type: "support", name: "PDU Smart Power Distribution" }
    ],
    structure_type: "Monopole",
    metrics: { screen_size_m: "9.6m x 4.8m", total_area_sqm: 46, total_resolution: "960 x 480 Pixels", installation_time_days: 10 },
    challenge: "Lokasi di median jalan tol dengan waktu kerja terbatas hanya pada jam non-sibuk demi keselamatan lalu lintas.",
    solution: "Prefabrikasi seluruh cabinet di workshop, perakitan on-site dipercepat dengan sistem modular quick-lock.",
    media: { hero_image: "/images/projects/semarang-billboard-hero.webp", before_image: "/images/projects/semarang-before.webp",
      after_image: "/images/projects/semarang-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Okupansi slot iklan penuh sejak bulan pertama tayang berkat lokasi dan kecerahan layar yang optimal.",
      author: "Andi Wijaya", position: "Direktur Operasional, CV Cipta Media Reklame" }
  },
  {
    project_id: "proj-jakarta-corp-01",
    slug: "videowall-lobby-menara-bumn-jakarta",
    title: "Video Wall Fine Pitch Lobby Menara BUMN",
    client_name: "PT Graha Nusantara Persada",
    industry_segment: "corporate",
    location: { city: "Jakarta Pusat", province: "DKI Jakarta", coordinates: { lat: -6.1864, lng: 106.8317 } },
    completion_date: "2025-03",
    products_used: ["mod-4"],
    system_components: [
      { type: "controller", name: "Video Processor All-in-One dengan Wireless Screen Mirroring" },
      { type: "structure", name: "Ultra-thin Wall Mount Bracket" },
      { type: "software", name: "Corporate Content Scheduler" },
      { type: "support", name: "Ambient Light Sensor" }
    ],
    structure_type: "Wall-mount",
    metrics: { screen_size_m: "6m x 3.4m", total_area_sqm: 20.4, total_resolution: "3200 x 1800 Pixels", installation_time_days: 7 },
    challenge: "Pantulan cahaya lampu lobby (glare) dan kebutuhan instalasi tanpa kabel terlihat pada dinding marmer.",
    solution: "Cabinet fine pitch COB dipasang dengan bracket ultra-tipis dan jalur kabel tersembunyi di balik panel gypsum khusus.",
    media: { hero_image: "/images/projects/bumn-lobby-hero.webp", before_image: "/images/projects/bumn-before.webp",
      after_image: "/images/projects/bumn-after.webp", gallery: ["/images/projects/bumn-detail.webp"], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Tampilan lobby jadi jauh lebih modern dan mewakili citra perusahaan kepada tamu korporat.",
      author: "Rina Kartika", position: "Head of General Affairs, PT Graha Nusantara Persada" }
  },
  {
    project_id: "proj-bandung-corp-02",
    slug: "meeting-room-coworking-bandung",
    title: "Indoor LED Meeting Room Coworking Space Bandung",
    client_name: "WorkHub Bandung",
    industry_segment: "corporate",
    location: { city: "Bandung", province: "Jawa Barat", coordinates: { lat: -6.9175, lng: 107.6191 } },
    completion_date: "2025-01",
    products_used: ["mod-6"],
    system_components: [
      { type: "controller", name: "All-in-One Switcher dengan HDMI/USB-C Input" },
      { type: "structure", name: "Fixed Wall Frame" },
      { type: "support", name: "Silent Cooling Fan Module" }
    ],
    structure_type: "Wall-mount",
    metrics: { screen_size_m: "3.2m x 1.8m", total_area_sqm: 5.76, total_resolution: "1280 x 720 Pixels", installation_time_days: 3 },
    challenge: "Ruang meeting kecil membutuhkan layar terang namun tanpa kebisingan kipas yang mengganggu rapat.",
    solution: "Menggunakan modul indoor P2.5 dengan grayscale tinggi sehingga brightness bisa diturunkan tanpa kehilangan detail gambar.",
    media: { hero_image: "/images/projects/workhub-hero.webp", before_image: "/images/projects/workhub-before.webp",
      after_image: "/images/projects/workhub-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Presentasi klien jadi lebih meyakinkan dengan layar yang tajam dan senyap.",
      author: "Dimas Prakoso", position: "Facility Manager, WorkHub Bandung" }
  },
  {
    project_id: "proj-ikn-gov-01",
    slug: "command-center-ikn-nusantara",
    title: "Video Wall Command Center Ibu Kota Nusantara",
    client_name: "Otorita Ibu Kota Nusantara",
    industry_segment: "government",
    location: { city: "Penajam Paser Utara", province: "Kalimantan Timur", coordinates: { lat: -0.9925, lng: 116.6836 } },
    completion_date: "2025-11",
    products_used: ["mod-2", "mod-1"],
    system_components: [
      { type: "controller", name: "Matrix Switcher Skala Besar (Multi-CCTV & GIS Mapping)" },
      { type: "structure", name: "Custom Steel Frame Command Center" },
      { type: "software", name: "GIS Dashboard Analytics Integration" },
      { type: "support", name: "Hot-swappable Redundant Power Supply" }
    ],
    structure_type: "Custom Curved",
    metrics: { screen_size_m: "9m x 3m", total_area_sqm: 27, total_resolution: "9600 x 3200 Pixels", installation_time_days: 21 },
    challenge: "Operasional monitoring 24/7 tanpa toleransi downtime dan kebutuhan resolusi ultra tinggi untuk peta GIS.",
    solution: "Panel COB P0.9 dan P1.25 dikombinasikan dengan redundant power & controller card ganda untuk zero-downtime.",
    media: { hero_image: "/images/projects/ikn-hero.webp", before_image: "/images/projects/ikn-before.webp",
      after_image: "/images/projects/ikn-after.webp", gallery: ["/images/projects/ikn-detail.webp"], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Sistem redundansi terbukti andal, layar tidak pernah padam sejak commissioning.",
      author: "Ir. Hendra Gunawan", position: "Kepala Bidang Teknologi, Otorita IKN" }
  },
  {
    project_id: "proj-jakarta-gov-02",
    slug: "videotron-informasi-publik-balai-kota",
    title: "Videotron Informasi Publik Balai Kota (TKDN Certified)",
    client_name: "Pemerintah Provinsi DKI Jakarta",
    industry_segment: "government",
    location: { city: "Jakarta Pusat", province: "DKI Jakarta", coordinates: { lat: -6.1701, lng: 106.8272 } },
    completion_date: "2024-12",
    products_used: ["mod-12"],
    system_components: [
      { type: "controller", name: "Certified Asynchronous Controller" },
      { type: "structure", name: "Monopole dengan Sertifikasi Beban Angin" },
      { type: "software", name: "e-Katalog Compliant CMS" },
      { type: "support", name: "TKDN & ISO 9001 Certification Package" }
    ],
    structure_type: "Monopole",
    metrics: { screen_size_m: "8m x 4m", total_area_sqm: 32, total_resolution: "2048 x 1024 Pixels", installation_time_days: 12 },
    challenge: "Proses pengadaan mensyaratkan nilai TKDN minimum dan dokumentasi lengkap untuk audit anggaran.",
    solution: "Seluruh produk dan dokumen pendukung disiapkan sesuai standar e-Katalog / LPSE sejak tahap perencanaan.",
    media: { hero_image: "/images/projects/balaikota-hero.webp", before_image: "/images/projects/balaikota-before.webp",
      after_image: "/images/projects/balaikota-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Proses pengadaan berjalan lancar karena seluruh dokumen kepatuhan sudah lengkap sejak awal.",
      author: "Dra. Sri Mulyani", position: "Kepala Bagian Pengadaan, Pemprov DKI Jakarta" }
  },
  {
    project_id: "proj-surabaya-retail-01",
    slug: "transparent-led-etalase-mall-surabaya",
    title: "Transparent LED Etalase Mall Surabaya",
    client_name: "Surabaya Grand Mall",
    industry_segment: "retail",
    location: { city: "Surabaya", province: "Jawa Timur", coordinates: { lat: -7.2575, lng: 112.7521 } },
    completion_date: "2025-08",
    products_used: ["mod-9"],
    system_components: [
      { type: "controller", name: "Retail Cloud CMS Multi-Cabang" },
      { type: "structure", name: "Glass Mounting Frame" },
      { type: "support", name: "Daylight Brightness Sensor" }
    ],
    structure_type: "Glass Mount",
    metrics: { screen_size_m: "5m x 2.5m", total_area_sqm: 12.5, total_resolution: "640 x 320 Pixels", installation_time_days: 5 },
    challenge: "Etalase kaca depan mall tidak boleh tertutup total agar cahaya alami dan pandangan dari luar tetap terjaga.",
    solution: "Transparent LED P7.8 dengan transparansi 85% dipasang tanpa menghalangi visual arsitektur etalase.",
    media: { hero_image: "/images/projects/surabaya-mall-hero.webp", before_image: "/images/projects/surabaya-before.webp",
      after_image: "/images/projects/surabaya-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Konten promosi jadi lebih menarik tanpa mengorbankan kesan mewah etalase kami.",
      author: "Cindy Halim", position: "Marketing Manager, Surabaya Grand Mall" }
  },
  {
    project_id: "proj-tangerang-retail-02",
    slug: "storefront-transparent-tangerang",
    title: "Storefront Transparent LED Flagship Store Tangerang",
    client_name: "Urbana Retail Group",
    industry_segment: "retail",
    location: { city: "Tangerang", province: "Banten", coordinates: { lat: -6.1783, lng: 106.6319 } },
    completion_date: "2025-05",
    products_used: ["mod-9"],
    system_components: [
      { type: "controller", name: "Retail Cloud CMS" },
      { type: "structure", name: "Aluminum Profile Glass Frame" },
      { type: "support", name: "Content Scheduler Sync Server" }
    ],
    structure_type: "Glass Mount",
    metrics: { screen_size_m: "4m x 2m", total_area_sqm: 8, total_resolution: "1024 x 512 Pixels", installation_time_days: 4 },
    challenge: "Kerapatan pixel yang lebih tinggi dibutuhkan agar konten tetap jelas dari jarak trotoar yang sempit.",
    solution: "Memilih seri Clear P3.91 dengan kerapatan lebih tinggi dibanding P7.8 tanpa mengorbankan transparansi signifikan.",
    media: { hero_image: "/images/projects/tangerang-store-hero.webp", before_image: "/images/projects/tangerang-before.webp",
      after_image: "/images/projects/tangerang-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Toko kami jadi pusat perhatian di sepanjang jalan sejak videotron ini terpasang.",
      author: "Fajar Nugroho", position: "Store Manager, Urbana Retail Group" }
  },
  {
    project_id: "proj-yogya-edu-01",
    slug: "videowall-auditorium-universitas-yogyakarta",
    title: "Video Wall Auditorium Universitas Yogyakarta",
    client_name: "Universitas Yogyakarta",
    industry_segment: "education",
    location: { city: "Yogyakarta", province: "DI Yogyakarta", coordinates: { lat: -7.7956, lng: 110.3695 } },
    completion_date: "2024-09",
    products_used: ["mod-6"],
    system_components: [
      { type: "controller", name: "AV Integration Switcher dengan PTZ Camera Tracking" },
      { type: "structure", name: "Hanging Structure dari Rangka Atap Auditorium" },
      { type: "support", name: "Wireless Podium Presentation System" }
    ],
    structure_type: "Hanging",
    metrics: { screen_size_m: "10m x 4m", total_area_sqm: 40, total_resolution: "4000 x 1600 Pixels", installation_time_days: 9 },
    challenge: "Jarak pandang bervariasi dari baris depan hingga balkon paling belakang auditorium berkapasitas 800 kursi.",
    solution: "Pixel pitch P2.5 dipilih berdasarkan kalkulasi jarak kursi terjauh agar tetap jelas dari seluruh sudut ruangan.",
    media: { hero_image: "/images/projects/yogya-auditorium-hero.webp", before_image: "/images/projects/yogya-before.webp",
      after_image: "/images/projects/yogya-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Acara wisuda dan seminar nasional kami jadi terlihat jauh lebih profesional.",
      author: "Prof. Dr. Agus Setiawan", position: "Wakil Rektor Bidang Sarana, Universitas Yogyakarta" }
  },
  {
    project_id: "proj-bali-event-01",
    slug: "konser-outdoor-panggung-bali",
    title: "LED Panggung Rental Konser Musik Outdoor Bali",
    client_name: "Bali Live Entertainment",
    industry_segment: "event",
    location: { city: "Denpasar", province: "Bali", coordinates: { lat: -8.6705, lng: 115.2126 } },
    completion_date: "2025-07",
    products_used: ["mod-7", "mod-12"],
    system_components: [
      { type: "controller", name: "Seamless LED Video Switcher (Fade & Blackout)" },
      { type: "structure", name: "Truss Rigging dengan Flight Case Packaging" },
      { type: "support", name: "Corner Protector & Interlock Curve Kit" }
    ],
    structure_type: "Hanging / Truss",
    metrics: { screen_size_m: "12m x 5m", total_area_sqm: 60, total_resolution: "4128 x 1720 Pixels", installation_time_days: 2 },
    challenge: "Waktu setup panggung hanya tersedia satu hari sebelum acara dengan kebutuhan bongkar-pasang cepat.",
    solution: "Fast-Lock mechanism memungkinkan tim kru merakit seluruh dinding LED dalam waktu kurang dari 6 jam.",
    media: { hero_image: "/images/projects/bali-concert-hero.webp", before_image: "/images/projects/bali-before.webp",
      after_image: "/images/projects/bali-after.webp", gallery: ["/images/projects/bali-night.webp"], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Setup super cepat dan gambar tetap tajam meski dilihat dari jarak sangat dekat panggung.",
      author: "Made Wirawan", position: "Production Manager, Bali Live Entertainment" }
  },
  {
    project_id: "proj-medan-stadium-01",
    slug: "perimeter-led-stadion-medan",
    title: "Perimeter LED Stadion Sepak Bola Medan",
    client_name: "Pengelola Stadion Medan",
    industry_segment: "stadium",
    location: { city: "Medan", province: "Sumatera Utara", coordinates: { lat: 3.5952, lng: 98.6722 } },
    completion_date: "2025-02",
    products_used: ["mod-16"],
    system_components: [
      { type: "controller", name: "High-Cap Matrix Switch Multi-Kamera Siaran" },
      { type: "structure", name: "Perimeter Ground Footing Adjustable 75°–90°" },
      { type: "support", name: "Dual Power & Signal Backup Loop" }
    ],
    structure_type: "Perimeter Footing",
    metrics: { screen_size_m: "80m x 1m", total_area_sqm: 80, total_resolution: "7680 x 96 Pixels", installation_time_days: 15 },
    challenge: "Risiko benturan pemain saat pertandingan dan kebutuhan bebas flicker untuk siaran TV slow-motion.",
    solution: "Soft rubber mask protection dan refresh rate 7.680 Hz memastikan keamanan atlet dan kualitas siaran optimal.",
    media: { hero_image: "/images/projects/medan-stadium-hero.webp", before_image: "/images/projects/medan-before.webp",
      after_image: "/images/projects/medan-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Tayangan pertandingan di TV jadi lebih tajam tanpa garis, dan pemain merasa lebih aman.",
      author: "Yusuf Hasibuan", position: "General Manager, Pengelola Stadion Medan" }
  },
  {
    project_id: "proj-makassar-ctrl-01",
    slug: "control-room-monitoring-energi-makassar",
    title: "Video Wall Control Room Monitoring Energi Makassar",
    client_name: "PT Energi Nusantara Timur",
    industry_segment: "control-room",
    location: { city: "Makassar", province: "Sulawesi Selatan", coordinates: { lat: -5.1477, lng: 119.4327 } },
    completion_date: "2024-11",
    products_used: ["mod-1"],
    system_components: [
      { type: "controller", name: "Video Wall Processor Multi-Input SCADA" },
      { type: "structure", name: "Fixed Wall Frame Anti-Getar" },
      { type: "support", name: "Redundant Controller Card & UPS Backup" }
    ],
    structure_type: "Wall-mount",
    metrics: { screen_size_m: "6m x 2.25m", total_area_sqm: 13.5, total_resolution: "4800 x 1800 Pixels", installation_time_days: 8 },
    challenge: "Operasional monitoring jaringan energi 24/7 tanpa gangguan visual pada peta jaringan yang kompleks.",
    solution: "Panel GOB anti-benturan dengan seamless bezel menjaga integritas visual peta jaringan tanpa terputus garis.",
    media: { hero_image: "/images/projects/makassar-ctrl-hero.webp", before_image: "/images/projects/makassar-before.webp",
      after_image: "/images/projects/makassar-after.webp", gallery: [], video_embed_url: "", virtual_tour_360: "" },
    testimonial: { quote: "Operator kami kini bisa memantau seluruh jaringan energi dalam satu pandangan tanpa hambatan visual.",
      author: "Ir. Bambang Purnomo", position: "Manager Operasional, PT Energi Nusantara Timur" }
  }
];

/* ---------- Label bantuan tampilan (industri & tipe komponen BOM) ---------- */
window.INDUSTRY_LABEL = {
  advertising: "Advertising", corporate: "Corporate", government: "Government",
  retail: "Retail", education: "Education", event: "Event",
  stadium: "Stadium", "control-room": "Control Room"
};

window.BOM_TYPE_LABEL = {
  controller: "Video Processor / Sending Controller",
  structure: "Sistem Konstruksi",
  software: "Software / CMS",
  support: "Perangkat Pendukung"
};
