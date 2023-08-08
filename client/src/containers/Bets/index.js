import React from "react";
import { Container } from "@mui/material";
import NewBet from "./NewBet";
import BetTable from "./BetTable";

const Bets = () => {
  return (
    <Container sx={{ paddingBottom: "80px" }}>
      <NewBet />
      <BetTable />
    </Container>
  );
};

export default Bets;
