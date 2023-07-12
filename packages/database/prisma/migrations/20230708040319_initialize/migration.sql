-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SMEsType" AS ENUM ('MANUFACTURE', 'TRADE', 'SERVICE');

-- CreateEnum
CREATE TYPE "SMEsSize" AS ENUM ('SMALL', 'MEDIUM');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "RoleType" NOT NULL DEFAULT 'USER',
    "token" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SMEs" (
    "id" SERIAL NOT NULL,
    "industry" "SMEsType" NOT NULL,
    "size" "SMEsSize" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "SMEs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "cf" INTEGER NOT NULL,
    "scc" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "SMEs_userId_key" ON "SMEs"("userId");

-- AddForeignKey
ALTER TABLE "SMEs" ADD CONSTRAINT "SMEs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
