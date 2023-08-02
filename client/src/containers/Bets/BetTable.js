import React from "react";
import { css } from "@emotion/css";
import { Button } from "@mui/material";
import { mockData } from "./mockData";

const Bets = () => {
  const styles = css`
    display: flex;
    flex-direction: column;
    margin-top: 80px;

    .betCard {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      margin-bottom: 12px;
      border-radius: 4px;
      padding: 18px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    }

    .eligibleUsers {
      display: flex;
      flex-direction: column;
    }
  `;

  return (
    <div className={`betTable ${styles}`}>
      {mockData?.map((bet) => {
        console.log(bet);
        return (
          <div key={bet.id} className="betCard">
            <div>{bet.description}</div>
            <div>{bet.better.firstName}</div>
            <div>{bet.odds}</div>
            <div>£{bet.maxLose}</div>
            <div className="eligibleUsers">
              {bet.eligibleUsers.map((user) => {
                return <div>{user.firstName} - £125</div>;
              })}
            </div>
            <Button variant="contained">Accept Bet</Button>
          </div>
        );
      })}
    </div>
  );
};

export default Bets;
