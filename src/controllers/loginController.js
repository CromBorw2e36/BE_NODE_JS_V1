const LoginService = require("../services/loginService");

class LoginController {
  constructor() {}

  async LoginServerTypeOne(req, res) {
    try {
      const result = await LoginService.LoginToPage(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ChangePassword(req, res) {
    try {
      const result = await LoginService.ChangePassword(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ForgetPassword(req, res) {
    try {
      const result = await LoginService.ForgetPassword(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new LoginController();
