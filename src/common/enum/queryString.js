const TABLE_NAME = require("./tableString");

class STRING_QUERY {
  // User API string
  static User_Search = `SELECT * FROM ${TABLE_NAME.USER} `;
  static User_Insert = `INSERT INTO ${TABLE_NAME.USER} `;
  static ExecQuery_Insert = "INSERT INTO ";
  static ExecQuery_Update = " UPDATE ";
  static ExecQuery_Delete = " DELETE FROM ";
  static ExecQuery_Search = " SELECT * FROM ";
  // LOGIN QUERY
  static LoginToPage = `SELECT username, full_name, email, avatar,is_active FROM ${TABLE_NAME.USER} WHERE username = <username> && password = <password> && is_active = 1 && is_deleted != 1`;
  static LoginSearchUserByUsernameAndEmail = `SELECT * FROM ${TABLE_NAME.USER} WHERE username = <username> && email = <email> && is_active = 1 && is_deleted != 1`;
  static LoginSearchUserByUsername = `SELECT * FROM ${TABLE_NAME.USER} WHERE username = <username>`;
  static LoginUpdatePassword = `UPDATE ${TABLE_NAME.USER} SET password = <new_password> WHERE username = <username> && password = <password>`;
}

module.exports = STRING_QUERY;
