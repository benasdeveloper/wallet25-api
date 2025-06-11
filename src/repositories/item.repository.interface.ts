import { Item, CreateItemDTO, UpdateItemDTO } from "../types/item";

export interface IItemRepository {
  create(data: CreateItemDTO): Promise<void>;
  update(data: UpdateItemDTO): Promise<void>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Item | undefined>;
  findByCategory(category: number): Promise<Item[]>;
  findByMonth(year: number, month: number): Promise<Item[]>;
} 