# Audit source WGA Ocean

Pemeriksaan statis: 15 Oktober 2026 pada `D:/PROJECT WEB WGA OCEAN`.
Source Ocean tidak diubah. `.env`, nilai URL koneksi, data database, dan
implementasi inti autentikasi tidak dibuka. Tidak menjalankan install, script
package, seed, build, server, atau koneksi layanan produksi.

| Teknologi | Bukti source | Kesimpulan |
| --- | --- | --- |
| TypeScript | `tsconfig.json`, komponen .tsx, API .ts | Bahasa aplikasi dan API |
| React / Next.js | `package.json`, `src/components/HomeClient.tsx`, `src/app/(main)/page.tsx` | React dan App Router; halaman server mengambil data lalu meneruskannya ke komponen client |
| CSS Modules | `src/app/(main)/page.module.css`, `src/components/BookingForm.module.css`, import styles | CSS kustom; tidak ditemukan dasar penggunaan Tailwind |
| Framer Motion | Import motion pada HomeClient; motion dan AnimatePresence pada MomentsClient | Benar-benar dipakai, bukan sekadar dependensi terpasang |
| Prisma | Import Prisma dan prisma.activity.findMany pada halaman utama; query API booking/Moments | ORM pada halaman server dan API |
| PostgreSQL | Provider pada `prisma/schema.prisma` | Provider schema; koneksi dan hosting tidak diperiksa |
| Data aplikasi | Model Activity, Moment, Booking pada schema | Aktivitas, foto Moments, booking |
| Next.js Route Handlers | `src/app/api/activities`, `moments`, `bookings`, `upload` | Endpoint aplikasi |
| Node.js filesystem | fs/promises, path, writeFile pada upload route | Upload source ini ditulis ke public/uploads |
| WhatsApp | BookingForm: /api/bookings, wa.me, window.open | Data dikirim ke API dan alur WhatsApp |
| Lucide React | Import pada HomeClient, MomentsClient, ActivityDetailClient | Ikon UI |
| Google Fonts | `src/app/layout.tsx`: next/font/google | Tipografi |
| Metadata, sitemap, robots | layout.tsx, sitemap.ts, robots.ts | Implementasi source; tidak mengklaim hasil SEO |

## Batas kesimpulan

- Supabase SDK ada di dependensi, tetapi import/pemakaian tidak ditemukan pada
  source aplikasi yang diperiksa. Tidak diklaim sebagai layanan aktif Ocean.
- Berkas prisma/dev.db tidak dibuka. Keberadaannya tidak dijadikan dasar klaim
  SQLite aktif; provider schema yang diperiksa adalah PostgreSQL.
- Domain Vercel muncul dalam metadata. Status deployment dan kelancaran fitur
  pada hosting tidak diuji.
- Tidak menyimpulkan keamanan API, kesiapan produksi, skor Lighthouse,
  pembayaran online, atau kedalaman penguasaan teknis pembuat proyek.

Cabinet dan Tech-Stack case study Ocean memakai temuan ini. Data lama yang
menyebut frontend vanilla diganti. Tahun, identitas klien, dan URL live pada
data lama tidak diverifikasi ulang.
