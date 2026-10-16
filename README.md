# Portofolio Satya Widnyana

Website berbasis HTML, CSS, dan JavaScript vanilla. Tidak membutuhkan framework, npm install, atau build.

## Menjalankan

```sh
node server.mjs
```

Jalankan dari folder project, lalu buka http://127.0.0.1:8000. Google Fonts membutuhkan internet; tanpa koneksi, browser memakai font fallback.

## Struktur

```text
index.html                 Halaman utama dan markup modal
assets/
  css/                     Stylesheet per bagian sesuai urutan cascade
  js/
    app.js                 Registry fitur
    main.js                Bootstrap sesuai urutan eksekusi awal
    features/              Intro, navigasi, lanyard, terminal, portfolio, lightbox
image/                     Foto, logo, dan aset lanyard
image portofolio/          Cover masing-masing project
docs/                      Panduan struktur dan konteks project
tools/                     Verifikasi struktur dan dimensi gambar
archive/                   Backup, eksperimen, dan referensi lama
server.mjs                 Server lokal port 8000
DEV_RULES.md               Aturan pengembangan dan save point
```

Lihat [panduan struktur](docs/ARCHITECTURE.md) untuk menentukan file yang perlu diedit. File dalam `archive/` tidak dimuat situs aktif.

## Verifikasi refactor

```sh
node tools/verify-structure.cjs
node tools/check-dim.cjs
```

Verifikasi membandingkan source CSS, fitur JavaScript, dan markup dengan snapshot sebelum refactor, serta mengecek sintaks dan path aset. Ini bukan pengganti pengujian visual di browser. Perubahan desain atau logika berikutnya dapat membuat pemeriksaan kesamaan gagal secara sengaja.

## Save point sebelum refactor

Commit `683dd5d`, tag `save-3-before-structure-refactor`. Gunakan `git status` untuk melihat perubahan setelah save point.


## Audit source aktif

Gunakan `node tools/verify-current.cjs` untuk integritas source aktif dan `node tools/verify-server.mjs` untuk regresi keamanan server lokal. `verify-structure.cjs` membandingkan snapshot migrasi historis, sehingga desain baru tidak identik dengannya. Detail dan perintah audit browser tersedia di [laporan audit 16 Oktober 2026](docs/AUDIT_2026-10-16.md).


## Build untuk Vercel

Jalankan `node tools/build-deploy.mjs`, lalu `node tools/verify-deploy.mjs`. Konfigurasi Vercel memakai folder output `dist`; hanya file publik yang diterbitkan. Lihat [panduan deploy](docs/DEPLOYMENT.md).
