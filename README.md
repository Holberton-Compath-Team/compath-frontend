# COMPATH — Student Portal (Frontend)

COMPATH tələbənin problemini (akademik / inzibati-maliyyə / şəxsi-həssas) avtomatik doğru universitet xidmətinə yönləndirən platformadır. Bu repo yalnız frontend hissəsini əhatə edir; backend ayrı komanda tərəfindən Swagger/OpenAPI ilə hazırlanır.

Texnologiyalar: Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui, React Hook Form + Zod, React Query, Framer Motion.

## Başlamaq

```bash
npm install
npm run dev
```

Layihə `http://localhost:3000` ünvanında açılacaq.

Digər faydalı əmrlər:

```bash
npm run build   # production build
npm run lint    # ESLint yoxlaması
npm run format  # Prettier ilə formatlama
```

Backend base URL-i `.env.local` faylında `NEXT_PUBLIC_API_BASE_URL` ilə təyin olunur (nümunə üçün `.env.example`-ə bax).

## Qovluq strukturu

```
src/
  app/
    (marketing)/   → landing və digər açıq səhifələr
    (portal)/      → login sonrası səhifələr (skeleton)
  components/
    ui/            → baza komponentlər (Button, Card, Badge...)
    layout/        → Header, Footer, Sidebar
    sections/      → landing bölmələri (Hero, HowItWorks...)
  layouts/         → layout wrapper-lər
  hooks/           → custom hook-lar
  services/        → API çağırış qatı (mock data ilə başlayır)
  types/           → TypeScript tipləri
  utils/           → təmiz köməkçi funksiyalar
  constants/       → statik məzmun
  styles/          → globals.css və design tokenləri
  assets/          → lokal şəkil/icon faylları
```

Ətraflı qaydalar üçün kök qovluqdakı `CLAUDE.md` faylına bax.
