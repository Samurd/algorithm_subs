-- CreateEnum
CREATE TYPE "SubscriptionFrequency" AS ENUM ('monthly', 'yearly');

-- CreateEnum
CREATE TYPE "TypeSubcription" AS ENUM ('free', 'Pro');

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subcriptions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "subscriptionPlanId" INTEGER NOT NULL,
    "frequency" "SubscriptionFrequency" NOT NULL DEFAULT 'monthly',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "renewsAt" TIMESTAMP(3),
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subcriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlans" (
    "id" SERIAL NOT NULL,
    "productId" TEXT,
    "variants" TEXT[],
    "typeSubcription" "TypeSubcription" NOT NULL DEFAULT 'free',
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceMonthly" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "priceYearly" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "hrefMonthly" TEXT,
    "hrefYearly" TEXT,
    "features" TEXT[],
    "mostPopular" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subcriptions_userId_key" ON "Subcriptions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlans_typeSubcription_key" ON "SubscriptionPlans"("typeSubcription");

-- AddForeignKey
ALTER TABLE "Subcriptions" ADD CONSTRAINT "Subcriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcriptions" ADD CONSTRAINT "Subcriptions_subscriptionPlanId_fkey" FOREIGN KEY ("subscriptionPlanId") REFERENCES "SubscriptionPlans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
