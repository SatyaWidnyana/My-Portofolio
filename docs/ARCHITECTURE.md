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
| About: Tool Cabinet / Blueprint / Studio Notes | `features/studio-notes.js`, `features/cabinet-motion.js` | `09-sections.css` |
| Contact: letter tray, footer | `features/contact-letter.js` | `09-sections.css` |
| Breakpoint halaman | `features/terminal-layout.js` | `10-responsive.css` |
| Data project dan modal | `features/lightbox.js` | `11-project-details.css` sampai `14-lightbox-base.css` |

`app.js` membuat registry `window.SatyaPortfolio.features`; setiap fitur memiliki scope lokal. Hook `window.triggerLanyardDrop` dan `window.snapLanyardToZero` tetap menghubungkan intro dan lanyard seperti sebelumnya.

Tool Cabinet menjadi tampilan aktif pada `#about`: empat laci untuk Education,
Frontend, Backend & Data, dan Tools & Workflow. Satu laci terbuka dalam
satu waktu, dengan semua laci tertutup saat awal. Browser dengan ResizeObserver
mengukur tinggi baki saat dibuka dan ketika ukuran kontennya berubah.
`cabinet-motion.js` dimuat sebelum `studio-notes.js`: pada desktop dan mobile, layout langsung
memakai tinggi akhir sekali, lalu posisi laci, cangkang, kaki, dan bagian berikutnya
bergerak dengan transform (FLIP). Isi muncul dengan clip-path. Tidak ada animasi
height per frame pada jalur ini. Transisi tinggi terukur menjadi fallback bila
Web Animations API tidak tersedia; grid bila ResizeObserver tidak tersedia. Panel tertutup tidak dipaint dan cache
layout tetap dipertahankan. Layer sementara dilepas saat animasi selesai.
Gerak desktop berlangsung 800 ms dan mobile 600 ms dengan cubic-bezier(.32,0,.2,1): mulai pelan,
kemudian melambat sebelum berhenti. Semua layer memakai timing yang sama.
Logo cabinet dimuat eager agar request tidak menunggu laci dibuka. Empat aset
besar memakai salinan WebP kecil di assets/images/cabinet; logo JB mempertahankan
crop kiri yang semula diterapkan oleh CSS. Aset asli tetap menjadi sumber.
`inert` dan ARIA langsung mengikuti state yang dituju. Event transisi yang
terlambat tidak boleh menyembunyikan laci yang sudah dibuka ulang.
Tools & Workflow memiliki lima tahap visual: Discover, Explore, Build, Refine,
dan Deploy. Deploy mencakup hosting, domain bila diperlukan, serta pemeriksaan
halaman, tautan, dan form setelah website diterbitkan.
Kartu stack berisi logo, nama, dan deskripsi singkat tanpa nama proyek.
Logo Lucide berasal dari repositori resminya; lisensi tersimpan di
assets/svg/tech/lucide.LICENSE.txt. Analisis pemakaian per proyek dicatat
di docs/TECH_STACK.md serta audit Ocean/Dekorasi. Motion study di Frontend bisa diputar
ulang dan berhenti saat laci berganti atau reduced motion diaktifkan.
Initializer yang sama mendukung Blueprint dan Studio Notes bila dipakai lagi.
Snapshot keduanya tersimpan di `work/design-variants/blueprint/` dan
`work/design-variants/studio-notes/` sebagai referensi source, bukan halaman aktif.
Tes ketiga layout:
`node tools/verify-about.cjs`. Tes gerak desktop dan klik cepat:
`node tools/verify-cabinet-motion.cjs`.

Folder portfolio memakai tinggi section 100vh pada desktop; pengurangan ke
80vh hanya berlaku sampai 768px. Saat dibuka, desktop memakai tinggi flap akhir
sekali, scale pada transform untuk menjaga siluet awal, serta layer bayangan
statis dengan fade opacity. Tekstur SVG grain dibekukan menjadi tile PNG 180px
khusus desktop. Hindari !important pada transform yang ditransisikan: trace
Chrome menandainya sebagai penghalang compositing. Ruang akhir untuk Studio
Notes ditetapkan sekali dan pergeseran tampilannya memakai FLIP di portfolio.js.
Profil folder: `node tools/profile-cabinet.cjs folder-check 1920 light folder`.

`app.js` juga menyediakan `observeMotion`: satu observer bersama untuk setiap
elemen, dengan state viewport, tab, dan reduced motion. Sapaan, efek pengukuran
nama, animasi CSS hero/marquee, serta fisika lanyard berhenti saat tidak terlihat.
Loop lanyard hanya boleh memiliki satu requestAnimationFrame aktif.
Sapaan, subtitle, dan terminal juga diamati secara terpisah agar efeknya berhenti
saat hanya bagian bawah hero yang masih dekat viewport.
Intro melepaskan lapisan transisi setelah selesai. Logo navbar desktop tidak lagi
menjalankan animasi filter terus-menerus. Background desktop memakai satu layer
fixed, dan blur navbar desktop dikurangi. Bentuk dan bayangan cabinet dipertahankan.
Pulse filter logo navbar mobile dijeda selama cabinet terlihat. Warna dasar,
teks, dan border pintu laci memakai transisi 160 ms yang sama; gradient permukaan
tetap statis supaya warna teks tidak mendahului warna pintu saat ganti tema.

Tes lifecycle: `node tools/verify-motion-lifecycle.cjs`. Profil browser lokal:
`node tools/profile-cabinet.cjs check` (desktop) atau
`node tools/profile-cabinet.cjs mobile 390`. Chrome/Edge headless memakai profil
sementara terpisah; laporan dan screenshot ditulis ke `tmp/`. Pengujian mencakup
idle, buka/tutup, scroll, perubahan lebar konten, serta buka ulang cepat.

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
