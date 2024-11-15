import sqlite3 from "sqlite3";
let db: sqlite3.Database | null = null;
export const initSqlite = async () => {
  if (db) return db;

  db = new sqlite3.Database("./db.sqlite", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the in-memory SQlite database.");
  });
  return db;
};
