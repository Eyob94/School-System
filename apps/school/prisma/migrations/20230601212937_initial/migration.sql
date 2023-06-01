-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('Private', 'Public', 'BoardingPrivate', 'BoardingPublic', 'International');

-- CreateEnum
CREATE TYPE "GradingSystem" AS ENUM ('Letter', 'Percentage');

-- CreateEnum
CREATE TYPE "AdmissionPolicy" AS ENUM ('Interview', 'Exam', 'Previous');

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "principal_name" TEXT NOT NULL,
    "accreditation_status" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "founding_date" TIMESTAMP(3) NOT NULL,
    "logo" TEXT NOT NULL,
    "school_type" "SchoolType" NOT NULL,
    "grading_system" "GradingSystem" NOT NULL,
    "admissionPolicy" "AdmissionPolicy"[],
    "tuition" JSONB[],
    "Teachers" TEXT[],
    "Students" TEXT[],
    "Courses" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);
