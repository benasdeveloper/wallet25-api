import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { itemTable } from "./schema";
import { and, eq, gte, lte } from "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

interface CreateItemType {
  shortDescription: string;
  category: number;
  value: number;
  incoming: boolean;
  dateEvent: Date;
}

interface UpdateItemType extends Partial<CreateItemType> {
  id: number;
}

export async function createItem({
  shortDescription,
  category,
  value,
  incoming,
  dateEvent,
}: CreateItemType) {
  const item: typeof itemTable.$inferInsert = {
    shortDescription,
    category,
    value,
    incoming,
    dateEvent,
  };

  await db.insert(itemTable).values(item);
}

export async function deleteItem(id: number) {
  await db.delete(itemTable).where(eq(itemTable.id, id));
}

export async function updateItem({ id, ...data }: UpdateItemType) {
  await db.update(itemTable).set(data).where(eq(itemTable.id, id));
}

export async function getItemById(id: number) {
  const [item] = await db.select().from(itemTable).where(eq(itemTable.id, id));
  return item;
}

export async function getItemsByMonth(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const items = await db
    .select()
    .from(itemTable)
    .where(
      and(
        gte(itemTable.dateEvent, startDate),
        lte(itemTable.dateEvent, endDate)
      )
    )
    .orderBy(itemTable.dateEvent);

  return items;
}

export async function getItemsByCategory(category: number) {
  const items = await db
    .select()
    .from(itemTable)
    .where(
      eq(itemTable.category, category)
    )
    .orderBy(itemTable.dateEvent);

  return items;
}
