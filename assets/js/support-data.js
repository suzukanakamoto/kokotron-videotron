/* =========================================================
   support-data.js — Data Pusat Bantuan & Layanan Purna Jual
   Struktur mengikuti draf supportData.js pada PRD Support Tab v1.0,
   diperluas untuk fitur tambahan (Spare Parts, TKDN Hub, SLA, dsb).
   ========================================================= */

window.supportData = {
  hero: {
    title: "Pusat Bantuan & Layanan Purna Jual Videotron",
    subtitle: "Solusi lengkap dari konsultasi instalasi, pemeliharaan rutin, hingga klaim garansi resmi."
  },

  /* ---------- Quick Action Grid (4 kartu utama) ---------- */
  quickActions: [
    { icon: "🛈", tab: "installation", title: "Instalasi", desc: "Request survei lokasi untuk pemasangan baru.", cta: "Request Survei Lokasi" },
    { icon: "🛠️", tab: "maintenance", title: "Maintenance", desc: "Laporkan kendala teknis unit videotron Anda.", cta: "Buat Tiket Perbaikan" },
    { icon: "🛡️", tab: "warranty", title: "Garansi", desc: "Cek sisa masa berlaku garansi unit Anda.", cta: "Cek Serial Number" },
    { icon: "📥", tab: "downloads", title: "Download Center", desc: "Software controller, manual, dan datasheet.", cta: "Lihat Semua Unduhan" }
  ],

  /* ---------- 2.1 Installation ---------- */
  installationServices: [
    { id: "inst-1", title: "Survei & Analisis Kelayakan Lokasi", description: "Pemeriksaan kekuatan struktur gedung, pasokan daya listrik, dan jarak pandang audiens." },
    { id: "inst-2", title: "Konstruksi & Rigging Custom", description: "Pembuatan rangka besi hollow, tiang pylon, atau kabinet aluminum die-cast sesuai kebutuhan." },
    { id: "inst-3", title: "Pengkabelan & Tuning System", description: "Instalasi kabel power & data serta kalibrasi warna dan kecerahan modul LED menggunakan receiving/sending card (Novastar, Colorlight, Linsn)." }
  ],
  installationCatalog: [
    { title: "Struktur & Rigging", desc: "Pemasangan struktur gantung (hanging), tempel dinding (wall-mount), atau tiang (pylon/ground standing)." },
    { title: "Kelistrikan & Perkabelan", desc: "Instalasi jalur listrik utama, MDP (Main Distribution Panel), dan pengkabelan data." },
    { title: "Setting & Kalibrasi", desc: "Konfigurasi receiving/sending card (Novastar, Colorlight, Linsn) dan kalibrasi warna/kecerahan." }
  ],
  k3Note: "Seluruh teknisi instalasi outdoor di ketinggian mengikuti prosedur K3 (Keselamatan dan Kesehatan Kerja) standar konstruksi, termasuk penggunaan APD lengkap, safety harness, dan working permit sebelum pekerjaan dimulai.",

  /* ---------- 2.2 Maintenance ---------- */
  maintenanceTypes: [
    { key: "preventive", title: "Preventive Maintenance", items: ["Pembersihan debu panel", "Pengecekan power supply", "Pemeriksaan kekencangan kabel data & braket"] },
    { key: "corrective", title: "Corrective Maintenance", items: ["Solder / penggantian mata LED mati", "Perbaikan power supply", "Penggantian modul yang mati"] }
  ],
  maintenanceIssues: [
    "Modul LED Mati / Bintik Hitam (Dead Pixel)",
    "Power Supply Rusak / Mati Total",
    "Tampilan Flickering / Glitch",
    "Masalah Software / Card Controller",
    "Warna Tidak Seragam Antar Modul",
    "Lainnya"
  ],
  slaPackages: [
    { key: "sla-1x24", name: "SLA Response 1×24 Jam", desc: "Teknisi merespons dan menindaklanjuti laporan dalam waktu maksimal 1 hari kerja.", tag: "Prioritas Tinggi" },
    { key: "sla-4x24", name: "SLA Response 4×24 Jam", desc: "Teknisi merespons dan menindaklanjuti laporan dalam waktu maksimal 4 hari kerja.", tag: "Standard" }
  ],

  /* ---------- 2.3 Warranty ---------- */
  warrantyRules: {
    coverageTerms: [
      "Garansi Spare Part (Modul, Power Supply, Controller Card) berlaku 1–3 tahun sesuai tipe.",
      "Layanan Perbaikan Gratis di Service Center selama masa garansi berlaku.",
      "Garansi tidak mencakup kerusakan akibat bencana alam, petir, atau lonjakan arus listrik tanpa stabilizer."
    ]
  },
  warrantyScope: [
    { part: "Module LED", period: "2 Tahun" },
    { part: "Power Supply", period: "1 Tahun" },
    { part: "Receiving Card", period: "1 Tahun" },
    { part: "Sending Box", period: "3 Tahun" }
  ],
  /* Basis data simulasi untuk demo Warranty Checker (client-side).
     Pada produksi, endpoint ini diganti pemanggilan API backend nyata. */
  warrantyDemo: [
    { serialNumber: "SN-VDT-2024-001", productName: "Videotron Indoor P2.5 TKDN", purchaseDate: "15 Januari 2024", warrantyExpiry: "15 Januari 2026", status: "Aktif", coverage: "Full Spare Parts & Labor" },
    { serialNumber: "SN-VDT-2023-115", productName: "Videotron Outdoor P3.91 TKDN", purchaseDate: "02 Maret 2023", warrantyExpiry: "02 Maret 2025", status: "Aktif", coverage: "Full Spare Parts & Labor" },
    { serialNumber: "SN-VDT-2021-048", productName: "Videotron Rental P2.9", purchaseDate: "10 Juli 2021", warrantyExpiry: "10 Juli 2023", status: "Kedaluwarsa", coverage: "Non-Aktif — perpanjangan garansi tersedia" }
  ],

  /* ---------- Fitur Tambahan: Download Center ---------- */
  downloadCenter: [
    { id: "dl-1", category: "Software", name: "NovaLCT V5.4.4 (Novastar Sending Card Tool)", fileSize: "120 MB", downloadUrl: "/downloads/software/NovaLCT-v5.4.4.zip" },
    { id: "dl-2", category: "Software", name: "ViPlex Handy (Novastar Mobile Control)", fileSize: "85 MB", downloadUrl: "/downloads/software/ViPlex-Handy.apk" },
    { id: "dl-3", category: "Software", name: "LEDVISION (Colorlight Control Software)", fileSize: "210 MB", downloadUrl: "/downloads/software/LEDVISION.zip" },
    { id: "dl-4", category: "Software", name: "HDSet (Linsn Sending Card Tool)", fileSize: "45 MB", downloadUrl: "/downloads/software/HDSet.zip" },
    { id: "dl-5", category: "Datasheet", name: "Datasheet Videotron Indoor P2.5 TKDN", fileSize: "2.5 MB", downloadUrl: "/downloads/datasheet/P2.5-Indoor-TKDN.pdf" },
    { id: "dl-6", category: "Datasheet", name: "Datasheet Videotron Outdoor P3.91 TKDN", fileSize: "2.8 MB", downloadUrl: "/downloads/datasheet/P3.91-Outdoor-TKDN.pdf" },
    { id: "dl-7", category: "Datasheet", name: "Datasheet Fine Pitch P1.86 COB", fileSize: "3.1 MB", downloadUrl: "/downloads/datasheet/P1.86-FinePitch.pdf" },
    { id: "dl-8", category: "Manual Book", name: "Manual Instalasi Cabinet Die-Cast Aluminium", fileSize: "6.4 MB", downloadUrl: "/downloads/manual/manual-instalasi-cabinet.pdf" },
    { id: "dl-9", category: "Manual Book", name: "Panduan Kalibrasi Warna & Brightness", fileSize: "4.2 MB", downloadUrl: "/downloads/manual/panduan-kalibrasi.pdf" },
    { id: "dl-10", category: "Manual Book", name: "Panduan Penggantian Modul Magnetik Mandiri", fileSize: "3.7 MB", downloadUrl: "/downloads/manual/panduan-modul-magnetik.pdf" }
  ],

  /* ---------- Fitur Tambahan: Spare Parts Directory ---------- */
  spareParts: [
    { id: "sp-1", name: "IC Driver ICN2038S", compatible: "Seri Indoor P1.86 – P3.0", price: "Hubungi Sales", stock: "Ready Stock" },
    { id: "sp-2", name: "Modul LED Indoor P2.5 (Replacement Unit)", compatible: "LumeniX Eco P2.5 Indoor", price: "Hubungi Sales", stock: "Ready Stock" },
    { id: "sp-3", name: "Modul LED Outdoor P3.91 (Replacement Unit)", compatible: "LumeniX Titan P3.91 Outdoor", price: "Hubungi Sales", stock: "Indent 7 Hari" },
    { id: "sp-4", name: "Power Supply 5V 40A (Meanwell RSP-200-5)", compatible: "Universal — Semua Seri Indoor & Outdoor", price: "Hubungi Sales", stock: "Ready Stock" },
    { id: "sp-5", name: "Receiving Card Novastar MRV336", compatible: "Universal — Sistem Novastar", price: "Hubungi Sales", stock: "Ready Stock" },
    { id: "sp-6", name: "Sending Box Novastar VX1000", compatible: "Universal — Sistem Novastar", price: "Hubungi Sales", stock: "Indent 14 Hari" },
    { id: "sp-7", name: "Kabel Data Cat6 Outdoor (per 100m)", compatible: "Universal", price: "Hubungi Sales", stock: "Ready Stock" },
    { id: "sp-8", name: "Bracket Wall-Mount Ultra-Thin", compatible: "Seri Fine Pitch Indoor", price: "Hubungi Sales", stock: "Ready Stock" }
  ],

  /* ---------- FAQ (dikelompokkan per kategori) ---------- */
  faqs: [
    { category: "Spesifikasi & Produk", question: "Apa bedanya Videotron Indoor dan Outdoor?",
      answer: "Videotron Outdoor memiliki tingkat kecerahan lebih tinggi (≥5000 nits) dan proteksi cuaca (IP65/IP67), sedangkan Videotron Indoor berfokus pada kerapatan pixel tinggi dengan kecerahan rata-rata 600–1200 nits." },
    { category: "Spesifikasi & Produk", question: "Apa perbedaan Pixel Pitch P1.2, P2.5, P3.9, P5, dan P10?",
      answer: "Angka pixel pitch menunjukkan jarak antar titik LED dalam milimeter. Semakin kecil angkanya, semakin rapat titik LED dan semakin dekat jarak pandang optimalnya — P1.2–P2.5 untuk indoor jarak dekat, P3.9–P10 untuk outdoor jarak jauh." },
    { category: "Spesifikasi & Produk", question: "Apa pengaruh Refresh Rate 1920Hz vs 3840Hz?",
      answer: "Refresh rate yang lebih tinggi (3840Hz) menghasilkan tampilan lebih halus dan bebas garis (flicker-free) saat direkam kamera, sehingga penting untuk kebutuhan siaran TV dan dokumentasi video." },
    { category: "Spesifikasi & Produk", question: "Apa itu Brightness (Nits) dan berapa yang saya butuhkan?",
      answer: "Nits mengukur tingkat kecerahan layar. Indoor umumnya cukup 600–1200 nits, sedangkan outdoor di bawah sinar matahari langsung membutuhkan minimal 5000 nits agar tetap terlihat jelas." },
    { category: "Regulasi & Pengadaan", question: "Apakah produk videotron di sini sudah memiliki sertifikat TKDN?",
      answer: "Ya, kami menyediakan lini produk videotron Indoor dan Outdoor yang telah tersertifikasi TKDN resmi untuk memenuhi standar pengadaan pemerintah." },
    { category: "Regulasi & Pengadaan", question: "Apa itu sertifikasi TKDN dan mengapa penting untuk proyek pemerintah?",
      answer: "TKDN (Tingkat Komponen Dalam Negeri) adalah sertifikasi Kemenperin yang mengukur persentase komponen lokal pada suatu produk. Proyek pengadaan pemerintah umumnya mensyaratkan nilai TKDN minimum tertentu agar dapat mengikuti tender via e-Katalog/LPSE." },
    { category: "Regulasi & Pengadaan", question: "Bagaimana cara mendapatkan dokumen TKDN dan ISO untuk keperluan tender?",
      answer: "Seluruh sertifikat (TKDN, ISO 9001, ISO 14001, CE, RoHS) dapat diunduh langsung melalui TKDN & Certificate Hub di halaman About Us, atau hubungi tim sales untuk salinan resmi bertanda tangan basah." },
    { category: "Troubleshooting Sederhana", question: "Bagaimana cara mereset sending box?",
      answer: "Cabut kabel power sending box selama 10 detik, lalu pasang kembali. Tunggu hingga lampu indikator menyala stabil (biasanya 30–60 detik) sebelum menghubungkan kembali ke software kontrol." },
    { category: "Troubleshooting Sederhana", question: "Bagaimana cara mengecek sambungan LAN ke videotron?",
      answer: "Pastikan kabel Cat6/Cat5e tidak putus atau longgar pada konektor RJ45. Gunakan LAN tester bila tersedia, dan periksa lampu indikator link/activity pada port sending card serta receiving card." },
    { category: "Troubleshooting Sederhana", question: "Bagaimana cara mengganti modul magnetik secara mandiri?",
      answer: "Matikan daya, lepas modul bermasalah dengan alat bantu magnet/suction cup dari sisi depan, lepas konektor data dan power, pasang modul pengganti dengan orientasi yang sama, lalu nyalakan kembali dan lakukan kalibrasi ulang jika diperlukan. Panduan lengkap tersedia di Download Center." },
    { category: "Sistem Pembayaran & Garansi", question: "Bagaimana prosedur klaim garansi jika modul rusak?",
      answer: "Isi Formulir Klaim Garansi di halaman ini dengan Serial Number dan gejala kerusakan. Tim kami akan memverifikasi status garansi, lalu mengirimkan modul pengganti atau menjadwalkan kunjungan teknisi sesuai cakupan garansi Anda." },
    { category: "Sistem Pembayaran & Garansi", question: "Apa saja yang tidak dicakup oleh garansi?",
      answer: "Garansi tidak mencakup kerusakan akibat bencana alam, sambaran petir, lonjakan arus listrik tanpa stabilizer/surge protector, atau kerusakan akibat kesalahan instalasi oleh pihak ketiga yang tidak ditunjuk resmi." },
    { category: "Sistem Pembayaran & Garansi", question: "Apakah tersedia paket maintenance tahunan?",
      answer: "Ya, tersedia paket Service Level Agreement (SLA) dengan pilihan response time 1×24 jam atau 4×24 jam, mencakup preventive maintenance berkala dan prioritas penanganan corrective maintenance." }
  ],

  /* ---------- Footer Support: Emergency & Service Center ---------- */
  emergency: { phone: "+62-812-3456-7890", waNumber: "6281234567890", hours: "24/7 untuk klien dengan kontrak SLA aktif" },
  serviceCenters: [
    { city: "Jakarta (Pusat)", address: "Jl. Raya Boulevard Utama No. 88, Jakarta Barat", phone: "+62-21-5550-1234" },
    { city: "Surabaya", address: "Jl. Rungkut Industri No. 12, Surabaya", phone: "+62-31-5550-5678" },
    { city: "Medan", address: "Jl. Gatot Subroto No. 45, Medan", phone: "+62-61-5550-9012" }
  ]
};
