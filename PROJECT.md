# PROJECT.md — BMW Premium Web Showcase (MVP Texnik Vazifasi)

> **Loyiha maqsadi:** BMW brendining falsafasi ("Sheer Driving Pleasure") va premium darajasini aks ettiruvchi, tez ishlaydigan, modulli va keyinchalik 3D konfigurator hamda dilerlik tizimi bilan kengaytirish oson bo'lgan MVP veb-sayt yaratish.
> **Standartlar:** Loyiha to'liq `AGENTS.md` qoidalariga (Clean Code, Separation of Concerns, Simplicity, Security, Accessibility) amal qiladi.

---

## 1. Texnologik Stack

- **Framework:** Next.js (App Router, TypeScript) yoki Vite + React (TypeScript). *(Tavsiya: Next.js — SEO, Image Optimization va keyingi backend kengaytmalar uchun)*.
- **Styling:** Tailwind CSS (Luxury design tokens).
- **Animatsiyalar:** Framer Motion (silliq va premium micro-interactionlar).
- **Ikonkalar:** Lucide-react (yagona va yengil uslub).
- **Form & Validation:** React Hook Form + Zod (xavfsiz va qulay input tekshiruvi).
- **Ma'lumotlar qatlami (MVP):** Modulli va tiplashtirilgan TypeScript mock service (`/src/data/cars.ts`), kelajakda REST API yoki GraphQL ga oson ulanadi.

---

## 2. Arxitektura va Papkalar Strukturasi (`AGENTS.md` 4-bo'lim)

```text
src/
├── app/                  # Next.js sahifalari va routing
│   ├── layout.tsx        # Global shell (SEO, Fonts, Nav, Footer)
│   ├── page.tsx          # Asosiy landing page
│   └── globals.css       # Tailwind va global uslublar
├── components/           # UI va Feature komponentlar
│   ├── ui/               # Atomik UI: Button, Badge, Modal, Input, Card
│   ├── layout/           # Navbar, Footer, MobileMenu
│   ├── home/             # HeroSection, FeaturedModels, BrandStory
│   ├── catalog/          # CarCard, FilterBar, SpecsGrid
│   └── forms/            # TestDriveModal, BookingForm
├── data/                 # Avtomobillar ma'lumotlar bazasi (Mock)
│   └── cars.ts           # BMW modellar ro'yxati, spetsifikatsiyalar
├── types/                # TypeScript turlari va interfeyslari
│   └── car.ts            # Car, CarCategory, Specs, BookingRequest
├── lib/                  # Yordamchi funksiyalar va validatorlar
│   ├── utils.ts          # cn (tailwind merge), formatters
│   └── validations.ts    # Zod schemalari
└── hooks/                # Custom React hooklar (masalan: useCarFilter)
```

---

## 3. MVP Funksional Talablari

### 3.1. Header & Navigatsiya
- BMW logotipi va zamonaviy minimalist menyu.
- Navigatsiya havolalari: **Modellar**, **Elektr (BMW i)**, **M Power**, **Test-Drive**.
- Sticky / Glassmorphism effekt (skroll bo'lganda orqa fon xiralashishi).
- Mobil qurilmalar uchun moslashuvchan "Hamburger" menyu.

### 3.2. Hero Section (Cinematic taassurot)
- Katta, sifatli BMW flagman modeli tasviri yoki orqa fon video/banneri.
- Brend shiori: *"The Ultimate Driving Machine"* / *"Kelajak harakati bugundan boshlanadi"*.
- Asosiy CTA tugmalari:
  - `[Modellarni ko'rish]` — Katalog bo'limiga silliq skroll (Smooth scroll).
  - `[Test-Drive]` — Bron qilish modal oynasini ochish.

### 3.3. Modellar Katalogi va Filtrlash (Core MVP)
- **Kategoriyalar filtri:** Barchasi, M-Power, BMW i (Electric), X-Series (SAV), Sedans.
- **Avtomobil kartochkasi (`CarCard`):**
  - Model nomi (masalan: *BMW M8 Gran Coupé*, *BMW i7 xDrive60*).
  - Tasvir (burchakli sifatli render).
  - Asosiy xarakteristikalar: 0-100 km/soat (tezlanish), Ot kuchi (hp), Masofa/Sarflanish.
  - Boshlang'ich narxi (masalan: *$134,000 dan*).
  - `Batafsil` va `Test-Drive` tugmalari.

### 3.4. Model Tafsilotlari (Quick View Modal)
- Model bosilganda ochiladigan engil modal:
  - Kengaytirilgan texnik xususiyatlar (Dvigatel turi, uzatmalar qutisi, maksimal tezlik).
  - Mini galereya (Eksteryer va Interyer).
  - To'g'ridan-to'g'ri ushbu model uchun test-driveni tanlash.

### 3.5. Test-Drive Bron Qilish Formasi
- Modal yoki alohida seksiyada joylashgan qulay forma:
  - Ism-familiya.
  - Telefon raqami (xalqaro yoki mahalliy format tekshiruvi).
  - Tanlangan model (avtomatik tanlanadi yoki select orqali).
  - Qulay sana va shahar/dilerlik markazi.
- Validatsiya xatolarini tushunarli ko'rsatish (`AGENTS.md` 7.4-qoida).
- Success (Muvaffaqiyat) xabari va holatni tozalash.

---

## 4. Dizayn Tizimi (BMW Luxury Aesthetic)

- **Ranglar palitrasi:**
  - `Background`: Deep Onyx (`#0A0A0C`), Dark Slate (`#121316`).
  - `Surface / Cards`: Dark Glass (`#1A1C23` / `rgba(255,255,255,0.05)`).
  - `Text`: Pure White (`#FFFFFF`), Muted Slate (`#94A3B8`).
  - `Brand Accent`: BMW Electric Cyan (`#0066B1`), BMW M Blue (`#1C69D4`), M Red (`#E2231A`).
- **Tipografiya:** Zamonaviy, aniq geometric sans (Inter, Space Grotesk yoki Helvetica Neue uslubida).
- **Vizual uslub:** Minimalizm, yuqori sifatli vizuallar, yupqa nozik chegaralar (subtle 1px borders), silliq blur effektlar.

---

## 5. Kelajakda Kengaytirish Rejasi (Roadmap)

Kodni shunday yozish kerakki, quyidagi modullarni asosiy kodni buzmasdan qo'shish mumkin bo'lsin:
1. **3D Interactive Configurator:** Three.js / React Three Fiber orqali 360° rang, g'ildiraklar va interyerni jonli almashtirish.
2. **Dilerlik Tarmoqlari Xaritasi:** Geolocation va dilerlik markazlari ro'yxati (Mapbox / Leaflet).
3. **Kredit & Lizing Kalkulyatori:** Oylik to'lovni hisoblovchi interaktiv vosita.
4. **Foydalanuvchi Kabineti:** Saqlangan avtomobillar, buyurtmalar tarixi (Auth: NextAuth / Supabase).
5. **Real-time Backend & CMS:** Headless CMS (Strapi / Sanity) yoki PostgreSQL orqali avtomobillar bazasini boshqarish.

---

## 6. AI Agent Uchun Bajarish Ketma-ketligi (Execution Plan)

1. **1-qadam:** Loyihani Next.js + Tailwind CSS + Lucide + Framer Motion bilan ishga tushirish.
2. **2-qadam:** `types/car.ts` va `data/cars.ts` fayllarini yaratish (kamida 6 ta flagman model ma'lumotlari bilan: M4, M8, i4, i7, X5, X7).
3. **3-qadam:** Atomik UI komponentlarni tayyorlash (`Button`, `Modal`, `Badge`, `Input`).
4. **4-qadam:** Header (Navbar) va Footer komponentlarini yaratish.
5. **5-qadam:** Hero Section va Brand Story qismini yig'ish.
6. **6-qadam:** Modellar katalogi va interaktiv filtrlash tizimini qurish.
7. **7-qadam:** Model Quick View va Test-drive modal oynalarini ulash.
8. **8-qadam:** Form validatsiyasi, responsive ko'rinish va build tekshiruvini amalga oshirish (`npm run build`, `npm run lint`).

