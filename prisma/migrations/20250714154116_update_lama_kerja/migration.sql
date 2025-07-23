/*
  Warnings:

  - You are about to drop the column `lama_kerja` on the `karyawan` table. All the data in the column will be lost.
  - Added the required column `mulai_kerja` to the `Karyawan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `karyawan` DROP COLUMN `lama_kerja`,
    ADD COLUMN `mulai_kerja` DATETIME(3) NOT NULL;
