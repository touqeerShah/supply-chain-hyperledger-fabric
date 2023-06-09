const { Pool } = require("pg");
var { configObj } = require("../config.js");
/**
 * it will run before every thing and it should be connected
 * @param {*} url mongoDB url
 * @returns
 */
try {
  const pool = new Pool({
    user: configObj.PG_USER,
    database: configObj.PG_DB,
    password: configObj.PG_PASS,
    port: configObj.PG_PORT,
    host: configObj.PG_ADDRESS,
  });
  module.exports = { pool };
} catch (error) {
  console.log("Error To connect PG try again after 5 second");
}
