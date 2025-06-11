import { and, eq, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { itemTable } from "../db/schema";
import { CreateItemDTO, Item, UpdateItemDTO } from "../types/item";
import { IItemRepository } from "./item.repository.interface";

export class DrizzleItemRepository implements IItemRepository {
  private db: ReturnType<typeof drizzle>;

  constructor(databaseUrl: string) {
    this.db = drizzle(databaseUrl);
  }

  async create(data: CreateItemDTO): Promise<void> {
    const item: typeof itemTable.$inferInsert = {
      shortDescription: data.shortDescription,
      category: data.category,
      value: data.value,
      incoming: data.incoming,
      dateEvent: data.dateEvent,
    };

    await this.db.insert(itemTable).values(item);
  }

  async update({ id, ...data }: UpdateItemDTO): Promise<void> {
    await this.db.update(itemTable).set(data).where(eq(itemTable.id, id));
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(itemTable).where(eq(itemTable.id, id));
  }

  async findById(id: number): Promise<Item | undefined> {
    const [item] = await this.db.select().from(itemTable).where(eq(itemTable.id, id));
    return item;
  }

  async findByCategory(category: number): Promise<Item[]> {
    const items = await this.db
      .select()
      .from(itemTable)
      .where(eq(itemTable.category, category))
      .orderBy(itemTable.dateEvent);

    return items;
  }

  async findByMonth(year: number, month: number): Promise<Item[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999);

    const items = await this.db
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
} 