import bcryptjs from 'bcryptjs';
import { prisma } from '../src/lib/prisma.js';

interface SeedDepartureInput {
  startDate: Date;
  capacity: number;
  priceVnd?: number;
}

interface SeedTourInput {
  title: string;
  slug: string;
  description: string;
  location: string;
  durationDays: number;
  priceVnd: number;
  imageUrl: string;
  departures: SeedDepartureInput[];
}

const sampleTours: SeedTourInput[] = [
  {
    title: 'Hà Nội - Vịnh Hạ Long 3N2Đ',
    slug: 'ha-noi-vinh-ha-long-3n2d',
    description:
      'Khám phá di sản thiên nhiên thế giới Vịnh Hạ Long, du thuyền sang trọng và thưởng thức ẩm thực phố cổ Hà Nội.',
    location: 'Hà Nội - Quảng Ninh',
    durationDays: 3,
    priceVnd: 3500000,
    imageUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592',
    departures: [
      { startDate: new Date('2026-12-01T08:00:00.000Z'), capacity: 20 },
      { startDate: new Date('2026-12-15T08:00:00.000Z'), capacity: 20, priceVnd: 3800000 },
      { startDate: new Date('2026-12-30T08:00:00.000Z'), capacity: 25, priceVnd: 4100000 },
    ],
  },
  {
    title: 'Đà Nẵng - Hội An - Bà Nà Hills 4N3Đ',
    slug: 'da-nang-hoi-an-ba-na-hills-4n3d',
    description:
      'Hành trình khám phá con đường di sản miền Trung: thả đèn hoa đăng phố cổ Hội An, dạo bước trên Cầu Vàng Bà Nà Hills.',
    location: 'Đà Nẵng - Quảng Nam',
    durationDays: 4,
    priceVnd: 4800000,
    imageUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b',
    departures: [
      { startDate: new Date('2026-12-05T07:30:00.000Z'), capacity: 25 },
      { startDate: new Date('2026-12-20T07:30:00.000Z'), capacity: 25, priceVnd: 5100000 },
      { startDate: new Date('2027-01-10T07:30:00.000Z'), capacity: 30 },
    ],
  },
  {
    title: 'Khám phá Đảo Ngọc Phú Quốc 3N2Đ',
    slug: 'kham-pha-dao-ngoc-phu-quoc-3n2d',
    description:
      'Thiên đường nghỉ dưỡng Phú Quốc: lặn ngắm san hô hòn Mây Rút, ngắm hoàng hôn Sunset Sanato và thưởng thức hải sản Hàm Ninh.',
    location: 'Kiên Giang',
    durationDays: 3,
    priceVnd: 4200000,
    imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
    departures: [
      { startDate: new Date('2026-12-10T09:00:00.000Z'), capacity: 18 },
      { startDate: new Date('2026-12-24T09:00:00.000Z'), capacity: 20, priceVnd: 4600000 },
      { startDate: new Date('2027-01-15T09:00:00.000Z'), capacity: 20 },
    ],
  },
  {
    title: 'Sapa - Chinh phục đỉnh Fansipan 3N2Đ',
    slug: 'sapa-chinh-phuc-dinh-fansipan-3n2d',
    description:
      'Chiêm ngưỡng thung lũng Mường Hoa thơ mộng, trải nghiệm cáp treo 3 dây và chạm tay vào cột mốc Fansipan.',
    location: 'Lào Cai',
    durationDays: 3,
    priceVnd: 2900000,
    imageUrl: 'https://images.unsplash.com/photo-1570784332176-fdd73da66f03',
    departures: [
      { startDate: new Date('2026-12-12T06:00:00.000Z'), capacity: 20 },
      { startDate: new Date('2026-12-26T06:00:00.000Z'), capacity: 20, priceVnd: 3200000 },
    ],
  },
  {
    title: 'Ninh Bình - Tràng An - Bái Đính 2N1Đ',
    slug: 'ninh-binh-trang-an-bai-dinh-2n1d',
    description:
      'Xuôi thuyền theo dòng nước biếc Tràng An, ngắm hang động lung linh và chiêm bái tại ngôi chùa Bái Đính linh thiêng.',
    location: 'Ninh Bình',
    durationDays: 2,
    priceVnd: 1850000,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    departures: [
      { startDate: new Date('2026-12-08T08:00:00.000Z'), capacity: 30 },
      { startDate: new Date('2026-12-22T08:00:00.000Z'), capacity: 30, priceVnd: 2000000 },
      { startDate: new Date('2027-01-05T08:00:00.000Z'), capacity: 30 },
    ],
  },
  {
    title: 'Miền Tây Sông Nước: Cần Thơ - Mỹ Tho 2N1Đ',
    slug: 'mien-tay-can-tho-my-tho-2n1d',
    description:
      'Khám phá văn hóa chợ nổi Cái Răng tấp nập lúc rạng đông, thưởng thức đờn ca tài tử và trái cây miệt vườn chín mọng.',
    location: 'Cần Thơ - Tiền Giang',
    durationDays: 2,
    priceVnd: 1950000,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    departures: [
      { startDate: new Date('2026-12-18T07:00:00.000Z'), capacity: 25 },
      { startDate: new Date('2027-01-08T07:00:00.000Z'), capacity: 25 },
    ],
  },
];

export const seed = async (): Promise<void> => {
  console.log('--- Starting database seed ---');

  // 1. Seed Users
  const adminPasswordHash = bcryptjs.hashSync('Admin@123', 10);
  const userPasswordHash = bcryptjs.hashSync('User@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@tourbooking.com' },
    update: {
      name: 'System Admin',
      role: 'ADMIN',
      passwordHash: adminPasswordHash,
    },
    create: {
      email: 'admin@tourbooking.com',
      name: 'System Admin',
      role: 'ADMIN',
      passwordHash: adminPasswordHash,
    },
  });
  console.log(`[Seed] Upserted Admin User: ${admin.email}`);

  const customer = await prisma.user.upsert({
    where: { email: 'user@tourbooking.com' },
    update: {
      name: 'Nguyen Van A',
      role: 'USER',
      passwordHash: userPasswordHash,
    },
    create: {
      email: 'user@tourbooking.com',
      name: 'Nguyen Van A',
      role: 'USER',
      passwordHash: userPasswordHash,
    },
  });
  console.log(`[Seed] Upserted Customer User: ${customer.email}`);

  // 2. Seed Tours & Departures
  for (const tourData of sampleTours) {
    const { departures, ...tourFields } = tourData;

    const tour = await prisma.tour.upsert({
      where: { slug: tourFields.slug },
      update: tourFields,
      create: tourFields,
    });

    console.log(`[Seed] Upserted Tour: "${tour.title}" (${tour.slug})`);

    // Ensure departures for this tour
    // First remove old departures to avoid duplicating on re-seed (if no bookings attached)
    const existingBookings = await prisma.booking.count({
      where: {
        departure: {
          tourId: tour.id,
        },
      },
    });

    if (existingBookings === 0) {
      await prisma.departure.deleteMany({
        where: { tourId: tour.id },
      });

      for (const dep of departures) {
        await prisma.departure.create({
          data: {
            tourId: tour.id,
            startDate: dep.startDate,
            capacity: dep.capacity,
            priceVnd: dep.priceVnd,
          },
        });
      }
      console.log(`  └─ Created ${departures.length} departures for "${tour.title}"`);
    } else {
      console.log(`  └─ Existing bookings found, preserved departures for "${tour.title}"`);
    }
  }

  console.log('--- Database seed completed successfully! ---');
};

seed()
  .catch((error: unknown) => {
    console.error('Error during database seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
