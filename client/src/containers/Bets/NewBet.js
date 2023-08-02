import React from "react";
import { css } from "@emotion/css";
import { Button, TextField } from "@mui/material";
import Popover from "@mui/material/Popover";

const Bets = () => {
  const styles = css`
    width: 60%;
    margin: 0 auto;
    margin-top: 120px;
    padding: 30px;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 4px;

    .top {
      height: 50px;

      .title {
        color: var(--dark-blue);
        font-size: 24px;
        font-weight: 800;
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;

      .left {
        margin-right: 12px;
      }

      .center {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        margin-right: 12px;
      }

      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .label {
        font-size: 14px;
        font-weight: 800;
        color: var(--black);
      }

      .formItem {
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
      }
    }
  `;

  return (
    <div className={`myClass ${styles}`}>
      <div className="top">
        <span className="title">Propose a New Bet</span>
      </div>
      <div className="bottom">
        <div className="left">
          <TextField label="Description" multiline maxRows={4} />
        </div>
        <div className="center">
          <div className="formItem">
            <TextField id="standard-basic" label="Odds" variant="outlined" />
          </div>
          <div className="formItem">
            <TextField
              id="standard-basic"
              label="Who Can Accept?"
              variant="outlined"
            />
          </div>
        </div>
        <div className="right">
          <div className="formItem">
            <TextField
              id="standard-basic"
              label="Max You'll Lose"
              variant="outlined"
            />
          </div>
          <div className="formItem">
            <TextField
              id="standard-basic"
              label="Max You'll Win"
              variant="outlined"
            />
          </div>
          <div className="submit">
            <Button variant="contained">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bets;
