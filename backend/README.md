# Flask MVC REST API

Proyek ini adalah implementasi REST API menggunakan Flask dengan arsitektur Model-View-Controller (MVC) untuk struktur yang lebih terorganisir dan mudah dikembangkan.

## 🚀 Fitur
- Struktur berbasis MVC untuk pemisahan logika bisnis
- CRUD (Create, Read, Update, Delete) API
- Autentikasi dengan JWT
- Routing yang terstruktur
- Template rendering dengan Jinja2
- Menggunakan database (SQLite, MySQL, atau PostgreSQL)

## 🛠 Teknologi yang Digunakan
- Python
- Flask
- SQLAlchemy
- Jinja2

## 📦 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/SukunDev/flask-mvc.git
```

### 2. Masuk ke Direktori Project
```bash
cd flask-mvc
```

### 3. Buat Virtual Environment (Opsional)
```bash
python -m venv venv
source venv/bin/activate  # Untuk Linux/Mac
venv\Scripts\activate  # Untuk Windows
```

### 4. Install Dependensi
```bash
pip install -r requirements.txt
```

### 5. Konfigurasi Environment
Buat file `.env` dan tambahkan konfigurasi berikut:
```env
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your_secret_key
DATABASE_URI=sqlite:///database.db  # Bisa diganti dengan MySQL/PostgreSQL
```

### 6. Jalankan Server
```bash
flask run
```
Atau jalankan dengan mode debug:
```bash
python run.py
```

## 🔥 Struktur Proyek
```
flask-mvc-api/

│-- controllers/   # Logika bisnis
│-- models/        # Definisi model database
│-- routes/        # Routing API
│-- templates/     # Template Jinja2
│-- config.py          # Konfigurasi aplikasi
│-- run.py             # Entry point aplikasi
│-- requirements.txt   # Dependensi proyek
│-- README.md          # Dokumentasi proyek
```


## 📜 Lisensi
Proyek ini menggunakan lisensi MIT. Silakan cek file `LICENSE` untuk informasi lebih lanjut.

---
Dikembangkan oleh [SukunDev](https://github.com/SukunDev) 💻🚀

