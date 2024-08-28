const commonBase = require("../common/commonBase");
const { query } = require("../common/db/dbConnection");
const ExecCommonDB = require("../common/db/ExecCommonDB");
const STRING_QUERY = require("../common/enum/queryString");
const RES_STATUS = require("../common/enum/resStatus");
const RES_MESSENGER = require("../common/enum/resultMsgString");
const MailGoogleTransporter = require("../common/mail/MailGoogleTransporter");
const LoginModel = require("../models/loginModel");
const StatusMessage = require("../models/respondStatus");

class LoginService {
  constructor() {}

  async LoginToPage(model) {
    const newModel = new LoginModel(model);

    if (!newModel.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel.password) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a password", newModel);
    }

    let qString = ExecCommonDB.setQueryString(STRING_QUERY.LoginToPage)
      .setConditions({
        username: newModel.username,
        password: commonBase.getMD5String(newModel.password),
      })
      .GetQuerySelect();

    try {
      const data = await query(qString);
      if (data) {
        return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.LOGIN_SUCCESS, data);
      } else {
        return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.LOGIN_PASSWORD_ERROR, newModel);
      }
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.LOGIN_FAILED, newModel);
    }
  }

  async ChangePassword(model) {
    const newModel = new LoginModel(model);
    if (!newModel.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel.password) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a password", newModel);
    } else if (!newModel.password_confirmation) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a old password", newModel);
    } else if (!newModel.password_new) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a new password", newModel);
    } else if (newModel.password_confirmation !== newModel.password_new) {
      return new StatusMessage(
        RES_STATUS.ERROR,
        "New password and password confirm is different",
        newModel
      );
    }

    let qStringGetUser = ExecCommonDB.setQueryString(STRING_QUERY.LoginToPage)
      .setConditions({
        username: newModel.username,
        password: commonBase.getMD5String(newModel.password),
      })
      .GetQuerySelect();

    let qStringUpdatePassword = ExecCommonDB.setQueryString(STRING_QUERY.LoginUpdatePassword)
      .setConditions({
        username: newModel.username,
        password: commonBase.getMD5String(newModel.password),
        new_password: commonBase.getMD5String(newModel.password_new),
      })
      .GetQuerySelect();

    try {
      const lstUser = await query(qStringGetUser);
      if (lstUser.length === 1) {
        try {
          const result = await query(qStringUpdatePassword);
          return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.UPDATE_SUCCESS, newModel);
        } catch (e) {
          return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.UPDATE_FAILED, newModel);
        }
      } else {
        return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.NOT_FOUND_VALUE, newModel);
      }
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.UPDATE_FAILED, newModel);
    }
  }

  async ForgetPassword(model) {
    const newModel = new LoginModel(model);
    if (!newModel.username) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a username", newModel);
    } else if (!newModel.email) {
      return new StatusMessage(RES_STATUS.ERROR, "Please enter a email", newModel);
    }

    let qStringGetUser = ExecCommonDB.setQueryString(STRING_QUERY.LoginSearchUserByUsernameAndEmail)
      .setConditions({ username: newModel.username, email: newModel.email })
      .GetQuerySelect();

    try {
      const lstUser = await query(qStringGetUser);
      if (lstUser.length === 1) {
        try {
          newModel.password = lstUser[0].password;
          newModel.password_new = commonBase.generateRandomString(8); // random string 8 characters
          let qStringUpdatePassword = ExecCommonDB.setQueryString(STRING_QUERY.LoginUpdatePassword)
            .setConditions({
              username: newModel.username,
              password: newModel.password,
              new_password: commonBase.getMD5String(newModel.password_new),
            })
            .GetQuerySelect();
          const result = await query(qStringUpdatePassword); // Run query update password
          try {
            const res = await MailGoogleTransporter.setMailOptionTo(newModel.email)
              .setMailOptionSubject(RES_MESSENGER.SENT_PASSWORD_NEW_TO_EMAIL)
              .setMailOptionText(
                `New password: ${newModel.password}. Please change your password after .`
              )
              .sendMail();
            return new StatusMessage(RES_STATUS.SUCCESS, RES_MESSENGER.SENT_EMAIL_SUCCESS, res);
          } catch (ex) {
            return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.SENT_EMAIL_FAILED, newModel);
          }
        } catch (e) {
          return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.UPDATE_FAILED, newModel);
        }
      } else {
        return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.NOT_FOUND_VALUE, newModel);
      }
    } catch (err) {
      console.log(err.message);
      return new StatusMessage(RES_STATUS.ERROR, RES_MESSENGER.LOGIN_FAILED, newModel);
    }
  }
}

module.exports = new LoginService();
