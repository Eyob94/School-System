-- CreateEnum
CREATE TYPE "SchoolType" AS ENUM ('Private', 'Public', 'BoardingPrivate', 'BoardingPublic', 'International');

-- CreateEnum
CREATE TYPE "GradingSystem" AS ENUM ('Letter', 'Percentage');

-- CreateEnum
CREATE TYPE "AdmissionPolicy" AS ENUM ('Interview', 'Exam', 'Previous');

-- CreateEnum
CREATE TYPE "CourseReference" AS ENUM ('Government', 'Private');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Natural', 'Social');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "GuardianRelation" AS ENUM ('Father', 'Mother', 'Sibling', 'Uncle', 'Aunt', 'GrandParent', 'Relative');

-- CreateTable
CREATE TABLE "School" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "governer" TEXT NOT NULL,
    "accreditationStatus" BOOLEAN NOT NULL,
    "email" TEXT NOT NULL,
    "founding_date" TIMESTAMP(3) NOT NULL,
    "logo" TEXT NOT NULL,
    "schoolType" "SchoolType" NOT NULL,
    "gradingSystem" "GradingSystem"[],
    "admissionPolicy" "AdmissionPolicy"[],
    "famousFor" TEXT[],
    "tuition" JSONB[],
    "maxGradeLevel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL DEFAULT 1.0,
    "gradingSystem" "GradingSystem" NOT NULL,
    "reference" "CourseReference"[],
    "passMark" TEXT NOT NULL,
    "department" "Department",

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "grandfatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "email" TEXT NOT NULL,
    "medicalInformation" TEXT,
    "languagePreferences" TEXT[],
    "nationality" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "countryCode" INTEGER NOT NULL,
    "Gender" "Gender" NOT NULL,
    "guardianId" TEXT NOT NULL,
    "guardianRelation" "GuardianRelation" NOT NULL,
    "Address" JSONB NOT NULL,
    "currentSchoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "classId" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gradeLevel" INTEGER NOT NULL,
    "Section" CHAR NOT NULL,
    "assignedTeacherId" TEXT NOT NULL,
    "maxSize" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guardian" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" INTEGER NOT NULL,
    "countryCode" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "Address" JSONB NOT NULL,

    CONSTRAINT "Guardian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grades" (
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "grade" TEXT,
    "assessment" JSONB[],
    "registration" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passed" BOOLEAN
);

-- CreateTable
CREATE TABLE "Employment" (
    "id" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "schoolId" TEXT NOT NULL,
    "terminationDate" DATE NOT NULL,
    "hireDate" DATE NOT NULL,

    CONSTRAINT "Employment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "grandfatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "email" TEXT NOT NULL,
    "medicalInformation" TEXT,
    "languagePreferences" TEXT[],
    "nationality" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "countryCode" INTEGER NOT NULL,
    "Gender" "Gender" NOT NULL,
    "Address" JSONB NOT NULL,
    "currentSchoolId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "staffId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Salary" (
    "amount" DOUBLE PRECISION NOT NULL,
    "employeeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL
);

-- CreateTable
CREATE TABLE "_CourseToSchool" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_assignedTeacherId_key" ON "Class"("assignedTeacherId");

-- CreateIndex
CREATE UNIQUE INDEX "Grades_courseId_studentId_registration_key" ON "Grades"("courseId", "studentId", "registration");

-- CreateIndex
CREATE UNIQUE INDEX "Employment_staffId_schoolId_key" ON "Employment"("staffId", "schoolId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_staffId_key" ON "Teacher"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "Salary_employeeId_key" ON "Salary"("employeeId");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToSchool_AB_unique" ON "_CourseToSchool"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToSchool_B_index" ON "_CourseToSchool"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "Guardian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_currentSchoolId_fkey" FOREIGN KEY ("currentSchoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_assignedTeacherId_fkey" FOREIGN KEY ("assignedTeacherId") REFERENCES "Teacher"("staffId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employment" ADD CONSTRAINT "Employment_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_currentSchoolId_fkey" FOREIGN KEY ("currentSchoolId") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Salary" ADD CONSTRAINT "Salary_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToSchool" ADD CONSTRAINT "_CourseToSchool_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToSchool" ADD CONSTRAINT "_CourseToSchool_B_fkey" FOREIGN KEY ("B") REFERENCES "School"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateFunctionToCheckAddressValidity
CREATE OR REPLACE FUNCTION validate_address(jsonb)
RETURNS BOOLEAN AS
$$
BEGIN
    RETURN jsonb_exists_all($1, ARRAY['city', 'woreda']);
END;
$$
LANGUAGE plpgsql;

-- CheckAddressValidity
ALTER TABLE "Student" ADD CONSTRAINT "Student_Address_check" CHECK (validate_address("Address"));

-- CheckAddressValidity
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_Address_check" CHECK (validate_address("Address"));

-- CheckAddressValidity
ALTER TABLE "Guardian" ADD CONSTRAINT "Guardian_Address_check" CHECK (validate_address("Address"));