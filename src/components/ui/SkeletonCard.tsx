export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-cream p-4 space-y-3">
      <div className="skeleton h-5 w-2/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4" style={{ width: `${80 - i * 10}%` }} />
      ))}
    </div>
  );
}

export function SkeletonLineItem() {
  return (
    <div className="card-cream p-4 flex justify-between items-center gap-3">
      <div className="flex-1 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
      </div>
      <div className="skeleton h-5 w-20" />
    </div>
  );
}
