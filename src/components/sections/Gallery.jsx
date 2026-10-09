import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { galleryImages } from '@/data/content';

export default function Gallery() {
  return (
    <section id="thu-vien" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Thư viện"
          title="Ảnh chụp thật 100% tại home"
          desc="Không filter quá đà, không ảnh mạng. Tới nơi mà khác ảnh là free luôn đêm đầu."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((src, i) => (
            <div
              key={src + i}
              className="group relative h-56 overflow-hidden rounded-2xl sm:h-72"
            >
              <Image
                src={src}
                alt={`Ảnh homestay ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
