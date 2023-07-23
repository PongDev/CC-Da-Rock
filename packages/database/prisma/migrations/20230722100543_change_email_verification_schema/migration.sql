/*
  Warnings:

  - You are about to drop the column `verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `VerificationEmail` table. All the data in the column will be lost.
  - Added the required column `email` to the `VerificationEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "VerificationEmail" DROP COLUMN "timestamp",
ADD COLUMN     "email" TEXT NOT NULL;
