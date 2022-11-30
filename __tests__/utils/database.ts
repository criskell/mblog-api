import datasource, { clear } from "../../src/orm/datasource";

export const setupTestDatabase = () => {
  beforeAll(async () => {
    await datasource.initialize();
    await datasource.runMigrations();
    await clear();
  });

  afterEach(async () => {
    await clear();
  });

  afterAll(async () => {
    await datasource.destroy();
  });
};