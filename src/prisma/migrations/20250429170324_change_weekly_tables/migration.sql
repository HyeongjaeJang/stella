-- AlterTable
ALTER TABLE `weekly_finance` MODIFY `summary` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `weekly_health` MODIFY `summary` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `weekly_people` MODIFY `summary` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `weekly_work` MODIFY `summary` VARCHAR(191) NULL;
