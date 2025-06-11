import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const itemTable = pgTable("item", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  shortDescription: varchar({ length: 128 }).notNull(),
  category: integer().notNull(),
  value: integer().notNull(),
  incoming: boolean().default(false),
  dateEvent: timestamp().notNull(),
});
