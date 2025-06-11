export interface Item {
  id: number;
  shortDescription: string;
  category: number;
  value: number;
  incoming: boolean | null;
  dateEvent: Date;
}

export interface CreateItemDTO {
  shortDescription: string;
  category: number;
  value: number;
  incoming: boolean;
  dateEvent: Date;
}

export interface UpdateItemDTO extends Partial<CreateItemDTO> {
  id: number;
} 