// routers.js
const express = require("express");
const API_STRING = require("../common/enum/apiString");
const LoginController = require("../controllers/loginController").default;
const userController = require("../controllers/userController").default;

const router = express.Router();

// Define routes
router.post(API_STRING.User_Search, userController.getUsers);
router.post(API_STRING.User_Insert, userController.Insert);
router.post(API_STRING.User_Update, userController.Update);
router.post(API_STRING.User_Delete, userController.Delete);
router.post(API_STRING.User_Delete_ADMIN, userController.DeleteEx);
router.post(API_STRING.LoginServerTypeOne, LoginController.LoginServerTypeOne);
router.post(API_STRING.LoginServerForgetPassword, LoginController.ForgetPassword);
router.post(API_STRING.LoginServerUpdatePassword, LoginController.ChangePassword);

module.exports = router;
