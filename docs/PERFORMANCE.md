# Optimasi scroll dan cabinet

Pemeriksaan 15 Oktober 2026. Laporan mentah dan screenshot tersedia di `tmp/`:
`cabinet-before.json`, `cabinet-optimized.json`, dan `cabinet-mobile.json`.

## Perubahan

- Sapaan memakai text node dan cursor yang tetap; timer dihentikan ketika hero
  keluar viewport, tab tersembunyi, atau reduced motion aktif.
- Efek pengukuran nama dan animasi CSS hero/marquee mengikuti lifecycle yang sama.
- Lanyard menghentikan fisika ketika tidak terlihat. Pemanggilan drop berulang
  tidak membuat loop requestAnimationFrame ganda; snap membatalkan frame tertunda.
- Transform kosong pada seluruh main-wrapper dihilangkan setelah intro. Layer
  transisi setinggi 300vh disembunyikan setelah intro selesai atau dilewati.
- Background/grid desktop berada di satu layer fixed. Logo navbar desktop
  berhenti menjalankan animasi filter permanen dan blur navbar dikurangi.
- Laci memakai tinggi isi yang diukur sekali saat dibuka, lalu disesuaikan oleh
  ResizeObserver ketika ukuran konten berubah. Isi tetap berukuran penuh selama
  animasi tinggi panel; fallback grid tetap tersedia.
- Panel tertutup tidak dipaint. Pada mode tinggi terukur, cache layout tetap
  dipertahankan untuk mengurangi pekerjaan saat pembukaan pertama. Interior
  memakai containment, dan shadow handle tidak diinterpolasi setiap frame.
- Desain, logo, materi, handle, kaki, dan efek ketebalan lemari dipertahankan.

## Pengukuran desktop

Chrome headless lokal, viewport 1920×1080, CPU throttling 4×, profil browser
terpisah. Tiap sampel idle sekitar 2 detik; sekuens buka/tutup sekitar 3,5 detik.
Perbandingan berikut satu run sebelum dengan satu run final, bukan rata-rata
lintas perangkat. Probe requestAnimationFrame juga menambah overhead pengujian.

| Metrik | Sebelum | Setelah |
| --- | ---: | ---: |
| Paint events ketika cabinet diam | 554 | 0 |
| Layout count ketika diam | 37 | 0 |
| Style recalculation count ketika diam | 239 | 0 |
| Layout duration sekuens laci | 160,34 ms | 98,28 ms |
| Style recalculation duration sekuens laci | 523,39 ms | 131,45 ms |
| Paint duration sekuens laci | 556,41 ms | 401,28 ms |

Sampel scroll final 1,8 detik mencatat 0 layout dan 0 paint events. Frame terlama
pada sampel scroll sekitar 14,1 ms. Tidak ada sampel scroll pada run baseline
awal, jadi angka scroll ini tidak diklaim sebagai perbandingan sebelum/sesudah.

Pada sekuens pembukaan pertama, frame terlama masih sekitar 229 ms di CPU
throttling 4×. Hasil ini menunjukkan pengurangan pekerjaan render, bukan jaminan
semua frame selalu mulus pada setiap perangkat atau saat aset pertama dimuat.
Frame rAF headless tidak boleh dianggap sebagai pengukuran FPS layar pengguna.

## Verifikasi

- `node tools/verify-motion-lifecycle.cjs`
- `node tools/verify-about.cjs`
- `node tools/verify-cabinet-motion.cjs`
- `node tools/verify-tech-fieldnotes.cjs`
- `node tools/verify-mobile-folder.cjs`
- `node tools/profile-cabinet.cjs check`
- `node tools/profile-cabinet.cjs mobile 390`

Tes browser memeriksa scroll, buka/tutup, resize konten, buka ulang cepat,
tinggi panel, overflow horizontal, dan error runtime. Screenshot dipakai untuk
meninjau bentuk cabinet. Profil browser sementara terpisah dari browser pengguna.

## Revisi animasi desktop

Setelah laporan animasi laci masih berat, jalur desktop diganti dengan FLIP:
tinggi akhir ditetapkan sekali, kemudian elemen bergerak lewat transform dan
isi dibuka lewat clip-path. Cangkang dan kaki memiliki layer terpisah supaya
ukuran teks dan gagang tidak ikut meregang. Hint will-change dilepas setelah
selesai; klik berulang mengambil posisi dan clip yang sedang terlihat.
Mobile tetap memakai jalur tinggi terukur.

Profil `cabinet-composite-final.json` dibanding `cabinet-optimized.json`, pada
viewport dan throttling yang sama:

| Metrik sekuens laci | Tinggi terukur | Transform/clip |
| --- | ---: | ---: |
| Layout count | 68 | 15 |
| Layout duration | 98,28 ms | 12,14 ms |
| Paint duration | 401,28 ms | 128,89 ms |
| Sampel rAF di atas 25 ms | 50 | 15 |

Waktu layout turun sekitar 88% dan paint sekitar 68% pada run ini. Sampel scroll
tetap mencatat nol layout dan paint. Frame panjang sesekali masih muncul,
terutama pembukaan pertama; hasil headless ini bukan jaminan FPS perangkat.
Profil tema gelap (`cabinet-composite-dark.json`) dan mobile
(`cabinet-composite-mobile.json`) juga lolos pemeriksaan tinggi, resize, klik
cepat, overflow, dan error runtime.

Run akhir setelah koreksi gerak kaki dan clipping panel tertutup,
`cabinet-composite-verified.json`, mencatat layout 17,75 ms dan paint 127,17 ms
pada pembukaan pertama, lalu 11,58 ms dan 88,03 ms pada pengulangan. Ada 13
sampel rAF di atas 25 ms pada pembukaan pertama dan 4 pada pengulangan.
Pemeriksaan browser tetap lolos tanpa error runtime. Variasi antar-run ini
menguatkan perlunya mencoba langsung pada perangkat pengguna.

`verify-structure.cjs` masih membandingkan seluruh source dengan arsip refactor
awal. Pemeriksaan itu gagal pada kesamaan CSS karena perubahan desain dan
optimasi yang disengaja; baseline historis tidak diubah untuk meloloskannya.

## Posisi dan perpindahan folder desktop

Tinggi section desktop dikembalikan dari 80vh ke 100vh. Tinggi 80vh kini hanya
berlaku di media query mobile. Di viewport 1920 x 1080, posisi tertutup relatif
terhadap section kembali dari y=159 menjadi y=267, sesuai pemusatan semula.

Animasi desktop mengganti perubahan tinggi flap per frame dengan scaleY,
mengganti interpolasi blur dengan fade bayangan statis, dan memakai tile PNG
dari tekstur SVG asli. Studio Notes, contact, dan footer bergeser dengan FLIP
setelah margin akhir dihitung sekali. Efek sapaan, pengukuran huruf, dan pulse
terminal kini berhenti berdasarkan visibilitas elemennya sendiri.

Trace Chrome juga menemukan compositeFailed=262144 pada transform folder dan
paper keempat. Nilai itu adalah kAffectsImportantProperty pada
[source Chromium](https://chromium.googlesource.com/chromium/src/third_party/+/608b8b8f1a7c71172f13fee3f95379323ad3d6b1/blink/renderer/core/animation/compositor_animations.h).
!important dilepas dari transform tersebut. Run akhir tidak mencatat kegagalan
compositing animasi.

Perbandingan `folder-before.json` dengan `folder-raster-final.json`, Chrome
headless 1920 x 1080, throttle CPU 4x, sampel 1,2 detik pertama:

| Metrik | Sebelum | Setelah |
| --- | ---: | ---: |
| Layout count | 17 | 2 |
| Layout duration | 64,57 ms | 2,73 ms |
| Paint duration | 429,36 ms | 129,33 ms |
| Sampel rAF | 14 | 55 |
| Sampel rAF di atas 25 ms | 14 | 11 |

Waktu layout turun sekitar 96% dan paint sekitar 70% pada run ini. Ada frame
panjang yang tersisa di pembukaan pertama; angka headless ini bukan FPS layar.
Urutan lipatan dan koordinat akhir preview dipertahankan. Pemeriksaan browser
memastikan akses kartu, batas section berikutnya, dan tidak ada overflow atau
error runtime. Tes source juga mengunci 100vh desktop dan 80vh mobile.

Run `folder-final-dark.json` (1280px) lolos tanpa kegagalan compositing, overflow,
atau error runtime. Pada `folder-final-mobile.json` (390px), koordinat folder
tertutup dan terbuka identik dengan run mobile sebelum optimasi desktop.
Mobile masih memakai jalur animasi lipatan lamanya.

## Tempo laci

Durasi gerak desktop disesuaikan dari 420 ke 800 ms dengan
cubic-bezier(.32,0,.2,1), untuk awal yang pelan dan akhir yang lembut.
Mekanisme transform/clip dan pelepasan layer tetap sama. Profil
`cabinet-cabinet-gentle.json` serta `cabinet-cabinet-gentle-repeat.json` lolos
pemeriksaan buka/tutup, resize, klik cepat, dan overflow tanpa error runtime.
Jumlah layout sekuens tetap 13–17, bukan layout setiap frame. Kedua run ini
memiliki lonjakan frame panjang (termasuk saat scroll pada pengulangan), sehingga
hasilnya tidak mendukung klaim FPS stabil atau perbandingan kelancaran numerik.

## Pemuatan logo cabinet

Seluruh 32 elemen logo cabinet kini memakai loading=eager agar request dimulai
sebelum laci dibuka. Empat aset besar memakai salinan WebP yang sesuai ukuran
tampil; sumber asli dipertahankan. Google Maps semula SVG 4.303.109 byte berisi
raster tertanam, kini memakai WebP 2.776 byte. Total 30 aset unik cabinet turun
dari 4.611.372 menjadi 87.618 byte. Potongan logo JB dibuat sesuai object-fit
cover dan posisi kiri semula.

`node tools/profile-cabinet.cjs logos-ready 1920 light folder images-check`
memastikan semua 32 logo sudah complete dan memiliki naturalWidth saat semua
laci masih tertutup, tanpa error runtime. Hasil: tmp/folder-logos-ready.json.

## Tema, Lucide, dan laci mobile

Pintu laci sebelumnya mentransisikan background selama 300 ms tetapi mengganti
warna teks langsung. Gradient permukaan kini statis; background-color, color,
dan border-color memakai 160 ms yang sama. Lucide React menjadi kartu logo,
nama, dan fungsi singkat. Sisa nama proyek pada deskripsi cabinet dihapus.

Mobile kini menggunakan jalur FLIP/clip seperti desktop dengan durasi 600 ms;
desktop tetap 800 ms. Pulse filter navbar dijeda selama cabinet terlihat.
Profil `cabinet-mobile-final.json` (390 x 844, CPU 4x) mencatat 15 layout pada
sekuens buka/tutup dibanding 144 pada jalur tinggi sebelumnya dalam
`cabinet-composite-mobile.json`. Waktu layout turun dari 146,10 ke 11,66 ms dan
paint dari 480,36 ke 155,28 ms pada run tersebut. Idle mencatat nol layout,
style recalculation, dan paint. Ini perbandingan satu run, bukan jaminan FPS.

Profil mobile dan `cabinet-theme-desktop.json` lolos pemeriksaan resize,
buka ulang cepat, panel tertutup nol tinggi, overflow, kedua arah pergantian
tema, ketersediaan logo Lucide, dan ketiadaan nama proyek di cabinet.
