import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Cookies from "js-cookies";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
    const _userId = Cookies.getItem("userId");
    if (_userId) setUserId(_userId);
  }, []);

  return (
    <>
      <Header socket={socket} userId={userId} setUserId={setUserId} />
      <Outlet context={{ socket }} />
    </>
  );
}

export default App;
