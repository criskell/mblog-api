export const ormConfig = {
  type: "postgres" as const,
  url: process.env.DATABASE_URL,
  synchronize: false,
  migrations: ["src/orm/migrations/**/*{.ts,.js}"],
  entities: ["src/orm/entities/**/*{.ts,.js}"],
};
