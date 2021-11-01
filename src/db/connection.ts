import * as edgedb from 'edgedb';

// TODO: use connection pool
export async function getConnection() {
  // Establish a connection to an existing database
  // instance named "db_edgedb_tutorial".
  const conn = await edgedb.connect('indexer_db', {
    password: 'VmEhOSKLszzqj4H7UhVWkZYd',
    port: 10701,
    user: 'edgedb',
    host: 'localhost',
    database: 'edgedb',
  });
  return conn;
}
