# Deploy portfolio ke Vercel

## Konfigurasi yang sudah tersedia

- Framework: Other (framework null pada vercel.json).
- Build command: node tools/build-deploy.mjs.
- Output directory: dist.
- Tidak membutuhkan npm install atau dependency eksternal untuk build.
- vercel.json mengatur CSP, nosniff, penolakan framing, no-referrer, Permissions-Policy, dan HSTS untuk HTTPS produksi.
- Server Node lokal tidak diterbitkan; hosting menyajikan hasil statis dist.

Konfigurasi mengikuti [dokumentasi Vercel](https://vercel.com/docs/project-configuration/vercel-json). Header dikirim oleh Vercel, bukan melalui meta HTML; penerapannya pada URL live tetap perlu diperiksa setelah deploy.

## Menyiapkan ulang paket

```sh
node tools/build-deploy.mjs
node tools/verify-deploy.mjs
```

Builder hanya menyalin index.html, assets, image, dan image portofolio, lalu menambahkan konfigurasi header untuk paket prebuilt. Arsip, .git, work, tmp, docs, tools, serta server.mjs tidak menjadi file publik. Builder menolak mengganti folder dist yang tidak memiliki catatan kepemilikan build yang cocok di tmp/deploy-build-state.json. Jangan menghapus catatan itu sementara dist tetap ada; gunakan folder output yang benar-benar dihasilkan builder ini.

## Menerbitkan lewat Git

1. Push commit terbaru ke repository Git milikmu.
2. Di Vercel pilih Add New Project dan import repository tersebut.
3. Pilih root project ini. Konfigurasi build/output/header sudah ada di vercel.json. Jika dashboard punya override lama, samakan Build Command dan Output Directory dengan nilai di atas.
4. Deploy. Setelah URL preview tersedia, periksa desktop/mobile, reload antar tampilan, empat proyek, audio, Instagram, dan Gmail draft.
5. Periksa response header CSP, nosniff, dan HSTS pada URL HTTPS; pastikan /.git/config dan /docs/ tidak tersedia.

Tidak ada deploy atau push remote yang dijalankan dalam persiapan ini. Akun/project Vercel dan repository remote tidak dikonfigurasi oleh paket ini. Domain final belum diberikan, sehingga canonical URL, sitemap berbasis domain, dan URL Open Graph belum dibuat.

## Paket ZIP

release/satya-portfolio-deploy.zip berisi isi dist sebagai paket statis prebuilt. Untuk alur import Git Vercel gunakan source repository dan vercel.json di root, bukan ZIP sebagai repository. ZIP berguna sebagai salinan hasil build dan dapat digunakan dalam alur prebuilt/hosting statis yang sesuai.

## Media sosial dan kontak

Instagram: https://www.instagram.com/syllvstone/ (parameter tracking dari tautan yang diberikan dihapus).

LinkedIn dan Dribbble tetap tampil sebagai ikon statis, tanpa tautan dan tanpa aksi klik, sesuai permintaan pengguna. Gmail membuka draft untuk satyawidnyana55@gmail.com; pengunjung tetap mengirimnya sendiri dari Gmail.

## Batasan verifikasi

Paket diperiksa secara lokal dengan nama file yang sensitif huruf besar/kecil, daftar file publik, dan kesamaan header dengan kebijakan server. Pengujian headless menggunakan preview dist di localhost; ini bukan bukti header hosting live telah diterapkan. Kelancaran pada ponsel nyata dan jaringan lambat masih perlu diperiksa setelah preview online tersedia.
