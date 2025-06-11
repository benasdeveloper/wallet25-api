import { CreateItemDTO, Item, UpdateItemDTO } from "../types/item";

export interface IItemService {
  createItem(data: CreateItemDTO): Promise<void>;
  updateItem(data: UpdateItemDTO): Promise<void>;
  deleteItem(id: number): Promise<void>;
  getItemById(id: number): Promise<Item | undefined>;
  getItemsByCategory(category: number): Promise<Item[]>;
  getItemsByMonth(year: number, month: number): Promise<Item[]>;
} 