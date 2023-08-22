/*
  Warnings:

  - A unique constraint covering the columns `[userId,token]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_token_key" ON "refresh_token"("userId", "token");
