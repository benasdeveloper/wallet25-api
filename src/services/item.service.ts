import { CreateItemDTO, Item, UpdateItemDTO } from "../types/item";
import { IItemRepository } from "../repositories/item.repository.interface";
import { IItemService } from "./item.service.interface";

export class ItemService implements IItemService {
  constructor(private readonly itemRepository: IItemRepository) {}

  async createItem(data: CreateItemDTO): Promise<void> {
    await this.itemRepository.create(data);
  }

  async updateItem(data: UpdateItemDTO): Promise<void> {
    await this.itemRepository.update(data);
  }

  async deleteItem(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }

  async getItemById(id: number): Promise<Item | undefined> {
    return this.itemRepository.findById(id);
  }

  async getItemsByCategory(category: number): Promise<Item[]> {
    return this.itemRepository.findByCategory(category);
  }

  async getItemsByMonth(year: number, month: number): Promise<Item[]> {
    return this.itemRepository.findByMonth(year, month);
  }
} 