# Teknologi proyek Satya Widnyana

Diperbarui 15 Oktober 2026 untuk Bali Adventure, WGA Dekorasi, WGA Ocean, dan
portofolio ini. Daftar menunjukkan teknologi proyek, bukan tingkat penguasaan
mandiri atau sertifikasi. Proses kerja mencakup referensi visual, pengarahan
tampilan, implementasi berbantuan AI, serta peninjauan dan revisi di browser.

## Dasar pemeriksaan

| Proyek | Dasar informasi | Batas pemeriksaan |
| --- | --- | --- |
| Portofolio | Source aktif dalam workspace | HTML, CSS, JavaScript, animasi, dan server lokal diperiksa langsung. |
| WGA Ocean | Source `D:/PROJECT WEB WGA OCEAN`, 15 Oktober 2026 | Package, komponen, CSS, API, provider/model Prisma; layanan produksi tidak diuji. |
| WGA Dekorasi | [Audit 14 Oktober 2026](WGA_DEKORASI_AUDIT.md) | Menggunakan audit terdahulu, tanpa mengaudit ulang source pada perubahan ini. |
| Bali Adventure | Analisis terdahulu pada `assets/js/features/lightbox.js` dan aset stack | Menggunakan hasil analisis yang sudah ada, tanpa mengaudit ulang source. |

Audit Ocean: [WGA_OCEAN_AUDIT.md](WGA_OCEAN_AUDIT.md).

## Bahasa, frontend, dan animasi

| Teknologi | Kategori / fungsi | Proyek |
| --- | --- | --- |
| HTML5 | Bahasa markup; struktur halaman | Bali Adventure, WGA Dekorasi, Portofolio |
| CSS3 | Bahasa stylesheet; layout responsif, warna, animasi | Keempat proyek; Ocean memakai CSS Modules dan CSS global |
| JavaScript | Bahasa pemrograman; browser dan server | Bali Adventure, WGA Dekorasi, Portofolio; source Ocean memakai TypeScript |
| TypeScript | Bahasa pemrograman; komponen dan API | WGA Ocean |
| React | Library antarmuka | WGA Ocean |
| Next.js | Framework React, App Router, rendering server, API | WGA Ocean |
| Framer Motion | Library animasi React, berbeda dari Framer website builder | WGA Ocean: import dan penggunaan pada HomeClient dan MomentsClient |
| CSS 3D / Web Animations API | Animasi native browser | Portofolio |

## Backend, database, storage, dan autentikasi

| Teknologi | Kategori / fungsi | Proyek |
| --- | --- | --- |
| Node.js | Runtime JavaScript server | WGA Dekorasi; server Next.js Ocean; server pengembangan lokal portofolio |
| Next.js Route Handlers | Endpoint aplikasi | Ocean: aktivitas, Moments, booking, upload |
| Vercel Functions | Runtime serverless API | WGA Dekorasi |
| Supabase Database & Storage | Database PostgreSQL dan penyimpanan foto | WGA Dekorasi |
| PostgreSQL | Database relasional | WGA Dekorasi; provider schema Prisma Ocean |
| Prisma | ORM / akses database | WGA Ocean: Activity, Moment, Booking |
| Cloud Firestore | Database konten | Bali Adventure |
| Firebase Authentication | Autentikasi admin | Bali Adventure |

Hosting database Ocean tidak dipastikan karena URL koneksi tidak diperiksa.
Supabase SDK terpasang di package Ocean, tetapi pemakaiannya tidak ditemukan
pada source aplikasi yang diperiksa. Karena itu Supabase tidak ditampilkan
sebagai layanan aktif Ocean. Upload yang diperiksa menulis ke `public/uploads`.

## Alat kerja, integrasi, dan pendukung

| Kelompok | Alat / teknologi | Dasar |
| --- | --- | --- |
| Pembuatan berbantuan AI | Codex, Antigravity | Keterangan langsung Satya |
| Eksplorasi UI | Google Stitch | Keterangan langsung Satya |
| Referensi visual | Pinterest, TikTok | Keterangan langsung Satya |
| Editor kode | VS Code | Keterangan langsung Satya |
| Hosting / runtime | Vercel | Audit Dekorasi; status deployment Ocean tidak diuji |
| Komunikasi | WhatsApp | Bali Adventure, WGA Dekorasi, WGA Ocean |
| Lokasi | Google Maps embed | Bali Adventure, WGA Dekorasi |
| Verifikasi form | Cloudflare Turnstile | WGA Dekorasi |
| Optimasi gambar | Sharp; Browser Canvas | WGA Dekorasi |
| Pengujian database lokal | PGlite; Node.js test runner | WGA Dekorasi; bukan database produksi |
| Ikon | Font Awesome; Lucide React | Bali Adventure; WGA Ocean |
| Font | Google Fonts; next/font/google untuk Ocean | Keempat proyek |

Metadata, sitemap, dan robots merupakan fitur implementasi proyek. Keberadaannya
tidak menjadi klaim penguasaan SEO, peringkat pencarian, atau skor performa.

## Isi cabinet

1. Education: pendidikan yang diberikan Satya.
2. Frontend: bahasa, styling, framework, animasi, logo, dan deskripsi singkat.
3. Backend & Data: runtime, API, database, storage, autentikasi, logo, dan deskripsi singkat.
4. Tools & Workflow: alat AI, referensi, integrasi, pendukung, dan proses kerja.

Kartu aktif tidak menampilkan nama proyek. Lucide React memiliki kartu dan
[logo resmi Lucide](https://github.com/lucide-icons/lucide/blob/main/docs/public/logo-icon.svg)
sendiri di Supporting libraries & tools, menggantikan catatan teks sebelumnya.

Semua laci tertutup saat awal. Tidak memakai persentase penguasaan. Figma,
Framer website builder, GSAP, dan Tailwind tidak masuk daftar aktif karena tidak
ada dasar pemakaian pada empat proyek yang menjadi cakupan pemeriksaan ini.
Snapshot lama dalam `work/design-variants/` bersifat historis dan bukan sumber
klaim kemampuan saat ini.
