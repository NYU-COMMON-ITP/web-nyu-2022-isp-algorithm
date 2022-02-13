import { Client } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("Need to specify a DATABASE_URL in your .env file");
}

// Example of raw sql. Note how to do parameterized queries
// Honestly wouldn't mess with this unless performance is an issue
// Or if you just like sql
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export async function getSpaces() {
  await client.connect();
  // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
  const res = await client.query("SELECT * from spaces");
  await client.end();
  return res.rows;
}
