import type {
  ContactInfo,
  HowItWorksStep,
  ServiceCategory,
  TrustPoint,
  WhyCompathItem,
} from "@/types/landing";

export const MOCK_SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "academic",
    icon: "graduation-cap",
    title: "Akademik",
    description:
      "Dərs qeydiyyatı, imtahan, davamiyyət və akademik məsləhət ilə bağlı bütün müraciətlər.",
    href: "/services",
  },
  {
    id: "administrative-financial",
    icon: "landmark",
    title: "İnzibati-Maliyyə",
    description:
      "Sənəd dövriyyəsi, ödəniş, təqaüd və digər inzibati əməliyyatlar üçün yönləndirmə.",
    href: "/services",
  },
  {
    id: "personal-sensitive",
    icon: "heart-handshake",
    title: "Şəxsi-həssas",
    description:
      "Anonim və təhlükəsiz şəkildə həssas mövzularda dəstək xidmətlərinə çıxış.",
    href: "/services",
    urgent: true,
  },
];

export const MOCK_HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "step-1",
    step: "01",
    title: "Ehtiyacın müəyyənləşdirilməsi",
    description: "Problemini qısa şəkildə təsvir et, sistem növünü müəyyən etsin.",
  },
  {
    id: "step-2",
    step: "02",
    title: "Uyğun xidmətin tapılması",
    description: "COMPATH problemini doğru universitet xidmətinə avtomatik yönləndirir.",
  },
  {
    id: "step-3",
    step: "03",
    title: "Müraciətin hazırlanması",
    description: "Lazımi məlumatları daxil et, müraciətin bir neçə addımda tamamlansın.",
  },
  {
    id: "step-4",
    step: "04",
    title: "Görüş/Xidmət",
    description: "Müvafiq şöbə ilə görüş təyin olunur və ya xidmət birbaşa göstərilir.",
  },
  {
    id: "step-5",
    step: "05",
    title: "Nəticənin izlənməsi",
    description: "Müraciətinin statusunu istənilən vaxt platformadan izləyə bilərsən.",
  },
];

export const MOCK_WHY_COMPATH_ITEMS: WhyCompathItem[] = [
  {
    id: "routing-gap",
    icon: "compass",
    problemTitle: "Yönləndirmə Çatışmazlığı",
    problemDescription:
      "Tələbələr hansı xidmətə müraciət edəcəyini bilmir, səhv qapılar döyür və vaxt itirir.",
    solutionTitle: "Mərkəzləşdirilmiş Ekosistem",
    solutionDescription:
      "Bütün xidmətlər tək platformada, ehtiyaca uyğun avtomatik yönləndirmə ilə əlçatandır.",
  },
  {
    id: "bureaucracy",
    icon: "calendar-clock",
    problemTitle: "Bürokratik Maneələr",
    problemDescription:
      "Kağız işləri, uzun növbələr və qeyri-müəyyən proseslər müraciəti çətinləşdirir.",
    solutionTitle: "Vaxta Qənaət",
    solutionDescription:
      "Sadələşdirilmiş rəqəmsal müraciət axını ilə status istənilən vaxt izlənə bilir.",
  },
  {
    id: "anonymity",
    icon: "lock",
    problemTitle: "Anonimlik Ehtiyacı",
    problemDescription:
      "Həssas mövzularda tələbələr adının açıqlanmasından çəkinir və müraciət etmir.",
    solutionTitle: "Məmnunluq və Effektivlik",
    solutionDescription:
      "Anonim və təhlükəsiz müraciət seçimi rahat və effektiv dəstək təcrübəsi yaradır.",
  },
];

export const MOCK_TRUST_POINTS: TrustPoint[] = [
  {
    id: "encrypted-data",
    icon: "lock",
    title: "Şifrələnmiş məlumat",
    description: "Müraciətlərin bütün mərhələlərdə qorunur, üçüncü tərəflə paylaşılmır.",
  },
  {
    id: "anonymous-request",
    icon: "eye-off",
    title: "Anonim müraciət seçimi",
    description: "Həssas mövzularda kimliyini açıqlamadan dəstək ala bilərsən.",
  },
  {
    id: "controlled-access",
    icon: "shield-check",
    title: "Nəzarətli çıxış",
    description: "Məlumatlarına yalnız müraciətinlə əlaqəli səlahiyyətli şəxslər çıxış edir.",
  },
];

export const MOCK_CONTACT_INFO: ContactInfo = {
  email: "info@compath.edu.az",
  emergencyText: "Təcili yardım: dəstək xətti tezliklə aktivləşəcək",
};
