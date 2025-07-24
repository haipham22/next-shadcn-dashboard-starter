/*
  Warnings:

  - The primary key for the `verification_tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `identifier` on the `verification_tokens` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `token` on the `verification_tokens` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "verification_tokens" DROP CONSTRAINT "verification_tokens_pkey",
ALTER COLUMN "identifier" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "token" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("identifier", "token", "type");
