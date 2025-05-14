# NicklEase

NicklEase adalah sebuah aplikasi yang memiliki frontend menggunakan Next.js, backend menggunakan Go, dan database menggunakan MySQL. Aplikasi ini bertujuan untuk memberikan pengalaman yang efisien dan mudah digunakan dengan teknologi terbaru.

## Versi yang Digunakan

- **Go:** 1.23.2
- **MySQL:** 8.0.30 

## Struktur Proyek

Berikut adalah struktur folder utama dalam proyek ini:

## Deskripsi Bagian Proyek

### 1. Frontend (Next.js)

Aplikasi frontend dibangun menggunakan **Next.js**. Next.js adalah framework React yang memungkinkan pengembangan aplikasi web dengan server-side rendering dan static site generation. 

#### Cara Menjalankan Frontend:

1. Masuk ke direktori `frontend/`:
    ```bash
    cd frontend
    ```

2. Instalasi dependensi:
    ```bash
    npm install
    ```

3. Jalankan aplikasi:
    ```bash
    npm run dev
    ```

Aplikasi frontend akan berjalan di `http://localhost:3000`.

### 2. Backend (Go)

Backend aplikasi ini dibangun menggunakan bahasa pemrograman **Go** (versi 1.23.2). Backend bertanggung jawab untuk menangani logika bisnis, API, dan interaksi dengan database.

#### Cara Menjalankan Backend:

1. Masuk ke direktori `backend/`:
    ```bash
    cd backend
    ```

2. Instalasi dependensi (jika diperlukan):
    ```bash
    go mod tidy
    ```

3. Jalankan aplikasi:
    ```bash
    go run main.go
    ```

Backend akan berjalan di `http://localhost:8000` (atau sesuai dengan pengaturan di file `main.go`).

### 3. Database (MySQL)

Database aplikasi menggunakan **MySQL 8.0.30** dan file `.sql` yang terdapat di dalam folder `database/` berisi skema dan data yang diperlukan untuk aplikasi berjalan.

#### Cara Menggunakan Database:

1. Pastikan MySQL sudah terinstal dan berjalan di sistem Anda.

2. Masukkan file SQL ke dalam database MySQL:
    - Anda dapat menggunakan MySQL CLI atau aplikasi GUI seperti MySQL Workbench untuk menjalankan file SQL.
    
    Misalnya, dengan MySQL CLI:
    ```bash
    mysql -u username -p database_name < database/schema.sql
    ```

3. Setelah itu, Anda dapat mengonfigurasi koneksi database di aplikasi backend Go untuk memastikan aplikasi dapat terhubung dengan MySQL.

## Pengaturan Lingkungan

Pastikan untuk mengonfigurasi beberapa variabel lingkungan untuk menyambungkan aplikasi dengan database dan API. Beberapa variabel yang perlu disetel:

- **Frontend:**
  - URL backend (misalnya: `http://localhost:8000`)

- **Backend:**
  - Host dan port database MySQL.
  - URL dan konfigurasi lainnya sesuai kebutuhan aplikasi.

## Login Pengguna

Terdapat dua tipe pengguna dengan kredensial sebagai berikut:

### 1. Approver:
- **Username:** Approver1
- **Password:** app123

### 2. Admin:
- **Username:** Admin1
- **Password:** adm123
- **Username:** Admin2
- **Password:** adm123
- **Username:** Admin3
- **Password:** adm123

## Cara Berkontribusi

1. Fork repositori ini.
2. Buat branch baru untuk fitur atau perbaikan yang Anda kerjakan (`git checkout -b feature-xyz`).
3. Lakukan perubahan dan commit (`git commit -am 'Add new feature'`).
4. Push ke branch Anda (`git push origin feature-xyz`).
5. Buat pull request untuk menggabungkan perubahan.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak

Untuk pertanyaan lebih lanjut, Anda dapat menghubungi kami melalui issues atau email yang tersedia di halaman kontak.
