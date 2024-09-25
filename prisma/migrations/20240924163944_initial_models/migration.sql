-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('F', 'M');

-- CreateTable
CREATE TABLE "Patient" (
    "id_patient" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "first_last_name" TEXT NOT NULL,
    "second_last_name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cellphone" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id_patient")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id_doctor" SERIAL NOT NULL,
    "names" TEXT NOT NULL,
    "last_names" TEXT NOT NULL,
    "office" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_specialty" INTEGER NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id_doctor")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id_specialty" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id_specialty")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id_appointment" SERIAL NOT NULL,
    "id_patient" INTEGER NOT NULL,
    "id_doctor" INTEGER NOT NULL,
    "id_reference" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT,
    "treatment" TEXT,
    "observations" TEXT,
    "finished" BOOLEAN NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id_appointment")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id_reference" SERIAL NOT NULL,
    "id_from_doctor" INTEGER NOT NULL,
    "id_to_doctor" INTEGER NOT NULL,
    "comments" TEXT,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id_reference")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_id_specialty_fkey" FOREIGN KEY ("id_specialty") REFERENCES "Specialty"("id_specialty") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_id_patient_fkey" FOREIGN KEY ("id_patient") REFERENCES "Patient"("id_patient") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_id_doctor_fkey" FOREIGN KEY ("id_doctor") REFERENCES "Doctor"("id_doctor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_id_reference_fkey" FOREIGN KEY ("id_reference") REFERENCES "Reference"("id_reference") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_id_from_doctor_fkey" FOREIGN KEY ("id_from_doctor") REFERENCES "Doctor"("id_doctor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_id_to_doctor_fkey" FOREIGN KEY ("id_to_doctor") REFERENCES "Doctor"("id_doctor") ON DELETE CASCADE ON UPDATE CASCADE;
