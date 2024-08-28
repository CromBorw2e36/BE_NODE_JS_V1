const crypto = require('crypto');

class CommonBase {
  formatNumberCurrency(value) {
    return Number.formatNumberCurrency(value, "0.00000000");
  }

  getMD5String(value) {
    let hash = crypto.createHash("md5").update(value).digest("hex");
    return hash;
  }

  generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
module.exports = new CommonBase();
