class LoginModel {
  username = undefined;
  password = undefined;
  password_new = undefined;
  password_confirmation = undefined;
  email = undefined;
  phone = undefined;

  constructor(model) {
    this.username = model?.username;
    this.password = model?.password;
    this.password_confirmation = model?.password_confirmation;
    this.email = model?.email;
    this.phone = model?.phone;
  }
}

module.exports = LoginModel;
