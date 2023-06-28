const db = {
  //디비연결
  database: "weavewego", //
  connectionLimit: 10,
  host: "127.0.0.1",
  user: "white",
  password: "1234",
};
const dbPool = require("mysql").createPool(db);

module.exports = dbPool;
