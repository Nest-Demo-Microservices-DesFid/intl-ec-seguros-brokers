-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Broker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Broker" ("createdAt", "documentNumber", "id", "name", "updatedAt") SELECT "createdAt", "documentNumber", "id", "name", "updatedAt" FROM "Broker";
DROP TABLE "Broker";
ALTER TABLE "new_Broker" RENAME TO "Broker";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
