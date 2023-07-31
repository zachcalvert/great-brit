import messageSockets from "./controllers/messaging/sockets.js";

const sockets = (socket) => {
  messageSockets(socket);
};

export default sockets;
