/*
  Warnings:

  - You are about to drop the column `office` on the `Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_id_specialty_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "office",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_id_specialty_fkey" FOREIGN KEY ("id_specialty") REFERENCES "Specialty"("id_specialty") ON DELETE RESTRICT ON UPDATE CASCADE;
