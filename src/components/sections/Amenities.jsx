import SectionHeading from '@/components/ui/SectionHeading';
import { amenities } from '@/data/content';

const icons = {
  mountain: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M3 20L10 6l4 7 3-4 4 11H3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
  ),
  flame: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 2c1 4-4 6-4 11a4 4 0 008 0c0-2-1-3-1-3s3 1 3 5a6 6 0 01-12 0C6 8 12 7 12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
  ),
  wifi: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M2 9a15 15 0 0120 0M5.5 12.5a10 10 0 0113 0M9 16a5 5 0 016 0M12 19.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  bike: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="6" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.8"/><circle cx="18" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.8"/><path d="M6 17l4-7h5l3 7M10 10l2-4h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  coffee: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 9h12v6a5 5 0 01-5 5H9a5 5 0 01-5-5V9zM16 10h2a2.5 2.5 0 010 5h-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
  car: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M4 16v-5l2-5h11l3 5v5M4 16h16M4 16v2m16-2v2M7.5 13h.01M16.5 13h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
  ),
};

export default function Amenities() {
  return (
    <section id="tien-ich" className="bg-stone-950 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Tiện ích"
          title="Ở 4Chan, bạn chỉ việc chill"
          desc="Mọi thứ còn lại để tụi mình lo — từ bữa sáng tới lịch trình săn mây."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((a) => (
            <div
              key={a.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-amber-400/40 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                {icons[a.icon]}
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-400">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
