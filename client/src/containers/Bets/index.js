import React from "react";
import { css } from "@emotion/css";
import { Container } from "@mui/material";
import NewBet from "./NewBet";
import BetTable from "./BetTable";

const Bets = () => {
  return (
    <Container>
      <NewBet />
      <BetTable />
    </Container>
  );
};

export default Bets;
