import { stats } from '@/data/content';

export default function Stats() {
  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-black text-stone-900 sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-stone-500">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
