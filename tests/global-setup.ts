import Knex from "knex";

const database = "test_book_database";

async function createTestDatabase() {
  const knex = Knex({
    client: "pg",
    connection: {},
  });

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${database}`);
    await knex.raw(`CREATE DATABASE ${database}`);
  } finally {
    await knex.destroy();
  }
}

export default async () => {
  await createTestDatabase();
};
