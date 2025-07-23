/*
  Warnings:

  - You are about to drop the column `mulai_kerja` on the `karyawan` table. All the data in the column will be lost.
  - Added the required column `lama_kerja` to the `Karyawan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `karyawan` DROP COLUMN `mulai_kerja`,
    ADD COLUMN `lama_kerja` DATETIME(3) NOT NULL;
