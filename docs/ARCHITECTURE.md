# Panduan struktur kode

`index.html` berisi markup asli. Stylesheet dimuat berurutan; script `defer` mendaftarkan fitur; `assets/js/main.js` memanggil initializer secara sinkron sesuai urutan script lama. Tidak membutuhkan bundler atau framework.

## Lokasi perubahan

| Bagian | JavaScript (`assets/js/`) | CSS (`assets/css/`) |
| --- | --- | --- |
| Reset, token warna | — | `01-base.css` |
| Intro dan scramble nama | `features/intro.js` | `02-intro.css` |
| Tipografi, layout dasar | — | `03-typography-layout.css` |
| Navbar, tema, menu mobile | `features/navigation.js` | `04-navigation.css` |
| Hero dan greeting | `features/greetings.js` | `05-hero.css` |
| Terminal | `features/terminal.js`, `features/terminal-layout.js` | `06-terminal-lanyard.css` |
| Lanyard | `features/lanyard.js` | `06-terminal-lanyard.css` |
| Marquee | — | `07-marquee.css` |
| Folder portfolio dan swipe | `features/portfolio.js` | `08-portfolio.css` |
| Process, skills, contact, footer | — | `09-sections.css` |
| Breakpoint halaman | `features/terminal-layout.js` | `10-responsive.css` |
| Data project dan modal | `features/lightbox.js` | `11-project-details.css` sampai `14-lightbox-base.css` |

`app.js` membuat registry `window.SatyaPortfolio.features`; setiap fitur memiliki scope lokal. Hook `window.triggerLanyardDrop` dan `window.snapLanyardToZero` tetap menghubungkan intro dan lanyard seperti sebelumnya.

## Urutan CSS

Nomor file mengikuti posisi aturan dalam stylesheet lama. Cream theme (12), editorial (13), dan base lightbox (14) memang muncul dalam urutan itu pada save point. Mengurutkan base ke awal dapat mengubah ukuran, jarak, animasi, dan responsive behavior.

Selector berulang tidak semuanya duplikat yang aman dibuang: sebagian merupakan override. Aturan dipindahkan tanpa menggabungkan, menghapus, atau mengurutkan ulang. Media query terkait tetap bersama source asalnya.

## Temuan audit yang dipertahankan

- Markup Dossier tersembunyi masih diisi oleh `lightbox.js`. Menghapusnya saja menyebabkan akses elemen null. Pembersihan memerlukan perubahan terkoordinasi HTML, JS, dan CSS.
- Preview device memiliki aturan transisi bertumpuk. Hasil cascade dipertahankan dalam refactor ini.
- Resize melewati breakpoint 992px memicu reload dari `terminal-layout.js`. Ini perilaku lama.
- Teks Tech Specs memuat klaim generik seperti skor Lighthouse, belum diverifikasi dalam refactor struktur.
- Nama dan URL aset gambar dipertahankan; aset tidak dikompresi atau dihapus.

## Arsip dan pengujian

`archive/baseline/` menyimpan source commit `683dd5d`. Backup math-hover, eksperimen, hasil diagnostik, dan referensi dipisahkan ke subfolder arsip. Arsip tidak dimuat oleh halaman utama. HTML lama bukan preview mandiri karena path relatifnya mengikuti struktur awal.

Server lokal bersifat statis: file arsip tetap bisa diakses lewat URL yang diketahui. Keluarkan `archive/`, `tools/`, dan dokumentasi dari paket deployment bila tidak diperlukan.

`node tools/verify-structure.cjs` membandingkan source CSS, urutan inisialisasi JS, markup, sintaks, serta path aset terhadap baseline. Pemeriksaan ini khusus refactor; perubahan desain/logika berikutnya dapat membuat pemeriksaan kesamaan gagal secara sengaja.

Untuk pengujian browser, cek intro/skip, tema, menu mobile, terminal, drag lanyard, folder/swipe, tab modal, device selector, close dan Escape di desktop serta mobile. Pemeriksaan source tidak menggantikan pengujian visual.

Ikuti `DEV_RULES.md`; naikkan versi URL aset terkait di `index.html` setiap mengubah CSS/JS.
