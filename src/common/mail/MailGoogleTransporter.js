const nodemailer = require("nodemailer");
const { emailServer, userMail } = require("../../config/config");

class MailGoogleTransporter {
  constructor() {
    this.mailOptions = { from: userMail }; // Sửa từ "form" thành "from"
  }

  setMailOptions(mailOptions) {
    this.mailOptions.from = mailOptions.from || this.mailOptions.from;
    this.mailOptions.to = mailOptions.to;
    this.mailOptions.subject = mailOptions.subject;
    this.mailOptions.text = mailOptions.text;
    this.mailOptions.html = mailOptions.html;
    return this;
  }

  setMailOptionFrom(from) {
    // Sửa từ "form" thành "from"
    this.mailOptions.from = from;
    return this;
  }

  setMailOptionTo(to) {
    this.mailOptions.to = to;
    return this;
  }

  setMailOptionSubject(subject) {
    this.mailOptions.subject = subject;
    return this;
  }

  setMailOptionText(text) {
    this.mailOptions.text = text;
    return this;
  }

  setMailOptionHTML(html) {
    this.mailOptions.html = html;
    return this;
  }

  async sendMail() {
    try {
      let info = await nodemailer.createTransport(emailServer).sendMail(this.mailOptions);
      return info;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new MailGoogleTransporter();
