class UserUpdateModel {
  id = undefined;
  username = undefined;
  full_name = undefined;
  email = undefined;
  url_fb = undefined;
  url_tiktok = undefined;
  url_phone = undefined;
  avatar = undefined;
  online_hour = 0;
  offline_hour = 23;
  expr = new Date("1/1/2099");
  is_active = false;
  create_at = new Date();
  constructor(model) {
    this.id = model?.id;
    this.username = model?.username;
    this.password = model?.password;
    this.full_name = model?.full_name;
    this.email = model?.email;
    this.url_fb = model?.url_fb;
    this.url_tiktok = model?.url_tiktok;
    this.url_phone = model?.url_phone;
    this.avatar = model?.avatar;
    this.online_hour = Number.parseFloat(model?.online_hour);
    this.offline_hour = Number.parseFloat(model?.offline_hour);
    this.expr = model?.expr;
    this.is_active = model?.is_active;
  }
}

module.exports = UserUpdateModel;
