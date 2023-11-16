/*
  Warnings:

  - Made the column `slug` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `description` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `description` LONGTEXT NOT NULL AFTER `slug`;
