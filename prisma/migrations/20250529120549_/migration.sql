/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Motoboy` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `motoboy` MODIFY `status` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `Motoboy_cpf_key` ON `Motoboy`(`cpf`);
