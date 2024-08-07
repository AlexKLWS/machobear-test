import { createPool } from 'mysql2';
import { Kysely, MysqlDialect } from 'kysely';

const dialect = new MysqlDialect({
    pool: createPool({
        database: 'machobear_test',
        host: 'asana-test-db-1.c964qs46yibj.us-west-2.rds.amazonaws.com',
        user: 'admin',
        password: 'U7glNyHsUup5iXR3cT02',
        port: 3306,
        connectionLimit: 10,
    }),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<any>({
    dialect,
});
