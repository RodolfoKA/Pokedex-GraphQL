/*
  Warnings:

  - You are about to drop the column `type` on the `pokemons` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `pokemons` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pokemons" (
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "secondaryTypeId" INTEGER,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pokemons_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "pokemons_secondaryTypeId_fkey" FOREIGN KEY ("secondaryTypeId") REFERENCES "types" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_pokemons" ("created_at", "id", "name") SELECT "created_at", "id", "name" FROM "pokemons";
DROP TABLE "pokemons";
ALTER TABLE "new_pokemons" RENAME TO "pokemons";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");
