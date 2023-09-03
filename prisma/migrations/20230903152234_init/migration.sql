/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fullName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `fullName` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email";
ALTER TABLE "User" DROP COLUMN "email_verified";
ALTER TABLE "User" ALTER COLUMN "fullName" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_fullName_key" ON "User"("fullName");
