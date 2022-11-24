export const ormConfig = {
  type: "postgres" as const,
  url: process.env.DATABASE_URL,
  logging: process.env.NODE_ENV !== "production",
  synchronize: false,
  migrations: ["src/orm/migrations/**/*{.ts,.js}"],
  entities: ["src/orm/entities/**/*{.ts,.js}"],
};