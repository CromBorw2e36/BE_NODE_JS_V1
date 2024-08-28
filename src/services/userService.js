const commonBase = require("../common/commonBase");
const { query, ExecQuery } = require("../common/db/dbConnection");
const ExecCommonDB = require("../common/db/ExecCommonDB");
const STRING_QUERY = require("../common/enum/queryString");
const RES_STATUS = require("../common/enum/resStatus");
const RES_MESSENGER = require("../common/enum/resultMsgString");
const TABLE_NAME = require("../common/enum/tableString");
const StatusMessage = require("../models/respondStatus");
const UserModel = require("../models/UserModel");
const UserUpdateModel = require("../models/userUPdateModel");

class UserService {
  constructor() {}
  async Insert(model) {
    const newModel = new UserModel(model);

    if (!newModel?.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel?.password) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel?.full_name) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel?.email) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    }

    let qStringDataExists = ExecCommonDB.setQueryString(STRING_QUERY.LoginSearchUserByUsername)
      .setConditions({ username: newModel.username })
      .GetQuerySelect();
    const dataExists = await query(qStringDataExists);

    try {
      if (dataExists.length > 0) {
        return new StatusMessage(
          RES_STATUS.INSERT_FAILED,
          RES_MESSENGER.INSERT_USER_NAME_EXIST,
          newModel
        );
      } else {
        newModel.password = commonBase.getMD5String(newModel.password);
        let qString = ExecCommonDB.setTableName(TABLE_NAME.USER)
          .setTypeAction(STRING_QUERY.ExecQuery_Insert)
          .setData(newModel)
          .GetQuery();

        try {
          const data = await query(qString);
          return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.INSERT_SUCCESS, newModel);
        } catch (err) {
          console.log(err.message);
          return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.INSERT_FAILED, newModel);
        }
      }
    } catch (err) {
      return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.INSERT_FAILED, newModel);
    }
  }
  async Update(model) {
    const newModel = new UserUpdateModel(model);

    if (!newModel?.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel?.full_name) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a full name", newModel);
    } else if (!newModel?.email) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a email", newModel);
    }

    let qString = ExecCommonDB.setTableName(TABLE_NAME.USER)
      .setTypeAction(STRING_QUERY.ExecQuery_Update)
      .setData(newModel)
      .setConditions({ username: newModel.username })
      .GetQuery();

    try {
      const data = await query(qString);
      return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.SUCCESS, data);
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, err.message, newModel);
    }
  }
  async Get(model) {
    const newModel = new UserModel(model);

    if (!newModel.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel.password) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a password", newModel);
    } else if (!newModel.full_name) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a full name", newModel);
    } else if (!newModel.email) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a email", newModel);
    }

    let qString = ExecCommonDB.setTableName(TABLE_NAME.USER)
      .setTypeAction(STRING_QUERY.ExecQuery_Search)
      .setConditions({ username: newModel.username })
      .GetQuery();

    try {
      const data = await query(qString);
      return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.SUCCESS, data);
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, err.message, newModel);
    }
  }
  async Search(model) {
    try {
      const queryString = STRING_QUERY.User_Search;
      const data = await query(queryString);
      return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.SUCCESS, data);
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, err.message, newModel);
    }
  }
  async Delete(model) {
    const newModel = new UserModel(model);

    if (!newModel.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    }

    let qString = ExecCommonDB.setTableName(TABLE_NAME.USER)
      .setTypeAction(STRING_QUERY.ExecQuery_Update)
      .setData({
        is_delete: true,
      })
      .setConditions({ username: newModel.username })
      .GetQuery();
    try {
      const data = await query(qString);
      return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.SUCCESS, data);
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, err.message, newModel);
    }
  }
  async DeleteEx(model) {
    const newModel = new UserModel(model);

    if (!newModel.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    }

    let qString = ExecCommonDB.setTableName(TABLE_NAME.USER)
      .setTypeAction(STRING_QUERY.Delete)
      .setConditions({ username: newModel.username })
      .GetQuery();
    try {
      const data = await query(qString);
      return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.SUCCESS, data);
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, err.message, newModel);
    }
  }
}

module.exports = new UserService();
