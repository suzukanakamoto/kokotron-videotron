# LED Display Solution — Website Project (Phase 1)

Company profile + product showcase untuk perusahaan Videotron / LED Display.
Dibangun dengan HTML5, CSS3, dan JavaScript (vanilla, tanpa framework/build step).

## Struktur
```
led-display-solution/
├── index.html               # Homepage (selesai)
├── products.html            # Products Hub / katalog (selesai)
├── product-detail.html      # Product Detail Page / PDP (selesai)
├── solutions.html           # Solutions Hub (selesai)
├── solution-detail.html     # Industry Solution Detail — 8 sektor (selesai)
├── projects.html            # Projects Main Hub (selesai)
├── project-detail.html      # Project Detail / Case Study (selesai)
├── about.html                # About Us Tab (selesai)
├── support.html              # Support Tab (selesai)
├── contact.html               # Contact Tab (selesai)
└── assets/
    ├── css/style.css        # Design token + style global
    ├── css/products.css     # Style khusus halaman katalog
    ├── css/product-detail.css # Style halaman detail produk
    ├── css/solutions.css    # Style hub solusi + halaman detail industri
    ├── css/projects.css     # Style hub proyek + peta + before/after slider + BOM
    ├── css/about.css         # Style timeline, tech comparison, certification vault
    ├── css/support.css       # Style sub-tab FAQ/Installation/Maintenance/Warranty/Downloads
    ├── css/contact.css        # Style kolom info kantor, form WA, modal booking showroom
    ├── js/data.js           # Data homepage (featured product & project)
    ├── js/products-data.js  # Katalog produk videotron (schema PRD Section 7)
    ├── js/main.js           # Homepage: slider, menu, render, counter, tracking
    ├── js/products.js       # Catalog engine: filter, sort, view toggle, compare
    ├── js/product-detail.js # PDP engine: data binding, simulator, form quote
    ├── js/solutions-data.js # Data 8 industry solutions + wizard options (terpisah)
    ├── js/solutions.js      # Solutions Hub: grid, wizard 3-langkah, matrix, form
    ├── js/solution-detail.js # Industry detail: ecosystem, diagram, kalkulator khusus
    ├── js/projects-data.js  # Data 12 proyek portofolio (terpisah dari kode tampilan)
    ├── js/projects.js       # Projects Hub: search, multi-filter, grid ↔ peta Leaflet
    ├── js/project-detail.js # Case study: BOM breakdown, before/after slider, gated PDF
    ├── js/about-data.js     # Data heritage, evolusi modul, QC, sertifikasi, tim (terpisah)
    ├── js/about.js           # About Us engine: timeline, tech comparison, cert vault, ZIP builder
    ├── js/support-data.js   # Data FAQ, instalasi, maintenance, garansi, downloads (terpisah)
    ├── js/support.js         # Support engine: 5 sub-tab, warranty checker, ticket & survey form
    ├── js/contact-data.js     # Data kantor, departemen WA, jam operasional (terpisah)
    └── js/contact.js          # Contact engine: WA form generator, status jam, booking modal
    └── img/                 # Aset gambar/video produk
```

## Cara menjalankan
Buka `index.html` langsung di browser, atau jalankan server lokal:
```bash
python3 -m http.server 8000
```

## Cakupan homepage (mengikuti PRD Section 6, 40, 42)
Header sticky + dropdown + hamburger · Hero product slider (autoplay, pause on hover,
arrow, dots, swipe) · Why Choose Our LED Display · Featured Products · Indoor vs Outdoor
+ tabel perbandingan · Our Solutions · Product Advantages · Projects + filter kategori ·
About Company + statistik · CTA quote & WhatsApp · Footer lengkap · WhatsApp floating
button · Sticky CTA mobile · SEO dasar (title, meta, canonical, OG, JSON-LD).

## Yang perlu diisi sebelum live
- Logo, foto produk & proyek asli (format WebP/AVIF, `loading="lazy"`)
- Nomor WhatsApp, telepon, alamat, email (saat ini placeholder `628110000000`)
- Angka statistik perusahaan yang sebenarnya
- Spesifikasi produk dari datasheet aktual
- ID Google Analytics / GTM

## Products Tab (PRD Products v1.1 — Phase 1 + Comparison)
9 segmen produk dengan chip switcher & URL routing (`?cat=outdoor-led`) ·
Multi-faceted filter (pixel pitch range, environment, installation type, brightness,
feature badges) · Search debounce 300ms · Sort 4 opsi · Grid View ↔ Technical Table View ·
Load more · Empty state · Mobile slide-over filter drawer · Comparison dock maks. 4 produk
dengan matriks perbandingan (baris berbeda otomatis di-highlight) · WhatsApp auto-fill
berisi nama produk + spesifikasi · Dynamic meta title per segmen.

Seluruh state filter tersimpan di URL search params, sehingga hasil filter bisa di-share
dan di-bookmark.

## Product Detail Page (PRD PDP v2.0)
Routing `product-detail.html?id=<slug>` memuat ke-19 produk dari `PRODUCT_CATALOG` ·
Breadcrumb dinamis dari `category_segment[0]` + `SEGMENTS` · Hero + 4 quick spec card +
badge chips + install type badge · Sticky sub-nav dengan scroll-spy · Spec matrix 14
parameter (Parameter / Nilai / Catatan) · Interactive Cabinet Array Simulator ·
Segment adaptive module untuk 9 segmen · Related products by popularity ·
Form quotation + validasi + redirect WhatsApp · JSON-LD Product schema & meta dinamis.

### Formula simulator (PRD Section 6.1)
```
Cw = ceil(TargetWidth / (cabinet_size_mm[0]/1000))
Ch = ceil(TargetHeight / (cabinet_size_mm[1]/1000))
Resolusi  = (Cw × cabinet_px[0]) × (Ch × cabinet_px[1])
Berat     = Cw × Ch × cabinet_weight_kg
Max Power = Luas Aktual (m²) × max_power_watts_sqm / 1000  (kW)
Jarak pandang = pixel_pitch_mm × 1.0 s/d × 3.0 (meter)
```

## Solutions Tab (PRD Solutions v3.0)
`solutions.html` — Hub dengan 8 industry card, Solution Matching Wizard 3 langkah
(Industri → Lingkungan → Fitur Prioritas → Hasil rekomendasi paket + WhatsApp CTA),
End-to-End Turnkey Process, dan Matrix Perbandingan Antar Solusi Industri.

`solution-detail.html?id=<key>` — Template tunggal untuk 8 industri (advertising,
corporate, government, retail, education, event, stadium, control-room), semua data
dari `solutions-data.js`:
- Hero + audience tags + ringkasan parameter solusi
- Pain Points & Industry Challenges
- Recommended Hardware & Software Ecosystem — LED panel terhubung langsung ke
  `PRODUCT_CATALOG` di `products-data.js` (link ke `product-detail.html`)
- Interactive System Architecture Diagram (klik blok untuk detail)
- Fitur interaktif khusus per industri: DOOH Revenue & ROI Calculator (Advertising),
  TKDN & Procurement Document Generator (Government), Fast Assembly & Rigging
  Calculator (Event), Auditorium Distance-to-Pitch Calculator (Education),
  Glass Transparency Visualizer (Retail); industri lain menampilkan modul highlight
  sesuai deskripsi PRD.
- Inquiry & Consultation Form → payload WhatsApp otomatis mencantumkan sektor industri

Data solusi disimpan terpisah di `solutions-data.js` (bukan digabung ke logika
`solutions.js` / `solution-detail.js`), sehingga menambah atau mengubah 1 industri
tidak perlu menyentuh kode tampilan.

## Projects Tab (PRD Projects v4.0)
`projects.html` — Hub dengan hero stat (500+ proyek, 34 provinsi, 98% CSAT), search +
multi-filter (industri, tipe produk, lokasi) yang bekerja instan di sisi klien, tab
switcher Galeri Kartu ↔ **Peta Sebaran Proyek interaktif** (Leaflet.js + OpenStreetMap,
marker presisi per koordinat, popup foto/klien/produk, quick-filter industri di atas
peta), grid galeri 3 kolom responsif, dan load more.

`project-detail.html?id=<slug>` — Template tunggal untuk seluruh proyek di
`PROJECT_CATALOG`, mengikuti wireframe Section 4.2:
- Hero + breadcrumb dinamis (Home › Projects › Industri › Judul Proyek)
- Main media display dengan tab Foto / Video / 360° View
- Quick Metrics Banner (ukuran layar, luas total, resolusi, waktu pengerjaan)
- Highlighted Products — **terhubung langsung** ke `PRODUCT_CATALOG` di
  `products-data.js`, klik langsung membuka `product-detail.html`
- **Full Bill of Materials (BOM) Breakdown** — dikelompokkan otomatis per tipe
  komponen (Video Processor, Sistem Konstruksi, Software/CMS, Perangkat Pendukung),
  termasuk estimasi jumlah cabinet dihitung otomatis dari luas area ÷ luas cabinet produk
- Challenges & Engineering Solutions (studi kasus teknis)
- **Interactive Before vs. After Slider** — geser dengan mouse maupun sentuhan layar
- Client Testimonial
- Action Call: tombol WhatsApp pre-filled (`generateProjectQuoteWALink`) dan
  **Gated PDF Case Study Download** (form Nama/Email/WhatsApp sebelum unduhan aktif)
- Structured Data `CreativeWork` untuk Google Rich Results

**Reverse Linking (Section 5.1)** — di `product-detail.html`, section baru
*"Proyek Terkait yang Menggunakan Produk Ini"* otomatis menampilkan proyek mana saja
yang memakai produk tersebut, dengan mencari `products_used[]` di seluruh
`PROJECT_CATALOG` — tanpa perlu menandai manual di sisi produk.

Data 12 proyek (mencakup 8 industri: Advertising, Corporate, Government, Retail,
Education, Event, Stadium, Control Room) disimpan terpisah di `projects-data.js`,
mengikuti schema `project-item` persis dari PRD (termasuk koordinat lat/lng untuk peta).

**Catatan implementasi:** field `media.hero_image` / `before_image` / `after_image`
masih berupa path placeholder karena aset foto/video proyek asli belum diunggah — cukup
isi path tersebut dengan aset nyata dan hubungkan ke elemen media viewer saat tersedia.
Berkas Case Study PDF juga belum ada; form gate sudah berfungsi penuh, tinggal
disambungkan ke tautan unduhan asli dan endpoint pengumpulan lead.

## About Us Tab (PRD About Us v5.0)
`about.html` — Trust anchor untuk B2B, panitia pengadaan pemerintah, dan konsultan:
- Hero dengan 3 stat (12+ Tahun, 500+ Proyek, 40% Max TKDN)
- **Interactive Milestone Timeline** — 5 titik sejarah 2014–2026 dengan scroll-reveal
- **Evolusi Teknologi Modul LED** — tab DIP → SMD → GOB → COB/MIP, tiap generasi
  menampilkan structure, protection, pitch minimum, touchability, dan energy efficiency
- **Pitch Progression Chart** — grafik batang penurunan pixel pitch 20mm (2000) → 0,6mm (2026)
- **Interactive Module Tech Comparison Tool** — pilih 2 generasi teknologi, bandingkan
  side-by-side secara real-time
- **Quality Control & Testing Standards** — 4 standar QC (72-Hour Aging Test, IPX8,
  Thermal Imaging, Color Calibration)
- **Certification & Compliance Vault** — 10 dokumen legalitas dikelompokkan 3 kategori,
  dengan lightbox detail per sertifikat
- **Automated Document Pack Builder** — checklist dokumen + form (Nama/Email/Perusahaan)
  untuk simulasi unduhan ZIP terkompresi
- **Certified Engineering Team & Leadership** — profil 4 pimpinan + 3 sertifikasi teknisi
  (Novastar NCE, Colorlight AV Specialist, K3 Konstruksi)
- **Interactive 360° Showroom** — hotspot preview area Experience Center & Workshop
- Structured Data `Schema.org/Organization` dengan `hasCredential` TKDN/ISO

Data disimpan terpisah di `about-data.js` sesuai schema PRD.

## Support Tab (PRD Support Tab v1.0)
`support.html` — Pusat bantuan & purna jual dengan 5 sub-tab (FAQ, Installation,
Maintenance, Warranty, Download Center), dapat diakses langsung via hash URL
(`support.html#warranty`, dst) — sudah disambungkan dari dropdown menu homepage:
- Hero dengan master search bar + Quick Action Grid 4 kartu (langsung lompat ke sub-tab)
- **FAQ** — live search + filter kategori (Spesifikasi, Regulasi/TKDN, Troubleshooting,
  Pembayaran & Garansi), accordion expand/collapse
- **Installation** — tahapan layanan, katalog instalasi (Struktur/Rigging, Kelistrikan,
  Kalibrasi), catatan prosedur K3, dan **Form Request Survei Lokasi** (termasuk uploader
  foto/video) yang mengirim WhatsApp terformat
- **Maintenance** — perbandingan Preventive vs Corrective Maintenance, pemilihan paket
  **SLA** (1×24 jam / 4×24 jam), dan **Trouble Ticket Form** dengan toggle On-Site
  Support / Send-to-Service Center
- **Warranty** — **Warranty Checker** (simulasi lookup Serial Number dengan basis data
  demo di `support-data.js`), tabel cakupan garansi per komponen, syarat & ketentuan,
  dan Formulir Klaim Garansi
- **Download Center** — tabel Software (NovaLCT, ViPlex, LEDVISION, HDSet)/Datasheet/
  Manual Book dengan search + filter kategori, **link balik ke TKDN & Certificate Hub**
  di `about.html#certVault`, dan **Spare Parts Directory** dengan status stok
- Footer khusus: Emergency Helpdesk WhatsApp + daftar Lokasi Service Center

Seluruh data (FAQ, instalasi, maintenance, garansi, downloads, spare parts) disimpan
terpisah di `support-data.js` mengikuti draf schema `supportData.js` pada PRD, sehingga
menambah FAQ atau file unduhan baru tidak perlu menyentuh kode tampilan.

**Catatan implementasi:** Warranty Checker memakai basis data simulasi 3 serial number
contoh (`SN-VDT-2024-001`, dst) karena belum ada backend/API nyata — tinggal ganti
fungsi pencarian dengan pemanggilan endpoint API saat tersedia. Tautan unduhan di
Download Center dan Document Pack Builder juga masih placeholder karena berkas aktual
belum diunggah ke server.

## Contact Tab (PRD Contact Tab v1.0)
`contact.html` — Halaman konversi lead instan dengan seluruh interaksi berujung ke
WhatsApp, tanpa formulir email manual yang lambat:
- **Direct WhatsApp Routing** — 3 kartu departemen (Sales & Konsultasi RFQ, e-Katalog
  & TKDN Specialist, Emergency Technical Support), masing-masing dengan nomor WA sendiri
- **Interactive WA Form** — pilih Kategori Keperluan (otomatis menyarankan departemen
  tujuan yang sesuai lewat `categoryDeptMap`), pilih/ubah departemen manual, isi nama/
  perusahaan/pesan, lalu tombol submit menghasilkan pesan WhatsApp terformat rapi persis
  template `handleSendWhatsApp` di PRD Section 5 dan membuka WhatsApp otomatis
- **Kantor & Showroom** — alamat kantor pusat + showroom, telepon, email, Google Maps
  embed, tombol "Buka di Google Maps" langsung ke arah lokasi
- **Status Jam Operasional Real-time** — indikator "Buka Sekarang" / "Tutup — Buka
  [hari] jam [waktu]" dihitung otomatis dari jadwal terstruktur (Senin–Jumat, Sabtu,
  Minggu/libur) di `contact-data.js`
- **Book a Showroom Visit** — modal penjadwalan kunjungan (tanggal + nama) yang
  mengirim WhatsApp terformat ke Sales, bukan sekadar alert seperti draf PRD
- **Request Call Back** — form cepat Nama + No. HP untuk klien yang buru-buru
- **Social Media & Channel Showcase** — YouTube, Instagram, LinkedIn
- Structured Data `Schema.org/LocalBusiness` dengan jam operasional untuk Google

Data kantor, 3 departemen WhatsApp, kategori keperluan, dan channel sosial disimpan
terpisah di `contact-data.js` mengikuti draf schema PRD, termasuk jadwal jam operasional
terstruktur per hari untuk perhitungan status real-time.

**Catatan implementasi:** `googleMapsEmbedUrl` pada PRD berupa URL contoh/placeholder
— ganti dengan embed URL asli dari Google Maps (Share → Embed a map) begitu showroom
sudah didaftarkan di Google Business Profile. Ketiga nomor WhatsApp departemen juga
masih nomor contoh dan perlu diganti nomor operasional sebenarnya.

## Semua Tab Selesai
Ketujuh modul PRD kini lengkap: Homepage, Products, Solutions, Projects, About Us,
Support, dan Contact — saling terhubung melalui data bersama (`products-data.js`
menjadi rujukan silang di Solutions/Projects/PDP; `about.html#certVault` dirujuk dari
Support Download Center). Langkah lanjutan yang tersisa bersifat operasional:
CMS admin untuk mengelola seluruh data tanpa developer (PRD Products Section 14),
upload aset foto/video/sertifikat asli menggantikan placeholder, dan endpoint backend
untuk fitur yang saat ini disimulasikan di sisi klien (warranty checker, gated PDF,
document pack ZIP, TKDN document generator, request call back).

## Perbaikan Bug Products Tab (Compare Modal & Pagination)
Diperbaiki langsung di `products.js`/`products.css`:
- Semua `addEventListener` pada elemen opsional (terutama modal compare) dibungkus
  helper `on(el, evt, fn)` yang mengecek null lebih dulu, supaya satu elemen yang
  hilang dari HTML tidak lagi menghentikan seluruh script (termasuk render grid produk).
  Render katalog (`apply()`/`paintDock()`) juga dijalankan lebih dulu, sebelum listener
  modal compare dipasang.
- Popup perbandingan sekarang hanya terbuka jika ≥2 produk dipilih, dan bisa ditutup
  lewat tombol ×, tombol Escape, maupun klik di luar area modal (backdrop) — ketiganya
  sudah diverifikasi lewat pengujian headless (jsdom).
- Pagination "Muat Produk Lainnya" dihapus: begitu masuk ke Products Tab, seluruh 19
  produk videotron langsung tampil tanpa klik tambahan.
- Tata letak grid dirapikan — baris checkbox "Bandingkan" dipisah dari tombol View
  Detail/Minta Penawaran — dan tabel teknis (`spectable`) diberi bingkai kartu +
  zebra-striping agar lebih mudah dibaca.

## Integrasi Data Excel (BOQ Engineering Template) — Products & Product Detail Tab
Data dari `Draft Format Penawaran LED (NEW, No Price).xlsx` diekstrak ke
`assets/js/bom-reference-data.js` (`window.BOM_REFERENCE`): 32 Modul LED, 20 Receiving
Card, 75 Controller/Sending Box, 6 Power Supply, 8 Box Power, dan 19 Cabinet, plus dua
konstanta kalkulasi (`PIXELS_PER_PORT = 650.000` dan `SPARE_RATE = 5%`) yang dipakai
sheet aslinya. **File sumber tidak memuat harga satuan sama sekali** — ini ditandai
jelas di komentar kode dan di UI.

Dipakai di dua tempat sesuai permintaan:
- **Products Tab** (`products.html` + `assets/js/hwref.js`) — bagian baru "Database
  Referensi Modul & Hardware" di bawah katalog: 6 tab (Modul LED, Receiving Card,
  Controller/Sending Box, Power Supply, Box Power, Cabinet), masing-masing dengan
  tabel yang bisa dicari (brand/model/pitch). Berguna untuk tim procurement/engineering
  klien yang ingin cek kompatibilitas hardware tanpa membuka file Excel.
- **Product Detail Tab** (`product-detail.js` + `product-detail.css`) — bagian baru
  "Bill of Materials & Estimasi Harga" di dalam Simulator Cabinet setiap produk:
  pilih Receiving Card/Controller/Power Supply dari dropdown, BOM (jumlah cabinet,
  receiving card, controller, power supply + cadangan 5%) dihitung otomatis dari luas
  layar yang disimulasikan, dan form 7 input harga satuan (modul, RC, PSU, controller,
  struktur, instalasi, % aksesoris) menghasilkan estimasi total harga proyek secara
  real-time. Payload WhatsApp "Minta Penawaran" ikut membawa rincian BOM & estimasi ini.

**Catatan implementasi:** Karena source Excel tidak memiliki harga, seluruh field
harga di Simulator diisi manual oleh pengguna (default 0 — `window.PRICE_DEFAULTS`)
dan ditandai sebagai estimasi internal, bukan daftar harga resmi. Saat data harga resmi
tersedia dari tim sales, cukup set nilai default pada `PRICE_DEFAULTS` di
`bom-reference-data.js` atau sambungkan ke endpoint harga sesungguhnya.

## Penggantian Katalog Produk (Products & Product Detail Tab)
`PRODUCT_CATALOG` di `products-data.js` diganti total dari 19 produk fiktif bermerek
"LumeniX" menjadi **32 modul nyata** (DAHUA, LAMPRO, JIACAI, DIGILIGHT) — persis daftar
nama yang diminta, sama dengan daftar `modules` di `bom-reference-data.js`. Setiap
entri memakai nama produk **verbatim** dari daftar tersebut sebagai `product_name`,
dengan `product_id` disamakan dengan id modul terkait (`mod-1`...`mod-32`) agar katalog
produk dan database referensi hardware tetap konsisten satu sama lain.

**Field yang diturunkan langsung dari nama/data modul** (akurat): pixel pitch,
resolusi modul (px), refresh rate, environment (Indoor/Outdoor), brand.

**Field yang disintesis dengan rumus konsisten** (karena tidak ada di source Excel —
brightness, IP rating, ukuran fisik cabinet dalam mm, bobot, konsumsi daya, viewing
angle, badges, segment, tagline, highlight — ditandai jelas di komentar kode
`assets/js/products-data.js` sehingga mudah dikoreksi manual bila tim punya data
datasheet resmi per modul):
- Brightness & konsumsi daya dihitung naik sesuai pixel pitch (mengikuti pola yang
  sudah ada di data lama), bukan datasheet aktual pabrikan.
- Ukuran fisik cabinet memakai dimensi modul 32×16 cm dari nama produk + kedalaman
  nominal per tipe (indoor rigid/flexible/outdoor).
- Kategori segmen (`category_segment`) ditentukan dari kombinasi pitch + environment:
  pitch < 1.5mm → Fine Pitch LED saja; 1.5–2.0mm indoor → Indoor + Fine Pitch; > 2.0mm
  indoor → Indoor LED saja; environment Outdoor → Outdoor LED; modul "Flexible" →
  Flexible LED (menggantikan kategori lain).

**Dampak pada segmen lama yang sekarang kosong:** karena daftar baru ini seluruhnya
modul Indoor/Outdoor/Flexible (tidak ada item Rental, Transparent, Creative non-flex,
Sport, maupun Custom), chip filter "Rental LED", "Transparent LED", "Creative LED",
"Sport LED" dan "Custom LED" di Products Tab untuk saat ini akan menampilkan "Tidak ada
produk ditemukan" jika diklik. Chip-nya tetap ada (tidak dihapus) supaya mudah diisi
lagi begitu ada data modul untuk kategori tersebut — beri tahu kami jika chip ini
sebaiknya disembunyikan dulu.

**Referensi silang ke Solutions & Projects Tab:** Kedua tab tersebut menyimpan daftar
`products`/`products_used` yang menunjuk ke product_id produk lama (`vtr-...`). Karena
produk lama sudah tidak ada, setiap referensi dipetakan otomatis ke modul baru yang
paling mendekati dari sisi pixel pitch + environment (misalnya referensi ke "P3.91
Outdoor" dipetakan ke "DAHUA P4 RGB Outdoor" sebagai modul outdoor terdekat yang
tersedia). Daftar produk duplikat hasil pemetaan ini sudah dibersihkan. Pemetaan ini
sudah diverifikasi me-render nama produk baru dengan benar di halaman Solution Detail
dan Project Detail (pengujian headless), tapi karena sifatnya pendekatan terdekat
(bukan 1:1 sempurna), ada baiknya tim meninjau ulang rekomendasi produk di kedua tab
tersebut secara manual.

**Homepage (`index.html`) sudah ikut disesuaikan** — hero slider (3 slide) dan bagian
"Featured Products" (4 kartu, dari `assets/js/data.js`) sekarang menampilkan produk
nyata dari katalog baru, lengkap dengan spesifikasi asli (nits, Hz, IP rating) dan
tautan "Explore Product"/"View Details" yang mengarah ke slug yang benar di
`product-detail.html?id=...`:
- Hero slide 1: DAHUA P4 RGB Outdoor 7680Hz (Outdoor)
- Hero slide 2: DAHUA P1.25 RGB Indoor GOB HUB320 (Fine Pitch)
- Hero slide 3: DAHUA Flexible P2.5 RGB Indoor (Flexible)
- Featured grid: DAHUA P4 Outdoor, DAHUA P2.5 Indoor, LAMPRO P1.839 Indoor, DAHUA
  Flexible P4 Indoor
  *(item ke-3 sempat berisi DAHUA P1.86 Indoor; diganti ke LAMPRO P1.839 Indoor pada
  tahap penyematan foto produk di bawah karena item ini punya foto produk asli,
  sedangkan DAHUA P1.86 belum — lihat bagian "Penyematan Foto Produk".)*

Sudah diverifikasi lewat pengujian headless bahwa keempat tautan "View Details" di
Featured Products dan ketiga tautan "Explore Product" di hero slider benar-benar
cocok dengan slug yang ada di `PRODUCT_CATALOG` (tidak ada tautan mati).

## Penyematan Foto Produk (Products Tab, Product Detail, Index Tab)

Dari asset zip berisi foto produk DAHUA/LAMPRO (22 file gambar), foto-foto tersebut
sudah dicocokkan dan disematkan ke 14 dari 32 produk di katalog, berdasarkan
kecocokan brand + pixel pitch + environment (indoor/outdoor) + status flexible.
File asli (PNG) dikompresi ke JPEG kualitas 85 untuk efisiensi ukuran — total payload
turun dari ±4.5MB menjadi ±1.3MB — dan disimpan di `assets/img/products/mod-N.jpg`.

**14 produk yang sekarang punya foto asli:**
- DAHUA P1.25 RGB Indoor GOB HUB320 (mod-1)
- DAHUA P2.5 RGB Indoor 6000Hz (mod-6)
- DAHUA P2.5 RGB Outdoor (mod-10)
- DAHUA P4 RGB Outdoor (mod-12)
- DAHUA P5 RGB Outdoor (mod-13)
- DAHUA P6.67 RGB Outdoor (mod-14)
- DAHUA P8 RGB Outdoor (mod-15)
- DAHUA Flexible P1.53 RGB Indoor (mod-17)
- DAHUA Flexible P1.86 RGB Indoor (mod-18)
- DAHUA Flexible P2.5 RGB Indoor (mod-19)
- DAHUA Flexible P4 RGB Indoor (mod-20)
- LAMPRO P1.839 RGB Indoor (mod-22)
- LAMPRO P2.5 RGB Indoor (mod-24)
- LAMPRO P4 RGB Outdoor (mod-26)

18 produk sisanya (termasuk seluruh seri DIGILIGHT, seri JIACAI, dan beberapa pitch
DAHUA/LAMPRO lain) tidak punya foto yang cocok di dalam asset zip, sehingga tetap
memakai tampilan placeholder gradient + label "P{pitch}" seperti sebelumnya — tidak
ada perubahan visual untuk produk-produk ini.

**Di mana foto ditampilkan:**
- **Products Tab** (`products.html`): kartu grid (`.card__img`) menampilkan foto
  sebagai background, dengan badge pitch kecil di pojok kiri bawah menggantikan teks
  "P{pitch}" raksasa di tengah. Tampilan tabel (table view) sengaja tidak diubah.
- **Product Detail Tab** (`product-detail.html`): foto tampil di viewer utama (hero
  image), dengan badge pitch di pojok kiri atas. Tab Cabinet/Modul/Instalasi/Video di
  bawahnya tetap hanya mengganti teks keterangan (caption), bukan foto — karena hanya
  ada satu foto asli per produk, bukan satu per tab.
- **Index Tab** (`index.html`): 3 slide hero diganti memakai foto produk asli (dengan
  overlay gradasi gelap supaya teks tetap terbaca), dan grid "Featured Products" (4
  kartu) juga menampilkan foto. Karena item ke-3 di Featured Products sebelumnya
  (DAHUA P1.86 Indoor) tidak punya foto, item itu diganti ke LAMPRO P1.839 Indoor yang
  punya foto, supaya keempat kartu Featured Products konsisten menampilkan foto asli.

**Catatan/caveat:**
- 8 dari 22 foto yang diupload (termasuk 1 pasang file identik/duplikat) menunjukkan
  produk dengan pixel pitch yang **tidak ada** di 32 produk katalog saat ini (P3.91,
  P2.604, P2.97 — baik varian Indoor maupun Outdoor). Foto-foto ini **tidak
  disematkan ke produk manapun** supaya tidak salah merepresentasikan spesifikasi
  produk. Beri tahu kami jika pitch tersebut sebenarnya typo dari pitch yang ada di
  katalog, atau jika memang perlu ditambahkan sebagai produk baru.
- Beberapa foto menunjukkan angka refresh rate (Hz) pada banner gambar yang berbeda
  dari nilai `refresh_rate_hz` tersimpan di katalog untuk produk yang paling cocok
  (misalnya banner DAHUA P4 Outdoor bertuliskan "3840HZ" sedangkan data katalog
  menyimpan 7680Hz). Foto tetap dipakai karena berfungsi sebagai foto produk fisik
  (bentuk modul), bukan lembar spesifikasi — tapi sebaiknya tim memverifikasi ulang
  kecocokan ini secara manual bila presisi tinggi dibutuhkan.
- Saat verifikasi visual, ditemukan bug lama (bukan dari perubahan sesi ini) di mana
  modal "Bandingkan Spesifikasi" pada Products Tab selalu tampil terbuka saat halaman
  dimuat (atribut HTML `hidden` tertimpa oleh aturan CSS `.modal{display:grid}`).
  Sudah diperbaiki dengan menambah aturan `.modal[hidden]{display:none}` di
  `assets/css/products.css`.

Sudah diverifikasi lewat jsdom (render DOM + class `has-photo` + atribut
`background-image` pada keempat permukaan di atas) dan tangkapan layar nyata
(Playwright + Chromium) bahwa foto tampil dengan benar, teks tetap terbaca di atas
foto, dan produk tanpa foto tetap jatuh ke tampilan placeholder lama tanpa error.
