# LuxeWear - Toko Fashion Online

Aplikasi e-commerce fashion modern dengan fitur lengkap untuk customer dan admin, dibangun dengan React dan ASP.NET Core.

---

## 🚀 Tech Stack

### **Frontend:**
- **Framework:** React 18 (Vite)
- **Styling:** TailwindCSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Icons:** Lucide React, Google Material Symbols
- **PDF Generation:** jsPDF & jsPDF-AutoTable (Client-side)

### **Backend:**
- **Framework:** ASP.NET Core 9.0
- **Database:** MongoDB
- **Authentication:** Custom Auth (Session/User ID based)
- **Architecture:** Controller-Service-Repository Pattern

---

## 📁 Project Structure

```
WebTokoBaju/
├── Frontend/               # Frontend React Application
│   ├── src/
│   │   ├── components/    # Reusable Components (UI, Layouts)
│   │   ├── context/       # Global State (Auth, Cart, Toast)
│   │   ├── layouts/       # Main, User, & Admin Layouts
│   │   ├── pages/         # Application Pages
│   │   ├── services/      # Axios API Configuration
│   │   └── utils/         # Utilities (PDF Generator)
│
└── Backend/                # Backend ASP.NET Core API
    └── TokoBaju.Backend/
        ├── Controllers/   # API Endpoints
        ├── Models/        # Data Models & DTOs
        └── Services/      # Business Logic
```

---

## ⚙️ Konfigurasi

### **Database:**
- **Name:** `TokoBajuDb`
- **Connection:** `mongodb://localhost:27017`

### **Ports:**
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5092

---

## 🏃 Cara Jalankan Web

### **Prasyarat:**
- Node.js (v18+)
- .NET 9.0 SDK
- MongoDB (running on localhost:27017)

### **1. Mulai Backend:**
```powershell
cd Backend/TokoBaju.Backend
dotnet restore
dotnet build
dotnet run
```

Backend Berjalan di : `http://localhost:5092`

### **2. Mulai Frontend:**
```powershell
cd Frontend
npm install
npm run dev
```

Frontend Berjalan di : `http://localhost:5173`

### **3. Buka Browser:**
```
http://localhost:5173
```

---

## 👤 User Roles

### **Customer:**
- Menjelajahi produk berdasarkan kategori.
- Menambahkan produk ke keranjang & Wishlist.
- Checkout dengan manajemen alamat pengiriman.
- Mengelola saldo dompet digital (Wallet).
- Melihat riwayat pesanan & melacak status terkini.
- Mengunduh kuitansi pesanan (PDF) dengan desain profesional.

### **Admin:**
- Dashboard analitik real-time.
- Manajemen Produk (CRUD, Upload Gambar).
- Manajemen Stok & Kategori.
- Manajemen Pesanan & Update Status.
- Laporan Penjualan (Export PDF).

---

## 📦 Features Update

### **LuxeWear Highlights:**
- ✅ **Desain Premium:** Antarmuka responsif dan modern dengan tema monokrom.
- ✅ **PDF Generator:** Pembuatan kuitansi dan laporan penjualan instan di browser.
- ✅ **User Dashboard:** Profil lengkap, manajemen alamat, dan riwayat belanja.
- ✅ **Admin Tools:** Kontrol penuh atas toko dengan statistik penjualan live.
- ✅ **Wallet System:** Simulasi sistem pembayaran dengan saldo pengguna.

---

## 📝 API Endpoints Utama

### **Produk:**
- `GET /api/products` - List semua produk
- `GET /api/products/{id}` - Detail produk
- `POST /api/products` - Tambah produk baru (Admin)

### **Pesanan & Transaksi:**
- `GET /api/orders/user/{userId}` - Riwayat pesanan user
- `POST /api/orders` - Buat pesanan baru
- `GET /api/orders/stats` - Statistik penjualan (Admin)
- `POST /api/users/topup` - Top up saldo wallet

---

## 👨‍💻 Development

### **Build Frontend:**
```powershell
cd Frontend
npm run build
```

### **Build Backend:**
```powershell
cd Backend/TokoBaju.Backend
dotnet build --configuration Release
```

---

*Last Updated: January 2026*
