const { Client } = require("pg");

function getJSONfromQuery(query) {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
  });

  const runquery = async () => {
    try {
      await client.connect();
      const { rows } = await client.query(query);
      return rows;
    } catch (err) {
      console.error(err);
    } finally {
      await client.end();
    }
  };
  return runquery();
}

module.exports = getJSONfromQuery;
