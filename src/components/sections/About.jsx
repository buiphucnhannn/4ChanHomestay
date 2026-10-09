import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

const bullets = [
  'Cách trung tâm 5 phút xe, nhưng yên tĩnh tuyệt đối',
  'Full view thung lũng mây, không bị chắn',
  'Chủ nhà bản địa, hỗ trợ lịch trình miễn phí',
  'Vệ sinh 2 lần/ngày, nệm cao su non êm',
];

export default function About() {
  return (
    <section id="gioi-thieu" className="bg-stone-50 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=900&auto=format&fit=crop"
              alt="4Chan Homestay"
              width={900}
              height={700}
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-2xl bg-white p-5 shadow-xl sm:right-6">
            <p className="text-3xl font-black text-amber-500">8 năm</p>
            <p className="text-sm font-medium text-stone-600">làm homestay bằng cả trái tim</p>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Giới thiệu"
            title="Không chỉ là chỗ ngủ, là chỗ để nhớ"
            desc="4Chan bắt đầu từ căn nhà gỗ nhỏ của gia đình. Tụi mình giữ nguyên mái ngói, hiên gỗ, thêm chút tiện nghi hiện đại để bạn vừa chill vừa thoải mái."
          />
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm font-medium text-stone-700">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3">
            <Button href="#thu-vien">Xem ảnh thật →</Button>
            <Button href="#danh-gia" variant="outline">Khách nói gì?</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
