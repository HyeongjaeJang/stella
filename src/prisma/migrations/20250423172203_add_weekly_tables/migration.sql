-- AlterTable
ALTER TABLE `users` ADD COLUMN `weekly_peopleId` INTEGER NULL;

-- CreateTable
CREATE TABLE `weekly_work` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `week_start` DATETIME(3) NOT NULL,
    `week_end` DATETIME(3) NOT NULL,
    `total_score` INTEGER NOT NULL,
    `summary` VARCHAR(100) NULL,
    `productivity` INTEGER NOT NULL,
    `creativity` INTEGER NOT NULL,
    `challenge` INTEGER NOT NULL,
    `energy` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `weekly_work_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekly_people` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `week_start` DATETIME(3) NOT NULL,
    `week_end` DATETIME(3) NOT NULL,
    `total_score` INTEGER NOT NULL,
    `summary` VARCHAR(100) NOT NULL,
    `love` INTEGER NOT NULL,
    `friendship` INTEGER NOT NULL,
    `family` INTEGER NOT NULL,
    `work` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `weekly_people_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekly_finance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `week_start` DATETIME(3) NOT NULL,
    `week_end` DATETIME(3) NOT NULL,
    `total_score` INTEGER NOT NULL,
    `summary` VARCHAR(100) NOT NULL,
    `income` INTEGER NOT NULL,
    `expense` INTEGER NOT NULL,
    `invest` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `weekly_finance_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekly_health` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `week_start` DATETIME(3) NOT NULL,
    `week_end` DATETIME(3) NOT NULL,
    `total_score` INTEGER NOT NULL,
    `summary` VARCHAR(100) NOT NULL,
    `state` INTEGER NOT NULL,
    `activity` INTEGER NOT NULL,
    `warning` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `weekly_health_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekly_mood` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `week_start` DATETIME(3) NOT NULL,
    `week_end` DATETIME(3) NOT NULL,
    `total_score` INTEGER NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `mood` INTEGER NOT NULL,
    `energy` INTEGER NOT NULL,
    `stress` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `weekly_mood_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weekly_work` ADD CONSTRAINT `weekly_work_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `weekly_people` ADD CONSTRAINT `weekly_people_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `weekly_finance` ADD CONSTRAINT `weekly_finance_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `weekly_health` ADD CONSTRAINT `weekly_health_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `weekly_mood` ADD CONSTRAINT `weekly_mood_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
