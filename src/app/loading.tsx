export default function GlobalLoading() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-40 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-28">
        <SkeletonBar w="w-32" h="h-5" />
        <SkeletonBar w="w-3/4" h="h-16" className="mt-6" />
        <SkeletonBar w="w-2/3" h="h-16" className="mt-2" />
        <SkeletonBar w="w-full max-w-xl" h="h-4" className="mt-8" />
        <SkeletonBar w="w-full max-w-md" h="h-4" className="mt-2" />
        <div className="mt-10 flex gap-3">
          <SkeletonBar w="w-44" h="h-12" />
          <SkeletonBar w="w-40" h="h-12" />
        </div>
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    </section>
  );
}

function SkeletonBar({
  w,
  h,
  className = "",
}: {
  w: string;
  h: string;
  className?: string;
}) {
  return (
    <div
      className={`${w} ${h} ${className} rounded-md bg-gradient-to-r from-[var(--color-ink-2)] via-[var(--color-ink-3)] to-[var(--color-ink-2)] animate-pulse`}
      aria-hidden="true"
    />
  );
}

function SkeletonCard() {
  return (
    <div
      className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-ink-2)] p-6 animate-pulse"
      aria-hidden="true"
    >
      <div className="h-4 w-20 rounded bg-[var(--color-ink-3)]" />
      <div className="mt-4 h-6 w-3/4 rounded bg-[var(--color-ink-3)]" />
      <div className="mt-3 h-3 w-full rounded bg-[var(--color-ink-3)]" />
      <div className="mt-1 h-3 w-5/6 rounded bg-[var(--color-ink-3)]" />
      <div className="mt-6 flex gap-2">
        <div className="h-5 w-16 rounded bg-[var(--color-ink-3)]" />
        <div className="h-5 w-12 rounded bg-[var(--color-ink-3)]" />
      </div>
    </div>
  );
}
