#!/bin/sh

# Tunggu hingga database siap (hostname "db", port 5432)
until nc -z db 5432; do
  echo "Menunggu database..."
  sleep 2
done

# Jika folder migrasi belum ada, inisialisasi migrasi
if [ ! -d "migrations" ]; then
  echo "Inisialisasi folder migrations..."
  flask db init
fi

# Buat migrasi baru (jika ada perubahan pada model)
flask db migrate -m "first migrate"

# Terapkan migrasi ke database
flask db upgrade

# Mulai server aplikasi menggunakan uvicorn
exec flask run --host=0.0.0.0 --port=8000
