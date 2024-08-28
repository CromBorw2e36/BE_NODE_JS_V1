const STRING_QUERY = require("../enum/queryString");

class ExecCommonDB {
  // this.tableName, this.typeAction, data, this.conditions

  tableName = undefined;
  typeAction = undefined;
  data = undefined;
  conditions = undefined;
  queryString = undefined; // for select queries

  constructor() {}

  setTableName(tableName) {
    this.tableName = tableName;
    return this;
  }

  setTypeAction(typeAction) {
    this.typeAction = typeAction;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setQueryString(queryString) {
    this.queryString = queryString;
    return this;
  }

  setConditions(conditions) {
    this.conditions = conditions;
    return this;
  }

  formatOutputValue(value) {
    if (value == undefined || value === "") {
      return null;
    } else if (typeof value === "boolean") {
      return value ? 1 : 0;
    } else if (typeof value === "number") {
      return value;
    } else {
      return `'${value}'`;
    }
  }

  GetQuery() {
    let queryString = "";
    let flag_1 = false;
    switch (this.typeAction) {
      case STRING_QUERY.ExecQuery_Insert: {
        let str1 = `${this.typeAction} ${this.tableName} ( `;
        let str2 = " VALUES (";
        for (let [key, value] of Object.entries(this.data)) {
          value = this.formatOutputValue(value);
          str1 += `${flag_1 ? "," : ""} ${key?.toUpperCase()}`;
          str2 += `${flag_1 ? "," : ""} ${value}`;
          flag_1 = true;
        }
        queryString = str1 + ") " + str2 + ")";
        break;
      }
      case STRING_QUERY.ExecQuery_Update: {
        let str1 = `${this.typeAction} ${this.tableName} set `;
        for (let [key, value] of Object.entries(this.data)) {
          value = this.formatOutputValue(value);
          str1 += `${flag_1 ? "," : ""}${key.toUpperCase()} = ${value}`;
          flag_1 = true;
        }

        if (this.conditions) {
          str1 += " WHERE id = id";
          for (let [key, value] of Object.entries(this.conditions)) {
            value = this.formatOutputValue(value);
            str1 += `${key.toUpperCase()} = ${value}`;
          }
        }
        queryString = str1;
        break;
      }
      case STRING_QUERY.ExecQuery_Delete: {
        let str1 = `${this.typeAction} ${this.tableName} WHERE `;
        for (let [key, value] of Object.entries(this.conditions)) {
          value = this.formatOutputValue(value);
          str1 += ` ${flag_1 ? "&&" : ""} ${key.toUpperCase()} = ${value}`;
          flag_1 = true;
        }
        queryString = str1;
        break;
      }
      case STRING_QUERY.ExecQuery_Search: {
        let str1 = `${this.typeAction} ${this.tableName} WHERE `;
        for (let [key, value] of Object.entries(this.conditions)) {
          value = this.formatOutputValue(value);
          str1 += ` ${flag_1 ? "&&" : ""} ${key.toUpperCase()} = ${value}`;
          flag_1 = true;
        }
        queryString = str1;
        break;
      }
      default:
        queryString = "";
    }
    return queryString;
  }

  GetQuerySelect() {
    if (this.conditions) {
      return this.GetQuerySelectWithConditions(this.queryString, this.conditions);
    } else {
      return "";
    }
  }

  GetQuerySelectWithConditions(stringQuery, conditionsModel) {
    for (const [key, value] of Object.entries(conditionsModel)) {
      switch (typeof value) {
        case "string": {
          stringQuery = stringQuery.replaceAll(`<${key}>`, `'${value}'`);
          break;
        }
        case "boolean": {
          stringQuery = stringQuery.replaceAll(`<${key}>`, value ? 1 : 0);
          break;
        }
        case "number": {
          stringQuery = stringQuery.replaceAll(`<${key}>`, value);
          break;
        }
      }
    }
    return stringQuery;
  }
}

module.exports = new ExecCommonDB();
