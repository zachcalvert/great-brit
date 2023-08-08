import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styles } from "./styles";

const mockBetHistory = [
  {
    id: 1,
    description: "I bet you can't eat 50 eggs",
    better: {
      firstName: "Luke",
    },
    gain: 100,
  },
];

const Home = () => {
  return (
    <div className={`episodes ${styles}`}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            ".MuiAccordionSummary-content": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Current Funds</Typography>
          <Typography sx={{ marginRight: "18px" }}>$125</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            ".MuiAccordionSummary-content": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            },
          }}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Current Funds</Typography>
          <Typography sx={{ marginRight: "18px" }}>$125</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Home;
