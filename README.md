## Portofolio Pribadi & Layanan Interaktif

Tugas Praktikum Minggu 04 - Pemrograman dan Pengujian Web (12S3101)
Program Studi Sarjana Sistem Informasi — Institut Teknologi Del

## Identitas Mahasiswa
**Nama** : Indah Triyuni Siahaan
**NIM** : 12S24052
**Kelas** : 13SI2
**Program Studi** : S1 Sistem Informasi
**Fakultas** : Fakultas Informatika dan Teknik Elektro (FITE)
**Institusi** : Institut Teknologi Del
**Live Deployment** :
 [https://github.com/IndahSiahaan/ppw-2026-week2-12S24052/tree/week4-architecture]
 (https://indahsiahaan.github.io/ppw-2026-week2-12S24052/)

## Deskripsi Proyek
Proyek ini merupakan hasil refactoring arsitektural dari tugas praktikum Minggu 3. Halaman web portofolio pribadi dan layanan interaktif ini bertransformasi dari pendekatan monolitik statis menjadi berarsitektur kontemporer **Decoupled Multi-Tier** berbasis **Dynamic Client-Side Rendering (CSR)**.

Seluruh konten (profil, proyek akademik, dan layanan) diisolasikan ke dalam berkas data JSON terpisah (*data layer*) dan diinjeksi secara asinkron menggunakan JavaScript ES6+ Fetch API. Proyek ini juga mengintegrasikan komponen **Universal Dynamic Modal**, pengiriman formulir asinkron via AJAX/Fetch ke `localStorage`, serta pengujian profil kinerja jaringan menggunakan Browser DevTools.

---

## Modul Refactoring Arsitektur Minggu 4

### 1. Pemodelan Arsitektur C4 Container Model
Sistem diuraikan berdasarkan prinsip pemisahan minat (*Separation of Concerns*) menjadi tiga lapisan terpisah:

mermaid
graph TD
    user[User Browser / Client]
    
    subgraph Presentation Tier
        HTMLShell[index.html - Static CSR Shell]
        AppJS[js/app.js - UI Controller & DOM Engine]
        Styles[css/custom-style.css - UI Styles & Glassmorphism]
    end

    subgraph Data Access Layer
        APIService[js/api-services.js - Fetch API Provider]
    end

    subgraph Decoupled Data Tier
        JSON1[(data/profile.json - Identity & Metrics)]
        JSON2[(data/projects.json - Academic Projects)]
        JSON3[(data/services.json - Service Catalog)]
    end

    subgraph Client State Persistence
        LocalStorage[(Browser LocalStorage - Order Records)]
    end

user -->|1. Request Shell| HTMLShell
HTMLShell -->|2. Exec Script & Styles| AppJS
AppJS -->|3. Async Fetch Call| APIService
APIService -->|4. HTTP GET JSON Data| JSON1
APIService -->|5. HTTP GET JSON Data| JSON2
APIService -->|6. HTTP GET JSON Data| JSON3
AppJS -->|7. Dynamic DOM Injection| user
AppJS -->|8. Persist Order DTO| LocalStorage


### 2. Komparasi Arsitektur: Sebelum vs Sesudah Refactoring

a. Arsitektur Rendering:
- Sebelum (Week 3): Monolithic Static HTML (SSR/MPA-like)
- Sesudah (Week 4): Decoupled Client-Side Rendering (CSR)

b. Komponen Modal:
- Sebelum (Week 3): 4 Elemen Modal Statis (Hardcoded di HTML)
- Sesudah (Week 4): 1 Universal Dynamic Modal berbasis Data-ID

c. Penyimpanan Data:
- Sebelum (Week 3): Terikat langsung (Tightly Coupled) di HTML
- Sesudah (Week 4): Terpisah secara modular di berkas JSON (/data)

d. Pengiriman Formulir:
- Sebelum (Week 3): Standard Browser Page Reload
- Sesudah (Week 4): Asinkron murni via Fetch API + Toast Feedback

e. Persistensi State:
- Sebelum (Week 3): Hilang saat halaman diperbarui
- Sesudah (Week 4): Tersimpan secara lokal di Browser localStorage

f. Manajemen UI States:
- Sebelum (Week 3): Statis tanpa status pemuatan
- Sesudah (Week 4): Terkelola 4 status (Loading, Success, Empty, & Error)

### 3. Profil Kinerja & Pengukuran DevTools (RFC 9111 Caching)
Pengujian dilakukan menggunakan Chrome DevTools Network Panel pada koneksi Simulated Fast 3G:

a. Cold Load (Pemuatan Awal / Tanpa Cache):
- Total Request: 12 Requests
- Transferred Size: ~350 KB
- TTFB (Time To First Byte): 42 ms
- HTTP Status Main Assets: 200 OK

b. Warm Load (Pemuatan Ulang / Cache Aktif):
- Total Request: 12 Requests
- Transferred Size: ~2.1 KB (Saved 99%)
- TTFB (Time To First Byte): 12 ms
- HTTP Status Main Assets: 304 Not Modified (ETag matched)

## Fitur-Fitur Halaman
Navigasi Responsif (Sticky Navbar):
---Navigasi menempel di bagian atas layar saat halaman digulir.
---Dilengkapi menu hamburger (collapse) untuk perangkat layar kecil/smartphone.

## Bagian Profil & Metrik Dinamis (Hero Section):
---Menampilkan identitas pengembang, foto profil, status aktif, bio singkat, dan badge keahlian teknis yang di-fetch secara asinkron dari data/profile.json.

## Showcase Proyek Akademik (Dynamic CSR Grid):
---Ditampilkan dalam bentuk kartu grid yang responsif hasil rendering dinamis data/projects.json.
---Dilengkapi fitur Filter Kategori Proyek instan (Modeling, Architecture, Networking, Java OOP) tanpa page reload.
---Terdapat rekapitulasi data proyek dalam format tabel yang rapi.

## Universal Dynamic Modal Component:
---Menggunakan 1 Universal Modal Tunggal Bootstrap 5 yang menyajikan rincian peran, perangkat, dan pencapaian proyek secara dinamis berbasis atribut data-id tanpa duplikasi elemen HTML.

## Layanan Spesialisasi:
---Informasi katalog bidang fokus layanan yang dimuat secara dinamis dari data/services.json.

## Formulir Konsultasi Asinkron & Local State:
---Menggunakan Floating Labels (.form-floating) dan Input Groups berikon.
---Pengiriman formulir berjalan secara asinkron (no full page reload) dengan serialisasi JSON DTO.
---Data pemesanan disimpan secara persisten ke localStorage dan memperbarui UI Order Badge secara real-time disertai notifikasi Bootstrap Toast.

## Desain & Gaya Tampilan:
---Tampilan modern dengan penerapan CSS Custom Properties (:root) untuk standardisasi warna dan variabel jarak.
---Menggunakan selektor CSS lanjutan (kombinator, :hover, :focus-visible, :nth-child()).
---Kode CSS bersih dan terstruktur tanpa ketergantungan buruk pada !important.

## Teknologi yang Digunakan
---HTML5: Struktur semantik static shell halaman web.
---CSS3: Styling kustom, variabel warna (:root), selektor tingkat lanjut, dan efek transition/glassmorphism.
---JavaScript ES6+: Dynamic Client-Side Rendering (CSR), Fetch API (async/await), Event Delegation, dan DOM Manipulation.
---Bootstrap 5.3.3 (CDN): Sistem grid 12 kolom responsif, komponen Universal Modal, Toast, Badge, dan validasi form.
---Bootstrap Icons 1.11.3 (CDN): Kumpulan ikon antarmuka.
---Git & GitHub Pages: Version control, manajemen branch (week4-architecture), dan media publikasi halaman web.

## Struktur Berkas
Plaintext
├── css/
│   └── custom-style.css    # Berkas penataan gaya (CSS kustom & overrides)
├── data/
│   ├── profile.json        # Decoupled Data Provider: Profil, skills, & metrics
│   ├── projects.json       # Decoupled Data Provider: Katalog proyek akademik
│   └── services.json       # Decoupled Data Provider: Katalog paket layanan
├── IMG/
│   └── foto.jpeg           # Foto profil pengembang
├── js/
│   ├── api-services.js     # Data Access Layer: Provider pemanggilan Fetch API
│   └── app.js              # Presentation Layer: Controller UI, CSR engine, & events
├── index.html              # Static CSR Shell halaman portofolio
└── README.md               # Dokumentasi arsitektur & laporan praktikum