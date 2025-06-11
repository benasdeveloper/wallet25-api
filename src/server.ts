import "dotenv/config";
import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { ItemController } from "./controllers/item.controller";
import { DrizzleItemRepository } from "./repositories/drizzle-item.repository";
import { ItemService } from "./services/item.service";

const app = fastify({
  logger: false,
});

// Dependency injection
const itemRepository = new DrizzleItemRepository(process.env.DATABASE_URL!);
const itemService = new ItemService(itemRepository);
const itemController = new ItemController(itemService);

// Routes
app.post("/items", async (request, reply) => itemController.createItem(request, reply));

app.patch<{
  Params: { id: string };
  Body: {
    shortDescription?: string;
    category?: number;
    value?: number;
    incoming?: boolean;
    dateEvent?: string;
  };
}>("/items/:id", async (request, reply) => itemController.updateItem(request, reply));

app.delete<{ Params: { id: string } }>(
  "/items/:id",
  async (request, reply) => itemController.deleteItem(request, reply)
);

app.get<{ Params: { id: string } }>(
  "/items/:id",
  async (request, reply) => itemController.getItemById(request, reply)
);

app.get<{ Params: { category: string } }>(
  "/items/category/:category",
  async (request, reply) => itemController.getItemsByCategory(request, reply)
);

app.get<{ Params: { year: string; month: string } }>(
  "/items/month/:year/:month",
  async (request, reply) => itemController.getItemsByMonth(request, reply)
);

const start = async () => {
  try {
    await app.listen({
      port: 3333,
      host: "0.0.0.0",
    });
    console.log("Server is running on http://localhost:3333");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
