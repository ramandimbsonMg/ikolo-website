-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropIndex
DROP INDEX `OrderItem_productId_fkey` ON `OrderItem`;

-- AlterTable
ALTER TABLE `OrderItem` MODIFY `productId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
