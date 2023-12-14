# Backend E-Commerce

1. [Pengenalan](#pengenalan)
2. [Instalasi project](#instalasi-project)
3. [Menjalankan program](#menjalankan-program)
4. [Dokumentasi API](#dokumentasi-api)

## Pengenalan

Tentang project ini, project ini di khususkan untuk layanan data `E-Commerce` seperti user, toko, product, dan lainnya. Fitur utama tidak jauh dari kebanyakan `E-Commerce` lainnya, seperti user dapat membuat toko sendiri, juga dapat memposting produk tokonya sendiri, kemudian melakukan checkout produk.

## Instalasi project

Berikut adalah beberapa langkah awal pada saat melakukan instalasi project.

- Clone repository dengan menggunakan git `git clone https://github.com/flattenbot/be-ecommerce.git`

- Masuk kedalam direktori projek `cd be-ecommerce`

- Install dependencies `npm install`

- Buat file `.env` di dalam root project lalu copy isi file `.env example copy` ke dalam `.env`

- Generate prisma dengan perintah `npx prisma generate`

- Migrasi database dengan prisma `npx prisma migrate dev`

- Jalankan program dengan perintah `npm run dev`, atau lebih detailnya bisa lihat [disini](#menjalankan-program).

## Menjalankan program

Berikut adalah beberapa langkah untuk menjalankan program :

- `npm run dev` Menjalankan server dalam mode development atau pengembangan

- `npm run start` Build kode typescipt ke dalam javascript

- `npm run seed [nama seeder]` Menjalankan data seeder dalam tahap pengembangan

- `npm run seed:all` Menjalankan automatic seeder

- `npm run test` Menjalankan mode testing menggunakan framework **Jest**

## Dokumentasi API

Dokumentasi API disini menggunakan **Swagger UI Express** anda dapat melihatnya detail lengkapnya dengan mengakses url docs ke : `http://localhost:port/docs`