import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool({
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
});

export default pool;