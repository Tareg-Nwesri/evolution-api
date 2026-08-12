-- Restore the composite uniqueness declared by the Prisma schema.
CREATE UNIQUE INDEX `Label_labelId_instanceId_key` ON `Label`(`labelId`, `instanceId`);
