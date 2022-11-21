export default async () => {
  knex.raw(`DROP DATABASE IF EXISTS ${database}`);
};
