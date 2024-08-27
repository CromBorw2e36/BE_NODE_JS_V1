class UserModel {
  id = undefined;
  username = undefined;
  password = undefined;
  full_name = undefined;
  email = undefined;
  url_fb = undefined;
  url_tiktok = undefined;
  url_phone = undefined;
  avatar = undefined;
  online_hour = 0;
  offline_hour = 23;
  expr = new Date("1/1/2099");
  is_deleted = false;
  is_active = false;
  create_at = new Date();
  update_at = undefined;
  delete_at = undefined;
  create_by = undefined;
  update_by = undefined;
  delete_by = undefined;
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
    this.online_hour = model?.online_hour;
    this.offline_hour = model?.offline_hour;
    this.expr = model?.expr;
    this.is_deleted = model?.is_deleted;
    this.is_active = model?.is_active;
    this.create_at = model?.create_at;
    this.update_at = model?.update_at;
    this.delete_at = model?.delete_at;
    this.create_by = model?.create_by;
    this.update_by = model?.update_by;
    this.delete_by = model?.delete_by;
  }
}

module.exports = UserModel;
