/* =========================================================
   about-data.js — Data Company Heritage, Teknologi Modul,
   QC Standards, Sertifikasi, Tim & Company Info
   Terpisah dari about.js agar konten mudah diperbarui.
   ========================================================= */

window.COMPANY_INFO = {
  name: "PT LumeniX Display Indonesia",
  altName: "LumeniX LED Display",
  founded: "2014",
  description: "Penyedia solusi terintegrasi videotron dan LED display bersertifikasi TKDN di Indonesia.",
  address: { street: "Jl. Raya Boulevard Utama No. 88", city: "Jakarta Barat", region: "DKI Jakarta", postal: "11800", country: "ID" },
  phone: "+62-812-3456-7890",
  waNumber: "6281234567890"
};

window.HERO_STATS = [
  { value: "12+", label: "Tahun Pengalaman" },
  { value: "500+", label: "Proyek Terpasang" },
  { value: "40%", label: "Max Nilai TKDN" }
];

/* ---------- Section 1: Company Heritage & Milestones ---------- */
window.MILESTONES = [
  { year: "2014", title: "Pendirian Perusahaan", desc: "Berdiri sebagai penyedia layanan instalasi media iklan luar ruang (billboard konvensional)." },
  { year: "2017", title: "Era Modul SMD & Ekspansi Indoor", desc: "Bertransisi penuh ke teknologi Surface Mounted Device (SMD) dan mulai mengerjakan proyek corporate boardroom." },
  { year: "2020", title: "Fasilitas QC & Perakitan Lokal", desc: "Mendirikan fasilitas perakitan dan aging test mandiri di Indonesia untuk mempercepat waktu pengiriman." },
  { year: "2023", title: "Pelopor Sertifikasi TKDN", desc: "Mendapatkan sertifikasi Tingkat Komponen Dalam Negeri (TKDN) resmi untuk mendukung pengadaan pemerintah via e-Katalog." },
  { year: "2026", title: "Era MicroLED COB & Smart CMS", desc: "Mengadopsi teknologi Chip on Board (COB) ultra-fine pitch dan integrasi Cloud CMS berbasis AI." }
];

/* ---------- Section 2: Evolusi Teknologi Modul LED ---------- */
window.MODULE_GENERATIONS = [
  { key: "dip", label: "DIP LED", years: "1990 – 2010",
    points: ["Dual In-line Package", "Lampu bulat terpisah", "Pitch besar (P10 – P20)", "Kecerahan sangat tinggi"],
    structure: "Lampu LED Bulat Diskrit (Dual In-line Package)", protection: "Tanpa Proteksi Standar (IP20)",
    pitch_min: "P10", touchability: "Rentan Pecah / Lampu Lepas", energy: "Boros — Baseline" },
  { key: "smd", label: "SMD LED", years: "2010 – 2018",
    points: ["Surface Mounted", "3-in-1 RGB di 1 chip", "Pitch rapat (P1.5 – P10)", "Sudut pandang luas 160°"],
    structure: "RGB Chip + Epoxy Case (Surface Mounted)", protection: "Standard IP65 (Front)",
    pitch_min: "P1.25", touchability: "Rentan Rontok", energy: "Standard" },
  { key: "gob", label: "GOB LED", years: "2018 – 2022",
    points: ["Glue on Board", "Lapisan resin pelindung di atas SMD", "Anti-bentur, waterproof", "Cocok untuk rental / touch screen"],
    structure: "SMD dilapisi Resin Pelindung (Glue on Board)", protection: "Full Sealed IP67",
    pitch_min: "P0.9", touchability: "Anti-Bentur & Tahan Gesek", energy: "Hemat ± 20%" },
  { key: "cob", label: "COB / MIP LED", years: "2022 – Sekarang",
    points: ["Chip on Board", "Flip-Chip MicroLED", "Tanpa kawat bonding (wire-free)", "Contrast ratio 10.000:1", "Hemat energi 40%", "Pitch ultra-rapat (P0.6 – P1.25)"],
    structure: "Direct Flip-Chip Bonding (Chip on Board)", protection: "Full Sealed IP68",
    pitch_min: "P0.6", touchability: "Anti-Bentur & Dustproof", energy: "Up to 40% Saving" }
];

/* Pitch Progression Chart data (mm per tahun) — Section 3.2 */
window.PITCH_PROGRESSION = [
  { year: 2000, pitch: 20 }, { year: 2006, pitch: 10 }, { year: 2012, pitch: 4 },
  { year: 2016, pitch: 2.5 }, { year: 2020, pitch: 1.25 }, { year: 2023, pitch: 0.9 }, { year: 2026, pitch: 0.6 }
];

/* ---------- Section 3: Quality Control & Testing Standards ---------- */
window.QC_STANDARDS = [
  { icon: "⏱️", title: "72-Hour Continuous Aging Test",
    desc: "Setiap modul diuji menyala nonstop selama 72 jam (24 jam warna putih maksimal, 24 jam warna RGB, 24 jam tes video bergerak) untuk mendeteksi potensi dead pixel sejak dini." },
  { icon: "💧", title: "IPX8 Waterproof & Dustproof Test",
    desc: "Pengujian ketahanan air dan debu menggunakan spray chamber tekanan tinggi untuk modul kategori outdoor." },
  { icon: "🌡️", title: "Thermal Imaging & Power Consumption Audit",
    desc: "Pemindaian suhu operasional modul menggunakan kamera thermal untuk memastikan pelepasan panas (heat dissipation) berjalan sempurna tanpa overheating." },
  { icon: "🎨", title: "Color Calibration System",
    desc: "Kalibrasi kecerahan dan warna tingkat piksel (pixel-level calibration) menggunakan sensor spektrometer agar warna antar cabinet seragam 100%." }
];

/* ---------- Section 4: Certification & Compliance Vault ---------- */
window.CERTIFICATIONS = [
  { code: "TKDN", name: "TKDN (Tingkat Komponen Dalam Negeri)", group: "Legalitas Pengadaan",
    desc: "Sertifikat resmi Kemenperin dengan persentase nilai TKDN terverifikasi.", file: "sertifikat-tkdn.pdf" },
  { code: "ISO 9001", name: "ISO 9001:2015 — Manajemen Mutu", group: "Manajemen Mutu & Lingkungan",
    desc: "Standar internasional sistem manajemen mutu produksi dan layanan.", file: "iso-9001-2015.pdf" },
  { code: "ISO 14001", name: "ISO 14001:2015 — Manajemen Lingkungan", group: "Manajemen Mutu & Lingkungan",
    desc: "Standar internasional sistem manajemen lingkungan proses produksi.", file: "iso-14001-2015.pdf" },
  { code: "CE", name: "Sertifikat CE (Conformité Européenne)", group: "Standar Keamanan Internasional",
    desc: "Kepatuhan terhadap standar kesehatan, keselamatan, dan lingkungan Uni Eropa.", file: "sertifikat-ce.pdf" },
  { code: "RoHS", name: "Sertifikat RoHS", group: "Standar Keamanan Internasional",
    desc: "Pembatasan penggunaan zat berbahaya pada komponen elektronik.", file: "sertifikat-rohs.pdf" },
  { code: "FCC", name: "Sertifikat FCC", group: "Standar Keamanan Internasional",
    desc: "Kepatuhan terhadap standar interferensi elektromagnetik Federal Communications Commission.", file: "sertifikat-fcc.pdf" },
  { code: "IP68", name: "Laporan Uji Keandalan IP68", group: "Standar Keamanan Internasional",
    desc: "Laporan uji independen proteksi debu total dan rendam air pada modul outdoor.", file: "laporan-ip68.pdf" },
  { code: "NIB", name: "NIB (Nomor Induk Berusaha)", group: "Dokumen Perusahaan",
    desc: "Identitas legal pelaku usaha yang diterbitkan melalui sistem OSS.", file: "nib.pdf" },
  { code: "NPWP", name: "NPWP Perusahaan", group: "Dokumen Perusahaan",
    desc: "Nomor Pokok Wajib Pajak badan usaha.", file: "npwp.pdf" },
  { code: "SBU", name: "Sertifikat Badan Usaha (SBU)", group: "Dokumen Perusahaan",
    desc: "Sertifikat klasifikasi dan kualifikasi badan usaha jasa konstruksi/elektrikal.", file: "sbu.pdf" }
];

/* Dokumen yang tersedia di Document Pack Builder (Section 4.2) */
window.DOC_PACK_OPTIONS = [
  { key: "profile", label: "Company Profile PDF 2026", checked: true },
  { key: "tkdn", label: "Sertifikat TKDN Kemenperin", checked: true },
  { key: "iso", label: "Sertifikat ISO 9001 & 14001", checked: true },
  { key: "catalog", label: "Catalog Ringkas Produk LED", checked: true }
];

/* ---------- Section 5: Certified Engineering Team & Leadership ---------- */
window.LEADERSHIP = [
  { name: "Ir. Hendra Wijaya, M.T.", role: "Chief Executive Officer", bio: "18 tahun pengalaman di industri Audio-Visual & sistem digital signage skala nasional." },
  { name: "Yulianto Susanto", role: "Chief Technical Officer", bio: "Novastar Certified Engineer dengan spesialisasi arsitektur sistem video wall skala besar." },
  { name: "Dewi Anggraini", role: "Head of Quality Control", bio: "Memimpin fasilitas aging test dan kalibrasi warna sejak 2020, bersertifikat ISO 9001 Lead Auditor." },
  { name: "Rangga Pratama", role: "Head of Project Engineering", bio: "Menangani lebih dari 200 instalasi lapangan mulai dari struktur monopole hingga curved facade." }
];

window.TECH_CERTIFICATIONS = [
  { name: "Novastar Certified Engineer (NCE)", desc: "Sertifikasi resmi kalibrasi dan troubleshooting sistem kontrol Novastar." },
  { name: "Colorlight Certified AV Specialist", desc: "Sertifikasi konfigurasi dan integrasi sistem kontrol Colorlight." },
  { name: "Sertifikat K3 Konstruksi", desc: "Keselamatan dan Kesehatan Kerja untuk seluruh teknisi instalasi lapangan." }
];

/* ---------- Section 6: 360° Showroom & Workshop Tour ---------- */
window.SHOWROOM_HOTSPOTS = [
  { key: "experience", label: "Experience Center", desc: "Ruang pamer berbagai tipe videotron menyala — indoor, outdoor, fine pitch, hingga transparent LED." },
  { key: "workshop", label: "Area Workshop Assembly", desc: "Lini perakitan cabinet dan quality control sebelum pengiriman ke lokasi proyek." },
  { key: "transparent", label: "Demo Transparent LED", desc: "Demonstrasi langsung modul Transparent LED pada etalase kaca simulasi." },
  { key: "finepitch", label: "Demo Fine Pitch COB", desc: "Demonstrasi video wall seamless COB ultra-fine pitch untuk command center." }
];
