import BaseController from "../BaseController.js";

export default class TypingController extends BaseController {
  typing = ({ message, roomId }) => {
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;

    skt.emit("typing-from-server", {
      isTyping: message.length !== 0,
    });
  };
}
