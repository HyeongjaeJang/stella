/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `today` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `todays_finance` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `todays_health` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `todays_mood` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `todays_relationship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `todays_work` will be added. If there are existing duplicate values, this will fail.
  - Made the column `user_id` on table `today` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `todays_finance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `todays_health` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `todays_mood` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `todays_relationship` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_id` on table `todays_work` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `today` DROP FOREIGN KEY `today_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `todays_finance` DROP FOREIGN KEY `todays_finance_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `todays_health` DROP FOREIGN KEY `todays_health_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `todays_mood` DROP FOREIGN KEY `todays_mood_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `todays_relationship` DROP FOREIGN KEY `todays_relationship_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `todays_work` DROP FOREIGN KEY `todays_work_user_id_foreign`;

-- AlterTable
ALTER TABLE `today` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `todays_finance` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `todays_health` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `todays_mood` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `todays_relationship` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `todays_work` MODIFY `user_id` INTEGER UNSIGNED NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `today_user_id_key` ON `today`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `todays_finance_user_id_key` ON `todays_finance`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `todays_health_user_id_key` ON `todays_health`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `todays_mood_user_id_key` ON `todays_mood`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `todays_relationship_user_id_key` ON `todays_relationship`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `todays_work_user_id_key` ON `todays_work`(`user_id`);

-- AddForeignKey
ALTER TABLE `today` ADD CONSTRAINT `today_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `todays_finance` ADD CONSTRAINT `todays_finance_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `todays_health` ADD CONSTRAINT `todays_health_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `todays_mood` ADD CONSTRAINT `todays_mood_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `todays_relationship` ADD CONSTRAINT `todays_relationship_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `todays_work` ADD CONSTRAINT `todays_work_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
