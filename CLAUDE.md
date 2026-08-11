# CLAUDE.md — COMPATH Student Portal (Frontend)

Bu fayl layihənin kökündədir və Claude Code hər sessiyada bunu oxuyur. Burada yazılan qaydalar **məcburidir**, tövsiyə deyil. Qeyri-müəyyənlik olanda burada yazılan qayda təxmindən üstündür.

---

## 1. Layihə haqqında

**COMPATH** — tələbənin problemini (akademik / inzibati-maliyyə / şəxsi-həssas) avtomatik doğru universitet xidmətinə yönləndirən platforma.
Əsas axın: **Ehtiyacın müəyyənləşdirilməsi → Uyğun xidmətin tapılması → Müraciətin hazırlanması → Görüş/Xidmət → Nəticənin izlənməsi.**

Kritik prinsiplər: **mobile-first**, **təhlükəsizlik və anonimlik** əsas dizayn prinsipidir (xüsusilə həssas/təcili hallar üçün).

Bu repo — **yalnız frontend**. Backend ayrı komanda tərəfindən Swagger/OpenAPI ilə yazılır və sonra qoşulacaq. Bu səbəbdən API qatının izolyasiyası (bax §7) bu layihədə ən vacib struktur qaydasıdır.

### Cari sprint scope-u

Yalnız aşağıdakılar bu sprintdə edilir:
- Landing/Home səhifə — tam
- KUDS design system-ə tam uyğunluq
- Responsive (mobile → large desktop)
- Statik naviqasiya (linklər işləyir, səhifələr hələ boş/placeholder ola bilər)
- Təmiz build

**Bu sprintdə YAZILMIR:** login/register səhifələrinin məzmunu, dashboard, Needs Assessment axını, real API inteqrasiyası, Table/Modal/Calendar/Charts/Pagination komponentləri. Bunlar üçün skeleton/qovluq yaradıla bilər, amma funksional implementasiya yoxdur. Scope-dan kənar iş görmə — vaxt və kredit itkisidir.

---

## 2. Texnologiya stacki (sabit, dəyişdirilmir)

- Next.js (App Router) + TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui (baza kimi, KUDS tokenlərinə uyğunlaşdırılmış)
- Lucide Icons (yeganə icon kitabxanası)
- React Hook Form + Zod (formalar üçün, bu sprintdə static olsa da struktur hazırlanır)
- React Query (data fetching qatı üçün, mock ilə başlayır)
- Framer Motion (yalnız məqsədli, minimal istifadə — bax §9)

Başqa kitabxana (state manager, css-in-js, fərqli icon set və s.) əlavə etməzdən əvvəl **soruş**.

---

## 3. Qovluq strukturu

```
src/
  app/                    → Next.js route-lar (App Router)
    (marketing)/          → landing, public səhifələr (Header+Footer layout)
    (portal)/             → login sonrası (Sidebar+Header layout) — bu sprintdə skeleton
  components/
    ui/                   → baza komponentlər (Button, Card, Badge, Input...) — KUDS "Shared Components"
    layout/                → Header, Footer, Sidebar, Container
    sections/              → landing-ə məxsus tərkib bölmələri (Hero, HowItWorks, ServiceCategories...)
  layouts/                → layout wrapper-lər
  hooks/                  → custom hook-lar
  services/                → API çağırış qatı (bax §7) — komponentlər BURAYA müraciət edir, fetch-ə yox
  types/                   → TypeScript tipləri, backend ilə paylaşılacaq shape-lər
  utils/                   → təmiz funksiyalar (formatlama, validasiya köməkçiləri)
  constants/               → statik məzmun (landing mətnləri, kateqoriya siyahısı və s.) — hardcode string yox
  styles/                  → globals.css, design tokens
  assets/
public/
```

Qayda: **bir fayl = bir məsuliyyət.** 200 sətirdən uzun component faylı gördükdə alt-komponentlərə böl.

---

## 4. Design Tokens — KUDS v1.0 (dəyişməz, mənbə: rəsmi sənəd)

Bunlar Tailwind config-də **token** kimi təyin olunur. Kodun heç yerində hardcode hex / px yazılmır — yalnız token adı istifadə olunur.

### Rənglər
```
ku-green:        #44766C   (primary)
ku-green-dark:   #16423C
ku-green-soft:   #D3E8BF
ku-blue-light:   #CAEAF1
ku-cream:        #F0F3BF
background:      #F8FAFC
surface:         #FFFFFF
border:          #E2E8F0
text-primary:    #1E293B
text-secondary:  #64748B
success:         #10B981
warning:         #F59E0B
danger:          #EF4444   ← təcili dəstög elementləri bunu istifadə edir
```

### Tipoqrafiya
Font: **Poppins** (fallback: Tahoma). Line-height: 150%.

| Element | Size | Weight |
|---|---|---|
| Display | 40px | Bold |
| H1 | 32px | Bold |
| H2 | 24px | SemiBold |
| H3 | 20px | SemiBold |
| H4 | 18px | Medium |
| Body | 16px | Regular |
| Small | 14px | Regular |
| Caption | 12px | Regular |

### Spacing — yalnız bu dəyərlər istifadə oluna bilər
`4, 8, 12, 16, 24, 32, 48, 64, 96` (px). Başqa dəyər (məs. `18px`, `p-5` arbitrary) **qadağandır**.

### Radius
Button/Input: `8px` · Card: `12px` · Modal: `16px` · Badge: `999px` · Avatar: `50%`

### Shadow (yalnız bunlar, ağır kölgə yoxdur)
```
shadow-xs: 0 1px 2px rgba(0,0,0,.04)
shadow-sm: 0 2px 6px rgba(0,0,0,.06)
shadow-md: 0 8px 20px rgba(0,0,0,.08)
```

### Layout
Desktop max-width: `1440px` · Header height: `72px` · Sidebar width: `280px` (portal layout-da) · Content padding: `32px` · Card gap: `24px`

### Breakpoints (Tailwind default-larından FƏRQLİDİR — override et)
```
mobile:  0–767
tablet:  768–1023
laptop:  1024–1279
desktop: 1280–1535
xl:      1536+
```

### İkonlar
Yalnız **Lucide**. Navigation icon 24px, card icon 20px, inline icon 16px.

---

## 5. Komponent yazma qaydaları

- Hər `ui/` komponenti: TypeScript `interface Props`, `forwardRef`, `cva` ilə variant idarəsi.
- Server Component defolt haldır. `"use client"` yalnız state/effect/event handler lazım olduqda əlavə olunur — hər faylın başına avtomatik yazılmır.
- Props-da mənasız `any` yoxdur. Union type / generic istifadə et.
- Hər interaktiv element: görünən focus state, `aria-label` (lazım olduqda), semantic HTML (`<nav>`, `<button>`, `<header>` — `<div onClick>` yox).
- KUDS §18-də sadalanan komponentlər (Button, Input, Card, Modal, Table, Badge, Avatar, Notification, Sidebar, Header, Footer, Pagination, Breadcrumb, Calendar, Charts) — layihə daxilində **fərqli versiyada yenidən yaradılmır.** Bu sprintdə lazım olmayanlar (Table, Modal, Calendar, Charts, Pagination) sadəcə yazılmır, amma yazılanda da bu faylda təyin olunmuş token sistemindən kənara çıxmır.

---

## 6. Dizayn — "AI-generated" görünüşdən qaçınma qaydaları

Bunlar KUDS-in üstündə əlavə keyfiyyət tələbidir:

- ❌ Kartların/bölmələrin kənarında dekorativ accent-stripe, vertical rəngli zolaq, "single-side border" işlətmə.
- ❌ Başlıqların altında dekorativ xətt (underline accent) qoyma.
- ❌ Mənasız `01 / 02 / 03` nömrələmə — yalnız məzmun HƏQİQƏTƏN ardıcıl proses olduqda istifadə et (məs. "Necə işləyir" 5 addımı — bu real ardıcıllıqdır, ora uyğundur; amma xidmət kartlarına nömrə qoymaq mənasızdır).
- ❌ Hər bölməni bir-birindən ayıran nazik horizontal xətlər (hairline divider) — bunun yerinə whitespace və ya background fərqi istifadə et.
- ❌ Generic stok emoji/stiker illüstrasiya (məs. rastgələ 🎯🚀✨ dekorativ istifadə).
- ✅ Landing üçün **bir imza element** seç (məs. "Sizə hansı mövzuda dəstək lazımdır?" sualının interaktiv/vizual şəkildə hero-da mərkəzi element olması) və ətrafını sadə saxla.
- ✅ Animasiya minimal və məqsədli: səhifə yüklənəndə bir dəfəlik yumşaq görünmə, scroll-da yüngül reveal kifayətdir. Hər elementə hover-effect əlavə etmə.
- Bu bölmə KUDS rəng/spacing/radius qaydalarını **əvəz etmir** — onların üstünə əlavə olunur.

---

## 7. API / Backend inteqrasiya qatı (ƏN VACİB QAYDA)

Backend başqa komanda tərəfindən yazılır və Swagger ilə təhvil veriləcək. Bu səbəbdən:

- **Heç bir komponent birbaşa `fetch`/`axios` çağırmır.** Bütün sorğular `src/services/*.ts` daxilindən keçir.
- Hər servis funksiyası bu sprintdə mock data qaytarır (məs. `src/services/mock/`), amma imzası (function signature, return type) elə yazılır ki, backend hazır olanda **yalnız funksiyanın daxili implementasiyası** dəyişsin, komponentlər toxunulmaz qalsın.
- `src/types/` içindəki tiplər backend response şəklini əvvəlcədən modelləşdirir (təxmini) — bu, backend komandası ilə kontrakt danışığını asanlaşdırır.
- Environment-ə görə API base URL dəyişməsi üçün `.env` istifadə olunur (`.env.example` repo-da olmalıdır, real `.env` `.gitignore`-dadır).

---

## 8. Təhlükəsizlik

- İstifadəçi girişi olan hər forma Zod schema ilə validasiya olunur (bu sprintdə static olsa belə, schema strukturu qurulur).
- `dangerouslySetInnerHTML` **qadağandır**. Xarici HTML render lazımdırsa, əvvəlcə soruş.
- Heç bir secret/API key client-side kodda və ya `NEXT_PUBLIC_` prefiksi ilə saxlanmır. `NEXT_PUBLIC_` yalnız açıq (public) dəyərlər üçündür.
- Gələcəkdə token saxlanması lazım olanda (auth) — bu, `services/auth` daxilində mərkəzləşdirilir, komponentlərə səpələnmir. Bu sprintdə auth implementasiyası yoxdur, amma qovluq buna hazır saxlanılır.
- Xarici linklər (`target="_blank"`) həmişə `rel="noopener noreferrer"` ilə.

---

## 9. Error / Loading / Empty state

Hər data-asılı komponent üç vəziyyəti standart şəkildə handle edir: loading (skeleton, spinner yox — Design System `shadow`/`radius` qaydalarına uyğun skeleton), error (istifadəçiyə aydın, təqsirkar tərəf axtarmayan mesaj), empty (boş vəziyyət nə edəcəyini göstərir, sadəcə "məlumat yoxdur" yazmır). Bu sprintdə əsasən statik olsa da, komponent strukturu bu üç vəziyyəti dəstəkləyəcək şəkildə yazılır.

---

## 10. Commit və iş axını

- Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Bir commit = bir məntiqi dəyişiklik (bütün landing-i tək commit-ə yığma)
- Branch: `feature/landing-hero`, `feature/design-tokens` və s.

---

## 11. Qadağan siyahısı (Claude Code-un ən çox pozduğu qaydalar)

- ❌ Inline style (`style={{...}}`) — Tailwind class istifadə et.
- ❌ Arbitrary Tailwind dəyərləri (`p-[13px]`, `text-[#44766C]`) — token istifadə et.
- ❌ Komponent daxilində birbaşa `fetch()`.
- ❌ Scope-dan kənar səhifə/feature yazmaq ("bu da lazım olar" düşüncəsiylə əlavə iş görməmək).
- ❌ `any` tipi ilə keçib getmək.
- ❌ Bir React faylında 3-4 fərqli komponenti qarışdırıb export etmək.
- ❌ Design system-də olmayan rəng/font/spacing əlavə etmək.
- ❌ Yeni asılılıq (npm paket) soruşmadan əlavə etmək.

---

## 12. Bu sprint üçün "Definition of Done"

- [ ] `npm run build` xətasız keçir
- [ ] Landing səhifə bütün breakpoint-lərdə (mobile/tablet/laptop/desktop) düzgün görünür
- [ ] Bütün rənglər/spacing/radius token-dən gəlir, heç bir hardcode dəyər yoxdur
- [ ] Keyboard ilə bütün naviqasiya elementlərinə çatmaq mümkündür, focus vizual görünür
- [ ] Statik naviqasiya linkləri işləyir (səhifə boş olsa belə routing işləyir)
- [ ] Heç bir console error/warning yoxdur
- [ ] `services/` qatı mövcuddur və komponentlər ordan istifadə edir (birbaşa fetch yoxdur)

---

## 13. Sprint 2 əlavələri — Auth və CRUD qaydaları

### Token idarəsi
- Backend login/signup uğurlu olanda token-i response body-də JSON kimi qaytarır: `{"token": "<jwt>"}`, cookie YOXDUR.
- Token yalnız `src/services/auth/` daxilində oxunur/yazılır — komponentlər heç vaxt birbaşa `localStorage`-a müraciət etmir, yalnız `services/auth`-un təqdim etdiyi funksiyalardan (məs. `getToken()`, `setToken()`, `clearToken()`) istifadə edir.
- Bütün qorunan (protected) sorğularda token `Authorization: Bearer <token>` header-i ilə göndərilir — bu, `lib/api-client.ts`-də mərkəzləşdirilir, hər sorğuda əl ilə əlavə edilmir.
- Token 24 saat etibarlıdır. Müddəti bitmiş/etibarsız token ilə edilən sorğu 401 qaytararsa, istifadəçi avtomatik `/login`-ə yönləndirilir və `localStorage`-dan token silinir.

### Protected route qaydası
- `(portal)` route group-undakı bütün səhifələr token yoxlaması edir. Token yoxdursa `/login`-ə yönləndirir.

### Form/Error state pattern-i (bütün formalar üçün məcburi)
- Hər forma Zod schema ilə client-side validasiya edir, submit-dən əvvəl.
- Backend xətası HTTP 400 + `{"error": "mesaj"}` formatında qayıdır (field-based deyil, qlobal mesajdır) — forma bu mesajı görünən bir error banner/text kimi göstərir, konsola atmır.
- Submit zamanı loading state məcburidir (düymə disabled + spinner/mətn dəyişikliyi).
- Uğurlu əməliyyatdan sonra aydın bildiriş (toast/mesaj) göstərilir.

### Data siyahıları (GET əməliyyatları) üçün məcburi 3 state
- Loading: skeleton (spinner deyil, KUDS radius/shadow-na uyğun skeleton kart).
- Empty: "hələ heç nə yoxdur" mesajı + aydın next step (məs. "İlk müraciətini yarat" düyməsi).
- Error: aydın, təqsirkar axtarmayan mesaj + yenidən cəhd düyməsi.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
