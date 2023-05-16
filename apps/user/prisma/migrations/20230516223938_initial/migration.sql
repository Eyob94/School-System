-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "Qualification" AS ENUM ('Diploma', 'Bachelors', 'Masters', 'PHD');

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "DOB" DATE NOT NULL,
    "School" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "photo" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contact_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "emergency_contact" INTEGER NOT NULL,
    "enrollment_data" DATE NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "DOB" DATE NOT NULL,
    "School" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "photo" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contact_number" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "qualification" "Qualification" NOT NULL,
    "subjects" TEXT[],
    "employment_date" DATE NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guardian" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,

    CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GuardianToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuardianToStudent_AB_unique" ON "_GuardianToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_GuardianToStudent_B_index" ON "_GuardianToStudent"("B");

-- AddForeignKey
ALTER TABLE "_GuardianToStudent" ADD CONSTRAINT "_GuardianToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Guardian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuardianToStudent" ADD CONSTRAINT "_GuardianToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
