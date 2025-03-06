This project is a GraphQL API server built with Apollo Server, Prisma, and Node.js. It includes a cron job for updating ticket urgency and subscriptions for real-time updates.

### Project Struture
```
├── .env
├── package.json
├── prisma/
│   ├── migrations/
│   └── schema/
│       ├── schema.prisma
│       └── ticket.prisma
├── src/
│   ├── app.ts
│   ├── config/
│   │   └── prisma.ts
│   ├── cron/
│   │   └── update-ticket-urgency.ts
│   ├── data/
│   │   └── repositories/
│   ├── graphql/
│   │   ├── dashboard/
│   │   ├── pubsub.ts
│   │   ├── resolvers.ts
│   │   ├── schemas.ts
│   │   └── ticket/
│   └── services/
│       ├── dashboard.service.ts
│       └── ...
└── tsconfig.json
```
#### Folder Descriptions
- prisma/: Contains Prisma schema and migration files.
  - migrations/: Contains migration files for database schema changes.
  - schema/: Contains Prisma schema files.
- src/: Contains the source code for the application.
  - config/: Configuration files.
    - prisma.ts: Prisma client configuration.
  - cron/: Contains cron job scripts.
    - update-ticket-urgency.ts: Cron job for updating ticket urgency.
  - data/: Contains data access layer.
  - repositories/: Contains repository classes for data access.
  - graphql/: Contains GraphQL related files.
    - dashboard/: Contains dashboard related GraphQL files.
    - pubsub.ts: PubSub instance for GraphQL subscriptions.
    - resolvers.ts: Combines all GraphQL resolvers.
    - schemas.ts: Combines all GraphQL schemas.
    - ticket/: Contains ticket related GraphQL files.
  - services/: Contains service classes for business logic.
    - dashboard.service.ts: Service for dashboard related operations.
    - ticket.service.ts: Service for ticket related operations.
- app.ts: Main application entry point.

### Libraries Used
- @graphql-tools/schema: For creating executable GraphQL schemas.
- @prisma/client: Prisma client for database access.
- apollo-server: Apollo Server for GraphQL API.
- cors: Middleware for enabling CORS.
- graphql: GraphQL core library.
- graphql-ws: WebSocket server for GraphQL subscriptions.
- node-cron: For scheduling cron jobs.
- prisma: Prisma ORM.
- ws: WebSocket library.

### Development Dependencies
- @types/node-cron: Type definitions for node-cron.
- @types/ws: Type definitions for ws.
- nodemon: For automatically restarting the server during development.
- ts-node: TypeScript execution environment for Node.js.
- typescript: TypeScript language.

## Getting Started
1. Install Dependencies
   ```
   npm install
   ```
2. Run the Postgres DB server, and adjust the `.env` file.
3. Setup DB
   ```
   npm run db:migrate
   npm run db:generate
   ```
4. Start server
   ```
   npm start
   ```
