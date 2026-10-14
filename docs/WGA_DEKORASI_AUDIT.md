# Scan source WGA Dekorasi

Sumber: `D:/PROJECT WEB WGA DEKORASI`. Audit statis pada 14 Oktober 2026.

Scan ini tidak membuka file `.env`, kredensial, private key, konfigurasi koneksi,
kode inti autentikasi, migrasi SQL, atau data database. Tidak ada perintah dev,
build, import, atau tes yang dijalankan pada proyek sumber. Proyek sumber tidak
diubah. Status koneksi layanan dan deployment produksi tidak diverifikasi.

## Isi website

- **Beranda:** layanan dekorasi dan tenda, meja dan kursi, panggung dan peralatan,
  preview katalog, profil usaha, cara pesan, kontak WhatsApp, serta peta lokasi.
- **Katalog:** pencarian perlengkapan, filter kategori, preview gambar dalam
  lightbox, pagination otomatis, dan tombol coba lagi ketika pemuatan gagal.
  Ada metadata 30 halaman katalog bawaan sebagai fallback ketika API gagal.
  Jumlah item pada database aktif tidak diperiksa.
- **Momen:** galeri foto dekorasi, filter kategori, pagination otomatis, dan
  lightbox foto.
- **Ulasan:** form nama, lokasi, rating dan komentar, daftar ulasan, statistik
  jumlah ulasan dan rata-rata rating, serta verifikasi Turnstile.
- **Admin:** halaman login, upload dan hapus item katalog, upload dan hapus foto
  momen, serta pengelolaan dan penghapusan ulasan. Implementasi rahasia login
  tidak diperiksa.
- **Alur layanan:** konsultasi dan penawaran melalui WhatsApp, konfirmasi dan DP,
  kemudian pengiriman dan pemasangan. Ini isi halaman layanan, bukan checkout
  atau pembayaran online pada website.

## Tech stack yang ditemukan

| Bagian | Teknologi | Bukti source |
| --- | --- | --- |
| Frontend | HTML, CSS dengan token desain, vanilla JavaScript | `README.md:3`, halaman publik, `css/style.css`, `js/main.js` |
| Backend | Node.js 24.x, Vercel Functions, handler CommonJS | `package.json:6`, `api/catalog.js`, `api/moments.js`, `api/reviews.js` |
| Database | Supabase untuk katalog, kategori, momen, dan ulasan | `README.md:3`, query pada API publik |
| Penyimpanan foto | Supabase Storage | `README.md:3`, `server/media-save.cjs` |
| Verifikasi form | Cloudflare Turnstile | `README.md:4`, `js/review-shared.js:64`, `api/reviews.js` |
| Optimasi gambar saat build | Sharp, varian WebP hero 640px dan 1280px | `package.json:16`, `scripts/optimize-images.cjs` |
| Optimasi foto upload | Browser Canvas, WebP dengan fallback JPEG, thumbnail | `js/admin-media.js` |
| Tes database lokal | PGlite 0.5.8 | `package.json:15`, `tests/database.test.cjs:5` |
| Tes otomatis | Node test runner dan assert | `tests/gallery.test.cjs:1`, `tests/reviews.test.cjs:1` |
| Integrasi publik | WhatsApp, Google Maps embed, Google Fonts | `index.html`, `css/style.css:2`, `README.md:19` |

PGlite digunakan untuk pengujian PostgreSQL lokal. PGlite tidak diidentifikasi
sebagai database produksi. Tidak ada dasar untuk menulis Firebase sebagai
backend proyek ini.

## Interaksi, animasi, dan optimasi

- Menu mobile, perubahan tampilan header saat scroll, dan pengembalian fokus.
- Reveal kartu layanan dan highlight teks dengan IntersectionObserver.
- Lightbox dengan preview thumbnail, pemuatan foto asli, tombol Escape, dan
  pengelolaan fokus.
- Pagination katalog dan momen berbasis cursor.
- Cache sessionStorage untuk katalog dan momen.
- Prefetch halaman internal dan data publik.
- Cache HTTP untuk katalog dan momen. Feed ulasan memakai `no-store` agar
  kiriman terbaru tidak tertahan cache.
- Gambar hero responsif dengan `srcset`, serta lazy loading gambar pendukung.
- Metadata SEO, Open Graph, structured data katalog, `robots.txt`, dan sitemap.
- Dukungan preferensi reduced motion.

## Penerapan pada portofolio

Data WGA Dekorasi sudah diperbarui berdasarkan audit ini. Tech-Stack memakai
empat kelompok: **Frontend**, **Backend & Data**, **Integrations**, serta
**Media & Testing**. Penjelasan berada di box teknologi yang dipilih, mengikuti
layout dan interaksi Bali Adventure.

Lima bagian overview menjelaskan katalog, galeri momen, ulasan klien,
konsultasi WhatsApp, dan panel admin. Role ditulis sebagai UI/UX & Web Developer.
Tahun proyek tidak diverifikasi dalam audit ini.

Mockup memakai 9 foto desktop dan 9 foto mobile yang diberikan pengguna di
`image portofolio/WGA DEKORASI/Dekstop` dan `Mobile`, dengan urutan cover lalu
1 sampai 8. Cover baru juga digunakan di folder proyek dan overview.

Logo tersimpan lokal di `image portofolio/WGA DEKORASI/Stack`, dengan subfolder
`FE`, `BE`, `Integrations`, dan `Tools`. Sumber unduhan dan atribusi tercatat di
[SOURCES.md](../image%20portofolio/WGA%20DEKORASI/Stack/SOURCES.md).

Pembaruan ini hanya mengubah portofolio. Proyek sumber tetap tidak diubah,
dan file sensitif tetap tidak dibuka.
