export const ormConfig = {
  type: "postgres" as const,
  url: process.env.DATABASE_URL,
  logging: process.env.DATABASE_LOGGING || !["production", "test"].includes(process.env.NODE_ENV),
  synchronize: false,
  migrations: ["src/orm/migrations/**/*{.ts,.js}"],
  entities: ["src/orm/entities/**/*{.ts,.js}"],
};
