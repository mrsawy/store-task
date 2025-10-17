# 🛍️ React Native 3-Page Store

A secure, offline-first React Native store app with biometric authentication, auto-lock protection, and intelligent product caching.

## 📱 What It Does

A minimal 3-screen store built with React Native, featuring DummyJSON authentication, biometric unlock, auto-lock after 10 seconds of inactivity, and offline product browsing with MMKV persistence.

**Screens:**
- Login Screen (DummyJSON auth)
- All Products (with superadmin delete)
- Category Products (filtered, pull-to-refresh)

## ✨ Key Features

| Feature | Details |
|---------|---------|
| 🔐 **Authentication** | DummyJSON login, token storage, session restore |
| 🔒 **Auto-Lock** | Locks after 10s inactivity & on background |
| 👆 **Biometric Unlock** | Face ID / Touch ID with password fallback |
| 📦 **Offline Support** | MMKV caching keeps data available offline |
| ⚡ **Fast Loading** | React Query + MMKV = instant cached lists on relaunch |
| 🗑️ **Superadmin Delete** | Delete products (simulated, UI updates instantly) |
| 🔄 **Pull-to-Refresh** | Refresh category and product lists |
| 📶 **Offline Indicator** | Shows when disconnected |

## 🚀 Quick Start

### Install
```bash
npm install
cd ios && pod install && cd ..
```

### Run
```bash
npm start
npm run ios
```

### Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| **Superadmin** | `emilys` | `emilypass` |
| **Regular User** | `atuny0` | `9uQFF12e` |

> Superadmin unlocks product delete buttons

## 🏗️ Tech Stack

- **React Native** + TypeScript
- **React Navigation** (tabs + stack)
- **React Query** (data fetching)
- **Redux Toolkit** (global state)
- **MMKV** (offline storage)
- **DummyJSON API**

## 📖 How to Use

1. **Login** → Enter superadmin or user credentials
2. **View Products** → All Products screen shows everything
3. **Delete (Superadmin)** → Tap delete button on any product
4. **Browse Category** → Check specific category (fragrances)
5. **Go Offline** → Content stays cached and visible
6. **Auto-Lock** → 10s idle = lock screen appears
7. **Unlock** → Use Face ID/Touch ID or password
8. **Sign Out** → Bottom tab clears session

## 🛠️ Configuration

**Chosen Category:** `fragrances`  
**Superadmin User:** `emilys`  
**Auto-Lock Timer:** 10 seconds  
**Offline Cache:** Persisted via MMKV

## 🎯 Architecture

```
Screens → Components (reusable) → Hooks → Redux + React Query → MMKV
```

**Key Components:**
- `ProductCard` - Single product with optional delete
- `ProductList` - Reusable list with pull-to-refresh
- `LockOverlay` - Auto-lock screen
- `BiometricModal` - Unlock UI

**Custom Hooks:**
- `useAuth()` - Login/logout
- `useBiometrics()` - Face/Touch ID
- `useAutoLock()` - 10s inactivity timer
- `useProducts()` - React Query integration

## 📡 API Used

All from https://dummyjson.com

```
POST   /auth/login                    → Login
GET    /auth/me                       → Validate session
GET    /products                      → All products
GET    /products/categories           → Category list
GET    /products/category/{category}  → Filtered products
DELETE /products/{id}                 → Delete (simulated)
```

## ✅ What Works

- ✓ Login & token management
- ✓ Session restore with biometric prompt
- ✓ Auto-lock after 10s + on background
- ✓ Biometric with password fallback
- ✓ All products list with offline access
- ✓ Category filtered products
- ✓ Superadmin product deletion (UI updates)
- ✓ Pull-to-refresh on both screens
- ✓ Offline indicator
- ✓ Instant cache on cold start

## 🎨 Design

- Responsive iOS & Android layouts
- Modern, clean UI
- Smooth animations
- Accessible touch targets
- Consistent component system

## 📦 Dependencies

- react-native
- react-navigation
- react-query
- redux-toolkit
- mmkv
- expo

---

**Ready to use.** Just login and explore!
