const UserService = require("../services/UserService");

class userController {
  constructor() {}

  async getUsers(req, res) {
    try {
      const users = await UserService.Search();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async Insert(req, res) {
    try {
      const users = await UserService.Insert(req.body);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async Update(req, res) {
    try {
      const users = await UserService.Update(req.body);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async Delete(req, res) {
    try {
      const users = await UserService.Delete(req.body);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async DeleteEx(req, res) {
    try {
      const users = await UserService.DeleteEx(req.body);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new userController();
