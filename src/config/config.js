// config.js

const userMail = "admin@truc-anh-bio.io.vn";
const passwordMail = "trucanhbioiovnadmin";

const dbLocal = {
  host: "localhost",
  user: "root",
  password: "",
  database: "website_shop",
};

const dbDemoV1 = {
  host: "truc-anh-bio.io.vn",
  user: "tuyendu8_root",
  password: "qwertyuiop1234567890",
  database: "tuyendu8_node-js-demo-v1", 
};

module.exports = {
  db: dbDemoV1,
  emailServer: {
    host: "mail.truc-anh-bio.io.vn", // Máy chủ SMTP của bạn
    port: 465, // Sử dụng cổng SSL/TLS
    secure: true, // Kết nối bảo mật SSL/TLS
    auth: {
      user: userMail, // Địa chỉ email của bạn
      pass: passwordMail, // Mật khẩu của tài khoản email của bạn
    },
  },
  userMail: userMail,
};
