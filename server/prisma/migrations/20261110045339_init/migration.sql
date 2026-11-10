-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "priceVnd" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departures" (
    "id" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "capacity" INTEGER NOT NULL,
    "priceVnd" INTEGER,

    CONSTRAINT "departures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "departureId" TEXT NOT NULL,
    "guests" INTEGER NOT NULL,
    "totalPriceVnd" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");

-- CreateIndex
CREATE INDEX "tours_location_idx" ON "tours"("location");

-- CreateIndex
CREATE INDEX "tours_priceVnd_idx" ON "tours"("priceVnd");

-- CreateIndex
CREATE INDEX "departures_tourId_idx" ON "departures"("tourId");

-- CreateIndex
CREATE INDEX "departures_startDate_idx" ON "departures"("startDate");

-- CreateIndex
CREATE INDEX "bookings_userId_idx" ON "bookings"("userId");

-- CreateIndex
CREATE INDEX "bookings_departureId_idx" ON "bookings"("departureId");

-- CreateIndex
CREATE INDEX "bookings_status_idx" ON "bookings"("status");

-- AddForeignKey
ALTER TABLE "departures" ADD CONSTRAINT "departures_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "departures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
