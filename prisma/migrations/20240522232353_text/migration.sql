/*
  Warnings:

  - Added the required column `price` to the `Pecas` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pecas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL
);
INSERT INTO "new_Pecas" ("id", "name") SELECT "id", "name" FROM "Pecas";
DROP TABLE "Pecas";
ALTER TABLE "new_Pecas" RENAME TO "Pecas";
PRAGMA foreign_key_check("Pecas");
PRAGMA foreign_keys=ON;
