import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { IItemService } from "../services/item.service.interface";

export class ItemController {
  constructor(private readonly itemService: IItemService) {}

  async createItem(request: FastifyRequest, reply: FastifyReply) {
    const createItemBodySchema = z.object({
      shortDescription: z.string(),
      category: z.number(),
      value: z.number(),
      incoming: z.boolean(),
      dateEvent: z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
          message: "Invalid date format. Expected ISO string.",
        })
        .transform((val) => new Date(val)),
    });

    try {
      const params = createItemBodySchema.parse(request.body);
      await this.itemService.createItem(params);
      return reply.status(201).send();
    } catch (error) {
      console.error("Error in createItem:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async updateItem(
    request: FastifyRequest<{
      Params: { id: string };
      Body: {
        shortDescription?: string;
        category?: number;
        value?: number;
        incoming?: boolean;
        dateEvent?: string;
      };
    }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id, 10);
      if (isNaN(id)) {
        return reply.status(400).send({ error: "Invalid ID format" });
      }

      const updateItemBodySchema = z.object({
        shortDescription: z.string().optional(),
        category: z.number().optional(),
        value: z.number().optional(),
        incoming: z.boolean().optional(),
        dateEvent: z
          .string()
          .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format. Expected ISO string.",
          })
          .transform((val) => new Date(val))
          .optional(),
      });

      const params = updateItemBodySchema.parse(request.body);
      await this.itemService.updateItem({ id, ...params });
      return reply.status(200).send();
    } catch (error) {
      console.error("Error in updateItem:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async deleteItem(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id, 10);
      if (isNaN(id)) {
        return reply.status(400).send({ error: "Invalid ID format" });
      }

      await this.itemService.deleteItem(id);
      return reply.status(204).send();
    } catch (error) {
      console.error("Error in deleteItem:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async getItemById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const id = parseInt(request.params.id, 10);
      if (isNaN(id)) {
        return reply.status(400).send({ error: "Invalid ID format" });
      }

      const item = await this.itemService.getItemById(id);
      if (!item) {
        return reply.status(404).send({ error: "Item not found" });
      }

      return reply.send(item);
    } catch (error) {
      console.error("Error in getItemById:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async getItemsByCategory(
    request: FastifyRequest<{ Params: { category: string } }>,
    reply: FastifyReply
  ) {
    try {
      const category = parseInt(request.params.category, 10);
      if (isNaN(category)) {
        return reply.status(400).send({ error: "Invalid category format" });
      }

      const items = await this.itemService.getItemsByCategory(category);
      return reply.send(items);
    } catch (error) {
      console.error("Error in getItemsByCategory:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }

  async getItemsByMonth(
    request: FastifyRequest<{ Params: { year: string; month: string } }>,
    reply: FastifyReply
  ) {
    try {
      const year = parseInt(request.params.year, 10);
      const month = parseInt(request.params.month, 10);

      if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        return reply.status(400).send({ error: "Invalid year or month format" });
      }

      const items = await this.itemService.getItemsByMonth(year, month);
      return reply.send(items);
    } catch (error) {
      console.error("Error in getItemsByMonth:", error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
} 