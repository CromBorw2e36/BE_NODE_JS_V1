const mysql = require("mysql2");
const config = require("../../config/config");
const STRING_QUERY = require("../enum/queryString");

const pool = mysql.createPool(config.db);

const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results);
    });
  });
};

module.exports = { query };
