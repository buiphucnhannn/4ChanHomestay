import SectionHeading from '@/components/ui/SectionHeading';
import { siteConfig } from '@/data/content';

export default function Contact() {
  return (
    <section id="lien-he" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Liên hệ"
          title="Lạc đường cứ gọi, tụi mình ra đón"
          desc="Inbox fanpage rep trong 5 phút, gọi điện lúc nào cũng có người nghe (7:00–22:00)."
        />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-3">
          <a href={`tel:${siteConfig.phone.replaceAll(' ', '')}`} className="rounded-3xl border border-stone-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-3xl">📞</p>
            <h3 className="mt-3 font-bold">Gọi điện</h3>
            <p className="mt-1 text-sm font-semibold text-amber-600">{siteConfig.phone}</p>
          </a>
          <a href={`mailto:${siteConfig.email}`} className="rounded-3xl border border-stone-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
            <p className="text-3xl">✉️</p>
            <h3 className="mt-3 font-bold">Email</h3>
            <p className="mt-1 break-all text-sm font-semibold text-amber-600">{siteConfig.email}</p>
          </a>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 text-center">
            <p className="text-3xl">📍</p>
            <h3 className="mt-3 font-bold">Địa chỉ</h3>
            <p className="mt-1 text-sm text-stone-600">{siteConfig.address}</p>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-3xl border border-stone-200 bg-white">
          <iframe
            title="Bản đồ 4Chan Homestay"
            src="https://www.google.com/maps?q=Sapa&output=embed"
            className="h-72 w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
