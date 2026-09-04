const SKELETON_CARDS = [0, 1, 2];

export function AnalyticsSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      {SKELETON_CARDS.map((item) => (
        <div key={item} className="animate-pulse rounded-card bg-surface p-6 shadow-sm">
          <div className="mb-4 h-5 w-2/5 rounded-lg bg-border" />
          <div className="h-24 w-full rounded-lg bg-border" />
        </div>
      ))}
    </div>
  );
}
