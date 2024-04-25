-- CreateTable
CREATE TABLE "dishes_on_bookings" (
    "id" SERIAL NOT NULL,
    "dishId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dishes_on_bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dishes_on_bookings" ADD CONSTRAINT "dishes_on_bookings_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dishes_on_bookings" ADD CONSTRAINT "dishes_on_bookings_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
