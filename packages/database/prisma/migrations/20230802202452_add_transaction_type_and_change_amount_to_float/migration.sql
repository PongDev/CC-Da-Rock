/*
  Warnings:

  - Added the required column `transactionType` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('CHARGE', 'REFUND');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "transactionType" "TransactionType" NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
