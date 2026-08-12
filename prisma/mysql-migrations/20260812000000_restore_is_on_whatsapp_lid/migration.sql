-- Restore nullable column removed by the Kafka migration.
ALTER TABLE `IsOnWhatsapp` ADD COLUMN `lid` VARCHAR(100) NULL;
