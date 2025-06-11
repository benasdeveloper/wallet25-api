# 💸 wallet25-api

An API for managing personal financial records like expenses, income, and categories — built with **Fastify**, **Drizzle ORM**, **Zod**, and **PostgreSQL**.  
It also supports **MCP Server** integration to enable **LLM-based automations** with contextual intelligence.

---

## 🚀 Technologies

- **Fastify** – Lightweight and fast Node.js web framework
- **Drizzle ORM** – Type-safe SQL ORM for PostgreSQL
- **Zod** – Runtime schema validation
- **PostgreSQL** – Relational database
- **TypeScript** – Type-safe codebase
- **dotenv** – Environment variable handling
- **MCP Server (Model Context Protocol)** – For AI agent integration

---

## 📦 Installation

```bash
git clone https://github.com/your-username/wallet25-api.git
cd wallet25-api
npm install
```

---

## 🛠️ Development

```bash
# Start development server
npm run dev
```

Create a `.env` file at the root of the project with your database connection string:

```
DATABASE_URL=postgresql://user:password@localhost:5432/wallet25
```

---

## 🧱 Migrations

This project uses **Drizzle Kit** to manage migrations.

```bash
# Generate migration file from schema
npx drizzle-kit generate

# Run migrations
npx drizzle-kit migrate
```

---

## 📘 Endpoints (examples)

| Method | Route                         | Description                              |
|--------|-------------------------------|------------------------------------------|
| GET    | `/items/month/:year/:month`   | Get items by year and month              |
| GET    | `/items/:id`                  | Get a single item by ID                  |
| GET    | `/items/category/:category`   | Get items by category                    |
| POST   | `/items`                      | Create a new item (Zod-validated)        |
| PATCH  | `/items/:id`                  | Update a specific item (partial update)  |
| DELETE | `/items/:id`                  | Delete an item by ID                     |

---

## 🧠 LLM Integration (optional)

This API can be connected to an **MCP Server (Model Context Protocol)** to empower LLM agents with:

- 🧠 **Contextual understanding** of user data
- 🛠️ **Tool execution** such as querying categories, values, or statistics
- 📝 **Memory & state**, enabling multi-step conversations
- 🌐 **Live data access** via custom tools and backend endpoints

This opens the door to create intelligent chatbots or automations that interact with financial data — for example:  
> “How much did I spend last month on groceries?”  
> “Create a new entry for a $150 deposit.”

---

## 📂 Project Structure

```
src/
├── db/           # Drizzle schema and database config
├── routes/       # Fastify route handlers
├── schemas/      # Zod validation schemas
├── server.ts     # App entrypoint
```

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 👨‍💻 Author

Made with ❤️ by Bene-Hur Pessoa

---