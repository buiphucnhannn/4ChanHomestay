import Image from 'next/image';
import Button from './Button';

export default function RoomCard({ room }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {room.hot && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow">
            🔥 Best seller
          </span>
        )}
        <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm font-bold text-white backdrop-blur">
          {room.price}
          <span className="font-normal opacity-80">{room.unit}</span>
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-stone-900">{room.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">{room.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {room.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <Button href="#dat-phong" size="sm" className="flex-1">
            Đặt ngay
          </Button>
          <Button href="#lien-he" variant="outline" size="sm" className="flex-1">
            Chi tiết
          </Button>
        </div>
      </div>
    </article>
  );
}
