'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TheMoment from '@/components/sections/TheMoment';
import Rooms from '@/components/sections/Rooms';
import Pricing from '@/components/sections/Pricing';
import Experience from '@/components/sections/Experience';
import Mood from '@/components/sections/Mood';
import Locations from '@/components/sections/Locations';
import EveningBanner from '@/components/sections/EveningBanner';
import BookingModal from '@/components/ui/BookingModal';

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [targetRoom, setTargetRoom] = useState('501');

  const handleOpenBooking = (roomId = '501') => {
    setTargetRoom(roomId);
    setBookingOpen(true);
  };

  return (
    <>
      <Navbar onOpenBooking={() => handleOpenBooking()} />
      <main className="w-full overflow-hidden">
        {/* Section 1: Hero Section (Fits 1 screen on load) */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Section 2: The 4Chan Moment */}
        <TheMoment />

        {/* Section 3: Khám phá các phòng (201..702) */}
        <Rooms onOpenBooking={handleOpenBooking} />

        {/* Section 4: Chọn thời gian nghỉ ngơi của bạn (Pricing packages) */}
        <Pricing onOpenBooking={() => handleOpenBooking()} />

        {/* Section 5: Trải nghiệm 4Chan khác biệt */}
        <Experience />

        {/* Section 6: Chọn mood của bạn */}
        <Mood onOpenBooking={() => handleOpenBooking()} />

        {/* Section 7: 3 cơ sở tại Hà Nội + Bản đồ */}
        <Locations />

        {/* Section 8: Có những buổi tối chẳng cần đi đâu cả (Full-bleed 100% width banner) */}
        <EveningBanner onOpenBooking={() => handleOpenBooking()} />
      </main>
      <Footer />

      {/* Interactive Booking Modal */}
      <BookingModal
        key={targetRoom}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultRoomId={targetRoom}
      />
    </>
  );
}
