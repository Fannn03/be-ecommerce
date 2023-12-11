/*
  Warnings:

  - You are about to drop the column `state` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `district` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regency` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `state`,
    ADD COLUMN `village` VARCHAR(191) NOT NULL AFTER `zip_code`,
    ADD COLUMN `district` VARCHAR(191) NOT NULL AFTER `village`,
    ADD COLUMN `regency` VARCHAR(191) NOT NULL AFTER `district`;