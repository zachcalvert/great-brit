import RoomController from "./RoomController.js";
import TypingController from "./TypingController.js";
import MessageController from "./MessageController.js";

const messageSockets = (socket) => {
  const typingController = new TypingController(socket);
  const roomController = new RoomController(socket);
  const messageController = new MessageController(socket);

  socket.on("send-message", messageController.sendMessage);

  socket.on("typing", typingController.typing);

  socket.on("join-room", roomController.joinRoom);

  socket.on("new-room-created", roomController.newRoomCreated);

  socket.on("disconnect", roomController.leaveRoom);
};

export default messageSockets;
