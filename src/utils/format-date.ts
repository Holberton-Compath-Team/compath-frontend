const MONTH_LABELS = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "İyun",
  "İyul",
  "Avq",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];

export function formatDate(iso: string): string {
  const date = new Date(iso);

  const day = date.getUTCDate();
  const month = MONTH_LABELS[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day} ${month} ${year}`;
}
