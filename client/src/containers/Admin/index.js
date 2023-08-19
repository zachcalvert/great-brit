import React, { useState } from "react";
import { styles } from "./styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { mockEpisodes, mockEvents } from "./mockData";
import Stars from "./Stars";

const Admin = () => {
  const [active, setActive] = useState(1);

  return (
    <div className={`episodes ${styles}`}>
      <Stars />
      <div className="folder">
        <div className="tabs">
          {mockEpisodes.map((episode) => {
            const tabClass = episode === active ? "tab active" : "tab inactive";

            return (
              <div
                key={episode}
                className={tabClass}
                onClick={() => setActive(episode)}
              >
                {episode}
              </div>
            );
          })}
        </div>
        <div className="main">
          <h1>Episode {active}</h1>
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
              <Typography>Gains / Losses</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
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
              <Typography>Events</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {mockEvents.map((event) => {
                  return (
                    <div key={event.id} className="eventCard">
                      <div>{event.description}</div>
                      <div>{event.time}</div>
                      <div>{event.baseAmount}</div>
                      <div>{event.player.firstName}</div>
                    </div>
                  );
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Admin;
