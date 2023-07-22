-- CreateTable
CREATE TABLE "CarbonCreditSerial" (
    "serialID" TEXT NOT NULL,
    "isBurned" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarbonCreditSerial_pkey" PRIMARY KEY ("serialID")
);

-- CreateTable
CREATE TABLE "SolarSerial" (
    "serialID" TEXT NOT NULL,
    "isBurned" BOOLEAN NOT NULL DEFAULT false,
    "burnedCarbonCreditSerialID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "SolarSerial_pkey" PRIMARY KEY ("serialID")
);

-- AddForeignKey
ALTER TABLE "SolarSerial" ADD CONSTRAINT "SolarSerial_burnedCarbonCreditSerialID_fkey" FOREIGN KEY ("burnedCarbonCreditSerialID") REFERENCES "CarbonCreditSerial"("serialID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarSerial" ADD CONSTRAINT "SolarSerial_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
