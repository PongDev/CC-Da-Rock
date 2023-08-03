/*
  Warnings:

  - A unique constraint covering the columns `[serialID]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.
  - The required column `serialID` was added to the `Transaction` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "serialID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_serialID_key" ON "Transaction"("serialID");
