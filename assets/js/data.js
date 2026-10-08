/* Data sementara (Phase 1). Nanti diganti endpoint CMS — lihat PRD Section 26.
   id di bawah ini mengacu ke slug asli di window.PRODUCT_CATALOG (products-data.js)
   supaya tautan "View Details" valid — lihat juga catatan di README (Penggantian
   Katalog Produk) tentang pergantian ke 32 modul DAHUA/LAMPRO/JIACAI/DIGILIGHT. */
window.PRODUCTS = [
  { id:"dahua-p4-rgb-outdoor-1-10s-32x16cm-80x40-7680hz", name:"DAHUA P4 RGB Outdoor 7680Hz", cat:"Outdoor LED", pitch:"P4",
    brightness:"6920 nits", refresh:"7680 Hz", app:"Billboard & Fasad", image:"assets/img/products/mod-12.jpg" },
  { id:"dahua-p2-5-rgb-indoor-1-32s-32x16cm-128x64-6000hz", name:"DAHUA P2.5 RGB Indoor 6000Hz", cat:"Indoor LED", pitch:"P2.5",
    brightness:"1285 nits", refresh:"6000 Hz", app:"Mall & Lobby", image:"assets/img/products/mod-6.jpg" },
  { id:"lampro-p1-839-rgb-indoor-1-58s-32x16cm-174x87-3840hz-hub320", name:"LAMPRO P1.839 RGB Indoor 3840Hz", cat:"Fine Pitch LED", pitch:"P1.839",
    brightness:"1093 nits", refresh:"3840 Hz", app:"Control Room", image:"assets/img/products/mod-22.jpg" },
  { id:"dahua-flexible-p4-rgb-indoor-1-20s-32x16cm-80x40-3840hz", name:"DAHUA Flexible P4 Indoor", cat:"Flexible LED", pitch:"P4",
    brightness:"1720 nits", refresh:"3840 Hz", app:"Curved Wall & Pillar", image:"assets/img/products/mod-20.jpg" }
];

window.PROJECTS = [
  { title:"Shopping Mall LED Display", loc:"Jakarta", spec:"Outdoor P3.91 — 96 m²", cat:"retail" },
  { title:"Corporate Lobby Video Wall", loc:"Surabaya", spec:"Fine Pitch P1.86 — 18 m²", cat:"corporate" },
  { title:"Command Center Display", loc:"Bandung", spec:"Indoor P1.5 — 24 m²", cat:"government" },
  { title:"Stage LED Konser Outdoor", loc:"Bali", spec:"Rental P2.9 — 120 m²", cat:"event" },
  { title:"Perimeter LED Stadion", loc:"Semarang", spec:"Sport P10 — 180 m²", cat:"event" },
  { title:"Storefront Transparent LED", loc:"Tangerang", spec:"Transparent P7.8 — 32 m²", cat:"retail" }
];

window.PROJECT_FILTERS = [
  { key:"all", label:"All" }, { key:"corporate", label:"Corporate" },
  { key:"retail", label:"Retail" }, { key:"event", label:"Event" },
  { key:"government", label:"Government" }
];
