/*
  Warnings:

  - A unique constraint covering the columns `[cnh]` on the table `Motoboy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Motoboy_cnh_key` ON `Motoboy`(`cnh`);
