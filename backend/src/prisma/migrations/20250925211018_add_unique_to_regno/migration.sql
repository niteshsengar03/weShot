/*
  Warnings:

  - A unique constraint covering the columns `[regNo]` on the table `students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `students_regNo_key` ON `students`(`regNo`);
