import React from "react";
import Cookies from "js-cookies";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import LinkItem from "./LinkItem";
import ChatWidget from "components/ChatWidget";

const Header = ({ socket, userId, setUserId }) => {
  const navigate = useNavigate();

  // const [rooms, setRooms] = useState([]);

  // const createNewRoom = () => {
  //   const roomId = uuidv4();
  //   navigate(`/room/${roomId}`);
  //   socket.emit("new-room-created", { roomId });
  //   setRooms([...rooms, roomId]);
  // };

  // const fetchRooms = async () => {
  //   const res = await fetch("http://localhost:4000/rooms");
  //   const data = await res.json();
  //   setRooms(data.rooms);
  // };

  // useEffect(() => {
  //   fetchRooms();
  // }, [socket]);

  // const login = () => {
  //   const userId = uuidv4();

  //   Cookies.setItem("userId", userId);
  //   navigate("/");
  // };

  const logout = () => {
    setUserId(null);
    Cookies.removeItem("userId");
    navigate("/");
  };

  return (
    <>
      <Card
        sx={{
          position: "fixed",
          top: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#1B7B9F",
          borderRadius: "0px",
          height: "60px",
          zIndex: 1000,
        }}
      >
        <Box>
          <LinkItem to="/" label="Home" />
        </Box>
        <Box sx={{ display: "flex" }}>
          <LinkItem to="/rankings" label="Rankings" />
          <LinkItem to="/bets" label="Bets" />
          <LinkItem to="/episodes" label="Episodes" />
          <LinkItem to="/admin" label="Admin" />
        </Box>
        <Box>
          {userId ? (
            <Button variant="text" onClick={logout}>
              <Typography sx={{ color: "white" }}>Logout</Typography>
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button variant="text">
                <Typography sx={{ color: "white" }}>Login</Typography>
              </Button>
            </Link>
          )}
        </Box>
      </Card>
      <ChatWidget socket={socket} />
    </>
  );
};

export default Header;

// {
//   rooms.map((room) => {
//     return (
//       <Link to={`/room/${room.roomId}`} key={room.id}>
//         <Button variant="text">
//           <Typography sx={{ color: "white" }}>{room.name}</Typography>
//         </Button>
//       </Link>
//     );
//   });
// }
