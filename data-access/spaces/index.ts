import { Client } from 'pg';

// Example of raw sql. Note how to do parameterized queries
// Honestly wouldn't mess with this unless performance is an issue
// Or if you just like sql
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export async function getSpaces() {
    await client.connect();
    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    const res = await client.query('SELECT * from spaces');
    console.log(res.rows); // Hello world!
    await client.end();
    return res.rows;
}
