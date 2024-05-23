/*
  Warnings:

  - You are about to drop the column `password` on the `Pecas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pecas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Pecas" ("id", "name") SELECT "id", "name" FROM "Pecas";
DROP TABLE "Pecas";
ALTER TABLE "new_Pecas" RENAME TO "Pecas";
PRAGMA foreign_key_check("Pecas");
PRAGMA foreign_keys=ON;
