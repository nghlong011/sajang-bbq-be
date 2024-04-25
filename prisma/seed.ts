import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.schedule.createMany({
    data: [
      { time: '10:00' },
      { time: '11:00' },
      { time: '12:00' },
      { time: '13:00' },
      { time: '14:00' },
      { time: '15:00' },
      { time: '16:00' },
      { time: '17:00' },
      { time: '18:00' },
      { time: '19:00' },
      { time: '20:00' },
      { time: '21:00' },
    ],
    skipDuplicates: true,
  });
  await prisma.utility.createMany({
    data: [
      { name: 'Chỗ để ô tô' },
      { name: 'Phòng hút thuốc' },
      { name: 'Phòng chơi trẻ em' },
      { name: 'Khu trong nhà' },
      { name: 'Khu ngoài trời' },
      { name: 'Phòng riêng' },
    ],
    skipDuplicates: true,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
