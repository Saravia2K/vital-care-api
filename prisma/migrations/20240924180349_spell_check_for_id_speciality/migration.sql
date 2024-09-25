/*
  Warnings:

  - You are about to drop the column `id_specialty` on the `Doctor` table. All the data in the column will be lost.
  - The primary key for the `Specialty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_specialty` on the `Specialty` table. All the data in the column will be lost.
  - Added the required column `id_speciality` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_id_specialty_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "id_specialty",
ADD COLUMN     "id_speciality" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Specialty" DROP CONSTRAINT "Specialty_pkey",
DROP COLUMN "id_specialty",
ADD COLUMN     "id_speciality" SERIAL NOT NULL,
ADD CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id_speciality");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_id_speciality_fkey" FOREIGN KEY ("id_speciality") REFERENCES "Specialty"("id_speciality") ON DELETE RESTRICT ON UPDATE CASCADE;
