/*
  Warnings:

  - Added the required column `price` to the `dishes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `dishes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dishes" ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "revenues" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "revenue" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);
