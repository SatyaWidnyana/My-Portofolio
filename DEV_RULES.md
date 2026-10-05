# Aturan Pengembangan Website Satya

File ini berisi pengingat (rules) agar agent AI tidak mengulangi kesalahan yang sama selama proses development. 

## Aturan Penting:
1. **Pemisahan Tampilan Mobile & Desktop:**
   Ketika diminta untuk fokus mengedit tampilan mobile (menggunakan `@media (max-width: 768px)` dsb), **dilarang keras** mengotak-atik struktur HTML atau CSS yang berdampak pada tampilan Desktop. Begitu juga sebaliknya. Jika struktur HTML harus diubah untuk kebutuhan mobile, pastikan tidak merusak flexbox atau layout desktop.
   
2. **Cache Busting (Wajib dilakukan setiap mengedit CSS/JS):**
   Browser sangat agresif dalam melakukan caching terhadap `styles.css` dan `script.js`. Setiap kali melakukan perubahan logika di JS atau tampilan di CSS, **selalu tingkatkan versi query parameter di index.html**.
   Contoh: `<link rel="stylesheet" href="styles.css?v=84">` dinaikkan menjadi `v=85`. Tanpa ini, hasil perubahan tidak akan terlihat di preview.

3. **Gunakan Elemen yang Ada Sebaik Mungkin:**
   Hindari menduplikasi tombol atau elemen navigasi yang punya ID spesifik (misal `#theme-toggle`) hanya untuk membuat versi mobile-nya, karena ini akan merusak JavaScript yang memanggil berdasarkan ID. Gunakan pendekatan CSS murni (seperti `flex-wrap` dan `order`) untuk mengubah layout pada breakpoint mobile.

4. **Sistem Save Point (Git):**
   Project ini sudah memakai Git. Save point = commit + tag dengan nama `save-N-deskripsi`.
   - **Perintah singkat:** jika user hanya mengetik **"save point"** (atau "save dulu"), langsung buat save point tanpa bertanya. Nomor N = nomor tag terakhir + 1 (cek dengan `git tag`). Deskripsi diambil dari kondisi/fitur terakhir yang baru selesai.
   - **Cara save:** jalankan `git add -A`, `git commit -m "SAVE: <deskripsi>"`, lalu `git tag save-N-<deskripsi>`. Setelah itu laporkan nama tag ke user.
   - **Rollback total ke save point:** `git reset --hard <nama-tag>` lalu `git clean -fd` (membuang semua perubahan dan file baru setelah save). Konfirmasi dulu ke user sebelum menjalankan.
   - **Rollback hanya 1 file:** `git checkout <nama-tag> -- <file>`.
   - **Lihat daftar save point:** `git tag` dan `git log --oneline`.
   - **Lihat apa yang berubah sejak save:** `git diff <nama-tag> --stat`.
   - Setelah rollback, tetap ingat aturan cache busting (naikkan versi di index.html).

---
*Pengingat ini dibuat atas permintaan Satya untuk memastikan efisiensi proses coding.*
