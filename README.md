# BMW Uzbekistan — Sheer Driving Pleasure (MVP Showcase)

Ushbu loyiha BMW brendining hashamati, poyga merosi va innovatsion elektr texnologiyalarini namoyish etuvchi zamonaviy, tez ishlaydigan va kengaytirishga tayyor MVP veb-saytidir.

Loyiha to'liq [AGENTS.md](file:///c:/Users/Elshodbek/Desktop/BMW/AGENTS.md) va [PROJECT.md](file:///c:/Users/Elshodbek/Desktop/BMW/PROJECT.md) mezonlariga mos holda ishlab chiqilgan.

---

## 🚀 Texnologik Stack

- **Framework:** [Next.js](https://nextjs.org/) 16 (App Router, Turbopack, React 19)
- **Til:** [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Animatsiyalar:** [Framer Motion](https://www.framer.com/motion/)
- **Ikonkalar:** [Lucide React](https://lucide.dev/)
- **Form & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Test:** Native Node.js Test Runner + `tsx`

---

## 📁 Papkalar Strukturasi

```text
src/
├── app/
│   ├── layout.tsx         # Global layout (SEO, metadata, shriftlar)
│   ├── page.tsx           # Asosiy landing page
│   └── globals.css        # Tailwind va global dizayn tokenlari
├── components/
│   ├── ui/                # Atomik UI: Button, Badge, Modal, Input, Select, Card, BmwLogo
│   ├── layout/            # Navbar, MobileMenu, Footer
│   ├── home/              # HeroSection, BrandStory, DealershipsSection, CtaBanner
│   ├── catalog/           # CatalogSection, CarCard, FilterBar, SpecsGrid, CarDetailModal
│   └── forms/             # BookingForm, TestDriveModal
├── data/
│   └── cars.ts            # Flagman modellar va dilerlik markazlari ma'lumotlari
├── types/
│   └── car.ts             # TypeScript interfeyslari (Car, Specs, BookingFormData, etc.)
├── lib/
│   ├── utils.ts           # Yordamchi funksiyalar (cn, formatPrice, formatNumber)
│   └── validations.ts     # Zod sxemalari (bookingFormSchema)
└── hooks/
    └── useCarFilter.ts    # Avtomobillarni toifa, qidiruv va tartib bo'yicha filtrlash
tests/
└── validations.test.ts    # Zod formasi, yordamchi funksiyalar va ma'lumotlar yaxlitligi testlari
```

---

## ⚙️ Buyruqlar

Loyihada quyidagi npm skriptlari mavjud:

```bash
# Rivojlanish (development) serverini ishga tushirish
npm run dev

# Ishlab chiqarish (production) build qilish
npm run build

# Ishlab chiqarish serverini ishga tushirish
npm run start

# TypeScript tiplarini tekshirish
npm run typecheck

# Unit va integratsion testlarni ishga tushirish
npm test
```

---

## 🏎️ Asosiy Imkoniyatlar (MVP)

1. **Cinematic Hero:** BMW flagmanining yuqori sifatli vizuali, metrikalar (0-100 km/s, ot kuchi, masofa) va asosiy harakat tugmalari.
2. **Interaktiv Modellar Vitrinasi:**
   - Kategoriyalar bo'yicha saralash (M-Power, BMW i Elektr, X-Series SAV, Sedanlar).
   - Real-vaqt qidiruv va turli tartiblar (narx, quvvat, tavsiya).
   - Ranglar palitrasini ko'rish.
3. **Model Quick View Modal:** Kengaytirilgan texnik ma'lumotlar, mini-galereya va eksteryer ranglarini tanlash.
4. **Test-Drive Bron Qilish:** React Hook Form + Zod bilan himoyalangan, dilerlik markazlari va kalendar sanasini tanlash imkonini beruvchi shakl.
5. **Dilerlik Tarmoqlari:** O'zbekistondagi rasmiy markazlar (Toshkent, Samarqand, Farg'ona, Buxoro) manzillari va telefonlari.
