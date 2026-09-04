export interface FaqItem {
  question: string;
  answer: string;
}

export const ACADEMIC_SERVICE_FAQ: FaqItem[] = [
  {
    question: "Dərs qeydiyyatı nə vaxt bitir?",
    answer:
      "Dərs qeydiyyatı akademik təqvimin ilk 2 həftəsi ərzində açıq olur. Dəqiq tarixlər üçün tələbə portalını yoxlayın.",
  },
  {
    question: "İmtahan nəticəmə necə apellyasiya verə bilərəm?",
    answer:
      "Nəticələr elan olunduqdan sonra 48 saat ərzində sistem üzərindən 'Apellyasiya' şöbəsinə müraciət etməlisiniz.",
  },
  {
    question: "Davamiyyət limitini keçmişəm, nə etməliyəm?",
    answer:
      "Üzrlü səbəbiniz (tibbi arayış və s.) varsa, sənədlərlə birlikdə dekanlığa müraciət edin.",
  },
];
