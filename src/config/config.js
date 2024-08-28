// config.js

const userMail = "pronam730@gmail.com";
const passwordMail = "pronam730@123";

module.exports = {
  db: {
    host: "localhost",
    user: "root",
    password: "",
    database: "website_shop",
  },
  emailServer: {
    service: "gmail", // hoặc bạn có thể sử dụng dịch vụ khác như Outlook, Yahoo, v.v.
    auth: {
      user: userMail, // email của bạn
      pass: passwordMail, // mật khẩu của email
    },
  },
  userMail: userMail,
};
