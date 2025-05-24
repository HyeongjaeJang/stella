-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birth_date` DATE NULL,
    `birth_time` TIME(0) NULL,
    `gender` VARCHAR(50) NULL,
    `city_country` VARCHAR(255) NULL,
    `z_sign` VARCHAR(50) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `users_email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `today` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `number` INTEGER NULL,
    `color` VARCHAR(50) NULL,
    `item` VARCHAR(255) NULL,
    `total_score` INTEGER NULL,
    `text` TEXT NULL,

    UNIQUE INDEX `today_user_id_key`(`user_id`),
    INDEX `today_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todays_finance` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `income` INTEGER NULL,
    `expense` INTEGER NULL,
    `invest` INTEGER NULL,
    `text` TEXT NULL,

    UNIQUE INDEX `todays_finance_user_id_key`(`user_id`),
    INDEX `todays_finance_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todays_health` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `state` VARCHAR(100) NULL,
    `activity` VARCHAR(100) NULL,
    `warning` VARCHAR(100) NULL,
    `text` TEXT NULL,

    UNIQUE INDEX `todays_health_user_id_key`(`user_id`),
    INDEX `todays_health_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todays_mood` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `mood` VARCHAR(100) NULL,
    `energy` VARCHAR(100) NULL,
    `stress` VARCHAR(100) NULL,
    `text` TEXT NULL,

    UNIQUE INDEX `todays_mood_user_id_key`(`user_id`),
    INDEX `todays_mood_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todays_relationship` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `love` VARCHAR(100) NULL,
    `work` VARCHAR(100) NULL,
    `friend` VARCHAR(100) NULL,
    `family` VARCHAR(100) NULL,
    `text` TEXT NULL,

    UNIQUE INDEX `todays_relationship_user_id_key`(`user_id`),
    INDEX `todays_relationship_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `todays_work` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `productivity` VARCHAR(100) NULL,
    `creativity` VARCHAR(100) NULL,
    `challenge` VARCHAR(100) NULL,
    `text` TEXT NULL,

    UNIQUE INDEX `todays_work_user_id_key`(`user_id`),
    INDEX `todays_work_user_id_foreign`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekly_work` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `week_start` DATETIME(3) NOT NULL,
    `week_end` DATETIME(3) NOT NULL,
    `total_score` INTEGER NOT NULL,
    `summary` VARCHAR(999) NULL,
    `productivity` INTEGER NOT NULL,
    `creativity` INTEGER NOT NULL,
    `challenge` INTEGER NOT NULL,
    `energy` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(999) NOT NULL,

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
    `summary` VARCHAR(999) NULL,
    `love` INTEGER NOT NULL,
    `friendship` INTEGER NOT NULL,
    `family` INTEGER NOT NULL,
    `work` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(999) NOT NULL,

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
    `summary` VARCHAR(999) NULL,
    `income` INTEGER NOT NULL,
    `expense` INTEGER NOT NULL,
    `invest` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(999) NOT NULL,

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
    `summary` VARCHAR(999) NULL,
    `state` INTEGER NOT NULL,
    `activity` INTEGER NOT NULL,
    `warning` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(999) NOT NULL,

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
    `summary` VARCHAR(999) NULL,
    `mood` INTEGER NOT NULL,
    `energy` INTEGER NOT NULL,
    `stress` INTEGER NOT NULL,
    `days_analysis` JSON NOT NULL,
    `advice` VARCHAR(999) NOT NULL,

    UNIQUE INDEX `weekly_mood_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `compatibility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `partner_name` VARCHAR(100) NOT NULL,
    `overall_score` INTEGER NOT NULL,
    `overall_details` TEXT NOT NULL,
    `user_zodiac` JSON NOT NULL,
    `partner_zodiac` JSON NOT NULL,
    `compatibility_data` JSON NOT NULL,

    UNIQUE INDEX `compatibility_user_id_key`(`user_id`),
    INDEX `compatibility_user_id_foreign_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- AddForeignKey
ALTER TABLE `compatibility` ADD CONSTRAINT `compatibility_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
