/*
  Warnings:

  - You are about to drop the column `id_from_doctor` on the `Reference` table. All the data in the column will be lost.
  - You are about to drop the column `id_to_doctor` on the `Reference` table. All the data in the column will be lost.
  - Added the required column `id_doctor` to the `Reference` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reference" DROP CONSTRAINT "Reference_id_from_doctor_fkey";

-- DropForeignKey
ALTER TABLE "Reference" DROP CONSTRAINT "Reference_id_to_doctor_fkey";

-- AlterTable
ALTER TABLE "Reference" DROP COLUMN "id_from_doctor",
DROP COLUMN "id_to_doctor",
ADD COLUMN     "id_doctor" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reference" ADD CONSTRAINT "Reference_id_doctor_fkey" FOREIGN KEY ("id_doctor") REFERENCES "Doctor"("id_doctor") ON DELETE CASCADE ON UPDATE CASCADE;
