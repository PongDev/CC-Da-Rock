-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idNumber" TEXT,
ALTER COLUMN "token" DROP NOT NULL;
