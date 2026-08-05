import {
  CalendarClock,
  Compass,
  EyeOff,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Lock,
  PhoneCall,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface HeroCategory {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const HERO_HEADLINE = "Problemini söylə, doğru xidməti tapaq";
export const HERO_SUBTEXT =
  "COMPATH tələbənin akademik, inzibati-maliyyə və ya şəxsi-həssas ehtiyacını avtomatik olaraq doğru universitet xidmətinə yönləndirir.";

export const HERO_CATEGORIES: HeroCategory[] = [
  { icon: GraduationCap, label: "Akademik", href: "/services" },
  { icon: Landmark, label: "İnzibati-Maliyyə", href: "/services" },
  { icon: HeartHandshake, label: "Şəxsi-həssas", href: "/services" },
];

export const EMERGENCY_BANNER = {
  icon: PhoneCall,
  text: "Təcili yardıma ehtiyacınız var? Kateqoriyadan asılı olmayaraq dərhal dəstək xəttinə müraciət edin.",
  linkLabel: "Ətraflı bax",
  href: "/services",
};

export interface ServiceCategory {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  urgent?: boolean;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    icon: GraduationCap,
    title: "Akademik",
    description:
      "Dərs qeydiyyatı, imtahan, davamiyyət və akademik məsləhət ilə bağlı bütün müraciətlər.",
    href: "/services",
  },
  {
    icon: Landmark,
    title: "İnzibati-Maliyyə",
    description:
      "Sənəd dövriyyəsi, ödəniş, təqaüd və digər inzibati əməliyyatlar üçün yönləndirmə.",
    href: "/services",
  },
  {
    icon: HeartHandshake,
    title: "Şəxsi-həssas",
    description:
      "Anonim və təhlükəsiz şəkildə həssas mövzularda dəstək xidmətlərinə çıxış.",
    href: "/services",
    urgent: true,
  },
];

export interface HowItWorksStep {
  step: string;
  title: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    step: "01",
    title: "Ehtiyacın müəyyənləşdirilməsi",
    description: "Problemini qısa şəkildə təsvir et, sistem növünü müəyyən etsin.",
  },
  {
    step: "02",
    title: "Uyğun xidmətin tapılması",
    description: "COMPATH problemini doğru universitet xidmətinə avtomatik yönləndirir.",
  },
  {
    step: "03",
    title: "Müraciətin hazırlanması",
    description: "Lazımi məlumatları daxil et, müraciətin bir neçə addımda tamamlansın.",
  },
  {
    step: "04",
    title: "Görüş/Xidmət",
    description: "Müvafiq şöbə ilə görüş təyin olunur və ya xidmət birbaşa göstərilir.",
  },
  {
    step: "05",
    title: "Nəticənin izlənməsi",
    description: "Müraciətinin statusunu istənilən vaxt platformadan izləyə bilərsən.",
  },
];

export interface WhyCompathItem {
  icon: LucideIcon;
  problemTitle: string;
  problemDescription: string;
  solutionTitle: string;
  solutionDescription: string;
}

export const WHY_COMPATH_ITEMS: WhyCompathItem[] = [
  {
    icon: Compass,
    problemTitle: "Yönləndirmə Çatışmazlığı",
    problemDescription:
      "Tələbələr hansı xidmətə müraciət edəcəyini bilmir, səhv qapılar döyür və vaxt itirir.",
    solutionTitle: "Mərkəzləşdirilmiş Ekosistem",
    solutionDescription:
      "Bütün xidmətlər tək platformada, ehtiyaca uyğun avtomatik yönləndirmə ilə əlçatandır.",
  },
  {
    icon: CalendarClock,
    problemTitle: "Bürokratik Maneələr",
    problemDescription:
      "Kağız işləri, uzun növbələr və qeyri-müəyyən proseslər müraciəti çətinləşdirir.",
    solutionTitle: "Vaxta Qənaət",
    solutionDescription:
      "Sadələşdirilmiş rəqəmsal müraciət axını ilə status istənilən vaxt izlənə bilir.",
  },
  {
    icon: Lock,
    problemTitle: "Anonimlik Ehtiyacı",
    problemDescription:
      "Həssas mövzularda tələbələr adının açıqlanmasından çəkinir və müraciət etmir.",
    solutionTitle: "Məmnunluq və Effektivlik",
    solutionDescription:
      "Anonim və təhlükəsiz müraciət seçimi rahat və effektiv dəstək təcrübəsi yaradır.",
  },
];

export interface TrustPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const TRUST_POINTS: TrustPoint[] = [
  {
    icon: Lock,
    title: "Şifrələnmiş məlumat",
    description: "Müraciətlərin bütün mərhələlərdə qorunur, üçüncü tərəflə paylaşılmır.",
  },
  {
    icon: EyeOff,
    title: "Anonim müraciət seçimi",
    description: "Həssas mövzularda kimliyini açıqlamadan dəstək ala bilərsən.",
  },
  {
    icon: ShieldCheck,
    title: "Nəzarətli çıxış",
    description: "Məlumatlarına yalnız müraciətinlə əlaqəli səlahiyyətli şəxslər çıxış edir.",
  },
];

export const FINAL_CTA = {
  title: "Doğru xidmətə bir addım qalıb",
  subtext: "Qeydiyyatdan keç və problemini bizə söylə — qalanını COMPATH həll etsin.",
  primaryLabel: "Qeydiyyatdan keç",
  primaryHref: "/register",
  secondaryLabel: "Daxil ol",
  secondaryHref: "/login",
};
