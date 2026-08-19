const SKELETON_ITEMS = [0, 1, 2, 3, 4, 5];

export function ServicesSkeleton() {
  return (
    <div
      className="tablet:grid-cols-2 desktop:grid-cols-3 grid grid-cols-1 gap-6"
      aria-hidden="true"
    >
      {SKELETON_ITEMS.map((item) => (
        <div
          key={item}
          className="flex animate-pulse flex-col gap-4 rounded-card bg-surface p-6 shadow-sm"
        >
          <div className="h-5 w-3/5 rounded-lg bg-border" />
          <div className="h-4 w-full rounded-lg bg-border" />
          <div className="h-4 w-4/5 rounded-lg bg-border" />
        </div>
      ))}
    </div>
  );
}
