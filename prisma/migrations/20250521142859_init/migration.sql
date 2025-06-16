-- CreateTable
CREATE TABLE `Motoboy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `seq` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `veiculo` ENUM('MOTO', 'CARRO') NOT NULL,
    `placa` VARCHAR(191) NOT NULL,
    `entregas` INTEGER NOT NULL,
    `previsaoRetorno` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
