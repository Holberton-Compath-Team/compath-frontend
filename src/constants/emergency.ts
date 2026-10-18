import type { EmergencyContact, SafetyGuideCategory } from "@/types/emergency";

export const NATIONAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    phone: "112",
    label: "Vahid Təcili Xidmət",
    description: "Hər növ təcili vəziyyətdə ilk müraciət nömrəsi.",
  },
  {
    phone: "103",
    label: "Təcili Tibbi Yardım",
    description: "Tibbi yardım lazım olduqda.",
  },
  {
    phone: "102",
    label: "Polis",
    description: "Təhlükəsizlik təhdidi olduqda.",
  },
  {
    phone: "101",
    label: "Yanğın Xidməti",
    description: "Yanğın və ya təxliyə lazım olduqda.",
  },
];

// Universitet daxili nömrələr hələ təyin olunmayıb — phone: null olanlar UI-da göstərilmir.
export const CAMPUS_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    phone: null,
    label: "Təhlükəsizlik xidməti",
    description: "Kampus ərazisində təhlükəsizlik təhdidi zamanı.",
  },
  {
    phone: null,
    label: "Psixoloji dəstək",
    description: "Psixoloji böhran və ya emosional dəstək lazım olduqda.",
  },
  {
    phone: null,
    label: "Tibb məntəqəsi",
    description: "Kampusda tibbi yardım lazım olduqda.",
  },
];

export const SAFETY_GUIDES: SafetyGuideCategory[] = [
  {
    title: "Tibbi yardım",
    steps: [
      "Sakit qalmağa çalış, panikaya düşmə.",
      "Mümkündürsə, özünü və ətrafdakıları təhlükəsiz vəziyyətə gətir.",
      "103 və ya 112 nömrəsinə zəng et, dəqiq ünvanı bildir.",
      "Yaxınlıqdakı bir insandan köməyə çağırmasını xahiş et.",
      "Təcili xidmət gələnə qədər xəstənin yanında qal.",
    ],
  },
  {
    title: "Psixoloji böhran",
    steps: [
      "Nə hiss etdiyin önəmlidir — tək deyilsən, bu, keçici bir haldır.",
      "Mümkünsə, dərin nəfəs al və bir neçə dəqiqə özünə vaxt ver.",
      "Yaxın bildiyin bir insana və ya universitetin psixoloji dəstək xəttinə müraciət et.",
      "Özünə və ya başqasına zərər vermək riski varsa, dərhal 112-yə zəng et.",
      "Bu hissləri tək daşımaq məcburiyyətində deyilsən — kömək istəmək normaldır.",
    ],
  },
  {
    title: "Təhlükəsizlik təhdidi",
    steps: [
      "Mümkün qədər tez təhlükəli bölgədən uzaqlaş, təhlükəsiz yerə keç.",
      "Səsini ucaltma, diqqəti cəlb etməkdən çəkin, sakit hərəkət et.",
      "102 və ya 112 nömrəsinə zəng et, dəqiq məkanı və vəziyyəti izah et.",
      "Mümkündürsə, yaxınlıqdakı insanlara və ya təhlükəsizlik xidmətinə xəbər ver.",
      "Təhlükə keçənə qədər təhlükəsiz yerdə qal.",
    ],
  },
];
