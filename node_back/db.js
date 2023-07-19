const db = {
  //디비연결
  database: "weavewego", //
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "root",
  password: "12345678",
  timezone: "GMT",
  charset: 'utf8mb4'
};
const dbPool = require("mysql").createPool(db);

module.exports = dbPool;
