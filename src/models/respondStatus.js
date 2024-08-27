class StatusMessage {
  status = undefined;
  messenger = undefined;
  data = undefined;

  constructor(status, messenger, data) {
    this.status = status;
    this.messenger = messenger;
    this.data = data;
  }
}
module.exports = StatusMessage;
