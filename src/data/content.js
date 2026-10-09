// Dữ liệu chuẩn xác 100% cho 4Chan Homestay theo thiết kế mẫu

export const siteConfig = {
  name: '4Chan',
  subName: 'HOMESTAY',
  fullName: '4Chan Homestay',
  slogan: 'Có những khoảng thời gian đáng giá',
  phone: '0987.879.803',
  zalo: '365247685',
  zaloUrl: 'https://zalo.me/365247685',
  facebookUrl: 'https://facebook.com',
  bookingPhone: '0987.879.803',
};

export const navLinks = [
  { label: 'Trang chủ', href: '#trang-chu' },
  { label: 'Giới thiệu', href: '#the-moment' },
  { label: 'Loại phòng', href: '#kham-pha-phong' },
  { label: 'Bảng giá', href: '#bang-gia' },
  { label: 'Địa điểm', href: '#dia-diem' },
  { label: 'Liên hệ', href: '#lien-he' },
];

export const heroData = {
  locationBadge: '4CHAN HOMESTAY • HÀ NỘI',
  titlePart1: 'Có những khoảng thời gian',
  titlePart2: 'đáng giá',
  scriptLine1: 'không phải vì đi đâu...',
  scriptLine2: 'mà vì ở cùng ai.',
  desc: 'Một không gian đủ riêng tư để nghỉ ngơi,\ntrò chuyện và tận hưởng trọn vẹn từng khoảnh khắc bên nhau.',
  socialProof: 'Hơn 1,000+ cặp đôi đã có những khoảnh khắc đáng nhớ tại 4Chan',
  handwrittenPhotoText: 'Một chút nhẹ nhàng\nKhiến mình cảm thấy\nđẹp hơn\nliền nhau ♡',
};

export const theMomentData = {
  subtitle: 'The',
  brand: '4Chan',
  scriptWord: 'Moment',
  description: [
    'Một căn phòng đẹp.',
    'Một buổi tối không vội.',
    'Một người bạn muốn ở cạnh.',
  ],
  ctaText: 'TÌM HIỂU THÊM',
  features: [
    {
      title: 'Riêng tư',
      desc: 'Kín đáo, thoải mái',
      bg: 'bg-[#D6CEBC]/40 text-[#4E443B]',
      icon: 'lock',
    },
    {
      title: 'Sạch sẽ',
      desc: 'Chăm chút từng chi tiết',
      bg: 'bg-[#CAD5C4]/50 text-[#3C4A38]',
      icon: 'sparkles',
    },
    {
      title: 'Tự check-in',
      desc: 'Chủ động, tiện lợi',
      bg: 'bg-[#EBD2C2]/50 text-[#54382B]',
      icon: 'key',
    },
  ],
};

// Ảnh cắt từ poster gốc trong public/images (xem scripts/crop-room-photos.cjs).
// Giá theo poster: phòng ban công 279k/3h – 539k qua đêm; phòng cửa sổ 249k/3h – 449k qua đêm.
export const roomsList = [
  {
    id: '201',
    name: 'ROOM 201',
    type: 'Ban công',
    tags: ['Ban công', 'View cây xanh', 'Máy chiếu', 'Tông cam ấm'],
    desc: 'Phòng 201 tông cam ấm áp, góc ngồi cạnh khung kính nhìn ra cây xanh, máy chiếu lớn cho những buổi xem phim cùng nhau.',
    price3h: '279k',
    priceNight: '539k',
    mainImage: '/rooms/room-201.jpg',
    thumbs: ['/rooms/room-201.jpg', '/rooms/room-201-thumb1.jpg', '/rooms/room-201-thumb2.jpg', '/rooms/room-201-thumb3.jpg'],
  },
  {
    id: '202',
    name: 'ROOM 202',
    type: 'Cửa sổ',
    tags: ['Cửa sổ lớn', 'Tông cam đất', 'Bếp mini', 'Máy chiếu'],
    desc: 'Phòng 202 với vòm tường bo cong mềm mại, giường bọc nệm cam đất, bếp mini và tủ đồ tiện nghi.',
    price3h: '249k',
    priceNight: '449k',
    mainImage: '/rooms/room-202.jpg',
    thumbs: ['/rooms/room-202.jpg', '/rooms/room-202-thumb1.jpg', '/rooms/room-202-thumb2.jpg', '/rooms/room-202-thumb3.jpg'],
  },
  {
    id: '401',
    name: 'ROOM 401',
    type: 'Ban công',
    tags: ['Ban công', 'Vòm đỏ nổi bật', 'Sofa da', 'Máy chiếu'],
    desc: 'Phòng 401 nổi bật với mảng vòm đỏ sau giường, sofa da cam ấm áp và ban công kính nhìn ra phố đêm.',
    price3h: '279k',
    priceNight: '539k',
    mainImage: '/rooms/room-401.jpg',
    thumbs: ['/rooms/room-401.jpg', '/rooms/room-401-thumb1.jpg', '/rooms/room-401-thumb2.jpg', '/rooms/room-401-thumb3.jpg'],
  },
  {
    id: '402',
    name: 'ROOM 402',
    type: 'Cửa sổ',
    tags: ['Cửa sổ', 'Vòm đỏ cá tính', 'Ghế bành', 'Máy chiếu'],
    desc: 'Phòng 402 với dãy vòm đỏ trắng cá tính, đầu giường bọc nệm và góc ghế bành thư giãn.',
    price3h: '249k',
    priceNight: '449k',
    mainImage: '/rooms/room-402.jpg',
    thumbs: ['/rooms/room-402.jpg', '/rooms/room-402-thumb1.jpg', '/rooms/room-402-thumb2.jpg', '/rooms/room-402-thumb3.jpg'],
  },
  {
    id: '501',
    name: 'ROOM 501',
    type: 'Ban công',
    tags: ['Ban công', 'Máy chiếu', 'Không gian ấm', 'Decor xinh'],
    desc: 'Phòng 501 với ban công thoáng, máy chiếu lớn, phù hợp cho những buổi hẹn hò hoặc staycation.',
    price3h: '279k',
    priceNight: '539k',
    mainImage: '/rooms/room-501.jpg',
    thumbs: ['/rooms/room-501.jpg', '/rooms/room-501-thumb1.jpg', '/rooms/room-501-thumb2.jpg', '/rooms/room-501-thumb3.jpg'],
  },
  {
    id: '502',
    name: 'ROOM 502',
    type: 'Cửa sổ',
    tags: ['Cửa sổ lớn', 'Tông be dịu', 'Bếp mini', 'Máy chiếu'],
    desc: 'Phòng 502 tông be nhẹ nhàng, cửa sổ lớn đón nắng, ghế bành êm và góc bếp nhỏ gọn gàng.',
    price3h: '249k',
    priceNight: '449k',
    mainImage: '/rooms/room-502.jpg',
    thumbs: ['/rooms/room-502.jpg', '/rooms/room-502-thumb1.jpg', '/rooms/room-502-thumb2.jpg', '/rooms/room-502-thumb3.jpg'],
  },
  {
    id: '601',
    name: 'ROOM 601',
    type: 'Ban công',
    tags: ['Ban công', 'Tông xám chill', 'Smart TV', 'Máy chiếu'],
    desc: 'Phòng 601 tông ghi xám tối giản, ban công kính ngắm phố, sofa và Smart TV cho góc chill lý tưởng.',
    price3h: '279k',
    priceNight: '539k',
    mainImage: '/rooms/room-601.jpg',
    thumbs: ['/rooms/room-601.jpg', '/rooms/room-601-thumb1.jpg', '/rooms/room-601-thumb2.jpg', '/rooms/room-601-thumb3.jpg'],
  },
  {
    id: '602',
    name: 'ROOM 602',
    type: 'Cửa sổ',
    tags: ['Cửa sổ lớn', 'Tông xám tối giản', 'Bếp mini', 'Máy chiếu'],
    desc: 'Phòng 602 tông xám tối giản, cửa sổ lớn nhìn ra phố, đầy đủ bếp, tủ đồ và máy chiếu sắc nét.',
    price3h: '249k',
    priceNight: '449k',
    mainImage: '/rooms/room-602.jpg',
    thumbs: ['/rooms/room-602.jpg', '/rooms/room-602-thumb1.jpg', '/rooms/room-602-thumb2.jpg', '/rooms/room-602-thumb3.jpg'],
  },
  {
    id: '702',
    name: 'ROOM 702',
    type: 'Cửa sổ',
    tags: ['Tầng cao view phố', 'Decor xanh lá', 'Bếp xinh', 'Máy chiếu'],
    desc: 'Phòng 702 tông xanh lá tươi mát với điểm nhấn chữ JOY, cửa sổ lớn nhìn ra phố, máy chiếu và bếp xinh đầy đủ.',
    price3h: '249k',
    priceNight: '449k',
    mainImage: '/rooms/room-702.jpg',
    thumbs: ['/rooms/room-702.jpg', '/rooms/room-702-thumb1.jpg', '/rooms/room-702-thumb2.jpg', '/rooms/room-702-thumb3.jpg'],
  },
];

export const pricingPackages = [
  {
    duration: '3 giờ',
    timeframe: 'Từ lúc nhận phòng',
    windowPrice: '249k',
    balconyPrice: '279k',
    icon: 'sun',
  },
  {
    duration: 'Combo 5 giờ',
    timeframe: '10:00 - 15:00',
    windowPrice: '279k',
    balconyPrice: '309k',
    icon: 'coffee',
  },
  {
    duration: 'Trong ngày 12 giờ',
    timeframe: 'Từ lúc nhận phòng',
    windowPrice: '409k',
    balconyPrice: '479k',
    icon: 'sun-high',
  },
  {
    duration: 'Qua đêm 12 giờ',
    timeframe: '21:00 - 09:00',
    windowPrice: '449k',
    balconyPrice: '539k',
    icon: 'moon',
  },
  {
    duration: '2 ngày 1 đêm',
    timeframe: '15:00 - 11:00',
    windowPrice: '479k',
    balconyPrice: '549k',
    icon: 'calendar',
  },
  {
    duration: 'Một ngày 24 giờ',
    timeframe: '10:00 - 10:00',
    windowPrice: '549k',
    balconyPrice: '609k',
    icon: 'clock',
  },
];

export const priceNote = {
  extraHour: 'Thêm giờ: +60k/giờ (ngoài thời gian của gói)',
  weekend: 'Thứ 6, Thứ 7: Giá phòng được điều chỉnh +50K',
};

export const experiencesList = [
  {
    title: 'Không gian riêng tư',
    desc: 'Kín đáo, thoải mái',
    photo: '/rooms/room-702.jpg',
    icon: 'heart',
  },
  {
    title: 'Hình ảnh phòng thật',
    desc: 'Như bạn thấy',
    photo: '/rooms/room-401.jpg',
    icon: 'image',
  },
  {
    title: 'Tự check-in, check-out',
    desc: 'Chủ động, tiện lợi',
    photo: '/rooms/room-202-thumb1.jpg',
    icon: 'key',
  },
  {
    title: 'Sạch sẽ, thơm tho',
    desc: 'Được chăm chút mỗi ngày',
    photo: '/rooms/room-501-thumb3.jpg',
    icon: 'sparkles',
  },
];

export const moodsList = [
  {
    id: 'dreamy',
    name: 'Dreamy',
    desc: 'Cho những tâm hồn mơ mộng',
    badgeIcon: 'cloud',
    badgeColor: 'text-sky-500 bg-sky-50',
    photo: '/mockup-assets/crops/mood-dreamy.jpg',
  },
  {
    id: 'cat-lover',
    name: 'Cat Lover',
    desc: 'Góc stay siêu xinh cho hội mê mèo',
    badgeIcon: 'cat',
    badgeColor: 'text-amber-600 bg-amber-50',
    photo: '/mockup-assets/crops/mood-catlover.jpg',
  },
  {
    id: 'retro-pop',
    name: 'Retro Pop',
    desc: 'Vibe màu sắc đầy năng lượng',
    badgeIcon: 'disc',
    badgeColor: 'text-rose-600 bg-rose-50',
    photo: '/mockup-assets/crops/mood-retropop.jpg',
  },
  {
    id: 'romantic',
    name: 'Romantic',
    desc: 'Không gian cho những buổi hẹn hò',
    badgeIcon: 'heart',
    badgeColor: 'text-pink-600 bg-pink-50',
    photo: '/mockup-assets/crops/mood-romantic.jpg',
  },
];

export const branchesList = [
  {
    id: 'kham-thien',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('107 Ngõ Văn Hương, Khâm Thiên, Đống Đa, Hà Nội'),
    mapPin: { left: 37, top: 49, width: 26, height: 15 },
    name: 'Khâm Thiên',
    address: '107 Ngõ Văn Hương',
    district: 'Quận Đống Đa',
    image: '/mockup-assets/branch-khamthien-sharp.jpg',
  },
  {
    id: 'thanh-xuan',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('49/40 Phan Đình Giót, Thanh Xuân, Hà Nội'),
    mapPin: { left: 30, top: 75, width: 26, height: 15 },
    name: 'Thanh Xuân',
    address: '49/40 Phan Đình Giót',
    district: 'Quận Thanh Xuân',
    image: '/mockup-assets/branch-thanhxuan-sharp.jpg',
  },
  {
    id: 'phuc-dong',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('20B1 Khu 918 Phúc Đồng, Long Biên, Hà Nội'),
    mapPin: { left: 19, top: 14, width: 25, height: 16 },
    name: 'Phúc Đồng',
    address: '20B1 Khu 918 Phúc Đồng',
    district: 'Quận Long Biên',
    image: '/mockup-assets/branch-phucdong-sharp.jpg',
  },
];

export const eveningBannerData = {
  title: 'Có những buổi tối\nchẳng cần đi đâu cả.',
  bullets: [
    'Một bộ phim.',
    'Một cuộc trò chuyện.',
    'Một căn phòng đủ riêng tư.',
  ],
  scriptWord: 'Stay\na little longer ♡',
  ctaText: 'Đặt phòng ngay',
  bgImage: '/mockup-assets/evening-banner-bg.jpg',
};
