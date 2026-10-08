/* =========================================================
   contact-data.js — Data Kontak, Departemen, Jam Operasional
   Struktur mengikuti draf contactData.js pada PRD Contact Tab v1.0.
   ========================================================= */

window.contactData = {
  header: {
    title: "Hubungi Kami",
    subtitle: "Konsultasikan kebutuhan videotron Anda dengan tim ahli kami atau kunjungi showroom kami."
  },

  companyInfo: {
    name: "PT LumeniX Display Indonesia",
    headOffice: "Jl. Raya Boulevard Utama No. 88, Kemayoran, Jakarta Pusat, DKI Jakarta 10610",
    showroomAddress: "Showroom LumeniX Lantai 2, Ruko Sentra Bisnis No. 12, Jakarta Pusat",
    phone: "(021) 555-1234",
    email: "sales@lumenixled.co.id",
    workingHours: {
      days: "Senin – Jumat: 08.30 – 17.30 WIB",
      saturday: "Sabtu: 08.30 – 14.00 WIB",
      sunday: "Minggu & Hari Libur Nasional: Tutup (Hotline WA Tetap Aktif)",
      /* Dipakai kalkulasi status real-time — 0 = Minggu ... 6 = Sabtu */
      schedule: {
        weekday: { days: [1, 2, 3, 4, 5], open: "08:30", close: "17:30" },
        saturday: { days: [6], open: "08:30", close: "14:00" },
        sunday: { days: [0], open: null, close: null }
      }
    },
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6!2d106.83!3d-6.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDknMzYuMCJTIDEwNsKwNDknNDggMCJF!5e0!3m2!1sid!2sid!4v1",
    googleMapsDirectionQuery: "Showroom LumeniX Display Indonesia, Jakarta Pusat"
  },

  /* ---------- Direct WhatsApp Routing per departemen ---------- */
  departments: [
    { id: "sales", icon: "💬", name: "Sales & Konsultasi (RFQ)", whatsappNumber: "6281234567890",
      description: "Konsultasi produk, penawaran harga, dan proyek swasta/B2B." },
    { id: "tkdn", icon: "🏛️", name: "e-Katalog & TKDN Specialist", whatsappNumber: "6281298765432",
      description: "Pengadaan instansi pemerintah, dokumen sertifikasi TKDN, & konsultasi tender." },
    { id: "support", icon: "🛠️", name: "Emergency Technical Support", whatsappNumber: "6281311223344",
      description: "Bantuan kendala modul, kalibrasi, & jadwal perbaikan di lokasi." }
  ],

  categories: [
    "Penawaran Harga / RFQ",
    "Pengadaan e-Katalog / TKDN",
    "Demo Videotron di Showroom",
    "Konsultasi Teknis / Custom Size",
    "Dukungan Teknis / Maintenance"
  ],

  /* Pemetaan kategori → id departemen default, agar form otomatis
     menyarankan tujuan WA yang tepat saat kategori dipilih. */
  categoryDeptMap: {
    "Penawaran Harga / RFQ": "sales",
    "Pengadaan e-Katalog / TKDN": "tkdn",
    "Demo Videotron di Showroom": "sales",
    "Konsultasi Teknis / Custom Size": "sales",
    "Dukungan Teknis / Maintenance": "support"
  },

  /* ---------- Fitur Tambahan: Social & Channel Showcase ---------- */
  socialChannels: [
    { key: "youtube", label: "YouTube", handle: "@LumeniXDisplay", url: "https://youtube.com/@LumeniXDisplay", desc: "Video portofolio proyek & behind the scenes instalasi." },
    { key: "instagram", label: "Instagram", handle: "@lumenixled", url: "https://instagram.com/lumenixled", desc: "Update produk terbaru dan galeri proyek harian." },
    { key: "linkedin", label: "LinkedIn", handle: "LumeniX Display Indonesia", url: "https://linkedin.com/company/lumenixled", desc: "Berita korporat, karier, dan studi kasus B2B." }
  ]
};
