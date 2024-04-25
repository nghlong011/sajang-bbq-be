/*
  Warnings:

  - The primary key for the `dishes_on_bookings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `dishes_on_bookings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "dishes_on_bookings" DROP CONSTRAINT "dishes_on_bookings_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "dishes_on_bookings_pkey" PRIMARY KEY ("dishId", "bookingId");
