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

export function formatDateTime(iso: string): string {
  const date = new Date(iso);

  const day = date.getUTCDate();
  const month = MONTH_LABELS[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}
