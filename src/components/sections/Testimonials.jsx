import SectionHeading from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/content';

export default function Testimonials() {
  return (
    <section id="danh-gia" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Đánh giá"
          title="Khách ở xong đều muốn quay lại"
          desc="4.9/5 trên Google với hơn 2.000 review thật."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-stone-200 bg-stone-50 p-7"
            >
              <div className="flex gap-1 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-stone-700">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-5 border-t border-stone-200 pt-4 text-sm font-bold text-stone-900">
                {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
