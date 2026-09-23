## Portofolio Pribadi & Layanan Interaktif

Tugas Praktikum Minggu 03 - Pemrograman dan Pengujian Web (12S3101)
Program Studi Sarjana Sistem Informasi — Institut Teknologi Del

## dentitas Mahasiswa
Nama: Indah Triyuni Siahaan
NIM: 12S24052
Kelas: 13SI2
Program Studi: S1 Sistem Informasi
Fakultas: Fakultas Informatika dan Teknik Elektro (FITE)
Institusi: Institut Teknologi Del

## Deskripsi Proyek
Proyek ini merupakan hasil refactoring dari tugas praktikum Minggu 2. Halaman web portofolio pribadi dan layanan interaktif ini dikembangkan dengan menerapkan penguasaan CSS lanjutan, kalkulasi spesifisitas selektor tanpa pemaksaan !important, serta integrasi Bootstrap 5.3.3 untuk menciptakan antarmuka yang modern, rapi, dan responsif. Proyek ini juga dipublikasikan melalui GitHub Pages.

## Fitur-Fitur Halaman

### Navigasi Responsif (Sticky Navbar):
---Navigasi menempel di bagian atas layar saat halaman digulir.
---Dilengkapi menu hamburger (collapse) untuk perangkat layar kecil/smartphone.

### Bagian Profil (Hero Section):
---Menampilkan identitas pengembang, foto profil, status aktif, bio singkat, dan badge keahlian teknis.

### Showcase Proyek Akademik:
---Ditampilkan dalam bentuk kartu grid yang responsif.
---Setiap kartu proyek memiliki tombol interaktif untuk membuka jendela Modal berisi rincian peran, perangkat yang digunakan, dan pencapaian proyek.
---Terdapat rekapitulasi data proyek dalam format tabel yang rapi.

### Layanan Spesialisasi:
---Informasi bidang fokus layanan seperti Web Frontend Design dan Software Modeling.

### Formulir Konsultasi:
---Menggunakan Floating Labels (.form-floating) dan Input Groups berikon.
---Dilengkapi validasi form Bootstrap (peringatan visual jika data kosong atau format email belum sesuai).

### Desain & Gaya Tampilan:
---Tampilan modern dengan penerapan CSS Custom Properties (:root) untuk standardisasi warna dan variabel jarak.
---Menggunakan selektor CSS lanjutan (kombinator, :hover, :focus-visible, :nth-child()).
---Kode CSS bersih dan terstruktur tanpa ketergantungan buruk pada !important.

## Teknologi yang Digunakan
---HTML5: Struktur semantik halaman web.
---CSS3: Styling kustom, variabel warna (:root), selektor tingkat lanjut, dan efek transisi.
---Bootstrap 5.3.3 (CDN): Sistem grid 12 kolom responsif, komponen modal, navbar responsif, kartu, badge, dan validasi form.
---Bootstrap Icons 1.11.3 (CDN): Kumpulan ikon antarmuka.
---Git & GitHub Pages: Version control dan media publikasi halaman web.

Struktur Berkas

├── IMG/
│   └── foto.jpeg        # Foto profil pengembang=
├── index.html           # Halaman utama portofolio
├── style.css            # Berkas penataan gaya (CSS kustom)
└── README.md            # Dokumentasi proyek praktikum