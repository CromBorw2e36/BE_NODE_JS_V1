// routers.js
const express = require("express");
const UserController = require("../controllers/UserController");
const API_STRING = require("../common/enum/apiString");

const router = express.Router();

// Define routes
router.post(API_STRING.User_Search, UserController.getUsers);
router.post(API_STRING.User_Insert, UserController.Insert);
router.post(API_STRING.User_Update, UserController.Update);
router.post(API_STRING.User_Delete, UserController.Delete);
router.post(API_STRING.User_Delete_ADMIN, UserController.DeleteEx);

module.exports = router;
