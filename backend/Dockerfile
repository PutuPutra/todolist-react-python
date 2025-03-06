FROM python:3.13.2

WORKDIR /app

# Install dependensi OS (netcat-openbsd untuk pengecekan koneksi database)
RUN apt-get update && apt-get install -y netcat-openbsd

# Salin file requirements dan install dependensi Python
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install uvicorn

# Pastikan uvicorn terinstal, jika belum ada di requirements.txt
# RUN pip install uvicorn

# Salin seluruh kode aplikasi
COPY . .

# Set environment variable agar Flask mengetahui file aplikasi
ENV FLASK_APP=app.py

# Salin entrypoint script dan berikan permission eksekusi
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Perintah default saat container dijalankan
CMD ["/app/entrypoint.sh"]
