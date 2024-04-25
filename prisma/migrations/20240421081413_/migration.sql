/*
  Warnings:

  - You are about to drop the column `branchId` on the `dishes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_branchId_fkey";

-- AlterTable
ALTER TABLE "dishes" DROP COLUMN "branchId";
