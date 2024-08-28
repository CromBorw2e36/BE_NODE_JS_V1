// routers.js
const express = require("express");
const UserController = require("../controllers/UserController");
const API_STRING = require("../common/enum/apiString");
const LoginController = require("../controllers/loginController");

const router = express.Router();

// Define routes
router.post(API_STRING.User_Search, UserController.getUsers);
router.post(API_STRING.User_Insert, UserController.Insert);
router.post(API_STRING.User_Update, UserController.Update);
router.post(API_STRING.User_Delete, UserController.Delete);
router.post(API_STRING.User_Delete_ADMIN, UserController.DeleteEx);
router.post(API_STRING.LoginServerTypeOne, LoginController.LoginServerTypeOne);
router.post(API_STRING.LoginServerForgetPassword, LoginController.ForgetPassword);
router.post(API_STRING.LoginServerUpdatePassword, LoginController.ChangePassword);

module.exports = router;
