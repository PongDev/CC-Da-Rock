-- DropForeignKey
ALTER TABLE "SolarSerial" DROP CONSTRAINT "SolarSerial_ownerId_fkey";

-- AlterTable
ALTER TABLE "SolarSerial" ALTER COLUMN "ownerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SolarSerial" ADD CONSTRAINT "SolarSerial_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
