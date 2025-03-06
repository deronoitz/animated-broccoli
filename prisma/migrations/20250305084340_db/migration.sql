/*
  Warnings:

  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "completedAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "Todo";
