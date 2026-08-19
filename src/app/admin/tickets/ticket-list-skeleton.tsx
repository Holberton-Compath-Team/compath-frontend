const SKELETON_ITEMS = [0, 1, 2];

export function TicketListSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      {SKELETON_ITEMS.map((item) => (
        <div
          key={item}
          className="flex animate-pulse flex-col gap-4 rounded-card bg-surface p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="h-5 w-2/5 rounded-lg bg-border" />
            <div className="h-5 w-16 rounded-badge bg-border" />
          </div>
          <div className="h-4 w-full rounded-lg bg-border" />
          <div className="h-4 w-3/5 rounded-lg bg-border" />
        </div>
      ))}
    </div>
  );
}
