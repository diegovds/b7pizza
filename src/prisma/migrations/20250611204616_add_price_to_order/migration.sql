/*
  Warnings:

  - Added the required column `price` to the `orderProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderProducts" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "subtotal" DECIMAL(65,30) NOT NULL;
