import React, { useState } from "react";
import { styles } from "./styles";

import { mockEpisodes } from "./mockData";
import AdminEvents from "./AdminEvents";
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
          <AdminEvents />
        </div>
      </div>
    </div>
  );
};

export default Admin;
